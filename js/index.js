$(window).load(function() {

  var userInfo;
  // Request and location callback
  function here() {
    var locApi = "http://ipinfo.io/json";
    var getLocal = function(data) {
      userInfo = data.city;
      $(".location").text(userInfo);
      theWeather(data.city);
    }
    $.getJSON(locApi, getLocal);
  }

  // Request and callback for weather API ( using private key * please apply for your own * )

  function theWeather(loc) {
    var userWeather = 'http://api.openweathermap.org/data/2.5/weather?q=' + loc + '&units=metric&appid=e3a078e7be8eb6a7af327201e24418c9';
    var getWeather = function(weatherful) {
      console.log(weatherful);
      // Get C
      var temperature = Math.round(weatherful.main.temp);
      // Convert to F
      var far = Math.round(temperature * 1.8 + 32);

      $('.temp').text(temperature + '°C');

      // Get the weather desciption
      $('.weathertype').text(weatherful.weather[0].description);
      var weatherCatagory = weatherful.weather[0].main;

      // Check what the weather catagory is
      switch (weatherCatagory) {
        case "Clear":
          $('body').css('background', 'linear-gradient(to bottom right, #85d1f5 40%, blue) no-repeat center center fixed');
          $('.fa').addClass('fa-sun-o');
          break;
        case "Rain":
          $('body').css('background', 'linear-gradient(to bottom right, #b9c3ce 40%, #6182b9) no-repeat center center fixed');
          $('.fa').addClass('fa-umbrella');
          break;
        case "Thunderstorm":
          $('body').css('background', 'linear-gradient(to bottom right, #d1ccdd 40%, #46466e) no-repeat center center fixed');
          $('.fa').addClass('fa-bolt');
          break;
        case "Drizzle":
          $('body').css('background', 'linear-gradient(to bottom right, #d5e1f3 40%, #314e7f) no-repeat center center fixed');
          $('.fa').addClass('fa-tint');
          break;
        case "Clouds":
          $('body').css('background', 'linear-gradient(to bottom right, #d5e1f3 40%, #3a7ce9) no-repeat center center fixed');
          $('.fa').addClass('fa-cloud');
          break;
        case "Snow":
          $('body').css('background', 'linear-gradient(to bottom right, #e0e4e8 40%, #98aabd) no-repeat center center fixed');
          $('.fa').addClass('fa-asterisk');
          break;
        case "Atmosphere":
          $('body').css('background', 'linear-gradient(to bottom right, #e6dbd5 40%, #979b9f) no-repeat center center fixed');
          break;
        case "Extreme":
          $('body').css('background', 'linear-gradient(to bottom right, #eddcd4 40%, #b09e96) no-repeat center center fixed');
          break;
        case "Additional":
          $('body').css('background', 'linear-gradient(to bottom right, #d9eae4 40%, #90b8b9) no-repeat center center fixed');
          break;
      }

      // Apply sunset, night, and sunrise backgrounds

      var sunsetTime = new Date(weatherful.sys.sunset * 1000);
      var darkHours = sunsetTime.getHours();
      var sunriseTime = new Date(weatherful.sys.sunrise * 1000);
      var lightHours = sunriseTime.getHours();
      var userTime = new Date().getHours();

      if (userTime == darkHours - 1) {
        $('body').css('background', 'linear-gradient(to bottom right, #ed7819 40%, #433f5e) no-repeat center center fixed');
      }

      if (userTime >= darkHours || userTime >= 0 && userTime <= lightHours) {
        $('body').css('background', 'linear-gradient(to bottom right, #433f5e 40%, #111114) no-repeat center center fixed');
      }

      if (userTime == lightHours + 1) {
        $('body').css('background', 'linear-gradient(to bottom right, #f8ab50 40%, #de3267) no-repeat center center fixed');
      }

      // Switch between C and F
      $(".alternative").click(function() {
        $(this).toggleClass("f");
        if ($(".alternative").hasClass("f")) {
          $(".alternative").text("- Switch to °C");
          $(".temp").text(far + "°F");
        } else {
          $(".alternative").text("- Switch to °F");
          $(".temp").text(temperature + "°C");
        }
      });

    }
    $.getJSON(userWeather, getWeather);

  }

  here();

  // If weather / location API fails

  if ($('.temp').text() === '') {
    $('.temp').text('-°C');
    $('.weathertype').text('Weather Unavailable');
  }

});