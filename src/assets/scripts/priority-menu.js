/*
GreedyNav.js - http://lukejacksonn.com/actuate
Licensed under the MIT license - http://opensource.org/licenses/MIT
Copyright (c) 2015 Luke Jackson
*/
/*Adjusted to vertical menu*/
var numOfItems = 0;
var totalSpace = 0;
var breakHeights = [];

// Get initial state
var availableSpace, numOfVisibleItems, requiredSpace;

function check_navigation() {
  var $btn = $('.nav.greedy button');
  var $hlinks = $('.nav.greedy .hidden-links');
  var $vlinksWrap = $('.nav.greedy');
  var $vlinks = $('.nav.greedy .links');
  var $secondarylinks = $('.nav.nav-secondary');
  
  if($(window).innerWidth() > 767) {
    //Put secondary items back on larger screen
    if($secondarylinks.children().length == 0) {
      $hlinks.children(".nav-secondary-item").appendTo($secondarylinks);
    }

    // Get instant state
    availableSpace = $vlinksWrap.innerHeight() - $btn.outerHeight(true) - 10;
    numOfVisibleItems = $vlinks.children().length;
    requiredSpace = breakHeights[numOfVisibleItems - 1];

    /*console.log('check_navigation running');
    console.log(availableSpace);
    console.log(numOfItems);
    console.log(numOfVisibleItems);
    console.log(requiredSpace);*/
    
    //Too Small
    if (requiredSpace > availableSpace) {
      $vlinks.children().last().prependTo($hlinks);
      numOfVisibleItems -= 1;
      check_navigation();
    //Expanded
    } else if (availableSpace > breakHeights[numOfVisibleItems]) {
      $hlinks.children().first().appendTo($vlinks);
      numOfVisibleItems += 1;
      check_navigation();
    }

    //Update button 
    $btn.attr("count", numOfItems - numOfVisibleItems);
    if (numOfVisibleItems === numOfItems) {
      $btn.addClass('hidden');
    } else {
      $btn.removeClass('hidden');
    }
  } else {
    $btn.removeClass('hidden');
    
    //Small, put all items in hidden.
    if($secondarylinks.children().length > 0) {
      $vlinks.children().prependTo($hlinks);
      $secondarylinks.children().appendTo($hlinks);
    }
  }
}

function setup_navigation() {
  $('.nav.greedy .links').children().each(function() {
    totalSpace += $(this).outerHeight(true);
    numOfItems += 1;
    breakHeights.push(totalSpace);
  });
  
  $('.nav.greedy button').on('click', function() {
    $('.nav.greedy .hidden-links').toggleClass('hidden');
    $('.nav.greedy button').toggleClass('active');
  });
  
  $(document).on("click", function(e){
    if($(".nav.greedy button").hasClass("active")) {
      if($(e.target).closest(".nav.greedy .hidden-links").length == 0 && $(e.target).closest(".nav.greedy button").length == 0){
        $('.nav.greedy .hidden-links').toggleClass('hidden');
        $('.nav.greedy button').toggleClass('active');
      }
    }
  });
}

$(function() {
  // Window listeners
  $(window).resize(function() {
    check_navigation();
  });
});