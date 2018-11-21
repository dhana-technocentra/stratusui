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
  //Only run if nav visible
  if(!$('.navbar').is(':visible')) { return; }
  
  var $btn = $('.nav.greedy button');
  var $hlinks = $('.nav.greedy .hidden-links');
  var $vlinksWrap = $('.nav.greedy');
  var $vlinks = $('.nav.greedy .links');
  var $secondarylinks = $('.nav.nav-secondary');
  
  //Desktop
  if($(window).innerWidth() > 767) {
    $('.nav.hidden-links a').unbind('click'); 
    
    //Put secondary items back on larger screen
    if($secondarylinks.children().length == 0) {
      $hlinks.children(".nav-secondary-item").appendTo($secondarylinks);
    }
    
    //Re-set
    if(totalSpace == 0) {
      setup_navigation();
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
  } 
  //Mobile
  else {
    $btn.removeClass('hidden');
    
    //Small, put all items in hidden.
    $vlinks.children().prependTo($hlinks);
    
    if($secondarylinks.children().length > 0) {
      $secondarylinks.children().appendTo($hlinks);
    }
    
    
    $('.nav.hidden-links a').unbind('click');
    $('.nav.hidden-links a').on('click', function() {
      $hlinks.toggleClass('hidden');
      $btn.toggleClass('active');
    });
  
    
  }
}

function setup_navigation() {
  //Only run if nav visible
  if(!$('.navbar').is(':visible')) { return; }

  var $btn = $('.nav.greedy button');
  var $hlinks = $('.nav.greedy .hidden-links');
  var $vlinks = $('.nav.greedy .links');
  var $secondarylinks = $('.nav.nav-secondary');
  
  //Reset
  numOfItems = 0;
  totalSpace = 0;
  breakHeights = [];
  availableSpace = 0;
  numOfVisibleItems = 0;
  requiredSpace = 0;
  
  $hlinks.children(".nav-secondary-item").appendTo($secondarylinks);
  $hlinks.children().appendTo($vlinks);
  $btn.attr("count", 0);
  $btn.addClass('hidden');
  $btn.unbind('click');
  
  //Setup
  $vlinks.children().each(function() {
    totalSpace += $(this).outerHeight(true);
    numOfItems += 1;
    breakHeights.push(totalSpace);
  });
  
  $btn.on('click', function() {
    $hlinks.toggleClass('hidden');
    $btn.toggleClass('active');
  });
  
  $(document).on("click", function(e){
    if($btn.hasClass("active")) {
      if($(e.target).closest(".nav.greedy .hidden-links").length == 0 && $(e.target).closest(".nav.greedy button").length == 0){
        $hlinks.toggleClass('hidden');
        $btn.toggleClass('active');
      }
    }
  });
  
  /*console.log('setup_navigation running');
  console.log(totalSpace);
  console.log(numOfItems);
  console.log(breakHeights);*/
}

$(function() {
  // Window listeners
  $(window).resize(function() {
    check_navigation();
  });
});