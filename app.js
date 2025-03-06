let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img : 'images/pic1.jpg',
        name : 'emmenez-moi',
        artist : 'charles aznavour',
        music : 'music/emmenez-moi-audio-officiel--paroles.mp3'
    },
    {
        img : 'images/pic2.jpg',
        name : 'jigsaw',
        artist : 'radiohead',
        music : 'music/jigsaw-falling-into-place-by-radiohead.mp3'
    },
    {
        img : 'images/pic3.jpg',
        name : 'by-your-side',
        artist : 'Sade',
        music : 'music/by-your-side---official---2000.mp3'
    },
    {
        img : 'images/picc4.jpg',
        name : 'like-a-tattoo',
        artist : 'Sade',
        music : 'music/like-a-tattoo-audio.mp3'
    },
    {
        img : 'images/pic4.jpg',
        name : 'alabina',
        artist : 'Ishtar',
        music : 'music/alabina-original-version.mp3'
    },
    {
        img : 'images/pic5.jpg',
        name : 'et-si-tu-nexistais-pas',
        artist : 'Joe Dassin',
        music : 'music/et-si-tu-nexistais-pas-audio.mp3'
    },
    {
        img : 'images/pic6.jpg',
        name : 'سميرة سعيد',
        artist : 'ضحكتنى',
        music : 'music/samira-said-ضحكتنى---سميرة-سعيد.mp3'
    },
    {
        img : 'images/pic7.jpg',
        name : 'في يوم وليلة',
        artist : 'وردة الجزائرية',
        music : 'music/وردة-الجزائرية-في-يوم-وليلة.mp3'
    },
    {
        img : 'images/pic8.jpg',
        name : 'smooth-operator',
        artist : 'Sade',
        music : 'music/smooth-operator---official---1984.mp3'
    },
    {
        img : 'images/pic9.jpg',
        name : 'Kusura Bakma',
        artist : 'Sezen Aksu ',
        music : 'music/kusura-bakma---45lik-official-audio.mp3'
    },
    {
        img : 'images/pic10.jpg',
        name : ' حرمت أحبك',
        artist : 'وردة الجزائرية',
        music : 'music/warda.mp3'
    },
    {
        img : 'images/pic11.jpg',
        name : 'Le Temps de l Amour',
        artist : 'Françoise Hardy',
        music : 'music/amour.mp3'
    },
    {
        img : 'images/pic12.jpg',
        name : 'Kaguya-sama: Love Is War',
        artist : '',
        music : 'music/love.mp3'
    },
    {
        img : 'images/pic13.jpg',
        name : 'Düm Tek Tek',
        artist : 'Hadise Acikgoze',
        music : 'music/dumtek.mp3'
    },
    {
        img : 'images/pic14.jpg',
        name : 'كنت هقولك ايه',
        artist : 'هيفاء وهبي',
        music : 'music/Haifa wahbie.mp3'
    },
    {
        img : 'images/pic18.jpg',
        name : 'Smells Like Teen Spirit',
        artist : 'Nirvana',
        music : 'music/nirvana.mp3'
    },
    {
        img : 'images/pic16.jpg',
        name : 'Jabni Mjiba',
        artist : 'Rhany Kabbadj',
        music : 'music/jabni.mp3'
    },
  
    {
        img : 'images/pic15.jpg',
        name : 'كفاياك أعذار',
        artist : 'تامر حسني',
        music : 'music/kifayak.mp3'
    },
    {
        img : 'images/pic19.jpg',
        name : ' عطشانة',
        artist : 'عبد العالي انور',
        music : 'music/3atchana.mp3'
    },
    {
        img : 'images/pic20.jpg',
        name : 'انت اختيار',
        artist : 'تامر حسني',
        music : 'music/tamer.mp3'
    },
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    // Removed the random_bg_color() call from here
}


function random_bg_color(){
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;

    function populate(a){
        for(let i=0; i<6; i++){
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let Color1 = populate('#');
    let Color2 = populate('#');
    var angle = 'to right';

    let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
    document.body.style.background = gradient;
}
function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);  // Calls loadTrack, but random_bg_color is not triggered here anymore
    playTrack();
}

function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}
