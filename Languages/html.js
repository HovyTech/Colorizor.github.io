$(function() {
  var htmlCom = /(&#60;&#33;&#45;&#45;(.*?)$|(.*?)([\w]+)(?=\n(.*?)&#45;&#45;&#62;)|(.*?)&#45;&#45;&#62;)/igm;
  var htmlTag = /((&#60;&#33;|&#60;|&#60;&#47;)([\w]+)(&#62;|\S|(\s&#47;&#62;|&#47;&#62;))|&#62;)/igm;
  var htmlAtt = /([\S]+)&#61;(?=&#34;([\s\S]*?)&#34;)/igm;
  var htmlVal = /&#34;([\s\S]*?)&#34;/igm;
  var htmlPar = /\s([\w]+)(?=<span)/igm;
  var htmlFixA = /&#45;&#45;<span id="selector">&#62;<\/span>/igm;
  
  $.each($('pre'), function() {
    var language = $(this).attr('language');
    
    if (language = 'html') {
      //-------------------------Get Text
      var str = $(this).html();
      alert(str)
      //-------------------------Wrap Matching Text
      str = str.replace(htmlCom, '<span id="comment">$&</span>');
      str = str.replace(htmlTag, '<span id="selector">$&</span>');
      str = str.replace(htmlAtt, '<span id="attribute">$&</span>');
      str = str.replace(htmlVal, '<span id="value">$&</span>');
      str = str.replace(htmlPar, '<span id="parameter">$&</span>');
      str = str.replace(htmlFixA, '&#45;&#45;&#62;');
      //-------------------------Insert Coloured Text
      $(this).html(str);
    }
  });
});
