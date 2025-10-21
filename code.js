const audio = document.getElementById("audio")
const play = document.getElementById("play")
const pause = document.getElementById("pause")
const restart = document.getElementById("restart")

play.addEventListener('click', () =>
{
    audio.play();
});

pause.addEventListener('click', () =>
{
    audio.pause();
});

restart.addEventListener('click', () =>
{

    audio.CurrentTime=0();
    audio.play();

 
});
