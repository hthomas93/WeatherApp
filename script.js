//INITIALIZING
//====================================================================================
var today = (moment().format('MMMM Do YYYY'))
$("#current-date").text(today);
// initializes the submitted latitude and longitude at 0
var citySubmitLat = 0;
var citySubmitLong = 0;
// initialize variables mapped to DOM elements
var recentSearchList = $("#recent-searches");
var clearButton = $("#clear-btn");
var citySearch = $("#city-search");
// intializes the cityList array which contains our search history to a blank array
var cityList = [];

// initalizing function loads recent searches and weather information for last search
init();

//CLICK EVENTS
//=====================================================================================
// sets the clear button to clear the localStorage
$("#clear-btn").on("click", function (event) {
    localStorage.clear();
})

$(".previous-searches").on("click", function (event) {
    console.log("clicked");
    $("#city-search").text(this.text());
})

// When the search button is clicked...
$("#search").on("click", function (event) {
    // The previous forecasted day divs are removed
    $(".weather-days").remove();
    // The previous search list is removed
    $(".search-list").remove();
    // Prevents the page from reloading to its default state, after the previous added elements are removed.
    event.preventDefault();

    // Sets the citySubmit variable to the value in the city-search field
    var citySubmit = $("#city-search").val();

    // Runs the citySearches function with the citySubmit as the passed argument
    citySearches(citySubmit);
    // Sets the forecastURL variable to be a query url for the next five days forecasted
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySubmit + "&appid=83ec25aafa25787879adb49e8ad70c00&units=imperial";

    // Sets the currentWeatherURL variable to be a query url for the current weather
    var currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySubmit + "&appid=83ec25aafa25787879adb49e8ad70c00&units=imperial";

    // Ajax call for the current weather
    $.ajax({
        url: currentWeatherURL,
        method: "GET"
    }).then(function (response) {
        // Sets the current city name to the submitted city name
        $("#city-name-current").text(citySubmit);
        // Sets the current city weather information to the response info
        $("#temperature-main").text("Temperature: " + Math.floor(response.main.temp) + "°F");
        $("#humidity-main").text("Humidity: " + response.main.humidity + "%");
        $("#windspeed-main").text("Wind-speed: " + response.wind.speed + " mph");
        citySubmitLat = response.coord.lat;
        citySubmitLon = response.coord.lon;
    });

    // Ajax call for the forecasted weather
    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function (response) {
        console.log(forecastURL);
        console.log(response);

        // Declares generateForecast function with arguments day, time, endtime
        function generateForecast(day, startTime, endTime) {
            // Maxtemp array initialized to 0; average humidity variable initialized to 0
            maxTemp = [];
            avgHum = 0;
            // Weather status initialized to a time in the middle of the day
            weatherStatus = response.list[startTime + 4].weather[0].main;
            // Determines the HTML of each div made for the forecast
            html =
                `<div class="weather-days">
            <h5 id="day${day}"></h5>
            <i id="day${day}-icon"></i>
            <p id="day${day}-temp">Temp: </p>
            <p id="day${day}-hum">Humidity: </p>
            </div>`;
            // Appends the HTML to the forecast-divs div
            $("#forecast-divs").append(html);

            // Main for-loop
            for (i = startTime; i < endTime; i++) {
                // Pushes max temperatures for every three hours to the maxTemp array
                maxTemp.push(Math.floor(response.list[i].main.temp_max));
                // Adds the average humidity for every three hours to the avgHum variable
                avgHum = avgHum + response.list[i].main.humidity;
            }
            // Sets the day temperature text to the maximum temperature in the maxTemp array
            $(`#day${day}-temp`).text("Temperature: " + Math.max.apply(Math, maxTemp));
            avgHum = (avgHum / 8);
            // Sets the average humidity text to the...well...average humidity
            $(`#day${day}-hum`).text("Humidity: " + avgHum);
            // Sets the date of the div
            $(`#day${day}`).text(moment().add(day, 'days').format("L"));
            // Calls the determineIcon function to determine which icon to use for the day's weather status
            determineIcon(weatherStatus, day);


        }
        // Calls the function for each day
        generateForecast(1, 1, 9);
        generateForecast(2, 10, 17);
        generateForecast(3, 18, 25);
        generateForecast(4, 26, 33);
        generateForecast(5, 34, 40);

        // Determines the weather icon for the forecasted divs depending on the weather status returned in the response
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

        // Declares uvURL to be a query url for the submitted city's uv count
        var uvURL = `http://api.openweathermap.org/data/2.5/uvi?appid=83ec25aafa25787879adb49e8ad70c00&lat=${citySubmitLat}&lon=${citySubmitLon}`;

        // Ajax call for the UV info
        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            $("#uv-main").text("UV index: " + response.value);
        });
    })

})

// Initializing function. Loads the stored searched cities.
function init() {
    // Sets storedCities variable to be the cityList array parsed from localStorage
    var storedCities = JSON.parse(localStorage.getItem("cityList"));
    // If the variable is not null (has more than 0 values)
    if (storedCities !== null) {
        cityList = storedCities;
    }
    renderCities();
}

// Initializing function that displays the recent searches based on localStorage information
function renderCities() {
    // Render a new city for each cityList element
    for (var i = 0; i < cityList.length; i++) {
        var city = cityList[i];
        var btn = $(`<btn type="submit" class = 'btn search-list previous-search' id = city${i}>${city}</button>`);
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

    // Push the submitted city to the cityList array
    cityList.push(city);
    $("#city-search").val("");

    // Store updated cities in localStorage, re-render the list
    storeCity();
    renderCities();
};




//TO-DO
//Make the app not look like shit

//Write the README, make it 

//When the recent search button is clicked
//citySubmit = the value of the search button
// execute the rest of the code for searching a city