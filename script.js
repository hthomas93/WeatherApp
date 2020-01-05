// TO DO
//INITIALIZING THE DATES
//=============================================================
var today = (moment().format('MMMM Do YYYY'))
$("#current-date").text(today);
var citySubmitLat = 0;
var citySubmitLong = 0;
var recentSearchList = $("#recent-searches");
var clearButton = $("#clear-btn");
var citySearch = $("#city-search");
var cityList = [];

init();

$("#clear-btn").on("click", function (event) {
    localStorage.clear();
})

$("#search").on("click", function (event) {
    $(".weather-days").remove();
    $(".search-list").remove();
    event.preventDefault();
    var citySubmit = $("#city-search").val();
    console.log(citySubmit);
    citySearches(citySubmit);
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
            $(`#day${day}`).text(moment().add(day, 'days').format("L"));
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

})

function init() {
    var storedCities = JSON.parse(localStorage.getItem("cityList"));
    if (storedCities !== null) {
        cityList = storedCities;
    }
    renderCities();
}

function renderCities() {
    recentSearchList.innerHTML = "";

    // Render a new city for each cityList element
    for (var i = 0; i < cityList.length; i++) {
        var city = cityList[i];
        var btn = $(`<btn class = 'btn search-list' id = city${i}>${city}</button>`);
        $(`#city${i}`).val(city);
        $("#recent-searches").prepend(btn);
        $("#recent-searches").prepend("<br>");
    }
}

function storeCity() {
    // Stringify and set "todos" key in localStorage to todos array
    localStorage.setItem("cityList", JSON.stringify(cityList));
}

function citySearches(city) {
    // Return from function early if submitted todoText is blank
    if (citySearch === "") {
        return;
    }

    cityList.push(city);
    $("#city-search").val("");

    // Store updated todos in localStorage, re-render the list
    storeCity();
    renderCities();
};



//TO-DO
//Make the app not look like shit

//Write the README, make it 

//Implement clear button feature
