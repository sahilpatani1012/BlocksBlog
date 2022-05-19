const loaderbox = document.querySelector('.loaderbox');
const body = document.querySelector('body');
const main = document.querySelector('.main');

function load() {
    setTimeout(() => {
        main.style.display = 'block';
        setTimeout(() => {
            main.style.opacity = 1;
            loaderbox.style.opacity = 1;
        }, 50)
    }, 2000);
    setTimeout(() => {
        body.classList.toggle('active')
        loaderbox.style.display = 'none';
    }, 3000)
}

load();

