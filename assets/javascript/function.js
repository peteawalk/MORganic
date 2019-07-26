
function displayanimalInfo() {

    //var city = $(this).attr("data-animal");
    var queryURL =
        "https://organicapi.ams.usda.gov/IntegrityPubDataServices/OidPublicDataService.svc/soap?api_key=fs8eDIZ5dYaS0SAqmwVyZEpIIgwqhm0FSofqHzSH"


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var results = response.data;

        console.log(results);

    });

}






