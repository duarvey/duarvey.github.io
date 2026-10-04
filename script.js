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

