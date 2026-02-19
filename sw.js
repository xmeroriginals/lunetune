const CACHE_NAME = "lunetune-v1";
const AUDIO_CACHE_NAME = "lunetune-audio-v1";
const ASSETS_TO_CACHE = [
    "./",
    "./index.html",
    "./src/style.css",
    "./src/main.js",
    "./src/manifest.json",
    "./resources/Lunetune.png",
    "./resources/lunetune-thumb.png",
    "./resources/lunetune-circle-playing.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME && cacheName !== AUDIO_CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

function reportDataUsage(response, type) {
    if (!response) return;
    let bytes = 0;
    const length = response.headers.get('content-length');
    if (length) {
        bytes = parseInt(length, 10);
    }

    if (bytes > 0) {
        self.clients.matchAll().then(clients => {
            clients.forEach(client => {
                client.postMessage({
                    type: 'DATA_USAGE_UPDATE',
                    bytes: bytes,
                    usageType: type
                });
            });
        });
    }
}

self.addEventListener("fetch", (event) => {
    const url = new URL(event.request.url);

    if (event.request.destination === "audio" || url.host === "audio.jukehost.co.uk") {
        if (event.request.cache === 'reload' || event.request.cache === 'no-store') return;
        const isRangeRequest = event.request.headers.has('range');

        event.respondWith(
            caches.open(AUDIO_CACHE_NAME).then(async (cache) => {
                const cachedResponse = await cache.match(event.request.url);

                if (cachedResponse) {
                    if (!isRangeRequest || event.request.headers.get('range') === 'bytes=0-') {
                        reportDataUsage(cachedResponse.clone(), 'saved');
                    }

                    if (isRangeRequest) {
                        return handleRangeRequest(event.request, cachedResponse);
                    }
                    return cachedResponse;
                }

                try {
                    const networkResponse = await fetch(event.request);
                    if (networkResponse.status === 200) {
                        const responseToCache = networkResponse.clone();
                        cache.put(event.request.url, responseToCache);
                        reportDataUsage(networkResponse.clone(), 'used');
                    }

                    return networkResponse;
                } catch (error) {
                    console.error("Audio fetch failed:", error);
                    return new Response("", { status: 408, statusText: "Network Error" });
                }
            })
        );
        return;
    }

    if (event.request.mode === "navigate") {
        event.respondWith(
            fetch(event.request).catch(() => {
                return caches.match("./index.html");
            })
        );
        return;
    }

    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                return response;
            }
            return fetch(event.request).then(netRes => {
                return netRes;
            }).catch(() => {
                if (event.request.destination === "image") {
                    return caches.match("./resources/Lunetune.png");
                }
            })
        })
    );
});

async function handleRangeRequest(request, response) {
    const rangeHeader = request.headers.get('range');
    if (!rangeHeader) return response;

    const buffer = await response.arrayBuffer();
    const parts = rangeHeader.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : buffer.byteLength - 1;
    const chunk = buffer.slice(start, end + 1);

    return new Response(chunk, {
        status: 206,
        statusText: "Partial Content",
        headers: new Headers({
            "Content-Range": `bytes ${start}-${end}/${buffer.byteLength}`,
            "Accept-Ranges": "bytes",
            "Content-Length": chunk.byteLength,
            "Content-Type": response.headers.get("Content-Type") || "audio/mpeg"
        })
    });
}
