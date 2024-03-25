const handleInput = function () {
  const charLen = $(this).val().length;
  const charLeft = 140 - charLen;
  const counter = $(this).siblings().find('.counter');

  $(counter).val(charLeft);
  if (charLeft < 0) {
    $(counter).css('color', 'red');
  } else $(counter).css('color', 'inherit');
};

$(document).ready(function () {
  console.log('ready, set, go!');
  $('textarea').on('input', handleInput);
});
