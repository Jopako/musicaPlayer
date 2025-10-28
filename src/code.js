document.addEventListener('DOMContentLoaded', function() {
  const songs = [
    {
      title: "Last Night",
      author: "Diddy",
      audio: "./Music/diddy.mp3",
      image: "./Photo/pdidy.jpg"
    },
    {
      title: "Bleeding",
      author: "GIVEON",
      audio: "./Music/GIVĒON - BLEEDING.mp3",
      image: "./Photo/giveon.jpg"
    },
    {
      title: "Tiramisu",
      author: "Don Toliver",
      audio: "./Music/Tiramisu.mp3",
      image: "./Photo/donT.jpeg"
    }
  ];

  let currentIndex = 0;


  const audio = document.getElementById("audio");
  const stopStart = document.getElementById("stopStart")
  const restart = document.getElementById("restart");
  const next = document.getElementById("next");
  const prev = document.getElementById("prev");

  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const image = document.getElementById("image");


  function loadSong (index)

  {
    const song =  songs[index];

    title.textContent = song.title;
    author.textContent = song.author;
    image.src = song.image;
    audio.src = song.audio;
  }

  loadSong(currentIndex);

stopStart.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  });

  restart.addEventListener('click', () => {
    audio.currentTime = 0;
    audio.play();
  });


  next.addEventListener('click', () =>
  {
    currentIndex++;
    if (currentIndex >= songs.lenght) 
  
    currentIndex = 0;
    loadSong(currentIndex);
    audio.play();

  });

  next.addEventListener('click', () => /* next com retorno para o primeiro index  */
  {
    if(currentIndex >= songs.length)
    {
      currentIndex = 0;
     loadSong(currentIndex);
    audio.play();
    } 
  })
 
  prev.addEventListener('click',() => 
  {
    currentIndex--;
    loadSong(currentIndex);
    audio.play();
  });

});




