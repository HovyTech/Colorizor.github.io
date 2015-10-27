javascript:(function(page, client, stream, url, json, index, name, count) {
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

         count = 10;
         json = [];

         $.getJSON(page + '&limit=10&offset=' + (count - 10), function(data) {
            json.push(data.collection);
         });

         var checkUpdates = function() {
            if ($(document).find('li[class="searchList__item"]').length > count) {
               count = $(document).find('li[class="searchList__item"]').length;
               $.getJSON(page + '&limit=10&offset=' + (count - 10), function(data) {
                  json.push(data.collection);
               });
            }
            window.setTimeout(checkUpdates, 60);
         };
         window.setTimeout(checkUpdates, 60);

         $(document).on('dblclick', 'li', function() {
            index = $(this).index();
            if (index / 10 == 0) {
               stream = json[(((index / 10).toString().split('.')[0]) * 1) - 1][0].stream_url;
               name = json[(((index / 10).toString().split('.')[0]) * 1) - 1][0].title;
            } else {
               stream = json[(((index / 10).toString().split('.')[0]) * 1) - 1][((index / 10).toString().split('.')[1]) * 1].stream_url;
               name = json[(((index / 10).toString().split('.')[0]) * 1) - 1][((index / 10).toString().split('.')[1]) * 1].title;
            }
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
