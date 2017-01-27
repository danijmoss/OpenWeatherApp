//Make sure to mention to add https:// to beginning of codepen url to avoid errors

//Get geolocation of the user
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    //User Coordinates 
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    //console.log(lat, lon);
    
    //OpenWeatherMap url and API key
    var secure = "https://cors-anywhere.herokuapp.com/";
    var baseURL = "http://api.openweathermap.org/data/2.5/weather?";
    var apiKey = "2ca568839db1b37c90c1d38842418e08";
 
    //User OpenWeatherMap url, coordinates, and api key to pull 
    //in JSON information
      $.getJSON(secure + baseURL + "lat=" + lat + "&lon=" + lon + "&APPID=" + apiKey, function(json) {

        //Date and Clock Widget

        //Month for side widget date
        var dateMonth = moment().format("MM");
        $("#dateMonth").html(dateMonth + " / ");

        //Day for side widget date
        var dateDay = moment().format("DD");
        $(".dateDay").html(dateDay);

        //Abbreviated weekday for side widget
        var todayAbbrv = moment().format("ddd");
        $("#todayAbbrv").html(todayAbbrv);

        //Time for side widget
        var dateTimeString = moment().format("LT");
        $("#clock").html(dateTimeString);

        //Today's name abbreviated
        var weekdayNow = moment().format("ddd");
        $(".weekdayNow").html(weekdayNow);

        //City name and country
        var city = json.name;
        var country = json.sys.country;
        // console.log(country);
        $("#city").html(city + ", " + country);


        //Weather Details

        //Weather details variables
        var wind = json.wind.speed;
        var humidity = json.main.humidity;

        //Short description for weather condition
        var descShort;

        //Code from OpenWeatherMap API JSON call to link to 
        //Weather Icons CSS for weather condition icon
        var iconCode;

        //Get the country code
        //var country;  


        //For loop to get short description and icon code
        for (i = 0; i < json.weather.length; i++) {
           descShort = json.weather[i].description;
           iconCode = json.weather[i].id;
           //console.log(iconCode);
        }

        //Place weather icon below date in yellow block
        $(".icon").html("<i class='wi wi-owm-" + iconCode +"'></i>");


        //Print weather details with variables
        $("#weatherDetails").html("This is today's forecast for the " + city + " area. <br/> Temp: <span id='temp'>" + Ftemp + " &deg;F </span><br/> <span class='text-capitalize'>" + descShort + "</span> <br/> Wind Speed: <span id='wind'>" + wind + " mph</span> <br/> Humidity: " + humidity + "% <br/><button id='convertTemp' class='btn btn-default btn-xs' role='button'>Convert F&deg; / C&deg;</button><br/><button id='convertSpeed' class='btn btn-default btn-xs' role='button'>Convert mph / kph</button>");


        //Temp display and conversions
        //Reference for Temperature formulas: http://www.rapidtables.com/convert/temperature/how-kelvin-to-fahrenheit.htm

        //Temp default: Kelvin
        var Ktemp = json.main.temp;
        // console.log(Ktemp);
        
        //Temp in Farenheit
        var Ftemp = Math.round((Ktemp * 1.8) - 459.67)
        $("#temp").html(Ftemp).append(" °F");
        
        //Setting default temp conversion starting state
        var tempState = 0;
           
        $("#convertTemp").click(function() {
          if(tempState === 0) {
            //Convert temperature to Celsius
            var Ctemp = Math.round(Ktemp - 273.15);
            //console.log(Ctemp); 
            //Show temp conversion with °C
            $("#temp").html(Ctemp).append(" °C");
            
            //Change temp state to 1
            tempState = 1;
          }
          else {
            //Leave the temperature in Farenheit
            var Ftemp = Math.round((Ktemp * 1.8) - 459.67);
            //Show temp conversion with °F
            $("#temp").html(Ftemp).append(" °F");
            
            //Switch temp state back to starting state
            tempState = 0;
          }
       
        });
        
        //Reference for conversion: https://www.checkyourmath.com/convert/speed/per_hour/mph_km_per_hour.php
        //Convert wind speed from mph to kpm
        var windState = 0;
        $("#convertSpeed").click(function() {
          if(windState === 0) {
            //Convert wind speed to kmp
            var kpmSpeed = Math.round(wind * 1.609344);
            console.log(kpmSpeed); 
            //Show wind conversion with kpm
            $("#wind").html(kpmSpeed).append(" kpm");
            
            //Change wind state to 1
            windState = 1;
          }
          else {
            
            //Show wind speed conversion with mph
            $("#wind").html(wind).append("  mph");
            
            //Switch temp state back to starting state
            windState = 0;
          }
       
        });

        //Test for JSON data to display on the page
        //$("#test").html(JSON.stringify(json));
        // console.log(json);   
      });
  });
}
        
        

//=================================================================
//=================================================================
//Skycons
//       var icons = new Skycons({ "color": "blue" });

//       icons.set("clear-day", Skycons.CLEAR_DAY);
//       icons.set("clear-night", Skycons.CLEAR_NIGHT);
//       icons.set("partly-cloudy-day", Skycons.PARTLY_CLOUDY_DAY);
//       icons.set("partly-cloudy-night", Skycons.PARTLY_CLOUDY_NIGHT);
//       icons.set("cloudy", Skycons.CLOUDY);
//       icons.set("rain", Skycons.RAIN);
//       icons.set("sleet", Skycons.SLEET);
//       icons.set("snow", Skycons.SNOW);
//       icons.set("wind", Skycons.WIND);
//       icons.set("fog", Skycons.FOG);
//      icons.play();

//=================================================================
//=================================================================

//Using Skycons as classes and not ids
//Source: http://stackoverflow.com/questions/38615768/how-to-use-id-twice-in-javascript-with-skycons
// var icons = new Skycons({
//         // "color": "#73879C"
//         "color": "blue"
//     }),
//     list = [
//         "clear-day", "clear-night", "partly-cloudy-day",
//         "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
//         "fog"
//     ],
//     i;

// for (i = list.length; i--;) {
//     var weatherType = list[i],
//         elements = document.getElementsByClassName(weatherType);
//     for (e = elements.length; e--;) {
//         icons.set(elements[e], weatherType);
//     }
// }
// icons.play();