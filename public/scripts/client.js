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
  $.ajax({ method: 'GET', url: '/tweets' }).done(function (res) {
    console.log(res);
    renderTweets(res);
  });
};
loadTweets();

const handlePost = function (data) {
  console.log(data);
};

const handleSubmit = function (e) {
  e.preventDefault();
  console.log(e);
  console.log($(this).serialize());
  const data = $(this).serialize();
  $.ajax({
    method: 'POST',
    url: '/tweets',
    data,
  }).done(function (res) {
    console.log(res);
    renderTweets([res]);
  });
};

$(document).ready(function () {
  $('#new_tweet_form').on('submit', handleSubmit);
});
