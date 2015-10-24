$(function() {
  //--------------------------------------------------Clean
  var clean = [/&lt;/igm, /&gt;/igm, /[/]/igm, /[=]/igm, /["]/igm, /[!]/igm, /[-]/igm, /[\t]/igm];
  var rep = ['&#60;', '&#62;', '&#47;', '&#61;', '&#34;', '&#33;', '&#45;', '\s\s\s\s'];
  //--------------------------------------------------JS
  var jsCom = /&#47;&#47;.*/igm;
  var jsText = /(&#34;(.*?)&#34;|'(.*?)')/igm;
  var jsSel = /(?!\$\()([\w]+)(?=\)\.)/igm;
  var jsVal = /(([\w]+)\s(?=([\w]+)\(\)(.*?){)|var)/igm;
  var jsChar = /((?!(function)\s)([\w]+)\(\)(?=(.*?){)|((\$|\.([\w]+))(.*?)|([\w]+))\(|(?!(.*?){)\)|\)(?=,))/igm;
  
  $.each($('pre'), function() {
    if ($(this).attr('language').val() = 'javascript') {
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
    }
  });
});
