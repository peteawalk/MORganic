//Vars
var marketLocations = [];
var farmersMarketIdArray = [];

function initialApiCall() {
    var zipCode = $('#address').val();
    console.log(zipCode);

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
};

function getDetails(id) {
    for (n = 0; n < farmersMarketIdArray.length; n++) {
        var id = farmersMarketIdArray[n];
        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            // submit a get request to the restful service mktDetail.
            url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" + id,
            dataType: 'jsonp'
        }).then(function (secondResponse) {
            var marketDetails = secondResponse.marketdetails
            var marketAddress = marketDetails.Address
            var marketProducts = marketDetails.Products
            var marketSchedule = marketDetails.Schedule
            marketLocations.push(marketAddress);
            console.log(`marketLocations array: ${marketLocations}`);
            $("#marketDetails").append(`Address: ${marketAddress} <br>`);
            $("#marketDetails").append(`Products: ${marketProducts} <br>`);
            $("#marketDetails").append(`Schedule: ${marketSchedule} <br>`);
        })
    }

}

// // Need to set address to the returned address from the Farmer's Market API
// var marketLocations = ["11th St & Main St, Blue Springs, Missouri, 64015", "113 SE Douglas Street, Lee's Summit, Missouri, 64063", "8th and Goode Streets, Grandview, Missouri, 64030"];
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: {
            lat: 38.899,
            lng: -94.725
        }
    });

    var geocoder = new google.maps.Geocoder();
    document.getElementById('submit').addEventListener('click', function () {
        initialApiCall();
        geocodeAddress(geocoder, map);
    });

}


function geocodeAddress(geocoder, resultsMap) {
    // let city = document.getElementById('city').value.trim();
    // let state = document.getElementById('state').value.trim();
    let zipCode = document.getElementById('address').value;
    for (j = 0; j < marketLocations.length; j++) {
        let address = marketLocations[j];
        console.log(`geocoder address: ${address}`);

        // var address = document.getElementById('address').value; // Set this to address from API.
        geocoder.geocode({
            'address': address
        }, function (results, status) {
            if (status === 'OK') {
                console.log(status);
                resultsMap.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: resultsMap,
                    position: results[0].geometry.location
                });
            } else {
                console.log('Geocode was not successful for the following reason: ' + status);
            }
        });
    }
}