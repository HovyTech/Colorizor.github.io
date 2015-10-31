$(document).ready(function(language) {
  function loadJS(src, cb) {
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
  $.each($('pre'), function() {
    language = $(this).attr('language');
    loadJS('https://colorizor.github.io/Language/' + language + '.js');
  });
});
