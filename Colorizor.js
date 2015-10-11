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
//--------------------------------------------------JS

//------------------------------------------------------------------------------------------------------------
//--------------------------------------------------Clean Up--------------------------------------------------
//------------------------------------------------------------------------------------------------------------
//$(document).ready(function() {
  //--------------------------------------------------HTML
  $.each($('pre[id="html"]'), function() {
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
    //-------------------------Replace Characters
    for (a = 0; a < findChar.length; a++) {
      jsStr = jsStr.replace(findChar[a], replaceChar[a]);
    }
    //-------------------------Wrap Matching Text
    //jsStr = jsStr.replace(jsSet, '<span id="js-set">$&</span>');
    //jsStr = jsStr.replace(jsCom, '<span id="js-com">$&</span>');
    //jsStr = jsStr.replace(jsSel, '<span id="js-sel">$&</span>');
    //jsStr = jsStr.replace(jsVal, '<span id="js-val">$&</span>');
    //-------------------------Insert Coloured Text
    $(this).html(jsStr);
  });
//});
  
  //----------------------------------------------Numbering
  $('pre').each(function() {
    var preStr = $(this).html();
    //-------------------------Adding li and ol Tags
    preStr = preStr.replace(/\n/ig, '</li><li>');
    preStr = preStr.replace(/([\s\S]+)/ig, '<ol><li>$&</li></ol>');
    $(this).html(preStr);
  });
