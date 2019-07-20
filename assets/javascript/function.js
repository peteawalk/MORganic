
function displayanimalInfo() {

    //var city = $(this).attr("data-animal");
    var queryURL =
        "https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?api_key=Kb4RvBmaZ97LxOtipmzdPpj1OZcnJGTRrlu3EOY5&location=Denver+CO"


    $.ajax({
        url: queryURL,
        method: "POST"
    }).then(function (response) {

        var results = response.Operations;

        console.log(results);

    });


}











var map;
var infoWindow;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 38.899, //KU Edwards Campus
            lng: -94.725
        },
        zoom: 6
    });
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}