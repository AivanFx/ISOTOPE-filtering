// THIS WILL LOAD FIRST
$(document).ready(function () {

  //FUNCTION TO SHOW FILTER LEFT BAR
  $('.aside__enable-filter-button').click(function () {
    $(".aside").css({
      display: "block"
    });
    $(".aside__enable-filter-button").css({
      cursor: "auto",
      background: "#3c6df1",
      color: "white"
    });
    $(".aside__filter-button").css({
      cursor: "pointer"
    });
    $(".aside__disable-filter-button").css({
      cursor: "pointer"
    });
  });

    //FUNCTION TO HIDE FILTER LEFT BAR
  $('.aside__disable-filter-button').click(function () {
    $(".aside__enable-filter-button").css({
      cursor: "pointer",
      background: "white",
      color: "#3c6df1"
    });
    $(".aside__filter-button").css({
      cursor: "auto"
    });
    $(".aside__disable-filter-button").css({
      cursor: "auto"
    });
  });

  // FILTER BOX ANIMATION - SHOW
  $('.aside__enable-filter-button').click(function() {
    $(".aside").animate({
    "opacity" : "1",
      "width": "300px"
    }, 400);
  });

   // FILTER BOX ANIMATION - HIDE
  $('.aside__disable-filter-button').click(function() {
    $(".aside").animate({
    "opacity" : "0",
      "width": "180px"
    }, 400);
  });

  //VARS FOR THE FILTERING PROCESS
  var searchItemLeftBar; 
  var searchItemTopBar;
  var buttonFilter;

  var $mainElement = $('.main').isotope({
    itemSelector: '.main__element',
    layoutMode: 'fitRows',
    filter: function () {

      var $this = $(this);
      var searchResultLeftBar = searchItemLeftBar ? $this.text().match(searchItemLeftBar) : true;
      var searchResultTopBar = searchItemTopBar ? $this.text().match(searchItemTopBar) : true;
      var buttonResult = buttonFilter ? $this.is(buttonFilter) : true;
      return searchResultLeftBar && buttonResult && searchResultTopBar;
    }
  });

  // USE BUTTON TO FILTER ELEMENTS FROM THE TOP BAR
  $('.nav').on('click', 'button', function () {
    buttonFilter = $(this).attr('data-filter');
    $mainElement.isotope();
  });

  // USE BUTTON TO FILTER ELEMENTS FROM THE LEFT BAR
  $('.aside__filter').on('click', 'button', function () {
    buttonFilter = $(this).attr('data-filter');
    $mainElement.isotope();
  });

  // FILTER USING THE INPUT VALUE FROM THE LEFT BAR
  var $searchElementLeftBar = $('.aside__search-filter').keyup(debounce(function () {
    searchItemLeftBar = new RegExp($searchElementLeftBar.val(), 'gi');
    $mainElement.isotope();
  }));

  //FILTER USING THE INPUT VALUE FROM THE SEARCH BAR WHEN > 800px
  var $searchElementTopBar = $('.main__search-filter').keyup(debounce(function () {
    searchItemTopBar = new RegExp($searchElementTopBar.val(), 'gi');
    $mainElement.isotope();
  }));

  //DEBOUNCE FUNCTION TO PREVENT FROM HAPPENING EVERY MILLISECOND
  function debounce(fn, threshold) {
    var timeout;
    threshold = threshold || 100;
    return function debounced() {
      clearTimeout(timeout);
      var args = arguments;
      var _this = this;
      function delayed() {
        fn.apply(_this, args);
      }
      timeout = setTimeout(delayed, threshold);
    };
  }

  //CHANGE CLASSES TO 'IS-CHECKED' WHEN SELECTING AN OPTION FROM TOP BAR
  $('.nav__button-isChecked').each(function (i, buttonIsChecked) {
    var $buttonIsChecked = $(buttonIsChecked);
    $buttonIsChecked.on('click', 'button', function () {
      $buttonIsChecked.find('.is-checked').removeClass('is-checked');
      $(this).addClass('is-checked');
    });
  });

  //CHANGE CLASSES TO 'IS-CHECKED' WHEN SELECTING AN OPTION FROM LEFT BAR
  $('.aside__button-isChecked').each(function (i, buttonIsChecked) {
    var $buttonIsChecked = $(buttonIsChecked);
    $buttonIsChecked.on('click', 'button', function () {
      $buttonIsChecked.find('.is-checked').removeClass('is-checked');
      $(this).addClass('is-checked');
    });
  });

});