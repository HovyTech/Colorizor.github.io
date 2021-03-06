//--------------------------------------------------LOADING MAIN
$(document).ready(function(headerHeight, curScroll, imgPerc, imgPos, imgSize, factor) {
  if (screen.width < 480) {
    headerHeight = 150;
    imgPerc = 170;
  } else if (screen.width >= 480 && screen.width < 720) {
    headerHeight = 250;
    imgPerc = 140;
  } else if (screen.width >= 720 && screen.width < 1024) {
    headerHeight = 250;
    imgPerc = 120;
  } else {
    headerHeight = 400;
    imgPerc = 100;
  }
  
  $('header').css({
    'height': headerHeight + 'px'
  });
  
  curScroll = 0;
  factor = 3;

  $(window).scrollTop(0);

  $(window).scroll(function() {
    //Parallax
    if ($(window).scrollTop() >= 0) {
      imgPos = ($(window).scrollTop() / factor) * -1;
      $('#background').css({
        'background-position': 'center ' + imgPos + 'px'
      });
    } else {
      imgSize = imgPerc - ($(window).scrollTop() / factor);
      $('#background').css({
        'background-size': imgSize + '%'
      });
    }
    //Hide image at bottom
    if ($(window).scrollTop() > headerHeight + 100) {
      $('#background-cover').css({
        'display': 'block'
      });
    } else if ($(window).scrollTop() < headerHeight + 100) {
      $('#background-cover').css({
        'display': 'none'
      });
    }
  });
  
  if (screen.width < 1024) {
    $('pre').width(screen.width - 40);
  }
  
  $('span[id$="all-code"]').click(function() {
    var range, selection;

    if (window.getSelection && document.createRange) {
      selection = window.getSelection();
      range = document.createRange();
      range.selectNodeContents($(this)[0]);
      selection.removeAllRanges();
      selection.addRange(range);
    } else if (document.selection && document.body.createTextRange) {
      range = document.body.createTextRange();
      range.moveToElementText($(this)[0]);
      range.select();
    }
  });
  
  getFacebookCount();
  getTwitterCount();
  getPinterestCount();
  getLinkedInCount();
});

//--------------------------------------------------GET SOCIAL COUNTS
//function getFacebookCount() {
  //$.getJSON('https://graph.facebook.com/fql?q=SELECT%20like_count,%20total_count,%20share_count,%20click_count,%20comment_count%20FROM%20link_stat%20WHERE%20url%20=%20%22https://www.facebook.com/pages/Colorizor/479642585547376%22', function(data) {
    //var facebook = data.data[0].total_count;
    //$('#facebook-count').text(facebook);
  //});
//}
function getFacebookCount() {
  $.getJSON('https://graph.facebook.com/?id=https://colorizor.github.io', function(data) {
    var facebook = data.shares;
    $('#facebook-count').text(facebook);
  });
}
function getTwitterCount() {
  $.getJSON('https://cdn.api.twitter.com/1/urls/count.json?url=https://colorizor.github.io&callback=?', function(data) {
    var twitter = data.count;
    $('#twitter-count').text(twitter);
  });
}
function getPinterestCount() {
  $.getJSON('https://api.pinterest.com/v1/urls/count.json?callback%20&url=https://colorizor.github.io', function(data) {
    var pinterest = data.count;
    $('#pinterest-count').text(pinterest);
  });
}
function getLinkedInCount() {
  $.getJSON('https://www.linkedin.com/countserv/count/share?url=https://colorizor.github.io&callback=?', function(data) {
    var linkedin = data.count;
    $('#linkedin-count').text(linkedin);
  });
}
