alert("hello")
$("#search-icon").on("click", function() {

    $.ajax({
        dataType: "jsonp",
        url: "https://api.meetup.com/find/events",
        data: {
            "photo-host": "public",
            "sig_id": "224847105",
            "sig": "f8e37193cc99ef8da174b16ddd6ed43d2aa6aad2",
            "callback": "c"
        }
    }).then(
        function(response) {
            console.log('response from meetup:  ', response);
            var keyWord = $("#search-bar").val().trim().toLowerCase();
            var filteredEvents = response.data.filter(function(event) {
                var result = event.group.name.toLowerCase();
                 //console.log('event name', result);
               
                var finalResult = result.indexOf(keyWord)
                if(finalResult > -1) {
                    return true;
                } else {
                    return false;
                }
            });

            console.log('filtered', filteredEvents);
            $("#weather-info").append(filteredEvents);

                for (var i=0; i < filteredEvents.length; i++ )
                 {
            var eventName = filteredEvents[i].name;
            var eventLink = filteredEvents[i].link;
                eventLink   ='<a  href="' + eventLink + '" target="_blank">' + eventName + '</a>'
            //console.log(eventName); 
              // console.log("disc" + eventDisc);
               // Append event info to table on page
            var row = "<tr><td>" +  "<tr><td>" + eventLink  + "</tr></td>"
           
            $("#event-table").append(row);
        }
        

        })
    

})

  $.ajax({
        url: "http://api.openweathermap.org/data/2.5/forecast?q=San+Diego,um&appid=18ed86c7baa0b8c4d4bc482076710570&units=imperial",
         method: "GET"
     }).done(function(response) {
         console.log(response);
        
         var forecast = $("<h2>").text("5 Day Weather Forcast")
         $("#weather-info").append(forecast);

         for (var i = 5; i < 40; i += 8) {
            
             var todayDate = response.list[i].dt_txt;
             var convertedDate = moment(new Date(todayDate));
             var todayDateP = $("<p>");
             todayDateP.text(moment(convertedDate).format('dddd' + " " + "MMM Do YY"));
             var weather = response.list[i].weather[0].main;
             var weatherIcon = response.list[i].weather[0].icon;
             var weatherImg = $("<img>");
             weatherImg.attr("src", "http://openweathermap.org/img/w/" + weatherIcon + ".png");
             console.log(weatherImg);

             var temperature = Math.floor(response.list[i].main.temp);
             var tempP = $("<p>").text("Temperature: " + temperature + "\xB0F");
             console.log(temperature);

             var humidity = Math.floor(response.list[i].main.humidity);
             var humP = $("<p>").text("Humidity: " + humidity + " " +"%");

             var wind = Math.floor(response.list[i].wind.speed);
             var windP = $("<p>").text("Wind: " + wind + " " +"mph");
            
             $("#weather-info").append(todayDateP);
             $("#weather-info").append("Weather:" + " " + weather);
             $("#weather-info").append(weatherImg);
             $("#weather-info").append(tempP);
             $("#weather-info").append(humP);
             $("#weather-info").append(windP);
             console.log(i)
         }
         });


   $.ajax({
        url: "http://api.openweathermap.org/data/2.5/forecast?q=San+Diego,um&appid=18ed86c7baa0b8c4d4bc482076710570&units=imperial",
         method: "GET"
})
   var mapLayer = MQ.mapLayer();
    var map;

map = L.map('map', {
  layers: mapLayer,
  center: [40.7237, -73.9825],
  zoom: 14
});

L.control.layers({
  'Map': mapLayer,
  'Hybrid': MQ.hybridLayer(),
  'Satellite': MQ.satelliteLayer(),
  'Dark': MQ.darkLayer(),
  'Light': MQ.lightLayer()
}).addTo(map);

MQ.geocode().search('New York, NY').on('success', function(e) {
  var best = e.result.best;
  var latlng = best.latlng;

  map.setView(latlng, 14);

  L.marker([ latlng.lat, latlng.lng ])
      .addTo(map)
      .bindPopup(best.adminArea3 + ' is here.')
      .openPopup();
});

    L.mapquest.key = 'KEY';

// 'map' refers to a <div> element with the ID map
L.mapquest.map('map', {
  center: [37.7749, -122.4194],
  layers: L.mapquest.tileLayer('map'),
  zoom: 12
});

    