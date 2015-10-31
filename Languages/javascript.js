$(function() {
  //------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------RegEx----------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  //CLEAN
  var findChar = [/[\#]/igm, /[\/]/igm, /[\=]/igm, /[\"]/igm, /[\!]/igm, /[\-]/igm];
  var cleanChar = [/[\<]/igm, /[\>]/igm, /[\t]/igm];
  var replaceChar = ['&lt;', '&gt;', '\s\s\s\s'];
  //FEATURES
  var features = [
    ['<a id="link" href="$&" target="_blank">$&</a>', /(ftp|http|https)\:\/\/([\w\d\W]*?)(?=(\s|\"|\'))/igm],
    ['<span style="color: $&;">$&</span>', /((rgba|rgb)\((([\d\s\,\.]+){1,3})\)|\#([\w\d]){6}$)/igm],
    ['<span id="units">$&</span>', /([^\D])([\d.]*?)(em|ex|%|px|cm|mm|in|pt|pc|ch|rem|vh|vw|vmin|vmax)/igm]
  ];
  var javascript = [
    ['<span id="comment">$&</span>', /\\\/\\\/.*/igm],
    ['<span id="value">$&</span>', /(\\\"(.*?)\\\"|\\\'(.*?)\\\')/igm],
    ['<span id="parameter">$&</span>', /(?!\$\()([\w]+)(?=\)\.)/igm],
    ['<span id="attribute">$&</span>', /(([\w]+)\s(?=([\w]+)\(\)(.*?)\{)|var)/igm],
    ['<span id="selector">$&</span>', /((?!(function)\s)([\w]+)\(\)(?=(.*?)\{)|((\$|\.([\w]+))(.*?)|([\w]+))\(|(?!(.*?)\{)\)|\)(?=\,))/igm]
  ];
  
  //------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------SCREEN---------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  $.each($('pre[language="javascript"]'), function() {
    $(this).width(screen.width);
  });
  
  //------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------REPLACE--------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  $.each($('pre[language="javascript"]'), function() {
    var str = $(this).html();
    str = str.replace(cleanChar[0], replaceChar[0]);
    str = str.replace(cleanChar[1], replaceChar[1]);
    str = str.replace(cleanChar[2], replaceChar[2]);
    for (a = 0; a < findChar.length; a++) {
      str = str.replace(findChar[a], '\\$&');
    }
    $(this).html(str);
  });
  
  //------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------Colour---------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  $.each($('pre[language="javascript"]'), function() {
    var str = $(this).html();
    for (a = 0; a < javascript.length; a++) {
      str = str.replace(javascript[a][1], javascript[a][0]);
    }
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
    str = str.replace(/([\s\S]+)/igm, '<span id="all-number-javascript"></span><span id="all-code-javascript">$&</span>');
    $(this).html(str);
  });
  
  //------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------NUMBERING-------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  $.each($('span[id="all-code-javascript"]'), function(line) {
    $(this).html(function(index, html) {
      return html.replace(/(^\n|.+)/igm, '<span id="code-javascript">$&</span>');
    });
    
    line = 0;
    
    $.each($(this).find('span[id="code-javascript"]'), function() {
      line++;
      var str = $($(this).parent().parent().find('span[id="all-number-javascript"]')).html();
      $($(this).parent().parent().find('span[id="all-number-javascript"]')).html(str + '<span id="number-javascript">' + line + '</span>\n');
    });
  });
  
  //------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------FEATURES--------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  //SPAN
  $.each($('pre[language="javascript"]'), function() {
    var str = $(this).html();
    for (a = 0; a < features.length; a++) {
      str = str.replace(features[a][1], features[a][0]);
    }
    $(this).html(str);
  });
  //CLICK
  $('span[id="all-code-javascript"]').click(function() {
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
