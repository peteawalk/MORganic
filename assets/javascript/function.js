// Need to set address to the returned address from the Farmer's Market API
var marketLocations = ["113 SE Douglas Street, Lee's Summit, Missouri, 64063", "11th St & Main St, Blue Springs, Missouri, 64015", "6210 Raytown Road, Raytown , Missouri, 64133"];

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
        geocodeAddress(geocoder, map);
    });
}

function geocodeAddress(geocoder, resultsMap) {
    let city = document.getElementById('city').value.trim();
    let state = document.getElementById('state').value.trim();
    let zipCode = document.getElementById('address').value;
    for (j = 0; j < marketLocations.length; j++) {
        address = marketLocations[j];
        console.log(address);

        // var address = document.getElementById('address').value; // Set this to address from API.
        geocoder.geocode({
            'address': address
        }, function (results, status) {
            if (status === 'OK') {
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