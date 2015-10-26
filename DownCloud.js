javascript:(function(page, client, stream, json, url, index, name) {
  function loadJS(src, cb) {
    var ref = window.document.getElementsByTagName('script')[0];
    var script = window.document.createElement('script');
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
    if (cb && typeof(cb) === 'function') {
      script.onload = cb;
    }
    return script;
  }
  loadJS('https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js');
   
  var waitForLoad = function() {
    if (typeof jQuery != 'undefined') {
      page = window.location.href;
      page = page.split('://').join('://api-v2.');
         
      client = '9d43dd98637027e2f9764bc7219d9972';
         
      $.getJSON(page, function(data) {
        json = data;
      });
         
      $(document).on('dblclick', 'li', function() {
        index = $(this).index();
        stream = json.collection[index].stream_url;
        name = json.collection[index].title;
        url = stream + '?client_id=' + client;
        downloadMP3(url, name);
      });
    } else {
      window.setTimeout(waitForLoad, 60);
    }
  };
  window.setTimeout(waitForLoad, 60);
   
  function downloadMP3(href, title) {
    var link = document.createElement('a');
    if (link.download != 'undefined') {
      link.download = title;
    } else {
       
    }
    link.href = href;
    link.target = '_blank';
    link.click();
  }
})();
