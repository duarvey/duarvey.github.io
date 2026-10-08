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

    if (sidebar.hasClass('auto-hide') && !sidebar.hasClass('open')) {
        sidebar.toggleClass('open');
        toggleButton.toggleClass('rotate');
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

    if (saved === 'open') {
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

$('li').on('click', function(){
    $(this).toggleClass('view');
});