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
  var breakHeights = [];

  // Get initial state
  $vlinks.children().each(function() {
    totalSpace += $(this).outerHeight(true);
    numOfItems += 1;
    breakHeights.push(totalSpace);
  });

  var availableSpace, numOfVisibleItems, requiredSpace;

  function check() {

    if($(window).innerWidth() > 767) {
      //Put secondary items back on larger screen
      if($secondarylinks.children().length == 0) {
        $hlinks.children(".nav-secondary-item").appendTo($secondarylinks);
      }
      
      // Get instant state
      availableSpace = $vlinksWrap.innerHeight() - $btn.outerHeight(true) - 10;
      numOfVisibleItems = $vlinks.children().length;
      requiredSpace = breakHeights[numOfVisibleItems - 1];
      
      //Too Small
      if (requiredSpace > availableSpace) {
        $vlinks.children().last().prependTo($hlinks);
        numOfVisibleItems -= 1;
        check();
      //Expanded
      } else if (availableSpace > breakHeights[numOfVisibleItems]) {
        $hlinks.children().first().appendTo($vlinks);
        numOfVisibleItems += 1;
        check();
      }
      
      //Update button 
      $btn.attr("count", numOfItems - numOfVisibleItems);
      if (numOfVisibleItems === numOfItems) {
        $btn.addClass('hidden');
      } else {
        $btn.removeClass('hidden');
      }
    } else {
      //Small, put all items in hidden.
      if($secondarylinks.children().length > 0) {
        $vlinks.children().prependTo($hlinks);
        $secondarylinks.children().appendTo($hlinks);
      }
    }
  }

  // Window listeners
  $(window).resize(function() {
    check();
  });

  $btn.on('click', function() {
    $hlinks.toggleClass('hidden');
    $btn.toggleClass('active');
  });

  check();

});