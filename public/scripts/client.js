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
          <time>${created_at}</time>
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

// Fake data taken from initial-tweets.json
const data = [
  {
    user: {
      name: 'Newton',
      avatars: 'https://i.imgur.com/73hZDYK.png',
      handle: '@SirIsaac',
    },
    content: {
      text: 'If I have seen further it is by standing on the shoulders of giants',
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: 'Descartes',
      avatars: 'https://i.imgur.com/nlhLi3I.png',
      handle: '@rd',
    },
    content: {
      text: 'Je pense , donc je suis',
    },
    created_at: 1461113959088,
  },
];

$(document).ready(function () {
  $('#new_tweet_form').on('submit', handleSubmit);
  renderTweets(data);
});
