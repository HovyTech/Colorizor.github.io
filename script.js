//--------------------------------------------------HTML
function htmlCode() {
  //-------------------------Clean Up
  //Replace characters
  //By replacing the characters it allowes
  //for not replacing the span tag characters
  var htmlClean = [/&lt;/ig, /&gt;/ig, /[/]/ig, /[=]/ig, /["]/ig, /[!]/ig, /[-]/ig, /[\t]/ig];
  var htmlReplace = ['&#60;', '&#62;', '&#47;', '&#61;', '&#34;', '&#33;', '&#45;', '\s\s\s\s'];
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
  //-------------------------Colour Code
  $('#html').each(function(index, value) {
    //Replace
    var htmlStr = $(this).html();
    //Clean
    for (b = 0; b < htmlClean.length; b++) {
      htmlStr = htmlStr.replace(htmlClean[b], htmlReplace[b]);
    }
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
    $(this).html(htmlStr);
  });
}
htmlCode();
