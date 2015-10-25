$(document).ready(function() {
  //------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------RegEx----------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------Clean
  var clean = [/</igm, />/igm, /#/igm, /[/]/igm, /[=]/igm, /["]/igm, /[!]/igm, /[-]/igm, /[\t]/igm];
  var rep = ['&lt;', '&gt;', '&#35;', '&#47;', '&#61;', '&#34;', '&#33;', '&#45;', '\s\s\s\s'];
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
  var cPPCom = /((&#47;\*).*|(\*\*.*)(?=.*\n(\*\*|.*\*&#47;))|.*(\*&#47;))/igm;
  var cPPSel = /(([\w]+)(\s|\S)\(|\))/igm;
  var cPPAtt = /&#35;([\w]+).*/igm;
  var cPPVal = /(?!.*(&#34;|'))([\w]+)(?=\.([\w]+).*\(.*\))/igm;
  var cPPText = /(&#34;(.*?)&#34;|'(.*?)')/igm;
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
  //--------------------------------------------------Clean Up--------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------DIFFERENT DEVICES
  if (screen.width < 1024) {
    $('pre').width(screen.width - 40);
  }

  //--------------------------------------------------CSS
  $.each($('pre[language="css"]'), function() {
    //-------------------------Get Text
    var str = $(this).html();

    $(this).attr('contenteditable', true);

    for (a = 0; a < clean.length; a++) {
      str = str.replace(clean[a], rep[a]);
    }
    
    $(this).attr('contenteditable', false);

    //-------------------------Wrap Matching Text
    str = str.replace(cssCom, '<span id="comment">$&</span>');
    str = str.replace(cssSel, '<span id="selector">$&</span>');
    str = str.replace(cssSelExt, '</span><span id="parameter">$&</span>');
    str = str.replace(cssProp, '<span id="attribute">$&</span>');
    str = str.replace(cssVal, '<span id="value">$&</span>');

    //-------------------------Insert Coloured Text
    $(this).html(str);
  });
  
  //--------------------------------------------------C++
  $.each($('pre[language="c++"]'), function() {
    //-------------------------Get Text
    var str = $(this).html();

    //$(this).attr('contenteditable', true);

    for (a = 0; a < clean.length; a++) {
      str = str.replace(clean[a], rep[a]);
    }
    
    //$(this).attr('contenteditable', false);

    //-------------------------Wrap Matching Text
    str = str.replace(cPPCom, '<span id="comment">$&</span>');
    str = str.replace(cPPSel, '<span id="selector">$&</span>');
    str = str.replace(cPPAtt, '<span id="attribute">$&</span>');
    str = str.replace(cPPVal, '<span id="value">$&</span>');
    str = str.replace(cPPText, '<span id="parameter">$&</span>');

    //-------------------------Insert Coloured Text
    $(this).html(str);
  });
  
  //--------------------------------------------------Delphi
  $.each($('pre[language="delphi"]'), function() {
    //-------------------------Get Text
    var str = $(this).html();

    $(this).attr('contenteditable', true);

    for (a = 0; a < clean.length; a++) {
      str = str.replace(clean[a], rep[a]);
    }
    
    $(this).attr('contenteditable', false);

    //-------------------------Wrap Matching Text
    str = str.replace(delphiCom, '<span id="comment">$&</span>');
    str = str.replace(delphiSel, '<span id="selector">$&</span>');
    str = str.replace(delphiAtt, '<span id="attribute">$&</span>');
    str = str.replace(delphiVal, '<span id="value">$&</span>');
    str = str.replace(delphiText, '<span id="parameter">$&</span>');

    //-------------------------Insert Coloured Text
    $(this).html(str);
  });
  
  //--------------------------------------------------HTML
  $.each($('pre[language="html"]'), function() {
    //-------------------------Get Text
    var str = $(this).html();//contenteditable="false"
    
    $(this).attr('contenteditable', true);

    for (a = 0; a < clean.length; a++) {
      str = str.replace(clean[a], rep[a]);
    }
    
    $(this).attr('contenteditable', false);

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

  //--------------------------------------------------JavaScript
  $.each($('pre[language="javascript"]'), function() {
    //-------------------------Get Text
    var str = $(this).html();

    $(this).attr('contenteditable', true);

    for (a = 0; a < clean.length; a++) {
      str = str.replace(clean[a], rep[a]);
    }
    
    $(this).attr('contenteditable', false);

    //-------------------------Wrap Matching Text
    str = str.replace(jsCom, '<span id="comment">$&</span>');
    str = str.replace(jsText, '<span id="value">$&</span>');
    str = str.replace(jsSel, '<span id="parameter">$&</span>');
    str = str.replace(jsVal, '<span id="attribute">$&</span>');
    str = str.replace(jsChar, '<span id="selector">$&</span>');

    //-------------------------Insert Coloured Text
    $(this).html(str);
  });

  //----------------------------------------------Features
  $.each($('pre, span'), function() {
    var str = $(this).html();
    
    str = str.replace(link, '<a id="link" href="$&" target="_blank">$&</a>');
    str = str.replace(color, '<span style="color: $&;">$&</span>');
    str = str.replace(regx, '<span id="regx">$&</span>');
    str = str.replace(units, '<span id="units">$&</span>');
    
    $(this).html(str);
  });

  //----------------------------------------------Numbering
  $.each($('pre'), function() {
    var str = $(this).html();
    
    str = str.replace(/([\s\S]+)/igm, '<span id="all-number"></span><span id="all-code">$&</span>');
    
    $(this).html(str);
  });

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
