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



// When the submit button is clicked
// A query is sent to the OWM api to grab information about the current weather
// An object is returned    
// From this object, populate the fields in the main card

$("button").on("click", function () {
    event.preventDefault();
    var citySubmit = $("#city-search").val();
    console.log(citySubmit);

    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySubmit + "&appid=83ec25aafa25787879adb49e8ad70c00&units=imperial";

    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function (response) {
        console.log(forecastURL);
        console.log(response);


        function generateForecast(day, startTime, endTime) {
            maxTemp = [];
            avgHum = 0;
            weatherStatus = response.list[startTime + 4].weather[0].main;
            html =
                `<div class="weather-days">
            <h5 id="day${day}"></h5>
            <i id="day${day}-icon"></i>
            <p id="day${day}-temp">Temp: </p>
            <p id="day${day}-hum">Humidity: </p>
            </div>`;

            $("#forecast-divs").append(html);

            for (i = startTime; i < endTime; i++) {
                maxTemp.push(Math.floor(response.list[i].main.temp_max));
                avgHum = avgHum + response.list[i].main.humidity;
            }
            $(`#day${day}-temp`).text("Temperature " + Math.max.apply(Math, maxTemp));
            avgHum = (avgHum / 8);
            $(`#day${day}-hum`).text("Humidity " + avgHum);
            $(`#day${day}`).text(moment().add(day, 'days').format('MMMM Do YYYY'));
            determineIcon(weatherStatus, day);


        }

        generateForecast(1, 1, 9);
        generateForecast(2, 10, 17);
        generateForecast(3, 18, 25);
        generateForecast(4, 26, 33);
        generateForecast(5, 34, 40);

        function determineIcon(weatherStatus, day) {
            if (weatherStatus == "Clear") {
                $(`#day${day}-icon`).addClass("fas fa-sun");
            }
        }

        // function day2InfoFind() {
        //     for (i = 1; i < 9; i++) {
        //         // var weatherConditions = response.list[i].weather.main;
        //         var weatherConditions = response.list[i].weather[0].main;
        //         day2Temp.push(Math.floor(response.list[i].main.temp_max));
        //         day2Hum = day2Hum + response.list[i].main.humidity;
        //     }
        //     day2Temp = Math.max.apply(Math, day2Temp);
        //     console.log(day2Temp);
        //     day2Hum = (day2Hum / 8);
        //     console.log(day2Hum);
        //     document.querySelector("#day2-temp").innerHTML = day2Temp;
        //     document.querySelector("#day2-hum").innerHTML = day2Hum;

        // }

        // function day3InfoFind() {
        //     for (i = 10; i < 17; i++) {
        //         day3Temp.push(Math.floor(response.list[i].main.temp_max));
        //         day3Hum = day3Hum + response.list[i].main.humidity;
        //     }
        //     day3Temp = Math.max.apply(Math, day3Temp);
        //     console.log(day3Temp);
        //     day3Hum = (day3Hum / 8);
        //     console.log(day3Hum);
        //     document.querySelector("#day3-temp").innerHTML = day3Temp;
        //     document.querySelector("#day3-hum").innerHTML = day3Hum;

        // }

        // function day4InfoFind() {
        //     for (i = 18; i < 25; i++) {
        //         day4Temp.push(Math.floor(response.list[i].main.temp_max));
        //         day4Hum = day4Hum + response.list[i].main.humidity;
        //     }
        //     day4Temp = Math.max.apply(Math, day4Temp);
        //     console.log(day4Temp);
        //     day4Hum = (day4Hum / 8);
        //     console.log(day4Hum);
        //     document.querySelector("#day4-temp").innerHTML = day4Temp;
        //     document.querySelector("#day4-hum").innerHTML = day4Hum;

        // }

        // function day5InfoFind() {
        //     for (i = 26; i < 33; i++) {
        //         day5Temp.push(Math.floor(response.list[i].main.temp_max));
        //         day5Hum = day5Hum + response.list[i].main.humidity;
        //     }
        //     day5Temp = Math.max.apply(Math, day5Temp);
        //     console.log(day5Temp);
        //     day5Hum = (day5Hum / 8);
        //     console.log(day5Hum);
        //     document.querySelector("#day5-temp").innerHTML = day5Temp;
        //     document.querySelector("#day5-hum").innerHTML = day5Hum;

        // }

        // function day6InfoFind() {
        //     for (i = 34; i < 40; i++) {
        //         day6Temp.push(Math.floor(response.list[i].main.temp_max));
        //         day6Hum = day6Hum + response.list[i].main.humidity;
        //     }
        //     day6Temp = Math.max.apply(Math, day6Temp);
        //     console.log(day6Temp);
        //     day6Hum = (day6Hum / 8);
        //     console.log(day6Hum);
        //     document.querySelector("#day6-temp").innerHTML = day6Temp;
        //     document.querySelector("#day6-hum").innerHTML = day6Hum;

        // }

        // day2InfoFind();
        // day3InfoFind();
        // day4InfoFind();
        // day5InfoFind();
        // day6InfoFind();



    })


})




// $.ajax({
//     url: queryURL,
//     method: "GET"
// }).then(function (response) {
//     console.log(queryURL);
//     var results = response;
//     console.log(results);
//     console.log(temperature);
//     $("#city-name-current").text(citySubmit);
//     $("#temperature-main").text(Math.floor(temperature));
//     $("#humidity-main").text("Humidity: " + response.main.humidity);
//     $("#windspeed-main").text("Wind-speed: " + results.wind.speed + " mph");

// })