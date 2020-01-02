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

// When the submit button is clicked
// A query is sent to the OWM api to grab information about the current weather
// An object is returned    
// From this object, populate the fields in the main card

$("button").on("click", function () {
    event.preventDefault();
    var citySubmit = $("#city-search").val();
    console.log(citySubmit);
})

// When the submit button is clicked
// A query is sent to the OWM api to grab information about the future weather
// An object is returned
// From this object, populate the fields of the 5-day forecast

// When the submit button is clicked
// The name of the city is saved to LocalStorage
// The last ten results searched are displayed below the search bar
