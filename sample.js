/* const track = $('.panel-track');
const button = $('#slide-button');

button.on('click', () => {
  track.toggleClass('show-stats');
  const showStats = track.hasClass('show-stats');
  button.text(showStats ? 'Back to about me' : 'Show stats');
}); */

$('#slide-button').on('click', function() {
    $(this).html('you clicked me!');
});