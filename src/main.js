document.addEventListener("DOMContentLoaded", () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("./sw.js")
      .then(() => console.log("Service Worker registered"))
      .catch((err) => console.error("Service Worker failed", err));
  }
  const optimizeLibraryBtn = document.getElementById("optimize-library-btn");
  const clearLibraryBtn = document.getElementById(
    "not-used-songs-clear-library-btn",
  );
  const duplicateCleanupBtn = document.getElementById(
    "duplicate-names-cleanup-btn",
  );
  const contextShareSongBtn = document.getElementById("context-share-song");
  const receiveSongShareBtn = document.getElementById("receive-song-share-btn");
  const songShareQrCodeEl = document.getElementById("song-share-qr-code");
  const songShareCodeEl = document.getElementById("song-share-code-el");
  const songShareSenderStatusEl = document.getElementById(
    "song-share-sender-status",
  );
  const songShareChoosePlaylistCheck = document.getElementById(
    "song-share-choose-playlist-check",
  );
  const songShareReceiveInput = document.getElementById(
    "song-share-receive-input",
  );
  const songShareConnectBtn = document.getElementById("song-share-connect-btn");
  const playlistPanel = document.getElementById("playlist-panel"),
    queuePanel = document.getElementById("queue-panel"),
    renamePlaylistInput = document.getElementById("rename-playlist-input"),
    renamePlaylistBtn = document.getElementById("rename-playlist-btn");
  const audioPlayer = document.getElementById("audio-player"),
    previewPlayer = document.getElementById("preview-audio-player"),
    carouselContainer = document.getElementById("song-carousel-container"),
    spinningLogo = document.getElementById("spinning-logo"),
    playPauseBtn = document.getElementById("play-pause-btn"),
    playPauseIcon = document.getElementById("play-pause-icon"),
    nextBtn = document.getElementById("next-btn"),
    prevBtn = document.getElementById("prev-btn"),
    seekForwardBtn = document.getElementById("seek-forward-btn"),
    seekBackwardBtn = document.getElementById("seek-backward-btn"),
    progressContainer = document.getElementById("progress-container"),
    progressBar = document.getElementById("progress-bar"),
    progressHandle = document.getElementById("progress-handle");
  ((currentTimeDisplay = document.getElementById("current-time-display")),
    (durationDisplay = document.getElementById("duration-display")),
    (loopBtn = document.getElementById("loop-btn")),
    (shuffleBtn = document.getElementById("shuffle-btn")),
    (volumeIconBtn = document.getElementById("volume-icon-btn")),
    (volumeIcon = document.getElementById("volume-icon")),
    (volumeSlider = document.getElementById("volume-slider")),
    (playlistListEl = document.getElementById("playlist-list")),
    (openPlaylistBtn = document.getElementById("open-playlist-btn")),
    (closePlaylistBtn = document.getElementById("close-playlist-btn")),
    (closeQueueBtn = document.getElementById("close-queue-btn")),
    (modalOverlay = document.getElementById("modal-overlay")),
    (openMusicStoreBtn = document.getElementById("open-music-store-btn")),
    (openSleepTimerModalBtn = document.getElementById(
      "open-sleep-timer-modal-btn-small",
    )),
    (shareLinkInput = document.getElementById("share-link-input")),
    (copyShareLinkBtn = document.getElementById("copy-share-link-btn")),
    (sessionStatusEl = document.getElementById("session-status")),
    (openAddMusicModalBtn = document.getElementById(
      "open-add-music-modal-btn",
    )),
    (addMusicTitleInput = document.getElementById("add-music-title")),
    (addMusicArtistInput = document.getElementById("add-music-artist")),
    (addMusicCoverFileInput = document.getElementById("add-music-cover-file")),
    (removeFromLibraryBtn = document.getElementById("remove-from-library-btn")),
    (addMusicFileInput = document.getElementById("add-music-file")),
    (addMusicSubmitBtn = document.getElementById("add-music-submit-btn")),
    (addMusicCoverPreview = document.getElementById("add-music-cover-preview")),
    (lunetuneTabActions = document.getElementById("lunetune-tab-actions")));
  ((musicStoreListEl = document.getElementById("music-store-list")),
    (musicSearchInput = document.getElementById("music-search-input")),
    (playlistSelectionListEl = document.getElementById(
      "playlist-selection-list",
    )),
    (createPlaylistBtn = document.getElementById("create-playlist-btn")),
    (playlistNameInput = document.getElementById("playlist-name-input")),
    (confirmModalTitle = document.getElementById("confirm-modal-title")),
    (confirmModalMessage = document.getElementById("confirm-modal-message")),
    (confirmModalBtn = document.getElementById("confirm-modal-btn")),
    (notificationContainer = document.getElementById("notification-container")),
    (goToPlaylistMakerBtn = document.getElementById("go-to-playlist-maker")),
    (goToLunelightsBtn = document.getElementById("open-lunelights-btn")),
    (goToLunelightsBtnSmall = document.getElementById(
      "open-lunelights-btn-small",
    )),
    (liveRadioBtn = document.getElementById("live-radio-btn")),
    (radioStationListEl = document.getElementById("radio-station-list")),
    (searchRadioInput = document.getElementById("search-radio")),
    (offlineIndicatorBtn = document.getElementById("offline-indicator-btn")));
  const songContextMenu = document.getElementById("song-context-menu"),
    playlistContextMenu = document.getElementById("playlist-context-menu"),
    playlistContextRenameBtn = document.getElementById(
      "playlist-context-rename",
    ),
    playlistContextDeleteBtn = document.getElementById(
      "playlist-context-delete",
    );
  const playlistContextDirectTransferBtn = document.getElementById(
    "playlist-context-direct-transfer-to-maker",
  );
  const queueListEl = document.getElementById("queue-list"),
    sleepTimerStatusEl = document.getElementById("sleep-timer-status"),
    reactionContainer = document.getElementById("reaction-container"),
    emojiDisplayArea = document.getElementById("emoji-display-area");
  const moreActionsBtn = document.getElementById("more-actions-btn");
  const moreActionsBtnSmall = document.getElementById("more-actions-btn-small");
  const moreActionsMenu = document.getElementById("more-actions-context-menu");
  ((contextRemoveBtn = document.getElementById("context-remove-from-playlist")),
    (contextDeleteBtn = document.getElementById("context-delete-song")),
    (contextDownloadBtn = document.getElementById("context-download-song")),
    (contextEditBtn = document.getElementById("context-edit-song")),
    (editSongModal = document.getElementById("edit-song-modal")),
    (editSongTitleInput = document.getElementById("edit-song-title")),
    (editSongArtistInput = document.getElementById("edit-song-artist")),
    (editSongImageUrlInput = document.getElementById("edit-song-image-url")),
    (editSongImageFileInput = document.getElementById("edit-song-image-file")),
    (editSongSubmitBtn = document.getElementById("edit-song-submit-btn")),
    (panelGreetingEl = document.getElementById("panel-greeting")),
    (openSettingsModalBtn = document.getElementById("open-settings-modal-btn")),
    (openSettingsModalBtnSmall = document.getElementById(
      "open-settings-modal-btn-small",
    )),
    (usernameInput = document.getElementById("username-input")),
    (saveUsernameBtn = document.getElementById("save-username-btn")),
    (exportDataBtn = document.getElementById("export-data-btn")),
    (importDataFile = document.getElementById("import-data-file")),
    (lunetuneTabBtn = document.getElementById("lunetune-tab-btn")),
    (ncsTabBtn = document.getElementById("ncs-tab-btn")),
    (jamendoTabBtn = document.getElementById("jamendo-tab-btn")));
  ((playlistContextExportBtn = document.getElementById(
    "playlist-context-export",
  )),
    (importPlaylistFile = document.getElementById("import-playlist-file")));
  const newPlaylistCoverInput = document.getElementById(
      "new-playlist-cover-input",
    ),
    newPlaylistCoverPreview = document.getElementById(
      "new-playlist-cover-preview",
    ),
    renamePlaylistCoverInput = document.getElementById(
      "rename-playlist-cover-input",
    ),
    renamePlaylistCoverPreview = document.getElementById(
      "rename-playlist-cover-preview",
    );
  const openBattleModalBtn = document.getElementById(
      "more-open-battle-modal-btn",
    ),
    battleRoundsInput = document.getElementById("battle-rounds-input"),
    battleRoundsDisplay = document.getElementById("battle-rounds-display"),
    createBattleBtn = document.getElementById("create-battle-btn"),
    battleModal = document.getElementById("battle-modal"),
    battleConfigSection = document.getElementById("battle-config-section"),
    battleShareSection = document.getElementById("battle-share-section"),
    battleShareLink = document.getElementById("battle-share-link"),
    copyBattleLinkBtn = document.getElementById("copy-battle-link-btn"),
    battleStatus = document.getElementById("battle-status"),
    battleSelectionModal = document.getElementById("battle-selection-modal"),
    battleSelectedCount = document.getElementById("battle-selected-count"),
    battleTotalRequired = document.getElementById("battle-total-required"),
    battleSelectionSearch = document.getElementById("battle-selection-search"),
    battleConfirmSelectionBtn = document.getElementById(
      "battle-confirm-selection-btn",
    ),
    battleSelectionList = document.getElementById("battle-selection-list"),
    battleScoreBtns = document.querySelectorAll(".battle-score-btn"),
    battleResultModal = document.getElementById("battle-result-modal"),
    battleResultTitle = document.getElementById("battle-result-title"),
    battleResultMessage = document.getElementById("battle-result-message"),
    myBattleScoreEl = document.getElementById("my-battle-score"),
    opponentBattleScoreEl = document.getElementById("opponent-battle-score"),
    battleRatingModal = document.getElementById("battle-rating-modal"),
    battleStarsContainer = document.getElementById("battle-stars-container"),
    battleSubmitRatingBtn = document.getElementById("battle-submit-rating-btn");
  const playlistContextDownloadBtn = document.getElementById(
    "playlist-context-download",
  );
  const playlistContextRepairBtn = document.getElementById(
    "playlist-context-repair",
  );
  const startDownloadPlaylistBtn = document.getElementById(
    "start-download-playlist-btn",
  );
  const startRepairPlaylistBtn = document.getElementById(
    "start-repair-playlist-btn",
  );
  const menuRightToggle = document.getElementById("right-menu-toggle");
  const menuRightStorageKey = "right_menu_lock_enabled";
  const menuLeftToggle = document.getElementById("left-menu-toggle");
  const menuLeftStorageKey = "left_menu_lock_enabled";
  const startDirectTransferBtn = document.getElementById(
    "start-direct-transfer-btn",
  );
  const receiveDirectTransferBtn = document.getElementById(
    "receive-direct-transfer-btn",
  );
  const transferQrCodeEl = document.getElementById("transfer-qr-code");
  const transferPeerIdEl = document.getElementById("transfer-peer-id");
  const transferSenderStatusEl = document.getElementById(
    "transfer-sender-status",
  );
  const transferReceiveInput = document.getElementById(
    "transfer-receive-input",
  );
  const transferConnectBtn = document.getElementById("transfer-connect-btn");
  const transferProgressTitle = document.getElementById(
    "transfer-progress-title",
  );
  const transferProgressBar = document.getElementById("transfer-progress-bar");
  const transferProgressText = document.getElementById(
    "transfer-progress-text",
  );
  const transferProgressDetails = document.getElementById(
      "transfer-progress-details",
    ),
    cacheSizeDisplay = document.getElementById("cache-size-display"),
    clearCacheBtn = document.getElementById("clear-cache-btn");

  const MAKER_KEY = "lunetuneMaker";

  let sleepTimer = null;
  let sleepTimerInterval = null;

  const keepAliveVideo = document.createElement("video");
  keepAliveVideo.loop = true;
  keepAliveVideo.muted = true;
  keepAliveVideo.playsInline = true;
  keepAliveVideo.style.position = "fixed";
  keepAliveVideo.style.pointerEvents = "none";
  keepAliveVideo.style.opacity = "0";
  keepAliveVideo.src =
    "data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAAZmZGF0AAAAAgAAAABtb292AAAAbG12aGQAAAAA62U4QOtleEAAQAAAARACEAABAAABAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAIGdHJhawAAAFx0a2hkAAAAAOtleEAAAAAA62U4QAAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAABAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAEAAAACZWR0cwAAABxlbHN0AAAAAAAAAAEAAAEAAAEAAQAAAAAAACBtZGlhAAAAIG1kaGQAAAAA62U4QOtleEAAQAAAARACEAAAAAAhZGhybQAAAAAAAAAAAAAAAQAAAAAAAAAAAAA4AAAAG3NtdGgAAAAAAAAAAQAAAAAAAQAAAAEAAAAHbWhkcmcAAAAAAAAAAQAAAAEAAAAAAAB4AAAAlHN0c2QAAAAAAAAAAQAAAJhhdmMxAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAEAAQABAAAAAAEgACCntxy4AAAABmF2Y0MBAMgAAAAAA//8AAAAO//8AABWAAABqAAAB6GAAABqAAAB6AAAABuyAAAAb3N0dHMAAAAAAAAAAQAAAAEAAAAIdHRzYQAAAAAAAAABAAAAAQAAABhzdHN6AAAAAAAAAAAAAAABAAAAHgAAABRzdHNjAAAAAAAAAAEAAAABAAAAAQAAAAFzdGNvAAAAAAAAAAEAAAAsAAAAYXVkdGEAAAA1bWV0YQAAAAAAAAAhaGRscgAAAAAAAAAAbWRpcgAAAAAAAAAAAAAAAAAAAAAiaWxzdAAAABZkYXRhAAAAAQAAAAAAAAB0cmll";
  document.body.appendChild(keepAliveVideo);

  const silentPlayer = new Audio(
    "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAAAB",
  );
  silentPlayer.loop = true;
  silentPlayer.volume = 0.01;

  function activateSurvivalMode() {
    if (!isPlaying) return;
    if (silentPlayer.paused) {
      silentPlayer.play().catch(() => {});
    }
    if ("mediaSession" in navigator) {
      navigator.mediaSession.playbackState = "playing";
    }
  }

  function deactivateSurvivalMode() {
    if (!silentPlayer.paused) {
      silentPlayer.pause();
    }
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      spinningLogo.classList.remove("playing");
    } else {
      if (isPlaying) {
        spinningLogo.classList.add("playing");
      }
    }
  });
  const APP_VERSION = "1.1.5";
  const JAMENDO_CLIENT_ID = "d63aca13";
  let activeMusicStoreTab = "lunetune";
  let isClientPlaybackUnlocked = false;
  let searchTimeout;
  let previewTimeout;
  let wasMainPlayerPlaying = false;
  let currentPreviewId = null;
  let activePlaylistContextId = null;
  let wakeLock = null;

  let isBattleMode = false;
  let battleRounds = 10;
  let currentBattleRound = 1;
  let battleTurn = null;
  let myBattleSongs = [];
  let opponentBattleSongs = [];
  let myBattleScores = [];
  let opponentBattleScores = [];
  let battlePlaylist = [];
  let currentBattleIndex = 0;
  let isBattlePlaylistVerified = false;
  let lastSyncTime = 0;
  let battleNavVotes = {
    next: { my: false, opponent: false },
    prev: { my: false, opponent: false },
  };
  let battleSeekVotes = {
    fwd: { my: false, opponent: false },
    bwd: { my: false, opponent: false },
  };
  let currentBattleRating = 0;
  let hasMyRated = false;
  let hasOpponentRated = false;
  let currentTrackScores = { my: null, opponent: null };
  let battleSelectionInProgress = [];
  let preBattlePlayerState = null;

  function savePreBattleState() {
    if (isBattleMode) return;
    preBattlePlayerState = {
      isLiveMode: isLiveMode,
      currentPlaylistId: currentPlaylistId,
      currentPlaylist: [...currentPlaylist],
      shuffledPlaylist: [...shuffledPlaylist],
      currentTrackIndex: currentTrackIndex,
      isPlaying: isPlaying,
      time: audioPlayer.currentTime,
    };
  }

  function restorePreBattleState() {
    if (!preBattlePlayerState) {
      isLiveMode = false;
      currentTrackIndex = -1;
      currentPlaylist = [];
      shuffledPlaylist = [];
      currentPlaylistId = null;
      updateCarouselUI("none");
      return;
    }

    isLiveMode = preBattlePlayerState.isLiveMode;
    currentPlaylistId = preBattlePlayerState.currentPlaylistId;
    currentPlaylist = preBattlePlayerState.currentPlaylist;
    shuffledPlaylist = preBattlePlayerState.shuffledPlaylist;
    currentTrackIndex = preBattlePlayerState.currentTrackIndex;

    const wasPlaying = preBattlePlayerState.isPlaying;
    const restoredTime = preBattlePlayerState.time;

    if (currentTrackIndex > -1 && currentPlaylist.length > 0) {
      loadTrack(currentTrackIndex, "none", wasPlaying);
      if (restoredTime) {
        audioPlayer.addEventListener(
          "loadedmetadata",
          () => {
            audioPlayer.currentTime = restoredTime;
            updateProgress();
          },
          { once: true },
        );
      }
    } else {
      updateCarouselUI("none");
    }

    preBattlePlayerState = null;
  }

  const requestWakeLock = async () => {
    if (!("wakeLock" in navigator)) return;
    try {
      if (wakeLock && !wakeLock.released) return;
      wakeLock = await navigator.wakeLock.request("screen");
      console.log("SWL Active");
      wakeLock.addEventListener("release", () => {
        console.log("SWL Released");
      });
    } catch (err) {
      console.error(`SWL request failed: ${err.name}, ${err.message}`);
    }
  };

  const releaseWakeLock = async () => {
    if (wakeLock && !wakeLock.released) {
      try {
        await wakeLock.release();
        wakeLock = null;
        console.log("SWL Manuel Released");
      } catch (err) {
        console.error(
          `Failed to release Wake Lock: ${err.name}, ${err.message}`,
        );
      }
    }
  };

  const updateWakeLockState = async () => {
    let shouldWake = isPlaying;

    activeModals.forEach((modalId) => {
      const modal = document.getElementById(modalId);
      const wakeCheck = modal?.querySelector(".wake-lock-checkbox");
      if (wakeCheck && wakeCheck.checked) {
        shouldWake = true;
      }
    });

    if (shouldWake) {
      await requestWakeLock();
    } else {
      await releaseWakeLock();
    }
  };

  document.addEventListener("visibilitychange", async () => {
    if (document.visibilityState === "visible") {
      await updateWakeLockState();
    }
  });

  document.addEventListener("change", async (e) => {
    if (e.target.classList.contains("wake-lock-checkbox")) {
      await updateWakeLockState();
    }
  });

  let isMediaSessionActionLocked = false;
  let currentObjectUrl = null;
  let isHostSeeking = false;
  let seekEndTimeout;
  let trackLoadTimeout = null;
  let trackFailures = {};
  let songSharePeer = null;
  let songShareConn = null;
  let songToShareId = null;
  let masterSongLibrary = {},
    playlists = [],
    offlineSongsMap = {},
    currentPlaylist = [],
    shuffledPlaylist = [],
    currentPlaylistId = null,
    currentTrackIndex = -1,
    isPlaying = false,
    isChangingTrack = false,
    isLiveMode = false,
    songToAddId = null,
    confirmAction = null,
    loopState = 0,
    isShuffle = false,
    isAnimatingShuffle = false,
    lastVolume = 0.75,
    userSettings = { username: "Kullanıcı" };

  let hostState = {
    isWaitingForClient: false,
    pendingSongId: null,
    pendingAutoPlay: false,
    currentSyncId: null,
    isSyncing: false,
  };

  let fileToAdd = null;
  let coverDataUrlToAdd = null;
  let isRemoveModeActive = false;
  let lockRightMenu;
  let lockLeftMenu;
  let newPlaylistCoverDataUrl = null;
  let renamePlaylistCoverDataUrl = null;

  let peer = null;
  let conn = null;
  let transferPeer = null;
  let transferConn = null;

  let isHost = false;
  let isClient = false;
  let syncInterval = null;
  let initialSyncTimeout = null;
  let clientState = {
    currentLoadId: null,
    currentSongId: null,
  };
  let incomingBase64 = {};

  let transferState = {
    role: null,
    isTransferring: false,
    totalChunks: 0,
    receivedChunks: 0,
    parser: null,
    sendNextChunk: null,
  };

  const edgeThreshold = 50;
  let longPressTimer;
  const longPressDuration = 500;
  const radioStations = [
    {
      name: "JoyFM",
      group: "JoyTürk",
      streamUrl: "http://46.20.3.204:8010/joyfm",
    },
    {
      name: "JoyTürk",
      group: "JoyTürk",
      streamUrl: "https://27753.live.streamtheworld.com/JOY_TURK.mp3",
    },
    {
      name: "FenomenFM",
      group: "Karma",
      streamUrl:
        "https://live.radyofenomen.com/fenomen/128/icecast.audio?%20/;stream.mp3",
    },
    {
      name: "SüperFM",
      group: "Karma",
      streamUrl:
        "https://28513.live.streamtheworld.com/SUPER_FM128AAC.aac?/;stream.mp3",
    },
    {
      name: "Radyo 45'lik",
      group: "Karma",
      streamUrl: "https://stream.radyo45lik.com:4545/stream",
    },
    {
      name: "Radyo Alaturka",
      group: "Karma",
      streamUrl: "https://yayin.jumboserver.net:9100/stream?/;stream.mp3",
    },
    {
      name: "MetroFM",
      group: "Karma",
      streamUrl:
        "https://25583.live.streamtheworld.com/METRO_FM128AAC.aac?/;stream.mp3",
    },
    {
      name: "SlowTürk",
      group: "Karma",
      streamUrl: "https://radyo.duhnet.tv/slowturk?/;stream.mp3",
    },
    {
      name: "AşkFM",
      group: "Karma",
      streamUrl:
        "https://stream.netradyom.com/radio/8000/radio.mp3?/;stream.mp3",
    },
    {
      name: "Polis Radyosu",
      group: "Karma",
      streamUrl: "https://m.egm.gov.tr:8093/stream?/;stream.mp3",
    },
    {
      name: "BestFM",
      group: "Karma",
      streamUrl:
        "https://officialbestfm.radyotvonline.net/bestfmofficial?/;stream.mp3",
    },
    {
      name: "Radio Mydonose",
      group: "Karma",
      streamUrl:
        "https://playerservices.streamtheworld.com/api/livestream-redirect/RADIO_MYDONOSE128AAC.aac?/;stream.mp3",
    },
    {
      name: "Radyo Seymen",
      group: "Karma",
      streamUrl: "https://yayin.radyoseymen.com.tr:1070/stream?/;stream.mp3",
    },
    {
      name: "Pal Doğa",
      group: "Karma",
      streamUrl: "https://free.rcast.net/200259",
    },
    {
      name: "Radyo Megasite",
      group: "Karma",
      streamUrl:
        "https://stream.netradyom.com/listen/megasite/radio.mp3/;stream.mp3",
    },
    {
      name: "Efkar FM",
      group: "Karma",
      streamUrl:
        "https://playerservices.streamtheworld.com/api/livestream-redirect/EFKAR128AAC.aac?/;stream.mp3",
    },
    {
      name: "Radyo Baba",
      group: "Karma",
      streamUrl:
        "https://officialbabaradyo.radyotvonline.net/babaofficial?/;stream.mp3",
    },
    {
      name: "KEXP",
      group: "Karma",
      streamUrl: "http://live-mp3-128.kexp.org/kexp128.mp3",
    },
    {
      name: "NPR",
      group: "Karma",
      streamUrl: "https://npr-ice.streamguys1.com/live.mp3",
    },
    {
      name: "Radio Paradise",
      group: "Karma",
      streamUrl: "http://stream.radioparadise.com/mp3-192",
    },
    {
      name: "Classic FM",
      group: "Karma",
      streamUrl: "https://media-ice.musicradio.com/ClassicFMMP3",
    },
    {
      name: "FIP",
      group: "Karma",
      streamUrl: "https://icecast.radiofrance.fr/fip-midfi.mp3",
    },
    {
      name: "TRT Radyo 1",
      group: "TRT",
      streamUrl: "https://trt.radyotvonline.net/trt1",
    },
    {
      name: "TRT FM",
      group: "TRT",
      streamUrl: "https://trt.radyotvonline.net/trtfm",
    },
    {
      name: "TRT Radyo Haber",
      group: "TRT",
      streamUrl: "https://trt.radyotvonline.net/trthaber",
    },
    {
      name: "Bayram FM",
      group: "Bayram FM",
      streamUrl: "https://sslyayin.netyayin.net/3442/stream/;stream.mp3",
    },
  ];

  let activeModals = [];
  let isPanelLockedOpen = false;
  let isQueuePanelLockedOpen = false;
  const nonClosableModals = [
    "confirm-modal",
    "add-music-modal",
    "transfer-progress-modal",
  ];

  const DBHelper = {
    db: null,
    _initPromise: null,
    init() {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open("LunetuneDB", 3);
        request.onupgradeneeded = (event) => {
          this.db = event.target.result;
          if (!this.db.objectStoreNames.contains("playlists")) {
            this.db.createObjectStore("playlists", { keyPath: "id" });
          }
          if (!this.db.objectStoreNames.contains("userSongs")) {
            this.db.createObjectStore("userSongs", { keyPath: "id" });
          }
          if (!this.db.objectStoreNames.contains("settings")) {
            this.db.createObjectStore("settings", { keyPath: "id" });
          }
          if (!this.db.objectStoreNames.contains("data")) {
            this.db.createObjectStore("data");
          }
          if (!this.db.objectStoreNames.contains("OfflineSongs")) {
            this.db.createObjectStore("OfflineSongs", { keyPath: "id" });
          }
        };
        request.onsuccess = (event) => {
          this.db = event.target.result;
          resolve(this.db);
        };
        request.onerror = (event) => {
          console.error("IndexedDB hatası:", event.target.error);
          reject(event.target.error);
        };
      });
    },
    async put(storeName, key, data) {
      const db = await this.init();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, "readwrite");
        const store = transaction.objectStore(storeName);
        const request = data ? store.put(data, key) : store.put(key);
        request.onsuccess = () => resolve(request.result);
        request.onerror = (e) => reject(e.target.error);
      });
    },
    async get(storeName, key) {
      const db = await this.init();
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction(storeName, "readonly");
        const store = transaction.objectStore(storeName);
        const request = store.get(key);
        request.onsuccess = () => resolve(request.result);
        request.onerror = (e) => reject(e.target.error);
      });
    },
    async getAll(storeName) {
      const db = await this.init();
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction(storeName, "readonly");
        const store = transaction.objectStore(storeName);
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = (e) => reject(e.target.error);
      });
    },
    async delete(storeName, key) {
      const db = await this.init();
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction(storeName, "readwrite");
        const store = transaction.objectStore(storeName);
        const request = store.delete(key);
        request.onsuccess = () => resolve();
        request.onerror = (e) => reject(e.target.error);
      });
    },
    async clear(storeName) {
      const db = await this.init();
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction(storeName, "readwrite");
        const store = transaction.objectStore(storeName);
        const request = store.clear();
        request.onsuccess = () => resolve();
        request.onerror = (e) => reject(e.target.error);
      });
    },
  };

  async function repairAndValidatePlaylists(playlistsToRepair) {
    const repairPromises = playlistsToRepair.map(async (playlist) => {
      if (!Array.isArray(playlist.songs)) {
        playlist.songs = [];
      }
      const originalSongCount = playlist.songs.length;
      const validSongs = playlist.songs.filter((songId) =>
        masterSongLibrary.hasOwnProperty(songId),
      );
      if (validSongs.length < originalSongCount) {
        playlist.songs = validSongs;
        try {
          await DBHelper.put("playlists", playlist);
        } catch (error) {
          console.error(
            `${playlist.name} listesi güncellenirken hata oluştu:`,
            error,
          );
        }
      }
      return playlist;
    });
    return await Promise.all(repairPromises);
  }

  function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result.split(",")[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  function base64ToBlob(base64, mimeType = "application/octet-stream") {
    const byteCharacters = atob(base64);
    const byteArrays = [];
    const sliceSize = 512;

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: mimeType });
  }

  async function saveSettings() {
    try {
      await DBHelper.put("settings", {
        id: "playerSettings",
        volume: audioPlayer.volume,
        lastVolume: lastVolume,
        loopState: loopState,
        shuffle: isShuffle,
      });
    } catch (error) {
      console.error("Ayarlar kaydedilemedi:", error);
    }
  }

  function savePlayerState() {
    if (
      isPlaying &&
      !isLiveMode &&
      currentTrackIndex > -1 &&
      currentPlaylistId
    ) {
      const playbackList = isShuffle ? shuffledPlaylist : currentPlaylist;
      const state = {
        id: "playerState",
        playlistId: currentPlaylistId,
        trackId: playbackList[currentTrackIndex],
        time: audioPlayer.currentTime,
      };
      DBHelper.put("settings", state).catch((err) =>
        console.error("Çalar durumu kaydedilemedi:", err),
      );
    }
  }

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

  function processImage(file, width = 128, height = 128) {
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

  function resizeImage(file, width, height) {
    return new Promise((resolve, reject) => {
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
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg"));
        };
        img.onerror = (error) => reject(error);
      };
      reader.onerror = (error) => reject(error);
    });
  }

  async function updateCacheSizeDisplay() {
    if (navigator.storage && navigator.storage.estimate) {
      try {
        const estimate = await navigator.storage.estimate();
        const sizeStr = (estimate.usage / (1024 * 1024)).toFixed(2);
        cacheSizeDisplay.textContent = `${sizeStr} MB`;
      } catch (e) {
        cacheSizeDisplay.textContent = "Hata";
      }
    } else {
      cacheSizeDisplay.textContent = "Bilinmiyor";
    }
  }

  async function clearAllCaches() {
    if (!("caches" in window)) return;
    try {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((name) => caches.delete(name)));
      showNotification("Önbellek başarıyla temizlendi.", "success");
      updateCacheSizeDisplay();
    } catch (e) {
      console.error("Cache clearing failed:", e);
      showNotification("Önbellek temizlenirken hata oluştu.", "error");
    }
  }

  function fadeVolume(audioElement, direction, duration = 400) {
    return new Promise((resolve) => {
      const targetVolume =
        direction === "out"
          ? 0
          : audioElement === audioPlayer
            ? lastVolume
            : 0.5;
      const initialVolume = audioElement.volume;
      const steps = 20;
      const stepDuration = duration / steps;
      const volumeStep = (targetVolume - initialVolume) / steps;
      if (direction === "in" && audioElement.paused) {
        audioElement
          .play()
          .catch((e) => console.error("Fade-in play error:", e));
      }
      let currentStep = 0;
      const fade = setInterval(() => {
        currentStep++;
        const newVolume = initialVolume + volumeStep * currentStep;
        if (
          (direction === "out" && newVolume <= 0) ||
          (direction === "in" && newVolume >= targetVolume)
        ) {
          audioElement.volume = targetVolume;
          clearInterval(fade);
          if (direction === "out") {
            audioElement.pause();
          }
          resolve();
        } else {
          audioElement.volume = newVolume;
        }
      }, stepDuration);
    });
  }

  function createStreamingParser(onObjectComplete) {
    let buffer = "";
    let depth = 0;
    let inString = false;
    let isEscaped = false;
    let objectStartIndex = -1;

    const processCompletedObject = (objString) => {
      try {
        const obj = JSON.parse(objString);
        onObjectComplete(obj);
      } catch (e) {
        console.error(
          "Ayrıştırılan obje işlenemedi:",
          e,
          objString.substring(0, 100),
        );
      }
    };

    const push = (chunk) => {
      buffer += chunk;
      let i = 0;
      while (i < buffer.length) {
        const char = buffer[i];
        if (inString) {
          if (isEscaped) {
            isEscaped = false;
          } else if (char === "\\") {
            isEscaped = true;
          } else if (char === '"') {
            inString = false;
          }
        } else {
          if (char === '"') {
            inString = true;
            isEscaped = false;
          } else if (char === "{") {
            depth++;
            if (depth === 2) {
              objectStartIndex = i;
            }
          } else if (char === "}") {
            if (depth === 2) {
              if (objectStartIndex !== -1) {
                const objString = buffer.substring(objectStartIndex, i + 1);
                processCompletedObject(objString);
                buffer = buffer.substring(i + 1);
                i = -1;
                objectStartIndex = -1;
              }
            }
            depth--;
          }
        }
        i++;
      }
    };
    return { push };
  }

  function createSongCard(song, type, initialStyle = null) {
    const card = document.createElement("div");
    card.dataset.type = type;
    card.className = "song-card absolute";
    const isCurrent = type === "current";
    const fallbackErrorImage =
      "https://lunetune.xmeroriginals.com/resources/cardlogoerror.png";
    const coverArt = song
      ? song.image ||
        `https://placehold.co/300x300/4a4f8a/ffffff?text=${encodeURIComponent(
          song.title.charAt(0),
        )}`
      : "https://lunetune.xmeroriginals.com/resources/lunetune-thumb.png";
    const title = song ? song.title : isCurrent ? "Müzik Seçin" : "",
      artist = song ? song.artist : isCurrent ? "Henüz şarkı çalınmıyor" : "";
    let isLiked = false;
    if (song) {
      const favoritesPlaylist = playlists.find((p) => p.id === 1);
      if (favoritesPlaylist) {
        isLiked = favoritesPlaylist.songs.includes(song.id);
      }
    }
    let actionButtonHTML = "";
    if (song && !song.isLive) {
      if (song.isBroken) {
        actionButtonHTML = `<button class="broken-song-btn text-red-500" title="Bu ses desteklenmiyor"><span class="material-symbols-rounded notranslate text-3xl">warning</span></button>`;
      } else {
        actionButtonHTML = `<button class="like-btn hover:text-pink-400 ${
          isLiked ? "text-pink-400" : "text-white/60"
        }"><span class="material-symbols-rounded notranslate text-3xl">favorite</span></button>`;
      }
    }
    const imgClasses = isCurrent ? "w-80 h-80" : "w-64 h-64",
      titleSize = isCurrent ? "text-3xl" : "text-xl",
      artistSize = isCurrent ? "text-lg" : "text-md",
      marginTop = isCurrent ? "mt-8" : "mt-4";
    card.innerHTML = `<img src="${coverArt}" alt="${title}" class="rounded-lg shadow-2xl ${imgClasses} object-cover mx-auto" onerror="this.onerror=null; this.src='${fallbackErrorImage}';"><div class="${marginTop} flex items-center justify-center gap-4"><h2 class="${titleSize} font-bold text-white tracking-wide truncate max-w-xs">${title}</h2>${actionButtonHTML}</div><p class="${artistSize} text-[#b9b9c9] mt-1 truncate max-w-xs">${artist}</p>`;
    if (initialStyle) {
      Object.assign(card.style, initialStyle);
    } else {
      if (type === "prev") {
        card.style.transform = "translateX(-85%) rotateY(35deg) scale(0.75)";
        card.style.opacity = "0.3";
      } else if (type === "next") {
        card.style.transform = "translateX(85%) rotateY(-35deg) scale(0.75)";
        card.style.opacity = "0.3";
      } else {
        card.style.transform = "translateX(0) scale(1) rotateY(0)";
        card.style.opacity = "1";
        card.style.zIndex = "10";
      }
    }
    return card;
  }

  function updateCarouselUI(direction = "none") {
    if (isLiveMode) return;
    if (
      carouselContainer.dataset.isAnimating === "true" &&
      direction !== "none"
    )
      return;

    const playbackList = isShuffle ? shuffledPlaylist : currentPlaylist;
    const totalSongs = playbackList.length;
    const currentSong =
      currentTrackIndex > -1
        ? masterSongLibrary[playbackList[currentTrackIndex]]
        : null;
    const prevSong =
      totalSongs > 1 && currentTrackIndex > 0
        ? masterSongLibrary[playbackList[currentTrackIndex - 1]]
        : null;
    const nextSong =
      totalSongs > 1 && currentTrackIndex < totalSongs - 1
        ? masterSongLibrary[playbackList[currentTrackIndex + 1]]
        : null;

    if (direction === "none") {
      carouselContainer.innerHTML = "";
      if (prevSong) {
        carouselContainer.appendChild(createSongCard(prevSong, "prev"));
      }
      carouselContainer.appendChild(createSongCard(currentSong, "current"));
      if (nextSong) {
        carouselContainer.appendChild(createSongCard(nextSong, "next"));
      }
      return;
    }

    if (totalSongs <= 1) {
      updateCarouselUI("none");
      return;
    }

    carouselContainer.dataset.isAnimating = "true";
    const transitionDuration = 400;
    const prevCard = carouselContainer.querySelector('[data-type="prev"]');
    const currentCard = carouselContainer.querySelector(
      '[data-type="current"]',
    );
    const nextCard = carouselContainer.querySelector('[data-type="next"]');
    const setCardState = (card, state) => {
      if (!card) return;
      const img = card.querySelector("img");
      const titleContainer = card.querySelector("h2").parentElement;
      const title = card.querySelector("h2");
      const artist = card.querySelector("p");
      if (state === "current") {
        img.classList.remove("w-64", "h-64");
        img.classList.add("w-80", "h-80");
        titleContainer.classList.remove("mt-4");
        titleContainer.classList.add("mt-8");
        title.classList.remove("text-xl");
        title.classList.add("text-3xl");
        artist.classList.remove("text-md");
        artist.classList.add("text-lg");
      } else {
        img.classList.remove("w-80", "h-80");
        img.classList.add("w-64", "h-64");
        titleContainer.classList.remove("mt-8");
        titleContainer.classList.add("mt-4");
        title.classList.remove("text-3xl");
        title.classList.add("text-xl");
        artist.classList.remove("text-lg");
        artist.classList.add("text-md");
      }
    };
    if (direction === "next") {
      const newNextSong =
        currentTrackIndex + 1 < playbackList.length
          ? masterSongLibrary[playbackList[currentTrackIndex + 1]]
          : null;
      if (prevCard) {
        prevCard.style.transform =
          "translateX(-170%) rotateY(70deg) scale(0.5)";
        prevCard.style.opacity = "0";
      }
      if (currentCard) {
        currentCard.dataset.type = "prev";
        currentCard.style.transform =
          "translateX(-85%) rotateY(35deg) scale(0.75)";
        currentCard.style.opacity = "0.3";
        currentCard.style.zIndex = "0";
        setCardState(currentCard, "prev");
      }
      if (nextCard) {
        nextCard.dataset.type = "current";
        nextCard.style.transform = "translateX(0) scale(1) rotateY(0)";
        nextCard.style.opacity = "1";
        nextCard.style.zIndex = "10";
        setCardState(nextCard, "current");
      }
      if (newNextSong) {
        const newNextCard = createSongCard(newNextSong, "next", {
          transform: "translateX(170%) rotateY(-70deg) scale(0.5)",
          opacity: "0",
        });
        carouselContainer.appendChild(newNextCard);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            newNextCard.style.transform =
              "translateX(85%) rotateY(-35deg) scale(0.75)";
            newNextCard.style.opacity = "0.3";
          });
        });
      }
    } else if (direction === "prev") {
      const newPrevSong =
        currentTrackIndex - 1 >= 0
          ? masterSongLibrary[playbackList[currentTrackIndex - 1]]
          : null;
      if (nextCard) {
        nextCard.style.transform =
          "translateX(170%) rotateY(-70deg) scale(0.5)";
        nextCard.style.opacity = "0";
      }
      if (currentCard) {
        currentCard.dataset.type = "next";
        currentCard.style.transform =
          "translateX(85%) rotateY(-35deg) scale(0.75)";
        currentCard.style.opacity = "0.3";
        currentCard.style.zIndex = "0";
        setCardState(currentCard, "next");
      }
      if (prevCard) {
        prevCard.dataset.type = "current";
        prevCard.style.transform = "translateX(0) scale(1) rotateY(0)";
        prevCard.style.opacity = "1";
        prevCard.style.zIndex = "10";
        setCardState(prevCard, "current");
      }
      if (newPrevSong) {
        const newPrevCard = createSongCard(newPrevSong, "prev", {
          transform: "translateX(-170%) rotateY(70deg) scale(0.5)",
          opacity: "0",
        });
        carouselContainer.insertBefore(
          newPrevCard,
          carouselContainer.firstChild,
        );
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            newPrevCard.style.transform =
              "translateX(-85%) rotateY(35deg) scale(0.75)";
            newPrevCard.style.opacity = "0.3";
          });
        });
      }
    }
    setTimeout(() => {
      updateCarouselUI("none");
      delete carouselContainer.dataset.isAnimating;
    }, transitionDuration);
  }

  function exitLiveMode() {
    if (!isLiveMode) return;
    isLiveMode = false;
    [
      nextBtn,
      prevBtn,
      loopBtn,
      seekForwardBtn,
      seekBackwardBtn,
      shuffleBtn,
    ].forEach((btn) => (btn.disabled = false));
    progressContainer.style.pointerEvents = "auto";
    progressContainer.classList.remove("cursor-not-allowed");
    loadTrack(currentTrackIndex, "none");
  }

  function playLiveRadio(stationName, streamUrl) {
    if (!isLiveMode) {
      pauseTrack();
    }
    isLiveMode = true;
    currentPlaylist = [];
    shuffledPlaylist = [];
    currentPlaylistId = null;
    currentTrackIndex = -1;
    const liveSong = {
      id: "live_radio_stream",
      title: `${stationName}`,
      artist: "Canlı",
      image: `https://placehold.co/300x300/e91e63/ffffff?text=${encodeURIComponent(
        stationName.charAt(0),
      )}`,
      isLive: true,
    };
    masterSongLibrary[liveSong.id] = liveSong;
    carouselContainer.innerHTML = "";
    const liveCard = createSongCard(liveSong, "current");
    carouselContainer.appendChild(liveCard);
    [
      nextBtn,
      prevBtn,
      loopBtn,
      seekForwardBtn,
      seekBackwardBtn,
      shuffleBtn,
    ].forEach((btn) => (btn.disabled = true));
    progressContainer.style.pointerEvents = "none";
    progressContainer.classList.add("cursor-not-allowed");
    durationDisplay.textContent = "Live";
    currentTimeDisplay.textContent = "-:--";
    progressBar.style.width = "0%";
    progressHandle.style.left = "0%";
    audioPlayer.src = streamUrl;
    audioPlayer.load();
    playTrack();
    updateMediaSession();
  }

  function loadTrack(trackIndex, direction = "none", autoPlay = false) {
    if (isHost && initialSyncTimeout) {
      clearTimeout(initialSyncTimeout);
      initialSyncTimeout = null;
    }
    stopPreview();

    isChangingTrack = true;
    activateSurvivalMode();
    audioPlayer.pause();

    const playbackList = isShuffle ? shuffledPlaylist : currentPlaylist;
    if (isLiveMode) exitLiveMode();
    if (trackIndex < 0 || trackIndex >= playbackList.length) {
      currentTrackIndex = -1;
      audioPlayer.src = "";
      updateCarouselUI("none");
      durationDisplay.textContent = "-:--";
      currentTimeDisplay.textContent = "-:--";
      progressBar.style.width = "0%";
      progressHandle.style.left = "0%";
      if (isHost) broadcastMessage({ t: "loading", reason: "playlist_end" });
      renderPlaybackOrder();
      return;
    }

    const tempSongId = playbackList[trackIndex];
    const tempTrack = masterSongLibrary[tempSongId];
    const isIndirili =
      tempTrack &&
      (offlineSongsMap[tempTrack.id] ||
        (tempTrack.url && offlineSongsMap[tempTrack.url]));
    if (!navigator.onLine && tempTrack && !tempTrack.isLocal && !isIndirili) {
      let foundIndex = -1;
      for (let i = trackIndex + 1; i < playbackList.length; i++) {
        const s = masterSongLibrary[playbackList[i]];
        const isSIndirili =
          s && (offlineSongsMap[s.id] || (s.url && offlineSongsMap[s.url]));
        if (s && (s.isLocal || isSIndirili)) {
          foundIndex = i;
          break;
        }
      }
      if (foundIndex === -1) {
        for (let i = 0; i < trackIndex; i++) {
          const s = masterSongLibrary[playbackList[i]];
          const isSIndirili =
            s && (offlineSongsMap[s.id] || (s.url && offlineSongsMap[s.url]));
          if (s && (s.isLocal || isSIndirili)) {
            foundIndex = i;
            break;
          }
        }
      }

      if (foundIndex !== -1) {
        loadTrack(foundIndex, direction, autoPlay);
        return;
      } else {
        showNotification(
          "Bu listede çevrimdışı dinlenebilecek şarkı yok. İnternet bağlantısı gerekiyor.",
          "error",
          5000,
        );
        currentTrackIndex = -1;
        audioPlayer.src = "";
        updateCarouselUI("none");
        durationDisplay.textContent = "-:--";
        currentTimeDisplay.textContent = "-:--";
        progressBar.style.width = "0%";
        progressHandle.style.left = "0%";
        if (isHost) broadcastMessage({ t: "loading", reason: "playlist_end" });
        renderPlaybackOrder();
        return;
      }
    }

    currentTrackIndex = trackIndex;
    renderPlaybackOrder();
    const songId = playbackList[currentTrackIndex];
    const track = masterSongLibrary[songId];
    if (!track) {
      showNotification("Çalınacak şarkı bulunamadı, bozuk olabilir.", "error");
      if (autoPlay || isPlaying) {
        setTimeout(() => nextTrack(), 1000);
      }
      return;
    }
    if (direction === "fade") {
      carouselContainer.classList.add("fading-out");
      setTimeout(() => {
        updateCarouselUI("none");
        carouselContainer.classList.remove("fading-out");
      }, 300);
    } else {
      updateCarouselUI(direction);
    }
    updateMediaSession();

    checkConnectionAndPrefetch(trackIndex);

    if (currentObjectUrl) {
      URL.revokeObjectURL(currentObjectUrl);
      currentObjectUrl = null;
    }

    const offlineData = track.isLocal
      ? null
      : offlineSongsMap[track.url] || offlineSongsMap[track.id];
    const source = track.isLocal
      ? URL.createObjectURL(track.fileBlob)
      : offlineData
        ? URL.createObjectURL(offlineData.blob)
        : track.url;

    if (track.isLocal || offlineData) currentObjectUrl = source;

    if (isHost && conn && conn.open) {
      const syncId = `sync_${Date.now()}`;
      hostState.isWaitingForClient = true;
      hostState.pendingSongId = track.id;
      hostState.pendingAutoPlay = autoPlay || isPlaying;
      hostState.currentSyncId = syncId;
      broadcastMessage({
        t: "load_track",
        syncId: syncId,
        metadata: {
          id: track.id,
          isLocal: track.isLocal,
          url: track.isLocal ? null : track.url,
          title: track.title,
          artist: track.artist,
          image: track.image,
          mime: track.fileBlob ? track.fileBlob.type : "audio/mpeg",
        },
      });
      audioPlayer.currentTime = 0;
      audioPlayer.src = source;
      audioPlayer.load();
      showNotification(`${track.title} senkronize ediliyor...`, "info", 5000);
    } else if (!isClient) {
      audioPlayer.src = source;
      audioPlayer.load();
      if (autoPlay || isPlaying) {
        playTrack();
      }
    }

    clearTimeout(trackLoadTimeout);
    if (autoPlay || isPlaying) {
      activateSurvivalMode();
      if ("mediaSession" in navigator) {
        navigator.mediaSession.playbackState = "playing";
      }
      trackLoadTimeout = setTimeout(() => {
        if (
          audioPlayer.readyState < 3 &&
          !isLiveMode &&
          isPlaying &&
          !isClient
        ) {
          handleTrackLoadingIssue();
        }
      }, 7000);
    }
  }

  function handleTrackLoadingIssue() {
    const playbackList = isShuffle ? shuffledPlaylist : currentPlaylist;
    const songId = playbackList[currentTrackIndex];
    if (!songId) return;

    if (!trackFailures[songId]) trackFailures[songId] = 0;
    trackFailures[songId]++;

    if (trackFailures[songId] < 3) {
      const nextIdx = (currentTrackIndex + 1) % playbackList.length;
      if (nextIdx !== currentTrackIndex) {
        const failedSongId = playbackList[currentTrackIndex];
        playbackList[currentTrackIndex] = playbackList[nextIdx];
        playbackList[nextIdx] = failedSongId;

        console.warn(
          `Track ${failedSongId} failed (${trackFailures[failedSongId]}/3), swapping with next.`,
        );
        showNotification("Bağlantı zayıf, parça sırası kaydırıldı...", "info");
        loadTrack(currentTrackIndex, "fade", true);
      } else {
        nextTrack();
      }
    } else {
      const song = masterSongLibrary[songId];
      if (song) song.isBroken = true;
      console.error(`Track ${songId} failed 3 times. Marking as broken.`);
      showNotification("Bu parça yüklenemedi ve atlandı.", "error");
      nextTrack();
    }
  }

  function checkConnectionAndPrefetch(currentIndex) {
    const connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;
    let prefetchCount = 1;

    if (connection) {
      if (
        connection.type === "wifi" ||
        connection.type === "ethernet" ||
        connection.effectiveType === "4g"
      ) {
        prefetchCount = 3;
      }
      if (connection.saveData === true) {
        prefetchCount = 1;
      }
    }

    const playbackList = isShuffle ? shuffledPlaylist : currentPlaylist;
    if (!playbackList || playbackList.length === 0) return;

    for (let i = 0; i <= prefetchCount; i++) {
      const targetIndex = (currentIndex + i) % playbackList.length;
      const targetId = playbackList[targetIndex];
      const targetSong = masterSongLibrary[targetId];
      if (
        targetSong &&
        !targetSong.isLocal &&
        targetSong.url &&
        !targetSong.fileBlob &&
        !(offlineSongsMap[targetSong.url] || offlineSongsMap[targetSong.id])
      ) {
        caches.open("lunetune-audio-v1").then((cache) => {
          cache.match(targetSong.url).then((cached) => {
            if (!cached) {
              const priority = i === 0 ? "high" : "low";
              fetch(targetSong.url, { priority }).catch(() => {});
            }
          });
        });
      }
    }
  }

  setInterval(() => {
    if (currentTrackIndex > -1) {
      checkConnectionAndPrefetch(currentTrackIndex);
    }
  }, 60000);

  if (navigator.connection) {
    navigator.connection.addEventListener("change", () => {
      if (currentTrackIndex > -1) checkConnectionAndPrefetch(currentTrackIndex);
    });
  }

  function updatePlayPauseUI(playing) {
    isPlaying = playing;
    playPauseIcon.textContent = isPlaying ? "pause_circle" : "play_circle";
    if (isPlaying) {
      if (!document.hidden) spinningLogo.classList.add("playing");
      if ("mediaSession" in navigator)
        navigator.mediaSession.playbackState = "playing";
    } else {
      spinningLogo.classList.remove("playing");
      if ("mediaSession" in navigator)
        navigator.mediaSession.playbackState = "paused";
    }
    updateMediaSession();
  }

  function playTrack() {
    if (currentTrackIndex === -1 && !isLiveMode && !isBattleMode) return;
    if (isClient && !isBattleMode) return;
    stopPreview();

    if (isPlaying && audioPlayer.paused === false) return;

    if (isHost && hostState.isWaitingForClient) {
      hostState.pendingAutoPlay = true;
      showNotification(
        "Arkadaşınla senkronize ediliyor, lütfen bekle...",
        "info",
      );
      return;
    }
    audioPlayer
      .play()
      .then(() => {
        keepAliveVideo.play().catch(() => {});
        updatePlayPauseUI(true);
        activateSurvivalMode();
        broadcastCurrentState();
        updateWakeLockState();
      })
      .catch((error) => {
        keepAliveVideo.pause();
        console.error("Çalma hatası:", error);
        updatePlayPauseUI(false);
        activateSurvivalMode();
      });
  }

  function pauseTrack() {
    if (isClient && !isBattleMode) return;
    audioPlayer.pause();
    silentPlayer.pause();
    keepAliveVideo.pause();
    updatePlayPauseUI(false);
    updateWakeLockState();
    broadcastCurrentState();
  }

  function togglePlayPause() {
    if (isBattleMode && isClient) {
      updatePlayPauseUI(!isPlaying);
      broadcastMessage({ t: "battle_request_toggle_pause" });
      if (!isPlaying) {
        audioPlayer.pause();
      } else {
      }
      return;
    }
    if (isClient && !isBattleMode) return;

    if (isPlaying) {
      pauseTrack();
    } else {
      const playbackList = isShuffle ? shuffledPlaylist : currentPlaylist;
      if (currentTrackIndex === -1 && playbackList.length > 0 && !isLiveMode) {
        loadTrack(0, "none");
        playTrack();
      } else {
        playTrack();
      }
    }
  }

  function nextTrack() {
    if (isBattleMode) {
      voteBattleNav("next");
      return;
    }
    if (
      carouselContainer.dataset.isAnimating === "true" ||
      isLiveMode ||
      isClient ||
      isMediaSessionActionLocked
    )
      return;
    const playbackList = isShuffle ? shuffledPlaylist : currentPlaylist;
    if (playbackList.length === 0) return;

    isChangingTrack = true;
    isMediaSessionActionLocked = true;
    setTimeout(() => {
      isMediaSessionActionLocked = false;
    }, 500);

    let newIndex;
    let isLoopingAround = false;

    if (currentTrackIndex >= playbackList.length - 1) {
      if (loopState === 1 || loopState === 2) {
        newIndex = 0;
        isLoopingAround = true;
      } else {
        return;
      }
    } else {
      newIndex = currentTrackIndex + 1;
    }
    const direction =
      playbackList.length < 4 || isLoopingAround ? "fade" : "next";
    loadTrack(newIndex, direction, isPlaying || audioPlayer.paused === false);
  }

  function prevTrack() {
    if (isBattleMode) {
      voteBattleNav("prev");
      return;
    }
    if (
      carouselContainer.dataset.isAnimating === "true" ||
      isLiveMode ||
      isClient ||
      isMediaSessionActionLocked
    )
      return;
    const playbackList = isShuffle ? shuffledPlaylist : currentPlaylist;
    if (playbackList.length === 0) return;

    isMediaSessionActionLocked = true;
    setTimeout(() => {
      isMediaSessionActionLocked = false;
    }, 500);

    if (audioPlayer.currentTime > 3) {
      seekTo(0);
    } else {
      let newIndex;
      let isLoopingAround = false;

      if (currentTrackIndex > 0) {
        newIndex = currentTrackIndex - 1;
      } else {
        return;
      }
      const direction =
        playbackList.length < 4 || isLoopingAround ? "fade" : "prev";
      loadTrack(newIndex, direction, isPlaying);
    }
  }

  function seek(seconds) {
    if (isBattleMode) {
      voteBattleSeek(seconds);
      return;
    }
    if (isLiveMode || isClient) return;
    seekTo(audioPlayer.currentTime + seconds);
  }

  function formatTime(seconds) {
    if (isNaN(seconds)) return "-:--";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  }

  function updateProgress() {
    if (isLiveMode) {
      progressBar.style.width = "100%";
      progressHandle.style.left = "100%";
      currentTimeDisplay.textContent = "";
      return;
    }
    if (document.hidden) return;
    if (audioPlayer.duration) {
      const progressPercent =
        (audioPlayer.currentTime / audioPlayer.duration) * 100;
      progressBar.style.width = `${progressPercent}%`;
      progressHandle.style.left = `${progressPercent}%`;
      currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
    }
  }

  function setProgress(e) {
    if (isLiveMode || isClient) return;
    const rect = this.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const duration = audioPlayer.duration;
    if (duration) {
      const newTime = (offsetX / this.clientWidth) * duration;
      seekTo(newTime);
    }
  }

  function updateLoopState() {
    loopState = (loopState + 1) % 3;
    loopBtn.classList.remove("text-violet-400", "loop-btn-one");
    const loopBtnicon = loopBtn.querySelector("span");
    loopBtnicon.textContent = "repeat";
    if (loopState === 1) {
      loopBtnicon.textContent = "repeat_on";
      loopBtn.classList.add("text-violet-400");
    } else if (loopState === 2) {
      loopBtnicon.textContent = "repeat_one";
      loopBtn.classList.add("text-violet-400", "loop-btn-one");
    }
    saveSettings();
  }

  async function handleSongEnd() {
    if (isBattleMode) {
      if (isHost) broadcastMessage({ t: "battle_force_modal" });
      showRatingModal();
      return;
    }
    if (isLiveMode) return;
    activateSurvivalMode();
    const playbackList = isShuffle ? shuffledPlaylist : currentPlaylist;
    if (loopState === 2) {
      if (playbackList.length <= 1) {
        audioPlayer.currentTime = 0;
        playTrack();
        return;
      }
      audioPlayer.currentTime = 0;
      playTrack();
      return;
    }
    const hasNextTrack = currentTrackIndex < playbackList.length - 1;
    if (hasNextTrack || loopState === 1) {
      nextTrack();
    } else {
      pauseTrack();
      audioPlayer.currentTime = 0;
      updateProgress();
      currentTrackIndex = -1;
      updateCarouselUI("none");
      renderPlaybackOrder();
    }
  }

  function updateVolumeSliderFill(sliderElement) {
    const percentage =
      ((sliderElement.value - sliderElement.min) /
        (sliderElement.max - sliderElement.min)) *
      100;
    sliderElement.style.setProperty("--value-percent", `${percentage}%`);
  }

  function setVolume(level, fromMute = false) {
    if (isBattleMode && level < 0.01) {
      level = 0.01;
      showNotification("Savaş modunda ses kapatılamaz.", "info");
    }
    audioPlayer.volume = level;
    if (level > 0.5) {
      volumeIcon.textContent = "volume_up";
    } else if (level > 0) {
      volumeIcon.textContent = "volume_down";
    } else {
      volumeIcon.textContent = "volume_off";
    }
    if (!fromMute) {
      lastVolume = level > 0 ? level : lastVolume;
    }
    updateVolumeSliderFill(volumeSlider);
  }

  function toggleMute() {
    if (isBattleMode) {
      showNotification("Savaş modunda ses kapatılamaz.", "info");
      return;
    }
    if (audioPlayer.volume > 0) {
      setVolume(0, true);
      volumeSlider.value = 0;
      volumeIcon.textContent = "volume_mute";
    } else {
      setVolume(lastVolume, true);
      volumeSlider.value = lastVolume * 100;
    }
    updateVolumeSliderFill(volumeSlider);
    saveSettings();
  }

  function updateLikeButtonState() {
    const likeBtn = document.querySelector('[data-type="current"] .like-btn');
    if (!likeBtn || currentTrackIndex < 0) return;

    const favoritesPlaylist = playlists.find((p) => p.id === 1);
    if (!favoritesPlaylist) return;

    const playbackList = isShuffle ? shuffledPlaylist : currentPlaylist;
    const currentSongId = playbackList[currentTrackIndex];
    const isLiked = favoritesPlaylist.songs.includes(currentSongId);

    const icon = likeBtn.querySelector("span");
    icon.textContent = "favorite";

    if (isLiked) {
      likeBtn.classList.add("text-pink-400");
      likeBtn.classList.remove("text-white/60");
    } else {
      likeBtn.classList.remove("text-pink-400");
      likeBtn.classList.add("text-white/60");
    }
  }

  async function handleLikeButtonClick() {
    if (isLiveMode || currentTrackIndex < 0) return;
    const favoritesPlaylist = playlists.find((p) => p.id === 1);
    if (!favoritesPlaylist) return;
    const playbackList = isShuffle ? shuffledPlaylist : currentPlaylist;
    const currentSongId = playbackList[currentTrackIndex];
    const songIndexInFavorites = favoritesPlaylist.songs.indexOf(currentSongId);
    let wasRemoved = false;
    if (songIndexInFavorites > -1) {
      favoritesPlaylist.songs.splice(songIndexInFavorites, 1);
      wasRemoved = true;
    } else {
      favoritesPlaylist.songs.push(currentSongId);
    }
    await DBHelper.put("playlists", favoritesPlaylist);
    updateLikeButtonState();
    if (wasRemoved && currentPlaylistId === 1) {
      currentPlaylist = [...favoritesPlaylist.songs];
      if (isShuffle) {
        const indexInShuffled = shuffledPlaylist.indexOf(currentSongId);
        if (indexInShuffled > -1) shuffledPlaylist.splice(indexInShuffled, 1);
      }
      const listToCheck = isShuffle ? shuffledPlaylist : currentPlaylist;
      if (listToCheck.length === 0) {
        pauseTrack();
        loadTrack(-1, "none");
      } else {
        const newIndex = Math.min(currentTrackIndex, listToCheck.length - 1);
        loadTrack(newIndex, "none");
      }
    }
  }

  function handleAudioError() {
    if (currentTrackIndex < 0 || isLiveMode) return;
    const playbackList = isShuffle ? shuffledPlaylist : currentPlaylist;
    const songId = playbackList[currentTrackIndex];
    const song = masterSongLibrary[songId];
    if (song && !song.isBroken) {
      song.isBroken = true;
      showNotification(
        `${song.title} çalınamadı. Dosya bozuk veya desteklenmiyor olabilir.`,
        "error",
      );
      setTimeout(() => {
        const currentCard = carouselContainer.querySelector(
          '[data-type="current"]',
        );
        if (currentCard) {
          const likeBtn = currentCard.querySelector(".like-btn");
          if (likeBtn) {
            const titleContainer = likeBtn.parentElement;
            likeBtn.remove();
            const brokenBtnHTML = `<button class="broken-song-btn text-red-500" title="Bu ses desteklenmiyor"><span class="material-symbols-rounded notranslate text-3xl">warning</span></button>`;
            titleContainer.insertAdjacentHTML("beforeend", brokenBtnHTML);
          }
        }
      }, 400);
    }
    if (isPlaying || currentTrackIndex > -1) {
      setTimeout(() => nextTrack(), 2000);
    }
  }

  function updateMediaSession() {
    if (!("mediaSession" in navigator)) return;
    if (!isLiveMode && currentTrackIndex < 0) {
      navigator.mediaSession.metadata = null;
      navigator.mediaSession.playbackState = "none";
      if (navigator.mediaSession.setPositionState) {
        navigator.mediaSession.setPositionState(null);
      }
      return;
    }
    const playbackList = isShuffle ? shuffledPlaylist : currentPlaylist;
    const songId = isLiveMode
      ? "live_radio_stream"
      : playbackList[currentTrackIndex];
    const track = masterSongLibrary[songId];
    if (!track) {
      navigator.mediaSession.metadata = null;
      navigator.mediaSession.playbackState = "none";
      return;
    }
    const fallbackLogo =
      "https://lunetune.xmeroriginals.com/resources/Lunetune.png";
    const errorImageSrc =
      "https://lunetune.xmeroriginals.com/resources/cardlogoerror.png";
    let finalCoverArt = fallbackLogo;
    const currentCard = carouselContainer.querySelector(
      '.song-card[data-type="current"]',
    );
    if (currentCard) {
      const cardImage = currentCard.querySelector("img");
      if (cardImage) {
        const currentImageSrc = cardImage.src;
        if (currentImageSrc !== errorImageSrc) {
          const img = new Image();
          img.src = currentImageSrc;
          img.onload = () => {
            if (img.width >= 200 && img.height >= 200) {
              finalCoverArt = currentImageSrc;
            }
            setMediaSession(track, finalCoverArt);
          };
          img.onerror = () => {
            setMediaSession(track, fallbackLogo);
          };
          return;
        }
      }
    }
    setMediaSession(track, finalCoverArt);

    function setMediaSession(track, coverArt) {
      try {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: track.title,
          artist:
            track.artist === "Bilinmeyen Sanatçı" ? "Lunetune" : track.artist,
          album: "Lunetune",
          artwork: [{ src: coverArt, sizes: "512x512", type: "image/png" }],
        });
      } catch (error) {
        try {
          navigator.mediaSession.metadata = new MediaMetadata({
            title: track.title,
            artist: track.artist,
            album: "Lunetune",
            artwork: [
              { src: fallbackLogo, sizes: "512x512", type: "image/png" },
            ],
          });
        } catch (e) {
          navigator.mediaSession.metadata = new MediaMetadata({
            title: track.title,
            artist: track.artist,
            album: "Lunetune",
            artwork: [
              { src: fallbackLogo, sizes: "512x512", type: "image/png" },
            ],
          });
        }
      }
      navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused";
    }
  }

  function handleMediaSessionNavigation(direction) {
    if (
      isMediaSessionActionLocked ||
      carouselContainer.dataset.isAnimating === "true" ||
      isLiveMode
    )
      return;
    const playbackList = isShuffle ? shuffledPlaylist : currentPlaylist;
    const newIndex =
      direction === "next" ? currentTrackIndex + 1 : currentTrackIndex - 1;
    if (newIndex < 0 || newIndex >= playbackList.length) return;
    isMediaSessionActionLocked = true;
    loadTrack(newIndex, direction);
    setTimeout(() => {
      isMediaSessionActionLocked = false;
    }, 700);
  }

  function updateMediaSessionPositionState() {
    if (
      !("mediaSession" in navigator) ||
      !navigator.mediaSession.setPositionState
    )
      return;
    if (
      isLiveMode ||
      !audioPlayer.duration ||
      !isFinite(audioPlayer.duration)
    ) {
      try {
        navigator.mediaSession.setPositionState(null);
      } catch (error) {}
      return;
    }
    if (isHostSeeking || isClientSeeking) return;
    try {
      navigator.mediaSession.setPositionState({
        duration: audioPlayer.duration,
        playbackRate: audioPlayer.playbackRate,
        position: audioPlayer.currentTime,
      });
    } catch (error) {
      console.error("Media Session seek position error:", error);
    }
  }

  function setupMediaSessionActions() {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.setActionHandler("play", playTrack);
      navigator.mediaSession.setActionHandler("pause", pauseTrack);
      navigator.mediaSession.setActionHandler("nexttrack", () =>
        handleMediaSessionNavigation("next"),
      );
      navigator.mediaSession.setActionHandler("previoustrack", () =>
        handleMediaSessionNavigation("prev"),
      );
      navigator.mediaSession.setActionHandler("seekforward", () => {
        if (!isLiveMode) seek(10);
      });
      navigator.mediaSession.setActionHandler("seekbackward", () => {
        if (!isLiveMode) seek(-10);
      });
      navigator.mediaSession.setActionHandler("seekto", (details) => {
        if (!isLiveMode) {
          seekTo(details.seekTime, true);
        }
      });
    }
  }

  const openModal = (modalId) => {
    if (activeModals.includes(modalId)) return;
    const modal = document.getElementById(modalId);
    if (!modal) return;
    if (activeModals.length > 0)
      document
        .getElementById(activeModals[activeModals.length - 1])
        .classList.add("is-covered");
    modal.classList.add("is-active");
    activeModals.push(modalId);
    modalOverlay.classList.remove("opacity-0", "pointer-events-none");
    modalOverlay.style.zIndex = window.getComputedStyle(modal).zIndex - 1;

    updateWakeLockState();

    setTimeout(() => {
      const inputs = modal.querySelectorAll(
        'input[type="text"]:not([disabled])',
      );
      if (inputs.length > 0) {
        if (modalId != "settings-modal") {
          inputs[0].focus();
        }
      }
    }, 100);
  };

  const closeModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    if (modalId === "music-store-modal") {
      stopPreview();
    } else if (modalId === "battle-modal") {
      if (isHost && isBattleMode && !conn) {
        resetShareSession();
        restorePreBattleState();
        showNotification("Savaş oluşturma iptal edildi.", "info");
      }
    }
    modal.classList.remove("is-active");
    const index = activeModals.indexOf(modalId);
    if (index > -1) {
      activeModals.splice(index, 1);
    }

    updateWakeLockState();

    if (activeModals.length > 0) {
      const prevModal = document.getElementById(
        activeModals[activeModals.length - 1],
      );
      prevModal.classList.remove("is-covered");
      modalOverlay.style.zIndex = window.getComputedStyle(prevModal).zIndex - 1;
    } else {
      modalOverlay.classList.add("opacity-0", "pointer-events-none");
    }
  };

  function renderPlaylists() {
    playlistListEl.innerHTML = playlists
      .map(
        (p) =>
          `<li data-playlist-id="${p.id}" class="playlist-item flex items-center justify-between p-2 rounded-lg hover:bg-white/10 cursor-pointer group"><div class="flex items-center gap-4 overflow-hidden"><img src="${p.coverUrl}" class="w-12 h-12 rounded-md object-cover flex-shrink-0"><span class="font-medium truncate">${p.name}</span></div></li>`,
      )
      .join("");
  }

  function renderRadioStations(stationsToRender = radioStations) {
    if (!stationsToRender || stationsToRender.length === 0) {
      radioStationListEl.innerHTML = `<p class="text-center text-white/50 p-4">Sonuç bulunamadı.</p>`;
      return;
    }
    const groupedStations = stationsToRender.reduce((acc, station) => {
      (acc[station.group] = acc[station.group] || []).push(station);
      return acc;
    }, {});
    let html = "";
    for (const group in groupedStations) {
      html += `<div class="mb-4"><h4 class="text-sm font-semibold text-white/50 uppercase tracking-wider mb-2">${group}</h4><ul class="space-y-2">`;
      groupedStations[group].forEach((station) => {
        html += `<li class="radio-station-item p-3 rounded-lg hover:bg-white/10 cursor-pointer flex items-center gap-3" data-station-name="${station.name}" data-stream-url="${station.streamUrl}"><span class="material-symbols-rounded notranslate text-violet-400">satellite_alt</span><span class="font-medium">${station.name}</span></li>`;
      });
      html += `</ul></div>`;
    }
    radioStationListEl.innerHTML = html;
  }

  function renderPlaylistSelection() {
    playlistSelectionListEl.innerHTML = playlists
      .map(
        (p) =>
          `<li data-playlist-id="${p.id}" class="playlist-select-item flex items-center gap-4 p-3 rounded-lg hover:bg-white/10 cursor-pointer"><img src="${p.coverUrl}" class="w-10 h-10 rounded-md"><span class="font-medium">${p.name}</span></li>`,
      )
      .join("");
  }

  function updateMusicStoreView(tabName) {
    const searchTerm = musicSearchInput.value.toLowerCase().trim();
    let songsToShow = [];
    switch (activeMusicStoreTab) {
      case "lunetune":
        lunetuneTabActions.style.display = "flex";
        lunetuneTabBtn.classList.add("active-tab");
        musicSearchInput.classList.add("rounded-b-none");
        musicSearchInput.classList.add("rounded-t-2xl");
        musicSearchInput.classList.remove("rounded-2xl");
        const userSongs = Object.values(masterSongLibrary).filter((song) =>
          song.id.startsWith("user_"),
        );
        if (searchTerm) {
          songsToShow = userSongs.filter(
            (song) =>
              !song.isLive &&
              (song.title.toLowerCase().includes(searchTerm) ||
                (song.artist &&
                  song.artist.toLowerCase().includes(searchTerm))),
          );
        } else {
          songsToShow = userSongs;
        }
        renderMusicStore(songsToShow, "lunetune");
        break;
      case "ncs":
        const allNcsSongs = Object.values(masterSongLibrary).filter((song) =>
          song.id.startsWith("ncs_"),
        );
        if (allNcsSongs.length === 0) {
          musicStoreListEl.innerHTML = `<p class="text-center text-white/50">NCS kütüphanesi yükleniyor...</p>`;
          return;
        }
        if (searchTerm) {
          songsToShow = allNcsSongs
            .filter(
              (song) =>
                song.title.toLowerCase().includes(searchTerm) ||
                (song.artist && song.artist.toLowerCase().includes(searchTerm)),
            )
            .slice(0, 30);
        } else {
          songsToShow = [...allNcsSongs]
            .sort(() => 0.5 - Math.random())
            .slice(0, 30);
        }
        renderMusicStore(songsToShow, "ncs");
        break;
      case "jamendo":
        searchJamendo(searchTerm);
        break;
    }
  }

  function renderMusicStore(songsToShow, type) {
    if (!songsToShow || songsToShow.length === 0) {
      musicStoreListEl.innerHTML = `<p class="text-center text-white/50">Sonuç bulunamadı.</p>`;
      return;
    }
    const isLunetuneTab = type === "lunetune";
    musicStoreListEl.innerHTML = songsToShow
      .map((song) => {
        const songDataString =
          type === "ncs" ? JSON.stringify(song).replace(/"/g, "&quot;") : "";
        const addButtonDataAttr =
          type === "ncs"
            ? `data-ncs-song="${songDataString}"`
            : `data-song-id="${song.id}"`;
        const isPreviewAvailable =
          !!song.url ||
          (song.isLocal && !!song.fileBlob) ||
          offlineSongsMap[song.id];
        const actionButtonsHTML = `
            <div class="action-buttons flex items-center">
                <button data-preview-id="${type}_${
                  song.id
                }" data-preview-url="${
                  song.url || ""
                }" class="preview-song-btn w-10 h-10 flex items-center justify-center rounded-full hover:bg-blue-500/20 text-blue-400" ${
                  !isPreviewAvailable ? "disabled" : ""
                } title="${!isPreviewAvailable ? "Önizleme yok" : "Önizle"}">
                    <span class="material-symbols-rounded notranslate preview-icon">play_circle</span>
                </button>
                <button ${addButtonDataAttr} class="add-to-playlist-btn w-10 h-10 flex items-center justify-center rounded-full hover:bg-green-500/20 text-green-400" title="Ekle">
                    <span class="material-symbols-rounded notranslate">add</span>
                </button>
            </div>
            ${
              isLunetuneTab
                ? `
            <div class="remove-button-wrapper" style="display: none;">
                 <button data-song-id="${song.id}" class="delete-song-btn w-10 h-10 flex items-center justify-center rounded-full hover:bg-red-500/20 text-red-400" title="Kalıcı Olarak Sil">
                    <span class="material-symbols-rounded notranslate">delete</span>
                </button>
            </div>
            `
                : ""
            }
        `;
        return `<li class="flex items-center p-2 rounded-lg hover:bg-white/5">
            <div class="flex items-center gap-4 flex-grow overflow-hidden">
                ${
                  song.image
                    ? `<img src="${song.image}" class="w-12 h-12 rounded-md object-cover flex-shrink-0">`
                    : `<div class="w-12 h-12 rounded-md bg-white/10 flex-shrink-0 flex items-center justify-center"><span class="material-symbols-rounded notranslate text-white/50">music_note</span></div>`
                }
                <div>
                    <p class="font-semibold text-white truncate">${
                      song.title
                    }</p>
                    <p class="text-sm text-white/60 truncate">${song.artist}</p>
                </div>
            </div>
            <div class="flex-shrink-0 flex items-center">
                ${actionButtonsHTML}
            </div>
        </li>`;
      })
      .join("");
  }

  async function searchJamendo(query) {
    if (!query || query.length < 2) {
      musicStoreListEl.innerHTML = `<p class="text-center text-white/50">Aramak için en az 2 harf girin.</p>`;
      return;
    }
    musicStoreListEl.innerHTML = `<p class="text-center text-white/50">Aranıyor...</p>`;
    try {
      const response = await fetch(
        `https://api.jamendo.com/v3.0/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&search=${encodeURIComponent(
          query,
        )}`,
      );
      if (!response.ok) {
        throw new Error(`API Hatası: ${response.statusText}`);
      }
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        renderJamendoResults(data.results);
      } else {
        musicStoreListEl.innerHTML = `<p class="text-center text-white/50">Sonuç bulunamadı.</p>`;
      }
    } catch (error) {
      console.error("Jamendo API hatası:", error);
      musicStoreListEl.innerHTML = `<p class="text-center text-red-400">Şarkılar alınamadı. Lütfen tekrar deneyin.</p>`;
      showNotification("Jamendo API'ına bağlanırken bir hata oluştu.", "error");
    }
  }

  function renderJamendoResults(tracks) {
    musicStoreListEl.innerHTML = tracks
      .map((track) => {
        const songData = {
          id: track.id,
          title: track.name,
          artist: track.artist_name,
          image: track.image.replace("1.200x1.200", "1.400x400"),
          url: track.audio,
        };
        const songDataString = JSON.stringify(songData).replace(/"/g, "&quot;");
        return `<li class="flex items-center p-2 rounded-lg hover:bg-white/5"><div class="flex items-center gap-4 flex-grow overflow-hidden"><img src="${songData.image}" class="w-12 h-12 rounded-md object-cover flex-shrink-0"><div><p class="font-semibold text-white truncate">${songData.title}</p><p class="text-sm text-white/60 truncate">${songData.artist}</p></div></div><div class="flex-shrink-0 flex items-center"><button data-preview-id="jamendo_${track.id}" data-preview-url="${track.audio}" class="preview-song-btn w-10 h-10 flex items-center justify-center rounded-full hover:bg-blue-500/20 text-blue-400" title="Önizle"><span class="material-symbols-rounded notranslate preview-icon">play_circle</span></button><button data-jamendo-song="${songDataString}" class="add-to-playlist-btn w-10 h-10 flex items-center justify-center rounded-full hover:bg-green-500/20 text-green-400" title="Ekle"><span class="material-symbols-rounded notranslate">add</span></button></div></li>`;
      })
      .join("");
  }

  async function handleCreatePlaylist() {
    const name = playlistNameInput.value.trim();
    if (name) {
      const newPlaylist = {
        id: Date.now(),
        name,
        songs: [],
        coverUrl:
          newPlaylistCoverDataUrl ||
          `https://placehold.co/128x128/818cf8/ffffff?text=${encodeURIComponent(
            name.charAt(0).toUpperCase(),
          )}`,
        deletable: true,
      };
      try {
        await DBHelper.put("playlists", newPlaylist);
        playlists.push(newPlaylist);
        renderPlaylists();
        playlistNameInput.value = "";
        closeModal("new-playlist-modal");
        showNotification(`${name} listesi oluşturuldu.`, "success");
      } catch (error) {
        showNotification("Liste oluşturulurken bir hata oluştu.", "error");
      }
    }
  }

  async function handleDeleteSong() {
    if (currentTrackIndex < 0) return;
    const wasPlayingBeforeDelete = isPlaying;
    const originalIndex = currentTrackIndex;
    const playbackList = isShuffle ? shuffledPlaylist : currentPlaylist;
    const songIdToDelete = playbackList[originalIndex];
    const song = masterSongLibrary[songIdToDelete];
    if (
      !song ||
      (!song.id.startsWith("user_") && !song.id.startsWith("jamendo_"))
    ) {
      showNotification(
        "Sadece kendi ve Jamendo üzerinden eklediğiniz şarkıları silebilirsiniz.",
      );
      return;
    }
    await DBHelper.delete("userSongs", songIdToDelete);
    delete masterSongLibrary[songIdToDelete];
    for (const playlist of playlists) {
      const songIndex = playlist.songs.indexOf(songIdToDelete);
      if (songIndex > -1) {
        playlist.songs.splice(songIndex, 1);
        await DBHelper.put("playlists", playlist);
      }
    }
    renderPlaylists();
    showNotification(`${song.title} kalıcı olarak silindi.`, "success");
    const indexInCurrent = currentPlaylist.indexOf(songIdToDelete);
    if (indexInCurrent > -1) currentPlaylist.splice(indexInCurrent, 1);
    if (isShuffle) {
      const indexInShuffled = shuffledPlaylist.indexOf(songIdToDelete);
      if (indexInShuffled > -1) shuffledPlaylist.splice(indexInShuffled, 1);
    }
    const newPlaybackList = isShuffle ? shuffledPlaylist : currentPlaylist;
    if (newPlaybackList.length === 0) {
      currentPlaylistId = null;
      pauseTrack();
      loadTrack(-1, "none");
    } else if (originalIndex >= newPlaybackList.length) {
      loadTrack(newPlaybackList.length - 1, "none");
    } else {
      loadTrack(originalIndex, "none");
    }
    if (wasPlayingBeforeDelete && newPlaybackList.length > 0) {
      playTrack();
    }
  }

  async function handleRemoveFromPlaylist() {
    if (currentTrackIndex < 0 || !currentPlaylistId) return;
    const playbackList = isShuffle ? shuffledPlaylist : currentPlaylist;
    const songId = playbackList[currentTrackIndex];
    const playlist = playlists.find((p) => p.id === currentPlaylistId);
    if (!playlist) return;
    const songIndexInOriginal = playlist.songs.indexOf(songId);
    if (songIndexInOriginal > -1) {
      playlist.songs.splice(songIndexInOriginal, 1);
      await DBHelper.put("playlists", playlist);
      currentPlaylist.splice(songIndexInOriginal, 1);
      if (isShuffle) {
        const songIndexInShuffled = shuffledPlaylist.indexOf(songId);
        if (songIndexInShuffled > -1)
          shuffledPlaylist.splice(songIndexInShuffled, 1);
      }
      showNotification(
        `${masterSongLibrary[songId].title} listeden çıkarıldı.`,
        "info",
      );
      const newPlaybackList = isShuffle ? shuffledPlaylist : currentPlaylist;
      if (newPlaybackList.length === 0) {
        loadTrack(-1);
      } else if (currentTrackIndex >= newPlaybackList.length) {
        loadTrack(currentTrackIndex);
      } else {
        loadTrack(currentTrackIndex, "none");
      }
    }
  }

  async function handleDeletePlaylist(playlistId) {
    const playlistToDelete = playlists.find((p) => p.id === playlistId);
    if (!playlistToDelete || !playlistToDelete.deletable) {
      showNotification("Bu liste silinemez.", "error");
      return;
    }
    try {
      await DBHelper.delete("playlists", playlistId);
      playlists = playlists.filter((p) => p.id !== playlistId);
      if (currentPlaylistId === playlistId) {
        pauseTrack();
        currentPlaylistId = null;
        currentPlaylist = [];
        shuffledPlaylist = [];
        loadTrack(-1, "none");
      }
      renderPlaylists();
      showNotification(`${playlistToDelete.name} listesi silindi.`, "success");
    } catch (error) {
      showNotification("Liste silinirken bir hata oluştu.", "error");
    }
  }

  async function handleUpdateSong() {
    const songId = editSongModal.dataset.editingSongId;
    if (!songId) return;
    const title = editSongTitleInput.value.trim();
    if (!title) {
      showNotification("Şarkı adı boş bırakılamaz.", "error");
      return;
    }
    const originalSong = await DBHelper.get("userSongs", songId);
    if (!originalSong) {
      showNotification("Düzenlenecek şarkı bulunamadı.", "error");
      return;
    }
    const imageFile = editSongImageFileInput.files[0];
    let imageUrl = editSongImageUrlInput.value.trim();
    if (imageFile) {
      try {
        imageUrl = await resizeImage(imageFile, 64, 64);
      } catch (error) {
        showNotification(
          "Yeni kapak resmi işlenirken bir hata oluştu.",
          "error",
        );
      }
    }
    const updatedSong = {
      ...originalSong,
      title: title,
      artist: editSongArtistInput.value.trim() || "Bilinmeyen Sanatçı",
      image: imageUrl,
    };
    try {
      await DBHelper.put("userSongs", updatedSong);
      masterSongLibrary[songId] = updatedSong;
      updateCarouselUI("none");
      closeModal("edit-song-modal");
      showNotification(`${title} başarıyla güncellendi.`, "success");
    } catch (error) {
      showNotification("Şarkı güncellenirken bir hata oluştu.", "error");
    }
  }

  function restorePlayerState(savedState) {
    if (savedState.playlistId === 1) {
      updateCarouselUI();
      return;
    }

    const playlistToRestore = playlists.find(
      (p) => p.id === savedState.playlistId,
    );
    if (!playlistToRestore) {
      updateCarouselUI();
      return;
    }

    const trackIndexToRestore = playlistToRestore.songs.indexOf(
      savedState.trackId,
    );
    if (trackIndexToRestore > -1) {
      currentPlaylistId = savedState.playlistId;
      currentPlaylist = [...playlistToRestore.songs];
      currentTrackIndex = trackIndexToRestore;

      const track = masterSongLibrary[savedState.trackId];
      if (!track) {
        updateCarouselUI();
        return;
      }

      const offlineData = offlineSongsMap[track.id];
      if (track.isLocal && track.fileBlob) {
        audioPlayer.src = URL.createObjectURL(track.fileBlob);
      } else if (offlineData) {
        audioPlayer.src = URL.createObjectURL(offlineData.blob);
      } else {
        audioPlayer.src = track.url;
      }

      audioPlayer.addEventListener(
        "loadedmetadata",
        function onRestore() {
          if (savedState.time) audioPlayer.currentTime = savedState.time;
          updateProgress();
          updateCarouselUI("none");
        },
        { once: true },
      );
      if (isShuffle) {
        shuffleCurrentPlaylist(false);
      }
    } else {
      updateCarouselUI();
    }
  }

  function updateGreeting() {
    const hour = new Date().getHours();
    let greeting = "";
    if (hour >= 5 && hour < 12) {
      greeting = "Günaydın";
    } else if (hour >= 12 && hour < 18) {
      greeting = "Tünaydın";
    } else if (hour >= 18 && hour < 22) {
      greeting = "İyi Akşamlar";
    } else {
      greeting = "İyi Geceler";
    }
    panelGreetingEl.textContent = `${greeting}, ${userSettings.username}!`;
  }

  function updateOnlineStatus() {
    if (navigator.onLine) {
      offlineIndicatorBtn.classList.add("hidden");
    } else {
      offlineIndicatorBtn.classList.remove("hidden");
    }
  }

  async function loadNcsLibrary() {
    try {
      const response = await fetch(
        "https://lunetune.xmeroriginals.com/music-libs/ncs-lib.json",
      );
      const libSongs = await response.json();
      libSongs.forEach((song) => {
        const songId = `ncs_${song.url.split("/").pop().split(".")[0]}`;
        masterSongLibrary[songId] = {
          ...song,
          id: songId,
          isBroken: false,
          isLocal: false,
        };
      });
      if (activeMusicStoreTab === "ncs") {
        updateMusicStoreView();
      }
    } catch (error) {
      console.error("NCS Müzik Kütüphanesi Yüklenemedi | ", error);
      showNotification("NCS müzik kütüphanesi yüklenemedi.", "error");
    }
  }

  function playNext(songId) {
    if (!masterSongLibrary[songId]) return;
    let listToUpdate = isShuffle ? shuffledPlaylist : currentPlaylist;
    let baseListToUpdate = currentPlaylist;
    const existingIndex = listToUpdate.indexOf(songId);
    const existingIndexInBase = baseListToUpdate.indexOf(songId);
    if (existingIndex > -1) listToUpdate.splice(existingIndex, 1);
    if (existingIndexInBase > -1)
      baseListToUpdate.splice(existingIndexInBase, 1);
    const newIndex = currentTrackIndex > -1 ? currentTrackIndex + 1 : 0;
    listToUpdate.splice(newIndex, 0, songId);
    const baseNewIndex =
      currentPlaylist.indexOf(listToUpdate[newIndex - 1]) + 1 || 0;
    baseListToUpdate.splice(baseNewIndex, 0, songId);
    if (existingIndex > -1 && existingIndex < currentTrackIndex) {
      currentTrackIndex--;
    }
    showNotification(
      `${masterSongLibrary[songId].title} bir sonraki şarkı olarak ayarlandı.`,
      "success",
    );
    renderPlaybackOrder();
    updateCarouselUI("none");
  }

  function addToEndOfQueue(songId) {
    if (!masterSongLibrary[songId]) return;
    let listToUpdate = isShuffle ? shuffledPlaylist : currentPlaylist;
    let baseListToUpdate = currentPlaylist;
    const existingIndex = listToUpdate.indexOf(songId);
    const existingIndexInBase = baseListToUpdate.indexOf(songId);
    if (existingIndex > -1) listToUpdate.splice(existingIndex, 1);
    if (existingIndexInBase > -1)
      baseListToUpdate.splice(existingIndexInBase, 1);
    listToUpdate.push(songId);
    baseListToUpdate.push(songId);
    if (isShuffle && existingIndex > -1 && existingIndex < currentTrackIndex) {
      currentTrackIndex--;
    }
    showNotification(
      `${masterSongLibrary[songId].title} sıranın sonuna eklendi.`,
      "success",
    );
    renderPlaybackOrder();
    updateCarouselUI("none");
  }

  let sortableInstance = null;
  function initializeSortable() {
    if (sortableInstance) {
      sortableInstance.destroy();
    }
    sortableInstance = new Sortable(queueListEl, {
      animation: 150,
      ghostClass: "bg-white/20",
      handle: ".drag-handle",
      forceFallback: true,
      delay: 150,
      delayOnTouchOnly: true,
      touchStartThreshold: 5,
      onEnd: function (evt) {
        const { oldIndex, newIndex } = evt;
        if (oldIndex === newIndex) return;
        let listToUpdate = isShuffle ? shuffledPlaylist : currentPlaylist;
        const currentlyPlayingSongId = listToUpdate[currentTrackIndex];
        const [movedItem] = listToUpdate.splice(oldIndex, 1);
        listToUpdate.splice(newIndex, 0, movedItem);
        currentTrackIndex = listToUpdate.indexOf(currentlyPlayingSongId);
        renderPlaybackOrder();
        updateCarouselUI("none");
      },
    });
  }

  function hideAllContextMenus() {
    songContextMenu.classList.remove("is-open");
    playlistContextMenu.classList.remove("is-open");
    moreActionsMenu.classList.remove("is-open");
  }

  async function stopPreview() {
    if (currentPreviewId === null && previewPlayer.paused) return;
    clearTimeout(previewTimeout);
    const wasPreviewing = !previewPlayer.paused;
    currentPreviewId = null;
    document.querySelectorAll(".preview-icon").forEach((icon) => {
      icon.textContent = "play_circle";
    });
    if (wasPreviewing) {
      await fadeVolume(previewPlayer, "out");
    }
    if (wasMainPlayerPlaying) {
      audioPlayer.volume = 0;
      playTrack();
      await fadeVolume(audioPlayer, "in");
    }
    wasMainPlayerPlaying = false;
    if (currentObjectUrl) {
      URL.revokeObjectURL(currentObjectUrl);
      currentObjectUrl = null;
    }
  }

  async function startPreview(url, previewId, buttonEl) {
    if (isPlaying) {
      wasMainPlayerPlaying = true;
      pauseTrack();
      audioPlayer.volume = 0;
    }
    document.querySelectorAll(".preview-icon").forEach((icon) => {
      icon.textContent = "play_circle";
    });
    const icon = buttonEl.querySelector(".preview-icon");
    icon.textContent = "pause_circle";
    currentPreviewId = previewId;
    previewPlayer.src = url;
    previewPlayer.volume = 0;
    await fadeVolume(previewPlayer, "in");
    previewTimeout = setTimeout(() => stopPreview(), 30000);
  }

  function renderPlaybackOrder(highlightCurrent = true) {
    const playbackList = isShuffle ? shuffledPlaylist : currentPlaylist;

    if (playbackList.length === 0) {
      queueListEl.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full text-center text-white/50">
                <span class="material-symbols-rounded notranslate">music_note</span>
                <p class="font-medium">Çalınacak şarkı yok.</p>
                <p class="text-sm">Soldaki menüden bir çalma listesi seçin.</p>
            </div>
        `;
      return;
    }

    queueListEl.innerHTML = playbackList
      .map((songId, index) => {
        const song = masterSongLibrary[songId];
        if (!song) return "";

        const isCurrent = highlightCurrent && index === currentTrackIndex;
        const activeClasses = isCurrent
          ? "bg-violet-500/30 border-l-4 border-violet-400"
          : "hover:bg-white/10";
        return `
            <li class="queue-item flex items-center justify-between p-2 rounded-lg ${activeClasses} group" data-song-id="${songId}" data-index="${index}">
                <div class="song-info-clickable flex items-center gap-3 overflow-hidden flex-grow cursor-pointer">
                    ${
                      isCurrent
                        ? '<span class="material-symbols-rounded notranslate">volume_up</span>'
                        : `<span class="w-4 text-center text-white/50">${
                            index + 1
                          }</span>`
                    }
                    <img src="${
                      song.image ||
                      "https://lunetune.xmeroriginals.com/resources/lunetune-thumb.png"
                    }" class="w-10 h-10 rounded-md object-cover flex-shrink-0">
                    <div>
                        <p class="font-medium truncate text-white pointer-events-none">${
                          song.title
                        }</p>
                        <p class="text-sm text-white/60 truncate pointer-events-none">${
                          song.artist
                        }</p>
                    </div>
                </div>
                <div class="drag-handle p-2 text-white/40 group-hover:text-white/80 cursor-grab active:cursor-grabbing flex-shrink-0">
                    <span class="material-symbols-rounded notranslate">drag_indicator</span>
                </div>
            </li>
        `;
      })
      .join("");
  }

  async function handleDownloadSong() {
    if (currentTrackIndex < 0 || isLiveMode) return;
    const playbackList = isShuffle ? shuffledPlaylist : currentPlaylist;
    const songId = playbackList[currentTrackIndex];
    const song = masterSongLibrary[songId];
    if (!song) {
      showNotification("İndirilecek şarkı bulunamadı.", "error");
      return;
    }
    const sourceUrl = song.url;
    let songBlob;
    if (song.fileBlob) {
      songBlob = song.fileBlob;
    } else if (
      offlineSongsMap[song.id] ||
      (song.url && offlineSongsMap[song.url])
    ) {
      const offlineData = offlineSongsMap[song.id] || offlineSongsMap[song.url];
      songBlob = offlineData.blob;
    } else if (sourceUrl) {
      try {
        showNotification(`${song.title} indiriliyor...`, "info", 4000);
        const response = await fetch(sourceUrl);
        if (!response.ok) {
          throw new Error(`Sunucu hatası: ${response.statusText}`);
        }
        songBlob = await response.blob();
      } catch (error) {
        showNotification(
          "Şarkı indirilirken bir hata oluştu. URL geçersiz veya ulaşılamıyor olabilir.",
          "error",
        );
        return;
      }
    } else {
      showNotification("Bu şarkının indirilebilir bir kaynağı yok.", "error");
      return;
    }
    const getExtension = (url) =>
      url ? url.split(".").pop().split("?")[0] : "mp3";
    const extension =
      getExtension(sourceUrl) || getExtension(song.fileBlob?.type) || "mp3";
    const safeTitle = song.title.replace(/[\\/:*?"<>|]/g, "");
    const safeArtist = (song.artist || "Bilinmeyen Sanatçı").replace(
      /[\\/:*?"<>|]/g,
      "",
    );
    const filename = `${safeArtist} - ${safeTitle}.${extension}`;
    const objectUrl = URL.createObjectURL(songBlob);
    const a = document.createElement("a");
    a.href = objectUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(objectUrl);
  }

  function switchStoreTab(tabName) {
    if (activeMusicStoreTab === tabName) return;
    activeMusicStoreTab = tabName;
    musicSearchInput.value = "";
    [lunetuneTabBtn, ncsTabBtn, jamendoTabBtn].forEach((btn) =>
      btn.classList.remove("active-tab"),
    );
    if (isRemoveModeActive) {
      toggleRemoveMode();
    }
    if (tabName === "lunetune") {
      lunetuneTabActions.style.display = "flex";
      lunetuneTabBtn.classList.add("active-tab");
      musicSearchInput.classList.add("rounded-b-none");
      musicSearchInput.classList.add("rounded-t-2xl");
      musicSearchInput.classList.remove("rounded-2xl");
      updateMusicStoreView();
    } else {
      lunetuneTabActions.style.display = "none";
      if (tabName === "ncs") {
        musicSearchInput.classList.remove("rounded-b-none");
        musicSearchInput.classList.remove("rounded-t-2xl");
        musicSearchInput.classList.add("rounded-2xl");
        ncsTabBtn.classList.add("active-tab");
        updateMusicStoreView();
      } else if (tabName === "jamendo") {
        musicSearchInput.classList.remove("rounded-b-none");
        musicSearchInput.classList.remove("rounded-t-2xl");
        musicSearchInput.classList.add("rounded-2xl");
        jamendoTabBtn.classList.add("active-tab");
        musicStoreListEl.innerHTML = `<p class="text-center text-white/50">Jamendo'da müzik arayın.</p>`;
      }
    }
  }

  function showContextMenu(menuElement, x, y) {
    hideAllContextMenus();
    const menuWidth = menuElement.offsetWidth;
    const menuHeight = menuElement.offsetHeight;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const originX = x + menuWidth > screenWidth ? "right" : "left";
    const originY = y + menuHeight > screenHeight ? "bottom" : "top";
    menuElement.style.transformOrigin = `${originX} ${originY}`;
    let finalX = x + menuWidth > screenWidth ? x - menuWidth : x;
    menuElement.style.left = `${Math.max(5, finalX)}px`;
    let finalY = y + menuHeight > screenHeight ? y - menuHeight : y;
    menuElement.style.top = `${Math.max(5, finalY)}px`;
    menuElement.classList.add("is-open");
  }

  async function handleExportPlaylist() {
    if (!activePlaylistContextId) return;
    const playlist = playlists.find((p) => p.id === activePlaylistContextId);
    if (!playlist) {
      showNotification("Dışa aktarılacak liste bulunamadı.", "error");
      return;
    }
    showNotification(`${playlist.name} listesi dışa aktarılıyor...`, "info");
    try {
      const songsForExport = await Promise.all(
        playlist.songs.map(async (songId, index) => {
          const song = masterSongLibrary[songId];
          if (!song) return null;
          let fileBase64 = null;
          let mimeType = "audio/mpeg";
          let imageBase64 = song.image || null;
          if (song.fileBlob && !song.url) {
            fileBase64 = await blobToBase64(song.fileBlob);
            mimeType = song.fileBlob.type;
          } else if (offlineSongsMap[songId]) {
            fileBase64 = await blobToBase64(offlineSongsMap[songId].blob);
            mimeType = offlineSongsMap[songId].blob.type;
          }
          return {
            id: `export_${Date.now()}_${index}`,
            title: song.title,
            artist: song.artist,
            image: imageBase64,
            fileBase64: fileBase64,
            url: song.url,
            mimeType: mimeType,
          };
        }),
      );
      const validSongs = songsForExport.filter(
        (s) => s !== null && (s.fileBase64 || s.url),
      );
      const exportData = {
        playlist: { name: playlist.name },
        songs: validSongs,
      };
      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const safeFileName = playlist.name
        .replace(/[^a-z0-9]/gi, "_")
        .toLowerCase();
      a.href = url;
      a.download = `${safeFileName}.luneplaylist`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showNotification("Liste başarıyla dışa aktarıldı.", "success");
    } catch (error) {
      showNotification("Liste dışa aktarılırken bir hata oluştu.", "error");
    }
  }

  async function handleDownloadPlaylistToLocal() {
    if (!activePlaylistContextId) return;
    const playlist = playlists.find((p) => p.id === activePlaylistContextId);
    if (!playlist) return;

    const songsToDownload = playlist.songs.filter((songId) => {
      const song = masterSongLibrary[songId];
      return (
        song &&
        !song.isLocal &&
        song.url &&
        !offlineSongsMap[song.url] &&
        !offlineSongsMap[songId]
      );
    });

    if (songsToDownload.length === 0) {
      showNotification(
        "Bu listedeki tüm şarkılar zaten yerel veya indirilecek URL bulunamadı.",
        "info",
      );
      closeModal("download-playlist-modal");
      return;
    }

    closeModal("download-playlist-modal");
    openModal("transfer-progress-modal");
    transferProgressBar.style.width = "0%";
    transferProgressText.textContent = "0%";
    transferProgressTitle.textContent = "Şarkılar İndiriliyor...";

    let downloadedCount = 0;
    const total = songsToDownload.length;

    for (const songId of songsToDownload) {
      const song = masterSongLibrary[songId];
      try {
        transferProgressDetails.textContent = `${song.title} indiriliyor... (${downloadedCount + 1}/${total})`;
        const response = await fetch(song.url, { cache: "reload" });
        if (!response.ok) throw new Error("Download failed");
        const blob = await response.blob();
        await DBHelper.put("OfflineSongs", { id: song.url, blob: blob });
        offlineSongsMap[song.url] = { id: song.url, blob: blob };
        if ("caches" in window) {
          const cache = await caches.open("lunetune-audio-v1");
          await cache.delete(song.url).catch(() => {});
        }

        downloadedCount++;
        const percent = Math.round((downloadedCount / total) * 100);
        transferProgressBar.style.width = `${percent}%`;
        transferProgressText.textContent = `${percent}%`;
      } catch (error) {
        console.error(`Failed to download ${song.title}:`, error);
      }
    }

    transferProgressDetails.textContent = "Tamamlandı! Sayfa yenileniyor...";
    showNotification(
      `${downloadedCount} şarkı başarıyla çevrimdışı kütüphaneye kaydedildi.`,
      "success",
    );
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  async function handleRepairPlaylist() {
    if (!activePlaylistContextId) return;
    const playlist = playlists.find((p) => p.id === activePlaylistContextId);
    if (!playlist) return;

    closeModal("repair-playlist-modal");

    let clearedCount = 0;
    for (const songId of playlist.songs) {
      const song = masterSongLibrary[songId];
      if (song && (offlineSongsMap[song.url] || offlineSongsMap[songId])) {
        if (song.url) {
          await DBHelper.delete("OfflineSongs", song.url);
          delete offlineSongsMap[song.url];
        }
        await DBHelper.delete("OfflineSongs", songId);
        delete offlineSongsMap[songId];
        clearedCount++;
      }
    }

    showNotification(
      `${clearedCount} çevrimdışı kopya temizlendi. Liste düzeltildi.`,
      "success",
    );
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }

  async function handleImportPlaylist(event) {
    const files = Array.from(event.target.files);
    if (!files || files.length === 0) return;

    const firstFileData = await parsePlaylistFile(files[0]);
    let playlistName = firstFileData?.playlist?.name;
    const partMatch = playlistName?.match(/^(.*?) \(Bölüm \d+\)$/);
    if (partMatch) playlistName = partMatch[1];

    let existingPlaylist = playlists.find((p) => p.name === playlistName);
    let shouldClear = false;

    if (existingPlaylist) {
      if (
        confirm(
          `${playlistName} adında bir liste zaten var. \n\nMevcut listenin içeriğini TEMİZLEMEK ister misiniz?\n(Tamam = Temizle ve Ekle, İptal = Üzerine Ekle)`,
        )
      ) {
        shouldClear = true;
        existingPlaylist.songs = [];
        showNotification(
          `${playlistName} içeriği temizlendi, yeni parçalar ekleniyor...`,
          "info",
        );
      }
    }

    let totalImported = 0;

    for (const file of files) {
      try {
        const data = await parsePlaylistFile(file);
        await importPlaylistData(data, false, true);
        totalImported += data.songs.length;
      } catch (e) {
        console.error("Import error for file:", file.name, e);
      }
    }

    showNotification(
      `${playlistName}, Toplam ${totalImported} şarkı başarıyla içe aktarıldı.`,
      "success",
    );
    closeModal("settings-modal");
    event.target.value = "";
  }

  function parsePlaylistFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          resolve(JSON.parse(e.target.result));
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  async function importPlaylistData(
    data,
    askToClear = true,
    isMultiBatch = false,
  ) {
    if (!data || !data.playlist || !data.songs || !Array.isArray(data.songs)) {
      throw new Error("Geçersiz çalma listesi veri formatı.");
    }
    if (!isMultiBatch)
      showNotification(`Maker'dan gelen liste içe aktarılıyor...`, "info");

    let playlistName = data.playlist.name;
    const partMatch = playlistName.match(/^(.*?) \(Bölüm \d+\)$/);
    if (partMatch) {
      playlistName = partMatch[1];
    }

    let finalCoverUrl =
      data.playlist.coverUrl ||
      `https://placehold.co/128x128/818cf8/ffffff?text=${encodeURIComponent(
        playlistName.charAt(0).toUpperCase(),
      )}`;

    if (finalCoverUrl.startsWith("data:image")) {
      try {
        const blob = await (await fetch(finalCoverUrl)).blob();
        if (blob.size > 1024 * 1024) {
          const file = new File([blob], "cover.jpg", { type: blob.type });
          finalCoverUrl = await processImage(file);
        }
      } catch (err) {}
    }

    const newSongIds = [];
    for (const songData of data.songs) {
      const newSongId = `user_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;
      let newSong;
      if (songData.fileBase64) {
        const blob = await base64ToBlob(songData.fileBase64, songData.mimeType);
        if (songData.image && songData.image.startsWith("data:image")) {
          try {
            const imgBlob = await (await fetch(songData.image)).blob();
            if (imgBlob.size > 512 * 1024) {
              const imgFile = new File([imgBlob], "cover.jpg", {
                type: imgBlob.type,
              });
              songData.image = await processImage(imgFile, 64, 64);
            }
          } catch (err) {
            songData.image = null;
          }
        }
        newSong = {
          id: newSongId,
          title: songData.title,
          artist: songData.artist,
          image: songData.image,
          fileBlob: blob,
          url: null,
          isLocal: true,
          isBroken: false,
        };
      } else if (songData.url) {
        newSong = {
          id: newSongId,
          title: songData.title,
          artist: songData.artist,
          image: songData.image,
          fileBlob: null,
          url: songData.url,
          isLocal: false,
          isBroken: false,
        };
      } else {
        continue;
      }
      await DBHelper.put("userSongs", newSong);
      masterSongLibrary[newSongId] = newSong;
      newSongIds.push(newSongId);
    }

    const existingPlaylist = playlists.find((p) => p.name === playlistName);

    if (existingPlaylist) {
      let shouldClear = false;

      if (askToClear && !isMultiBatch) {
        if (
          confirm(
            `${playlistName} adında bir liste zaten var. \n\nMevcut listenin içeriğini TEMİZLEMEK ister misiniz?\n(Tamam = Temizle ve Ekle, İptal = Üzerine Ekle)`,
          )
        ) {
          shouldClear = true;
        }
      }

      if (shouldClear) {
        existingPlaylist.songs = newSongIds;
        showNotification(
          `${playlistName} temizlendi ve yeni şarkılar eklendi.`,
          "success",
        );
      } else {
        existingPlaylist.songs.push(...newSongIds);
        if (!isMultiBatch)
          showNotification(
            `${playlistName} listesine ${newSongIds.length} şarkı eklendi.`,
            "success",
          );
      }

      if (data.playlist.coverUrl) {
        existingPlaylist.coverUrl = finalCoverUrl;
      }

      await DBHelper.put("playlists", existingPlaylist);
      renderPlaylists();
    } else {
      const newPlaylist = {
        id: Date.now(),
        name: playlistName,
        songs: newSongIds,
        coverUrl: finalCoverUrl,
        deletable: true,
      };
      await DBHelper.put("playlists", newPlaylist);
      playlists.push(newPlaylist);
      renderPlaylists();
      if (!isMultiBatch)
        showNotification(`${playlistName} başarıyla oluşturuldu.`, "success");
    }
  }

  function shuffleCurrentPlaylist(animate = true) {
    if (currentPlaylist.length < 2) {
      shuffledPlaylist = [...currentPlaylist];
      return;
    }
    const currentSongId =
      currentTrackIndex > -1 ? currentPlaylist[currentTrackIndex] : null;
    let restOfPlaylist = currentPlaylist.filter((id) => id !== currentSongId);
    for (let i = restOfPlaylist.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [restOfPlaylist[i], restOfPlaylist[j]] = [
        restOfPlaylist[j],
        restOfPlaylist[i],
      ];
    }
    shuffledPlaylist = currentSongId
      ? [currentSongId, ...restOfPlaylist]
      : restOfPlaylist;
    currentTrackIndex = 0;
    if (animate) {
      carouselContainer.classList.add("fading-out");
      setTimeout(() => {
        updateCarouselUI("none");
        carouselContainer.classList.remove("fading-out");
      }, 300);
    } else {
      updateCarouselUI("none");
    }
  }

  function unshufflePlaylist() {
    const currentSongId = shuffledPlaylist[currentTrackIndex];
    currentTrackIndex = currentPlaylist.indexOf(currentSongId);
    shuffledPlaylist = [];
    carouselContainer.classList.add("fading-out");
    setTimeout(() => {
      updateCarouselUI("none");
      carouselContainer.classList.remove("fading-out");
    }, 300);
  }

  function setupOutsideClickClose() {
    function handleOutside(e) {
      const target = e.target;
      const isQueuePanelOpen = !queuePanel.classList.contains(
        queuePanelClosedClass,
      );
      const isPlaylistPanelOpen =
        !playlistPanel.classList.contains(panelClosedClass);
      if (
        isQueuePanelOpen &&
        !target.closest("#queue-panel") &&
        !isQueuePanelLockedOpen
      ) {
        queuePanel.classList.add(queuePanelClosedClass);
      }
      if (
        isPlaylistPanelOpen &&
        !target.closest("#playlist-panel") &&
        !isPanelLockedOpen
      ) {
        playlistPanel.classList.add(panelClosedClass);
      }
    }
    document.addEventListener("touchstart", handleOutside);
    document.addEventListener("mousedown", handleOutside);
  }

  let isDraggingPanel = false;
  let activePanel = null;
  let startXPanel = 0;
  let currentTranslatePanel = 0;
  let panelWidth = 0;
  const panelClosedClass = "-translate-x-[calc(100%+1rem)]";
  const queuePanelClosedClass = "translate-x-[calc(100%+1rem)]";

  function onTouchStart(e) {
    const target = e.target;
    const isQueuePanelOpen = !queuePanel.classList.contains(
      queuePanelClosedClass,
    );
    const isPlaylistPanelOpen =
      !playlistPanel.classList.contains(panelClosedClass);
    if (
      (isQueuePanelOpen && target.closest("#queue-panel")) ||
      (isPlaylistPanelOpen && target.closest("#playlist-panel"))
    ) {
      activePanel = null;
      isDraggingPanel = false;
      return;
    }
    if (isPanelLockedOpen || isQueuePanelLockedOpen || activeModals.length > 0)
      return;
    const clientX = e.touches[0].clientX;
    const screenWidth = window.innerWidth;
    const isLeftPanelOpen = !playlistPanel.classList.contains(panelClosedClass);
    const isRightPanelOpen = !queuePanel.classList.contains(
      queuePanelClosedClass,
    );
    if (isLeftPanelOpen || clientX < edgeThreshold) {
      activePanel = playlistPanel;
      queuePanel.classList.add(queuePanelClosedClass);
    } else if (isRightPanelOpen || clientX > screenWidth - edgeThreshold) {
      activePanel = queuePanel;
      playlistPanel.classList.add(panelClosedClass);
    } else {
      activePanel = null;
      return;
    }
    isPanelLockedOpen = false;
    isQueuePanelLockedOpen = false;
    isDraggingPanel = true;
    startXPanel = clientX;
    panelWidth = activePanel.offsetWidth;
    activePanel.classList.add("is-dragging");
    const transform = window.getComputedStyle(activePanel).transform;
    currentTranslatePanel =
      transform === "none" ? 0 : new DOMMatrix(transform).e;
  }

  function onTouchMove(e) {
    if (!isDraggingPanel || !activePanel) return;
    e.preventDefault();
    const clientX = e.touches[0].clientX;
    const diffX = clientX - startXPanel;
    let newTranslate = currentTranslatePanel + diffX;
    if (activePanel === playlistPanel) {
      newTranslate = Math.max(-panelWidth, Math.min(0, newTranslate));
    } else {
      newTranslate = Math.min(panelWidth, Math.max(0, newTranslate));
    }
    activePanel.style.transform = `translateX(${newTranslate}px)`;
  }

  function onTouchEnd() {
    if (!isDraggingPanel || !activePanel) return;
    const finalTransform = window.getComputedStyle(activePanel).transform;
    const finalTranslate =
      finalTransform === "none" ? 0 : new DOMMatrix(finalTransform).e;
    isDraggingPanel = false;
    activePanel.classList.remove("is-dragging");
    activePanel.style.transform = "";
    const openThreshold = panelWidth / 3;
    if (activePanel === playlistPanel) {
      if (finalTranslate > -openThreshold) {
        playlistPanel.classList.remove(panelClosedClass);
        queuePanel.classList.add(queuePanelClosedClass);
      } else {
        playlistPanel.classList.add(panelClosedClass);
      }
    } else {
      if (finalTranslate < openThreshold) {
        queuePanel.classList.remove(queuePanelClosedClass);
        playlistPanel.classList.add(panelClosedClass);
      } else {
        queuePanel.classList.add(queuePanelClosedClass);
      }
    }
    activePanel = null;
  }

  function onMouseMove(e) {
    if (isPanelLockedOpen || isQueuePanelLockedOpen || activeModals.length > 0)
      return;
    const screenWidth = window.innerWidth;
    const edgeTriggerWidth = 7;
    const playlistPanelWidth = playlistPanel.offsetWidth;
    const playlistCloseThreshold = playlistPanelWidth + edgeTriggerWidth;
    if (!lockLeftMenu) {
      if (e.clientX < edgeTriggerWidth) {
        if (playlistPanel.classList.contains(panelClosedClass)) {
          playlistPanel.classList.remove(panelClosedClass);
          queuePanel.classList.add(queuePanelClosedClass);
        }
      } else if (
        e.clientX > playlistCloseThreshold &&
        !playlistPanel.matches(":hover")
      ) {
        playlistPanel.classList.add(panelClosedClass);
      }
    }
    const queuePanelWidth = queuePanel.offsetWidth;
    const queueCloseThreshold =
      screenWidth - (queuePanelWidth + edgeTriggerWidth);
    if (!lockRightMenu) {
      if (e.clientX > screenWidth - edgeTriggerWidth) {
        if (queuePanel.classList.contains(queuePanelClosedClass)) {
          queuePanel.classList.remove(queuePanelClosedClass);
          playlistPanel.classList.add(panelClosedClass);
        }
      } else if (
        e.clientX < queueCloseThreshold &&
        !queuePanel.matches(":hover")
      ) {
        queuePanel.classList.add(queuePanelClosedClass);
      }
    }
  }

  function showReaction(emoji) {
    const emojiEl = document.createElement("div");
    emojiEl.className = "animate-float-up";
    emojiEl.textContent = emoji;
    emojiEl.style.left = `${Math.random() * 80 + 10}%`;
    emojiEl.style.bottom = `${Math.random() * 20 + 10}%`;
    emojiDisplayArea.appendChild(emojiEl);
    setTimeout(() => {
      emojiEl.remove();
    }, 2900);
  }

  function initializePeerJS() {
    if (transferPeer) {
      transferPeer.destroy();
      transferPeer = null;
    }
    if (peer) peer.destroy();
    peer = new Peer();
    peer.on("open", async (id) => {
      const params = new URLSearchParams(window.location.search);
      const hostId = params.get("share");
      const battleId = params.get("battle");
      const rounds = params.get("rounds");
      if (hostId) {
        await enterShareClientMode();
        connectToHost(hostId);
      } else if (battleId && rounds) {
        await enterShareClientMode();
        connectToBattle(battleId, rounds);
      }
    });
    peer.on("connection", (newConn) => {
      if (conn && conn.open) {
        newConn.close();
        return;
      }
      conn = newConn;
      if (newConn.metadata && newConn.metadata.mode === "battle") {
        isBattleMode = true;
        isHost = true;
        isClient = false;
        battleRounds = parseInt(newConn.metadata.rounds, 10);
        showNotification("Savaş daveti kabul edildi!", "success");
        closeModal("battle-modal");
        startBattleSongSelection();
      } else {
        sessionStatusEl.textContent = "Arkadaşın bağlandı.";
      }
      setupConnection(conn);
    });
    peer.on("error", (err) => {
      if (err.type === "network" && isClient && conn) {
        reconnectToHost();
      } else {
        showNotification(`Bağlantı hatası: ${err.type}`, "error");
        resetShareSession();
      }
    });
    peer.on("disconnected", () => {
      if (isClient) {
        peer.reconnect();
      }
    });
  }

  let reconnectInterval = null;
  function reconnectToHost() {
    if (reconnectInterval) return;
    const hostId = conn ? conn.peer : null;
    if (!hostId) return;
    let attempt = 0;
    sessionStatusEl.textContent = "Bağlantı koptu, yeniden deneniyor...";
    reconnectInterval = setInterval(() => {
      if (peer.disconnected) {
        peer.reconnect();
      }
      if (!conn || !conn.open) {
        attempt++;
        conn = peer.connect(hostId);
        setupConnection(conn);
      } else {
        clearInterval(reconnectInterval);
        reconnectInterval = null;
        sessionStatusEl.textContent = "Yeniden bağlanıldı!";
        setTimeout(() => {
          if (isClient) sessionStatusEl.textContent = "Arkadaşınla dinliyorsun";
        }, 2000);
      }
      if (attempt > 5) {
        clearInterval(reconnectInterval);
        reconnectInterval = null;
        window.location.href =
          window.location.origin + window.location.pathname;
      }
    }, 5000);
  }

  function startBattleSession() {
    if (!peer || peer.disconnected) {
      showNotification("Bağlantı servisiyle irtibat kurulamadı.", "error");
      return;
    }
    savePreBattleState();
    audioPlayer.pause();
    audioPlayer.src = "";
    isPlaying = false;
    currentTrackIndex = -1;
    currentPlaylist = [];
    shuffledPlaylist = [];
    isLiveMode = true;
    isHost = true;
    isClient = false;
    isBattleMode = true;
    battleTurn = "user1";
    currentBattleRound = 1;
    myBattleScores = [];
    opponentBattleScores = [];
    myBattleSongs = [];
    opponentBattleSongs = [];
    battlePlaylist = [];
    currentBattleIndex = 0;
    isBattlePlaylistVerified = false;

    updateCarouselUI("none");
    carouselContainer.innerHTML = `<div class="flex flex-col items-center justify-center h-full text-white/40 p-10 text-center animate-pulse">
        <span class="material-symbols-rounded notranslate text-6xl mb-4">swords</span>
        <p class="text-xl font-bold">Savaş Hazırlığı</p>
        <p class="text-sm">Şarkılar seçiliyor...</p>
    </div>`;

    battleConfigSection.classList.remove("hidden");
    battleShareSection.classList.add("hidden");
    updateVolumeSliderFill(battleRoundsInput);
    openModal("battle-modal");
  }

  function handleCreateBattle() {
    battleRounds = parseInt(battleRoundsInput.value, 10);
    const battleUrl = `${window.location.origin}${window.location.pathname}?battle=${peer.id}&rounds=${battleRounds}`;
    battleShareLink.value = battleUrl;
    battleShareSection.classList.remove("hidden");
    battleConfigSection.classList.add("hidden");
    battleStatus.textContent = "Arkadaşın bekleniyor...";
  }

  function connectToBattle(hostId, rounds) {
    savePreBattleState();
    audioPlayer.pause();
    audioPlayer.src = "";
    isPlaying = false;
    currentTrackIndex = -1;
    currentPlaylist = [];
    shuffledPlaylist = [];
    isClient = true;
    isHost = false;
    isBattleMode = true;
    battleRounds = parseInt(rounds, 10);
    battleTurn = "user1";
    currentBattleRound = 1;
    myBattleScores = [];
    opponentBattleScores = [];
    myBattleSongs = [];
    opponentBattleSongs = [];
    battlePlaylist = [];
    currentBattleIndex = 0;
    isBattlePlaylistVerified = false;

    updateCarouselUI("none");
    carouselContainer.innerHTML = `<div class="flex flex-col items-center justify-center h-full text-white/40 p-10 text-center animate-pulse">
        <span class="material-symbols-rounded notranslate text-6xl mb-4">swords</span>
        <p class="text-xl font-bold">Savaş Hazırlığı</p>
        <p class="text-sm">Şarkılar seçiliyor...</p>
    </div>`;

    isLiveMode = true;
    conn = peer.connect(hostId, {
      metadata: { rounds: battleRounds, mode: "battle" },
    });
    setupConnection(conn);
  }

  function startBattleSongSelection() {
    myBattleSongs = [];
    battleSelectedCount.textContent = "0";
    battleTotalRequired.textContent = battleRounds;
    battleConfirmSelectionBtn.disabled = true;
    battleSelectionInProgress = [];
    renderBattleSelectionList();
    openModal("battle-selection-modal");
  }

  function renderBattleSelectionList(filter = "") {
    battleSelectionList.innerHTML = "";
    const allSongs = Object.values(masterSongLibrary).filter(
      (s) =>
        !s.isBroken &&
        !s.isLocal &&
        (s.title.toLowerCase().includes(filter.toLowerCase()) ||
          (s.artist && s.artist.toLowerCase().includes(filter.toLowerCase()))),
    );

    if (allSongs.length === 0) {
      battleSelectionList.innerHTML =
        '<p class="text-white/50 text-center py-4">Şarkı bulunamadı.</p>';
      return;
    }

    allSongs.forEach((song) => {
      const li = document.createElement("li");
      li.className =
        "flex items-center gap-3 p-3 bg-white/5 rounded-2xl hover:bg-white/10 cursor-pointer transition-all";
      const isSelected = battleSelectionInProgress.includes(song.id);
      if (isSelected)
        li.classList.add("ring-2", "ring-violet-400", "bg-violet-400/10");

      li.innerHTML = `
        <img src="${song.image || "https://lunetune.xmeroriginals.com/resources/lunetune-thumb.png"}" class="w-12 h-12 rounded-xl object-cover" />
        <div class="flex-grow overflow-hidden">
          <p class="text-white font-medium truncate">${song.title}</p>
          <p class="text-white/50 text-xs truncate">${song.artist || "Bilinmeyen Sanatçı"}</p>
        </div>
        ${isSelected ? '<span class="material-symbols-rounded notranslate text-violet-400">check_circle</span>' : ""}
      `;

      li.addEventListener("click", () => {
        if (battleSelectionInProgress.includes(song.id)) {
          battleSelectionInProgress = battleSelectionInProgress.filter(
            (id) => id !== song.id,
          );
        } else if (battleSelectionInProgress.length < battleRounds) {
          battleSelectionInProgress.push(song.id);
        } else {
          showNotification(
            `Maksimum ${battleRounds} şarkı seçebilirsiniz.`,
            "info",
          );
          return;
        }
        battleSelectedCount.textContent = battleSelectionInProgress.length;
        battleConfirmSelectionBtn.disabled =
          battleSelectionInProgress.length < battleRounds;
        renderBattleSelectionList(filter);
      });

      battleSelectionList.appendChild(li);
    });
  }

  async function finishBattleSelection() {
    myBattleSongs = battleSelectionInProgress.map(
      (id) => masterSongLibrary[id],
    );
    closeModal("battle-selection-modal");
    silentPlayer.play().catch(() => {});
    const unlockAudio = audioPlayer.play();
    if (unlockAudio !== undefined) {
      unlockAudio.then(() => audioPlayer.pause()).catch(() => {});
    }
    isClientPlaybackUnlocked = true;
    showNotification("Şarkıların hazır! Rakibin bekleniyor...", "success");
    broadcastMessage({
      t: "battle_songs_selected",
      songs: myBattleSongs.map((s) => ({
        id: s.id,
        title: s.title,
        artist: s.artist,
        image: s.image,
        isLocal: s.isLocal,
        url: s.isLocal ? null : s.url,
        mime: s.fileBlob ? s.fileBlob.type : "audio/mpeg",
      })),
    });

    if (opponentBattleSongs.length > 0) {
      console.log("Opponent selection already present, starting rounds...");
      beginBattleRounds();
    } else {
      console.log("Waiting for opponent to select songs...");
    }
  }

  function beginBattleRounds() {
    console.log(
      "beginBattleRounds() triggered. My:",
      myBattleSongs.length,
      "Opponent:",
      opponentBattleSongs.length,
      "Rounds:",
      battleRounds,
    );
    if (
      myBattleSongs.length < battleRounds ||
      opponentBattleSongs.length < battleRounds
    ) {
      console.warn("Attempted to start rounds without enough songs.");
      return;
    }
    battlePlaylist = [];
    currentBattleIndex = 0;
    for (let i = 0; i < battleRounds; i++) {
      if (isHost) {
        battlePlaylist.push(myBattleSongs[i]);
        battlePlaylist.push(opponentBattleSongs[i]);
      } else {
        battlePlaylist.push(opponentBattleSongs[i]);
        battlePlaylist.push(myBattleSongs[i]);
      }
    }
    console.log(
      "Battle playlist prepared interleaved:",
      battlePlaylist.map((s) => s.title),
    );

    if (battlePlaylist[1] && battlePlaylist[1].url) {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.href = battlePlaylist[1].url;
      link.as = "audio";
      document.head.appendChild(link);
    }

    if (isHost) {
      console.log("Host sending playlist verification...");
      setTimeout(() => {
        broadcastMessage({
          t: "battle_verify_playlist",
          playlist: battlePlaylist.map((s) => s.id),
        });
        showNotification("Playlist doğrulanıyor...", "info");
      }, 500);
    }
  }

  function handleBattlePlaylistVerification(receivedIds) {
    const myInterleavedIds = [];
    for (let i = 0; i < battleRounds; i++) {
      myInterleavedIds.push(opponentBattleSongs[i].id);
      myInterleavedIds.push(myBattleSongs[i].id);
    }

    const isMatch = receivedIds.every(
      (id, idx) => id === myInterleavedIds[idx],
    );

    if (isMatch) {
      console.log("Playlist matching successful on Client.");
      conn.send({ t: "battle_verification_ok" });
      isBattlePlaylistVerified = true;
      showNotification("Oyun senkronize edildi, başlanıyor...", "success");
    } else {
      broadcastMessage({
        t: "battle_cheat_detected",
        reason: "Playlist Mismatch",
      });
      showNotification("Hile algılandı: Playlist uyumsuzluğu!", "error");
      finishBattle();
    }
  }

  function startCurrentBattleTurn() {
    console.log(
      "startCurrentBattleTurn() called. Index:",
      currentBattleIndex,
      "IsVerified:",
      isBattlePlaylistVerified,
    );
    if (!isBattlePlaylistVerified) {
      console.warn("Attempted to start turn without verification.");
      return;
    }
    reactionContainer.classList.add("hidden");
    const song = battlePlaylist[currentBattleIndex];
    if (!song || song.isLocal) {
      if (!song) finishBattle();
      else {
        showNotification("Yerel şarkılar savaş modunda kullanılamaz!", "error");
        finishBattle();
      }
      return;
    }

    shuffleBtn.classList.add("opacity-50", "pointer-events-none");
    loopBtn.classList.add("opacity-50", "pointer-events-none");
    currentBattleRound = Math.floor(currentBattleIndex / 2) + 1;
    battleTurn = currentBattleIndex % 2 === 0 ? "user1" : "user2";

    if (isHost) {
      loadBattleTrack(song);
    }
    battleNavVotes.next.my = battleNavVotes.next.opponent = false;
    battleNavVotes.prev.my = battleNavVotes.prev.opponent = false;
    battleSeekVotes.fwd.my = battleSeekVotes.fwd.opponent = false;
    battleSeekVotes.bwd.my = battleSeekVotes.bwd.opponent = false;
  }

  function loadBattleTrack(song) {
    if (!isHost) return;
    if (
      battlePlaylist[currentBattleIndex + 1] &&
      battlePlaylist[currentBattleIndex + 1].url
    ) {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.href = battlePlaylist[currentBattleIndex + 1].url;
      link.as = "audio";
      document.head.appendChild(link);
    }

    broadcastMessage({
      t: "battle_load_track",
      song: song,
      round: currentBattleRound,
      turn: battleTurn,
      index: currentBattleIndex,
    });

    handleBattleTrackLoad(song);
  }

  function handleBattleTrackLoad(metadata) {
    isPlaying = false;
    audioPlayer.pause();
    if (audioPlayer.src !== metadata.url) {
      audioPlayer.src = "";
    }

    masterSongLibrary[metadata.id] = metadata;
    updateCarouselUI("none");
    carouselContainer.innerHTML = "";
    carouselContainer.appendChild(createSongCard(metadata, "current"));

    clientState.currentSongId = metadata.id;
    clientState.currentLoadId = `battle_${currentBattleRound}_${battleTurn}`;

    const onReady = () => {
      console.log("handleBattleTrackLoad: Track ready.");
      if (isHost) {
        hostState.isWaitingForClient = true;
        hostState.pendingSongId = metadata.id;
        hostState.pendingAutoPlay = true;
        hostState.currentSyncId = `battle_${currentBattleRound}_${battleTurn}`;
        console.log("Host waiting for Client ready_to_play sync...");
        setTimeout(() => {
          if (
            hostState.isWaitingForClient &&
            hostState.currentSyncId ===
              `battle_${currentBattleRound}_${battleTurn}`
          ) {
            console.warn("Battle Sync Timeout: Forcing start.");
            hostState.isWaitingForClient = false;
            if (hostState.pendingAutoPlay) {
              playTrack();
            }
          }
        }, 5000);
      } else {
        console.log("Client sending ready_to_play sync...");
        conn.send({
          t: "client_ready_to_play",
          id: metadata.id,
          syncId: `battle_${currentBattleRound}_${battleTurn}`,
        });
      }
    };

    if (metadata.url) {
      audioPlayer.addEventListener("loadedmetadata", onReady, { once: true });
      audioPlayer.src = metadata.url;
      audioPlayer.load();
    } else if (metadata.isLocal) {
      if (isClient) {
        showNotification(`${metadata.title} alınıyor...`, "info", 5000);
        conn.send({ t: "request_blob", id: metadata.id });
      } else {
        const songData = masterSongLibrary[metadata.id];
        if (songData && songData.fileBlob) {
          audioPlayer.addEventListener("loadedmetadata", onReady, {
            once: true,
          });
          audioPlayer.src = URL.createObjectURL(songData.fileBlob);
          audioPlayer.load();
        }
      }
    }
  }

  function voteBattleNav(action) {
    battleNavVotes[action].my = true;
    const emoji = action === "next" ? "⏭️" : "⏮️";
    showReaction(emoji);
    broadcastMessage({ t: "battle_nav_vote", action: action, emoji: emoji });
    if (battleNavVotes[action].opponent) {
      executeBattleNav(action);
    } else {
      showNotification(
        "Geçiş oyu verildi. Rakibin onayı bekleniyor...",
        "info",
      );
    }
  }

  function executeBattleNav(action) {
    battleNavVotes.next.my = battleNavVotes.next.opponent = false;
    battleNavVotes.prev.my = battleNavVotes.prev.opponent = false;
    if (action === "next") {
      showRatingModal();
    } else {
      if (currentBattleIndex > 0) {
        currentBattleIndex--;
        startCurrentBattleTurn();
      }
    }
  }

  function voteBattleSeek(offset) {
    const key = offset > 0 ? "fwd" : "bwd";
    battleSeekVotes[key].my = true;
    const emoji = offset > 0 ? "⏩" : "⏪";
    showReaction(emoji);
    broadcastMessage({ t: "battle_seek_vote", offset: offset, emoji: emoji });
    if (battleSeekVotes[key].opponent) {
      executeBattleSeek(offset);
    } else {
      showNotification(
        "Sarma oyu verildi. Rakibin onayı bekleniyor...",
        "info",
      );
    }
  }

  function executeBattleSeek(offset) {
    const key = offset > 0 ? "fwd" : "bwd";
    battleSeekVotes[key].my = battleSeekVotes[key].opponent = false;
    const newTime = Math.max(
      0.1,
      Math.min(
        audioPlayer.duration || Infinity,
        audioPlayer.currentTime + offset,
      ),
    );
    if (isHost) {
      seekTo(newTime);
    }
  }

  function showRatingModal() {
    audioPlayer.pause();
    isPlaying = false;
    playPauseIcon.textContent = "play_circle";

    hasMyRated = false;
    hasOpponentRated = false;
    currentBattleRating = 0;
    currentTrackScores.my = null;
    currentTrackScores.opponent = null;

    const starIcons = battleStarsContainer.querySelectorAll(
      ".material-symbols-rounded",
    );
    starIcons.forEach((icon) => {
      icon.classList.remove("text-yellow-400");
      icon.classList.add("text-white/20");
    });
    battleSubmitRatingBtn.disabled = true;
    battleSubmitRatingBtn.innerHTML = "Değerlendir";

    openModal("battle-rating-modal");
  }

  function submitBattleRating(stars) {
    hasMyRated = true;
    currentTrackScores.my = stars;
    broadcastMessage({ t: "battle_rating_sync", stars: stars });
    checkRatingStatus();
  }

  function checkRatingStatus() {
    if (hasMyRated && hasOpponentRated) {
      if (currentBattleIndex % 2 === (isHost ? 0 : 1)) {
        myBattleScores.push(currentTrackScores.opponent);
        opponentBattleScores.push(currentTrackScores.my);
      } else {
        opponentBattleScores.push(currentTrackScores.my);
        myBattleScores.push(currentTrackScores.opponent);
      }
      closeModal("battle-rating-modal");
      showNotification("Puanlar kaydedildi!", "success");
      advanceBattleRound();
    } else if (hasMyRated) {
      showNotification("Rakibin puan vermesi bekleniyor...", "info");
      battleSubmitRatingBtn.disabled = true;
      battleSubmitRatingBtn.innerHTML = "Bekleniyor...";
    } else if (hasOpponentRated) {
      showNotification("Rakibin puan verdi, senin puanın bekleniyor!", "info");
    }
  }

  function advanceBattleRound() {
    currentBattleIndex++;
    if (currentBattleIndex >= battlePlaylist.length) {
      finishBattle();
    } else {
      startCurrentBattleTurn();
    }
  }

  function advanceBattle() {
    if (battleTurn === "user1") {
      battleTurn = "user2";
      startCurrentBattleTurn();
    } else {
      if (currentBattleRound < battleRounds) {
        currentBattleRound++;
        battleTurn = "user1";
        showNotification(`Round ${currentBattleRound} Başlıyor!`, "info");
        startCurrentBattleTurn();
      } else {
        finishBattle();
      }
    }
  }

  async function finishBattle() {
    isBattleMode = false;
    isBattlePlaylistVerified = false;
    reactionContainer.classList.add("hidden");
    battleSelectionModal.classList.add("hidden");
    shuffleBtn.classList.remove("opacity-50", "pointer-events-none");
    loopBtn.classList.remove("opacity-50", "pointer-events-none");

    if (
      carouselContainer.querySelector(".battle-prep-screen") ||
      carouselContainer.innerHTML.includes("Savaş Hazırlığı")
    ) {
      carouselContainer.innerHTML = "";
      updateCarouselUI("library");
    }

    if (myBattleScores.length > 0 || opponentBattleScores.length > 0) {
      showNotification("Savaş Bitti! Sonuçlar hesaplanıyor...", "success");
      broadcastMessage({
        t: "battle_verification",
        myScores: myBattleScores,
        opponentScores: opponentBattleScores,
      });

      if (receivedOpponentResults) {
        verifyAndShowResults();
      }
    } else {
      showNotification("Savaş Modu sonlandırıldı.", "info");
      resetShareSession();
      restorePreBattleState();
    }
  }

  let receivedOpponentResults = null;
  function verifyAndShowResults() {
    const remote = receivedOpponentResults;
    const myScoresMatch =
      JSON.stringify(myBattleScores) === JSON.stringify(remote.opponentScores);
    const opponentScoresMatch =
      JSON.stringify(opponentBattleScores) === JSON.stringify(remote.myScores);

    if (!myScoresMatch || !opponentScoresMatch) {
      showNotification("Hile algılandı! Maç iptal edildi.", "error", 10000);
      isBattleMode = false;
      return;
    }

    const myTotal = myBattleScores.reduce((a, b) => a + b, 0);
    const opponentTotal = opponentBattleScores.reduce((a, b) => a + b, 0);

    myBattleScoreEl.textContent = myTotal;
    opponentBattleScoreEl.textContent = opponentTotal;

    if (myTotal > opponentTotal) {
      battleResultTitle.textContent = "Kazandın! 🏆";
      battleResultMessage.textContent = "Harika bir zevkin var! 😎";
    } else if (opponentTotal > myTotal) {
      battleResultTitle.textContent = "Kaybettin... 💀";
      battleResultMessage.textContent = "Daha iyi şarkılar seçmelisin. 😊";
    } else {
      battleResultTitle.textContent = "Berabere! 🤝";
      battleResultMessage.textContent = "Zevkleriniz birebir aynı! 🤩";
    }

    openModal("battle-result-modal");
    isBattleMode = false;
    resetShareSession();
    myBattleSongs = [];
    opponentBattleSongs = [];
    myBattleScores = [];
    opponentBattleScores = [];
    battlePlaylist = [];
    currentBattleIndex = 0;
    restorePreBattleState();
  }

  function startShareSession() {
    if (!peer || peer.disconnected) {
      showNotification("Bağlantı servisiyle irtibat kurulamadı.", "error");
      return;
    }
    isHost = true;
    isClient = false;
    const shareUrl = `${window.location.origin}${window.location.pathname}?share=${peer.id}`;
    shareLinkInput.value = shareUrl;
    sessionStatusEl.textContent = "Bağlantı bekleniyor...";
    openModal("share-modal");
    if (syncInterval) clearInterval(syncInterval);
  }

  function resetShareSession() {
    if (conn) {
      try {
        conn.close();
      } catch (e) {}
    }
    clearInterval(syncInterval);
    syncInterval = null;
    if (typeof reconnectInterval !== "undefined" && reconnectInterval) {
      clearInterval(reconnectInterval);
      reconnectInterval = null;
    }
    conn = null;
    isHost = false;
    isClient = false;
    isBattleMode = false;
    sessionStatusEl.textContent = "Bağlantı bekleniyor...";
    if (typeof reactionContainer !== "undefined" && reactionContainer) {
      reactionContainer.classList.add("hidden");
    }
  }

  function connectToHost(hostId) {
    isClient = true;
    isHost = false;
    isLiveMode = true;
    currentTrackIndex = -1;
    updateCarouselUI("none");
    conn = peer.connect(hostId);
    setupConnection(conn);
  }

  function setupConnection(connection) {
    connection.on("open", () => {
      if (isHost) {
        if (isBattleMode) {
          sessionStatusEl.textContent = "Savaşçı rakibin bağlandı.";
          showNotification("Rakibin katıldı!", "success");
          startBattleSongSelection();
        } else {
          sessionStatusEl.textContent = "Arkadaşın bağlandı.";
          showNotification("Arkadaşın katıldı.", "success");
          reactionContainer.classList.remove("hidden");
        }
        if (currentTrackIndex > -1 && !isBattleMode) {
          if (initialSyncTimeout) clearTimeout(initialSyncTimeout);
          initialSyncTimeout = setTimeout(() => sendFullState(), 500);
        }
      } else {
        if (reconnectInterval) {
          clearInterval(reconnectInterval);
          reconnectInterval = null;
        }
        if (isBattleMode) {
          sessionStatusEl.textContent = "Savaşa katıldın";
          showNotification("Savaşa katıldın! Şarkılarını seç.", "success");
          startBattleSongSelection();
        } else {
          sessionStatusEl.textContent = "Arkadaşınla dinliyorsun";
          reactionContainer.classList.remove("hidden");
        }
      }
    });
    connection.on("data", handleIncomingData);
    connection.on("close", () => {
      showNotification("Arkadaşının bağlantısı koptu.", "info");
      reactionContainer.classList.add("hidden");
      if (isClient) {
        reconnectToHost();
      } else {
        resetShareSession();
      }
    });
  }

  function sendFullState() {
    if (!isHost || !conn || !conn.open || currentTrackIndex < 0) return;
    const playbackList = isShuffle ? shuffledPlaylist : currentPlaylist;
    const songId = playbackList[currentTrackIndex];
    const track = masterSongLibrary[songId];
    if (!track) return;
    const state = {
      t: "full_state",
      metadata: {
        id: track.id,
        isLocal: track.isLocal,
        url: track.isLocal ? null : track.url,
        title: track.title,
        artist: track.artist,
        image: track.image,
        mime: track.fileBlob ? track.fileBlob.type : "audio/mpeg",
      },
      isPlaying: isPlaying,
      position: audioPlayer.currentTime,
      at: Date.now(),
    };
    broadcastMessage(state);
  }

  function broadcastMessage(data) {
    if (conn && conn.open) {
      conn.send(data);
    }
  }

  function handleClientLoad(metadata, syncId, fullStateData = null) {
    if (
      clientState.currentSongId &&
      incomingBase64[clientState.currentSongId]
    ) {
      delete incomingBase64[clientState.currentSongId];
    }
    clientState.currentLoadId = syncId;
    clientState.currentSongId = metadata.id;
    masterSongLibrary[metadata.id] = metadata;
    carouselContainer.innerHTML = "";
    carouselContainer.appendChild(createSongCard(metadata, "current"));
    audioPlayer.pause();
    audioPlayer.src = "";
    const onReady = () => {
      if (clientState.currentLoadId === syncId) {
        if (fullStateData && fullStateData.isPlaying) {
          const networkLatency = Date.now() - fullStateData.at;
          const estimatedHostTime =
            fullStateData.position + networkLatency / 1000;
          audioPlayer.currentTime = Math.max(
            0,
            Math.min(audioPlayer.duration, estimatedHostTime - 0.2),
          );
          audioPlayer.play().catch((e) => {});
          isPlaying = true;
          playPauseIcon.textContent = "pause_circle";
        } else if (!fullStateData) {
          conn.send({
            t: "client_ready_to_play",
            id: metadata.id,
            syncId: syncId,
          });
        }
      }
    };

    stopPreview();
    audioPlayer.pause();
    audioPlayer.src = "";
    audioPlayer.load();

    if (metadata.url) {
      audioPlayer.src = metadata.url;
      audioPlayer.load();
      audioPlayer.addEventListener("loadedmetadata", onReady, { once: true });
    } else if (metadata.isLocal) {
      showNotification(
        `${metadata.title} senkronize ediliyor...`,
        "info",
        5000,
      );
      conn.send({ t: "request_blob", id: metadata.id });
    }
  }

  let isClientSeeking = false;
  async function handleIncomingData(data) {
    switch (data.t) {
      case "battle_songs_selected":
        if (data.songs.length !== battleRounds) {
          showNotification("Hile algılandı! Tur sayısı uyuşmuyor.", "error");
          isBattleMode = false;
          resetShareSession();
          return;
        }
        opponentBattleSongs = data.songs;
        showNotification("Rakibin şarkılarını seçti!", "success");
        if (myBattleSongs.length > 0) {
          beginBattleRounds();
        }
        break;
      case "battle_rating_sync":
        hasOpponentRated = true;
        currentTrackScores.opponent = data.stars;
        checkRatingStatus();
        break;
      case "battle_nav_vote":
        battleNavVotes[data.action].opponent = true;
        if (data.emoji) showReaction(data.emoji);
        if (battleNavVotes[data.action].my) {
          executeBattleNav(data.action);
        } else {
          showNotification(
            `Rakibin ${data.action === "next" ? "sonraki" : "önceki"} şarkıya geçmek istiyor.`,
            "info",
          );
        }
        break;
      case "battle_seek_vote":
        const voteKey = data.offset > 0 ? "fwd" : "bwd";
        battleSeekVotes[voteKey].opponent = true;
        if (data.emoji) showReaction(data.emoji);
        if (battleSeekVotes[voteKey].my) {
          executeBattleSeek(data.offset);
        } else {
          showNotification(
            `Rakibin şarkıyı ${Math.abs(data.offset)}s ${data.offset > 0 ? "ileri" : "geri"} sarmak istiyor.`,
            "info",
          );
        }
        break;
      case "battle_force_modal":
        showRatingModal();
        break;
      case "battle_verify_playlist":
        handleBattlePlaylistVerification(data.playlist);
        break;
      case "battle_verification_ok":
        if (isHost) {
          isBattlePlaylistVerified = true;
          showNotification("Eşleşme Tamam! Savaş Başlıyor...", "success");
          currentBattleIndex = 0;
          setTimeout(() => {
            startCurrentBattleTurn();
          }, 1000);
        }
        break;
      case "battle_request_toggle_pause":
        if (isHost) {
          togglePlayPause();
        }
        break;
      case "battle_cheat_detected":
        showNotification(
          `Hile algılandı (${data.reason || "Bilinmiyor"})! Maç sonlandırıldı.`,
          "error",
        );
        finishBattle();
        break;
      case "battle_verification":
        receivedOpponentResults = data;
        verifyAndShowResults();
        break;
      case "reaction_display":
        showReaction(data.emoji);
        break;
    }

    if (isHost) {
      switch (data.t) {
        case "request_blob":
          const requestedSong = masterSongLibrary[data.id];
          if (
            requestedSong &&
            requestedSong.isLocal &&
            requestedSong.fileBlob
          ) {
            try {
              const base64Data = await blobToBase64(requestedSong.fileBlob);
              const CHUNK_SIZE = 16 * 1024;
              let offset = 0;
              broadcastMessage({
                t: "base64_start",
                id: data.id,
                mime: requestedSong.fileBlob.type || "audio/mpeg",
              });
              while (offset < base64Data.length) {
                const chunk = base64Data.substring(offset, offset + CHUNK_SIZE);
                broadcastMessage({
                  t: "base64_chunk",
                  id: data.id,
                  data: chunk,
                  isLast: offset + CHUNK_SIZE >= base64Data.length,
                });
                offset += CHUNK_SIZE;
              }
            } catch (error) {
              console.error("Blob to Base64 conversion failed:", error);
            }
          }
          break;
        case "client_ready_to_play":
          if (
            hostState.isWaitingForClient &&
            hostState.currentSyncId === data.syncId &&
            hostState.pendingSongId === data.id
          ) {
            hostState.isWaitingForClient = false;
            if (hostState.pendingAutoPlay) {
              audioPlayer.currentTime = 0;
              audioPlayer
                .play()
                .then(() => {
                  isPlaying = true;
                  playPauseIcon.textContent = "pause_circle";
                  spinningLogo.classList.add("playing");
                  showNotification(
                    "Senkronizasyon tamamlandı!",
                    "success",
                    2000,
                  );
                  broadcastCurrentState();
                })
                .catch((e) => console.error("Host play error after sync:", e));
            } else {
              isPlaying = false;
              audioPlayer.pause();
              playPauseIcon.textContent = "play_circle";
              spinningLogo.classList.remove("playing");
              showNotification("Senkronizasyon tamamlandı!", "success", 2000);
              broadcastCurrentState();
            }
            hostState.pendingSongId = null;
            hostState.pendingAutoPlay = false;
            hostState.currentSyncId = null;
          }
          break;
        case "reaction":
          showReaction(data.emoji);
          broadcastMessage({ t: "reaction_display", emoji: data.emoji });
          break;
      }
    } else {
      switch (data.t) {
        case "full_state":
          handleClientLoad(data.metadata, `init_${Date.now()}`, data);
          break;
        case "load_track":
          silentPlayer.play().catch((e) => {});
          handleClientLoad(data.metadata, data.syncId);
          break;
        case "battle_load_track":
          currentBattleRound = data.round;
          battleTurn = data.turn;
          if (typeof data.index === "number") currentBattleIndex = data.index;
          reactionContainer.classList.add("hidden");
          handleBattleTrackLoad(data.song);
          break;
        case "base64_start":
          if (data.id === clientState.currentSongId) {
            incomingBase64[data.id] = { data: "", mime: data.mime };
          }
          break;
        case "base64_chunk":
          if (
            incomingBase64[data.id] &&
            data.id === clientState.currentSongId
          ) {
            const transfer = incomingBase64[data.id];
            transfer.data += data.data;
            if (data.isLast) {
              try {
                const blob = await base64ToBlob(transfer.data, transfer.mime);
                audioPlayer.src = URL.createObjectURL(blob);
                audioPlayer.load();
                audioPlayer.addEventListener(
                  "canplaythrough",
                  () => {
                    if (clientState.currentLoadId) {
                      conn.send({
                        t: "client_ready_to_play",
                        id: data.id,
                        syncId: clientState.currentLoadId,
                      });
                    }
                  },
                  { once: true },
                );
              } finally {
                delete incomingBase64[data.id];
              }
            }
          }
          break;
        case "seek_start":
          isClientSeeking = true;
          audioPlayer.pause();
          break;
        case "seek_end":
          const networkLatency = Date.now() - data.at;
          const estimatedHostPosition = data.pos + networkLatency / 1000;
          const onClientSeeked = () => {
            audioPlayer.removeEventListener("seeked", onClientSeeked);
            if (data.isPlaying) {
              if (isClientPlaybackUnlocked) {
                audioPlayer.play().catch((e) => {});
              }
            } else {
              audioPlayer.pause();
            }
            isClientSeeking = false;
          };
          audioPlayer.addEventListener("seeked", onClientSeeked, {
            once: true,
          });
          audioPlayer.currentTime = estimatedHostPosition;
          break;
        case "state_update":
          if (isClientSeeking) return;
          if (isBattleMode && isPlaying && !isChangingTrack) {
            const hostPos = data.pos;
            const myPos = audioPlayer.currentTime;
            const latency = (Date.now() - data.at) / 1000;
            const diff = Math.abs(hostPos + latency - myPos);
            if (diff > 5) {
              broadcastMessage({
                t: "battle_cheat_detected",
                reason: "Unauthorized Seek",
              });
              showNotification(
                "Hile algılandı: Senkronizasyon bozuldu!",
                "error",
              );
              finishBattle();
              return;
            }
          }

          if (
            audioPlayer.readyState < 2 ||
            data.songId !== clientState.currentSongId
          )
            return;
          if (data.isPlaying && audioPlayer.paused) {
            if (isClientPlaybackUnlocked) {
              audioPlayer.play().catch((e) => {});
            }
          } else if (!data.isPlaying && !audioPlayer.paused) {
            audioPlayer.pause();
          }
          updatePlayPauseUI(data.isPlaying);
          if (!isPlaying) {
            audioPlayer.playbackRate = 1.0;
            return;
          }
          const estimatedHostTime = data.pos + (Date.now() - data.at) / 1000;
          const timeDiff = estimatedHostTime - audioPlayer.currentTime;
          if (Math.abs(timeDiff) > 1.2) {
            audioPlayer.currentTime = estimatedHostTime;
            audioPlayer.playbackRate = 1.0;
          } else if (Math.abs(timeDiff) > 0.15) {
            audioPlayer.playbackRate = Math.max(
              0.8,
              Math.min(1.2, 1.0 + timeDiff * 0.05),
            );
          } else {
            audioPlayer.playbackRate = 1.0;
          }
          break;
        case "loading":
          if (data.reason === "playlist_end") {
            silentPlayer.pause();
            audioPlayer.pause();
            audioPlayer.src = "";
            updateCarouselUI("none");
            clientState.currentLoadId = null;
            clientState.currentSongId = null;
          }
          break;
      }
    }
  }

  function seekTo(time, fromMediaSession = false) {
    if (isClient || isHostSeeking) return;
    if (isLiveMode && !isBattleMode) return;
    isHostSeeking = true;
    const newTime = Math.max(
      0,
      Math.min(audioPlayer.duration || Infinity, time),
    );
    broadcastMessage({ t: "seek_start" });
    const onSeeked = () => {
      audioPlayer.removeEventListener("seeked", onSeeked);
      broadcastMessage({
        t: "seek_end",
        pos: audioPlayer.currentTime,
        at: Date.now(),
        isPlaying: isPlaying,
      });
      clearTimeout(seekEndTimeout);
      seekEndTimeout = setTimeout(() => {
        isHostSeeking = false;
        if (isPlaying) {
          broadcastCurrentState();
        }
      }, 250);
    };
    audioPlayer.addEventListener("seeked", onSeeked, { once: true });
    audioPlayer.currentTime = newTime;
    if (
      !fromMediaSession &&
      "mediaSession" in navigator &&
      navigator.mediaSession.setPositionState
    ) {
      navigator.mediaSession.setPositionState({
        duration: audioPlayer.duration,
        playbackRate: audioPlayer.playbackRate,
        position: newTime,
      });
    }
  }

  function enterShareClientMode() {
    return new Promise((resolve) => {
      isLiveMode = true;
      const clientOverlay = document.createElement("div");
      clientOverlay.id = "client-play-overlay";
      clientOverlay.className =
        "absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-50 cursor-pointer p-4 text-center";
      clientOverlay.innerHTML = `<span class="material-symbols-rounded notranslate text-7xl text-white mb-4 animate-pulse">play_circle</span><p class="text-white text-2xl font-bold mb-4">Music Together</p><p class="text-white/70 max-w-lg">İnternet bağlantı sorunlarınızda beraber dinlediğiniz şarkıda arkadaşınız ile senkron kayması yaşanırsa tekrar otomatik senkronize edilmek üzere şarkınız ileri/geri sarılabilir.<p>`;
      document.body.appendChild(clientOverlay);
      const startClientPlayback = () => {
        isClientPlaybackUnlocked = true;
        const dummyAudio = new Audio(
          "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=",
        );
        dummyAudio.play().catch(() => {});
        clientOverlay.remove();
        resolve();
      };
      clientOverlay.addEventListener("click", startClientPlayback, {
        once: true,
      });
    });
  }

  function broadcastCurrentState() {
    if (
      isHostSeeking ||
      !isHost ||
      !conn ||
      !conn.open ||
      (currentTrackIndex < 0 && !isBattleMode) ||
      !audioPlayer.src
    )
      return;
    const playbackList = isBattleMode
      ? battlePlaylist
      : isShuffle
        ? shuffledPlaylist
        : currentPlaylist;
    const index = isBattleMode ? currentBattleIndex : currentTrackIndex;
    const songId = isBattleMode ? playbackList[index]?.id : playbackList[index];

    broadcastMessage({
      t: "state_update",
      isPlaying: isPlaying,
      pos: audioPlayer.currentTime,
      at: Date.now(),
      songId: songId,
    });
  }

  function setSleepTimer(minutes = false) {
    clearTimeout(sleepTimer);
    clearInterval(sleepTimerInterval);
    document
      .querySelectorAll(".timer-btn")
      .forEach((btn) => btn.classList.remove("active"));
    if (minutes === 0 || !minutes) {
      sleepTimerStatusEl.textContent = "Zamanlayıcı aktif değil.";
      if (sleepTimer)
        showNotification("Uyku zamanlayıcısı iptal edildi.", "info");
      sleepTimer = null;
      return;
    }
    const targetButton = document.querySelector(
      `.timer-btn[data-minutes="${minutes}"]`,
    );
    if (targetButton) targetButton.classList.add("active");
    const endTime = Date.now() + minutes * 60 * 1000;
    const updateTimerDisplay = () => {
      const remaining = endTime - Date.now();
      if (remaining <= 0) {
        sleepTimerStatusEl.textContent = "Zaman doldu...";
        clearInterval(sleepTimerInterval);
        return;
      }
      const remainingMinutes = Math.floor(remaining / 60000);
      const remainingSeconds = Math.floor((remaining % 60000) / 1000)
        .toString()
        .padStart(2, "0");
      sleepTimerStatusEl.textContent = `Kalan süre | ${remainingMinutes}:${remainingSeconds}`;
    };
    updateTimerDisplay();
    sleepTimerInterval = setInterval(updateTimerDisplay, 1000);
    sleepTimer = setTimeout(
      async () => {
        await fadeVolume(audioPlayer, "out");
        pauseTrack();
        setSleepTimer(0);
        setTimeout(() => {
          window.close();
        }, 1500);
      },
      minutes * 60 * 1000,
    );
    showNotification(
      `${minutes} dakika sonra uygulama kapatılacak.`,
      "success",
    );
    closeModal("sleep-timer-modal");
  }

  function resetTransferState() {
    if (transferConn) {
      transferConn.close();
      transferConn = null;
    }
    if (transferPeer) {
      transferPeer.destroy();
      transferPeer = null;
    }
    transferState = {
      role: null,
      isTransferring: false,
      totalChunks: 0,
      receivedChunks: 0,
      parser: null,
      sendNextChunk: null,
    };
    closeModal("transfer-sender-modal");
    closeModal("transfer-receiver-modal");
    closeModal("transfer-progress-modal");
    if (!peer || peer.disconnected) {
      initializePeerJS();
    }
  }

  function generateShortCode() {
    return Math.floor(100000000 + Math.random() * 900000000).toString();
  }

  function tryInitializeTransferPeer(attempt = 1) {
    if (attempt > 10) {
      showNotification(
        "Uygun bir bağlantı kodu bulunamadı. Lütfen tekrar deneyin.",
        "error",
      );
      resetTransferState();
      return;
    }
    const shortCode = generateShortCode();
    if (transferPeer) transferPeer.destroy();
    transferPeer = new Peer(shortCode);
    transferPeer.on("open", (id) => {
      const formattedCode = id.replace(/(\d{3})(\d{3})(\d{3})/, "$1-$2-$3");
      transferPeerIdEl.textContent = formattedCode;
      transferSenderStatusEl.textContent = "Bağlantı bekleniyor...";
      transferQrCodeEl.innerHTML = "";
      new QRCode(transferQrCodeEl, {
        text: `${window.location.origin}${window.location.pathname}?transfer=${id}`,
        width: 192,
        height: 192,
      });
      transferPeer.on("connection", (newConn) => {
        if (newConn.metadata && newConn.metadata.type === "data-transfer") {
          if (transferConn && transferConn.open) {
            newConn.close();
            return;
          }
          transferConn = newConn;
          setupTransferConnection(transferConn);
        }
      });
    });
    transferPeer.on("error", (err) => {
      if (err.type === "unavailable-id") {
        setTimeout(() => tryInitializeTransferPeer(attempt + 1), 200);
      } else {
        showNotification(`Bağlantı hatası: ${err.type}`, "error");
        resetTransferState();
      }
    });
  }

  function startDirectTransfer() {
    if (peer) peer.destroy();
    resetTransferState();
    transferState.role = "sender";
    openModal("transfer-sender-modal");
    transferPeerIdEl.textContent = "Kod Üretiliyor...";
    transferQrCodeEl.innerHTML =
      '<div class="w-48 h-48 flex items-center justify-center"><span class="material-symbols-rounded notranslate text-5xl animate-spin">progress_activity</span></div>';
    transferSenderStatusEl.textContent = "Güvenli bağlantı kuruluyor...";
    tryInitializeTransferPeer();
  }

  function connectForTransfer(shortCode) {
    if (peer) peer.destroy();
    resetTransferState();
    transferState.role = "receiver";
    if (transferPeer) transferPeer.destroy();
    transferPeer = new Peer();
    transferPeer.on("open", () => {
      transferConn = transferPeer.connect(shortCode, {
        metadata: { type: "data-transfer" },
        reliable: true,
      });
      setupTransferConnection(transferConn);
    });
    transferPeer.on("error", (err) => {
      showNotification(
        "Bağlantı kurulamadı. Kodun doğruluğunu veya internet bağlantınızı kontrol edin.",
        "error",
      );
      resetTransferState();
    });
  }

  function setupTransferConnection(connection) {
    connection.on("open", () => {
      if (transferState.role === "receiver") {
        showNotification("Bağlantı başarılı. Onay bekleniyor.", "success");
        confirmModalTitle.textContent = "Verileri Al";
        confirmModalMessage.innerHTML =
          "Mevcut tüm verileriniz (listeler, şarkılar) göndericinin verileriyle <b class='text-red-400'>değiştirilecektir</b>. Bu işlem geri alınamaz. Onaylıyor musunuz?";
        confirmAction = () => {
          transferConn.send({ type: "receiver_ready" });
        };
        openModal("confirm-modal");
      } else if (transferState.role === "sender") {
        transferSenderStatusEl.textContent = "Alıcı bağlandı, onay bekleniyor.";
      }
    });

    connection.on("data", async (data) => {
      switch (data.type) {
        case "receiver_ready":
          if (transferState.role === "sender") {
            if (transferConn && transferConn.open) {
              transferSenderStatusEl.textContent = "Aktarım başlatılıyor...";
              await sendAllDataStreaming();
            } else {
              showNotification(
                "Alıcı, aktarım başlamadan bağlantıyı kesti.",
                "error",
              );
              resetTransferState();
            }
          }
          break;
        case "transfer_info":
          transferState.isTransferring = true;
          transferState.totalChunks = data.songCount;
          transferProgressTitle.textContent = "Veriler Alınıyor...";
          transferProgressDetails.textContent = `${data.playlistCount} liste, ${data.songCount} şarkı alınıyor.`;
          openModal("transfer-progress-modal");

          const clearPlaylists = DBHelper.db
            .transaction("playlists", "readwrite")
            .objectStore("playlists")
            .clear();
          const clearSongs = DBHelper.db
            .transaction("userSongs", "readwrite")
            .objectStore("userSongs")
            .clear();
          const clearOfflineSongs = DBHelper.db
            .transaction("OfflineSongs", "readwrite")
            .objectStore("OfflineSongs")
            .clear();
          await Promise.all([
            new Promise((r) => (clearPlaylists.onsuccess = r)),
            new Promise((r) => (clearSongs.onsuccess = r)),
            new Promise((r) => (clearOfflineSongs.onsuccess = r)),
          ]);
          break;

        case "playlist_data":
          for (const playlist of data.playlists) {
            await DBHelper.put("playlists", playlist);
          }
          break;

        case "song_data":
          let songToSave = data.song;
          if (songToSave.fileBase64) {
            songToSave.fileBlob = await base64ToBlob(
              songToSave.fileBase64,
              songToSave.mimeType || "audio/mpeg",
            );
            delete songToSave.fileBase64;
          }
          await DBHelper.put("userSongs", songToSave);
          transferState.receivedChunks = data.index + 1;
          updateTransferProgressUI();
          if (transferConn && transferConn.open) {
            transferConn.send({
              type: "request_next_song",
              index: data.index + 1,
            });
          }
          break;

        case "request_next_song":
          if (transferState.role === "sender" && transferState.sendNextSong) {
            transferState.sendNextSong(data.index);
          }
          break;

        case "transfer_complete":
          transferProgressTitle.textContent = "İşlem Tamamlandı!";
          showNotification(
            "Veriler başarıyla alındı. Uygulama yeniden başlatılıyor...",
            "success",
          );
          setTimeout(() => window.location.reload(), 2500);
          break;
      }
    });

    connection.on("close", () => {
      if (transferState.isTransferring) {
        showNotification("Aktarım sırasında bağlantı koptu.", "error");
      } else if (transferState.role === "receiver") {
        showNotification("Gönderici ile bağlantı koptu.", "info");
      }
      resetTransferState();
    });
    connection.on("error", (err) => {
      console.error("Aktarım bağlantı hatası:", err);
      showNotification(`Bağlantı hatası: ${err.type}`, "error");
      resetTransferState();
    });
  }

  async function sendAllDataStreaming() {
    try {
      transferProgressTitle.textContent = "Veriler Gönderiliyor...";
      openModal("transfer-progress-modal");

      const allPlaylists = await DBHelper.getAll("playlists");
      const allUserSongs = await DBHelper.getAll("userSongs");

      if (!transferConn || !transferConn.open) return;

      transferConn.send({
        type: "transfer_info",
        playlistCount: allPlaylists.length,
        songCount: allUserSongs.length,
      });

      if (!transferConn || !transferConn.open) return;
      transferConn.send({
        type: "playlist_data",
        playlists: allPlaylists,
      });

      let sentSongs = 0;
      transferState.totalChunks = allUserSongs.length;

      const sendSongAtIndex = async (index) => {
        if (index >= allUserSongs.length) {
          if (transferConn && transferConn.open) {
            transferConn.send({ type: "transfer_complete" });
          }
          transferProgressTitle.textContent = "Aktarım Başarılı!";
          showNotification("Tüm veriler başarıyla gönderildi.", "success");
          setTimeout(resetTransferState, 3000);
          return;
        }

        const song = allUserSongs[index];
        let songForExport = { ...song };

        if (song.fileBlob) {
          const base64 = await blobToBase64(song.fileBlob);
          songForExport.fileBase64 = base64;
          delete songForExport.fileBlob;
        }

        if (transferConn && transferConn.open) {
          transferConn.send({
            type: "song_data",
            song: songForExport,
            index: index,
          });
        }

        sentSongs = index + 1;
        transferState.receivedChunks = sentSongs;
        updateTransferProgressUI();
      };

      transferState.sendNextSong = sendSongAtIndex;
      await sendSongAtIndex(0);
    } catch (error) {
      console.error("Veri paketleme hatası:", error);
      showNotification(
        "Veriler gönderim için hazırlanırken bir hata oluştu.",
        "error",
      );
      resetTransferState();
    }
  }

  function updateTransferProgressUI() {
    const progress =
      transferState.totalChunks > 0
        ? (transferState.receivedChunks / transferState.totalChunks) * 100
        : 0;
    transferProgressBar.style.width = `${progress}%`;
    transferProgressText.textContent = `${Math.round(progress)}%`;
  }

  function resetAddMusicModal() {
    addMusicTitleInput.value = "";
    addMusicArtistInput.value = "";
    addMusicFileInput.value = "";
    addMusicCoverPreview.src =
      "https://placehold.co/128x128/4a4f8a/ffffff?text=325x325";
    fileToAdd = null;
    coverDataUrlToAdd = null;
  }

  async function handleSingleFileAdd(e) {
    const file = e.target.files[0];
    if (!file) return;
    fileToAdd = file;
    addMusicTitleInput.value = file.name.replace(/\.[^/.]+$/, "");
    addMusicArtistInput.value = "Bilinmeyen Sanatçı";
    showNotification("Metadata okunuyor...", "info", 2000);
    window.jsmediatags.read(file, {
      onSuccess: (tag) => {
        if (tag.tags.title) addMusicTitleInput.value = tag.tags.title;
        if (tag.tags.artist) addMusicArtistInput.value = tag.tags.artist;
        if (tag.tags.picture) {
          const { data, format } = tag.tags.picture;
          const coverBlob = new Blob([new Uint8Array(data)], { type: format });
          const reader = new FileReader();
          reader.onload = (event) => {
            coverDataUrlToAdd = event.target.result;
            addMusicCoverPreview.src = coverDataUrlToAdd;
          };
          reader.readAsDataURL(coverBlob);
        }
      },
      onError: (error) => {
        console.log("Metadata okuma hatası:", error.type, error.info);
        showNotification("Dosyadan metadata okunamadı.", "info");
      },
    });
  }

  async function handlePermanentDelete(songId) {
    const song = masterSongLibrary[songId];
    if (!song) return;
    const songTitle = song.title;
    await DBHelper.delete("userSongs", songId);
    delete masterSongLibrary[songId];
    for (const playlist of playlists) {
      const songIndex = playlist.songs.indexOf(songId);
      if (songIndex > -1) {
        playlist.songs.splice(songIndex, 1);
        await DBHelper.put("playlists", playlist);
      }
    }
    let wasPlayingThisSong = false;
    const playbackListBeforeDelete = isShuffle
      ? shuffledPlaylist
      : currentPlaylist;
    if (playbackListBeforeDelete[currentTrackIndex] === songId) {
      wasPlayingThisSong = true;
    }
    const indexInCurrent = currentPlaylist.indexOf(songId);
    if (indexInCurrent > -1) {
      currentPlaylist.splice(indexInCurrent, 1);
    }
    if (isShuffle) {
      const indexInShuffled = shuffledPlaylist.indexOf(songId);
      if (indexInShuffled > -1) {
        shuffledPlaylist.splice(indexInShuffled, 1);
      }
    }
    const playbackListAfterDelete = isShuffle
      ? shuffledPlaylist
      : currentPlaylist;
    if (wasPlayingThisSong) {
      if (playbackListAfterDelete.length > 0) {
        const newIndex = Math.min(
          currentTrackIndex,
          playbackListAfterDelete.length - 1,
        );
        loadTrack(newIndex, "none", isPlaying);
      } else {
        pauseTrack();
        loadTrack(-1);
      }
    } else {
      const currentPlayingSongId = playbackListBeforeDelete[currentTrackIndex];
      currentTrackIndex = playbackListAfterDelete.indexOf(currentPlayingSongId);
    }
    showNotification(`${songTitle} kalıcı olarak silindi.`, "success");
    renderPlaylists();
    renderPlaybackOrder();
    updateMusicStoreView();
    updateCarouselUI();
  }

  function toggleRemoveMode() {
    isRemoveModeActive = !isRemoveModeActive;
    musicStoreListEl.classList.toggle("remove-mode-active", isRemoveModeActive);

    if (isRemoveModeActive) {
      removeFromLibraryBtn.innerHTML =
        '<span class="material-symbols-rounded notranslate">close</span> İptal';
      removeFromLibraryBtn.classList.replace("bg-red-600", "bg-gray-600");
      removeFromLibraryBtn.classList.replace(
        "hover:bg-red-700",
        "hover:bg-gray-700",
      );
    } else {
      removeFromLibraryBtn.innerHTML =
        '<span class="material-symbols-rounded notranslate">delete</span> Kaldır';
      removeFromLibraryBtn.classList.replace("bg-gray-600", "bg-red-600");
      removeFromLibraryBtn.classList.replace(
        "hover:bg-gray-700",
        "hover:bg-red-700",
      );
    }
  }

  async function handleAddMusicSubmit() {
    const title = addMusicTitleInput.value.trim();
    const artist = addMusicArtistInput.value.trim() || "Bilinmeyen Sanatçı";

    if (!title) {
      showNotification("Lütfen bir şarkı adı girin.", "error");
      return;
    }
    if (!fileToAdd) {
      showNotification("Lütfen bir ses dosyası seçin.", "error");
      return;
    }

    addMusicSubmitBtn.disabled = true;
    addMusicSubmitBtn.innerHTML =
      '<span class="material-symbols-rounded notranslate animate-spin mr-2">progress_activity</span> Ekleniyor...';

    const newSongId = `user_${Date.now()}`;
    let newSong;

    try {
      if (fileToAdd) {
        newSong = {
          id: newSongId,
          title: title,
          artist: artist,
          image: coverDataUrlToAdd,
          fileBlob: fileToAdd,
          url: null,
          isLocal: true,
          isBroken: false,
        };
      }

      await DBHelper.put("userSongs", newSong);
      masterSongLibrary[newSongId] = newSong;
      showNotification(`Şarkı kütüphaneye eklendi!`, "success");
      closeModal("add-music-modal");
      updateMusicStoreView();
    } catch (error) {
      console.error("Şarkı eklenirken hata:", error);
      showNotification("Şarkı eklenirken bir hata oluştu.", "error");
    } finally {
      addMusicSubmitBtn.disabled = false;
      addMusicSubmitBtn.innerHTML =
        '<span class="material-symbols-rounded notranslate mr-2">add</span> Ekle';
      if (isRemoveModeActive) toggleRemoveMode();
    }
  }

  async function checkForUpdates() {
    try {
      const savedVersion = localStorage.getItem("lunetune_version");
      if (savedVersion && savedVersion !== APP_VERSION && navigator.onLine) {
        localStorage.setItem("lunetune_version", APP_VERSION);
        console.log(
          "New version detected: " + APP_VERSION + ". Clearing app cache...",
        );

        if ("serviceWorker" in navigator) {
          try {
            const cacheNames = await caches.keys();
            for (let name of cacheNames) {
              if (name.includes("lunetune") && !name.includes("audio")) {
                await caches.delete(name);
              }
            }
          } catch (cacheErr) {
            console.warn(
              "Cache deletion failed during update, proceeding anyway:",
              cacheErr,
            );
          }
        }

        window.location.reload();
        return true;
      }
      localStorage.setItem("lunetune_version", APP_VERSION);
    } catch (e) {
      console.error("Update check failed:", e);
    }
    return false;
  }

  async function initializeApp() {
    if (await checkForUpdates()) return;
    const urlParams = new URLSearchParams(window.location.search);
    const transferId = urlParams.get("transfer");
    const songShareCode = urlParams.get("songshare");

    if (urlParams.has("lunetunemakerexport")) {
      window.history.replaceState({}, document.title, window.location.pathname);
      try {
        const exportData = await DBHelper.get("data", MAKER_KEY);
        if (exportData) {
          await importPlaylistData(exportData);
        } else {
          showNotification("Maker'dan aktarılacak veri bulunamadı.", "error");
        }
      } catch (error) {
        console.error("Maker verisi işlenirken hata:", error);
        showNotification(
          "Maker listesi aktarılırken bir hata oluştu.",
          "error",
        );
      } finally {
        await DBHelper.delete("data", MAKER_KEY);
      }
    }

    if (transferId) {
      async function processMakerExport() {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has("lunetunemakerexport")) {
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname,
          );
          const MAKER_KEY = "lunetuneMaker";
          try {
            const exportData = await DBHelper.get("data", MAKER_KEY);
            if (exportData) {
              await importPlaylistData(exportData);
            } else {
              showNotification(
                "Maker'dan aktarılacak veri bulunamadı.",
                "error",
              );
            }
          } catch (error) {
            console.error("Maker verisi işlenirken hata:", error);
            showNotification(
              "Maker listesi aktarılırken bir hata oluştu.",
              "error",
            );
          } finally {
            await DBHelper.delete("data", MAKER_KEY);
          }
        }
      }

      await processMakerExport();
      window.history.replaceState({}, document.title, window.location.pathname);
      connectForTransfer(transferId);
    } else if (songShareCode) {
      window.history.replaceState({}, document.title, window.location.pathname);
      connectForSongShare(songShareCode);
      showNotification(`Şarkı bekleniyor: ${songShareCode}`, "info", 60000);
    } else {
      initializePeerJS();
    }

    const isRightMenuLockEnabled =
      localStorage.getItem(menuRightStorageKey) === "true";
    menuRightToggle.checked = isRightMenuLockEnabled;
    const isLeftMenuLockEnabled =
      localStorage.getItem(menuLeftStorageKey) === "true";
    menuLeftToggle.checked = isLeftMenuLockEnabled;

    if (isRightMenuLockEnabled) {
      lockRightMenu = true;
    }
    if (isLeftMenuLockEnabled) {
      lockLeftMenu = true;
    }

    let loadedOfflineSongs = [];
    let loadedPlaylists = [];
    let loadedUserSongs = [];
    let settings = null;
    let savedState = null;
    let loadedUserSettings = null;

    try {
      await DBHelper.init();
      [
        loadedPlaylists,
        loadedUserSongs,
        loadedOfflineSongs,
        settings,
        savedState,
        loadedUserSettings,
      ] = await Promise.all([
        DBHelper.getAll("playlists"),
        DBHelper.getAll("userSongs"),
        DBHelper.getAll("OfflineSongs"),
        DBHelper.get("settings", "playerSettings"),
        DBHelper.get("settings", "playerState"),
        DBHelper.get("settings", "userSettings"),
      ]);
    } catch (error) {
      console.error("Veritabanı başlatılamadı:", error);
      showNotification("Veritabanı hatası. Veriler yüklenemedi.", "error");
    }
    loadedUserSongs.forEach((song) => {
      masterSongLibrary[song.id] = song;
    });
    loadedOfflineSongs.forEach((offlineData) => {
      offlineSongsMap[offlineData.id] = offlineData;
      const song = masterSongLibrary[offlineData.id];
      if (song && song.url) {
        offlineSongsMap[song.url] = offlineData;
      }
    });

    if ("caches" in window) {
      const cache = await caches.open("lunetune-audio-v1");
      loadedOfflineSongs.forEach((item) => {
        if (item.id.startsWith("http")) {
          cache.delete(item.id).catch(() => {});
        } else {
          const song = masterSongLibrary[item.id];
          if (song && song.url) cache.delete(song.url).catch(() => {});
        }
      });
    }
    await loadNcsLibrary();
    playlists = await repairAndValidatePlaylists(loadedPlaylists);

    if (settings) {
      loopState = settings.loopState !== undefined ? settings.loopState : 0;
      isShuffle = settings.shuffle !== undefined ? settings.shuffle : false;
      lastVolume = settings.lastVolume || 0.75;
      setVolume(settings.volume || 0.75);
      volumeSlider.value = (settings.volume || 0.75) * 100;
    } else {
      audioPlayer.volume = 0.75;
      volumeSlider.value = 75;
      await saveSettings();
    }
    updateVolumeSliderFill(volumeSlider);
    volumeSlider.addEventListener("change", saveSettings);

    shuffleBtn.classList.toggle("text-violet-400", isShuffle);
    loopBtn.classList.remove("text-violet-400", "loop-btn-one");
    if (loopState === 1) loopBtn.classList.add("text-violet-400");
    else if (loopState === 2)
      loopBtn.classList.add("text-violet-400", "loop-btn-one");

    if (loadedUserSettings) {
      userSettings = { ...userSettings, ...loadedUserSettings };
    }
    usernameInput.value =
      userSettings.username === "Kullanıcı" ? "" : userSettings.username;
    updateGreeting();

    if (playlists.length === 0) {
      const favoritesPlaylist = {
        id: 1,
        name: "Favoriler",
        songs: [],
        deletable: false,
        coverUrl:
          "https://lunetune.xmeroriginals.com/resources/favoriteslogo.jpg",
      };
      await DBHelper.put("playlists", favoritesPlaylist);
      playlists.push(favoritesPlaylist);
    }

    if (savedState) {
      restorePlayerState(savedState);
    } else {
      updateCarouselUI();
    }

    renderPlaybackOrder();
    initializeSortable();
    renderPlaylists();
    renderRadioStations();
    setupMediaSessionActions();
    updateOnlineStatus();
    setInterval(savePlayerState, 5000);
  }

  playPauseBtn.addEventListener("click", togglePlayPause);
  nextBtn.addEventListener("click", nextTrack);
  prevBtn.addEventListener("click", prevTrack);
  seekForwardBtn.addEventListener("click", () => seek(10));
  seekBackwardBtn.addEventListener("click", () => seek(-10));
  audioPlayer.addEventListener("timeupdate", () => {
    updateProgress();
    if (Math.abs(audioPlayer.currentTime % 1) < 0.1) {
      updateMediaSessionPositionState();
    }
  });
  audioPlayer.addEventListener("ended", handleSongEnd);
  audioPlayer.addEventListener("playing", () => {
    isChangingTrack = false;
    updatePlayPauseUI(true);
    updateMediaSessionPositionState();
  });
  audioPlayer.addEventListener("pause", () => {
    updateMediaSessionPositionState();
    if (
      isPlaying &&
      !isChangingTrack &&
      !audioPlayer.ended &&
      audioPlayer.currentTime < audioPlayer.duration - 0.5
    ) {
      updatePlayPauseUI(false);
      silentPlayer.pause();
    }
  });
  audioPlayer.addEventListener("seeked", updateMediaSessionPositionState);
  audioPlayer.addEventListener("ratechange", updateMediaSessionPositionState);
  audioPlayer.addEventListener("error", (e) => {
    activateSurvivalMode();
    handleAudioError(e);
  });
  audioPlayer.addEventListener("waiting", () => {
    activateSurvivalMode();
    keepAliveVideo.play().catch(() => {});
  });
  audioPlayer.addEventListener("stalled", () => {
    activateSurvivalMode();
  });
  audioPlayer.addEventListener("canplay", () => {
    deactivateSurvivalMode();
    clearTimeout(trackLoadTimeout);
  });
  audioPlayer.addEventListener("loadedmetadata", () => {
    durationDisplay.textContent = isLiveMode
      ? "Live"
      : formatTime(audioPlayer.duration);
    updateMediaSessionPositionState();
  });

  openBattleModalBtn.addEventListener("click", () => {
    moreActionsMenu.classList.remove("is-open");
    startBattleSession();
  });
  battleRoundsInput.addEventListener("input", () => {
    battleRoundsDisplay.textContent = battleRoundsInput.value;
    updateVolumeSliderFill(battleRoundsInput);
  });
  createBattleBtn.addEventListener("click", handleCreateBattle);
  copyBattleLinkBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(battleShareLink.value);
    showNotification("Bağlantı kopyalandı!", "success");
  });
  battleSelectionSearch.addEventListener("input", () => {
    renderBattleSelectionList(battleSelectionSearch.value);
  });
  battleConfirmSelectionBtn.addEventListener("click", finishBattleSelection);

  battleStarsContainer.addEventListener("click", (e) => {
    if (hasMyRated) return;
    const starBtn = e.target.closest(".star-btn");
    if (!starBtn) return;
    const rating = parseInt(starBtn.dataset.star, 10);
    currentBattleRating = rating;
    const starIcons = battleStarsContainer.querySelectorAll(
      ".material-symbols-rounded",
    );
    starIcons.forEach((icon, idx) => {
      if (idx < rating) {
        icon.classList.remove("text-white/20");
        icon.classList.add("text-yellow-400");
      } else {
        icon.classList.remove("text-yellow-400");
        icon.classList.add("text-white/20");
      }
    });
    battleSubmitRatingBtn.disabled = false;
  });

  battleSubmitRatingBtn.addEventListener("click", () => {
    if (currentBattleRating > 0 && !hasMyRated) {
      submitBattleRating(currentBattleRating);
    }
  });

  progressContainer.addEventListener("click", (e) => {
    if (isBattleMode) {
      const rect = progressContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percent = x / rect.width;
      const targetTime = percent * audioPlayer.duration;
      const offset = targetTime - audioPlayer.currentTime;

      voteBattleSeek(Math.round(offset));
      return;
    }
    setProgress(e);
  });
  loopBtn.addEventListener("click", updateLoopState);
  volumeSlider.addEventListener("input", (e) =>
    setVolume(e.target.value / 100),
  );
  volumeIconBtn.addEventListener("click", toggleMute);
  goToPlaylistMakerBtn.addEventListener("click", () =>
    window.open("https://lunetune.xmeroriginals.com/maker/", "_blank"),
  );
  goToLunelightsBtn.addEventListener("click", () =>
    window.open(
      "https://lunetune.xmeroriginals.com/firstlunelights/",
      "_blank",
    ),
  );
  if (goToLunelightsBtnSmall) {
    goToLunelightsBtnSmall.addEventListener("click", (e) =>
      window.open(
        "https://lunetune.xmeroriginals.com/firstlunelights/",
        "_blank",
      ),
    );
  }
  liveRadioBtn.addEventListener("click", () => {
    searchRadioInput.value = "";
    renderRadioStations();
    openModal("radio-select-modal");
  });
  offlineIndicatorBtn.addEventListener("click", () =>
    showNotification("İnternet bağlantınız yok.", "error"),
  );
  window.addEventListener("online", updateOnlineStatus);
  window.addEventListener("offline", updateOnlineStatus);

  openPlaylistBtn.addEventListener("click", () => {
    queuePanel.classList.add(queuePanelClosedClass);
    isQueuePanelLockedOpen = false;
    playlistPanel.classList.toggle(panelClosedClass);
    isPanelLockedOpen = !playlistPanel.classList.contains(panelClosedClass);
  });
  closePlaylistBtn.addEventListener("click", () => {
    playlistPanel.classList.add(panelClosedClass);
    isPanelLockedOpen = false;
  });
  openMusicStoreBtn.addEventListener("click", () => {
    openModal("music-store-modal");
    updateMusicStoreView();
    playlistPanel.classList.add(panelClosedClass);
    isPanelLockedOpen = false;
  });
  openSettingsModalBtn.addEventListener("click", () => {
    openModal("settings-modal");
    updateCacheSizeDisplay();
    playlistPanel.classList.add(panelClosedClass);
    isPanelLockedOpen = false;
  });

  if (openSettingsModalBtnSmall) {
    openSettingsModalBtnSmall.addEventListener("click", () => {
      openModal("settings-modal");
      updateCacheSizeDisplay();
      playlistPanel.classList.add(panelClosedClass);
      isPanelLockedOpen = false;
    });
  }

  clearCacheBtn.addEventListener("click", () => {
    confirmModalTitle.textContent = "Önbelleği Temizle";
    confirmModalMessage.innerHTML =
      "Tüm önbelleğe alınmış şarkılar ve uygulama verileri silinecektir. Emin misiniz?";
    confirmModalBtn.onclick = clearAllCaches;
    openModal("confirm-modal");
  });

  closeQueueBtn.addEventListener("click", () => {
    queuePanel.classList.add(queuePanelClosedClass);
    isQueuePanelLockedOpen = false;
  });

  const playlistInput = document.getElementById("import-playlist-file");
  if (playlistInput) {
    playlistInput.multiple = true;
    playlistInput.addEventListener("change", handleImportPlaylist);
  }

  document
    .getElementById("context-open-queue")
    .addEventListener("click", () => {
      playlistPanel.classList.add(panelClosedClass);
      isPanelLockedOpen = false;
      queuePanel.classList.toggle(queuePanelClosedClass);
      isQueuePanelLockedOpen = !queuePanel.classList.contains(
        queuePanelClosedClass,
      );
      songContextMenu.classList.remove("is-open");
    });

  musicSearchInput.addEventListener("input", () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      updateMusicStoreView();
    }, 300);
  });
  searchRadioInput.addEventListener("input", () => {
    const searchTerm = searchRadioInput.value.toLowerCase().trim();
    const filteredStations = radioStations.filter((station) =>
      station.name.toLowerCase().includes(searchTerm),
    );
    renderRadioStations(filteredStations);
  });

  openSleepTimerModalBtn.addEventListener("click", () => {
    openModal("sleep-timer-modal");
    moreActionsMenu.classList.remove("is-open");
  });
  document
    .getElementById("sleep-timer-modal")
    .addEventListener("click", (e) => {
      const timerBtn = e.target.closest(".timer-btn");
      if (timerBtn) {
        setSleepTimer(parseInt(timerBtn.dataset.minutes, 10));
      }
    });
  document
    .getElementById("cancel-sleep-timer-btn")
    .addEventListener("click", () => setSleepTimer(0));

  reactionContainer.addEventListener("click", (e) => {
    const btn = e.target.closest(".reaction-btn");
    if (btn) {
      const emoji = btn.dataset.emoji;
      if (isHost && conn && conn.open) {
        showReaction(emoji);
        broadcastMessage({ t: "reaction_display", emoji: emoji });
      } else if (isClient && conn && conn.open) {
        conn.send({ t: "reaction", emoji: emoji });
      }
    }
  });

  contextShareSongBtn.addEventListener("click", () => {
    startSongShare();
    songContextMenu.classList.remove("is-open");
  });

  receiveSongShareBtn.addEventListener("click", () => {
    closeModal("settings-modal");
    songShareReceiveInput.value = "";
    openModal("song-share-receiver-modal");
  });

  songShareConnectBtn.addEventListener("click", () => {
    const code = songShareReceiveInput.value.trim();
    if (code.length === 6 && !isNaN(code)) {
      connectForSongShare(code);
    } else {
      showNotification("Lütfen 6 haneli geçerli bir kod girin.", "error");
    }
  });

  document
    .querySelector('[data-close-modal="song-share-sender-modal"]')
    .addEventListener("click", () => {
      closeModal("song-share-sender-modal");
      resetSongShareState();
    });

  document
    .querySelector('[data-close-modal="song-share-receiver-modal"]')
    .addEventListener("click", () => {
      closeModal("song-share-receiver-modal");
      resetSongShareState();
    });

  createPlaylistBtn.addEventListener("click", handleCreatePlaylist);
  confirmModalBtn.addEventListener("click", async () => {
    if (!confirmAction) return;
    const action = confirmAction;
    closeModal("confirm-modal");
    confirmAction = null;
    await action();
  });
  editSongSubmitBtn.addEventListener("click", handleUpdateSong);

  modalOverlay.addEventListener("click", () => {
    if (activeModals.length > 0) {
      const topModalId = activeModals[activeModals.length - 1];
      if (!nonClosableModals.includes(topModalId)) {
        closeModal(topModalId);
      }
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && activeModals.length > 0) {
      const topModalId = activeModals[activeModals.length - 1];
      if (!nonClosableModals.includes(topModalId)) {
        closeModal(topModalId);
      }
    }
    if (
      e.code === "Space" &&
      activeModals.length === 0 &&
      document.activeElement.tagName !== "INPUT" &&
      document.activeElement.tagName !== "TEXTAREA" &&
      document.activeElement.tagName !== "BUTTON"
    ) {
      e.preventDefault();
      togglePlayPause();
    }
  });

  queueListEl.addEventListener("pointerdown", (e) => {
    if (e.target.closest(".drag-handle")) {
      e.stopPropagation();
    }
  });

  newPlaylistCoverInput.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        newPlaylistCoverDataUrl = await processImage(file);
        newPlaylistCoverPreview.src = newPlaylistCoverDataUrl;
      } catch (error) {
        showNotification("Kapak resmi işlenemedi.", "error");
      }
    }
  });

  renamePlaylistCoverInput.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        renamePlaylistCoverDataUrl = await processImage(file);
        renamePlaylistCoverPreview.src = renamePlaylistCoverDataUrl;
      } catch (error) {
        showNotification("Kapak resmi işlenemedi.", "error");
      }
    }
  });
  if (playlistContextDownloadBtn) {
    playlistContextDownloadBtn.addEventListener("click", () => {
      openModal("download-playlist-modal");
      playlistContextMenu.classList.remove("is-open");
    });
  }
  if (playlistContextRepairBtn) {
    playlistContextRepairBtn.addEventListener("click", () => {
      openModal("repair-playlist-modal");
      playlistContextMenu.classList.remove("is-open");
    });
  }
  if (startDownloadPlaylistBtn) {
    startDownloadPlaylistBtn.addEventListener(
      "click",
      handleDownloadPlaylistToLocal,
    );
  }
  if (startRepairPlaylistBtn) {
    startRepairPlaylistBtn.addEventListener("click", handleRepairPlaylist);
  }

  document
    .getElementById("open-settings-modal-btn-small")
    .addEventListener("click", () => {
      updateDataUsageUI();
      openModal("settings-modal");
    });
  document
    .getElementById("open-settings-modal-btn")
    .addEventListener("click", () => {
      updateDataUsageUI();
      openModal("settings-modal");
    });
  const handleMoreActions = (btn, e) => {
    e.stopPropagation();
    if (moreActionsMenu.classList.contains("is-open")) {
      hideAllContextMenus();
      return;
    }
    const rect = btn.getBoundingClientRect();
    showContextMenu(moreActionsMenu, rect.left, rect.top);
  };
  moreActionsBtn.addEventListener("click", (e) =>
    handleMoreActions(moreActionsBtn, e),
  );
  if (moreActionsBtnSmall) {
    moreActionsBtnSmall.addEventListener("click", (e) =>
      handleMoreActions(moreActionsBtnSmall, e),
    );
  }
  moreActionsMenu.addEventListener("click", (e) => e.stopPropagation());
  document
    .getElementById("more-open-share-modal-btn")
    .addEventListener("click", () => {
      startShareSession();
      hideAllContextMenus();
    });
  document
    .getElementById("more-open-music-store-btn")
    .addEventListener("click", () => {
      openModal("music-store-modal");
      hideAllContextMenus();
    });
  document
    .getElementById("more-open-new-playlist-modal-btn")
    .addEventListener("click", () => {
      openModal("new-playlist-modal");
      hideAllContextMenus();
    });
  playlistContextExportBtn.addEventListener("click", () => {
    handleExportPlaylist();
    playlistContextMenu.classList.remove("is-open");
  });

  importPlaylistFile.addEventListener("change", handleImportPlaylist);

  playlistContextDirectTransferBtn.addEventListener("click", async () => {
    if (!activePlaylistContextId) return;

    const playlistToTransfer = playlists.find(
      (p) => p.id === activePlaylistContextId,
    );
    if (!playlistToTransfer) {
      showNotification("Aktarılacak liste bulunamadı.", "error");
      return;
    }

    hideAllContextMenus();
    showNotification(
      `${playlistToTransfer.name} Maker'a aktarılıyor...`,
      "info",
    );

    try {
      const songsForExport = await Promise.all(
        playlistToTransfer.songs.map(async (songId) => {
          const song = masterSongLibrary[songId];
          if (!song) return null;

          let songExportData = {
            title: song.title,
            artist: song.artist,
            image: song.image || null,
            url: song.isLocal ? null : song.url,
            mimeType: null,
            fileBase64: null,
          };

          if (song.fileBlob && !song.url) {
            songExportData.fileBase64 = await blobToBase64(song.fileBlob);
            songExportData.mimeType = song.fileBlob.type;
          } else {
            const offlineData =
              offlineSongsMap[songId] ||
              (song.url && offlineSongsMap[song.url]);
            if (offlineData) {
              songExportData.fileBase64 = await blobToBase64(offlineData.blob);
              songExportData.mimeType = offlineData.blob.type;
            }
          }

          return songExportData;
        }),
      );

      const validSongs = songsForExport.filter((s) => s !== null);
      const exportData = {
        playlist: {
          name: playlistToTransfer.name,
          coverUrl: playlistToTransfer.coverUrl,
        },
        songs: validSongs,
      };

      const MAKER_KEY = "lunetuneMaker";
      await DBHelper.put("data", MAKER_KEY, exportData);
      window.open("./maker.html?lunetunemakerimport=true", "_blank");
    } catch (error) {
      console.error("Maker'a aktarım hatası:", error);
      showNotification("Liste Maker'a aktarılırken bir hata oluştu.", "error");
    } finally {
      activePlaylistContextId = null;
    }
  });

  openAddMusicModalBtn.addEventListener("click", () => {
    resetAddMusicModal();
    openModal("add-music-modal");
  });

  addMusicFileInput.addEventListener("change", handleSingleFileAdd);
  addMusicSubmitBtn.addEventListener("click", handleAddMusicSubmit);

  document.addEventListener("click", hideAllContextMenus);
  document.addEventListener("click", async (e) => {
    const closeBtn = e.target.closest("[data-close-modal]");
    if (closeBtn) {
      closeModal(closeBtn.dataset.closeModal);
      return;
    }
    if (e.target.closest(".like-btn")) {
      await handleLikeButtonClick();
      return;
    }
    const previewBtn = e.target.closest(".preview-song-btn");
    if (previewBtn) {
      const previewId = previewBtn.dataset.previewId;
      let previewUrl = previewBtn.dataset.previewUrl;
      if (!previewUrl || previewUrl === "") {
        const songId = previewId.replace(
          `${
            previewBtn.closest("li").parentElement.id.includes("music-store")
              ? activeMusicStoreTab
              : "lunetune"
          }_`,
          "",
        );
        const song = masterSongLibrary[songId];
        if (song && song.fileBlob) {
          if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
          currentObjectUrl = URL.createObjectURL(song.fileBlob);
          previewUrl = currentObjectUrl;
        } else {
          const offlineData =
            offlineSongsMap[songId] ||
            (song && song.url && offlineSongsMap[song.url]);
          if (offlineData) {
            if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
            currentObjectUrl = URL.createObjectURL(offlineData.blob);
            previewUrl = currentObjectUrl;
          }
        }
      }
      if (!previewUrl) {
        showNotification("Bu şarkı için önizleme kaynağı bulunamadı.", "error");
        return;
      }
      if (currentPreviewId === previewId) {
        await stopPreview();
      } else {
        if (currentPreviewId) await stopPreview();
        await startPreview(previewUrl, previewId, previewBtn);
      }
      return;
    }
    const brokenSongBtn = e.target.closest(".broken-song-btn");
    if (brokenSongBtn) {
      showNotification("Bu ses desteklenmiyor", "error");
      return;
    }
    const playlistItem = e.target.closest(".playlist-item");
    if (playlistItem) {
      const playlistId = parseInt(playlistItem.dataset.playlistId);
      const selectedPlaylist = playlists.find((p) => p.id === playlistId);
      if (selectedPlaylist) {
        if (selectedPlaylist.songs.length > 0) {
          currentPlaylist = [...selectedPlaylist.songs];
          currentPlaylistId = playlistId;
          renderPlaybackOrder();
          if (isShuffle) {
            shuffleCurrentPlaylist(false);
          }
          loadTrack(0, "none", true);
          playlistPanel.classList.add(panelClosedClass);
          isPanelLockedOpen = false;
        } else {
          showNotification(`${selectedPlaylist.name} listesi boş.`, "info");
        }
      }
      return;
    }
    const radioItem = e.target.closest(".radio-station-item");
    if (radioItem) {
      const stationName = radioItem.dataset.stationName;
      const streamUrl = radioItem.dataset.streamUrl;
      playLiveRadio(stationName, streamUrl);
      closeModal("radio-select-modal");
      return;
    }
    const addButton = e.target.closest(".add-to-playlist-btn");
    if (addButton) {
      if (addButton.dataset.songId) {
        songToAddId = addButton.dataset.songId;
      } else if (addButton.dataset.ncsSong) {
        const ncsSongData = JSON.parse(
          addButton.dataset.ncsSong.replace(/&quot;/g, '"'),
        );
        if (!masterSongLibrary[ncsSongData.id]) {
          masterSongLibrary[ncsSongData.id] = ncsSongData;
        }
        songToAddId = ncsSongData.id;
      } else if (addButton.dataset.jamendoSong) {
        const jamendoSongData = JSON.parse(
          addButton.dataset.jamendoSong.replace(/&quot;/g, '"'),
        );
        const newSongId = `jamendo_${jamendoSongData.id}`;
        if (!masterSongLibrary[newSongId]) {
          const newSong = {
            id: newSongId,
            title: jamendoSongData.title,
            artist: jamendoSongData.artist || "Bilinmeyen Sanatçı",
            image: jamendoSongData.image,
            url: jamendoSongData.url,
            isLocal: false,
            isBroken: false,
          };
          try {
            await DBHelper.put("userSongs", newSong);
            masterSongLibrary[newSongId] = newSong;
          } catch (error) {
            showNotification(
              "Şarkı kütüphaneye eklenirken hata oluştu.",
              "error",
            );
            return;
          }
        }
        songToAddId = newSongId;
      }
      renderPlaylistSelection();
      openModal("playlist-select-modal");
      return;
    }
    const playlistSelectItem = e.target.closest(".playlist-select-item");
    if (playlistSelectItem) {
      const playlistId = parseInt(playlistSelectItem.dataset.playlistId);
      const playlist = playlists.find((p) => p.id === playlistId);
      if (playlist && songToAddId) {
        if (!playlist.songs.includes(songToAddId)) {
          playlist.songs.push(songToAddId);
          await DBHelper.put("playlists", playlist);
          if (currentPlaylistId === playlistId) {
            currentPlaylist = [...playlist.songs];
            if (isShuffle) shuffleCurrentPlaylist(false);
            updateCarouselUI("none");
          }
        }
        const song = masterSongLibrary[songToAddId];
        showNotification(
          `${song.title} şarkısı ${playlist.name} listesine eklendi.`,
          "success",
        );
      }
      closeModal("playlist-select-modal");
      songToAddId = null;
    }
  });

  lunetuneTabBtn.addEventListener("click", () => switchStoreTab("lunetune"));
  ncsTabBtn.addEventListener("click", () => switchStoreTab("ncs"));
  jamendoTabBtn.addEventListener("click", () => switchStoreTab("jamendo"));

  carouselContainer.addEventListener("contextmenu", (e) => {
    if (e.target.closest('.song-card[data-type="current"]')) {
      e.preventDefault();
      if (currentTrackIndex < 0 || isLiveMode) return;
      const playbackList = isShuffle ? shuffledPlaylist : currentPlaylist;
      const song = masterSongLibrary[playbackList[currentTrackIndex]];
      if (!song) return;
      contextRemoveBtn.style.display = currentPlaylistId ? "flex" : "none";
      const isUserSong =
        song.id.startsWith("user_") || song.id.startsWith("jamendo_");
      contextEditBtn.style.display = isUserSong ? "flex" : "none";
      contextDeleteBtn.style.display = isUserSong ? "flex" : "none";
      const isIndirili =
        offlineSongsMap[song.id] || (song.url && offlineSongsMap[song.url]);
      const isDownloadable =
        (song.isLocal && song.fileBlob) || song.url || isIndirili;
      contextDownloadBtn.style.display = isDownloadable ? "flex" : "none";
      showContextMenu(songContextMenu, e.clientX, e.clientY);
      const isShareable =
        (song.isLocal && song.fileBlob) || song.url || isIndirili;
      contextShareSongBtn.style.display = isShareable ? "flex" : "none";
      showContextMenu(songContextMenu, e.clientX, e.clientY);
    }
  });
  carouselContainer.addEventListener("touchstart", (e) => {
    if (e.target.closest('.song-card[data-type="current"]')) {
      clearTimeout(longPressTimer);
      longPressTimer = setTimeout(() => {
        if (currentTrackIndex < 0 || isLiveMode) return;
        const playbackList = isShuffle ? shuffledPlaylist : currentPlaylist;
        const song = masterSongLibrary[playbackList[currentTrackIndex]];
        if (!song) return;
        contextRemoveBtn.style.display = currentPlaylistId ? "flex" : "none";
        const isUserSong =
          song.id.startsWith("user_") || song.id.startsWith("jamendo_");
        contextEditBtn.style.display = isUserSong ? "flex" : "none";
        contextDeleteBtn.style.display = isUserSong ? "flex" : "none";
        const isIndirili =
          offlineSongsMap[song.id] || (song.url && offlineSongsMap[song.url]);
        const isShareable =
          (song.isLocal && song.fileBlob) || song.url || isIndirili;
        contextShareSongBtn.style.display = isShareable ? "flex" : "none";
        const touch = e.touches[0];
        showContextMenu(songContextMenu, touch.clientX, touch.clientY);
      }, longPressDuration);
    }
  });

  let playlistLongPressTimer;
  playlistListEl.addEventListener("contextmenu", (e) => {
    const playlistItem = e.target.closest(".playlist-item");
    if (playlistItem) {
      e.preventDefault();
      const playlistId = parseInt(playlistItem.dataset.playlistId);
      const playlist = playlists.find((p) => p.id === playlistId);
      if (playlist && playlist.deletable === true) {
        activePlaylistContextId = playlistId;
        const remoteSongsToDownload = playlist.songs.filter((sid) => {
          const s = masterSongLibrary[sid];
          return (
            s &&
            !s.isLocal &&
            !offlineSongsMap[sid] &&
            s.url &&
            !offlineSongsMap[s.url]
          );
        });
        const hasOfflineSongs = playlist.songs.some((sid) => {
          const s = masterSongLibrary[sid];
          return (
            s && (offlineSongsMap[sid] || (s.url && offlineSongsMap[s.url]))
          );
        });

        playlistContextDownloadBtn.style.display =
          remoteSongsToDownload.length > 0 ? "flex" : "none";
        playlistContextRepairBtn.style.display = hasOfflineSongs
          ? "flex"
          : "none";

        showContextMenu(playlistContextMenu, e.clientX, e.clientY);
      }
    }
  });
  playlistListEl.addEventListener("touchstart", (e) => {
    const playlistItem = e.target.closest(".playlist-item");
    if (playlistItem) {
      clearTimeout(playlistLongPressTimer);
      playlistLongPressTimer = setTimeout(() => {
        const playlistId = parseInt(playlistItem.dataset.playlistId);
        const playlist = playlists.find((p) => p.id === playlistId);
        if (playlist && playlist.deletable === true) {
          activePlaylistContextId = playlistId;
          const remoteSongsToDownload = playlist.songs.filter((sid) => {
            const s = masterSongLibrary[sid];
            return (
              s &&
              !s.isLocal &&
              !offlineSongsMap[sid] &&
              s.url &&
              !offlineSongsMap[s.url]
            );
          });
          const hasOfflineSongs = playlist.songs.some((sid) => {
            const s = masterSongLibrary[sid];
            return (
              s && (offlineSongsMap[sid] || (s.url && offlineSongsMap[s.url]))
            );
          });

          playlistContextDownloadBtn.style.display =
            remoteSongsToDownload.length > 0 ? "flex" : "none";
          playlistContextRepairBtn.style.display = hasOfflineSongs
            ? "flex"
            : "none";

          const touch = e.touches[0];
          showContextMenu(playlistContextMenu, touch.clientX, touch.clientY);
        }
      }, longPressDuration);
    }
  });
  const clearLongPress = () => clearTimeout(longPressTimer);
  carouselContainer.addEventListener("touchend", clearLongPress);
  carouselContainer.addEventListener("touchmove", clearLongPress);
  const clearPlaylistLongPress = () => clearTimeout(playlistLongPressTimer);
  playlistListEl.addEventListener("touchend", clearPlaylistLongPress);
  playlistListEl.addEventListener("touchmove", clearPlaylistLongPress);

  contextDownloadBtn.addEventListener("click", () => {
    handleDownloadSong();
    songContextMenu.classList.remove("is-open");
  });
  contextRemoveBtn.addEventListener("click", () => {
    handleRemoveFromPlaylist();
    songContextMenu.classList.remove("is-open");
  });
  contextEditBtn.addEventListener("click", () => {
    const playbackList = isShuffle ? shuffledPlaylist : currentPlaylist;
    const songId = playbackList[currentTrackIndex];
    const song = masterSongLibrary[songId];
    if (song) {
      editSongModal.dataset.editingSongId = songId;
      editSongTitleInput.value = song.title;
      editSongArtistInput.value = song.artist || "";
      editSongImageUrlInput.value = song.image || "";
      editSongImageFileInput.value = "";
      openModal("edit-song-modal");
    }
    songContextMenu.classList.remove("is-open");
  });
  contextDeleteBtn.addEventListener("click", () => {
    const playbackList = isShuffle ? shuffledPlaylist : currentPlaylist;
    const song = masterSongLibrary[playbackList[currentTrackIndex]];
    if (song) {
      confirmModalTitle.textContent = "Şarkıyı Sil";
      confirmModalMessage.innerHTML = `<span class="font-bold text-white">${song.title}</span> adlı şarkıyı kalıcı olarak silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`;
      confirmAction = () => handleDeleteSong();
      openModal("confirm-modal");
    }
    songContextMenu.classList.remove("is-open");
  });
  playlistContextDeleteBtn.addEventListener("click", () => {
    if (!activePlaylistContextId) return;
    const playlistIdToDelete = activePlaylistContextId;
    const playlist = playlists.find((p) => p.id === playlistIdToDelete);
    if (playlist) {
      confirmModalTitle.textContent = "Listeyi Sil";
      confirmModalMessage.innerHTML = `<span class="font-bold text-white">${playlist.name}</span> adlı çalma listesini silmek istediğinizden emin misiniz?`;
      confirmAction = () => handleDeletePlaylist(playlistIdToDelete);
      openModal("confirm-modal");
    }
    activePlaylistContextId = null;
    playlistContextMenu.classList.remove("is-open");
  });
  playlistContextRenameBtn.addEventListener("click", () => {
    if (!activePlaylistContextId) return;
    const playlist = playlists.find((p) => p.id === activePlaylistContextId);
    if (playlist) {
      renamePlaylistInput.value = playlist.name;
      renamePlaylistCoverPreview.src = playlist.coverUrl;
      renamePlaylistCoverDataUrl = null;
      openModal("rename-playlist-modal");
    }
    playlistContextMenu.classList.remove("is-open");
  });
  renamePlaylistBtn.addEventListener("click", async () => {
    if (!activePlaylistContextId) return;
    const newName = renamePlaylistInput.value.trim();
    const playlist = playlists.find((p) => p.id === activePlaylistContextId);
    if (playlist && (newName || renamePlaylistCoverDataUrl)) {
      if (newName && newName !== playlist.name) playlist.name = newName;
      if (renamePlaylistCoverDataUrl)
        playlist.coverUrl = renamePlaylistCoverDataUrl;
      try {
        await DBHelper.put("playlists", playlist);
        renderPlaylists();
        showNotification("Liste bilgileri güncellendi.", "success");
      } catch (error) {
        showNotification("Liste güncellenirken bir hata oluştu.", "error");
      }
    }
    closeModal("rename-playlist-modal");
    activePlaylistContextId = null;
  });
  renamePlaylistInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") renamePlaylistBtn.click();
  });

  saveUsernameBtn.addEventListener("click", async () => {
    const newUsername = usernameInput.value.trim() || "Kullanıcı";
    userSettings.username = newUsername;
    await DBHelper.put("settings", { id: "userSettings", ...userSettings });
    updateGreeting();
    showNotification("Kullanıcı adı kaydedildi.", "success");
  });

  const versionCheckBtn = document.getElementById("version-check-btn");
  if (versionCheckBtn) {
    versionCheckBtn.addEventListener("click", () => {
      showNotification(`V${APP_VERSION}`, "info");
    });
  }

  const forceClearCacheBtn = document.getElementById("force-clear-cache-btn");
  if (forceClearCacheBtn) {
    forceClearCacheBtn.addEventListener("click", () => {
      confirmModalTitle.textContent = "Zorla Önbellek Temizleme";
      confirmModalMessage.innerHTML =
        '<div class="text-center"><p>Tüm uygulama önbelleği temizlenecek ve sayfa yenilenecek. <b>İndirilmiş şarkılarınız silinmez.</b></p><p class="text-white/50 text-sm mt-2">Bu işlem yeni güncellemeleri zorlamak içindir.</p></div>';
      confirmAction = async () => {
        showNotification("Önbellek zorla temizleniyor...", "warning");
        try {
          if ("serviceWorker" in navigator) {
            const registrations =
              await navigator.serviceWorker.getRegistrations();
            for (let registration of registrations) {
              await registration.unregister();
            }
          }
          const cacheNames = await caches.keys();
          for (let name of cacheNames) {
            if (!name.includes("audio")) {
              await caches.delete(name);
            }
          }
          showNotification(
            "Önbellek temizlendi, sayfa yenileniyor...",
            "success",
          );
          setTimeout(() => {
            window.location.reload(true);
          }, 1000);
        } catch (err) {
          console.error("Force clear cache failed:", err);
          showNotification("Hata oluştu, lütfen manuel temizleyin.", "error");
        }
      };
      openModal("confirm-modal");
    });
  }

  exportDataBtn.addEventListener("click", async () => {
    showNotification("Dışa aktarma hazırlanıyor, lütfen bekleyin...", "info");
    try {
      const allPlaylists = await DBHelper.getAll("playlists");
      const allUserSongs = await DBHelper.getAll("userSongs");
      const userSongsForExport = await Promise.all(
        allUserSongs.map(async (song) => {
          if (song.fileBlob) {
            const base64 = await blobToBase64(song.fileBlob);
            const songForExport = { ...song, fileBase64: base64 };
            delete songForExport.fileBlob;
            return songForExport;
          }
          return song;
        }),
      );
      const backupData = {
        playlists: allPlaylists,
        userSongs: userSongsForExport,
      };
      const blob = new Blob([JSON.stringify(backupData)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `lunetune_backup_${
        new Date().toISOString().split("T")[0]
      }.luneplaylist`;
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      showNotification("Veriler başarıyla dışa aktarıldı.", "success");
    } catch (error) {
      showNotification("Veriler dışa aktarılırken hata oluştu.", "error");
    }
  });
  importDataFile.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const readSlice = (start, end) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsText(file.slice(start, end));
      });
    };

    const detectFormat = async () => {
      const headerSize = Math.min(100 * 1024, file.size);
      const text = await readSlice(0, headerSize);

      let type = "unknown";
      let listStartIndex = -1;
      let metadata = null;

      const songsMatch = text.match(/"songs"\s*:\s*\[/);
      if (songsMatch && text.includes('"playlist"')) {
        type = "maker";
        listStartIndex = songsMatch.index + songsMatch[0].length;
        try {
          const playlistStr = text.substring(
            text.indexOf("{"),
            text.indexOf('"songs"'),
          );
          const cleanStr = playlistStr.trim().replace(/,$/, "") + "}";
          const partial = JSON.parse(cleanStr);
          metadata = partial.playlist;
        } catch (e) {
          console.warn("Metadata scan failed, using fallback regex");
          const nameMatch = text.match(/"name"\s*:\s*"([^"]+)"/);
          metadata = { name: nameMatch ? nameMatch[1] : "Bilinmeyen Liste" };
        }
      }

      const userSongsMatch = text.match(/"userSongs"\s*:\s*\[/);
      if (userSongsMatch) {
        type = "backup";
        listStartIndex = userSongsMatch.index + userSongsMatch[0].length;
        try {
          const splitPoint = text.indexOf('"userSongs"');
          let jsonCandidate = text.substring(0, splitPoint).trim();
          if (jsonCandidate.endsWith(","))
            jsonCandidate = jsonCandidate.slice(0, -1);
          jsonCandidate += "}";
          const playlistsMatch = text.match(
            /"playlists"\s*:\s*\[(.*?)\]\s*,\s*"userSongs"/s,
          );
          if (playlistsMatch) {
            metadata = { playlists: JSON.parse(`[${playlistsMatch[1]}]`) };
          }
        } catch (e) {
          console.warn("Backup metadata scan warning:", e);
        }
      }

      return { type, listStartIndex, metadata };
    };

    try {
      showNotification("Dosya analiz ediliyor...", "info");
      const info = await detectFormat();

      if (info.type === "unknown") {
        throw new Error("Tanınmayan veya desteklenmeyen dosya formatı.");
      }

      let processImport = null;

      if (info.type === "maker") {
        confirmModalTitle.textContent = "Çalma Listesi İçe Aktar";
        confirmModalMessage.innerHTML = `<b class='text-violet-400'>${
          info.metadata?.name || "Çalma Listesi"
        }</b> ve içerikler kütüphanenize eklenecek.`;

        processImport = async () => {
          openModal("transfer-progress-modal");
          const transferProgressBar = document.getElementById(
            "transfer-progress-bar",
          );
          const transferProgressText = document.getElementById(
            "transfer-progress-text",
          );
          const transferProgressDetails = document.getElementById(
            "transfer-progress-details",
          );
          transferProgressDetails.textContent = "Veriler analiz ediliyor...";
          const newPlaylistSongs = [];
          const playlistId = Date.now();

          await streamParseArray(
            file,
            info.listStartIndex,
            async (songData) => {
              const newId = `user_${Date.now()}_${Math.random()
                .toString(36)
                .substr(2, 9)}`;
              let songForDB = {
                id: newId,
                title: songData.title || "Bilinmeyen Şarkı",
                artist: songData.artist || "Bilinmeyen Sanatçı",
                isLocal: true,
                url: songData.url || null,
                image: songData.image || null,
                dateAdded: Date.now(),
              };

              if (songData.fileBase64) {
                const blob = base64ToBlob(
                  songData.fileBase64,
                  songData.mimeType || "audio/mp3",
                );
                songForDB.fileBlob = blob;
                songForDB.isLocal = true;
              } else if (songData.url) {
                songForDB.isLocal = false;
              }

              await DBHelper.put("userSongs", songForDB);
              newPlaylistSongs.push(newId);
              masterSongLibrary[newId] = songForDB;
            },
            (processed, total) => {
              const percent = Math.min(
                100,
                Math.round((processed / total) * 100),
              );
              transferProgressBar.style.width = `${percent}%`;
              transferProgressText.textContent = `${percent}%`;
              transferProgressDetails.textContent = `${newPlaylistSongs.length} şarkı işlendi...`;
            },
          );

          const newPlaylist = {
            id: playlistId,
            name: info.metadata?.name || "İçe Aktarılan Liste",
            coverUrl: info.metadata?.coverUrl || null,
            songs: newPlaylistSongs,
            deletable: true,
            dateCreated: Date.now(),
          };
          await DBHelper.put("playlists", newPlaylist);
          playlists.push(newPlaylist);

          closeModal("transfer-progress-modal");
          renderPlaylists();
          updateMusicStoreView();
          showNotification(
            "Liste başarıyla eklendi! Sayfa yenileniyor...",
            "success",
          );
          setTimeout(() => window.location.reload(), 2000);
        };
      } else if (info.type === "backup") {
        confirmModalTitle.textContent = "Tam Yedekleme Yükle";
        confirmModalMessage.innerHTML =
          "Tüm mevcut veriler silinecek ve yedekleme yüklenecektir. Onaylıyor musunuz?";

        processImport = async () => {
          openModal("transfer-progress-modal");
          const transferProgressBar = document.getElementById(
            "transfer-progress-bar",
          );
          const transferProgressText = document.getElementById(
            "transfer-progress-text",
          );
          const transferProgressDetails = document.getElementById(
            "transfer-progress-details",
          );

          transferProgressDetails.textContent = "Veritabanı temizleniyor...";
          transferProgressBar.style.width = "0%";
          transferProgressText.textContent = "0%";

          await DBHelper.clear("playlists");
          await DBHelper.clear("userSongs");

          if (info.metadata && info.metadata.playlists) {
            for (const pl of info.metadata.playlists) {
              await DBHelper.put("playlists", pl);
            }
          }

          let processedCount = 0;
          transferProgressDetails.textContent = "Şarkılar geri yükleniyor...";

          await streamParseArray(
            file,
            info.listStartIndex,
            async (song) => {
              if (song.fileBase64) {
                const blob = base64ToBlob(
                  song.fileBase64,
                  song.fileBlob?.type || song.mimeType,
                );
                const songForDB = { ...song, fileBlob: blob };
                delete songForDB.fileBase64;
                delete songForDB.mimeType;
                await DBHelper.put("userSongs", songForDB);
              } else {
                await DBHelper.put("userSongs", song);
              }
              processedCount++;
            },
            (processed, total) => {
              const percent = Math.min(
                100,
                Math.round((processed / total) * 100),
              );
              transferProgressBar.style.width = `${percent}%`;
              transferProgressText.textContent = `${percent}%`;
              transferProgressDetails.textContent = `${processedCount} veri geri yüklendi...`;
            },
          );

          closeModal("transfer-progress-modal");
          showNotification(
            "Yedekleme başarıyla yüklendi. Yeniden başlatılıyor...",
            "success",
          );
          setTimeout(() => window.location.reload(), 2000);
        };
      }

      confirmAction = processImport;
      openModal("confirm-modal");
    } catch (err) {
      console.error("Import Error:", err);
      showNotification("Dosya okunamadı: " + err.message, "error");
    }

    event.target.value = "";
  });

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

  queueListEl.addEventListener("click", (e) => {
    const item = e.target.closest(".song-info-clickable");
    if (item) {
      const parentLi = item.closest(".queue-item");
      if (parentLi) {
        const indexToPlay = parseInt(parentLi.dataset.index, 10);
        if (!isNaN(indexToPlay) && indexToPlay !== currentTrackIndex) {
          loadTrack(indexToPlay, "fade", isPlaying);
        }
      }
    }
  });

  shuffleBtn.addEventListener("click", () => {
    if (isAnimatingShuffle || currentPlaylist.length < 1) return;
    isAnimatingShuffle = true;
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle("text-violet-400", isShuffle);
    saveSettings();
    if (isShuffle) {
      shuffleCurrentPlaylist();
    } else {
      unshufflePlaylist();
    }
    renderPlaybackOrder();
    setTimeout(() => {
      isAnimatingShuffle = false;
    }, 400);
  });

  copyShareLinkBtn.addEventListener("click", () => {
    navigator.clipboard
      .writeText(shareLinkInput.value)
      .then(() => showNotification("Bağlantı kopyalandı.", "success"))
      .catch(() => showNotification("Kopyalama başarısız oldu.", "error"));
  });

  menuRightToggle.addEventListener("change", () => {
    lockRightMenu = menuRightToggle.checked;
    localStorage.setItem(menuRightStorageKey, lockRightMenu);
  });

  menuLeftToggle.addEventListener("change", () => {
    lockLeftMenu = menuLeftToggle.checked;
    localStorage.setItem(menuLeftStorageKey, lockLeftMenu);
  });

  startDirectTransferBtn.addEventListener("click", startDirectTransfer);
  receiveDirectTransferBtn.addEventListener("click", () => {
    transferReceiveInput.value = "";
    openModal("transfer-receiver-modal");
  });
  transferConnectBtn.addEventListener("click", () => {
    const userInput = transferReceiveInput.value.trim().replace(/-/g, "");
    if (userInput.length === 9 && !isNaN(userInput)) {
      const fullCode = userInput;
      closeModal("transfer-receiver-modal");
      connectForTransfer(fullCode);
    } else {
      showNotification("Lütfen 9 haneli geçerli bir kod girin.", "error");
    }
  });
  transferReceiveInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length > 6) {
      value = `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6, 9)}`;
    } else if (value.length > 3) {
      value = `${value.slice(0, 3)}-${value.slice(3)}`;
    }
    e.target.value = value;
  });
  document
    .querySelector('[data-close-modal="transfer-sender-modal"]')
    .addEventListener("click", resetTransferState);
  document
    .querySelector('[data-close-modal="transfer-receiver-modal"]')
    .addEventListener("click", resetTransferState);

  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) {
    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchmove", onTouchMove, { passive: false });
    document.addEventListener("touchend", onTouchEnd);
  } else {
    document.addEventListener("mousemove", onMouseMove);
  }

  async function getBlobHash(blob) {
    const buffer = await blob.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }

  async function getDataUrlHash(dataUrl) {
    const base64 = dataUrl.split(",")[1];
    if (!base64) return null;
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const hashBuffer = await crypto.subtle.digest("SHA-256", bytes.buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }

  async function startOptimizationProcess() {
    closeModal("settings-modal");
    showNotification("Kütüphane taranıyor, lütfen bekleyin...", "info", 5000);
    const allUserSongs = await DBHelper.getAll("userSongs");
    const allPlaylists = await DBHelper.getAll("playlists");
    const songHashes = new Map();
    for (const song of allUserSongs) {
      if (song.fileBlob) {
        const hash = await getBlobHash(song.fileBlob);
        if (!songHashes.has(hash)) {
          songHashes.set(hash, []);
        }
        songHashes.get(hash).push(song.id);
      }
    }
    const duplicateSongGroups = Array.from(songHashes.values()).filter(
      (ids) => ids.length > 1,
    );
    const totalDuplicateSongs = duplicateSongGroups.reduce(
      (acc, group) => acc + group.length - 1,
      0,
    );

    const imageHashes = new Map();
    const locations = [];
    allUserSongs.forEach((song) => {
      if (song.image && song.image.startsWith("data:image")) {
        locations.push({ type: "song", id: song.id, url: song.image });
      }
    });
    allPlaylists.forEach((playlist) => {
      if (playlist.coverUrl && playlist.coverUrl.startsWith("data:image")) {
        locations.push({
          type: "playlist",
          id: playlist.id,
          url: playlist.coverUrl,
        });
      }
    });

    for (const loc of locations) {
      const hash = await getDataUrlHash(loc.url);
      if (!hash) continue;
      if (!imageHashes.has(hash)) {
        imageHashes.set(hash, { masterUrl: loc.url, locations: [] });
      }
      imageHashes.get(hash).locations.push(loc);
    }
    const duplicateImageGroups = Array.from(imageHashes.values()).filter(
      (data) => data.locations.length > 1,
    );
    const totalDuplicateImages = duplicateImageGroups.reduce(
      (acc, group) => acc + group.locations.length - 1,
      0,
    );
    if (totalDuplicateSongs === 0 && totalDuplicateImages === 0) {
      showNotification(
        "Harika! Kütüphaneniz zaten optimize edilmiş.",
        "success",
      );
      return;
    }
    confirmModalTitle.textContent = "Optimizasyon Onayı";
    confirmModalMessage.innerHTML = `
        <p class="text-center">${totalDuplicateSongs} adet kopya şarkı ve ${totalDuplicateImages} adet kopya resim bulundu.</p>
        <p class="mt-2 text-white/80 text-center">Kopyalar silinip tek dosya korunacak, Çalma listeleri ve görseller kalan tek dosya üzerine aktarılacak.</p>
        <p class="mt-2 font-bold text-center">Temizleme işlemi yapılsın mı?</p>
    `;
    confirmAction = () =>
      runCleanup(duplicateSongGroups, duplicateImageGroups, allPlaylists);
    openModal("confirm-modal");
  }
  async function runCleanup(
    duplicateSongGroups,
    duplicateImageGroups,
    allPlaylists,
  ) {
    showNotification("Optimizasyon işlemi başladı...", "info", 5000);
    let cleanedSongs = 0;
    let cleanedImages = 0;
    for (const group of duplicateSongGroups) {
      const masterId = group[0];
      const duplicateIds = group.slice(1);
      for (const playlist of allPlaylists) {
        let updated = false;
        playlist.songs = playlist.songs.map((songId) => {
          if (duplicateIds.includes(songId)) {
            updated = true;
            return masterId;
          }
          return songId;
        });
        if (updated) {
          playlist.songs = [...new Set(playlist.songs)];
          await DBHelper.put("playlists", playlist);
        }
      }
      for (const idToDelete of duplicateIds) {
        await DBHelper.delete("userSongs", idToDelete);
        delete masterSongLibrary[idToDelete];
        cleanedSongs++;
      }
    }
    for (const group of duplicateImageGroups) {
      const masterUrl = group.masterUrl;
      for (const loc of group.locations) {
        if (loc.url !== masterUrl) {
          if (loc.type === "song") {
            const song = await DBHelper.get("userSongs", loc.id);
            if (song) {
              song.image = masterUrl;
              await DBHelper.put("userSongs", song);
              if (masterSongLibrary[loc.id])
                masterSongLibrary[loc.id].image = masterUrl;
            }
          } else if (loc.type === "playlist") {
            const playlist = await DBHelper.get("playlists", loc.id);
            if (playlist) {
              playlist.coverUrl = masterUrl;
              await DBHelper.put("playlists", playlist);
            }
          }
          cleanedImages++;
        }
      }
    }

    showNotification(`Şarkı ve Resim kopyaları temizlendi.`, "success");

    setTimeout(() => {
      showNotification(
        "Değişikliklerin uygulanması için sayfa yenileniyor...",
        "info",
      );
      setTimeout(() => window.location.reload(), 2000);
    }, 1500);
  }

  async function startClearUnusedSongsProcess() {
    closeModal("settings-modal");
    showNotification(
      "Kütüphane analiz ediliyor, lütfen bekleyin...",
      "info",
      2000,
    );

    try {
      const allPlaylists = await DBHelper.getAll("playlists");
      const allUserSongs = await DBHelper.getAll("userSongs");
      const usedSongIds = new Set();
      allPlaylists.forEach((playlist) => {
        if (playlist.songs && Array.isArray(playlist.songs)) {
          playlist.songs.forEach((songId) => usedSongIds.add(songId));
        }
      });

      const unusedSongs = allUserSongs.filter(
        (song) => !usedSongIds.has(song.id),
      );

      if (unusedSongs.length === 0) {
        showNotification(
          "Kütüphaneniz zaten temiz. Kullanılmayan şarkı bulunamadı.",
          "success",
        );
        return;
      }
      confirmModalTitle.textContent = "Kütüphane Temizliği";
      confirmModalMessage.innerHTML = `
        <div class="flex flex-col items-center gap-4 text-center">
            <div class="w-16 h-16 rounded-full bg-yellow-400/20 flex items-center justify-center">
                <span class="material-symbols-rounded notranslate text-3xl text-yellow-400">cleaning_services</span>
            </div>
            <div>
                <p class="text-lg">Toplam <span class="font-bold text-white text-xl">${unusedSongs.length}</span> adet şarkı tespit edildi.</p>
                <p class="text-white/60 text-sm mt-2">Bu şarkılar kütüphanenizde yüklü ancak hiçbir çalma listesinde yer almıyor.</p>
            </div>
            <div class="bg-red-500/10 p-3 rounded-lg border border-red-500/20 w-full">
                <p class="text-red-300 text-sm font-medium">Bu şarkıları kalıcı olarak silmek istiyor musunuz?</p>
            </div>
        </div>
      `;
      confirmAction = async () => {
        showNotification(`${unusedSongs.length} şarkı siliniyor...`, "info");
        let deletedCount = 0;
        for (const song of unusedSongs) {
          await DBHelper.delete("userSongs", song.id);
          if (masterSongLibrary[song.id]) {
            delete masterSongLibrary[song.id];
          }
          deletedCount++;
        }
        showNotification(
          `${deletedCount} kullanılmayan şarkı başarıyla kütüphaneden temizlendi.`,
          "success",
        );
        setTimeout(() => window.location.reload(), 2000);
      };
      openModal("confirm-modal");
    } catch (error) {
      console.error("Kullanılmayan şarkılar temizlenirken hata:", error);
      showNotification("Temizleme işlemi başarısız oldu.", "error");
    }
  }

  async function startDuplicateTitleCleanupProcess() {
    closeModal("settings-modal");
    showNotification("Kütüphane kopyalar için taranıyor...", "info", 3000);

    try {
      const allUserSongs = await DBHelper.getAll("userSongs");
      const sameTitleGroups = new Map();

      allUserSongs.forEach((song) => {
        const title = (song.title || "").trim().toLowerCase();
        if (!title) return;
        if (!sameTitleGroups.has(title)) sameTitleGroups.set(title, []);
        sameTitleGroups.get(title).push(song);
      });

      const duplicates = [];
      for (const [title, group] of sameTitleGroups) {
        if (group.length < 2) continue;

        const processed = new Set();
        for (let i = 0; i < group.length; i++) {
          if (processed.has(group[i].id)) continue;

          for (let j = i + 1; j < group.length; j++) {
            if (processed.has(group[j].id)) continue;

            const s1 = group[i];
            const s2 = group[j];

            let isMatch = false;

            if (s1.isLocal && s2.isLocal && s1.fileBlob && s2.fileBlob) {
              if (s1.fileBlob.size === s2.fileBlob.size) {
                const head1 = await s1.fileBlob.slice(0, 20480).arrayBuffer();
                const head2 = await s2.fileBlob.slice(0, 20480).arrayBuffer();
                const view1 = new Uint8Array(head1);
                const view2 = new Uint8Array(head2);

                isMatch =
                  view1.length === view2.length &&
                  view1.every((val, idx) => val === view2[idx]);
              }
            } else if (!s1.isLocal && !s2.isLocal) {
              isMatch = s1.url === s2.url;
            }

            if (isMatch) {
              duplicates.push({ master: s1, duplicate: s2 });
              processed.add(s2.id);
            }
          }
        }
      }

      if (duplicates.length === 0) {
        showNotification(
          "Aynı isme ve veriye sahip kopya şarkı bulunamadı.",
          "success",
        );
        return;
      }

      confirmModalTitle.textContent = "Kopya Temizliği Onayı";
      confirmModalMessage.innerHTML = `
        <div class="flex flex-col items-center gap-4 text-center">
            <div class="w-16 h-16 rounded-full bg-red-400/20 flex items-center justify-center">
                <span class="material-symbols-rounded notranslate text-3xl text-red-400">content_copy</span>
            </div>
            <div>
                <p class="text-lg">Toplam <span class="font-bold text-white text-xl">${duplicates.length}</span> adet kesin kopya şarkı tespit edildi.</p>
                <p class="text-white/60 text-sm mt-2">Bu şarkılar kütüphanenizden silinecek ve listelerde asıllarıyla yer değişterecek.</p>
            </div>
            <div class="bg-red-500/10 p-3 rounded-lg border border-red-500/20 w-full">
                <p class="text-red-300 text-sm font-medium">Bu kopyaları şimdi temizlemek istiyor musunuz?</p>
            </div>
        </div>
      `;

      confirmAction = async () => {
        showNotification("Kopya şarkılar temizleniyor...", "info");
        const allPlaylists = await DBHelper.getAll("playlists");

        for (const item of duplicates) {
          const masterId = item.master.id;
          const duplicateId = item.duplicate.id;

          for (const playlist of allPlaylists) {
            if (playlist.songs && playlist.songs.includes(duplicateId)) {
              playlist.songs = playlist.songs.map((id) =>
                id === duplicateId ? masterId : id,
              );
              playlist.songs = [...new Set(playlist.songs)];
              await DBHelper.put("playlists", playlist);
            }
          }

          await DBHelper.delete("userSongs", duplicateId);
          if (masterSongLibrary[duplicateId])
            delete masterSongLibrary[duplicateId];
        }

        showNotification(
          `${duplicates.length} kopya şarkı başarıyla temizlendi.`,
          "success",
        );
        setTimeout(() => window.location.reload(), 2000);
      };
      openModal("confirm-modal");
    } catch (e) {
      console.error("Kopya temizleme sırasında hata:", e);
      showNotification("İşlem sırasında bir hata oluştu.", "error");
    }
  }

  function resetSongShareState() {
    if (songShareConn) {
      songShareConn.close();
      songShareConn = null;
    }
    if (songSharePeer) {
      songSharePeer.destroy();
      songSharePeer = null;
    }
    songToShareId = null;
  }

  function generateShareCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  function startSongShare() {
    if (currentTrackIndex < 0 || isLiveMode) return;
    const playbackList = isShuffle ? shuffledPlaylist : currentPlaylist;
    const songId = playbackList[currentTrackIndex];
    const song = masterSongLibrary[songId];

    if (!song || (!song.isLocal && !song.url)) {
      showNotification("Bu şarkı paylaşılamaz (kaynak bulunamadı).", "error");
      return;
    }
    resetSongShareState();
    songToShareId = songId;
    openModal("song-share-sender-modal");
    songShareCodeEl.textContent = "...";
    songShareQrCodeEl.innerHTML =
      '<div class="w-48 h-48 flex items-center justify-center"><span class="material-symbols-rounded notranslate text-5xl animate-spin">progress_activity</span></div>';
    songShareSenderStatusEl.textContent = "Güvenli bağlantı kuruluyor...";

    function tryInitializeSongSharePeer(attempt = 1) {
      if (attempt > 10) {
        showNotification(
          "Paylaşım kodu oluşturulamadı, tekrar deneyin.",
          "error",
        );
        resetSongShareState();
        return;
      }
      const shareCode = generateShareCode();
      if (songSharePeer) songSharePeer.destroy();

      songSharePeer = new Peer(`lunetune-share-${shareCode}`);

      songSharePeer.on("open", (id) => {
        songShareCodeEl.textContent = shareCode;
        songShareSenderStatusEl.textContent = "Bağlantı bekleniyor...";
        songShareQrCodeEl.innerHTML = "";
        new QRCode(songShareQrCodeEl, {
          text: `${window.location.origin}${window.location.pathname}?songshare=${shareCode}`,
          width: 192,
          height: 192,
        });

        songSharePeer.on("connection", (newConn) => {
          if (newConn.metadata && newConn.metadata.role === "receiver") {
            if (songShareConn && songShareConn.open) {
              newConn.close();
              return;
            }
            songShareConn = newConn;
            setupSongShareConnection(songShareConn, "sender");
          } else {
            newConn.close();
          }
        });
      });

      songSharePeer.on("error", (err) => {
        if (err.type === "unavailable-id") {
          setTimeout(() => tryInitializeSongSharePeer(attempt + 1), 100);
        } else {
          showNotification(`Bağlantı hatası: ${err.type}`, "error");
          resetSongShareState();
        }
      });
    }

    tryInitializeSongSharePeer();
  }

  function connectForSongShare(shareCode) {
    resetSongShareState();
    songSharePeer = new Peer();

    songSharePeer.on("open", () => {
      showNotification("Bağlanılıyor...", "info");
      songShareConn = songSharePeer.connect(`lunetune-share-${shareCode}`, {
        reliable: true,
        metadata: { role: "receiver" },
      });
      setupSongShareConnection(songShareConn);
    });

    songSharePeer.on("error", (err) => {
      showNotification(
        "Bağlanılamadı, kodu veya internet bağlantısını kontrol edin.",
        "error",
      );
      resetSongShareState();
    });
  }

  function setupSongShareConnection(connection, role = "receiver") {
    connection.on("open", () => {
      if (role === "sender") {
        songShareSenderStatusEl.textContent =
          "Alıcı bağlandı, onay bekleniyor.";
      } else {
        showNotification("Bağlantı başarılı, şarkı bekleniyor...", "success");
        closeModal("song-share-receiver-modal");
        connection.send({ type: "receiver_ready" });
      }
    });

    connection.on("data", async (data) => {
      if (role === "sender") {
        if (data.type === "receiver_ready") {
          songShareSenderStatusEl.textContent = "Şarkı hazırlanıyor...";
          try {
            const song = masterSongLibrary[songToShareId];
            let songBlob;
            if (song.isLocal && song.fileBlob) {
              songBlob = song.fileBlob;
            } else {
              songShareSenderStatusEl.textContent = "Şarkı indiriliyor...";
              const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(
                song.url,
              )}`;
              const response = await fetch(proxyUrl);
              if (!response.ok) {
                throw new Error(`Şarkı indirilemedi: ${response.statusText}`);
              }
              songBlob = await response.blob();
            }
            const songDataForTransfer = {
              title: song.title,
              artist: song.artist,
              image: song.image,
              mimeType: songBlob.type || "audio/mpeg",
              fileBase64: await blobToBase64(songBlob),
            };
            songShareSenderStatusEl.textContent = "Şarkı gönderiliyor...";
            connection.send({
              type: "song_data",
              payload: songDataForTransfer,
            });
          } catch (e) {
            console.error("Şarkı hazırlanırken veya gönderilirken hata:", e);
            showNotification("Şarkı gönderim için hazırlanamadı.", "error");
            connection.send({ type: "transfer_error", message: e.message });
            resetSongShareState();
          }
        } else if (data.type === "transfer_ack") {
          songShareSenderStatusEl.textContent = "Başarıyla gönderildi!";
          showNotification("Şarkı başarıyla paylaşıldı.", "success");
          setTimeout(() => {
            resetSongShareState();
            closeModal("song-share-sender-modal");
          }, 2000);
        }
      } else {
        switch (data.type) {
          case "song_data":
            showNotification("Şarkı alınıyor, lütfen bekleyin...", "info");
            try {
              const receivedSong = data.payload;
              const blob = await base64ToBlob(
                receivedSong.fileBase64,
                receivedSong.mimeType,
              );

              const newSongId = `user_${Date.now()}`;
              const newSong = {
                id: newSongId,
                title: receivedSong.title,
                artist: receivedSong.artist,
                image: receivedSong.image,
                fileBlob: blob,
                url: null,
                isLocal: true,
                isBroken: false,
              };

              await DBHelper.put("userSongs", newSong);
              masterSongLibrary[newSongId] = newSong;

              if (songShareChoosePlaylistCheck?.checked) {
                songToAddId = newSongId;
                renderPlaylistSelection();
                openModal("playlist-select-modal");
                showNotification(
                  `Şarkı başarıyla alındı. Şimdi bir listeye seçin.`,
                  "success",
                );
              } else {
                try {
                  const favoritesPlaylist = playlists.find((p) => p.id === 1);
                  if (favoritesPlaylist) {
                    if (!favoritesPlaylist.songs.includes(newSongId)) {
                      favoritesPlaylist.songs.push(newSongId);
                      await DBHelper.put("playlists", favoritesPlaylist);
                    }
                    showNotification(
                      `Şarkı başarıyla alındı ve Favoriler'e eklendi.`,
                      "success",
                    );
                  } else {
                    showNotification(
                      `Şarkı alındı ancak Favoriler listesi bulunamadığı için eklenemedi.`,
                      "info",
                    );
                  }
                } catch (dbError) {
                  console.error(
                    "Favoriler listesine eklenirken veritabanı hatası:",
                  );
                  showNotification(
                    `Şarkı alındı ancak listeye eklenirken bir sorun oluştu.`,
                    "info",
                  );
                }
              }

              connection.send({ type: "transfer_ack" });
            } catch (e) {
              console.error("Alınan şarkı işlenirken hata:", e);
              showNotification("Alınan şarkı işlenemedi veya bozuk.", "error");
            } finally {
              resetSongShareState();
            }
            break;

          case "transfer_error":
            showNotification(
              `Gönderici bir hatayla karşılaştı: ${
                data.message || "Bilinmeyen Hata"
              }`,
              "error",
            );
            resetSongShareState();
            break;
        }
      }
    });

    connection.on("close", () => {
      if (
        role === "sender" &&
        !songShareSenderStatusEl.textContent.includes("Başarıyla")
      ) {
        showNotification("Paylaşım bağlantısı koptu.", "info");
      }
      resetSongShareState();
      closeModal("song-share-sender-modal");
      closeModal("song-share-receiver-modal");
    });
    connection.on("error", (err) => {
      console.error("Paylaşım hatası:", err);
      showNotification("Paylaşım sırasında bir hata oluştu.", "error");
      resetSongShareState();
      closeModal("song-share-sender-modal");
      closeModal("song-share-receiver-modal");
    });
  }

  addMusicCoverFileInput.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        coverDataUrlToAdd = await processImage(file, 325, 325);
        addMusicCoverPreview.src = coverDataUrlToAdd;
      } catch (error) {
        showNotification("Kapak resmi işlenemedi.", "error");
        coverDataUrlToAdd = null;
      }
    }
  });

  removeFromLibraryBtn.addEventListener("click", toggleRemoveMode);
  musicStoreListEl.addEventListener("click", (e) => {
    const deleteBtn = e.target.closest(".delete-song-btn");
    if (deleteBtn && isRemoveModeActive) {
      const songId = deleteBtn.dataset.songId;
      const song = masterSongLibrary[songId];
      if (song) {
        confirmModalTitle.textContent = "Şarkıyı Kalıcı Sil";
        confirmModalMessage.innerHTML = `<span class="font-bold text-white">${song.title}</span> adlı şarkıyı kütüphaneden ve tüm listelerden kalıcı olarak silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`;
        confirmAction = () => handlePermanentDelete(songId);
        openModal("confirm-modal");
      }
    }
  });
  const style = document.createElement("style");
  style.innerHTML = `
    .remove-mode-active .action-buttons { display: none !important; }
    .remove-mode-active .remove-button-wrapper { display: flex !important; }
`;
  document.head.appendChild(style);

  optimizeLibraryBtn.addEventListener("click", startOptimizationProcess);

  if (clearLibraryBtn) {
    clearLibraryBtn.addEventListener("click", startClearUnusedSongsProcess);
  }
  if (duplicateCleanupBtn) {
    duplicateCleanupBtn.addEventListener(
      "click",
      startDuplicateTitleCleanupProcess,
    );
  }

  initializeApp();
  console.log(
    "Lunetune Team Note | During the beta phase of your app, it will be loaded via the TailwindCSS CDN throughout this process.",
  );
});

let totalDataUsed = parseInt(localStorage.getItem("totalDataUsed") || "0");
let totalDataSaved = parseInt(localStorage.getItem("totalDataSaved") || "0");

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 MB";
  const dm = decimals < 0 ? 0 : decimals;
  const mb = bytes / (1024 * 1024);
  if (mb < 1000) return mb.toFixed(dm) + " MB";
  return (mb / 1024).toFixed(dm) + " GB";
}

function updateDataUsageUI() {
  const usedEl = document.getElementById("data-used-display");
  const savedEl = document.getElementById("data-saved-display");
  if (usedEl) usedEl.textContent = formatBytes(totalDataUsed);
  if (savedEl) savedEl.textContent = formatBytes(totalDataSaved);
}

function checkDailyReset() {
  const lastReset = localStorage.getItem("dataUsageLastReset");
  const today = new Date().toDateString();
  if (lastReset !== today) {
    totalDataUsed = 0;
    totalDataSaved = 0;
    localStorage.setItem("totalDataUsed", "0");
    localStorage.setItem("totalDataSaved", "0");
    localStorage.setItem("dataUsageLastReset", today);
    updateDataUsageUI();
  }
}

checkDailyReset();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.addEventListener("message", (event) => {
    if (event.data && event.data.type === "DATA_USAGE_UPDATE") {
      checkDailyReset();
      const bytes = event.data.bytes;
      if (event.data.usageType === "used") {
        totalDataUsed += bytes;
        localStorage.setItem("totalDataUsed", totalDataUsed.toString());
      } else if (event.data.usageType === "saved") {
        totalDataSaved += bytes;
        localStorage.setItem("totalDataSaved", totalDataSaved.toString());
      }

      const settingsModal = document.getElementById("settings-modal");
      if (settingsModal && settingsModal.classList.contains("is-active")) {
        updateDataUsageUI();
      }
    }
  });
}
