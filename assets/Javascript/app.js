
            $(document).on("click", ".gif-in-page", animateGif);
            $(document).on("click", 'button', showGif);


//showGif run the API and appends the gif the HTML 
            function showGif() {

                $(".gif").empty();

                var searchWord = $(this).data('animal');

                var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchWord + "&limit=25&api_key=dc6zaTOxFJmzC&limit=10";

                $.ajax({
                        url: queryURL,
                        method: 'GET'
                    })
                    .done(function (response) {

                        var $divGif = $("<div>")
                        var $p = $('<p>');
                        var gif = response.data;


                        for (var i = 0; gif.length > i; i++) {

                            var $divGif = $("<div>").addClass("col-sm-3");
                            var $p = $('<p>');
                            var gifImage = $("<img>").addClass("gif-in-page").attr({
                                "src": gif[i].images.fixed_height_small.url,
                                "data-still": gif[i].images.fixed_height_small_still.url,
                                "data-state": 'animate',
                                "data-animate": gif[i].images.fixed_height_small.url
                            });

                            $p.text("The rating is " + gif[i].rating.toUpperCase());

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

//This function reads the user input and pass it to a button
            function submit() {
                var text = $('#user-input').val().trim();
                var button = $("<button>");

                button.addClass("btn-pokemon btn btn-btn-success animal")
                button.attr('data-animal', text);
                button.html(text);
                $('#buttons-gif').append(button);
            }
