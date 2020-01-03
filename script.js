// TO DO
//INITIALIZING THE DATES
//=============================================================
var today = moment().format('MMMM Do YYYY')
var day2 = moment().add(1, 'days').format('MMMM Do YYYY')
var day3 = moment().add(2, 'days').format('MMMM Do YYYY')
var day4 = moment().add(3, 'days').format('MMMM Do YYYY')
var day5 = moment().add(4, 'days').format('MMMM Do YYYY')
var day6 = moment().add(5, 'days').format('MMMM Do YYYY')
$("#current-date").text(today);
$("#day2").text(day2);
$("#day3").text(day3);
$("#day4").text(day4);
$("#day5").text(day5);
$("#day6").text(day6);

var day2Temp = [];
var day2Hum = 0;

// When the submit button is clicked
// A query is sent to the OWM api to grab information about the current weather
// An object is returned    
// From this object, populate the fields in the main card

$("button").on("click", function () {
    event.preventDefault();
    var citySubmit = $("#city-search").val();
    console.log(citySubmit);

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySubmit + "&appid=83ec25aafa25787879adb49e8ad70c00&units=imperial";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(queryURL);
        console.log(response);

        function day2InfoFind() {
            for (i = 1; i < 9; i++) {
                day2Temp.push(Math.floor(response.list[i].main.temp_max));
                day2Hum = day2Hum + response.list[i].main.humidity;
            }
            day2Temp = Math.max.apply(Math, day2Temp);
            console.log(day2Temp);
            day2Hum = (day2Hum / 8);
            console.log(day2Hum);
            document.querySelector("#day2-temp").innerHTML = day2Temp;
            document.querySelector("#day2-hum").innerHTML = day2Hum;

        }


        day2InfoFind();


        //write a function to calculate the temperature for the current day
        //for response[0] - response[7]

    })


})

// When the submit button is clicked
// A query is sent to the OWM api to grab information about the future weather
// An object is returned
// From this object, populate the fields of the 5-day forecast

// When the submit button is clicked
// The name of the city is saved to LocalStorage
// The last ten results searched are displayed below the search bar


// $.ajax({
//     url: queryURL,
//     method: "GET"
// }).then(function (response) {
//     console.log(queryURL);
//     var results = response;
//     var temperature = (((response.main.temp) - 273.15) * 1.8) + 32;
//     console.log(results);
//     console.log(temperature);
//     $("#city-name-current").text(citySubmit);
//     $("#temperature-main").text(Math.floor(temperature));
//     $("#humidity-main").text("Humidity: " + response.main.humidity);
//     $("#windspeed-main").text("Wind-speed: " + results.wind.speed + " mph");

// })