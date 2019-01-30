// ----- RENDERING BUTTONS -----

// Initial array of animals
var animals = ["cat", "lion", "hamster", "giraffe"];

// Function for displaying animal data
function renderButtons() {

    // Deleting the animal buttons prior to adding new animal buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#animals-view").empty();

    // Looping through the array of animals
    for (var i = 0; i < animals.length; i++) {
        // Then dynamicaly generating buttons for each movie in the array.
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class
        a.addClass("animal");
        // Adding a data-attribute with a value of the animal at index i
        a.attr("data-name", animals[i]);
        // Providing the button's text with a value of the animal at index i
        a.text(animals[i]);
        // Adding the button to the HTML
        $("#animals-view").append(a);
    }
}

    // This function handles events where one button is clicked
    $("#add-animal").on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var animal = $("#animal-input").val().trim();
    // The movie from the textbox is then added to our array
    animals.push(animal);

    // calling renderButtons which handles the processing of our animal array
    renderButtons();
    });

renderButtons();

// ----- AJAX -----

$("button").on("click", function() {
    var animal = $(this).attr("data-animal");
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      animal +
      "&api_key=ZBeZaYna5CmMS6yCo0ZDEYIxIFEJS1FX&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      console.log(response);
      const results = response.data;

      for (var i = 0; i < results.length; i++) {
        // Make a div with jQuery and store it in a variable named animalDiv.
        const animalDiv = $("<div>");
        // Make a paragraph tag with jQuery and store it in a variable named p.
        const p = $("<p>").text(results[i].rating);
        // Set the inner text of the paragraph to the rating of the image in results[i].
        //p.text(results[i].rating);
        // Make an image tag with jQuery and store it in a variable named animalImage.
        const animalImage = $("<img>");
        // Set the image's src to results[i]'s fixed_height.url.
        animalImage.attr("src", results[i].images.fixed_height.url);
        // Append the p variable to the animalDiv variable.
        animalDiv.append(p, animalImage);
        // Append the animalImage variable to the animalDiv variable.
        // Prepend the animalDiv variable to the element with an id of gifs-appear-here.
        $("#gifs-appear-here").prepend(animalDiv);

      }
    });
});


// ----- PAUSING/ANIMATING GIFS -----

$(".gif").on("click", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
});

