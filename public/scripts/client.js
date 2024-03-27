/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// function to make text input to new tweet safe from cross-site scripting attacks
const xssSafe = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// createTweetElement takes in an object containing tweet data
// and returns a template literal containing html elements using
// the relevent variables contained in the tweet data
const createTweetElement = (tweetData) => {
  //destructure tweetData to make template more concise
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

// renderTweets takes in an array of tweet objects and
// passes each item in the array to the createTweetElement functions
// and finally prepends the resulting element to the tweets-container
const renderTweets = (tweets) => {
  tweets.forEach((tweet) => {
    $('#tweets-container').prepend(createTweetElement(tweet));
  });
};

// loadTweets makes an ajax request to the /tweets path
// to fetch tweets from the server
const loadTweets = function () {
  $.ajax({ method: 'GET', url: '/tweets' })
    .done(function (res) {
      renderTweets(res);
    })
    .fail((err) => console.log(err));
  $(document).find('textarea').focus();
};

// isTweetValid takes in the new tweet form node
// and checks to makes ure that the textarea field is not empty
// as well as checks the char counter to make sure input is not
// more than 140 characters.  Return is either a string or null.
const isTweetValid = function (form) {
  const inputText = $(form).find('textarea').val().trim();
  if (!inputText) return 'Please type some text!';
  const charLeft = $(form).find('.counter').val();
  if (charLeft < 0)
    return `Message is currently ${Math.abs(
      charLeft
    )} characters over the limit!`;

  return null;
};

// handleSubmit checks if tweet is valid before making a post
// request using jQuery ajax method.  When post is successfull
// form is reset, counter is reset, tweet container is emptied,
// and tweets are reloaded from server.
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

// handleNewClick checks if the new tweet form is hidden
// and if it is not it slides it down, otherwise it slides
// it up.
const handleNewClick = function (e) {
  const formHidden = $('.new-tweet').is(':hidden');
  if (formHidden)
    return $('.new-tweet').slideDown(800, () => {
      $(this).find('i').addClass('down');
      $('textarea').focus();
    });
  $('.new-tweet').slideUp(800, () => $(this).find('i').removeClass('down'));
};

// scrollFunc checks if window has been scrolled 400 pixels down
// and if so hides the new tweet button and unhides the scroll to top
// button, otherwise it unhides the new tweet button and hides the
// scroll to top button
const scrollFunc = () => {
  if ($(window).scrollTop() > 400) {
    $('#new_tweet').addClass('hidden');
    $('#to_top_btn').removeClass('hidden');
    return;
  }
  $('#new_tweet').removeClass('hidden');
  $('#to_top_btn').addClass('hidden');
};

// toTopFunc animates the transition of going back to the top
// and then focusses the textarea in case the user wants to write a new tweet
const toTopFunc = () => {
  $('html, body').animate({ scrollTop: '0' }, 1000);
  $('textarea').focus();
};

$(document).ready(function () {
  loadTweets();

  $('#new_tweet_form').on('submit', handleSubmit);
  $('#new_tweet').on('click', handleNewClick);
  $(window).on('scroll', scrollFunc);
  $('#to_top_btn').on('click', toTopFunc);
});
