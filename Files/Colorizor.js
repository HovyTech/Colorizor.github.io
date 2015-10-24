$(document).ready(function() {
  $.each($('pre'), function() {
    alert($(this).attr('language'))
  });
});
