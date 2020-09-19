$(document).ready(function () {
  var restID = localStorage.getItem("moreRestId");

  getRestaurantInfo();

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
      console.log(rLatitude);
      console.log(rLongitude);

      mapboxgl.accessToken =
        "pk.eyJ1IjoiaWNlY2ljbGUwNCIsImEiOiJja2Y1aTN0d2QwbjZ2MzJrdXdrb2pkaWh0In0.R70c-4ioETiAZ9SOJgYNlQ";
      var map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
        center: [rLongitude, rLatitude], // starting position [lng, lat]
        zoom: 12, // starting zoom
      });
    });
  }
});
