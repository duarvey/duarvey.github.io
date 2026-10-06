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