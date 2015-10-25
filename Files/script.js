$(document).ready(function() {
  //------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------RegEx----------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------Clean
  var findChar = [/[#]/igm, /[/]/igm, /[=]/igm, /["]/igm, /[!]/igm, /[-]/igm];
  var cleanChar = [/[<]/igm, /[>]/igm, /[\t]/igm];
  var replaceChar = ['&lt;', '&gt;', '\s\s\s\s'];
  //--------------------------------------------------General
  var link = /(ftp|http|https):\/\/([\w0-9±!@#$%ˆ&*()_+§\-=[\]{}:;'|\\,.?/`˜]+)/igm;
  var color = /((rgba|rgb)\((([\d\s,.]+){1,3})\)|#([\w\d]){6}$)/igm;
  var regx = /\/(.*?)\/([igm]+)/igm;
  var units = /([^\D])([\d.]*?)(em|ex|%|px|cm|mm|in|pt|pc|ch|rem|vh|vw|vmin|vmax)/igm;
  //--------------------------------------------------CSS
  var cssCom = /(&#47;\*.*|(.*?)([\w]+)(?=\n([\s\S]*?)\*&#47;)|(.*?)\*&#47;)/igm;
  var cssSel = /(^|,.+)([\w]+)(?=.+{)/igm;
  var cssSelExt = /:([\w]+)(?=.+{)/igm;
  var cssProp = /(?!.+{)(([\w]|&#45;)+)(?=:(.*?);)/igm;
  var cssVal = /:([\s\S].+);/igm;
  //--------------------------------------------------C++
  var cPP = [
    ['<span id="comment">$&</span>', /((\\\/\*).*|(\*\*.*)(?=.*\n(\*\*|.*\*\\\/))|.*(\*\\\/))/igm],
    ['<span id="value">$&</span>', /(?!.*(\\"|'))([\w]+)(?=\.([\w]+).*\(.*\))/igm],
    ['<span id="selector">$&</span>', /(([\w]+)(\s|\S)\(|\))(?!(.*?)\n\*(\*|\\\/))/igm],
    ['<span id="attribute">$&</span>', /\\#([\w]+).*/igm],
    ['<span id="parameter">$&</span>', /(\\"(.*?)\\"|'(.*?)')(?!(.*?)\n\*(\*|\\\/))/igm]
  ];
  //--------------------------------------------------Delphi
  var delphiCom = /(({|&#47;).*|(.*?)([\w]+)(?=\n([\s\S]*?)})|(.*?)})/igm;
  var delphiSel = /(([\w]+)\(|\))/igm;
  var delphiAtt = /(?!.*')([\w]+)(?=\.)/igm;
  var delphiVal = /([:](\s|\S))([\w]+)(?=[;)])/igm;
  var delphiText = /'(.*?)'/igm;
  //--------------------------------------------------HTML
  var htmlCom = /(&lt;&#33;&#45;&#45;.*|(.*?)([\w]+)(?=\n([\s\S]*?)&#45;&#45;&gt;)|(.*?)&#45;&#45;&gt;)/igm;
  var htmlTag = /((&lt;&#33;|&lt;|&lt;&#47;)([\w]+)(&gt;|\S|(\s&#47;&gt;|&#47;&gt;))|&gt;)/igm;
  var htmlAtt = /([\S]+)&#61;(?=&#34;([\s\S]*?)&#34;)/igm;
  var htmlVal = /&#34;([\s\S]*?)&#34;/igm;
  var htmlPar = /\s([\w]+)(?=<span)/igm;
  var htmlFixA = /&#45;&#45;<span id="selector">&#62;<\/span>/igm;
  //--------------------------------------------------JavaScript
  var jsCom = /&#47;&#47;.*/igm;
  var jsText = /(&#34;(.*?)&#34;|'(.*?)')/igm;
  var jsSel = /(?!\$\()([\w]+)(?=\)\.)/igm;
  var jsVal = /(([\w]+)\s(?=([\w]+)\(\)(.*?){)|var)/igm;
  var jsChar = /((?!(function)\s)([\w]+)\(\)(?=(.*?){)|((\$|\.([\w]+))(.*?)|([\w]+))\(|(?!(.*?){)\)|\)(?=,))/igm;

  //------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------Colour---------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  $.each($('pre'), function() {
    //--------------------------------------------------SCREEN
    if (screen.width < 1024) {
      $(this).width(screen.width - 40);
    }
    
    //--------------------------------------------------VARIABLES
    var str = $(this).html();
    var lang = $(this).attr('language');
    
    //--------------------------------------------------REPLACE
    str = str.replace(cleanChar[0], replaceChar[0]);
    str = str.replace(cleanChar[1], replaceChar[1]);
    str = str.replace(cleanChar[2], replaceChar[2]);
    
    for (a = 0; a < findChar.length; a++) {
      str = str.replace(findChar[a], '\\$&');
    }
    
    //--------------------------------------------------FIND
    //CSS
    if (lang = 'css') {
      for (a = 0; a < css.length; a++) {
        str = str.replace(css[a][1], '<span id="' + css[a][0] + '">$&</span>');
      }
    }
    //C++
    if (lang = 'c++') {
      for (a = 0; a < cPP.length; a++) {
        str = str.replace(cPP[a][1], '<span id="' + cPP[a][0] + '">$&</span>');
      }
    }
    //Delphi
    if (lang = 'delphi') {
      for (a = 0; a < delphi.length; a++) {
        str = str.replace(delphi[a][1], '<span id="' + delphi[a][0] + '">$&</span>');
      }
    }
    //HTML
    if (lang = 'html') {
      for (a = 0; a < html.length; a++) {
        str = str.replace(html[a][1], '<span id="' + html[a][0] + '">$&</span>');
      }
    }
    //JavaScript
    if (lang = 'javascript') {
      for (a = 0; a < javascript.length; a++) {
        str = str.replace(javascript[a][1], javascript[a][0]);
      }
    }
    
    //--------------------------------------------------CLEAN
    str = str.replace(/\\/igm, '');
    
    //--------------------------------------------------SPLIT
    str = str.replace(/([\s\S]+)/igm, '<span id="all-number"></span><span id="all-code">$&</span>');
    
    //--------------------------------------------------SAVE
    $(this).html(str);
  });
  
  //----------------------------------------------NUMBERING
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

  //----------------------------------------------FEATURES
  $.each($('pre, span'), function() {
    var str = $(this).html();
    
    str = str.replace(link, '<a id="link" href="$&" target="_blank">$&</a>');
    str = str.replace(color, '<span style="color: $&;">$&</span>');
    str = str.replace(regx, '<span id="regx">$&</span>');
    str = str.replace(units, '<span id="units">$&</span>');
    
    $(this).html(str);
  });

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
