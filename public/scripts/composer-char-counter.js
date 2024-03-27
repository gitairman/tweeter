const handleInput = function () {
  const errorDiv = $(this).parent().siblings('.new_tweet_error');
  const errorClear = errorDiv.hasClass('hidden');
  if (!errorClear) errorDiv.addClass('hidden');

  const charLen = $(this).val().length;
  const charLeft = 140 - charLen;
  const counter = $(this).siblings().find('.counter');

  $(counter).text(charLeft);
  if (charLeft < 0) $(counter).addClass('char-limit');
  else $(counter).removeClass('char-limit');
};

$(document).ready(function () {
  console.log('ready, set, go!');
  $('textarea').on('input', handleInput);
});
