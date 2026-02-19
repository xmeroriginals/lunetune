(() => {
  if (window.opener) {
    return;
  }

  let pipWindow = null;
  let updateInterval = null;
  let isPipRestarting = false;

  const PipSettingsDB = {
    _db: null,
    async _getDB() {
      if (this._db) return this._db;
      return new Promise((resolve, reject) => {
        const request = indexedDB.open("LunetunePipDB", 1);
        request.onupgradeneeded = () => {
          request.result.createObjectStore("settings");
        };
        request.onsuccess = () => {
          this._db = request.result;
          resolve(this._db);
        };
        request.onerror = (e) => reject(e.target.error);
      });
    },
    async get(key) {
      const db = await this._getDB();
      return new Promise((resolve) => {
        const tx = db.transaction("settings", "readonly");
        const store = tx.objectStore("settings");
        const request = store.get(key);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => resolve(undefined);
      });
    },
    async set(key, value) {
      const db = await this._getDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction("settings", "readwrite");
        const store = tx.objectStore("settings");
        const request = store.put(value, key);
        request.onsuccess = () => resolve(true);
        request.onerror = (e) => reject(e.target.error);
      });
    },
  };

  window.restartPipWithDimensions = async function (width, height) {
    if (!pipWindow) return;

    await PipSettingsDB.set("pipDimensions", { width, height });

    pipWindow.addEventListener(
      "pagehide",
      () => {
        showWindowOutControl();
      },
      { once: true }
    );

    pipWindow.close();
  };

  function getMiniPlayerHTML() {
    return `
      <div id="player-container">
        <div class="visible-content">
          <img id="mini-album-art" src="https://lunetune.xmeroriginals.com/resources/lunetune-thumb.png" alt="Album Art">
          <div class="info-and-progress">
              <div class="song-details">
                <p id="mini-song-title">Lunetune</p>
                <p id="mini-song-artist">Müzik çalmıyor</p>
              </div>
              <div id="progress-section-small" class="progress-section">
                <span id="mini-current-time">0:00</span>
                <div id="mini-progress-bar-container">
                  <div id="mini-progress-bar"></div>
                  <div id="mini-progress-handle"></div>
                </div>
                <span id="mini-duration">0:00</span>
              </div>
          </div>
        </div>
        <div id="hover-controls-overlay">
          <div class="controls-wrapper">
            <div id="progress-section-hover" class="progress-section">
                <span id="mini-current-time-hover">0:00</span>
                <div id="mini-progress-bar-container-hover">
                  <div id="mini-progress-bar-hover"></div>
                  <div id="mini-progress-handle-hover"></div>
                </div>
                <span id="mini-duration-hover">0:00</span>
            </div>
            <div class="player-controls">
                <button id="mini-shuffle-btn" class="control-btn small-btn" title="Karıştır"><span class="material-symbols-rounded notranslate">shuffle</span></button>
                <button id="mini-prev-btn" class="control-btn" title="Önceki"><span class="material-symbols-rounded notranslate">skip_previous</span></button>
                <button id="mini-play-pause-btn" class="control-btn play" title="Oynat/Durdur"><span id="mini-play-pause-icon" class="material-symbols-rounded notranslate">play_circle</span></button>
                <button id="mini-next-btn" class="control-btn" title="Sonraki"><span class="material-symbols-rounded notranslate">skip_next</span></button>
                <button id="mini-loop-btn" class="control-btn small-btn" title="Tekrarla"><span class="material-symbols-rounded notranslate">repeat</span></button>
            </div>
            <div class="preset-sizes">
              <button id="preset-small" class="control-btn preset-btn" title="Küçük Boyut"><span class="material-symbols-rounded notranslate">unfold_less</span></button>
              <button id="preset-medium" class="control-btn preset-btn" title="Orta Boyut"><span class="material-symbols-rounded notranslate">crop_square</span></button>
              <button id="preset-large" class="control-btn preset-btn" title="Geniş Boyut"><span class="material-symbols-rounded notranslate">unfold_more</span></button>
            </div>
          </div>
        </div>
      </div>
      <div id="mini-queue-container">
        <ul id="mini-queue-list"></ul>
      </div>
    `;
  }

  function getMiniPlayerCSS() {
    return `
      :root {
        --bg-color: #1c1f3a; --text-primary: #ffffff; --text-secondary: #b9b9c9;
        --accent-color: #8b5cf6; --progress-bg: rgba(255, 255, 255, 0.2);
        --progress-fg: #ffffff; --overlay-bg: rgba(20, 22, 46, 0.7);
        --list-hover-bg: rgba(255, 255, 255, 0.1); --active-item-bg: rgba(139, 92, 246, 0.3);
      }
      html { height: 100%; }
      body {
        height: 100%; margin: 0; font-family: 'Lexend Deca', 'Questrial', sans-serif;
        color: var(--text-secondary); background-color: var(--bg-color);
        overflow: hidden; user-select: none;
        display: flex; flex-direction: column;
      }
      #player-container { position: relative; width: 100%; display: flex; flex-shrink: 0; }
      .visible-content { width: 100%; display: flex; align-items: center; padding: 10px; box-sizing: border-box; gap: 12px; flex-shrink: 0; }
      #mini-album-art { width: 70px; height: 70px; border-radius: 8px; object-fit: cover; flex-shrink: 0; box-shadow: 0 4px 12px rgba(0,0,0,0.4); }
      .info-and-progress { display: flex; flex-direction: column; justify-content: center; gap: 10px; flex-grow: 1; overflow: hidden; }
      .song-details { line-height: 1.3; }
      #mini-song-title, #mini-song-artist { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin: 0; }
      #mini-song-title { font-size: 14px; font-weight: 600; color: var(--text-primary); }
      #mini-song-artist { font-size: 12px; }
      .progress-section { display: flex; align-items: center; gap: 8px; font-size: 11px; width: 70%; }
      #mini-progress-bar-container, #mini-progress-bar-container-hover { flex-grow: 1; height: 4px; background-color: var(--progress-bg); border-radius: 2px; cursor: pointer; position: relative; }
      #mini-progress-bar, #mini-progress-bar-hover { height: 100%; width: 0%; background-color: var(--progress-fg); border-radius: 2px; }
      #mini-progress-handle, #mini-progress-handle-hover { position: absolute; top: 50%; transform: translate(-50%, -50%); width: 10px; height: 10px; background-color: var(--progress-fg); border-radius: 50%; opacity: 0; transition: opacity 0.2s; pointer-events: none; }
      #mini-progress-bar-container:hover #mini-progress-handle, #mini-progress-bar-container-hover:hover #mini-progress-handle-hover { opacity: 1; }
      #hover-controls-overlay { position: absolute; inset: 0; background: var(--overlay-bg); backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px); opacity: 0; transition: opacity 0.3s ease; display: flex; align-items: center; justify-content: center; pointer-events: none; }
      body:hover #hover-controls-overlay { opacity: 1; pointer-events: auto; }
      .controls-wrapper { display: flex; flex-direction: column; align-items: center; gap: 5px; width: 90%; opacity: 0; transition: opacity 0.3s ease 0.1s, transform 0.3s ease 0.1s; }
      body:hover .controls-wrapper { opacity: 1; }
      #progress-section-hover { display: none; }
      .player-controls { display: flex; align-items: center; gap: 10px; }
      .control-btn { background: none; border: none; color: var(--text-secondary); cursor: pointer; padding: 0; display: flex; align-items: center; justify-content: center; transition: color 0.2s, transform 0.2s; -webkit-tap-highlight-color: transparent; }
      .control-btn:hover { color: var(--text-primary); }
      .control-btn:active { transform: scale(0.9); }
      .control-btn.active { color: var(--accent-color); }
      .control-btn .material-symbols-rounded { font-size: 30px; }
      .control-btn.small-btn .material-symbols-rounded { font-size: 22px; }
      .control-btn.play .material-symbols-rounded { font-size: 48px; }
      .preset-sizes { display: flex; gap: 16px; }
      .preset-btn .material-symbols-rounded { font-size: 20px; }
      #mini-queue-container { margin-top: 10px; flex: 1; min-height: 0; overflow-y: auto; scrollbar-width: none; -ms-overflow-style: none; }
      #mini-queue-container::-webkit-scrollbar { display: none; }
      #mini-queue-list { list-style: none; padding: 0 10px 10px; margin: 0;}
      #mini-queue-list .queue-item { display: flex; align-items: center; justify-content: space-between; padding: 6px; border-radius: 8px; cursor: pointer; transition: background-color 0.2s; margin-bottom: 10px; }
      #mini-queue-list .queue-item:hover { background-color: var(--list-hover-bg); }
      #mini-queue-list .queue-item .song-info-clickable { display: flex; align-items: center; gap: 8px; overflow: hidden; flex-grow: 1; }
      #mini-queue-list .queue-item img { width: 40px; height: 40px; border-radius: 6px; object-fit: cover; flex-shrink: 0;}
      #mini-queue-list .queue-item div { overflow: hidden; }
      #mini-queue-list .queue-item p { margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; line-height: 1.3; }
      #mini-queue-list .queue-item .font-medium { color: var(--text-primary); font-size: 13px; }
      #mini-queue-list .queue-item .text-sm { font-size: 11px; }
      #mini-queue-list .queue-item .material-symbols-rounded { font-size: 20px; color: var(--accent-color); }
      #mini-queue-list .queue-item .w-4 { width: 16px; text-align: center; flex-shrink: 0; font-size: 11px; }
      #mini-queue-list .queue-item .drag-handle { display: none; }
      #mini-queue-list .bg-violet-500\\/30 { background-color: var(--active-item-bg); }
      #mini-queue-list .border-l-4 { border-left: 4px solid var(--accent-color); padding-left: 2px; }
      @media (min-width: 300px) and (min-height: 120px) {
        #player-container { flex-direction: column; height: auto; }
        .visible-content { flex-direction: column; justify-content: center; gap: 15px; padding: 20px 20px 10px; }
        #mini-album-art { width: 100px; height: 100px; }
        .info-and-progress { width: 100%; text-align: center; gap: 8px; }
        #progress-section-small { display: none; } 
        #progress-section-hover { display: flex; }
        #mini-queue-container { display: block; }
        .player-controls { gap: 15px; } 
        .controls-wrapper { gap: 10px; }
      }
    `;
  }

  function addControlListeners(pipWindow) {
    const pipDoc = pipWindow.document;
    const opener = pipWindow.opener;
    if (!opener) return;

    pipDoc
      .getElementById("mini-play-pause-btn")
      .addEventListener("click", () => {
        const btn = opener.document.getElementById("play-pause-btn");
        if (btn) btn.click();
      });
    pipDoc
      .getElementById("mini-prev-btn")
      .addEventListener("click", () => {
        const btn = opener.document.getElementById("prev-btn");
        if (btn) btn.click();
      });
    pipDoc
      .getElementById("mini-next-btn")
      .addEventListener("click", () => {
        const btn = opener.document.getElementById("next-btn");
        if (btn) btn.click();
      });
    pipDoc
      .getElementById("mini-shuffle-btn")
      .addEventListener("click", () => {
        const btn = opener.document.getElementById("shuffle-btn");
        if (btn) btn.click();
      });
    pipDoc
      .getElementById("mini-loop-btn")
      .addEventListener("click", () => {
        const btn = opener.document.getElementById("loop-btn");
        if (btn) btn.click();
      });

    const seekHandler = (e) => {
      const audioPlayer = opener.document.getElementById("audio-player");
      if (!audioPlayer || isNaN(audioPlayer.duration)) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const newTime =
        ((e.clientX - rect.left) / rect.width) * audioPlayer.duration;
      if (typeof opener.seekTo === "function") {
        opener.seekTo(newTime);
      } else if (audioPlayer) {
        audioPlayer.currentTime = newTime;
      }
    };
    pipDoc
      .getElementById("mini-progress-bar-container")
      .addEventListener("click", seekHandler);
    pipDoc
      .getElementById("mini-progress-bar-container-hover")
      .addEventListener("click", seekHandler);

    pipDoc
      .getElementById("preset-small")
      .addEventListener("click", () =>
        opener.restartPipWithDimensions(260, 89)
      );
    pipDoc
      .getElementById("preset-medium")
      .addEventListener("click", () =>
        opener.restartPipWithDimensions(300, 320)
      );
    pipDoc
      .getElementById("preset-large")
      .addEventListener("click", () =>
        opener.restartPipWithDimensions(415, 350)
      );

    pipDoc.getElementById("mini-queue-list").addEventListener("click", (e) => {
      const item = e.target.closest(".queue-item");
      if (item && item.dataset.index) {
        const indexToPlay = parseInt(item.dataset.index, 10);
        const mainQueueItem = opener.document.querySelector(
          `#queue-list .queue-item[data-index="${indexToPlay}"] .song-info-clickable`
        );
        if (mainQueueItem) {
          mainQueueItem.click();
        }
      }
    });
  }

  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return "-:--";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  }

  function updateMiniPlayerUI(pipDoc) {
    const audioPlayer = document.getElementById("audio-player");
    const mainPlayerCard = document.querySelector(
      '.song-card[data-type="current"]'
    );
    const mainQueueList = document.getElementById("queue-list");
    if (!audioPlayer || !mainPlayerCard || !pipDoc || !mainQueueList) return;

    const miniAlbumArt = pipDoc.getElementById("mini-album-art");
    const miniSongTitle = pipDoc.getElementById("mini-song-title");
    const miniSongArtist = pipDoc.getElementById("mini-song-artist");
    const miniPlayPauseIcon = pipDoc.getElementById("mini-play-pause-icon");
    const miniShuffleBtn = pipDoc.getElementById("mini-shuffle-btn");
    const miniLoopBtn = pipDoc.getElementById("mini-loop-btn");
    const miniLoopIcon = miniLoopBtn.querySelector("span");
    const miniQueueList = pipDoc.getElementById("mini-queue-list");

    const progressBars = {
      small: {
        bar: pipDoc.getElementById("mini-progress-bar"),
        handle: pipDoc.getElementById("mini-progress-handle"),
        currentTime: pipDoc.getElementById("mini-current-time"),
        duration: pipDoc.getElementById("mini-duration"),
      },
      hover: {
        bar: pipDoc.getElementById("mini-progress-bar-hover"),
        handle: pipDoc.getElementById("mini-progress-handle-hover"),
        currentTime: pipDoc.getElementById("mini-current-time-hover"),
        duration: pipDoc.getElementById("mini-duration-hover"),
      },
    };

    const mainAlbumArt = mainPlayerCard.querySelector("img");
    const mainTitle = mainPlayerCard.querySelector("h2");
    const mainArtist = mainPlayerCard.querySelector("p");
    const mainShuffleBtn = document.getElementById("shuffle-btn");
    const mainLoopBtnIcon = document.querySelector("#loop-btn span");

    if (mainAlbumArt && miniAlbumArt.src !== mainAlbumArt.src)
      miniAlbumArt.src = mainAlbumArt.src;
    if (mainTitle && miniSongTitle.textContent !== mainTitle.textContent)
      miniSongTitle.textContent = mainTitle.textContent;
    if (mainArtist && miniSongArtist.textContent !== mainArtist.textContent)
      miniSongArtist.textContent = mainArtist.textContent;

    miniPlayPauseIcon.textContent = audioPlayer.paused
      ? "play_circle"
      : "pause_circle";
    miniShuffleBtn.classList.toggle(
      "active",
      mainShuffleBtn.classList.contains("text-violet-400")
    );

    if (mainLoopBtnIcon) {
      const loopIconName = mainLoopBtnIcon.textContent;
      miniLoopIcon.textContent = loopIconName;
      miniLoopBtn.classList.toggle("active", loopIconName !== "repeat");
    }

    const duration = audioPlayer.duration;
    const currentTime = audioPlayer.currentTime;
    const formattedDuration =
      isNaN(duration) || duration <= 0 ? "-:--" : formatTime(duration);
    const formattedCurrentTime = formatTime(currentTime);
    const progressPercent =
      !isNaN(duration) && duration > 0 ? (currentTime / duration) * 100 : 0;

    for (const key in progressBars) {
      const elements = progressBars[key];
      elements.bar.style.width = `${progressPercent}%`;
      elements.handle.style.left = `calc(${progressPercent}% - 5px)`;
      elements.duration.textContent = formattedDuration;
      elements.currentTime.textContent = formattedCurrentTime;
    }

    if (miniQueueList.innerHTML !== mainQueueList.innerHTML) {
      miniQueueList.innerHTML = mainQueueList.innerHTML;
    }
  }

  async function showWindowOutControl(overrideWidth, overrideHeight) {
    if (!("documentPictureInPicture" in window)) return;
    if (pipWindow) return;
    const audioPlayer = document.getElementById("audio-player");
    if (!audioPlayer || !audioPlayer.src) return;

    let initialWidth, initialHeight;

    if (overrideWidth && overrideHeight) {
      initialWidth = overrideWidth;
      initialHeight = overrideHeight;
    } else {
      const savedDims = await PipSettingsDB.get("pipDimensions");
      const defaultDims = { width: 260, height: 89 };
      initialWidth = savedDims ? savedDims.width : defaultDims.width;
      initialHeight = savedDims ? savedDims.height : defaultDims.height;
    }

    try {
      pipWindow = await window.documentPictureInPicture.requestWindow({
        width: initialWidth,
        height: initialHeight,
      });
      const pipDoc = pipWindow.document;
      const localFontsStyle = pipDoc.createElement("style");
      localFontsStyle.textContent = `
        @font-face {font-family: "Lexend Deca";font-style: normal;font-weight: 300;font-display: swap;src: url("./resources/fonts/LexendDeca-Regular.ttf") format("truetype");}@font-face {font-family: "Poppins";font-style: normal;font-weight: 400;font-display: swap;src: url("./resources/fonts/Poppins-Regular.ttf") format("truetype");}@font-face {font-family: "Material Symbols Rounded";font-style: normal;font-weight: 100;src: url("./resources/icons/MaterialIconsRound-Regular.otf")format("opentype");}.material-symbols-rounded {font-family: "Material Symbols Rounded";font-weight: 100;font-style: normal;font-size: 22px;line-height: 1;letter-spacing: normal;text-transform: none;display: inline-block;white-space: nowrap;direction: ltr;-webkit-font-feature-settings: "liga";-webkit-font-smoothing: antialiased;font-variation-settings: "FILL" 1, "wght" 100, "GRAD" 100, "opsz" 40;}`;
      pipDoc.head.appendChild(localFontsStyle);

      const style = pipDoc.createElement("style");
      style.textContent = getMiniPlayerCSS();
      pipDoc.head.appendChild(style);
      pipDoc.body.innerHTML = getMiniPlayerHTML();

      addControlListeners(pipWindow);
      updateMiniPlayerUI(pipDoc);

      if (updateInterval) clearInterval(updateInterval);
      updateInterval = setInterval(() => updateMiniPlayerUI(pipDoc), 250);

      pipWindow.addEventListener("pagehide", () => {
        clearInterval(updateInterval);
        updateInterval = null;
        pipWindow = null;
        updatePipButtonState();
      });
    } catch (error) {
      console.error("Picture-in-Picture penceresi açılamadı:", error);
      pipWindow = null;
      throw error;
    }
  }

  function hideWindowOutControl() {
    if (pipWindow) {
      pipWindow.close();
    }
  }

  const miniPlayerPip = document.getElementById("mini-player-pip");
  let miniPlayerPipCheck = false;

  function miniPlayerPipChange() {
    if (pipWindow) {
      hideWindowOutControl();
    } else {
      showWindowOutControl()
        .then(() => {
          updatePipButtonState();
        })
        .catch((e) => {
          updatePipButtonState();
        });
    }
  }

  function updatePipButtonState() {
    const miniPlayerPip = document.getElementById("mini-player-pip");
    if (pipWindow) {
      miniPlayerPip.classList.add("text-violet-400");
    } else {
      miniPlayerPip.classList.remove("text-violet-400");
    }
  }

  miniPlayerPip.addEventListener("click", miniPlayerPipChange);

  window.addEventListener("load", () => {
    if (typeof seekTo === "function") {
      window.seekTo = seekTo;
    }
  });
})();
