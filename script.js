//--------------------------------------------------Clean Up
//-------------------------Replace Characters
//By replacing the characters it allowes
//for not replacing the span tag characters
var clean = [/&lt;/ig, /&gt;/ig, /[/]/ig, /[=]/ig, /["]/ig, /[!]/ig, /[-]/ig, /[\t]/ig];
var rep = ['&#60;', '&#62;', '&#47;', '&#61;', '&#34;', '&#33;', '&#45;', '\s\s\s\s'];

//--------------------------------------------------HTML
//-------------------------Fix
//Fixes the colouring of all the > characters
//at the comments so that the > character
//at all the comments are the same colour
var htmlFix = /<span id="html-tag">&#62;<\/span><\/span>/ig;
//-------------------------Comment
var htmlCom = /(&#60;&#33;DOCTYPE|&#60;&#33;&#45;&#45;)([\s\S]*?)(&#45;&#45;&#62;|&#62;)/ig;
//-------------------------Tag
var htmlTag = /(&#60;|&#60;&#47;)([\w]+)|&#62;/ig;
//-------------------------Attribute
var htmlAtt = /([\w]+)&#61;/ig;
//-------------------------Value
var htmlVal = /&#34;([\s\S]*?)&#34;/ig;
//--------------------------------------------------CSS
//-------------------------Fix
//Fixes the colouring of all the : characters
//at the comments so that the : character
//at all the comments are the same colour
var cssFixa = /<span id="css-val">:<\/span>/ig;
//Fixes the colouring of all the { characters
//at the comments so that the { character
//at all the comments are the same colour
var cssFixb = /{<\/span><\/span>/ig;
//-------------------------Comment
var cssCom = /\/\*([\s\S]*?)\*\//ig;
//-------------------------Selector
var cssSel = /^([\s\S]*?){|}/igm;
//-------------------------Selector Extention
var cssSelExt = /:(.*?){/ig;
//-------------------------Property
var cssProp = /([\w\-]+):/ig;
//-------------------------Value
var cssVal = /:(.*?);/ig;

//---------------------------------------------------------------------------Colour Code
function colourCode() {
  //--------------------------------------------------HTML
  $('#html').each(function() {
    //-------------------------Get Text
    var htmlStr = $(this).html();
    //-------------------------Replace Characters
    for (a = 0; a < clean.length; a++) {
      htmlStr = htmlStr.replace(clean[a], rep[a]);
    }
    //-------------------------Wrap Matching Text
    htmlStr = htmlStr.replace(htmlCom, '<span id="html-com">$&</span>');
    htmlStr = htmlStr.replace(htmlTag, '<span id="html-tag">$&</span>');
    htmlStr = htmlStr.replace(htmlAtt, '<span id="html-att">$&</span>');
    htmlStr = htmlStr.replace(htmlVal, '<span id="html-val">$&</span>');
    htmlStr = htmlStr.replace(htmlFix, '&#62;</span>');
    //-------------------------Numbering
    //Doesn't work that well. Update should fix it. 
    //htmlStr = htmlStr.replace(/&#60;&#33;&#45;&#45;([\s\S]*?)\n/ig, '$&</span><span id="html-com">');
    //htmlStr = htmlStr.replace(/<\/span><span id="html-com"><span/ig, '<span');
    //htmlStr = htmlStr.replace(/\n/ig, '</li><li>');
    //htmlStr = htmlStr.replace(/([\s\S]+)/ig, '<ol><li>$&</li></ol>');
    //-------------------------Insert Coloured Text
    $(this).html(htmlStr);
  });
  //--------------------------------------------------CSS
  $('#css').each(function() {
    //-------------------------Get Text
    var cssStr = $(this).html();
    //-------------------------Replace Characters
    for (b = 0; b < clean.length; b++) {
      cssStr = cssStr.replace(clean[b], rep[b]);
    }
    //-------------------------Wrap Matching Text
    cssStr = cssStr.replace(cssCom, '<span id="css-com">$&</span>');
    cssStr = cssStr.replace(cssSel, '<span id="css-sel">$&</span>');
    cssStr = cssStr.replace(cssSelExt, '</span><span id="css-sel-ext">$&</span>');
    cssStr = cssStr.replace(cssProp, '<span id="css-prop">$&</span>');
    cssStr = cssStr.replace(cssVal, '<span id="css-val">$&</span>');
    cssStr = cssStr.replace(cssFixa, ':</span><span id="css-val">');
    cssStr = cssStr.replace(cssFixb, '</span><span id="css-sel">{</span>');
    //-------------------------Insert Coloured Text
    $(this).html(cssStr);
  });
}
colourCode();
