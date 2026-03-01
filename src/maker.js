window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.visibility = "hidden";
  }, 333);
});

document.addEventListener("DOMContentLoaded", () => {
  const DB_NAME = "LunetuneDB";
  const STORE_NAME = "data";
  const MAKER_KEY = "lunetuneMaker";
  const playlistNameInput = document.getElementById("playlist-name");
  const dropZone = document.getElementById("drop-zone");
  const browseBtn = document.getElementById("browse-btn");
  const fileInput = document.getElementById("file-input");
  const addUrlInput = document.getElementById("add-url-input");
  const addUrlBtn = document.getElementById("add-url-btn");
  const songList = document.getElementById("song-list");
  const songCountEl = document.getElementById("song-count");
  const exportPlaylistBtn = document.getElementById("export-playlist-btn");
  const directTransferPlaylistBtn = document.getElementById(
    "direct-lunetune-transfer-playlist-btn"
  );
  const notificationContainer = document.getElementById(
    "notification-container"
  );
  const playlistCoverInput = document.getElementById("playlist-cover-input");
  const playlistCoverPreview = document.getElementById(
    "playlist-cover-preview"
  );
  const importPlaylistInput = document.getElementById("import-playlist-input");
  const pasteCoverUrlBtn = document.getElementById("paste-cover-url-btn");

  let songsToProcess = [];
  let playlistCoverDataUrl = null;

  function showNotification(message, type = "info", duration = 3000) {
    notificationContainer.innerHTML = "";
    const toast = document.createElement("div");
    toast.className = `toast-notification`;
    const icons = {
      info: "info",
      success: "check_circle",
      error: "error",
    };
    const iconColors = {
      info: "icon-info",
      success: "icon-success",
      error: "icon-error",
    };
    toast.innerHTML = `<span class="material-symbols-rounded notranslate icon ${iconColors[type]}">${icons[type]}</span><div class="toast-content"><div class="toast-message-wrapper"><p class="toast-message">${message}</p></div></div><button class="toast-close-btn"><span class="material-symbols-rounded notranslate">close</span></button>`;

    notificationContainer.appendChild(toast);
    requestAnimationFrame(() => {
      toast.classList.add("toast-enter");
    });
    const removeToast = () => {
      toast.classList.add("toast-leave");
      toast.addEventListener("transitionend", () => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      });
    };
    const timeoutId = setTimeout(removeToast, duration);
    toast.querySelector(".toast-close-btn").addEventListener("click", () => {
      clearTimeout(timeoutId);
      removeToast();
    });
  }

  async function handleMakerDataOnInit() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("lunetunemakerimport")) {
      window.history.replaceState({}, document.title, window.location.pathname);
      showNotification(
        "Lunetune'dan liste düzenlenmek üzere alınıyor...",
        "info"
      );
      try {
        const importData = await getDataFromDB(MAKER_KEY);
        if (importData) {
          const fileContent = JSON.stringify(importData);
          const file = new File([fileContent], "imported.luneplaylist", {
            type: "application/json",
          });
          const fakeEvent = { target: { files: [file] } };
          await handleImportPlaylist(fakeEvent);
        } else {
          showNotification("Aktarılacak veri bulunamadı.", "error");
        }
      } catch (error) {
        console.error("Maker içe aktarma hatası:", error);
        showNotification("Liste alınırken bir hata oluştu.", "error");
      } finally {
        try {
          await deleteDataFromDB(MAKER_KEY);
        } catch (cleanupError) {
          console.warn("Cleanup during import failed:", cleanupError);
        }
      }
    } else {
      try {
        await deleteDataFromDB(MAKER_KEY);
        console.log("Stale Lunetune Maker data has been cleaned up.");
      } catch (error) {
        console.warn("Cleanup failed, possibly no stale data existed:", error);
      }
    }
  }

  function getDataFromDB(key) {
    return openDB().then((db) => {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], "readonly");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(key);
        request.onsuccess = () => resolve(request.result || null);
        request.onerror = (event) =>
          reject("Error reading from DB: " + (event.target.error?.message || event.target.error));
      });
    });
  }
  handleMakerDataOnInit();

  pasteCoverUrlBtn.addEventListener("click", async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (!text) {
        showNotification("Panoda URL bulunamadı.", "error");
        return;
      }

      let finalUrl = text.trim();

      if (finalUrl.startsWith("data:image")) {
        try {
          const blob = await (await fetch(finalUrl)).blob();
          const file = new File([blob], "cover.jpg", { type: blob.type });
          finalUrl = await processImage(file);
          showNotification("Büyük kapak resmi optimize edildi.", "success");
        } catch (err) {
          showNotification("Geçersiz Data URL.", "error");
          return;
        }
      } else {
        showNotification("URL Panodan alındı.", "success");
      }

      playlistCoverDataUrl = finalUrl;
      playlistCoverPreview.src = finalUrl;
      playlistCoverPreview.onerror = () => {
        playlistCoverPreview.src =
          "https://placehold.co/325x325/818cf8/ffffff?text=Hata";
        playlistCoverDataUrl = null;
        showNotification("Resim yüklenemedi.", "error");
      };
    } catch (err) {
      showNotification("Panodan okuma başarısız.", "error");
    }
  });

  function processImage(file, width = 325, height = 325) {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith("image/")) {
        reject(new Error("Lütfen bir resim dosyası seçin."));
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          const sourceWidth = img.width;
          const sourceHeight = img.height;
          const sourceRatio = sourceWidth / sourceHeight;
          const targetRatio = width / height;
          let sx, sy, sWidth, sHeight;

          if (sourceRatio > targetRatio) {
            sHeight = sourceHeight;
            sWidth = sHeight * targetRatio;
            sx = (sourceWidth - sWidth) / 2;
            sy = 0;
          } else {
            sWidth = sourceWidth;
            sHeight = sWidth / targetRatio;
            sx = 0;
            sy = (sourceHeight - sHeight) / 2;
          }

          ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", 0.8));
        };
        img.onerror = (error) => reject(error);
      };
      reader.onerror = (error) => reject(error);
    });
  }

  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("bg-white/10", "border-purple-400");
  });
  dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("bg-white/10", "border-purple-400");
  });
  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("bg-white/10", "border-purple-400");
    handleFiles(e.dataTransfer.files);
  });
  browseBtn.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", () => handleFiles(fileInput.files));
  addUrlBtn.addEventListener("click", handleAddUrl);
  addUrlInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleAddUrl();
  });
  importPlaylistInput.addEventListener("change", handleImportPlaylist);

  const jukehostImportJsonBtn = document.getElementById("jukehost-import-json-btn");
  const jukehostImportFileBtn = document.getElementById("jukehost-import-file-btn");
  const jukehostFileInput = document.getElementById("jukehost-file-input");

  jukehostImportJsonBtn.addEventListener("click", async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (!text) {
        showNotification("Panoda veri bulunamadı.", "error");
        return;
      }
      try {
        const json = JSON.parse(text);
        await processJukeHostJson(json);
      } catch (e) {
        showNotification("Panodaki veri geçerli bir JSON değil.", "error");
      }
    } catch (err) {
      showNotification("Panodan okuma başarısız.", "error");
    }
  });

  jukehostImportFileBtn.addEventListener("click", () =>
    jukehostFileInput.click()
  );

  jukehostFileInput.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const json = JSON.parse(event.target.result);
        await processJukeHostJson(json);
      } catch (err) {
        showNotification("Dosya geçerli bir JSON değil.", "error");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  });

  async function processJukeHostJson(json) {
    if (!json.tracks || !Array.isArray(json.tracks)) {
      showNotification(
        "Geçersiz JukeHost JSON formatı (tracks dizisi yok).",
        "error"
      );
      return;
    }

    const totalTracks = json.tracks.length;
    if (totalTracks === 0) {
      showNotification("JSON içinde şarkı bulunamadı.", "warning");
      return;
    }

    showNotification(
      `${totalTracks} şarkı bulundu. JukeHost'tan işleniyor...`,
      "info",
      5000
    );

    let processedCount = 0;

    for (const track of json.tracks) {
      const { id, name } = track;
      if (!id) continue;

      const streamUrl = `https://audio.jukehost.co.uk/${id}`;
      let title = name ? name.replace(/\.[^/.]+$/, "") : "Bilinmeyen Şarkı";
      let artist = "Bilinmeyen Sanatçı";

      if (title.includes(" - ")) {
        const parts = title.split(" - ");
        artist = parts[0].trim();
        title = parts.slice(1).join(" - ").trim();
      }

      let coverImageUrl = "";

      try {
        if (processedCount % 3 === 0) {
          songList.innerHTML = `<p class="text-center text-white/50 py-8">JukeHost verileri işleniyor... %${Math.round((processedCount / totalTracks) * 100)}</p>`;
        }

        const metadata = await fetchMetadataFromUrl(streamUrl);
        if (metadata) {
          if (metadata.title) title = metadata.title;
          if (metadata.artist) artist = metadata.artist;
          if (metadata.coverBlob) {
            const coverFile = new File([metadata.coverBlob], "cover.jpg", { type: metadata.coverBlob.type });
            coverImageUrl = await processImage(coverFile);
          }
        }
      } catch (e) {
        console.warn("JukeHost metadata error for " + name, e);
      }

      const songData = {
        id: `song_${Date.now()}_${Math.random()}`,
        type: "url",
        url: streamUrl,
        title: title,
        artist: artist,
        coverImageUrl: coverImageUrl,
      };

      addSongToList(songData);
      processedCount++;
    }

    showNotification(`${processedCount} JukeHost şarkısı başarıyla eklendi!`, "success");
  }

  async function streamParseArray(file, startIndex, onItemFound, onProgress) {
    const CHUNK_SIZE = 1024 * 1024;
    let offset = startIndex;
    let depth = 0;
    let inString = false;
    let isEscaping = false;
    let currentObjectStr = "";
    const totalSize = file.size;

    while (offset < totalSize) {
      if (onProgress) {
        onProgress(offset, totalSize);
      }

      const chunk = await new Promise((resolve, reject) => {
        const r = new FileReader();
        r.onload = (e) => resolve(e.target.result);
        r.onerror = reject;
        r.readAsText(file.slice(offset, offset + CHUNK_SIZE));
      });

      if (!chunk) break;

      for (let i = 0; i < chunk.length; i++) {
        const char = chunk[i];

        if (depth === 0 && char === "{") {
          depth = 1;
          currentObjectStr = "{";
          continue;
        }

        if (depth > 0) {
          currentObjectStr += char;

          if (!inString) {
            if (char === "{") {
              depth++;
            } else if (char === "}") {
              depth--;
              if (depth === 0) {
                try {
                  const obj = JSON.parse(currentObjectStr);
                  await onItemFound(obj);
                } catch (e) {
                  console.error("Stream parse error item:", e);
                }
                currentObjectStr = "";
              }
            } else if (char === '"') {
              inString = true;
            }
          } else {
            if (isEscaping) {
              isEscaping = false;
            } else {
              if (char === "\\") {
                isEscaping = true;
              } else if (char === '"') {
                inString = false;
              }
            }
          }
        }

        if (depth === 0 && char === "]") {
          if (onProgress) onProgress(totalSize, totalSize);
          return;
        }
      }
      offset += CHUNK_SIZE;
    }
  }

  async function handleImportPlaylist(event) {
    const files = Array.from(event.target.files);
    if (!files || files.length === 0) return;

    if (songsToProcess.length > 0) {
      if (
        confirm(
          "Mevcut listesi temizlemek ister misiniz?\n\nTamam: Temizle ve Yükle\nİptal: Üzerine Ekle"
        )
      ) {
        songsToProcess = [];
        songList.innerHTML = "";
        playlistNameInput.value = "";
        playlistCoverPreview.src =
          "https://placehold.co/325x325/818cf8/ffffff?text=Kapak";
        playlistCoverDataUrl = null;
        const songCountEl = document.getElementById("song-count");
        if (songCountEl) songCountEl.textContent = "0 Şarkı";
        updateUIState();
      }
    } else {
      songList.innerHTML = "";
    }

    let totalProcessedAcrossFiles = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        showNotification(`${file.name} analiz ediliyor...`, "info");
        const headerSize = Math.min(100 * 1024, file.size);
        const headerText = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.onerror = reject;
          reader.readAsText(file.slice(0, headerSize));
        });

        const songsMatch = headerText.match(/"songs"\s*:\s*\[/);
        if (!songsMatch || !headerText.includes('"playlist"')) {
          console.warn(`Skipping invalid file: ${file.name}`);
          continue;
        }

        let metadata = null;
        try {
          const playlistStr = headerText.substring(
            headerText.indexOf("{"),
            headerText.indexOf('"songs"')
          );
          const cleanStr = playlistStr.trim().replace(/,$/, "") + "}";
          const partial = JSON.parse(cleanStr);
          metadata = partial.playlist;
        } catch (e) {
          console.warn("Metadata scan failed, using fallback");
          const nameMatch = headerText.match(/"name"\s*:\s*"([^"]+)"/);
          metadata = { name: nameMatch ? nameMatch[1] : "İçe Aktarılan Liste" };
        }

        if (i === 0 && (!playlistNameInput.value || songsToProcess.length === 0)) {
          let name = metadata?.name || "";
          const partMatch = name.match(/^(.*?) \(Bölüm \d+\)$/);
          if (partMatch) name = partMatch[1];

          playlistNameInput.value = name;
          if (metadata?.coverUrl) {
            playlistCoverPreview.src = metadata.coverUrl;
            playlistCoverDataUrl = metadata.coverUrl;
          }
        }

        const listStartIndex = songsMatch.index + songsMatch[0].length;

        const tempMsg = document.createElement('div');
        tempMsg.className = "text-center text-white/50 py-2 text-sm";
        tempMsg.innerText = `${file.name} yükleniyor...`;
        songList.appendChild(tempMsg);

        let fileProcessedCount = 0;

        await streamParseArray(
          file,
          listStartIndex,
          async (songData) => {
            let newSong;
            if (songData.fileBase64) {
              const blob = await base64ToBlob(
                songData.fileBase64,
                songData.mimeType
              );
              const extension = songData.mimeType?.split("/")[1] || "mp3";
              const fileName = `${songData.title || "track"}.${extension}`;
              const audioFile = new File([blob], fileName, {
                type: songData.mimeType,
              });

              newSong = {
                id: `song_${Date.now()}_${Math.random()}`,
                type: "file",
                file: audioFile,
                title: songData.title,
                artist: songData.artist,
                coverFile: null,
              };

              if (songData.image) {
                try {
                  const imageBlob = await (await fetch(songData.image)).blob();
                  newSong.coverFile = new File([imageBlob], "cover.jpg", {
                    type: imageBlob.type,
                  });
                } catch (err) {
                  console.warn("İçe aktarılan kapak resmi yüklenemedi:", err);
                }
              }
            } else if (songData.url) {
              newSong = {
                id: `song_${Date.now()}_${Math.random()}`,
                type: "url",
                url: songData.url,
                title: songData.title,
                artist: songData.artist,
                coverImageUrl: songData.image || "",
              };
            } else {
              return;
            }

            addSongToList(newSong);
            updateSongItemUI(newSong);

            fileProcessedCount++;
            totalProcessedAcrossFiles++;
          },
          (processed, total) => {
            const percent = Math.min(100, Math.round((processed / total) * 100));
            tempMsg.innerText = `${file.name}: %${percent} bitti`;
          }
        );

        tempMsg.remove();

      } catch (err) {
        console.error("Çalma listesi içe aktarma hatası:", err);
        showNotification(
          `${file.name} okunamadı: ` + err.message,
          "error"
        );
      }
    }

    if (totalProcessedAcrossFiles === 0 && songsToProcess.length === 0) {
      songList.innerHTML = '<p class="text-center text-white/50 py-8">Henüz şarkı eklenmedi.</p>';
    }

    showNotification(
      `${totalProcessedAcrossFiles} şarkı başarıyla yüklendi!`,
      "success"
    );
    importPlaylistInput.value = "";
    updateUIState();
  }

  function handleFiles(files) {
    const audioFiles = Array.from(files).filter((file) =>
      file.type.startsWith("audio/")
    );
    if (audioFiles.length === 0) {
      showNotification("Lütfen geçerli ses dosyaları seçin.", "error");
      return;
    }

    audioFiles.forEach((file) => {
      const songData = {
        id: `song_${Date.now()}_${Math.random()}`,
        type: "file",
        file: file,
        title: file.name.replace(/\.[^/.]+$/, ""),
        artist: "Bilinmeyen Sanatçı",
        coverFile: null,
      };
      addSongToList(songData);

      window.jsmediatags.read(file, {
        onSuccess: (tag) => {
          if (tag.tags.title) songData.title = tag.tags.title;
          if (tag.tags.artist) songData.artist = tag.tags.artist;
          if (tag.tags.picture) {
            const { data, format } = tag.tags.picture;
            const coverBlob = new Blob([new Uint8Array(data)], {
              type: format,
            });
            songData.coverFile = new File([coverBlob], "cover.jpg", {
              type: format,
            });
          }
          updateSongItemUI(songData);
        },
        onError: (error) =>
          console.log("Metadata okuma hatası:", error.type, error.info),
      });
    });
  }

  async function handleAddUrl() {
    const url = addUrlInput.value.trim();
    if (!url) {
      showNotification("Lütfen geçerli bir URL girin.", "error");
      return;
    }

    const originalBtnContent = addUrlBtn.innerHTML;
    addUrlBtn.disabled = true;
    addUrlBtn.innerHTML =
      '<span class="material-symbols-rounded notranslate animate-spin">sync</span>';

    try {
      let title =
        url.split("/").pop().split(".")[0].replace(/%20/g, " ") ||
        "İsimsiz URL Şarkısı";
      let artist = "Bilinmeyen Sanatçı";
      let coverImageUrl = "";

      try {
        showNotification("Metadata aranıyor...", "info", 1500);
        const metadata = await fetchMetadataFromUrl(url);
        if (metadata) {
          if (metadata.title) title = metadata.title;
          if (metadata.artist) artist = metadata.artist;
          if (metadata.coverBlob) {
            const coverFile = new File([metadata.coverBlob], "cover.jpg", {
              type: metadata.coverBlob.type,
            });
            coverImageUrl = await processImage(coverFile);
          }
          showNotification("Metadata bulundu ve uygulandı!", "success");
        }
      } catch (err) {
        console.warn("Metadata fetch failed:", err);
      }

      const songData = {
        id: `song_${Date.now()}_${Math.random()}`,
        type: "url",
        url: url,
        title: title,
        artist: artist,
        coverImageUrl: coverImageUrl,
      };
      addSongToList(songData);
      addUrlInput.value = "";
    } finally {
      addUrlBtn.disabled = false;
      addUrlBtn.innerHTML = originalBtnContent;
    }
  }

  async function fetchMetadataFromUrl(url) {
    try {
      const response = await fetch(url, {
        headers: { Range: "bytes=0-327680" },
      });
      if (!response.ok) return null;
      const arrayBuffer = await response.arrayBuffer();
      const dataView = new DataView(arrayBuffer);

      if (
        dataView.byteLength < 10 ||
        dataView.getUint8(0) !== 0x49 ||
        dataView.getUint8(1) !== 0x44 ||
        dataView.getUint8(2) !== 0x33
      ) {
        return null;
      }

      const version = dataView.getUint8(3);
      const id3Size =
        ((dataView.getUint8(6) & 0x7f) << 21) |
        ((dataView.getUint8(7) & 0x7f) << 14) |
        ((dataView.getUint8(8) & 0x7f) << 7) |
        (dataView.getUint8(9) & 0x7f);

      const totalHeaderSize = 10 + id3Size;
      let offset = 10;
      let metadata = { title: null, artist: null, coverBlob: null };

      while (offset < totalHeaderSize && offset < arrayBuffer.byteLength - 10) {
        const frameId =
          String.fromCharCode(dataView.getUint8(offset)) +
          String.fromCharCode(dataView.getUint8(offset + 1)) +
          String.fromCharCode(dataView.getUint8(offset + 2)) +
          String.fromCharCode(dataView.getUint8(offset + 3));
        if (frameId === "\0\0\0\0" || !/^[A-Z0-9]{4}$/.test(frameId)) break;
        let frameSize = dataView.getUint32(offset + 4);
        if (version === 4) {
          frameSize =
            ((dataView.getUint8(offset + 4) & 0x7f) << 21) |
            ((dataView.getUint8(offset + 5) & 0x7f) << 14) |
            ((dataView.getUint8(offset + 6) & 0x7f) << 7) |
            (dataView.getUint8(offset + 7) & 0x7f);
        }

        const contentOffset = offset + 10;
        const nextFrameOffset = contentOffset + frameSize;

        if (nextFrameOffset > arrayBuffer.byteLength) {
          console.warn(`Frame ${frameId} truncated. Needed ${nextFrameOffset}, had ${arrayBuffer.byteLength}`);
          break;
        }

        try {
          if (frameId === "TIT2") {
            metadata.title = parseTextFrame(
              dataView,
              contentOffset,
              frameSize
            );
          } else if (frameId === "TPE1") {
            metadata.artist = parseTextFrame(
              dataView,
              contentOffset,
              frameSize
            );
          } else if (frameId === "APIC") {
            if (!metadata.coverBlob) {
              const encoding = dataView.getUint8(contentOffset);
              let mimeType = "";
              let ptr = contentOffset + 1;

              while (ptr < nextFrameOffset && dataView.getUint8(ptr) !== 0) {
                mimeType += String.fromCharCode(dataView.getUint8(ptr));
                ptr++;
              }
              ptr++;

              const pictureType = dataView.getUint8(ptr);
              ptr++;

              if (encoding === 0 || encoding === 3) {
                while (ptr < nextFrameOffset && dataView.getUint8(ptr) !== 0) {
                  ptr++;
                }
                ptr++;
              } else if (encoding === 1 || encoding === 2) {
                while (
                  ptr < nextFrameOffset - 1 &&
                  !(dataView.getUint8(ptr) === 0 && dataView.getUint8(ptr + 1) === 0)
                ) {
                  ptr += 2;
                }
                ptr += 2;
              }

              const imgDataSize = nextFrameOffset - ptr;
              if (imgDataSize > 0) {
                const imgData = new Uint8Array(
                  dataView.buffer,
                  dataView.byteOffset + ptr,
                  imgDataSize
                );
                metadata.coverBlob = new Blob([imgData], { type: mimeType });
              }
            }
          }
        } catch (innerErr) {
          console.warn(`Error parsing frame ${frameId}:`, innerErr);
        }

        offset = nextFrameOffset;
      }
      return metadata;
    } catch (e) {
      console.error("ID3 parse error:", e);
      return null;
    }
  }

  function parseTextFrame(dataView, offset, length) {
    if (length < 2) return null;
    const encoding = dataView.getUint8(offset);
    const content = new Uint8Array(
      dataView.buffer,
      dataView.byteOffset + offset + 1,
      length - 1
    );

    try {
      if (encoding === 0 || encoding === 3) {
        const decoder = new TextDecoder(
          encoding === 0 ? "iso-8859-1" : "utf-8"
        );
        return decoder.decode(content).replace(/\0/g, "");
      } else if (encoding === 1 || encoding === 2) {
        const decoder = new TextDecoder(
          encoding === 1 ? "utf-16" : "utf-16be"
        );
        return decoder.decode(content).replace(/\0/g, "");
      }
    } catch (e) {
      return null;
    }
    return null;
  }

  function addSongToList(songData) {
    if (songList.querySelector('p')?.textContent.includes('Henüz şarkı eklenmedi')) {
      songList.innerHTML = "";
    }
    songsToProcess.push(songData);
    renderSongItem(songData);
    updateUIState();
  }

  function renderSongItem(song) {
    const item = document.createElement("div");
    item.id = song.id;
    item.className =
      "song-item bg-white/5 p-4 rounded-lg flex flex-col md:flex-row items-center gap-4";

    const coverSectionHTML =
      song.type === "file"
        ? `
            <div class="flex-shrink-0 relative">
                <img src="https://placehold.co/80x80/4a4f8a/ffffff?text=L" class="w-20 h-20 rounded-md object-cover cover-preview">
                <label class="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs opacity-0 hover:opacity-100 transition-opacity cursor-pointer rounded-md">
                    Değiştir
                    <input type="file" class="hidden cover-file-input" accept="image/*">
                </label>
            </div>
        `
        : `
            <div class="flex-shrink-0">
                <img src="https://placehold.co/80x80/4a4f8a/ffffff?text=URL" class="w-20 h-20 rounded-md object-cover cover-preview">
            </div>
        `;

    const detailsSectionHTML =
      song.type === "url"
        ? `
             <input type="text" value="${song.coverImageUrl}" class="w-full bg-[#1c1f3a] p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-400 text-sm cover-url-input" placeholder="Kapak Resmi URL'i (isteğe bağlı)">
        `
        : "";

    item.innerHTML = `
            ${coverSectionHTML}
            <div class="flex-grow w-full space-y-2">
                <input type="text" value="${song.title}" class="w-full bg-[#1c1f3a] text-white p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-400 title-input" placeholder="Şarkı Adı">
                <input type="text" value="${song.artist}" class="w-full bg-[#1c1f3a] text-white p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-400 artist-input" placeholder="Sanatçı Adı">
                ${detailsSectionHTML}
            </div>
            <button class="remove-btn text-red-400 hover:text-red-600 px-3 py-2 rounded-full hover:bg-red-500/10 transition-colors">
                <span class="material-symbols-rounded notranslate">delete</span>
            </button>
        `;
    songList.appendChild(item);

    item.querySelector(".title-input").addEventListener("input", (e) => {
      song.title = e.target.value;
    });
    item.querySelector(".artist-input").addEventListener("input", (e) => {
      song.artist = e.target.value;
    });

    if (song.type === "file") {
      item
        .querySelector(".cover-file-input")
        .addEventListener("change", (e) => {
          if (e.target.files[0]) {
            song.coverFile = e.target.files[0];
            updateSongItemUI(song);
          }
        });
    } else {
      const coverUrlInput = item.querySelector(".cover-url-input");
      coverUrlInput.addEventListener("input", async (e) => {
        let url = e.target.value.trim();
        song.coverImageUrl = url;

        if (url.startsWith("data:image")) {
          try {
            const blob = await (await fetch(url)).blob();
            const file = new File([blob], "cover.jpg", { type: blob.type });
            const optimizedDataUrl = await processImage(file);
            song.coverImageUrl = optimizedDataUrl;
            e.target.value = optimizedDataUrl;

            showNotification(
              "Büyük kapak resmi optimize edildi.",
              "info",
              2000
            );
          } catch (err) {
            console.error("Data URL işlenirken hata:", err);
            song.coverImageUrl = url;
          }
        }
        updateSongItemUI(song);
      });
    }

    item.querySelector(".remove-btn").addEventListener("click", () => {
      songsToProcess = songsToProcess.filter((s) => s.id !== song.id);
      item.remove();
      if (songsToProcess.length === 0) {
        songList.innerHTML =
          '<p class="text-center text-white/50 py-8">Henüz şarkı eklenmedi.</p>';
      }
      updateUIState();
    });
  }

  function updateSongItemUI(song) {
    const item = document.getElementById(song.id);
    if (!item) return;
    item.querySelector(".title-input").value = song.title;
    item.querySelector(".artist-input").value = song.artist;
    const coverPreview = item.querySelector(".cover-preview");

    if (song.type === "file" && song.coverFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        coverPreview.src = e.target.result;
      };
      reader.readAsDataURL(song.coverFile);
    } else if (song.type === "url" && song.coverImageUrl) {
      coverPreview.src = song.coverImageUrl;
      coverPreview.onerror = () => {
        coverPreview.src = "https://placehold.co/80x80/4a4f8a/ffffff?text=URL";
      };
    }
  }

  function updateUIState() {
    exportPlaylistBtn.disabled = songsToProcess.length === 0;

    let totalSize = 0;
    songsToProcess.forEach(song => {
      if (song.type === 'file') {
        totalSize += song.file.size;
      }
    });

    const SIZE_LIMIT = 400 * 1024 * 1024;

    if (totalSize > SIZE_LIMIT) {
      directTransferPlaylistBtn.disabled = true;
      directTransferPlaylistBtn.title =
        "Playlist boyutu çok yüksek (>400MB). Lütfen dışa aktararak parçalar halinde yükleyin.";
      if (document.getElementById("direct-transfer-warning")) {
        document.getElementById("direct-transfer-warning").remove();
      }
      const warning = document.createElement("div");
      warning.id = "direct-transfer-warning";
      warning.className = "text-xs text-red-300 text-center mt-2";
      warning.innerText =
        "Playlist boyutu >400MB olduğu için direkt aktarım devre dışı.";
      directTransferPlaylistBtn.parentNode.appendChild(warning);
    } else {
      directTransferPlaylistBtn.disabled = exportPlaylistBtn.disabled;
      directTransferPlaylistBtn.title = "";
      const warning = document.getElementById("direct-transfer-warning");
      if (warning) warning.remove();
    }

    songCountEl.textContent = `${songsToProcess.length} Şarkı`;
  }

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  async function base64ToBlob(base64, mimeType = "application/octet-stream") {
    const res = await fetch(`data:${mimeType};base64,${base64}`);
    return await res.blob();
  }

  playlistCoverInput.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imageDataUrl = await processImage(file);
        playlistCoverPreview.src = imageDataUrl;
        playlistCoverDataUrl = imageDataUrl;
      } catch (error) {
        console.error("Kapak resmi işlenemedi:", error);
        showNotification("Kapak resmi işlenirken bir hata oluştu.", "error");
      }
    }
  });

  exportPlaylistBtn.addEventListener("click", async () => {
    const playlistName = playlistNameInput.value.trim();
    if (!playlistName) {
      showNotification("Lütfen bir çalma listesi adı girin.", "error");
      playlistNameInput.focus();
      return;
    }

    if (songsToProcess.length === 0) {
      showNotification("Lütfen en az bir şarkı ekleyin.", "error");
      return;
    }

    exportPlaylistBtn.disabled = true;
    exportPlaylistBtn.innerHTML =
      '<span class="material-symbols-rounded notranslate animate-spin mr-2">sync</span> İşleniyor...';

    try {
      const SIZE_LIMIT = 400 * 1024 * 1024;
      let currentChunkSize = 0;
      let chunks = [];
      let currentChunkSongs = [];

      for (let i = 0; i < songsToProcess.length; i++) {
        const song = songsToProcess[i];
        let songSize = 0;

        if (song.type === 'file') {
          songSize = song.file.size;
          songSize += songSize * 0.35;
        } else {
          songSize = 500;
        }

        if (currentChunkSize + songSize > SIZE_LIMIT && currentChunkSongs.length > 0) {
          chunks.push(currentChunkSongs);
          currentChunkSongs = [];
          currentChunkSize = 0;
        }

        currentChunkSongs.push(song);
        currentChunkSize += songSize;
      }

      if (currentChunkSongs.length > 0) {
        chunks.push(currentChunkSongs);
      }

      const totalChunks = chunks.length;

      for (let chunkIdx = 0; chunkIdx < totalChunks; chunkIdx++) {
        const chunkSongs = chunks[chunkIdx];

        let currentPlaylistName = playlistName;
        let fileNameSuffix = "";

        if (totalChunks > 1) {
          currentPlaylistName = `${playlistName} (Bölüm ${chunkIdx + 1})`;
          fileNameSuffix = `_part${chunkIdx + 1}`;
        }

        const parts = [];
        const playlistInfo = {
          name: currentPlaylistName,
          coverUrl: playlistCoverDataUrl,
        };
        parts.push(`{"playlist":${JSON.stringify(playlistInfo)},"songs":[`);

        for (let i = 0; i < chunkSongs.length; i++) {
          const song = chunkSongs[i];
          let songExportData = {
            title: song.title || "Bilinmeyen Şarkı",
            artist: song.artist || "Bilinmeyen Sanatçı",
          };

          if (song.type === "file") {
            const [audioBase64, imageBase64] = await Promise.all([
              fileToBase64(song.file),
              song.coverFile
                ? fileToBase64(song.coverFile)
                : Promise.resolve(null),
            ]);
            songExportData.fileBase64 = audioBase64.split(",")[1];
            songExportData.mimeType = song.file.type;
            songExportData.image = imageBase64;
          } else {
            songExportData.url = song.url;
            songExportData.image = song.coverImageUrl || null;
          }

          if (i > 0) parts.push(",");
          parts.push(JSON.stringify(songExportData));
        }

        parts.push("]}");

        const blob = new Blob(parts, {
          type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        const safeFileName = playlistName
          .replace(/[^a-z0-9]/gi, "_")
          .toLowerCase();

        a.href = url;
        a.download = `${safeFileName}${fileNameSuffix}.luneplaylist`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        if (totalChunks > 1) {
          await new Promise((r) => setTimeout(r, 800));
        }
      }

      showNotification(
        totalChunks > 1
          ? "Çalma listesi boyut nedeniyle parçalar halinde dışa aktarıldı!"
          : "Çalma listesi başarıyla dışa aktarıldı!",
        "success"
      );
    } catch (error) {
      console.error("Dışa aktarma hatası:", error);
      showNotification("Dışa aktarılırken bir hata oluştu.", "error");
    } finally {
      exportPlaylistBtn.disabled = false;
      exportPlaylistBtn.innerHTML =
        '<span class="material-symbols-rounded notranslate mr-2">save</span> Dışa Aktar';
    }
  });

  directTransferPlaylistBtn.addEventListener("click", async () => {
    const playlistName = playlistNameInput.value.trim();
    if (!playlistName) {
      showNotification("Lütfen bir çalma listesi adı girin.", "error");
      playlistNameInput.focus();
      return;
    }

    if (songsToProcess.length === 0) {
      showNotification("Lütfen en az bir şarkı ekleyin.", "error");
      return;
    }

    let totalSize = 0;
    songsToProcess.forEach(s => {
      if (s.type === 'file') totalSize += s.file.size;
    });

    if (totalSize > 400 * 1024 * 1024) {
      showNotification(
        "Playlist çok büyük (>400MB). Lütfen dışa aktararak parçalara bölün.",
        "error"
      );
      return;
    }

    directTransferPlaylistBtn.disabled = true;
    directTransferPlaylistBtn.innerHTML =
      '<span class="material-symbols-rounded notranslate animate-spin mr-2">sync</span> İşleniyor...';

    try {
      const songsForExport = await Promise.all(
        songsToProcess.map(async (song) => {
          let songExportData = {
            title: song.title || "Bilinmeyen Şarkı",
            artist: song.artist || "Bilinmeyen Sanatçı",
          };

          if (song.type === "file") {
            const [audioBase64, imageBase64] = await Promise.all([
              fileToBase64(song.file),
              song.coverFile
                ? fileToBase64(song.coverFile)
                : Promise.resolve(null),
            ]);
            songExportData.fileBase64 = audioBase64.split(",")[1];
            songExportData.mimeType = song.file.type;
            songExportData.image = imageBase64;
          } else {
            songExportData.url = song.url;
            songExportData.image = song.coverImageUrl || null;
          }
          return songExportData;
        })
      );

      const exportData = {
        playlist: {
          name: playlistName,
          coverUrl: playlistCoverDataUrl,
        },
        songs: songsForExport,
      };

      await saveDataToDB(MAKER_KEY, exportData);

      showNotification(
        "Liste aktarıma hazırlandı, Lunetune açılıyor...",
        "success"
      );

      setTimeout(() => {
        window.location.href = "./?lunetunemakerexport=true";
      }, 1500);
    } catch (error) {
      console.error("Direkt aktarma hatası:", error);
      showNotification("Aktarım sırasında bir hata oluştu.", "error");
      directTransferPlaylistBtn.disabled = false;
      directTransferPlaylistBtn.innerHTML = `<span class="material-symbols-rounded notranslate mr-2">rocket_launch</span> Lunetune'a Aktar`;
    }
  });

  function openDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, 3);
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("playlists")) {
          db.createObjectStore("playlists", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("userSongs")) {
          db.createObjectStore("userSongs", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("settings")) {
          db.createObjectStore("settings", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
        if (!db.objectStoreNames.contains("OfflineSongs")) {
          db.createObjectStore("OfflineSongs", { keyPath: "id" });
        }
      };

      request.onerror = (event) =>
        reject("Database error: " + (event.target.error?.message || event.target.error));
      request.onsuccess = (event) => resolve(event.target.result);
    });
  }

  function saveDataToDB(key, value) {
    return openDB().then((db) => {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.put(value, key);
        request.onsuccess = () => resolve();
        request.onerror = (event) =>
          reject("Error saving to DB: " + event.target.error);
      });
    });
  }

  function deleteDataFromDB(key) {
    return openDB().then((db) => {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete(key);
        request.onsuccess = () => resolve();
        request.onerror = (event) =>
          reject("Error deleting from DB: " + event.target.error);
      });
    });
  }

  updateUIState();
});
