/* Loading tweets */

// Document ready (jQuery)
$(document).ready(function() {

  // Test / driver code (temporary). Eventually will get this from the server.
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]


  // This function converts a tweet object into HTML
  const createTweetElement = function(tweet) {

    let $tweet = $(
      `<div class="tweet">
        <div class="user-info">
          <span class="picture-and-name">
            <img class="profile-picture-small" src=${tweet.user.avatars}>
            <span class="display-name">${tweet.user.name}</span>
          </span>
          <span class="username">${tweet.user.handle}</span>
        </div>
        <div class="tweet-body">
          <span class="tweet-text">${tweet.content.text}</span>
        </div>
        <div class="timestamp-and-buttons">
          <span class="timestamp">${tweet.created_at}</span>
          <span class="buttons"><i class="fa-solid fa-flag"></i> <i class="fa-solid fa-retweet"></i> <i class="fa-solid fa-heart"></i></span>
        </div>
      </div>`);
    
    return $tweet;
  }

  
  // This function takes an array of tweets and adds them to the tweets-container
  const renderTweets = function(tweets) {

    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (let tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    }
  }
  
  // Render the tweets onto the index.html page
  renderTweets(data);


  // Actions performed when the submit tweet button is clicked
  $('#submit-tweet-form').submit(function(event){

    // Prevent default behavior from occuring (refresh/redirect)
    event.preventDefault() 

    // Serialize the data in the tweet text area
    serializedData = $('#tweet-text').serialize();

    // Testing: show alert with text
    alert(serializedData);

    // Submit a POST request that sends the serialized data to the server
    $.post("/tweets/", serializedData).done(function() {
      console.log(serializedData);
    });
  });


});