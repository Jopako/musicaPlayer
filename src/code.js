const { ipcRenderer } = require("electron");

document.addEventListener("DOMContentLoaded", async function () {
  const songsFallback = [
    {
      title: "BLEEDING",
      author: "Giveon",
      audio: "Music/BLEEDING.mp3",
      image: "Photo/giveon.webp",
    },
    {
      title: "Crew",
      author: "GoldLink",
      audio: "Music/crew.mp3",
      image: "Photo/crew.webp",
    },
    {
      title: "REPLICA",
      author: "Giveon (Feat Sasha Keable)",
      audio: "Music/replica.mp3",
      image: "Photo/replica.webp",
    },
    {
      title: "Heaven Can Wait",
      author: "Michael Jackson",
      audio: "Music/Michael_Jackson.mp3",
      image: "Photo/michaelHeaven.webp",
    },
  ];

  let songs = [...songsFallback];
  let currentIndex = 0;
  let capaAtualBase64 = null;
  let caminhoAtual = null;
  let movimentacaoHabilitada = true;

  const audio = document.getElementById("audio");
  const stopStart = document.getElementById("stopStart");
  const pausePlayImg = document.getElementById("pause");
  const restart = document.getElementById("restart");
  const next = document.getElementById("next");
  const prev = document.getElementById("prev");
  const titleEl = document.getElementById("title");
  const authorEl = document.getElementById("author");
  const imageEl = document.getElementById("image");
  const durationSlider = document.getElementById("duration-slider");
  const currentTimeSpan = document.getElementById("current-time");
  const totalDurationSpan = document.getElementById("total-duration");
  const volumeSlider = document.getElementById("volume-slider");
  const card = document.querySelector(".main");

  const menuBtn = document.getElementById("menuBtn");
  const drawer = document.getElementById("drawer");
  const drawerOverlay = document.getElementById("drawerOverlay");
  const drawerClose = document.getElementById("drawerClose");
  const btnAbrirModal = document.getElementById("btnAbrirModal");
  const btnVerBiblioteca = document.getElementById("btnVerBiblioteca");
  const btnDesabilitarMov = document.getElementById("btnDesabilitarMov");

  const modalOverlay = document.getElementById("modalOverlay");
  const modalClose = document.getElementById("modalClose");
  const btnCancelar = document.getElementById("btnCancelar");
  const btnSalvar = document.getElementById("btnSalvar");
  const importArea = document.getElementById("importArea");
  const importText = document.getElementById("importText");
  const importSub = document.getElementById("importSub");
  const importIcon = document.getElementById("importIcon");
  const badgeReading = document.getElementById("badgeReading");
  const badgeAuto = document.getElementById("badgeAuto");
  const coverPreview = document.getElementById("coverPreview");
  const coverPlaceholder = document.getElementById("coverPlaceholder");
  const coverLabel = document.getElementById("coverLabel");
  const coverSub = document.getElementById("coverSub");
  const btnTrocarCapa = document.getElementById("btnTrocarCapa");
  const fieldTitulo = document.getElementById("fieldTitulo");
  const fieldAutor = document.getElementById("fieldAutor");
  const fieldAlbum = document.getElementById("fieldAlbum");
  const fieldAno = document.getElementById("fieldAno");
  const fieldGenero = document.getElementById("fieldGenero");

  const modalBiblioteca = document.getElementById("modalBiblioteca");
  const bibClose = document.getElementById("bibClose");
  const listaMusicas = document.getElementById("listaMusicas");

  function abrirDrawer() {
    drawer.classList.add("open");
    drawerOverlay.classList.add("open");
  }

  function fecharDrawer() {
    drawer.classList.remove("open");
    drawerOverlay.classList.remove("open");
  }

  menuBtn.addEventListener("click", abrirDrawer);
  drawerClose.addEventListener("click", fecharDrawer);
  drawerOverlay.addEventListener("click", fecharDrawer);

  function abrirModal() {
    fecharDrawer();
    resetModal();
    modalOverlay.classList.add("open");
  }

  function fecharModal() {
    modalOverlay.classList.remove("open");
  }

  function resetModal() {
    capaAtualBase64 = null;
    caminhoAtual = null;
    fieldTitulo.value = "";
    fieldAutor.value = "";
    fieldAlbum.value = "";
    fieldAno.value = "";
    fieldGenero.value = "";
    coverPreview.src = "";
    coverPreview.style.display = "none";
    coverPlaceholder.style.display = "block";
    coverLabel.textContent = "Nenhuma capa";
    coverSub.textContent = "Extraída do MP3 ou importada manualmente";
    importArea.classList.remove("has-file");
    importIcon.textContent = "↑";
    importText.textContent = "Clique para selecionar um MP3";
    importSub.textContent = "ou arraste e solte aqui";
    badgeReading.style.display = "none";
    badgeAuto.style.display = "none";
    btnSalvar.disabled = true;
    [fieldTitulo, fieldAutor, fieldAlbum, fieldAno, fieldGenero].forEach((el) =>
      el.classList.remove("auto-filled"),
    );
  }

  btnAbrirModal.addEventListener("click", abrirModal);
  modalClose.addEventListener("click", fecharModal);
  btnCancelar.addEventListener("click", fecharModal);
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) fecharModal();
  });

  importArea.addEventListener("click", async () => {
    badgeReading.style.display = "flex";
    badgeAuto.style.display = "none";

    const meta = await ipcRenderer.invoke("importar-mp3");

    badgeReading.style.display = "none";

    if (!meta) return;

    caminhoAtual = meta.caminho;

    fieldTitulo.value = meta.titulo || "";
    fieldAutor.value = meta.autor || "";
    fieldAlbum.value = meta.album || "";
    fieldAno.value = meta.ano || "";
    fieldGenero.value = meta.genero || "";

    const foiAutoPreenchido =
      meta.titulo || meta.autor || meta.album || meta.genero;

    if (foiAutoPreenchido) {
      badgeAuto.style.display = "flex";
      [fieldTitulo, fieldAutor, fieldAlbum, fieldAno, fieldGenero].forEach(
        (el) => {
          if (el.value) el.classList.add("auto-filled");
        },
      );
    }

    if (meta.capaBase64) {
      capaAtualBase64 = meta.capaBase64;
      setCapa(meta.capaBase64, "Capa extraída do MP3", "Via tags ID3");
    }

    const nomeArquivo = meta.caminho.split(/[\\/]/).pop();
    importArea.classList.add("has-file");
    importIcon.textContent = "♪";
    importText.innerHTML = `<strong>${nomeArquivo}</strong>`;
    importSub.textContent = "arquivo selecionado";

    btnSalvar.disabled = false;
  });

  btnTrocarCapa.addEventListener("click", async (e) => {
    e.stopPropagation();
    const base64 = await ipcRenderer.invoke("importar-capa");
    if (!base64) return;
    capaAtualBase64 = base64;
    setCapa(base64, "Capa personalizada", "Importada manualmente");
  });

  function setCapa(src, label, sub) {
    coverPreview.src = src;
    coverPreview.style.display = "block";
    coverPlaceholder.style.display = "none";
    coverLabel.textContent = label;
    coverSub.textContent = sub;
  }

  btnSalvar.addEventListener("click", async () => {
    if (!caminhoAtual) return;

    const dados = {
      titulo: fieldTitulo.value.trim() || "Sem título",
      autor: fieldAutor.value.trim(),
      album: fieldAlbum.value.trim(),
      ano: fieldAno.value.trim(),
      genero: fieldGenero.value.trim(),
      caminho: caminhoAtual,
      capaBase64: capaAtualBase64,
    };

    btnSalvar.textContent = "Salvando…";
    btnSalvar.disabled = true;

    const result = await ipcRenderer.invoke("salvar-musica", dados);

    if (result && result.id) {
      songs.push({
        title: dados.titulo,
        author: dados.autor,
        audio: dados.caminho,
        image: dados.capaBase64 || "",
        id: result.id,
      });

      btnSalvar.textContent = "✓ Salvo!";
      setTimeout(() => {
        fecharModal();
        btnSalvar.textContent = "Salvar música";
      }, 800);
    }
  });

  async function abrirConfigMov() {
    fecharDrawer();
    movimentacaoHabilitada = !movimentacaoHabilitada;

    // Atualiza o texto do botão
    const statusText = movimentacaoHabilitada
      ? "Desabilitar Movimentação"
      : "Habilitar Movimentação";
    btnDesabilitarMov.textContent = "⚙ " + statusText;

    // Se foi desabilitada, reseta a rotação da card
    if (!movimentacaoHabilitada) {
      card.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg)";
    }
  }

  async function abrirBiblioteca() {
    fecharDrawer();
    const musicas = await ipcRenderer.invoke("listar-musicas");
    renderBiblioteca(musicas);
    modalBiblioteca.classList.add("open");
  }

  function renderBiblioteca(musicas) {
    if (!musicas || musicas.length === 0) {
      listaMusicas.innerHTML =
        '<p class="empty-state">Nenhuma música adicionada ainda.</p>';
      return;
    }

    listaMusicas.innerHTML = musicas
      .map(
        (m) => `
      <div class="bib-item" data-id="${m.id}" data-caminho="${m.caminho}"
           data-titulo="${m.titulo}" data-autor="${m.autor || ""}"
           data-capa='${m.capaBase64 || ""}'>
        <div class="bib-thumb">
          ${
            m.capaBase64
              ? `<img src="${m.capaBase64}" alt="Capa">`
              : `<span>♪</span>`
          }
        </div>
        <div class="bib-info">
          <strong>${m.titulo}</strong>
          <small>${m.autor || "Artista desconhecido"}</small>
        </div>
        <button class="bib-play" title="Tocar agora">▶</button>
        <button class="bib-del" title="Remover" data-id="${m.id}">✕</button>
      </div>
    `,
      )
      .join("");

    listaMusicas.querySelectorAll(".bib-play").forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = btn.closest(".bib-item");
        const novaMus = {
          title: item.dataset.titulo,
          author: item.dataset.autor,
          audio: item.dataset.caminho,
          image: item.dataset.capa || "",
        };
        songs.unshift(novaMus);
        currentIndex = 0;
        loadSong(0);
        audio.play();
        modalBiblioteca.classList.remove("open");
      });
    });

    listaMusicas.querySelectorAll(".bib-del").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = Number(btn.dataset.id);
        await ipcRenderer.invoke("deletar-musica", id);
        btn.closest(".bib-item").remove();
        if (!listaMusicas.querySelector(".bib-item")) {
          listaMusicas.innerHTML =
            '<p class="empty-state">Nenhuma música adicionada ainda.</p>';
        }
      });
    });
  }

  btnDesabilitarMov.addEventListener("click", abrirConfigMov);

  btnVerBiblioteca.addEventListener("click", abrirBiblioteca);
  bibClose.addEventListener("click", () =>
    modalBiblioteca.classList.remove("open"),
  );
  modalBiblioteca.addEventListener("click", (e) => {
    if (e.target === modalBiblioteca) modalBiblioteca.classList.remove("open");
  });

  try {
    const musicasSalvas = await ipcRenderer.invoke("listar-musicas");
    if (musicasSalvas && musicasSalvas.length > 0) {
      const doDb = musicasSalvas.map((m) => ({
        title: m.titulo,
        author: m.autor || "",
        audio: m.caminho,
        image: m.capaBase64 || "",
        id: m.id,
      }));
      songs = [...doDb, ...songsFallback];
    }
  } catch (_) {}

  function loadSong(index) {
    const song = songs[index];
    titleEl.textContent = song.title;
    authorEl.textContent = song.author;
    imageEl.src = song.image || "";
    audio.src = song.audio;
  }

  loadSong(currentIndex);

  function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  }

  function updateSlider() {
    durationSlider.max = audio.duration || 0;
    durationSlider.value = audio.currentTime;
    currentTimeSpan.textContent = formatTime(audio.currentTime);
    totalDurationSpan.textContent = formatTime(audio.duration);
  }

  function updateVolume() {
    audio.volume = Number(volumeSlider.value) / 100;
  }

  function updatePausePlayIcon() {
    pausePlayImg.src = audio.paused ? "Assets/play.png" : "Assets/pause.png";
  }

  durationSlider.addEventListener("input", () => {
    audio.currentTime =
      (durationSlider.value / durationSlider.max) * audio.duration;
  });

  volumeSlider.addEventListener("input", updateVolume);

  stopStart.addEventListener("click", () => {
    if (audio.paused) audio.play();
    else audio.pause();
  });

  restart.addEventListener("click", () => {
    audio.currentTime = 0;
    audio.play();
  });

  next.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % songs.length;
    loadSong(currentIndex);
    audio.play();
  });

  prev.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    loadSong(currentIndex);
    audio.play();
  });

  audio.addEventListener("ended", () => {
    currentIndex = (currentIndex + 1) % songs.length;
    loadSong(currentIndex);
    audio.play();
  });

  audio.addEventListener("play", updatePausePlayIcon);
  audio.addEventListener("pause", updatePausePlayIcon);
  audio.addEventListener("timeupdate", updateSlider);
  audio.addEventListener("loadedmetadata", updateSlider);
  updatePausePlayIcon();
  updateSlider();
  updateVolume();

  card.addEventListener("mousemove", (e) => {
    if (!movimentacaoHabilitada) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg)";
  });
});
