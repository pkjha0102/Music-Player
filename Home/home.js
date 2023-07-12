console.log("Welcome to my Music Player");

// Initialise the variables
let songIndex = 0;
let audioElement = new Audio('Songs/Song 1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let volume_slider = document.querySelector(".volume_slider");
let timeStamp = Array.from(document.getElementsByClassName('timeStamp'));
// console.log(timeStamp[0].innerText);

let songs = [
    { songName: "Song 1", filePath: "Songs/Song 1.mp3", coverPath: "Covers/cover1.jpeg" },
    { songName: "Song 2", filePath: "Songs/Song 2.mp3", coverPath: "Covers/cover2.jpeg" },
    { songName: "Song 3", filePath: "Songs/Song 3.mp3", coverPath: "Covers/cover3.jpeg" },
    { songName: "Song 4", filePath: "Songs/Song 4.mp3", coverPath: "Covers/cover4.jpeg" },
    { songName: "Song 5", filePath: "Songs/Song 5.mp3", coverPath: "Covers/cover5.jpeg" },
    { songName: "Song 6", filePath: "Songs/Song 6.mp3", coverPath: "Covers/cover6.jpeg" },
    { songName: "Song 7", filePath: "Songs/Song 7.mp3", coverPath: "Covers/cover7.jpeg" },
    { songName: "Song 8", filePath: "Songs/Song 8.mp3", coverPath: "Covers/cover8.jpeg" },
    { songName: "Song 9", filePath: "Songs/Song 9.mp3", coverPath: "Covers/cover9.jpeg" },
    { songName: "Song 10", filePath: "Songs/Song 10.mp3", coverPath: "Covers/cover10.jpeg" },
]

songItems.forEach((element, i) => {
    // console.log(element);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

})

// audioElement.play();

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // console.log('timeupdate');
    //update seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    // console.log(progress);
    myProgressBar.value = progress;
})

// Manually seek
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
})

// Update the song timers
const resetTimer = () => {
    Array.from(document.getElementsByClassName('timeStamp')).forEach((element) => {
        element.innerText = "0:00";
    })
}
function formatSecondsAsTime(secs, format) {
    var hr = Math.floor(secs / 3600);
    var min = Math.floor((secs - (hr * 3600)) / 60);
    var sec = Math.floor(secs - (hr * 3600) - (min * 60));

    if (min < 10) {
        min = "0" + min;
    }
    if (sec < 10) {
        sec = "0" + sec;
    }

    return min + ':' + sec;
}
audioElement.addEventListener('timeupdate', () => {
    let nowTime;
    nowTime = formatSecondsAsTime(audioElement.currentTime) + '/' + formatSecondsAsTime(audioElement.duration);
    timeStamp[songIndex].innerText = nowTime;
})

// Play/Pause from list
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.add('fa-circle-play');
        element.classList.remove('fa-circle-pause');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        if (audioElement.paused || audioElement.currentTime <= 0) {
            gif.style.opacity = 1;
            makeAllPlays();
            resetTimer();
            songIndex = parseInt(e.target.id);
            // console.log(songIndex);
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src = `Songs/Song ${songIndex + 1}.mp3`
            audioElement.currentTime = 0;
            audioElement.play();
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            masterSongName.innerText = songs[songIndex].songName;
            // timeStamp[songIndex].innerText = myProgressBar.value;
        }
        else {
            gif.style.opacity = 0;
            makeAllPlays();
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            audioElement.pause();
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
        }
    })
})

// Handle play/pause click on masterPlay
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        //Change pause/play icon of current song and previous song
        makeAllPlays();
        ele = document.getElementById(`${songIndex}`);
        // console.log(ele);
        ele.classList.remove('fa-circle-play');
        ele.classList.add('fa-circle-pause');

    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
        //Change pause/play icon of current song and previous song
        makeAllPlays();
        ele = document.getElementById(`${songIndex}`);
        // console.log(ele);
        ele.classList.remove('fa-circle-pause');
        ele.classList.add('fa-circle-play');
    }
})

// Click on previous
document.getElementById('previous').addEventListener('click', (e) => {
    if (songIndex <= 0) {
        songIndex = 0;
    }
    else {
        songIndex -= 1;
    }
    // console.log(songIndex);
    audioElement.src = `Songs/Song ${songIndex + 1}.mp3`
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    //Change pause/play icon of current song and previous song
    makeAllPlays();
    resetTimer();
    ele = document.getElementById(`${songIndex}`);
    // console.log(ele);
    ele.classList.remove('fa-circle-play');
    ele.classList.add('fa-circle-pause');
    // set song name along gif
    masterSongName.innerText = songs[songIndex].songName;

})

// Click on next
document.getElementById('next').addEventListener('click', (e) => {
    if (songIndex >= 9) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    // console.log(songIndex);
    audioElement.src = `Songs/Song ${songIndex + 1}.mp3`
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    //Change pause/play icon of current song and previous song
    makeAllPlays();
    resetTimer();
    ele = document.getElementById(`${songIndex}`);
    // console.log(ele);
    ele.classList.remove('fa-circle-play');
    ele.classList.add('fa-circle-pause');
    // set song name along gif
    masterSongName.innerText = songs[songIndex].songName;
})

function setVolume() {
    // Set the volume according to the
    // percentage of the volume slider set
    audioElement.volume = volume_slider.value / 100;
}

// Reset everything when an audio is finished
audioElement.addEventListener('timeupdate', () => {
    if (audioElement.currentTime == audioElement.duration) {
        makeAllPlays();
        gif.style.opacity = 0;
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
    }
})
/* The End */