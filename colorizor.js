(function() {
  //----------------------------------------------------------------------------------------------------------
  //-----------------------------------------Load jQuery If Not Present---------------------------------------
  //----------------------------------------------------------------------------------------------------------
  if (typeof jQuery == 'undefined') {
    loadJS('https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js');
  }
  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------Wait For jQuery---------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  var waitForLoad = function() {
    if (typeof jQuery != 'undefined') {
      //----------------------------------------------------------------------------------------------------------
      //--------------------------------------------------LoadJS--------------------------------------------------
      //----------------------------------------------------------------------------------------------------------
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
      //----------------------------------------------------------------------------------------------------------
      //--------------------------------------------------LoadCSS-------------------------------------------------
      //----------------------------------------------------------------------------------------------------------
      function loadCSS(href, before, media, callback) {
        var ss = window.document.createElement('link');
        var ref = before || window.document.getElementsByTagName('script')[0];
        var sheets = window.document.styleSheets;
        ss.rel = 'stylesheet';
        ss.href = href;
        ss.media = 'only x';
        if (callback) {
          ss.onload = callback;
        }
        ref.parentNode.insertBefore(ss, ref);
        ss.onloadcssdefined = function(cb) {
          var defined;
          for (var i = 0; i < sheets.length; i++) {
            if (sheets[i].href && sheets[i].href.indexOf(href) > -1) {
              defined = true;
            }
          }
          if (defined) {
            cb();
          } else {
            setTimeout(function() {
              ss.onloadcssdefined(cb);
            });
          }
        };
        ss.onloadcssdefined(function() {
          ss.media = media || 'all';
        });
        return ss;
      }
      //----------------------------------------------------------------------------------------------------------
      //-----------------------------------------------Load Language----------------------------------------------
      //----------------------------------------------------------------------------------------------------------
      $.each($('pre'), function() {
        var language = $(this).attr('language');
        loadJS('https://colorizor.github.io/Languages/' + language + '.js');
      });
      //----------------------------------------------------------------------------------------------------------
      //------------------------------------------Checking URL Parameters-----------------------------------------
      //----------------------------------------------------------------------------------------------------------
      $.each($('script'), function() {
        var url = $(this).attr('src');
        if (url.match('colorizor.github.io/colorizor.js?theme=')) {
          var theme = url.split('theme=')[1];
          loadCSS('https://colorizor.github.io/Themes/' + theme.toLowerCase() + '.css');
        }
      });
    } else {
      window.setTimeout(waitForLoad, 60);
    }
  };
  window.setTimeout(waitForLoad, 60);
})();
