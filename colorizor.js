//------------------------------------------------------------------------------------------------------------
//---------------------------------------------------RegEx----------------------------------------------------
//------------------------------------------------------------------------------------------------------------
//--------------------------------------------------Clean
var clean = [/&lt;/igm, /&gt;/igm, /[/]/igm, /[=]/igm, /["]/igm, /[!]/igm, /[-]/igm, /[\t]/igm];
var rep = ['&#60;', '&#62;', '&#47;', '&#61;', '&#34;', '&#33;', '&#45;', '\s\s\s\s'];
//--------------------------------------------------General
var link = /(ftp|http|https):\/\/([\w0-9±!@#$%ˆ&*()_+§\-=[\]{}:;'|\\,.?/`˜]+)/igm;
var color = /(rgb|rgba|#)([(0-9a-zA-Z,)].+)(?=(.*?);)/igm;
var regex = /&#47;(.*?)&#47;([igm]+)/igm;
//--------------------------------------------------HTML
var htmlCom = /(&#60;&#33;&#45;&#45;(.*?)$|(.*?)([\w]+)(?=\n(.*?)&#45;&#45;&#62;)|(.*?)&#45;&#45;&#62;)/igm;
var htmlTag = /((&#60;&#33;|&#60;|&#60;&#47;)([\w]+)(&#62;|\S|(\s&#47;&#62;|&#47;&#62;))|&#62;)/igm;
var htmlAtt = /([\S]+)&#61;(?=&#34;([\s\S]*?)&#34;)/igm;
var htmlVal = /&#34;([\s\S]*?)&#34;/igm;
var htmlPar = /\s([\w]+)(?=<span)/igm;
var htmlFixA = /&#45;&#45;<span id="selector">&#62;<\/span>/igm;
//--------------------------------------------------CSS
var cssCom = /(&#47;\*(.*?)$|(.*?)([\w]+)(?=\n(.*?)\*&#47;)|(.*?)\*&#47;)/igm;
var cssSel = /(^|,.+)([\w]+)(?=.+{)/igm;
var cssSelExt = /:([\w]+)(?=.+{)/igm;
var cssProp = /(?!.+{)(([\w]|&#45;)+)(?=:(.*?);)/igm;
var cssVal = /:([\s\S].+);/igm;
//--------------------------------------------------JS
var jsCom = /&#47;&#47;.*/igm;
var jsText = /(&#34;(.*?)&#34;|'(.*?)')/igm;
var jsSel = /(?!\$\()([\w]+)(?=\)\.)/igm;
var jsVal = /(([\w]+)\s(?=([\w]+)\(\)(.*?){)|var)/igm;
var jsChar = /((?!(function)\s)([\w]+)\(\)(?=(.*?){)|((\$|\.([\w]+))(.*?)|([\w]+))\(|(?!(.*?){)\)|\)(?=,))/igm;

//------------------------------------------------------------------------------------------------------------
//--------------------------------------------------Clean Up--------------------------------------------------
//------------------------------------------------------------------------------------------------------------
function preLoad() {
  //--------------------------------------------------HTML
  $.each($('pre[id="html"]'), function() {
    //-------------------------Get Text
    var htmlStr = $(this).html();
    
    for (a = 0; a < clean.length; a++) {
      htmlStr = htmlStr.replace(clean[a], rep[a]);
    }
    
    //-------------------------Wrap Matching Text
    htmlStr = htmlStr.replace(htmlCom, '<span id="comment">$&</span>');
    htmlStr = htmlStr.replace(htmlTag, '<span id="selector">$&</span>');
    htmlStr = htmlStr.replace(htmlAtt, '<span id="attribute">$&</span>');
    htmlStr = htmlStr.replace(htmlVal, '<span id="value">$&</span>');
    htmlStr = htmlStr.replace(htmlPar, '<span id="parameter">$&</span>');
    htmlStr = htmlStr.replace(htmlFixA, '&#45;&#45;&#62;');
    //-------------------------Insert Coloured Text
    $(this).html(htmlStr);
  });
  
  //--------------------------------------------------CSS
  $.each($('pre[id="css"]'), function() {
    //-------------------------Get Text
    var cssStr = $(this).html();
    
    for (a = 0; a < clean.length; a++) {
      cssStr = cssStr.replace(clean[a], rep[a]);
    }
    
    //-------------------------Wrap Matching Text
    cssStr = cssStr.replace(cssCom, '<span id="comment">$&</span>');
    cssStr = cssStr.replace(cssSel, '<span id="selector">$&</span>');
    cssStr = cssStr.replace(cssSelExt, '</span><span id="parameter">$&</span>');
    cssStr = cssStr.replace(cssProp, '<span id="attribute">$&</span>');
    cssStr = cssStr.replace(cssVal, '<span id="value">$&</span>');
    //-------------------------Insert Coloured Text
    $(this).html(cssStr);
  });
  
  //--------------------------------------------------JS
  $.each($('pre[id="js"]'), function() {
    //-------------------------Get Text
    var jsStr = $(this).html();
    
    for (a = 0; a < clean.length; a++) {
      jsStr = jsStr.replace(clean[a], rep[a]);
    }
    
    //-------------------------Wrap Matching Text
    jsStr = jsStr.replace(jsCom, '<span id="comment">$&</span>');
    jsStr = jsStr.replace(jsText, '<span id="value">$&</span>');
    jsStr = jsStr.replace(jsSel, '<span id="parameter">$&</span>');
    jsStr = jsStr.replace(jsVal, '<span id="attribute">$&</span>');
    jsStr = jsStr.replace(jsChar, '<span id="selector">$&</span>');
    //-------------------------Insert Coloured Text
    $(this).html(jsStr);
  });
  
  //----------------------------------------------URL
  $.each($('pre, span'), function() {
    var extraStr = $(this).html();
    extraStr = extraStr.replace(link, '<a id="link" href="$&" target="_blank">$&</a>');
    extraStr = extraStr.replace(color, '<span style="color: $&;">$&</span>');
    extraStr = extraStr.replace(regex, '<span id="regex">$&</span>');
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
      return html.replace(/.+/igm, '<span id="code">$&</span>');
    });
    
    line = 0;
    
    $($(this).find('span[id="code"]')).html(function(index, html) {
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
}
