/* Navigation Bar */
const toggleButton = $('#toggle-btn');
const sidebar = $('#sidebar');

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



/* main */
const chapterText = $('.content p');

$('.font-size .add').on('click', () => {
    const currentFontSize = parseFloat(chapterText.css('font-size'));
    const largerFontSize = Math.min(currentFontSize + 2, 40);

    chapterText.css('font-size', largerFontSize + 'px');
});

$('.font-size .minus').on('click', () => {
    const currentFontSize = parseFloat(chapterText.css('font-size'));
    const smallerFontSize = Math.max(currentFontSize - 2, 20);

    chapterText.css('font-size', smallerFontSize + 'px');
});



$('.pad-size .add').on('click', () => {
    const currentpadSize = parseFloat(chapterText.css('width'));
    const largerpadSize = Math.min(currentpadSize + 10, 1400);

    chapterText.css('width', largerpadSize + 'px');
});

$('.pad-size .minus').on('click', () => {
    const currentpadSize = parseFloat(chapterText.css('width'));
    const smallerpadSize = Math.max(currentpadSize - 10, 900);

    chapterText.css('width', smallerpadSize + 'px');
});