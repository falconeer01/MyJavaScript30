let countdown;

const buttons = document.querySelectorAll('[data-time]');

const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');

// Kalan süreyi geri sayacak fonksiyon:
function timer(seconds){
    clearInterval(countdown);

    // Fonksiyonun çalıştığı andaki milisaniyeyi al. 
    const now = Date.now();

    // Geçen zamanı hesaplamak için saniyeyi milisaniyeye çevir ve now'a ekle.
    const then = now + (seconds * 1000);

    // Kalan saniyeyi ekrana yazdır.
    displayTimeLeft(seconds);

    // Geri dönülecek dakika ve saati yazdır.
    displayEndTime(then);

    // setInterval'in bir değişkene atanmasının nedeni, setInterval'i istenilen bir zamandad durdurabilmektir.
    countdown = setInterval(() => {
        // Kalan saniyeyi hesapla.
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        // Sayı sıfırdan küçükse dur.
        if(secondsLeft < 0 ){
            clearInterval(countdown);
            return;
        }

        // Kalan saniyeyi ekrana yazdır.
        displayTimeLeft(secondsLeft);
    }, 1000);
}

// Kalan süreyi ekranda gösterecek fonksiyon:
function displayTimeLeft(seconds){
    // Kalan dakikayı hesapla.
    const minutes = Math.floor(seconds / 60);

    // Kalan saniyeyi hesapla.
    const secondsRemained = seconds % 60;

    // Kalan dakika ve saniyeyi ekranda göster.
    const display = `${minutes}:${secondsRemained < 10 ? '0': ''}${secondsRemained}`
    timerDisplay.textContent = display;

    // Web sayfasının başlığını kalan süreye ayarla.
    document.title = display;
}

// Geri dönülecek zamanı gösterecek fonksiyon:
function displayEndTime(timestamp){
    // Molanın bittiği zamanı hesapla ( new Date(then) ).
    const end = new Date(timestamp);

    // Mola bitiş süresinin saatini ve dakikasını al.
    const hour = end.getHours();
    const minutes = end.getMinutes();

    // Mola bitiş süresinin saatini ve dakikasını ekrana yazdır.
    endTime.textContent = `Be back at ${hour}:${minutes < 10 ? '0': ''}${minutes}`;
}

// Her butona tıklandığında çalışacak fonksiyon:
function startTimer(){
    // seconds, tıklanılan kutucuğun içindeki time verisidir.
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));

// Sayfada customForm name değeriyle var olan form elementine her submit olduğunda;
document.customForm.addEventListener('submit', function(e){
    e.preventDefault();

    // Inputa girilen değeri dakikaymış gibi al.
    const mins = this.minutes.value;
    
    // Dakikayı saniyeye çevir ve timer fonksiyonunda çağır.
    timer(mins * 60);

    // Submit eventinden sonra input'un içini boşalt. 
    this.reset();
});