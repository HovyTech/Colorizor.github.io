//------------------------------------------------------------------------------------------------------------
//---------------------------------------------------RegEx----------------------------------------------------
//------------------------------------------------------------------------------------------------------------
//--------------------------------------------------Clean
var cleaner = [[/&lt;/igm, '&#60;'], [/&gt;/igm, '&#62;'], [/[/]/igm, '&#47;'], [/[=]/igm, '&#61;'], [/["]/igm, '&#34;'], [/[!]/igm, '&#33;'], [/[-]/igm, '&#45;'], [/[\t]/igm, '\s\s\s\s']];
//--------------------------------------------------General
var link = /(http|https):&#47;&#47;([\s\S].+)(([\w\d]+)&#47;|\.([\w]+)|\d)/igm;
//--------------------------------------------------HTML
var htmlCom = /(&#60;&#33;&#45;(.*?)|(.*?)([\w]+)(?=\n)|(.*?)&#45;&#62;)/igm;
var htmlTag = /((&#60;&#33;|&#60;|&#60;&#47;)([\w]+)(&#62;|\S|(\s&#47;&#62;|&#47;&#62;))|&#62;)/igm;
var htmlAtt = /([\S]+)=(?=&#34;([\s\S]*?)&#34;)/igm;
var htmlVal = /&#34;([\s\S]*?)&#34;/igm;
var htmlPar = /\s([\w]+)(?=<span)/igm;
var htmlFixA = /&#45;&#45;<span id="html-tag">&#62;<&#47;span>/igm;
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
  //--------------------------------------------------Clean
  $.each($('pre'), function() {
    for (a = 0; a < cleaner.length; a++) {
      //-------------------------Get Text
      var cleanStr = $(this).html();
      //-------------------------Wrap Matching Text
      cleanStr = cleanStr.replace(cleaner[a][0], cleaner[a][1]);
      //-------------------------Insert Clean Text
      $(this).html(cleanStr);
    }
  });
  
  //--------------------------------------------------HTML
  $.each($('pre[id="html"]'), function() {
    //-------------------------Get Text
    var htmlStr = $(this).html();
    //-------------------------Wrap Matching Text
    //htmlStr = htmlStr.replace(link, '<span id="link"><a href="$&">$&</a></span>');
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
