//----------------------------------------------------------------------------------------------------------
//-------------------------------------------------Colorizor------------------------------------------------
//----------------------------------------------------------------------------------------------------------
(function() {
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
        var path = /colorizor\.github\.io\/colorizor\.js\?theme\=/igm;
        if (path.test(url)) {
          var theme = url.split('theme=')[1];
          loadCSS('https://colorizor.github.io/Themes/' + theme.toLowerCase() + '.css');
        }
      });
    } else {
      window.setTimeout(waitForLoad, 60);
    }
  };
  window.setTimeout(waitForLoad, 60);
});
//----------------------------------------------------------------------------------------------------------
//----------------------------------------------Regex Lookbehind--------------------------------------------
//----------------------------------------------------------------------------------------------------------
(function(XRegExp) {
  function prepareLb(lb) {
    var parts = /^((?:\(\?[\w$]+\))?)\(\?<([=!])([\s\S]*)\)$/.exec(lb);
    return {
      lb: XRegExp(parts ? parts[1] + "(?:" + parts[3] + ")$(?!\\s)" : lb),
      type: parts ? parts[2] === "=" : !parts
    };
  }
  XRegExp.replaceLb = function(str, lb, regex, replacement) {
    var output = "", pos = 0, lastEnd = 0, match, leftContext;
    lb = prepareLb(lb);
    while (match = XRegExp.exec(str, regex, pos)) {
      leftContext = str.slice(0, match.index);
      if (lb.type === lb.lb.test(leftContext)) {
        output += str.slice(lastEnd, match.index) + XRegExp.replace(match[0], regex, replacement);
        lastEnd = match.index + match[0].length;
        if (!regex.global) {
          break;
        }
        pos = match.index + (match[0].length || 1);
      } else {
        pos = match.index + 1;
      }
    }
    return output + str.slice(lastEnd);
  };
});
