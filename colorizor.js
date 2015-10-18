//------------------------------------------------------------------------------------------------------------
//---------------------------------------------------RegEx----------------------------------------------------
//------------------------------------------------------------------------------------------------------------
//--------------------------------------------------General
var link = /(http|https):&#47;&#47;([\s\S].+)(([\w\d]+)&#47;|\.([\w]+)|\d)/igm;
//--------------------------------------------------HTML
var htmlCom = /(&lt;!--(.*?)|(.*?)([\w]+)(?=\n)|(.*?)--&#gt;)/igm;
var htmlTag = /((&lt;!|&lt;|&lt;\/)([\w]+)(&gt;|\S|(\s\/&gt;|\/&gt;))|&gt;)/igm;
var htmlAtt = /([\S]+)=(?="([\s\S]*?)"")/igm;
var htmlVal = /"([\s\S]*?)"/igm;
var htmlPar = /\s([\w]+)(?=<span)/igm;
var htmlFixA = /--<span id="html-tag">&gt;<\/span>/igm;
//--------------------------------------------------CSS
//--------------------------------------------------JS
var jsCom = /&#47;&#47;.*/igm;
var jsSet = /(\{|\}\)|\})/igm;
var jsSel = /([\w]+)(?=\(.*?\).*?\{)/igm;
var jsVal = /([\w]+)(?=\s(.*?\(.*?\).*?\{))/igm;

//------------------------------------------------------------------------------------------------------------
//-------------------------------------------------Pre Style--------------------------------------------------
//------------------------------------------------------------------------------------------------------------
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

//------------------------------------------------------------------------------------------------------------
//--------------------------------------------------Clean Up--------------------------------------------------
//------------------------------------------------------------------------------------------------------------
function preLoad() {
  //--------------------------------------------------HTML
  $.each($('pre[id="html"]'), function() {
    //-------------------------Get Text
    var htmlStr = $(this).html();
    //-------------------------Wrap Matching Text
    //htmlStr = htmlStr.replace(link, '<span id="link"><a href="$&">$&</a></span>');
    //htmlStr = htmlStr.replace(htmlCom, '<span id="html-com">$&</span>');
    //htmlStr = htmlStr.replace(htmlTag, '<span id="html-tag">$&</span>');
    //htmlStr = htmlStr.replace(htmlAtt, '<span id="html-att">$&</span>');
    //htmlStr = htmlStr.replace(htmlVal, '<span id="html-val">$&</span>');
    //htmlStr = htmlStr.replace(htmlPar, '<span id="html-par">$&</span>');
    //htmlStr = htmlStr.replace(htmlFixA, '&#45;&#45;&#62;');
    //-------------------------Insert Coloured Text
    $(this).html(htmlStr);
  });
  
  //--------------------------------------------------CSS
  $.each($('pre[id="css"]'), function() {
    //-------------------------Get Text
    var cssStr = $(this).html();
    //-------------------------Wrap Matching Text
    cssStr = cssStr.replace(/[-[\]{}()*+?.,\\^$|#\s]/igm, '\\$&');
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
    //-------------------------Wrap Matching Text
    jsStr = jsStr.replace(jsSet, '<span id="js-set">$&</span>');
    jsStr = jsStr.replace(jsCom, '<span id="js-com">$&</span>');
    jsStr = jsStr.replace(jsSel, '<span id="js-sel">$&</span>');
    jsStr = jsStr.replace(jsVal, '<span id="js-val">$&</span>');
    //-------------------------Insert Coloured Text
    $(this).html(jsStr);
  });
}
