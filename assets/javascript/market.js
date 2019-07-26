$(document).ready(function () {
    //Vars
    var marketLocations = [];
    var farmersMarketIdArray = [];

    $("#submit").on("click", function () {
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
    });

    function getDetails() {
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

});