//Vars
var marketLocations = [];
var farmersMarketIdArray = [];
var map;

$("#submit").on("click", function () {
    farmersMarketIdArray = [];
    $("#marketDetails").empty();
    marketLocations = [];

    var zipCode = $('#address').val();
    var marketURL = "https://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" + zipCode;

    $.ajax({
        url: marketURL,
        type: "GET" //or POST to send data 
        //data: data, // if the type is POST
    }).then(function (response) {
        var queryResults = response.results;
        console.table(queryResults);
        for (j = 0; j < 5; j++) { // Get top 5 closest farmer's markets.
            farmersMarketIdArray.push((queryResults[j].id));
        }
        console.log(`farmersMarketIdArray is: ${farmersMarketIdArray}`);
        getDetails();
    });


});




function getDetails(id) {
    for (n = 0; n < farmersMarketIdArray.length; n++) {
        var id = farmersMarketIdArray[n];
        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            // submit a get request to the restful service mktDetail.
            url: "https://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" + id,
            dataType: 'jsonp'
        }).then(function (secondResponse) {
            var marketDetails = secondResponse.marketdetails
            var marketAddress = marketDetails.Address
            var marketProducts = marketDetails.Products
            var marketSchedule = marketDetails.Schedule
            marketLocations.push(marketAddress);
            console.log(`marketLocations array: ${marketLocations}`);
            $("#marketDetails").append(` Location: ${marketAddress} <br>`);
            $("#marketDetails").append(` Items: ${marketProducts} <br>`);
            $("#marketDetails").append(` Open: ${marketSchedule} <br>`);
        })
        initMap(); // map displayed
    }




}


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: {
            lat: 38.899,
            lng: -94.725
        }
    });
}

$(document).on('click', '#viewmap', function () {
    var geocoder = new google.maps.Geocoder();
    geocodeAddress(geocoder, map);
});

function geocodeAddress(geocoder, map) {
    let zipCode = document.getElementById('address').value;
    for (j = 0; j < marketLocations.length; j++) {
        let address = marketLocations[j];

        geocoder.geocode({
            'address': address
        }, function (results, status) {
            if (status === 'OK') {
                console.log(status);
                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                });
            } else {
                console.log('Geocode was not successful for the following reason: ' + status);
            }
        });
    }
}

