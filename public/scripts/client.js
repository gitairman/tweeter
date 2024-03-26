/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
          <p>${text}</p>
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
};

const isTweetValid = function (form) {
  const inputText = $(form).find('textarea').val().trim();
  if (!inputText) return 'Please type some text';
  const charLeft = $(form).find('.counter').val();
  if (charLeft < 0)
    return `Message is currently ${Math.abs(
      charLeft
    )} characters over the limit`;
};

const handleSubmit = function (e) {
  e.preventDefault();
  const tweetInvalid = isTweetValid(this);
  if (tweetInvalid) return alert(tweetInvalid);

  const data = $(this).serialize();

  $.ajax({
    method: 'POST',
    url: '/tweets',
    data,
  })
    .done(function (res) {
      $('#tweets-container').empty();
      loadTweets();
      e.target.reset();
      $(e.target).find('.counter').val(140);
    })
    .fail((err) => console.log(err));
};

$(document).ready(function () {
  $('#new_tweet_form').on('submit', handleSubmit);
  loadTweets();
});
