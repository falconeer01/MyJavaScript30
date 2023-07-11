// controls input sınıfına sahip tüm elementler seçildi.
const inputs = document.querySelectorAll('.controls input');

// Inputlarda ayarlanan değeri elementlere uygulayan fonksiyon:
function handleUpdate() {
    // data-sizing özelliğindeki değer suffix değişkenine atandı.
    const suffix = this.dataset.sizing || '';

    // Input değerleri elementlere uygulandı.
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);

    // Input değerini konsola yazdırır.
    console.log(this.value);
}

// Seçilen inputlardaki değer her değişime uğradığında handleUpdate fonksiyonunu çalıştırır.
inputs.forEach(input => input.addEventListener('change', handleUpdate));

// Seçilen inputlar mouse ile her etkileşime girdiğinde handleUpdate fonksiyonunu çalıştırır.
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));