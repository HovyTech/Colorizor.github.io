$(document).ready(function() {
  //------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------RegEx----------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------Clean
  var clean = [/&lt;/igm, /&gt;/igm, /[/]/igm, /[=]/igm, /["]/igm, /[!]/igm, /[-]/igm, /[\t]/igm];
  var rep = ['&#60;', '&#62;', '&#47;', '&#61;', '&#34;', '&#33;', '&#45;', '\s\s\s\s'];
  //--------------------------------------------------General
  var link = /(ftp|http|https):\/\/([\w0-9±!@#$%ˆ&*()_+§\-=[\]{}:;'|\\,.?/`˜]+)/igm;
  var color = /(rgb|rgba|#)([(0-9a-zA-Z,)].+)(?=(.*?);)/igm;
  var regx = /&#47;(.*?)&#47;([igm]+)/igm;
  var units = /([^\D])([\d.]*?)(em|ex|%|px|cm|mm|in|pt|pc|ch|rem|vh|vw|vmin|vmax)/igm;
  //--------------------------------------------------HTML
  var htmlCom = /(&#60;&#33;&#45;&#45;.*|(.*?)([\w]+)(?=\n([\s\S]*?)&#45;&#45;&#62;)|(.*?)&#45;&#45;&#62;)/igm;
  var htmlTag = /((&#60;&#33;|&#60;|&#60;&#47;)([\w]+)(&#62;|\S|(\s&#47;&#62;|&#47;&#62;))|&#62;)/igm;
  var htmlAtt = /([\S]+)&#61;(?=&#34;([\s\S]*?)&#34;)/igm;
  var htmlVal = /&#34;([\s\S]*?)&#34;/igm;
  var htmlPar = /\s([\w]+)(?=<span)/igm;
  var htmlFixA = /&#45;&#45;<span id="selector">&#62;<\/span>/igm;
  //--------------------------------------------------CSS
  var cssCom = /(&#47;\*.*|(.*?)([\w]+)(?=\n([\s\S]*?)\*&#47;)|(.*?)\*&#47;)/igm;
  var cssSel = /(^|,.+)([\w]+)(?=.+{)/igm;
  var cssSelExt = /:([\w]+)(?=.+{)/igm;
  var cssProp = /(?!.+{)(([\w]|&#45;)+)(?=:(.*?);)/igm;
  var cssVal = /:([\s\S].+);/igm;
  //--------------------------------------------------JavaScript
  var jsCom = /&#47;&#47;.*/igm;
  var jsText = /(&#34;(.*?)&#34;|'(.*?)')/igm;
  var jsSel = /(?!\$\()([\w]+)(?=\)\.)/igm;
  var jsVal = /(([\w]+)\s(?=([\w]+)\(\)(.*?){)|var)/igm;
  var jsChar = /((?!(function)\s)([\w]+)\(\)(?=(.*?){)|((\$|\.([\w]+))(.*?)|([\w]+))\(|(?!(.*?){)\)|\)(?=,))/igm;
  //--------------------------------------------------Delphi
  var delphiCom = /(({|&#47;).*|(.*?)([\w]+)(?=\n([\s\S]*?)})|(.*?)})/igm;
  var delphiSel = /(([\w]+)\(|\))/igm;
  var delphiAtt = /(?!.*')([\w]+)(?=\.)/igm;
  var delphiVal = /([:](\s|\S))([\w]+)(?=[;)])/igm;
  var delphiText = /'(.*?)'/igm;
  //--------------------------------------------------C++
  var cPPCom = /((&#47;\*).*|(\*\*.*)(?=.*\n(\*\*|.*\*&#47;))|.*(\*&#47;))/igm;
  var cPPSel = /(([\w]+)(\s|\S)\(|\))/igm;
  var cPPAtt = /#([\w]+).*/igm;
  var cPPVal = /(?!.*(&#34;|'))([\w]+)(?=\.([\w]+).*\(.*\))/igm;
  var cPPText = /(&#34;(.*?)&#34;|'(.*?)')/igm;

  //------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------Clean Up--------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------DIFFERENT DEVICES
  if (screen.width < 1024) {
    $('pre').width(screen.width - 40);
  }

  //--------------------------------------------------HTML
  $.each($('pre[language="html"]'), function() {
    //-------------------------Get Text
    var str = $(this).html();

    for (a = 0; a < clean.length; a++) {
      str = str.replace(clean[a], rep[a]);
    }

    //-------------------------Wrap Matching Text
    str = str.replace(htmlCom, '<span id="comment">$&</span>');
    str = str.replace(htmlTag, '<span id="selector">$&</span>');
    str = str.replace(htmlAtt, '<span id="attribute">$&</span>');
    str = str.replace(htmlVal, '<span id="value">$&</span>');
    str = str.replace(htmlPar, '<span id="parameter">$&</span>');
    str = str.replace(htmlFixA, '&#45;&#45;&#62;');

    //-------------------------Insert Coloured Text
    $(this).html(str);
  });

  //--------------------------------------------------CSS
  $.each($('pre[language="css"]'), function() {
    //-------------------------Get Text
    var str = $(this).html();

    for (a = 0; a < clean.length; a++) {
      str = str.replace(clean[a], rep[a]);
    }

    //-------------------------Wrap Matching Text
    str = str.replace(cssCom, '<span id="comment">$&</span>');
    str = str.replace(cssSel, '<span id="selector">$&</span>');
    str = str.replace(cssSelExt, '</span><span id="parameter">$&</span>');
    str = str.replace(cssProp, '<span id="attribute">$&</span>');
    str = str.replace(cssVal, '<span id="value">$&</span>');

    //-------------------------Insert Coloured Text
    $(this).html(str);
  });

  //--------------------------------------------------JavaScript
  $.each($('pre[language="javascript"]'), function() {
    //-------------------------Get Text
    var str = $(this).html();

    for (a = 0; a < clean.length; a++) {
      str = str.replace(clean[a], rep[a]);
    }

    //-------------------------Wrap Matching Text
    str = str.replace(jsCom, '<span id="comment">$&</span>');
    str = str.replace(jsText, '<span id="value">$&</span>');
    str = str.replace(jsSel, '<span id="parameter">$&</span>');
    str = str.replace(jsVal, '<span id="attribute">$&</span>');
    str = str.replace(jsChar, '<span id="selector">$&</span>');

    //-------------------------Insert Coloured Text
    $(this).html(str);
  });
  
  //--------------------------------------------------Delphi
  $.each($('pre[language="delphi"]'), function() {
    //-------------------------Get Text
    var str = $(this).html();

    for (a = 0; a < clean.length; a++) {
      str = str.replace(clean[a], rep[a]);
    }

    //-------------------------Wrap Matching Text
    str = str.replace(delphiCom, '<span id="comment">$&</span>');
    str = str.replace(delphiSel, '<span id="selector">$&</span>');
    str = str.replace(delphiAtt, '<span id="attribute">$&</span>');
    str = str.replace(delphiVal, '<span id="value">$&</span>');
    str = str.replace(delphiText, '<span id="parameter">$&</span>');

    //-------------------------Insert Coloured Text
    $(this).html(str);
  });
  
  //--------------------------------------------------C++
  $.each($('pre[language="c++"]'), function() {
    //-------------------------Get Text
    var str = $(this).html();

    for (a = 0; a < clean.length; a++) {
      str = str.replace(clean[a], rep[a]);
    }

    //-------------------------Wrap Matching Text
    str = str.replace(cPPCom, '<span id="comment">$&</span>');
    str = str.replace(cPPSel, '<span id="selector">$&</span>');
    str = str.replace(cPPAtt, '<span id="attribute">$&</span>');
    str = str.replace(cPPVal, '<span id="value">$&</span>');
    str = str.replace(cPPText, '<span id="parameter">$&</span>');

    //-------------------------Insert Coloured Text
    $(this).html(str);
  });

  //----------------------------------------------Features
  $.each($('pre, span'), function() {
    var extraStr = $(this).html();
    extraStr = extraStr.replace(link, '<a id="link" href="$&" target="_blank">$&</a>');
    extraStr = extraStr.replace(color, '<span style="color: $&;">$&</span>');
    extraStr = extraStr.replace(regx, '<span id="regx">$&</span>');
    extraStr = extraStr.replace(units, '<span id="units">$&</span>');
    $(this).html(extraStr);
  });

  //----------------------------------------------Numbering
  $.each($('pre'), function() {
    var preStr = $(this).html();
    preStr = preStr.replace(/([\s\S]+)/igm, '<span id="all-number"></span><span id="all-code">$&</span>');
    $(this).html(preStr);
  });

  $.each($('span[id="all-code"]'), function(line) {
    $(this).html(function(index, html) {
      return html.replace(/(^\n|.+)/igm, '<span id="code">$&</span>');
    });
    
    line = 0;
    
    $.each($(this).find('span[id="code"]'), function() {
      line++;
      var spanParent = $($(this).parent().parent().find('span[id="all-number"]')).html();
      $($(this).parent().parent().find('span[id="all-number"]')).html(spanParent + '<span id="number">' + line + '</span>\n');
    });
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
