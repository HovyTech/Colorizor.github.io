$(document).ready(function() {
  //--------------------------------------------------Clean
  var clean = [/&lt;/igm, /&gt;/igm, /[/]/igm, /[=]/igm, /["]/igm, /[!]/igm, /[-]/igm, /[\t]/igm];
  var rep = ['&#60;', '&#62;', '&#47;', '&#61;', '&#34;', '&#33;', '&#45;', '\s\s\s\s'];
  //--------------------------------------------------General
  var link = /(ftp|http|https):\/\/([\w0-9±!@#$%ˆ&*()_+§\-=[\]{}:;'|\\,.?/`˜]+)/igm;
  var color = /(rgb|rgba|#)([(0-9a-zA-Z,)].+)(?=(.*?);)/igm;
  var regx = /&#47;(.*?)&#47;([igm]+)/igm;
  var units = /([^\D])([\d.]*?)(em|ex|%|px|cm|mm|in|pt|pc|ch|rem|vh|vw|vmin|vmax)/igm;
  //--------------------------------------------------HTML
  var htmlCom = /(&#60;&#33;&#45;&#45;(.*?)$|(.*?)([\w]+)(?=\n(.*?)&#45;&#45;&#62;)|(.*?)&#45;&#45;&#62;)/igm;
  var htmlTag = /((&#60;&#33;|&#60;|&#60;&#47;)([\w]+)(&#62;|\S|(\s&#47;&#62;|&#47;&#62;))|&#62;)/igm;
  var htmlAtt = /([\S]+)&#61;(?=&#34;([\s\S]*?)&#34;)/igm;
  var htmlVal = /&#34;([\s\S]*?)&#34;/igm;
  var htmlPar = /\s([\w]+)(?=<span)/igm;
  var htmlFixA = /&#45;&#45;<span id="selector">&#62;<\/span>/igm;
  
  $.each($('pre[language="html"]'), function() {
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
});
