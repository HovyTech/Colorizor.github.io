//------------------------------------------------------------------------------------------------------------
//----------------------------------------------DETECT LANGUAGE-----------------------------------------------
//------------------------------------------------------------------------------------------------------------
$(function() {
  var findDuplicates = [];
  
  //----------------------------------------------FINDING LANGUAGE
  $.each($('pre'), function() {
    var language = $(this).attr('language');
    
    findDuplicates.push(language);
    
    if (findDuplicates.indexOf(language) > -1) {
      loadJS('https://colorizor.github.io/Languages/' + language + '.js');
    }
  });
});

//------------------------------------------------------------------------------------------------------------
//------------------------------------------------PAGE LOADED-------------------------------------------------
//------------------------------------------------------------------------------------------------------------
$(window).load(function() {
  var link = /(ftp|http|https):\/\/([\w0-9±!@#$%ˆ&*()_+§\-=[\]{}:;|\\,.?/`˜]+)/igm;
  var color = /(rgb|rgba|#)([(0-9a-zA-Z,)].+)(?=(.*?);)/igm;
  var regx = /&#47;(.*?)&#47;([igm]+)/igm;
  var units = /([^\D])([\d.]*?)(em|ex|%|px|cm|mm|in|pt|pc|ch|rem|vh|vw|vmin|vmax)/igm;
  
  //----------------------------------------------SCREEN SIZE
  if (screen.width < 1024) {
    $('pre').width(screen.width - 40);
  }
  
  //----------------------------------------------FEATURES
  $.each($('pre, span'), function() {
    var extraStr = $(this).html();
    extraStr = extraStr.replace(link, '<a id="link" href="$&" target="_blank">$&</a>');
    extraStr = extraStr.replace(color, '<span style="color: $&;">$&</span>');
    extraStr = extraStr.replace(regx, '<span id="regx">$&</span>');
    extraStr = extraStr.replace(units, '<span id="units">$&</span>');
    $(this).html(extraStr);
  });
  
  //----------------------------------------------NUMBERING
  $.each($('pre'), function() {
    var preStr = $(this).html();
    preStr = preStr.replace(/([\s\S]+)/igm, '<span id="all-number"></span><span id="all-code">$&</span>');
    $(this).html(preStr);
  });
  
  $.each($('span[id="all-code"]'), function(line) {
    $(this).html(function(index, html) {
      return html.replace(/.+/igm, '<span id="code">$&</span>');
    });
    
    line = 0;
    
    $($(this).find('span[id="code"]')).html(function(index, html) {
      line++;
      var spanParent = $($(this).parent().parent().find('span[id="all-number"]')).html();
      $($(this).parent().parent().find('span[id="all-number"]')).html(spanParent + '<span id="number">' + line + '</span>\n');
    });
  });
  
  //----------------------------------------------SELECT CODE
  $('span[id="all-code"]').click(function() {
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
});

//------------------------------------------------------------------------------------------------------------
//-----------------------------------------------LOAD LANGUAGE------------------------------------------------
//------------------------------------------------------------------------------------------------------------
function loadJS(src, cb) {
  'use strict';
  var ref = window.document.getElementsByTagName('script')[0];
  var script = window.document.createElement('script');
  script.src = src;
  script.async = true;
  ref.parentNode.insertBefore(script, ref);
  if (cb && typeof(cb) === 'function') {
    script.onload = cb;
  }
  return script;
}

//------------------------------------------------------------------------------------------------------------
//-------------------------------------------------LOAD THEME-------------------------------------------------
//------------------------------------------------------------------------------------------------------------
//function loadCSS(href, before, media, callback) {
  //'use strict';
  //var ss = window.document.createElement('link');
  //var ref = before || window.document.getElementsByTagName('script')[0];
  //var sheets = window.document.styleSheets;
  //ss.rel = 'stylesheet';
  //ss.href = href;
  //ss.media = 'only x';
  //if (callback) {
    //ss.onload = callback;
  //}
  //ref.parentNode.insertBefore(ss, ref);
  //ss.onloadcssdefined = function(cb) {
    //var defined;
    //for (var i = 0; i < sheets.length; i++) {
      //if (sheets[i].href && sheets[i].href.indexOf(href) > -1) {
        //defined = true;
      //}
    //}
    //if (defined) {
      //cb();
    //} else {
      //setTimeout(function() {
        //ss.onloadcssdefined(cb);
      //});
    //}
  //};
  //ss.onloadcssdefined(function() {
    //ss.media = media || 'all';
  //});
  //return ss;
//}
