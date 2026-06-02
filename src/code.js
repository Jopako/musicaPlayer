document.addEventListener("DOMContentLoaded", function () {
  const songs = [
    {
      title: "BLEEDING",
      author: "Giveon",
      audio: "Music/BLEEDING.mp3",
      image: "Photo/giveon.jpg",
    },
    {
      title: "TIRAMISU",
      author: "Don Toliver",
      audio: "Music/Tiramisu.mp3",
      image: "Photo/donT.jpeg",
    },
    // {
    //   title: "Teste",
    //   author: "Teste",
    //   audio: "Music/teste.mp3",
    // },
    {
      title: "Crew",
      author: "GoldLink",
      audio: "Music/crew.mp3",
      image: "Photo/crew.jpeg",
    },
  ];
  let currentIndex = 0;

  const audio = document.getElementById("audio");
  const stopStart = document.getElementById("stopStart");
  const pausePlayImg = document.getElementById("pause");
  const restart = document.getElementById("restart");
  const next = document.getElementById("next");
  const prev = document.getElementById("prev");
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const image = document.getElementById("image");
  const durationSlider = document.getElementById("duration-slider");
  const currentTimeSpan = document.getElementById("current-time");
  const totalDurationSpan = document.getElementById("total-duration");

  function loadSong(index) {
    const song = songs[index];
    title.textContent = song.title;
    author.textContent = song.author;
    image.src = song.image;
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

  durationSlider.addEventListener("input", () => {
    audio.currentTime =
      (durationSlider.value / durationSlider.max) * audio.duration;
  });

  function updatePausePlayIcon() {
    pausePlayImg.src = audio.paused ? "Assets/play.png" : "Assets/pause.png";
  }

  stopStart.addEventListener("click", () => {
    if (audio.paused) audio.play();
    else audio.pause();
  });

  audio.addEventListener("play", updatePausePlayIcon);
  audio.addEventListener("pause", updatePausePlayIcon);
  audio.addEventListener("timeupdate", updateSlider);
  audio.addEventListener("loadedmetadata", updateSlider);
  updatePausePlayIcon();
  updateSlider();

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
});
