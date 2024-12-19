const banner = document.querySelector('#banner-wrapper');
const exitBanner = document.querySelector('#exit-invitation');

const isHidden = localStorage.getItem('banner-hidden');

if (isHidden && isHidden === 'true') {
    banner.hidden = true;
} else {
    banner.hidden = false;
}

exitBanner.addEventListener('click', () => {
    banner.toggleAttribute('hidden');
    localStorage.setItem('banner-hidden', 'true');
});