$("#sort-button").click(function() {
  var $sortFilter = $('.sort-filter > .inner');
  if ($sortFilter.hasClass('right-zero')) {
    $('.sort-filter > .inner').css('right', '-65%');
  } else {
    $('.sort-filter > .inner').css('right', 0);
  }
  $('.sort-filter > .inner').toggleClass('right-zero');
})
// $("#sort-button").toggle(
//   function() {
//     $('.sort-filter > .inner').css('right', 0);
//   },
//   function() {
//     $('.sort-filter > .inner').css('right', '-50%');
//   })
