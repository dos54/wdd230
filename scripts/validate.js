const form = document.querySelector('.web-form-1');
const ratingSlider = document.querySelector('#rating');
const ratingNumber = document.querySelector('#rating-value');

const formError = document.createElement('div');
const formErrorP = document.createElement('p');
formError.style.display = "none";
formError.appendChild(formErrorP);
formErrorP.textContent = "Error: Passwords do not match";
form.appendChild(formError);


ratingSlider.addEventListener('input', () => {
    ratingNumber.textContent = ratingSlider.value;
});

const password1 = document.querySelector('#password1');
const password2 = document.querySelector('#password2');

form.addEventListener('submit', (e) => {
    if (password1.value !== password2.value) {
        e.preventDefault();
        formError.style.display = "block";
        password1.textContent = '';
        password2.textContent = '';
        password1.focus();
    } else {
        formError.style.display = "none";
        
    }
});

