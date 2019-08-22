$(document).ready(function(){

    let heightSignUp = $(".sign-up-form").height();
    let heightFirstBlock = $("#first-block").height();
    let sum = heightFirstBlock + heightSignUp;

    $(".btnSignUp").on("click", function(){

        $("#first-block").height(sum);
        

    });


});