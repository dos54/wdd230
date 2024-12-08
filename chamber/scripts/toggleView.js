const directoryElement = document.querySelector('#directory');
const toggle = document.querySelector('#toggle');

toggle.addEventListener('click', () => {
    directoryElement.classList.toggle('column-layout');
    if (directoryElement.classList.contains('column-layout')) {
        toggle.textContent = 'Gallery View';
    } else {
        toggle.textContent = 'Column View';
    }
});

