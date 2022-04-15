const navigation = document.querySelector('.navigation');
const menuToggle = document.querySelector('.menuToggle');
const bodyToggle = document.querySelector('body');
// for the menu toggle
menuToggle.onclick = function () {
    menuToggle.classList.toggle('active')
    navigation.classList.toggle('active')
    bodyToggle.classList.toggle('active')
}
// for the sticky navbar
// NOTE: try 'position:sticky' later
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
})
