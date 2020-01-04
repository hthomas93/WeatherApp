// TO DO
//INITIALIZING THE DATES
//=============================================================
var today = (moment().format('MMMM Do YYYY'))
$("#current-date").text(today);
var citySubmitLat = 0;
var citySubmitLong = 0;
var cityCount = 0;


$("button").on("click", function () {
    $(".weather-days").remove();
    event.preventDefault();
    var citySubmit = $("#city-search").val();
    // save City Submit to localstorage
    citySearch(citySubmit);
    // make a new div and add it below the search bar
    var todayUV = 0;
    console.log(citySubmit);

    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySubmit + "&appid=83ec25aafa25787879adb49e8ad70c00&units=imperial";

    var currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySubmit + "&appid=83ec25aafa25787879adb49e8ad70c00&units=imperial";


    $.ajax({
        url: currentWeatherURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $("#city-name-current").text(citySubmit);
        $("#temperature-main").text("Temperature " + Math.floor(response.main.temp) + "°F");
        $("#humidity-main").text("Humidity: " + response.main.humidity + "%");
        $("#windspeed-main").text("Wind-speed: " + response.wind.speed + " mph");
        citySubmitLat = response.coord.lat;
        citySubmitLon = response.coord.lon;
    });

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
            console.log(weatherStatus);
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
            else if (weatherStatus == "Thunderstorm") {
                $(`#day${day}-icon`).addClass("fas fa-bolt");
            }
            else if (weatherStatus == "Drizzle") {
                $(`#day${day}-icon`).addClass("fas fa-cloud-rain");
            }
            else if (weatherStatus == "Rain") {
                $(`#day${day}-icon`).addClass("fas fa-cloud-showers-heavy");
            }
            else if (weatherStatus == "Snow") {
                $(`#day${day}-icon`).addClass("fas fa-snowflake");
            }
            else if (weatherStatus == "Clouds") {
                $(`#day${day}-icon`).addClass("fas fa-cloud");
            }
            else {
                $(`#day${day}-icon`).addClass("fas fa-water");
            }

        }

        var uvURL = `http://api.openweathermap.org/data/2.5/uvi?appid=83ec25aafa25787879adb49e8ad70c00&lat=${citySubmitLat}&lon=${citySubmitLon}`;

        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            $("#uv-main").text("UV index: " + response.value);
        });
    })

    function citySearch(city) {
        localStorage.setItem(`city${cityCount}`, city);
        cityCount++;
        $("#recent-searches").prepend(`<div class = "search-list">${city}</div`);
    }

})

//TO-DO
//Have the recent searches persist after refreshing the page
// 
