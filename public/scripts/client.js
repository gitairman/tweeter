/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const xssSafe = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = (tweetData) => {
  const {
    user: { name, avatars, handle },
    content: { text },
    created_at,
  } = tweetData;
  return `
      <article class="tweet">
        <header>
          <div class="tweet_author">
            <img src=${avatars} alt="${name}'s avatar"/>
            <span>${name}</span>
          </div>
          <span class="handle"> ${handle} </span>
        </header>
        <section class="tweet_text">
          <p>${xssSafe(text)}</p>
        </section>
        <footer>
          <time>${timeago.format(created_at)}</time>
          <div class="icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-regular fa-heart"></i>
          </div>
        </footer>
      </article>
`;
};

const renderTweets = (tweets) => {
  tweets.forEach((tweet) => {
    $('#tweets-container').prepend(createTweetElement(tweet));
  });
};

const loadTweets = function () {
  $.ajax({ method: 'GET', url: '/tweets' })
    .done(function (res) {
      renderTweets(res);
    })
    .fail((err) => console.log(err));
  $(document).find('textarea').focus();
};

const isTweetValid = function (form) {
  const inputText = $(form).find('textarea').val().trim();
  if (!inputText) return 'Please type some text!';
  const charLeft = $(form).find('.counter').val();
  if (charLeft < 0)
    return `Message is currently ${Math.abs(
      charLeft
    )} characters over the limit!`;
};

const handleSubmit = function (e) {
  e.preventDefault();
  const tweetInvalid = isTweetValid(this);
  const errorDiv = $('.new_tweet_error');
  if (tweetInvalid) {
    errorDiv.find('p').text(tweetInvalid);
    errorDiv.removeClass('hidden');
    $(this).find('textarea').focus();
    return;
  }

  const data = $(this).serialize();

  $.ajax({
    method: 'POST',
    url: '/tweets',
    data,
  })
    .done(function () {
      e.target.reset();
      $(e.target).find('.counter').val(140);
      errorDiv.addClass('hidden');
      $('#tweets-container').empty();
      loadTweets();
    })
    .fail((err) => console.log(err));
};

const handleNewClick = function (e) {
  const formHidden = $('.new-tweet').is(':hidden');
  if (formHidden)
    return $('.new-tweet').slideDown(800, () => {
      $(this).find('i').addClass('down');
      $('textarea').focus();
    });
  $('.new-tweet').slideUp(800, () => $(this).find('i').removeClass('down'));
};

$(document).ready(function () {
  $('#new_tweet_form').on('submit', handleSubmit);
  loadTweets();
  $('#new_tweet').on('click', handleNewClick);
});
