const toggleButton = $('#toggle-btn');
const sidebar = $('#sidebar');
const mobileTopNav = $('.hero > nav.section1');
const mobileTopDivider = mobileTopNav.next('.divider');

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


/* mobile version */

const mobileNav = window.matchMedia('(max-width: 800px)');
const scrollThreshold = 8;
let previousScrollY = window.scrollY;

function handleScroll() {
    const currentScrollY = window.scrollY;

    if (!mobileNav.matches) {
        sidebar.removeClass('mobile-hidden');
        mobileTopNav.removeClass('mobile-hidden');
        mobileTopDivider.removeClass('mobile-hidden');
        previousScrollY = currentScrollY;
        return;
    }

    if (currentScrollY <= 0) {
        sidebar.removeClass('mobile-hidden');
        mobileTopNav.removeClass('mobile-hidden');
        mobileTopDivider.removeClass('mobile-hidden');
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
        mobileTopNav.removeClass('mobile-hidden');
        mobileTopDivider.removeClass('mobile-hidden');
        previousScrollY = currentScrollY;
        return;
    }

    if (scrollDifference > 0) {
        sidebar.addClass('mobile-hidden'); // Scrolling down
        mobileTopNav.addClass('mobile-hidden');
        mobileTopDivider.addClass('mobile-hidden');
    } else {
        sidebar.removeClass('mobile-hidden'); // Scrolling up
        mobileTopNav.removeClass('mobile-hidden');
        mobileTopDivider.removeClass('mobile-hidden');
    }

    previousScrollY = currentScrollY;
}

window.addEventListener('scroll', handleScroll, { passive: true });
window.addEventListener('resize', handleScroll);



/* button for toggling the life blog. */
const showLifeButton = $('#switchlife');
const showWorkButton = $('#switchwork');
const workContent = $('.content-work');
const lifeContent = $('.content-life');

showLifeButton.on('click', function() {
    workContent.hide();
    lifeContent.css('display', 'flex');
});

showWorkButton.on('click', function() {
    lifeContent.hide();
    workContent.css('display', 'flex');
});

