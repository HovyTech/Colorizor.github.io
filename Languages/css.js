(function() {
  //------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------RegEx----------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  //----------------------------------------------------FIND
  var findChar = [ 
    [/\W/igm, '\\$&'],
    [/ftp\\\:\\\/\\\//igm, 'ftp\\\_\\\_URLFIXFTP\\\_\\\_'],
    [/https\\\:\\\/\\\//igm, 'https\\\_\\\_URLFIXHTTPS\\\_\\\_'], 
    [/http\\\:\\\/\\\//igm, 'http\\\_\\\_URLFIXHTTP\\\_\\\_'],
    [/((rgba|rgb|hsla|hsl)\\\(([\s\S]*?)\\\)|\\\#([\w\d]+))/igm, '$&<colouring>']
  ];
  //----------------------------------------------------REMOVE
  var removeChar = [
    [/\\\/\\\*([\s\S]*?)\\\*\\\//igm, /(\<span(.*?)\>|\<\/span\>)/igm, ''],
    [/\\\/\\\*([\s\S]*?)\\\*\\\//igm, /\n/igm, '</span>\n<span id="comment">'],
    [/(\\\'|\\\")([\s\S]*?)(\\\'|\\\")/igm, /(\<span(.*?)\>|\<\/span\>)/igm, ''],
    [/([\d]+)(\<span([\s\S]*?)\>([\W]+)\<\/span\>)([\d]+)/igm, /(\<span(.*?)\>|\<\/span\>)/igm, ''],
    [/((rgba|rgb|hsla|hsl)\\\(([\s\S]*?)\\\)|\\\#([\w\d]+))\<colouring\>/igm, /\<colouring\>/igm, '']
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
    ['<a id="link" href="$&" target="_blank">$&</a>', /(ftp|http|https)\:\/\/([\w\d\W]*?)(?=[\s\'\"\(\)\{\}\[\]])/igm],
    ['<span style="color: $&;">$&</span>', /((rgba|rgb|hsla|hsl)\((([\d\s\,\.\%]+){1,3})\)|\#([\w\d]+))/igm]
  ];
  //----------------------------------------------------CSS
  var css = [
    ['<span id="comment">$&</span>', /\\\/\\\*([\s\S]*?)\\\*\\\//igm],
    ['<span id="value">$&</span>', /(\\\'|\\\")([\s\S]*?)(\\\'|\\\")/igm],
    ['<span id="reserved">$&</span>', /(?!(.*?)(\:(.*?)\;|\<colouring\>\;|\>|\{))([\w]+)(?=(.*?)\;)/igm],
    //['<span id="reserved">$&</span>', /\b(\\\:above\\\-level|accelerator|accesskey|\\\:active|additive\\\-symbols|\\\:\\\:after|\\\-ah\\\-|align\\\-content|align\\\-items|alignment\\\-adjust|alignment\\\-baseline|align\\\-self|all|\\\:\\\:alternate|anchor\\\-point|animation|animation\\\-delay|animation\\\-direction|animation\\\-duration|animation\\\-fill\\\-mode|animation\\\-iteration\\\-count|animation\\\-name|animation\\\-play\\\-state|animation\\\-timing\\\-function|\\\:\\\:anonymous\\\-block|\\\:\\\:anonymous\\\-positioned\\\-block|\\\:any|\\\:any\\\-link|appearance|\\\-apple\\\-|app\\\-region|aspect\\\-ratio|aspect\\\-ratio|\\\:at\\\-level|\\\-atsc\\\-|attr|auto|azimuth|\\\:\\\:backdrop|backface\\\-visibility|background|background\\\-attachment|background\\\-clip|background\\\-color|background\\\-composite|background\\\-image|background\\\-inline\\\-policy|background\\\-origin|background\\\-origin\\\-x|background\\\-origin\\\-y|background\\\-position|background\\\-position\\\-x|background\\\-position\\\-y|background\\\-repeat|background\\\-size|baseline\\\-shift|\\\:\\\:before|behavior|\\\:below\\\-level|binding|\\\:blank|bleed|blend\\\-mode|block\\\-progression|bookmark\\\-label|bookmark\\\-level|bookmark\\\-state|bookmark\\\-target|border|border\\\-after|border\\\-after\\\-color|border\\\-after\\\-style|border\\\-after\\\-width|border\\\-before|border\\\-before\\\-color|border\\\-before\\\-style|border\\\-before\\\-width|border\\\-bottom|border\\\-bottom\\\-color|border\\\-bottom\\\-colors|border\\\-bottom\\\-left\\\-radius|border\\\-bottom\\\-right\\\-radius|border\\\-bottom\\\-style|border\\\-bottom\\\-width|border\\\-clip|border\\\-clip\\\-bottom|border\\\-clip\\\-left|border\\\-clip\\\-right|border\\\-clip\\\-top|border\\\-collapse|border\\\-color|border\\\-end|border\\\-end\\\-color|border\\\-end\\\-style|border\\\-end\\\-width|border\\\-fit|border\\\-horizontal\\\-spacing|border\\\-image|border\\\-image\\\-outset|border\\\-image\\\-repeat|border\\\-image\\\-slice|border\\\-image\\\-source|border\\\-image\\\-width|border\\\-left|border\\\-left\\\-colors|border\\\-left\\\-color|border\\\-left\\\-style|border\\\-left\\\-width|border\\\-radius|border\\\-right|border\\\-right\\\-color|border\\\-right\\\-colors|border\\\-right\\\-style|border\\\-right\\\-width|border\\\-spacing|border\\\-start|border\\\-start\\\-color|border\\\-start\\\-style|border\\\-start\\\-width|border\\\-style|border\\\-top|border\\\-top\\\-color|border\\\-top\\\-colors|border\\\-top\\\-left\\\-radius|border\\\-top\\\-right\\\-radius|border\\\-top\\\-style|border\\\-top\\\-width|border\\\-vertical\\\-spacing|border\\\-width|bottom|\\\:bound\\\-element|box\\\-align|box\\\-decoration\\\-break|box\\\-direction|box\\\-flex|box\\\-flex\\\-group|box\\\-lines|box\\\-ordinal\\\-group|box\\\-orient|box\\\-pack|box\\\-reflect|box\\\-shadow|box\\\-sizing|box\\\-snap|break\\\-after|break\\\-before|break\\\-inside|\\\:broken|\\\:\\\:browse|calc|\\\:\\\:canvas|canvas|caption\\\-side|\\\:\\\:cell\\\-content|ch|chains|\\\@charset|\\\:\\\:check|\\\:checked|\\\:\\\:choices|clear|\\\:\\\:clear|clip|clip\\\-path|clip\\\-rule|cm|color|color|color\\\-correction|color\\\-index|color\\\-profile|\\\@color\\\-profile|\\\:\\\:column|column\\\-axis|column\\\-break\\\-after|column\\\-break\\\-before|column\\\-break\\\-inside|column\\\-count|column\\\-fill|column\\\-gap|column\\\-progression|column\\\-rule|column\\\-rule\\\-color|column\\\-rule\\\-style|column\\\-rule\\\-width|columns|column\\\-span|column\\\-width|\\\:contains|content|content\\\-zoom\\\-chaining|content\\\-zooming|content\\\-zoom\\\-limit|content\\\-zoom\\\-limit\\\-max|content\\\-zoom\\\-limit\\\-min|content\\\-zoom\\\-snap)\b/igm],
    //['<span id="reserved">$&</span>', /\b(content\\\-zoom\\\-snap\\\-points|content\\\-zoom\\\-snap\\\-type|\\\@counter|counter|counter\\\-increment|counter\\\-reset|counters|\\\@counter\\\-style|crop|cross\\\-fade|cubic\\\-bezier|cue|cue\\\-after|cue\\\-before|\\\:current|cursor|cycle|dashboard\\\-region|default|\\\:default|deg|device\\\-aspect\\\-ratio|device\\\-cmyk|device\\\-pixel\\\-ratio|device\\\-width|\\\:dir|direction|\\\:disabled|display|display\\\-box|display\\\-extras|display\\\-inside|display\\\-outside|\\\@document|dominant\\\-baseline|dpcm|dpi|dppx|\\\:drag\\\-over|drop\\\-initial\\\-after\\\-adjust|drop\\\-initial\\\-after\\\-align|drop\\\-initial\\\-before\\\-adjust|drop\\\-initial\\\-before\\\-align|drop\\\-initial\\\-size|drop\\\-initial\\\-value|element|elevation|em|\\\:empty|empty\\\-cells|\\\:enabled|\\\-epub\\\-|ex|\\\:\\\:expand|expression|fallback|fill|\\\:\\\:fill|\\\:\\\:fill\\\-lower|fill\\\-opacity|fill\\\-rule|\\\:\\\:fill\\\-upper|filter|\\\:first|\\\:first\\\-child|\\\:\\\:first\\\-letter|\\\:\\\:first\\\-line|\\\:first\\\-node|\\\:first\\\-of\\\-type|\\\:\\\:first\\\-page|fit|fit\\\-position|flavor|flex|flex|flex\\\-align|flex\\\-basis|flex\\\-direction|flex\\\-flow|flex\\\-grow|flex\\\-order|flex\\\-pack|flex\\\-shrink|flex\\\-wrap|float|float\\\-edge|float\\\-offset|flood\\\-color|flood\\\-opacity|flow\\\-from|flow\\\-into|\\\:focus|\\\:focus\\\-inner|focus\\\-opacity|\\\:focus\\\-outer|\\\:focusring|font|font\\\-color|font\\\-emphasize|font\\\-emphasize\\\-position|font\\\-emphasize\\\-style|\\\@font\\\-face|font\\\-family|font\\\-feature\\\-settings|\\\@font\\\-feature\\\-values|font\\\-kerning|font\\\-language\\\-override|font\\\-size|font\\\-size\\\-adjust|font\\\-size\\\-delta|font\\\-smooth|font\\\-smoothing|font\\\-stretch|font\\\-style|font\\\-synthesis|font\\\-variant|font\\\-variant\\\-alternates|font\\\-variant\\\-caps|font\\\-variant\\\-east\\\-asian|font\\\-variant\\\-ligatures|font\\\-variant\\\-numeric|font\\\-variant\\\-position|font\\\-weight|footnote|\\\:\\\:footnote\\\-call|\\\:\\\:footnote\\\-marker|force\\\-broken\\\-image\\\-icon|fr|\\\:fullscreen|\\\:full\\\-screen|\\\:full\\\-screen\\\-ancestor|\\\:future|gd|glyph\\\-orientation\\\-horizontal|glyph\\\-orientation\\\-vertical|grad|grid|grid\\\-area|grid\\\-auto\\\-columns|grid\\\-auto\\\-flow|grid\\\-auto\\\-rows|grid\\\-column|grid\\\-column\\\-align|grid\\\-column\\\-position|grid\\\-columns|grid\\\-column\\\-span|grid\\\-definition\\\-columns|grid\\\-definition\\\-rows|grid\\\-position|grid\\\-row|grid\\\-row\\\-align|grid\\\-row\\\-position|grid\\\-rows|grid\\\-row\\\-span|grid\\\-span|grid\\\-template|\\\:handler\\\-blocked|\\\:handler\\\-crashed|\\\:handler\\\-disabled|hanging\\\-punctuation|height|height|high\\\-contrast|high\\\-contrast\\\-adjust|highlight|horiz\\\-align|\\\:hover|\\\-hp\\\-|hsl|hsla|hyphenate\\\-character|hyphenate\\\-limit\\\-after|hyphenate\\\-limit\\\-before|hyphenate\\\-limit\\\-chars|hyphenate\\\-limit\\\-last|hyphenate\\\-limit\\\-lines|hyphenate\\\-limit\\\-zone|hyphenate\\\-resource|hyphens|Hz|icon|image|image\\\-orientation|image\\\-rect|image\\\-region|image\\\-rendering|image\\\-resolution|image\\\-orientation|images\\\-in\\\-menus|ime\\\-mode|\\\@import|\\\!important|in|include\\\-source|\\\:indeterminate|inherit|initial|inline\\\-box\\\-align|inline\\\-flex|inline\\\-table|\\\:\\\:inline\\\-table|input\\\-format|\\\:input\\\-placeholder|\\\:\\\:input\\\-placeholder|input\\\-required|\\\:in\\\-range|interpolation\\\-mode|interpret\\\-as|\\\:invalid)\b/igm],
    //['<span id="reserved">$&</span>', /\b(justify\\\\\\\\\\-items\\|justify\\\-content|justify\\\-self|kerning|\\\:keyboard\\\-active|\\\@keyframes|\\\-khtml\\\-|kHz|\\\:lang|languages|\\\:last\\\-child|\\\:last\\\-of\\\-type|\\\:last\\\-node|layout\\\-flow|layout\\\-grid|layout\\\-grid\\\-char|layout\\\-grid\\\-char\\\-spacing|layout\\\-grid\\\-line|layout\\\-grid\\\-mode|layout\\\-grid\\\-type|leader|left|\\\:left|letter\\\-spacing|lighting\\\-color|line\\\-align|linear\\\-gradient|line\\\-box\\\-contain|line\\\-break|line\\\-clamp|line\\\-grid|line\\\-height|\\\:\\\:line\\\-marker|line\\\-slack|line\\\-snap|line\\\-stacking|line\\\-stacking\\\-ruby|line\\\-stacking\\\-shift|line\\\-stacking\\\-strategy|link|\\\:link|link\\\-source|\\\:\\\:list\\\-bullet|list\\\-image\\\-1|list\\\-image\\\-2|list\\\-image\\\-3|\\\:\\\:list\\\-number|list\\\-style\\\-image|list\\\-style\\\-position|list\\\-style\\\-type|\\\:loading|locale|\\\:locale\\\-dir|\\\:local\\\-link|logical\\\-height|logical\\\-width|\\\:lwtheme|\\\:lwtheme\\\-darktext|mac\\\-graphite\\\-theme|maemo\\\-classic|margin|margin\\\-after|margin\\\-after\\\-collapse|margin\\\-before|margin\\\-before\\\-collapse|margin\\\-bottom|margin\\\-bottom\\\-collapse|margin\\\-collapse|margin\\\-end|margin\\\-left|margin\\\-right|margin\\\-start|margin\\\-top|margin\\\-top\\\-collapse|marker|\\\:\\\:marker|marker\\\-end|marker\\\-mid|marker\\\-start|marks|marquee|marquee|marquee\\\-dir|marquee\\\-direction|marquee\\\-increment|marquee\\\-loop|marquee\\\-play\\\-count|marquee\\\-repetition|marquee\\\-speed|marquee\\\-style|mask|mask\\\-attachment|mask\\\-box\\\-image|mask\\\-box\\\-image\\\-outset|mask\\\-box\\\-image\\\-repeat|mask\\\-box\\\-image\\\-slice|mask\\\-box\\\-image\\\-source|mask\\\-box\\\-image\\\-width|mask\\\-clip|mask\\\-composite|mask\\\-image|mask\\\-origin|mask\\\-position|mask\\\-position\\\-x|mask\\\-position\\\-y|mask\\\-repeat|mask\\\-repeat\\\-x|mask\\\-repeat\\\-y|mask\\\-size|mask\\\-type|\\\:matches|match\\\-nearest\\\-mail\\\-blockquote\\\-color|\\\:math\\\-anonymous|\\\:math\\\-columnline|\\\:math\\\-firstcolumn|\\\:math\\\-firstrow|\\\:math\\\-font\\\-size|\\\:math\\\-font\\\-style|\\\:math\\\-lastcolumn|\\\:math\\\-rowline|\\\:math\\\-lastrow|\\\:math\\\-stretchy|max\\\-color\\\-index|max\\\-color|max\\\-device\\\-aspect\\\-ratio|max\\\-device\\\-height|max\\\-device\\\-pixel\\\-ratio|max\\\-device\\\-width|max\\\-height|max\\\-height|max\\\-logical\\\-height|max\\\-logical\\\-width|max\\\-monochrome|max\\\-resolution|max\\\-width|max\\\-width|max\\\-zoom|\\\@media|min\\\-aspect\\\-ratio|min\\\-color|min\\\-color\\\-index|min\\\-device\\\-aspect\\\-ratio|min\\\-device\\\-height|min\\\-device\\\-pixel\\\-ratio|min\\\-device\\\-width|min\\\-height|min\\\-height|mini\\\-fold|min\\\-logical\\\-height|min\\\-logical\\\-width|minmax|min\\\-monochrome|min\\\-resolution|min\\\-width|min\\\-width|min\\\-zoom|mm|monochrome|move\\\-to|\\\-moz\\\-|\\\-ms\\\-|ms|mso\\\-\\\*|\\\@namespace|nav\\\-banner\\\-image|nav\\\-bottom|navbutton\\\-\\\*|nav\\\-down|nav\\\-down\\\-shift|\\\@navigation|nav\\\-index|nav\\\-left|nav\\\-left\\\-shift|nav\\\-right|nav\\\-right\\\-shift|nav\\\-up|nav\\\-up\\\-shift|nbsp\\\-mode|negative|none|normal|\\\:not|\\\:nth\\\-child|\\\:nth\\\-column|\\\:nth\\\-last\\\-child|\\\:nth\\\-last\\\-column|\\\:nth\\\-last\\\-match|\\\:nth\\\-last\\\-of\\\-type|\\\:nth\\\-match|\\\:nth\\\-of\\\-type|\\\-o\\\-|object\\\-fit|object\\\-position|oeb\\\-column\\\-number|oeb\\\-page\\\-foot|oeb\\\-page\\\-head|\\\:only\\\-child|\\\:only\\\-of\\\-type|opacity|\\\:optional|order|orient|orientation|orientation|orphans|outline|outline\\\-color|outline\\\-offset|outline\\\-radius|outline\\\-radius\\\-bottomleft|outline\\\-radius\\\-bottomright|outline\\\-radius\\\-topleft|outline\\\-radius\\\-topright|outline\\\-style|outline\\\-width|\\\:out\\\-of\\\-range|\\\:\\\:outside|overflow|overflow\\\-scrolling|overflow\\\-style|overflow\\\-wrap|overflow\\\-x|overflow\\\-y|padding|padding\\\-after|padding\\\-before|padding\\\-bottom|padding\\\-end|padding\\\-left|padding\\\-right|padding\\\-start|padding\\\-top|page|\\\:\\\:page|\\\:\\\:page|\\\@page|\\\:\\\:pagebreak|page\\\-break\\\-after|page\\\-break\\\-before|page\\\-break\\\-inside|\\\:\\\:page\\\-column|\\\:\\\:pagecontent|page\\\-policy|\\\:\\\:page\\\-sequence|panose\\\-1|\\\:past|pause|pause\\\-after|pause\\\-before|pc|pending|perspective|perspective|perspective\\\-origin|perspective\\\-origin\\\-x|perspective\\\-origin\\\-y|phonemes|pitch|pitch\\\-range|\\\:placeholder|play\\\-during|pointer\\\-events|position|prefix|presentation\\\-level|\\\-prince\\\-|print\\\-color\\\-adjust|progress\\\-appearance|pt|punctuation\\\-trim|punctuation\\\-wrap|px|quotes|rad|radial\\\-gradient|range|\\\:read\\\-only|\\\:read\\\-write|rect|\\\@region|region\\\-break\\\-after|region\\\-break\\\-before|region\\\-break\\\-inside|region\\\-overflow|rem|rendering\\\-intent|\\\:\\\:repeat\\\-index|repeating\\\-linear\\\-gradient|repeating\\\-radial\\\-gradient|\\\:\\\:repeat\\\-item|replace|\\\:required|resize|resolution|resolution|rest|rest\\\-after|rest\\\-before|\\\:\\\:reveal|rgb|rgba|richness|right|\\\:right|\\\-rim\\\-|\\\-ro\\\-)\b/igm],
    //['<span id="reserved">$&</span>', /\b(\\\:root|rotate|rotateX|rotateY|rotate3D|rotateZ|rotate3d|rotation|rotation\\\-point|row\\\-span|rounddown|roundup|rtl\\\-ordering|ruby\\\-align|ruby\\\-overhang|ruby\\\-position|ruby\\\-span|running|scale|scaleX|scaleY|scaleZ|scale3d\\\(X\\\)|scan|\\\:\\\:selection|separator\\\-image|set\\\-link\\\-source|shape\\\-inside|shape\\\-margin|shape\\\-outside|shape\\\-padding|\\\:scope|script\\\-level|script\\\-min\\\-size|script\\\-size\\\-multiplier|scrollbar\\\-3dlight\\\-color\\\ property|scrollbar\\\-arrow\\\-color|scrollbar\\\-base\\\-color|scrollbar\\\-darkshadow\\\-color|scrollbar\\\-end\\\-backward|scrollbar\\\-end\\\-forward|scrollbar\\\-face\\\-color|scrollbar\\\-highlight\\\-color|scrollbar\\\-shadow\\\-color|scrollbar\\\-start\\\-backward|scrollbar\\\-start\\\-forward|scrollbar\\\-thumb\\\-proportional|scrollbar\\\-track\\\-color|scroll\\\-chaining|scroll\\\-limit|scroll\\\-limit\\\-x\\\-max|scroll\\\-limit\\\-x\\\-min|scroll\\\-limit\\\-y\\\-max|scroll\\\-limit\\\-y\\\-min|scroll\\\-rails|scroll\\\-snap\\\-points\\\-x|scroll\\\-snap\\\-points\\\-y|scroll\\\-snap\\\-type|scroll\\\-snap\\\-x|scroll\\\-snap\\\-y|scroll\\\-translation|\\\:\\\:scrolled\\\-canvas|\\\:\\\:scrolled\\\-content|\\\:\\\:scrolled\\\-page\\\-sequence|\\\:\\\:selection|shape\\\-image\\\-threshold|shape\\\-inside|shape\\\-margin|shape\\\-outside|shape\\\-padding|shape\\\-rendering|size|skew|skewX|skewY|skewZ|skew3D\\\(X\\\)|\\\:\\\:slot|speak|speak\\\-as|speak\\\-header|speak\\\-numeral|speak\\\-punctuation|speech\\\-rate|src|stack\\\-sizing|steps|stop\\\-color|stop\\\-opacity|stress|\\\@string|string|string\\\-set|stroke|stroke\\\-dasharray|stroke\\\-dashoffset|stroke\\\-linecap|stroke\\\-linejoin|stroke\\\-miterlimit|stroke\\\-opacity|stroke\\\-width|\\\:submit\\\-invalid|suffix|\\\@supports|\\\:suppressed|\\\:\\\:svg\\\-foreign\\\-content|svg\\\-shadow|symbols|symbols|system|\\\:system\\\-metric|\\\:\\\:table|table\\\-baseline|table\\\-border\\\-color\\\-dark|table\\\-border\\\-color\\\-light|\\\:\\\:table\\\-cell|\\\:\\\:table\\\-column|\\\:\\\:table\\\-column\\\-group|\\\:\\\:table\\\-cell|table\\\-layout|\\\:\\\:table\\\-outer|\\\:\\\:table\\\-row|\\\:\\\:table\\\-row\\\-group|tab\\\-size|tab\\\-stops|tap\\\-highlight\\\-color|target|\\\:target|target\\\-counter|target\\\-counters|target\\\-name|target\\\-new|target\\\-position|target\\\-pull|target\\\-text|\\\-tc\\\-|text\\\-anchor|text\\\-align|text\\\-align\\\-last|text\\\-autospace|text\\\-blink|text\\\-combine|text\\\-combine\\\-horizontal|text\\\-decoration|text\\\-decoration\\\-color|text\\\-decoration\\\-line|text\\\-decorations\\\-in\\\-effect|text\\\-decoration\\\-skip|text\\\-decoration\\\-style|text\\\-effect|text\\\-emphasis|text\\\-emphasis\\\-color|text\\\-emphasis\\\-position|text\\\-emphasis\\\-skip|text\\\-emphasis\\\-style|text\\\-fill\\\-color|text\\\-fit|text\\\-height|text\\\-indent|text\\\-justify|text\\\-justify\\\-trim|text\\\-kashida|text\\\-kashida\\\-space|text\\\-line\\\-through|text\\\-orientation|text\\\-outline|text\\\-overflow|text\\\-rendering|text\\\-security|text\\\-shadow|text\\\-size\\\-adjust|text\\\-space\\\-collapse|text\\\-spacing|text\\\-stroke|text\\\-stroke\\\-color|text\\\-stroke\\\-width|text\\\-transform|text\\\-trim|text\\\-underline|text\\\-underline\\\-color|text\\\-underline\\\-position|text\\\-underline\\\-style|text\\\-wrap|\\\:\\\:thumb|\\\:\\\:ticks\\\-after|\\\:\\\:ticks\\\-before|toggle|\\\:\\\:tooltip|top|top\\\-bar\\\-button|touch\\\-action|touch\\\-callout|touch\\\-enabled|\\\:\\\:track|transform|transform\\\-origin|transform\\\-origin\\\-x|transform\\\-origin\\\-y|transform\\\-origin\\\-z|transform\\\-style|transition|transition\\\-delay|transition\\\-duration|transition\\\-property|transition\\\-repeat\\\-count|transition\\\-timing\\\-function|translate|translateX|translateY|translateZ|translate3d|\\\:tree\\\-checkbox|\\\:tree\\\-cell|\\\:tree\\\-cell\\\-text|\\\:tree\\\-cell\\\-text\\\(hover\\\)|\\\:tree\\\-column|\\\:tree\\\-drop\\\-feedback|\\\:tree\\\-image|\\\:tree\\\-indentation|\\\:tree\\\-line|\\\:tree\\\-progressmeter|\\\:tree\\\-row|\\\:tree\\\-row\\\(hover\\\)|\\\:tree\\\-separator|\\\:tree\\\-twisty|turn|\\\:ui\\\-invalid|\\\:ui\\\-valid|unicode\\\-bidi|unicode\\\-range|url|use\\\-link\\\-source|user\\\-drag|\\\:user\\\-error|user\\\-focus|user\\\-input|user\\\-modify|user\\\-select|user\\\-zoom|\\\:valid|\\\:\\\:value|var|var\\\-\\\*|vector\\\-effect|vertical\\\-align|version|vh|\\\@viewport|\\\:viewport|\\\@viewport|\\\:viewport\\\-scroll|visibility|\\\:visited|vmax|vmin|voice\\\-balance|voice\\\-duration|voice\\\-family|voice\\\-pitch|voice\\\-pitch\\\-range|voice\\\-range|voice\\\-rate|voice\\\-stress|voice\\\-volume|volume|vw|\\\-wap\\\-|\\\-webkit\\\-|white\\\-space|widows|width|width|\\\:window\\\-inactive|windows\\\-classic|windows\\\-compositor|windows\\\-default\\\-theme|window\\\-shadow|windows\\\-theme|word\\\-break|word\\\-spacing|word\\\-wrap|wrap|wrap\\\-flow|wrap\\\-margin|wrap\\\-padding|wrap\\\-through|writing\\\-mode|\\\:\\\:xul\\\-anonymous\\\-block|\\\-xv\\\-|z\\\-index|zoom)\b/igm],
    //['<span id="parameter">$&</span>', /\b(AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGray|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGray|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGray|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gray|Green|GreenYellow|HoneyDew|HotPink|IndianRed |Indigo |Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGray|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGray|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|RebeccaPurple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGray|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)\b/igm],
    ['<span id="selector">$&</span>', /(?!(.*?)\\\:(.*?)\\\;)^(.*?)([\w\S].+)(?=(\\\{([\s\S]*?)\\\}|\\\,))/igm],
    ['<span id="attribute">$&</span>', /([\w\_\-].+)(?=\:(.*?)(\;|([\s\S])\}))/igm],
    ['<span id="digit">$&</span>', /(?!(.*?)\<colouring\>)(([^\D])(([\d\.]*?))(em|ex|\\\%|px|cm|mm|in|pt|pc|ch|rem|vh|vw|vmin|vmax)|([\d\.]+)(?=\W))/igm],
    ['<span id="character">$&</span>', /(?!(.*?)\<colouring\>)(\\[^\w\s\n\'\"\&\_\-\;\<\>\/\@\*])+/igm]
  ];
  
  //------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------COLORIZING-------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  $.each($('pre[language="css"]'), function() {
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
    for (a = 0; a < css.length; a++) {
      str = str.replace(css[a][1], css[a][0]);
    }
    //----------------------------------------------------REMOVE
    for (a = 0; a < removeChar.length; a++) {
      str = str.replace(removeChar[a][0], function(rep) {
        return rep.replace(removeChar[a][1], removeChar[a][2]);
      });
    }
    //----------------------------------------------------FIX
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
  $.each($('pre[language="css"]'), function() {
    var str = $(this).html();
    str = str.replace(/\\/igm, '');
    $(this).html(str);
  });
  
  //------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------SPLIT----------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  $.each($('pre[language="css"]'), function() {
    var str = $(this).html();
    str = str.replace(/([\s\S]+)/igm, '<span id="all-number"></span><span id="all-code">$&</span>');
    $(this).html(str);
  });
  
  //------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------NUMBERING-------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  $.each($('pre[language="css"]').find('span[id="all-code"]'), function(line) {
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
  $.each($('pre[language="css"]'), function() {
    var str = $(this).html();
    for (a = 0; a < features.length; a++) {
      str = str.replace(features[a][1], features[a][0]);
    }
    $(this).html(str);
  });
  //----------------------------------------------------CLICK
  $('pre[language="css"]').find('span[id="all-code"]').click(function() {
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
