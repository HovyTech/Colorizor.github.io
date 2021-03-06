(function() {
  //------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------RegEx----------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  //----------------------------------------------------CLEAN
  var findChar = [ 
    [/\W/igm, '\\$&'],
    [/ftp\\\:\\\/\\\//igm, 'ftp\\\_\\\_URLFIXFTP\\\_\\\_'],
    [/https\\\:\\\/\\\//igm, 'https\\\_\\\_URLFIXHTTPS\\\_\\\_'], 
    [/http\\\:\\\/\\\//igm, 'http\\\_\\\_URLFIXHTTP\\\_\\\_']
  ];
  //----------------------------------------------------REMOVE
  var removeChar = [ 
    [/\\\/\\\/([\s\S]*?)(?=\<\/span\>$)/igm, /(\<span([\s\S]*?)\>|\<\/span\>)/igm, ''],
    [/(\\\'|\\\")([\s\S]*?)(\\\'|\\\")/igm, /(\<span([\s\S]*?)\>|\<\/span\>)/igm, ''],
    [/([\d]+)(\<span([\s\S]*?)\>([\W]+)\<\/span\>)([\d]+)/igm, /(\<span([\s\S]*?)\>|\<\/span\>)/igm, '']
  ];
  //----------------------------------------------------FIX CHARACTERS
  var fixChar = [
    [/\\\&lt\\\;/igm, '<span id="character">&lt;</span>'],
    [/\\\&gt\\\;/igm, '<span id="character">&gt;</span>'],
    [/\\\&amp\\\;/igm, '<span id="character">&amp;</span>'],
    [/ftp\\\_\\\_URLFIXFTP\\\_\\\_/igm, 'ftp\\\:\\\/\\\/'],
    [/https\\\_\\\_URLFIXHTTPS\\\_\\\_/igm, 'https\\\:\\\/\\\/'],
    [/http\\\_\\\_URLFIXHTTP\\\_\\\_/igm, 'http\\\:\\\/\\\/']
  ];
  //----------------------------------------------------FEATURES
  var features = [
    ['<a id="link" href="$&" target="_blank">$&</a>', /(ftp|http|https)\:\/\/([\w\d\W]*?)(?=[\s\'\"\(\)\{\}\[\]])/igm],
    ['<span style="color: $&;">$&</span>', /((rgba|rgb|hsla|hsl)\((([\d\s\,\.\%]+){1,3})\)|\#([\w\d]){6})/igm]
  ];
  //----------------------------------------------------JAVASCRIPT
  var javascript = [
    ['<span id="comment">$&</span>', /\\\/\\\/([\s\S]*?)$/igm],
    ['<span id="value">$&</span>', /(\\\'|\\\")([\s\S]*?)(\\\'|\\\")/igm],
    ['<span id="reserved">$&</span>', /\b(abstract|arguments|boolean|break|byte|case|catch|char|class|const|continue|debugger|default|delete|do|double|else|enum|eval|export|extends|false|final|finally|float|for|function|goto|if|implements|import|in|instanceof|int|interface|let|long|native|new|null|package|private|protected|public|return|short|static|super|switch|synchronized|this|throw|throws|transient|true|try|typeof|var|void|volatile|while|with|yield)\b/igm],
    ['<span id="reserved">$&</span>', /\b(alert|all|anchor|anchors|area|assign|blur|button|checkbox|clearInterval|clearTimeout|clientInformation|close|closed|confirm|constructor|crypto|decodeURI|decodeURIComponent|defaultStatus|document|element|elements|embed|embeds|encodeURI|encodeURIComponent|escape|event|fileUpload|focus|form|forms|frame|innerHeight|innerWidth|layer|layers|link|location|mimeTypes|navigate|navigator|frames|frameRate|hidden|history|image|images|offscreenBuffering|open|opener|option|outerHeight|outerWidth|packages|pageXOffset|pageYOffset|parent|parseFloat|parseInt|password|plugin|prompt|propertyIsEnum|radio|reset|screenX|screenY|scroll|secure|select|self|setInterval|setTimeout|status|submit|taint|text|textarea|top|unescape|untaint|window)\b/igm],
    ['<span id="parameter">$&</span>', /\b(Array|Date|eval|function|hasOwnProperty|Infinity|isFinite|isNaN|isPrototypeOf|length|Math|NaN|name|Number|Object|prototype|String|toString|undefined|valueOf)\b/igm],
    ['<span id="parameter">$&</span>', /\b(onblur|onclick|onerror|onfocus|onkeydown|onkeypress|onkeyup|onmouseover|onload|onmouseup|onmousedown|onsubmit)\b/igm],
    ['<span id="selector">$&</span>', /\\\.([^\W\d]+)/igm],
    ['<span id="digit">$&</span>', /(([^\D])(([\d\.]*?))(em|ex|\\\%|px|cm|mm|in|pt|pc|ch|rem|vh|vw|vmin|vmax)|([\d\.]+)(?=\W))/igm],
    ['<span id="character">$&</span>', /(\\[^\w\s\n\'\"\&\_\;\<\>\/])+/igm]
  ];
  
  //------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------COLORIZING-------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  $.each($('pre[language="javascript"]'), function() {
    //------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------FETCH---------------------------------------------------
    //------------------------------------------------------------------------------------------------------------
    var str = $(this).html();
    //------------------------------------------------------------------------------------------------------------
    //---------------------------------------------------SIZING---------------------------------------------------
    //------------------------------------------------------------------------------------------------------------
    $(this).css({
      'height': 'auto',
      'left': '0px',
      'right': '0px',
      'width': 'auto'
    });
    //------------------------------------------------------------------------------------------------------------
    //---------------------------------------------------FINDING--------------------------------------------------
    //------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------FIND
    for (a = 0; a < findChar.length; a++) {
      str = str.replace(findChar[a][0], findChar[a][1]);
    }
    //----------------------------------------------------CODE
    for (a = 0; a < javascript.length; a++) {
      str = str.replace(javascript[a][1], javascript[a][0]);
    }
    //----------------------------------------------------REMOVE
    for (a = 0; a < removeChar.length; a++) {
      str = str.replace(removeChar[a][0], function(rep) {
        return rep.replace(removeChar[a][1], removeChar[a][2]);
      });
    }
    //----------------------------------------------------FIX
    for (a = 0; a < fixChar.length; a++) {
      str = str.replace(fixChar[a][0], fixChar[a][1]);
    }
    //------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------SAVE----------------------------------------------------
    //------------------------------------------------------------------------------------------------------------
    $(this).html(str);
  });
  
  //------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------CLEAN----------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  $.each($('pre[language="javascript"]'), function() {
    var str = $(this).html();
    str = str.replace(/\\/igm, '');
    $(this).html(str);
  });
  
  //------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------SPLIT----------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  $.each($('pre[language="javascript"]'), function() {
    var str = $(this).html();
    str = str.replace(/([\s\S]+)/igm, '<span id="all-number"></span><span id="all-code">$&</span>');
    $(this).html(str);
  });
  
  //------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------NUMBERING-------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  $.each($('pre[language="javascript"]').find('span[id="all-code"]'), function(line) {
    $(this).html(function(index, html) {
      return html.replace(/(^\n|.+)/igm, '<span id="code">$&</span>');
    });
    
    line = 0;
    
    $.each($(this).find('span[id="code"]'), function() {
      line++;
      var str = $($(this).parent().parent().find('span[id="all-number"]')).html();
      $($(this).parent().parent().find('span[id="all-number"]')).html(str + '<span id="number">' + line + '</span>\n');
    });
  });
  
  //------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------FEATURES--------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  //----------------------------------------------------SPAN
  $.each($('pre[language="javascript"]'), function() {
    var str = $(this).html();
    for (a = 0; a < features.length; a++) {
      str = str.replace(features[a][1], features[a][0]);
    }
    $(this).html(str);
  });
  //----------------------------------------------------CLICK
  $('pre[language="javascript"]').find('span[id="all-code"]').click(function() {
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
})();
