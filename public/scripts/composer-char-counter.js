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

    // Change the text color based on the number of characters
    if (charactersLeft < 0) {
      $('#character-counter').css("color", "red");
    } else {
      $('#character-counter').css("color", "#545149");
    }
  });
  
});