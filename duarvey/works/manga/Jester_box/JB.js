const toggleButton = $('#toggle-btn');
const sidebar = $('#sidebar');
const panelToggle = document.querySelector('#panel-toggle');
const panelTrack = document.querySelector('#panel-track');
const profilePanel = document.querySelector('#profile-panel');
const aboutPanel = document.querySelector('#about-panel');

panelToggle?.addEventListener('click', () => {
    const showAbout = panelToggle.getAttribute('aria-expanded') !== 'true';

    panelToggle.setAttribute('aria-expanded', String(showAbout));
    panelToggle.textContent = showAbout ? 'Back to profile' : 'About me';
    panelTrack.classList.toggle('show-about', showAbout);
    profilePanel.inert = showAbout;
    profilePanel.setAttribute('aria-hidden', String(showAbout));
    aboutPanel.inert = !showAbout;
    aboutPanel.setAttribute('aria-hidden', String(!showAbout));
});

function toggleSidebar() {
    sidebar.toggleClass('open');
    toggleButton.toggleClass('rotate');

    closeAllSubMenus();
}
function toggleSubMenu(button) {
    if (!$(button).next().hasClass('show')) {
        closeAllSubMenus();
    }

    $(button).next().toggleClass('show');
    $(button).toggleClass('rotate');

    if (
        window.matchMedia('(min-width: 801px)').matches &&
        sidebar.hasClass('auto-hide') &&
        !sidebar.hasClass('open')
    ) {
        sidebar.addClass('open');
        toggleButton.addClass('rotate');
    }
}

function closeAllSubMenus() {
    sidebar.find('.show').each(function() {
        $(this).removeClass('show');
        $(this).prev().removeClass('rotate');
    });
}
setTimeout(function() {
    sidebar.addClass('auto-hide');
}, 1000);

const sidebarStateKey = 'novelSidebarOpen';

const restoreSidebarState = () => {
    const saved = localStorage.getItem(sidebarStateKey);

    if (saved === 'open' && window.matchMedia('(min-width: 801px)').matches) {
        sidebar.addClass('open');
        toggleButton.addClass('rotate');
        sidebar.removeClass('auto-hide');
    }
};

const saveSidebarState = () => {
    localStorage.setItem('novelSidebarOpen', sidebar.hasClass('open') ? 'open' : 'closed');
};

restoreSidebarState();

window.addEventListener('beforeunload', saveSidebarState);



/* content */
const chapterList = $('.content ul');

$('.gap-size .add').on('click', function() {
    const currentGap = parseFloat(chapterList.css('row-gap')) || 0;
    const largerGap = Math.min(currentGap + 10, 200);

    chapterList.css('row-gap', largerGap + 'px');
});

$('.gap-size .minus').on('click', function() {
    const currentGap = parseFloat(chapterList.css('row-gap')) || 0;
    const smallerGap = Math.max(currentGap - 10, 0);

    chapterList.css('row-gap', smallerGap + 'px');
});


/* mobile version */

const mobileNav = window.matchMedia('(max-width: 800px)');
const scrollThreshold = 8;
const scrollContainer = document.querySelector('.hero');
let previousScrollY = scrollContainer?.scrollTop ?? window.scrollY;

function handleScroll() {
    const currentScrollY = scrollContainer?.scrollTop ?? window.scrollY;

    if (!mobileNav.matches) {
        sidebar.removeClass('mobile-hidden');
        previousScrollY = currentScrollY;
        return;
    }

    if (currentScrollY <= 0) {
        sidebar.removeClass('mobile-hidden');
        previousScrollY = currentScrollY;
        return;
    }

    const scrollDifference = currentScrollY - previousScrollY;

    // Ignore small movements to prevent flickering.
    if (Math.abs(scrollDifference) < scrollThreshold) {
        return;
    }

    // Keep the navigation visible while its submenu is open.
    if (sidebar.find('.sub-menu.show').length) {
        sidebar.removeClass('mobile-hidden');
        previousScrollY = currentScrollY;
        return;
    }

    if (scrollDifference > 0) {
        sidebar.addClass('mobile-hidden'); // Scrolling down
    } else {
        sidebar.removeClass('mobile-hidden'); // Scrolling up
    }

    previousScrollY = currentScrollY;
}

scrollContainer?.addEventListener('scroll', handleScroll, { passive: true });
window.addEventListener('resize', handleScroll);