$(document).ready(function() {
  //------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------RegEx----------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  //CLEAN
  var findChar = [/[\#]/igm, /[\/]/igm, /[\=]/igm, /[\"]/igm, /[\!]/igm, /[\-]/igm];
  var cleanChar = [/[\<]/igm, /[\>]/igm, /[\t]/igm];
  var replaceChar = ['&lt;', '&gt;', '\s\s\s\s'];
  //FEATURES
  var features = [
    ['<a id="link" href="$&" target="_blank">$&</a>', /(ftp|http|https)\:\/\/([0-9\w\±\!\@\#\$\%\ˆ\&\*\(\)\_\+\§\-\=\[\]\{\}\:\;\'\|\\\,\.\?\/\`\˜]+)/igm],
    ['<span style="color: $&;">$&</span>', /((rgba|rgb)\((([\d\s\,\.]+){1,3})\)|\#([\w\d]){6}$)/igm],
    ['<span id="units">$&</span>', /([^\D])([\d.]*?)(em|ex|%|px|cm|mm|in|pt|pc|ch|rem|vh|vw|vmin|vmax)/igm]
  ];
  //CSS
  var css = [
    ['<span id="comment">$&</span>', /(\\\/\*.*|(.*?)([\w]+)(?=\n([\s\S]*?)\*\\\/)|(.*?)\*\\\/)/igm],
    ['<span id="selector">$&</span>', /(^|\,.+)([\w]+)(?=.+\{)/igm],
    ['</span><span id="parameter">$&</span>', /\:([\w]+)(?=.+\{)/igm],
    ['<span id="attribute">$&</span>', /(?!.+\{)(([\w]|\\\-)+)(?=\:(.*?)\;)/igm],
    ['<span id="value">$&</span>', /\:([\s\S].+)\;/igm]
  ];
  //C++
  var cpp = [
    ['<span id="comment">$&</span>', /((\\\/\*).*|(\*\*.*)(?=.*\n(\*\*|.*\*\\\/))|.*(\*\\\/))/igm],
    ['<span id="value">$&</span>', /(?!.*(\\\"|\\\'))([\w]+)(?=\.([\w]+).*\(.*\))/igm],
    ['<span id="selector">$&</span>', /(([\w]+)(\s|\S)\(|\))(?!(.*?)\n\*(\*|\\\/))/igm],
    ['<span id="attribute">$&</span>', /\\\#([\w]+).*/igm],
    ['<span id="parameter">$&</span>', /(\\\"(.*?)\\\"|\\\'(.*?)\\\')(?!(.*?)\n\*(\*|\\\/))/igm]
  ];
  //Delphi
  var delphi = [
    ['<span id="comment">$&</span>', /((\{|\\\/).*|(.*?)([\w]+)(?=\n([\s\S]*?)\})|(.*?)\})/igm],
    ['<span id="selector">$&</span>', /(([\w]+)\(|\))/igm],
    ['<span id="attribute">$&</span>', /(?!.*\\\')([\w]+)(?=\.)/igm],
    ['<span id="value">$&</span>', /([\:](\s|\S))([\w]+)(?=[\;\)])/igm],
    ['<span id="parameter">$&</span>', /\\\'(.*?)\\\'/igm]
  ];
  //HTML
  var html = [
    ['<span id="comment">$&</span>', /(&lt;\\\!\\\-\\\-.*|(.*?)([\w]+)(?=\n([\s\S]*?)\\\-\\\-&gt;)|(.*?)\\\-\\\-&gt;)/igm],
    ['<span id="selector">$&</span>', /((&lt;\\\!|&lt;|&lt;\\\/)([\w]+)(&gt;|\S|(\s\\\/&gt;|\\\/&gt;))|&gt;)/igm],
    ['<span id="attribute">$&</span>', /([\S]+)\\\=(?=\\\"([\s\S]*?)\\\")/igm],
    ['<span id="value">$&</span>', /\\\"([\s\S]*?)\\\"/igm],
    ['<span id="parameter">$&</span>', /\s([\w]+)(?=\<span)/igm],
    ['\\\-\\\-&gt;', /\\\-\\\-\<span\sid\=\"selector\"\>&gt;\<\/span\>/igm]
  ];
  //JavaScript
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
  $.each($('pre'), function() {
    if (screen.width < 1024) {
      $(this).width(screen.width - 40);
    }
  });
  
  //------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------REPLACE--------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  $.each($('pre'), function() {
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
  //CSS
  $.each($('pre[language="css"]'), function() {
    var str = $(this).html();
    for (a = 0; a < css.length; a++) {
      str = str.replace(css[a][1], css[a][0]);
    }
    $(this).html(str);
  });
  //C++
  $.each($('pre[language="c++"]'), function() {
    var str = $(this).html();
    for (a = 0; a < cpp.length; a++) {
      str = str.replace(cpp[a][1], cpp[a][0]);
    }
    $(this).html(str);
  });
  //Delphi
  $.each($('pre[language="delphi"]'), function() {
    var str = $(this).html();
    for (a = 0; a < delphi.length; a++) {
      str = str.replace(delphi[a][1], delphi[a][0]);
    }
    $(this).html(str);
  });
  //HTML
  $.each($('pre[language="html"]'), function() {
    var str = $(this).html();
    for (a = 0; a < html.length; a++) {
      str = str.replace(html[a][1], html[a][0]);
    }
    $(this).html(str);
  });
  //JavaScript
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
  $.each($('pre'), function() {
    var str = $(this).html();
    str = str.replace(/\\/igm, '');
    $(this).html(str);
  });
  
  //------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------SPLIT----------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  $.each($('pre'), function() {
    var str = $(this).html();
    str = str.replace(/([\s\S]+)/igm, '<span id="all-number"></span><span id="all-code">$&</span>');
    $(this).html(str);
  });
  
  //------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------NUMBERING-------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  $.each($('span[id="all-code"]'), function(line) {
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
  //SPAN
  $.each($('pre, span'), function() {
    var str = $(this).html();
    for (a = 0; a < features.length; a++) {
      str = str.replace(features[a][1], features[a][0]);
    }
    $(this).html(str);
  });
  //CLICK
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
