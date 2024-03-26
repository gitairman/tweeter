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
      console.log(res);
      renderTweets(res);
    })
    .fail((err) => console.log(err));
};

const handlePost = function (data) {
  console.log(data);
};

const handleSubmit = function (e) {
  e.preventDefault();

  const data = $(this).serialize();
  if (!data.slice(5)) return alert('Please type some text');
  const charLeft = $(this).find('.counter').val();

  if (charLeft < 0)
    return alert(
      `Message is currently ${
        Math.abs(charLeft) + 140
      } characters, but must be less than 140.`
    );

  $.ajax({
    method: 'POST',
    url: '/tweets',
    data,
  })
    .done(function (res) {
      console.log(res);
      renderTweets([res]);
    })
    .fail((err) => console.log(err));
};

$(document).ready(function () {
  $('#new_tweet_form').on('submit', handleSubmit);
  loadTweets();
});
