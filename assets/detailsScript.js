$(document).ready(function (event) {
  onload;

  //Bulma nav bar burger click function
  $(".navbar-burger").click(function () {
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });
  var restID = localStorage.getItem("moreRestId");

  // setting variables
  getRestaurantInfo();
  var h1El = $("#rName");
  var h2El = $("#rTimings");
  var h3El = $("#rAvgCost");
  var h4El = $("#rHighlights");
  var h5El = $("#rRating");
  var h6El = $("#rWebsite");
  var p7El = $("#rAddress");
  var p8El = $("#rPhoneNumber");

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
      h5Rating = "Rating: " + response.user_rating.aggregate_rating;
      h5Rating2 = " - " + response.user_rating.rating_text;
      h6Website = response.name + "'s" + " Website";
      p7Address = "Address: " + response.location.address;
      p8PhoneNumber = "Phone Number: " + response.phone_numbers;

      h1El.append(h1Name);
      h2El.append(h2Timings);
      h3El.append(h3AvgCost);
      h4El.append(h4Highlights);
      h5El.append(h5Rating, h5Rating2);
      h6El.append(h6Website);
      p7El.append(p7Address);
      p8El.append(p8PhoneNumber);

      // on click functions for buttons

      $("#rWebsite").on("click", function (event) {
        event.preventDefault();
        window.open(response.url);
      });
    });
    $("#dTryAgain").on("click", function (event) {
      event.preventDefault();
      window.open("index.html", "_self");
    });
  }
});
