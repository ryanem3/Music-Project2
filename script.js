// ----------------------------------------
// GET HTML ELEMENTS
// ----------------------------------------

const musicContainer =
  document.getElementById('music-container');

const playBtn =
  document.getElementById('play');

const prevBtn =
  document.getElementById('prev');

const nextBtn =
  document.getElementById('next');

const audio =
  document.getElementById('audio');

const progress =
  document.getElementById('progress');

const progressContainer =
  document.getElementById('progress-container');

const title =
  document.getElementById('title');

const cover =
  document.getElementById('cover');


// ----------------------------------------
// SONGS
// ----------------------------------------

const songs = [

  {
    title: 'Door',
    file: 'Door.mp3',
    image: 'house1.jpg'
  },

  {
    title: 'Moog City',
    file: 'Moog City.mp3',
    image: 'house2.jpg'
  },

  {
    title: 'Subwoofer Lullaby',
    file: 'Subwoofer Lullaby.mp3',
    image: 'house3.jpg'
  },

  {
    title: 'Wet Hands',
    file: 'Wet Hands.mp3',
    image: 'house4.jpg'
  }

];


// Start on Door
let songIndex = 0;


// ----------------------------------------
// LOAD SONG
// ----------------------------------------

function loadSong(song) {

  title.innerText = song.title;

  audio.src =
    `./music/${song.file}`;

  cover.src =
    `./image/${song.image}`;

}


loadSong(songs[songIndex]);


// ----------------------------------------
// PLAY
// ----------------------------------------

function playSong() {

  musicContainer.classList.add('play');

  const icon =
    playBtn.querySelector('i');

  icon.classList.remove('fa-play');

  icon.classList.add('fa-pause');

  audio.play();

}


// ----------------------------------------
// PAUSE
// ----------------------------------------

function pauseSong() {

  musicContainer.classList.remove('play');

  const icon =
    playBtn.querySelector('i');

  icon.classList.remove('fa-pause');

  icon.classList.add('fa-play');

  audio.pause();

}


// ----------------------------------------
// PLAY BUTTON
// ----------------------------------------

playBtn.addEventListener(
  'click',
  function () {

    if (audio.paused) {

      playSong();

    } else {

      pauseSong();

    }

  }
);


// ----------------------------------------
// PREVIOUS SONG
// ----------------------------------------

function prevSong() {

  songIndex--;

  if (songIndex < 0) {

    songIndex =
      songs.length - 1;

  }

  loadSong(
    songs[songIndex]
  );

  playSong();

}


prevBtn.addEventListener(
  'click',
  prevSong
);


// ----------------------------------------
// NEXT SONG
// ----------------------------------------

function nextSong() {

  songIndex++;

  if (
    songIndex >= songs.length
  ) {

    songIndex = 0;

  }

  loadSong(
    songs[songIndex]
  );

  playSong();

}


nextBtn.addEventListener(
  'click',
  nextSong
);


// ----------------------------------------
// UPDATE PROGRESS BAR
// ----------------------------------------

function updateProgress() {

  const duration =
    audio.duration;

  const currentTime =
    audio.currentTime;

  if (duration) {

    const percent =
      (currentTime / duration) * 100;

    progress.style.width =
      `${percent}%`;

  }

}


audio.addEventListener(
  'timeupdate',
  updateProgress
);


// ----------------------------------------
// CLICK PROGRESS BAR
// ----------------------------------------

function setProgress(event) {

  const width =
    progressContainer.clientWidth;

  const clickX =
    event.offsetX;

  const duration =
    audio.duration;

  if (duration) {

    audio.currentTime =
      (clickX / width) * duration;

  }

}


progressContainer.addEventListener(
  'click',
  setProgress
);


// ----------------------------------------
// NEXT SONG WHEN CURRENT SONG ENDS
// ----------------------------------------

audio.addEventListener(
  'ended',
  nextSong
);