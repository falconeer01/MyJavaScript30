// Klavyede her tuşa basıldığında çalışacak bir fonksiyon ekler.
// Fonksiyon parametre olarak klavyeden girilen tuşu alır.
addEventListener('keydown', function(e){

    // Girilen keyCode'daki audio elementini seçer.
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);

    // Girilen keyCode'daki key sınıfına sahip elementi seçer.
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

    // Eğer girilen tuşa atanan bir ses dosyası yoksa hiçbir şey olmaz
    if(!audio){
        return;
    }

    // Eğer girilen tuşa atanan bir ses dosyası varsa,
    audio.currentTime = 0; // Sesi geriye sarar.
    audio.play(); // Ses oynatılır.
    key.classList.add('playing'); // Klavyeden girilen tuşa playing sınıfı eklenir.

    // Ses oynatma işlemi bittiğinde playing sınıfının çıkarılmasını sağlayan fonksiyon:
    const removeTransition = (e) => {
        // Eğer bir transform değilse atla.
        if(e.propertyName !== 'transform'){
            return;
        }
        // Eğer bir transform ise playing sınıfını çıkar.
        key.classList.remove('playing');
    }

    // Playing sınıfını çıkarma işlemi aşağıdaki gibi de yapılabilir.
    // Klavyeden bir tuşa basıldıktan 0.07 saniye sonra playing sınıfı çıkarılır.
    // setTimeout(function(){
    //     key.classList.remove('playing');
    // }, 0.07)

    // key sınıfına ait tüm elementleri seçer.
    const keys = document.querySelectorAll('.key');

    // Seçilen elementlerin içinde dolaşır ve transition işlemi bittiğinde hepsine removeTransition fonksiyonunu uygular.
    keys.forEach(key => key.addEventListener('transitionend', removeTransition));
});