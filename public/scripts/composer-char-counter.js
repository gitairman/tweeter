// handleInput counts the characters typed into the textarea portion
// of the new tweet form and counts down from 140 then displays it
const handleInput = function () {
  const $input = $(this);
  const $errorDiv = $input.parent().siblings('.new_tweet_error');
  const errorClear = $errorDiv.hasClass('hidden');
  if (!errorClear) $errorDiv.addClass('hidden');

  const charLen = $input.val().length;
  const charLeft = 140 - charLen;
  const $counter = $input.siblings().find('.counter');

  $counter.text(charLeft);
  if (charLeft < 0) $counter.addClass('char-limit');
  else $counter.removeClass('char-limit');
};

$(document).ready(function () {
  $('textarea').on('input', handleInput);
});
