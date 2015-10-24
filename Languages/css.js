$(function() {
  //--------------------------------------------------Clean
  var clean = [/&lt;/igm, /&gt;/igm, /[/]/igm, /[=]/igm, /["]/igm, /[!]/igm, /[-]/igm, /[\t]/igm];
  var rep = ['&#60;', '&#62;', '&#47;', '&#61;', '&#34;', '&#33;', '&#45;', '\s\s\s\s'];
  //--------------------------------------------------CSS
  var cssCom = /(&#47;\*(.*?)$|(.*?)([\w]+)(?=\n(.*?)\*&#47;)|(.*?)\*&#47;)/igm;
  var cssSel = /(^|,.+)([\w]+)(?=.+{)/igm;
  var cssSelExt = /:([\w]+)(?=.+{)/igm;
  var cssProp = /(?!.+{)(([\w]|&#45;)+)(?=:(.*?);)/igm;
  var cssVal = /:([\s\S].+);/igm;
  
  $.each($('pre'), function() {
    if ($(this).attr('language').toLowerCase() = 'css') {
      //-------------------------Get Text
      var str = $(this).html();
    
      for (a = 0; a < clean.length; a++) {
        str = str.replace(clean[a], rep[a]);
      }
    
      //-------------------------Wrap Matching Text
      str = str.replace(cssCom, '<span id="comment">$&</span>');
      str = str.replace(cssSel, '<span id="selector">$&</span>');
      str = str.replace(cssSelExt, '</span><span id="parameter">$&</span>');
      str = str.replace(cssProp, '<span id="attribute">$&</span>');
      str = str.replace(cssVal, '<span id="value">$&</span>');
      //-------------------------Insert Coloured Text
      $(this).html(str);
    }
  });
});
