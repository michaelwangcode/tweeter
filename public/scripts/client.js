/* Loading tweets */

// Document ready (jQuery)
$(document).ready(function() {

  // Escape function
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

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
          <span class="tweet-text">${escape(tweet.content.text)}</span>
        </div>
        <div class="timestamp-and-buttons">
          <span class="timestamp">${timeago.format(tweet.created_at)}</span>
          <span class="buttons"><i class="fa-solid fa-flag"></i> <i class="fa-solid fa-retweet"></i> <i class="fa-solid fa-heart"></i></span>
        </div>
      </div>`);
    
    return $tweet;
  }

  
  // This function takes an array of tweets and adds them to the tweets-container
  const renderTweets = function(tweets) {

    // Remove all of the previous tweets before loading
    $('#tweets-container').empty();
    
    // Loop through the array of tweets in reverse order
    for (let i = tweets.length -1; i >= 0; i--) {

      // Create a tweet element in HTML
      let $tweet = createTweetElement(tweets[i]);

      // Append the tweet element to the tweets container
      $('#tweets-container').append($tweet);
    }
  }
  

  // This function gets all of the tweets from /tweets/ and renders them
  const loadTweets = function() {

    // Get the tweets from the /tweets/ page
    $.ajax('/tweets/', { method: 'GET' }).then(function (allTweets) {

      // Call the render function from above to display the tweets on index.html
      renderTweets(allTweets);
    });
  }


  // Load all of the tweets from the /tweets/ page
  loadTweets();


  // Actions performed when the submit tweet button is clicked
  $('#submit-tweet-form').submit(function(event){

    // Prevent default behavior from occuring (refresh/redirect)
    event.preventDefault() 

    // Store the text of the tweet
    let tweetText = $('#tweet-text').val();

    // If the tweet is blank or over 140 characters, display an error message
    if (tweetText === "" || tweetText === null) {
      alert("Tweet cannot be blank");
      return;
    } else if (tweetText.length > 140) {
      alert("Tweet must be less than 140 characters");
      return;
    }

    // Serialize the data in the tweet text area
    serializedData = $('#tweet-text').serialize();

    // Clear the text field
    $('#tweet-text').val('');

    // Submit a POST request that sends the serialized data to the server
    $.post("/tweets/", serializedData).done(function() {

      // Load the tweets
      loadTweets();
    });
  });


});