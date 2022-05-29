$(function() {
    $("graphic").hover(function() {
      $('message-graphic').css('hidden', 'yellow');
    }, function() {
      // on mouseout, reset the background colour
      $('message-graphic').css('hidden', '');
    });
  });