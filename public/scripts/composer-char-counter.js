/* Character counter */

// Document ready (jQuery)
$(document).ready(function() {

  // Actions performed when the text box has text inputted
  $('#tweet-text').on('input', function() {

    // Store the length of the text area
    let textLength = $(this).val().length;

    // Calculate the number of characters remaining
    let charactersLeft = 140 - textLength;

    // Set the character counter to the number of characters left
    $('#character-counter').val(charactersLeft);

    // Change the text color based on the number of characters by calling the new-tweet.css file
    if (charactersLeft < 0) {
      $('#character-counter').addClass("tweet-counter-red");
    } else {
      $('#character-counter').removeClass("tweet-counter-red");
    }
  });
  
});