const hamburgerButton = document.querySelector('#menu');
const navigation = document.querySelector('nav');

hamburgerButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamburgerButton.classList.toggle('open');
})