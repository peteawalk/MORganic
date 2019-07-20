var map;
var infoWindow;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 38.899, //KU Edwards Campus
            lng: -94.725
        },
        zoom: 11
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


$("#kcMarkets").on("click", function () {
    $(".list").append(window.open("https://www.google.com/maps/search/farmers+market+kansas+city/@39.0824499,-94.6327636,11z"));
})