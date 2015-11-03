(function() {
  //------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------RegEx----------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  //----------------------------------------------------FIND
  var findChar = [ 
    [/\W/igm, '\\$&'],
    [/ftp\\\:\\\/\\\//igm, 'ftp\\\_\\\_URLFIXFTP\\\_\\\_'],
    [/https\\\:\\\/\\\//igm, 'https\\\_\\\_URLFIXHTTPS\\\_\\\_'], 
    [/http\\\:\\\/\\\//igm, 'http\\\_\\\_URLFIXHTTP\\\_\\\_']
  ]; 
  //----------------------------------------------------FIX CHARACTERS
  var fixChar = [
    [/\\\&lt\\\;/igm, '<span id="character">&lt;</span>'],
    [/\\\&gt\\\;/igm, '<span id="character">&gt;</span>'],
    [/\\\&amp\\\;/igm, '<span id="character">&amp;</span>'],
    [/ftp\\\_\\\_URLFIXFTP\\\_\\\_/igm, 'ftp\\\:\\\/\\\/'],
    [/https\\\_\\\_URLFIXHTTPS\\\_\\\_/igm, 'https\\\:\\\/\\\/'],
    [/http\\\_\\\_URLFIXHTTP\\\_\\\_/igm, 'http\\\:\\\/\\\/']
  ];
  //----------------------------------------------------FEATURES
  var features = [
    ['<a id="link" href="$&" target="_blank">$&</a>', /(ftp|http|https)\:\/\/([\w\d\W]*?)(?=(\s|\"|\'))/igm],
    ['<span style="color: $&;">$&</span>', /((rgba|rgb)\((([\d\s\,\.]+){1,3})\)|\#([\w\d]){6}$)/igm],
    ['<span id="units">$&</span>', /([^\D])([\d.]*?)(em|ex|%|px|cm|mm|in|pt|pc|ch|rem|vh|vw|vmin|vmax)/igm]
  ];
  //----------------------------------------------------SWIFT
  var swift = [
    ['<span id="comment">$&</span>', /((\\\/\\\/)([\s\S]*?)$|\\\/\\\*([\s\S]*?)\\\*\\\/)/igm],
    ['<span id="value">$&</span>', /(\\\'|\\\")([\s\S]*?)(\\\'|\\\")/igm],
    ['<span id="reserved">$&</span>', /\b(as|associativity|break|case|catch|class|continue|convenience|default|defer|deinit|didSet|do|dynamic(?:Type)?|else|enum|extension|fallthrough|final|for|func|get|guard|if|import|in|infix|init|inout|internal|is|lazy|left|let|mutating|new|none|nonmutating|operator|optional|override|postfix|precedence|prefix|private|Protocol|public|repeat|required|rethrows|return|right|safe|self|Self|set|static|struct|subscript|super|switch|throws?|try|Type|typealias|unowned|unsafe|var|weak|where|while|willSet|__(?:COLUMN__|FILE__|FUNCTION__|LINE__))\b/igm],
    ['<span id="reserved">$&</span>', /@\b(IB(?:Outlet|Designable|Action|Inspectable)|class_protocol|exported|noreturn|NS(?:Copying|Managed)|objc|UIApplicationMain|auto_closure)\b/igm],
    ['<span id="parameter">$&</span>', /\b(abs|advance|alignof(?:Value)?|assert|contains|count(?:Elements)?|debugPrint(?:ln)?|distance|drop(?:First|Last)|dump|enumerate|equal|filter|find|first|getVaList|indices|isEmpty|join|last|lexicographicalCompare|map|max(?:Element)?|min(?:Element)?|numericCast|overlaps|partition|print(?:ln)?|reduce|reflect|reverse|sizeof(?:Value)?|sort(?:ed)?|split|startsWith|stride(?:of(?:Value)?)?|suffix|swap|toDebugString|toString|transcode|underestimateCount|unsafeBitCast|with(?:ExtendedLifetime|Unsafe(?:MutablePointers?|Pointers?)|VaList))\b/igm],
    ['<span id="selector">$&</span>', /\\\.([\w]+)/igm],
    ['<span id="character">$&</span>', /(\\[^\w\s\n\'\"\&\_\;\<\>\/\@\*])+/igm]
  ];
  
  //------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------COLORIZING-------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  $.each($('pre[language="swift"]'), function() {
    //------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------FETCH---------------------------------------------------
    //------------------------------------------------------------------------------------------------------------
    var str = $(this).html();
    //------------------------------------------------------------------------------------------------------------
    //---------------------------------------------------SIZING---------------------------------------------------
    //------------------------------------------------------------------------------------------------------------
    $(this).css({
      'height': 'auto',
      'left': '0px',
      'right': '0px',
      'width': 'auto'
    });
    //------------------------------------------------------------------------------------------------------------
    //---------------------------------------------------FINDING--------------------------------------------------
    //------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------FIND
    for (a = 0; a < findChar.length; a++) {
      str = str.replace(findChar[a][0], findChar[a][1]);
    }
    //----------------------------------------------------CODE
    for (a = 0; a < swift.length; a++) {
      str = str.replace(swift[a][1], swift[a][0]);
    }
    //----------------------------------------------------MULTILINE COMMENT
    str = str.replace(/\\\/\\\*([\s\S]*?)\\\*\\\//igm, function(rep) {
      return rep.replace(/\n/igm, '</span>\n<span id="comment">');
    });
    //----------------------------------------------------FIX
    //Comment
    //str = str.replace(/(\\\/\\\/([\s\S]*?)(?=\<\/span\>$)|\<span\sid\=\"comment\"\>([\s\S]*?)(?=\\\*\\\/\<\/span\>)|\<span\sid\=\"comment\"\>(?!\\\/\\\*)([\s\S]*?)(?=\<\/span\>$))/igm, function(rep) {
      //return rep.replace(/(\<span([\s\S]*?)\>|\<\/span\>)/igm, '');
    //});
    //str = str.replace(/((.*?)\\\*\\\/\<\/span\>|(?!([\s\S]+)\<span(.*?)\>\\\/\\\*)(.*?)\n(?=([\s\S]*?)\\\*\\\/))/igm, '<span id="comment">$&</span>');
    //str = str.replace(/\<span\sid\=\"comment\"\>\<span\sid\=\"comment\"\>/igm, '');
    //String
    str = str.replace(/(\\\'|\\\")([\s\S]*?)(\\\'|\\\")/igm, function(rep) {
      return rep.replace(/(\<span([\s\S]*?)\>|\<\/span\>)/igm, '');
    });
    //Fix Characters
    for (a = 0; a < fixChar.length; a++) {
      str = str.replace(fixChar[a][0], fixChar[a][1]);
    }
    //------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------SAVE----------------------------------------------------
    //------------------------------------------------------------------------------------------------------------
    $(this).html(str);
  });
  
  //------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------CLEAN----------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  $.each($('pre[language="swift"]'), function() {
    var str = $(this).html();
    str = str.replace(/\\/igm, '');
    $(this).html(str);
  });
  
  //------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------SPLIT----------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  $.each($('pre[language="swift"]'), function() {
    var str = $(this).html();
    str = str.replace(/([\s\S]+)/igm, '<span id="all-number"></span><span id="all-code">$&</span>');
    $(this).html(str);
  });
  
  //------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------NUMBERING-------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  $.each($('pre[language="swift"]').find('span[id="all-code"]'), function(line) {
    $(this).html(function(index, html) {
      return html.replace(/(^\n|.+)/igm, '<span id="code">$&</span>');
    });
    
    line = 0;
    
    $.each($(this).find('span[id="code"]'), function() {
      line++;
      var str = $($(this).parent().parent().find('span[id="all-number"]')).html();
      $($(this).parent().parent().find('span[id="all-number"]')).html(str + '<span id="number">' + line + '</span>\n');
    });
  });
  
  //------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------FEATURES--------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  //----------------------------------------------------SPAN
  $.each($('pre[language="swift"]'), function() {
    var str = $(this).html();
    for (a = 0; a < features.length; a++) {
      str = str.replace(features[a][1], features[a][0]);
    }
    $(this).html(str);
  });
  //----------------------------------------------------CLICK
  $('pre[language="swift"]').find('span[id="all-code"]').click(function() {
    var range, selection;

    if (window.getSelection && document.createRange) {
      selection = window.getSelection();
      range = document.createRange();
      range.selectNodeContents($(this)[0]);
      selection.removeAllRanges();
      selection.addRange(range);
    } else if (document.selection && document.body.createTextRange) {
      range = document.body.createTextRange();
      range.moveToElementText($(this)[0]);
      range.select();
    }
  });
})();
