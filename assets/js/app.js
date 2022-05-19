const navigation = document.querySelector('.navigation');
const menuToggle = document.querySelector('.menuToggle');
const bodyToggle = document.querySelector('body');
const loginToggle = document.querySelector('header .btn');
var home = document.querySelectorAll('.navigation ul li a');
// for the menu toggle
menuToggle.onclick = function () {
    menuToggle.classList.toggle('active')
    navigation.classList.toggle('active')
    bodyToggle.classList.toggle('active')
}
//login toggle
loginToggle.onclick = function () {
    loginToggle.classList.toggle('active')
}
// for the sticky navbar
// NOTE: try 'position:sticky' later
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
})
//closing menu on click...
for (var i = 0; i < home.length; i++) {
    home[i].onclick = function () {
        menuToggle.classList.remove('active');
        navigation.classList.remove('active');
        bodyToggle.classList.toggle('active'); //<---litlle messy ;;;
    }
}