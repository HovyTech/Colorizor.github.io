//------------------------------------------------------------------------------------------------------------
//--------------------------------------------------Clean Up--------------------------------------------------
//------------------------------------------------------------------------------------------------------------
//-------------------------Replace Characters
//Replacing the characters so that the <span> tag characters dont be replaced
var findChar = [/&lt;/ig, /&gt;/ig, /[/]/ig, /[=]/ig, /["]/ig, /[!]/ig, /[-]/ig, /[\t]/ig];
var replaceChar = ['&#60;', '&#62;', '&#47;', '&#61;', '&#34;', '&#33;', '&#45;', '\s\s\s\s'];

//------------------------------------------------------------------------------------------------------------
//---------------------------------------------------RegEx----------------------------------------------------
//------------------------------------------------------------------------------------------------------------
//--------------------------------------------------HTML
var htmlCom = /&#60;&#33;&#45;&#45;([\s\S]*?)&#45;&#45;&#62;/ig;
var htmlTag = /((&#60;&#33;|&#60;|&#60;&#47;)([\w]+)(&#62;|\S|(\s&#47;&#62;|&#47;&#62;))|&#62;)/ig;
var htmlAtt = /([\S]+)&#61;(?=&#34;([\s\S]*?)&#34;)/ig;
var htmlVal = /&#34;([\s\S]*?)&#34;/ig;
//--------------------------------------------------CSS
//-------------------------Comment
var cssCom = /&#47;\*([\s\S]*?)\*&#47;/ig;
//-------------------------Selector
var cssSel = /([\w\s.#:_@!\[\]\(\)&45;]*?)\{|\}/ig;
//-------------------------Selector Extention
var cssSelExt = /:(.*?){/ig;
//-------------------------Property
var cssProp = /([\w&#45;]*?):/ig;
//-------------------------Value
var cssVal = /:(.*?)&#59;/ig;
//-------------------------Unit
var cssUnt = /([^\D])([\d.]*?)(em|ex|%|px|cm|mm|in|pt|pc|ch|rem|vh|vw|vmin|vmax)/ig;
//--------------------------------------------------JS
//-------------------------Fix
var jsFixa = /\(<\/span>/ig;
var jsFixb = /<span id="js-set"><span id="js-sel">function<\/span>/ig;
//-------------------------Set
var jsSet = /(document|var|function|this|width|height|window|screen|length|if|for|while|return|true|false)/ig;
//-------------------------Comment
var jsCom = /&#47;&#47;([\s\S]*?)\n/ig;
//-------------------------Selector
var jsSel = /((function|\.)([\s\S]*?)|([\w]+))\(/ig;
//-------------------------Value
var jsVal = /(&#34;|')([\s\S]*?)('|&#34;)/ig;

//------------------------------------------------------------------------------------------------------------
//--------------------------------------------------Clean Up--------------------------------------------------
//------------------------------------------------------------------------------------------------------------
$(document.body).ready(function() {
  //--------------------------------------------------HTML
  $('pre[id="html"]').each(function() {
    //-------------------------Get Text
    var htmlStr = $(this).html();
    //-------------------------Replace Characters
    for (a = 0; a < findChar.length; a++) {
      htmlStr = htmlStr.replace(findChar[a], replaceChar[a]);
    }
    //-------------------------Wrap Matching Text
    htmlStr = htmlStr.replace(htmlCom, '<span id="html-com">$&</span>');
    htmlStr = htmlStr.replace(htmlTag, '<span id="html-tag">$&</span>');
    htmlStr = htmlStr.replace(htmlAtt, '<span id="html-att">$&</span>');
    htmlStr = htmlStr.replace(htmlVal, '<span id="html-val">$&</span>');
    //-------------------------Insert Coloured Text
    $(this).html(htmlStr);
  });
  $('#html-com').css('color', 'yellow');
  
  //--------------------------------------------------CSS
  $.each($('pre[id="css"]'), function() {
    //-------------------------Get Text
    var cssStr = $(this).html();
    //-------------------------Replace Characters
    cssStr = cssStr.replace(/[;]/ig, '&#59;');
    for (a = 0; a < findChar.length; a++) {
      cssStr = cssStr.replace(findChar[a], replaceChar[a]);
    }
    //-------------------------Wrap Matching Text
    cssStr = cssStr.replace(cssCom, '<span id="css-com">$&</span>');
    cssStr = cssStr.replace(cssSel, '<span id="css-sel">$&</span>');
    cssStr = cssStr.replace(cssSelExt, '</span><span id="css-sel-ext">$&</span>');
    cssStr = cssStr.replace(cssProp, '<span id="css-prop">$&</span>');
    cssStr = cssStr.replace(cssVal, '<span id="css-val">$&</span>');
    cssStr = cssStr.replace(cssUnt, '</span><span id="css-unt">$&</span><span id="css-val">');
    cssStr = cssStr.replace(cssFixa, '<span id="css-sel-ext">:');
    cssStr = cssStr.replace(cssFixb, ':</span><span id="css-val">');
    cssStr = cssStr.replace(cssFixc, '</span><span id="css-sel">{</span>');
    cssStr = cssStr.replace(cssFixd, '$&</span><span id="css-com">');
    cssStr = cssStr.replace(cssFixe, '$&<span id="css-sel">');
    //-------------------------Insert Coloured Text
    $(this).html(cssStr);
  });
  
  //--------------------------------------------------JS
  $.each($('pre[id="js"]'), function() {
    //-------------------------Get Text
    var jsStr = $(this).html();
    //-------------------------Replace Characters
    for (a = 0; a < findChar.length; a++) {
      jsStr = jsStr.replace(findChar[a], replaceChar[a]);
    }
    //-------------------------Wrap Matching Text
    jsStr = jsStr.replace(jsSet, '<span id="js-set">$&</span>');
    jsStr = jsStr.replace(jsCom, '<span id="js-com">$&</span>');
    jsStr = jsStr.replace(jsSel, '<span id="js-sel">$&</span>');
    jsStr = jsStr.replace(jsVal, '<span id="js-val">$&</span>');
    jsStr = jsStr.replace(jsFixa, '</span>(');
    jsStr = jsStr.replace(jsFixb, '<span id="js-set">function</span><span id="js-sel">');
    //-------------------------Insert Coloured Text
    $(this).html(jsStr);
  });
  
  //----------------------------------------------Numbering
  $.each($('pre'), function() {
    var preStr = $(this).html();
    //-------------------------Adding li and ol Tags
    preStr = preStr.replace(/\n/ig, '</li><li>');
    preStr = preStr.replace(/([\s\S]+)/ig, '<ol><li>$&</li></ol>');
    $(this).html(preStr);
  });
});
