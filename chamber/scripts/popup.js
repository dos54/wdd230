const banner = document.querySelector('#banner-wrapper');
const exitBanner = document.querySelector('#exit-invitation');

const isHidden = localStorage.getItem('banner-hidden');

if (isHidden && isHidden === 'true') {
    banner.hidden = true;
} else if (isBannerDay()) {
    banner.hidden = false;
}

exitBanner.addEventListener('click', () => {
    banner.toggleAttribute('hidden');
    localStorage.setItem('banner-hidden', 'true');
});

function isBannerDay()
{
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    if (currentDay > 0 && currentDay < 4)
    {
        return true;
    }
    return false;
}