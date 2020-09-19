$(document).ready(function () {
  var restID = localStorage.getItem("moreRestId");

  getRestaurantInfo();
  var h1El = $("#rName");
  var h2El = $("#rTimings");
  var h3El = $("#rAvgCost");
  var h4El = $("#rHighlights");

  function getRestaurantInfo() {
    var queryURL =
      "https://developers.zomato.com/api/v2.1/restaurant?res_id=" + restID;
    $.ajax({
      url: queryURL,
      method: "GET",
      headers: {
        "user-key": "cce5f51e69604fc081fc15cd37642e9d",
        "content-type": "application/json",
      },
    }).then(function (response) {
      console.log(response);
      var rLatitude = response.location.latitude;
      var rLongitude = response.location.longitude;
      // adds map
      mapboxgl.accessToken =
        "pk.eyJ1IjoiaWNlY2ljbGUwNCIsImEiOiJja2Y1aTN0d2QwbjZ2MzJrdXdrb2pkaWh0In0.R70c-4ioETiAZ9SOJgYNlQ";
      var map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
        center: [rLongitude, rLatitude], // starting position [lng, lat]
        zoom: 14, // starting zoom
      });
      // adds map marker
      var marker = new mapboxgl.Marker()
        .setLngLat([rLongitude, rLatitude])
        .addTo(map);
      // appending restaurant details
      h1Name = response.name;
      h2Timings = "Timings: " + response.timings;
      h3AvgCost = "Average Cost for Two: $ " + response.average_cost_for_two;
      h4Highlights = "Highlights: " + response.highlights;
      // console.log(h1Name);
      h1El.append(h1Name);
      h2El.append(h2Timings);
      h3El.append(h3AvgCost);
      h4El.append(h4Highlights);
      // var appendedName = rName;
      // appendedName.append$("rName");
    });
  }
});
