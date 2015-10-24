//--------------------------------------------------DETECT LANGUAGE
$(document).ready(function() {
  var findDupLang = [];
  
  $.each($('pre'), function() {
    var language = $(this).attr('language').toLowerCase();
    
    findDuplicates.push(language);
    
    for (a = 0; a < findDuplicates.length; a++) {
      if (!(findDuplicates.indexOf(language) > -1)) {
        loadJS('https://colorizor.github.io/Languages/' + language);
      }
    }
  });
});

//--------------------------------------------------LOAD LANGUAGE
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

//--------------------------------------------------LOAD THEME
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
