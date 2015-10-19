//------------------------------------------------------------------------------------------------------------
//---------------------------------------------------RegEx----------------------------------------------------
//------------------------------------------------------------------------------------------------------------
//--------------------------------------------------Clean
var clean = [/&lt;/igm, /&gt;/igm, /[/]/igm, /[=]/igm, /["]/igm, /[!]/igm, /[-]/igm, /[\t]/igm];
var rep = ['&#60;', '&#62;', '&#47;', '&#61;', '&#34;', '&#33;', '&#45;', '\s\s\s\s'];
//--------------------------------------------------General
var link = /(ftp|http|https):\/\/([\w0-9±!@#$%ˆ&*()_+§\-=[\]{}:;"'|\\<,>.?/`˜]+)/igm;
//--------------------------------------------------HTML
var htmlCom = /(&#60;&#33;&#45;&#45;(.*?)$|(.*?)([\w]+)(?=\n(.*?)&#45;&#45;&#62;)|(.*?)&#45;&#45;&#62;)/igm;
var htmlTag = /((&#60;&#33;|&#60;|&#60;&#47;)([\w]+)(&#62;|\S|(\s&#47;&#62;|&#47;&#62;))|&#62;)/igm;
var htmlAtt = /([\S]+)&#61;(?=&#34;([\s\S]*?)&#34;)/igm;
var htmlVal = /&#34;([\s\S]*?)&#34;/igm;
var htmlPar = /\s([\w]+)(?=<span)/igm;
var htmlFixA = /&#45;&#45;<span id="html-tag">&#62;<\/span>/igm;
//--------------------------------------------------CSS
//--------------------------------------------------JS
var jsCom = /&#47;&#47;.*/igm;
var jsSet = /(\{|\}\)|\})/igm;
var jsSel = /([\w]+)(?=\(.*?\).*?\{)/igm;
var jsVal = /([\w]+)(?=\s(.*?\(.*?\).*?\{))/igm;

//------------------------------------------------------------------------------------------------------------
//--------------------------------------------------Clean Up--------------------------------------------------
//------------------------------------------------------------------------------------------------------------
function preLoad() {
  //--------------------------------------------------HTML
  $.each($('pre[id="html"]'), function() {
    //-------------------------Get Text
    var htmlStr = $(this).html();
    
    htmlStr = htmlStr.replace(link, '<span id="link"><a href="$&">$&</a></span>');
    
    for (a = 0; a < clean.length; a++) {
      htmlStr = htmlStr.replace(clean[a], rep[a]);
    }
    
    //-------------------------Wrap Matching Text
    htmlStr = htmlStr.replace(htmlCom, '<span id="html-com">$&</span>');
    htmlStr = htmlStr.replace(htmlTag, '<span id="html-tag">$&</span>');
    htmlStr = htmlStr.replace(htmlAtt, '<span id="html-att">$&</span>');
    htmlStr = htmlStr.replace(htmlVal, '<span id="html-val">$&</span>');
    htmlStr = htmlStr.replace(htmlPar, '<span id="html-par">$&</span>');
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
    //cssStr = cssStr.replace(cssCom, '<span id="css-com">$&</span>');
    //cssStr = cssStr.replace(cssSel, '<span id="css-sel">$&</span>');
    //cssStr = cssStr.replace(cssSelExt, '</span><span id="css-sel-ext">$&</span>');
    //cssStr = cssStr.replace(cssProp, '<span id="css-prop">$&</span>');
    //cssStr = cssStr.replace(cssVal, '<span id="css-val">$&</span>');
    //cssStr = cssStr.replace(cssUnt, '</span><span id="css-unt">$&</span><span id="css-val">');
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
    jsStr = jsStr.replace(jsSet, '<span id="js-set">$&</span>');
    jsStr = jsStr.replace(jsCom, '<span id="js-com">$&</span>');
    jsStr = jsStr.replace(jsSel, '<span id="js-sel">$&</span>');
    jsStr = jsStr.replace(jsVal, '<span id="js-val">$&</span>');
    //-------------------------Insert Coloured Text
    $(this).html(jsStr);
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
}
