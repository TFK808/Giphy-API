var wrestlers = ["Ric Flair", "Hulk Hogan", "Andre the Giant", "The Rock"];

function renderButtons() {

    $("#wrestlers-view").empty();

    for (var i = 0; i < wrestlers.length; i++) {
        var a = $("<button>");
        a.addClass("wrestlers");
        a.attr("data-name", wrestlers[i]);
        a.text(wrestlers[i]);
        $("#wrestlers-view").append(a);
    }
}

$("#add-wrestler").on("click", function(event) {
    event.preventDefault();
    var wrestler = $("#wrestler-input").val().trim();
    wrestlers.push(wrestler);
    renderButtons();
});

renderButtons();


//render buttons - not working
//ajax / giphy
//pause/animate
