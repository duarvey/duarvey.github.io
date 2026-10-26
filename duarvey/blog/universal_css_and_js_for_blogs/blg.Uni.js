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
const mainContent = $('main').get(0);
const scrollThreshold = 8;
let previousScrollY = window.scrollY;
let scrollDirection = 0;
let directionStartY = previousScrollY;

function handleScroll() {
    const currentScrollY = window.scrollY || (mainContent ? mainContent.scrollTop : 0);
    const scrollDifference = currentScrollY - previousScrollY;
    previousScrollY = currentScrollY;

    if (!mobileNav.matches) {
        sidebar.removeClass('mobile-hidden');
        mobileTopNav.removeClass('mobile-hidden');
        mobileTopDivider.removeClass('mobile-hidden');
        scrollDirection = 0;
        directionStartY = currentScrollY;
        return;
    }

    if (currentScrollY > 0 && scrollDifference > 0) {
        sidebar.addClass('mobile-hidden');
    } else if (scrollDifference < 0) {
        sidebar.removeClass('mobile-hidden');
    }

    if (currentScrollY <= 0) {
        sidebar.removeClass('mobile-hidden');
        mobileTopNav.removeClass('mobile-hidden');
        mobileTopDivider.removeClass('mobile-hidden');
        scrollDirection = 0;
        directionStartY = currentScrollY;
        return;
    }

    if (scrollDifference === 0) {
        return;
    }

    // Keep the navigation visible while its submenu is open.
    if (sidebar.find('.sub-menu.show').length) {
        sidebar.removeClass('mobile-hidden');
        mobileTopNav.removeClass('mobile-hidden');
        mobileTopDivider.removeClass('mobile-hidden');
        scrollDirection = 0;
        directionStartY = currentScrollY;
        return;
    }

    const currentDirection = Math.sign(scrollDifference);
    if (currentDirection !== scrollDirection) {
        scrollDirection = currentDirection;
        directionStartY = currentScrollY - scrollDifference;
    }

    if (Math.abs(currentScrollY - directionStartY) < scrollThreshold) {
        return;
    }

    if (currentDirection > 0) {
        mobileTopNav.addClass('mobile-hidden');
        mobileTopDivider.addClass('mobile-hidden');
    } else {
        mobileTopNav.removeClass('mobile-hidden');
        mobileTopDivider.removeClass('mobile-hidden');
    }
}

window.addEventListener('scroll', handleScroll, { passive: true });
window.addEventListener('resize', handleScroll);
if (mainContent) {
    mainContent.addEventListener('scroll', handleScroll, { passive: true });
}


/* code for text-size features */

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