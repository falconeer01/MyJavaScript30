// Elementleri seç.
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]'); // skip özelliğine (property) sahip elementleri seçer.
const ranges = player.querySelectorAll('.player__slider');
const fullScreen = player.querySelector('.full__screen');

// Fonksiyonlar:
// Videoyu oynatan veya durduran fonksiyon:
function togglePlay(){
    if(video.paused){
        video.play();
    }else{
        video.pause();
    }
}

// Tıklandığında toggle butonunun simgesini değiştiren fonksiyon:
function handleToggle(){
    const icon = video.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

// skip tuşlarını çalıştıran fonksiyon:
function skip(){
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip)
}

// Sliderları çalıştıran fonksiyon:
function handleRangeUpdate(){
    video[this.name] = this.value;
}

// İlerleme çubuğunun zamanla ilerlemesini sağlayan fonksiyon:
function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

// İlerleme çubuğunu tıklandığı noktaya götüren fonksiyon: 
function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// Videoyu tam ekran yapma fonksiyonu:
function toFullScreen(){
    if(player.requestFullscreen){
        player.requestFullscreen();
    }

    if(document.exitFullscreen){
        document.exitFullscreen();
    }
}

// Event dinleyicileri bağla.
video.addEventListener('click', togglePlay);
video.addEventListener('play', handleToggle);
video.addEventListener('pause', handleToggle);
video.addEventListener('timeupdate', handleProgress);
video.addEventListener('dblclick', toFullScreen);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mouseDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);

fullScreen.addEventListener('click', toFullScreen);