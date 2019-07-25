//Vars
farmersMarketID = [];
var marketURL = "https://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=64063";

$(document).ready(function () {

    $("#submit").on("click", function () {

        $.ajax({
            url: marketURL,
            type: "GET" //or POST to send data 
            //data: data, // if the type is POST
        }).then(function (response) {
            // for (var a = 0; a < response.length; a++) {
            console.log(response);
            // }
        });
    });
});