/*
GreedyNav.js - http://lukejacksonn.com/actuate
Licensed under the MIT license - http://opensource.org/licenses/MIT
Copyright (c) 2015 Luke Jackson
*/
/*Adjusted to vertical menu*/

$(function() {

  var $btn = $('.nav.greedy button');
  var $vlinksWrap = $('.nav.greedy');
  var $vlinks = $('.nav.greedy .links');
  var $secondarylinks = $('.nav.nav-secondary');
  var $hlinks = $('.nav.greedy .hidden-links');

  var numOfItems = 0;
  var totalSpace = 0;
  var closingTime = 1000;
  var breakHeights = [];

  // Get initial state
  $vlinks.children().each(function() {
    totalSpace += $(this).outerHeight(true);
    numOfItems += 1;
    breakHeights.push(totalSpace);
  });

  var availableSpace, numOfVisibleItems, requiredSpace, timer;

  function check() {

    if($(window).innerWidth() > 767) {
      // Get instant state
      availableSpace = $vlinksWrap.innerHeight() - $btn.outerHeight(true) - 10;
      numOfVisibleItems = $vlinks.children().length;
      requiredSpace = breakHeights[numOfVisibleItems - 1];

      // There is not enought space
      if (requiredSpace > availableSpace) {
        $vlinks.children().last().prependTo($hlinks);
        numOfVisibleItems -= 1;
        check();
        // There is more than enough space
      } else if (availableSpace > breakHeights[numOfVisibleItems]) {
        $hlinks.children().first().appendTo($vlinks);
        numOfVisibleItems += 1;
        check();
      }
      // Update the button accordingly
      $btn.attr("count", numOfItems - numOfVisibleItems);
      if (numOfVisibleItems === numOfItems) {
        $btn.addClass('hidden');
      } else $btn.removeClass('hidden');
    } else {
      //Small, put all items in hidden. show secondary.
      $vlinks.children(":not(.greedy-mobile)").appendTo($hlinks);
      $secondarylinks.children().appendTo($hlinks);
    }
  }

  // Window listeners
  $(window).resize(function() {
    check();
  });

  $btn.on('click', function() {
    $hlinks.toggleClass('hidden');
    $btn.toggleClass('active');
    clearTimeout(timer);
  });

  $hlinks.on('mouseleave', function() {
    // Mouse has left, start the timer
    timer = setTimeout(function() {
      $hlinks.addClass('hidden');
      $btn.removeClass('active');
    }, closingTime);
  }).on('mouseenter', function() {
    // Mouse is back, cancel the timer
    clearTimeout(timer);
  })

  check();

});