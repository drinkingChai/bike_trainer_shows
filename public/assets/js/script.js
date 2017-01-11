// var lastX, lastY;
// $(document).on('touchstart', function(e) {
//   lastX = e.originalEvent.touches[0].clientX;
//   lastY = e.originalEvent.touches[0].clientY;
// })
// $(document).on('touchmove', function(e){
//      //prevent native touch activity like scrolling
//     //  console.log('test');
//     var currentX = e.originalEvent.touches[0].clientX,
//       currentY = e.originalEvent.touches[0].clientY;
//      if (currentX > lastX) {
//       //  console.log('move right');
//        e.preventDefault();
//      } else if (currentX < lastX) {
//       //  console.log('move left');
//      }
//      lastX = currentX;
//     //  e.preventDefault();
//
//     // if (currentY < lastY && $('.sort-filter').hasClass('visible')) {
//     //   if ($(e.target).closest('.show-card-parent').length == 1) {
//     //     e.preventDefault();
//     //
//     //   }
//     // }
//
// });











// $('.overlay').hide();
// $('#sort-close').hide();
//
// $("#sort-open, #sort-close, .overlay").click(function() {
//   var $sortFilter = $('.sort-filter > .inner');
//   if ($sortFilter.hasClass('right-zero')) {
//     $('.sort-filter > .inner').css('right', '-65%');
//   } else {
//     $('.sort-filter > .inner').css('right', 0);
//   }
//   $('#sort-close, #sort-open').toggle();
//   $('.sort-filter > .inner').toggleClass('right-zero');
//   $('.overlay').toggle();
//   $('.movie-cards .inner').toggleClass('prevent-scroll');
// })
