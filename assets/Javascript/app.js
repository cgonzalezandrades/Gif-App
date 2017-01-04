var apiKey = key;

$(document).on("click", ".gif-in-page", animateGif);
$(document).on("click", 'button', showGif);

//showGif run the API and appends the gif the HTML 
function showGif() {

  $(".gif").empty();

  var searchWord = $(this).data('animal');


  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchWord + "&limit=25&api_key=" + apiKey;



  $.ajax({
      url: queryURL,
      method: 'GET'
    })
    .done(function (response) {

      var $divGif = $("<div>")
      var $p = $('<p>');
      var gif = response.data;

      console.log(response.data);


      for (var i = 0; gif.length > i; i++) {

        var $divGif = $("<div>").addClass("col-sm-3");
        var $p = $('<p>');

        var gifImage = $("<img>")
          .addClass("gif-in-page img-rounded")
          .attr({
            "src": gif[i].images.fixed_height_small.url,
            "data-still": gif[i].images.fixed_height_small_still.url,
            "data-state": 'animate',
            "data-animate": gif[i].images.fixed_height_small.url
          });

        $p.append("<h4>This Gif is rated " + gif[i].rating.toUpperCase() + "</h4>");

        $divGif.append(gifImage);
        $divGif.append($p);

        $(".gif").append($divGif);
      }
    });
}

//This function animate or pause the Gif
function animateGif() {

  var state = $(this).attr('data-state');

  if (state === 'animate') {
    $(this).attr({
      'src': $(this).data('still'),
      "data-state": 'still'
    });
  }
  if (state === 'still') {
    $(this).attr({
      'src': $(this).data('animate'),
      'data-state': 'animate'
    });
  }
}

//This function reads the user input and pass into a new button
function submit() {
  var text = $('#user-input').val().trim();
  var button = $("<button>");

  button.addClass("btn-pokemon btn btn-btn-success animal")
  button.attr('data-animal', text);
  button.html(text);

  if (!$('#user-input').val()) {
    
    $('#text-input').html("I see you left the box empty. Maybe you dont like Pokemons ? Why dont you try something else then...").css("color","rgba(61, 103, 157, 0.9")
    
  } else {

    $('#buttons-gif').append(button);
    $('#text-input').html("Add a new Pokemon button").css("color","black");
    
  }
}