$(function() {
  var jsCom = /&#47;&#47;.*/igm;
  var jsText = /(&#34;(.*?)&#34;|'(.*?)')/igm;
  var jsSel = /(?!\$\()([\w]+)(?=\)\.)/igm;
  var jsVal = /(([\w]+)\s(?=([\w]+)\(\)(.*?){)|var)/igm;
  var jsChar = /((?!(function)\s)([\w]+)\(\)(?=(.*?){)|((\$|\.([\w]+))(.*?)|([\w]+))\(|(?!(.*?){)\)|\)(?=,))/igm;
  
  $.each($('pre'), function() {
    var language = $(this).attr('language');
    
    if (language = 'javascript') {
      //-------------------------Get Text
      var str = $(this).html();
      //-------------------------Wrap Matching Text
      str = str.replace(jsCom, '<span id="comment">$&</span>');
      str = str.replace(jsText, '<span id="value">$&</span>');
      str = str.replace(jsSel, '<span id="parameter">$&</span>');
      str = str.replace(jsVal, '<span id="attribute">$&</span>');
      str = str.replace(jsChar, '<span id="selector">$&</span>');
      //-------------------------Insert Coloured Text
      $(this).html(str);
    }
  });
});
