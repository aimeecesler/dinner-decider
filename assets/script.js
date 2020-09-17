//Bulga nav bar burger click function
$(document).ready(function () {
  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function () {
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });
  $("#map").toggleClass("inactive");
});

//Variables
var detailsboxEl = $("#detailsBoxes");
var randomBtnEL = $("#random-submit");
var clicked = 0



//Functions
function createBox() {
  console.log("clicked");
  var randomNum = Math.floor(Math.random() * 19) + 1;

  // GET the geoloaction for the user
  //GET cityID for that location
  // GET cuisines in that location
  //create a random number between 1-10 to grab a resturant at that index
  // var ZomatoURL =
  //  $.ajax(
  //   url:,
  //   method: "GET"
  // )
  //create elements
  var detailsBox1 = $("<article>");
  var h3Name = $("<h3>");
  var moreBtn = $("<button>");
  var pAdress = $("<p>");
  var pNum = $("<p>");
  var pHours = $("<p>");
  var pCuisineType = $("<p>");
  var webURL = $("<a>");
  var pMenuItem = $("<p>");

  //attributes
  moreBtn.addClass(
    "button has-text-weight-bold is-primary is-rounded is-normal mt-6 mb-6"
  );
  //text

  //attributes 
  moreBtn.addClass('button has-text-weight-bold is-primary is-rounded is-normal mt-6 mb-6');
  //text

  h3Name.text("Name");
  pAdress.text("address");
  pNum.text("Phone Number");
  pHours.text("Hours");
  pCuisineType.text("Cuisine");
  webURL.text("Resturant Link");
  pMenuItem.text("Top Item");
  moreBtn.text("More info");

  var latitude = "";
  var longitude = "";

  function getCuisines() {
    var queryURL =
      "https://developers.zomato.com/api/v2.1/cuisines?&lat=" +
      latitude +
      "648&lon=" +
      longitude;
    $.ajax({
      url: queryURL,
      method: "GET",
      headers: {
        "user-key": "1bd06c11f1c9593babc2673ca5dd7d34",
        "content-type": "application/json",
      },
    }).then(function (response) {
      var cuisineArr = response.cuisines;
      for (
        var cuisineIndex = 0; cuisineIndex < cuisineArr.length; cuisineIndex++
      ) {
        $(".cuisine-dropdown").append(
          $("<option>").text(cuisineArr[cuisineIndex].cuisine.cuisine_name)
        );
      }
    });
  }

  window.navigator.geolocation.getCurrentPosition(getCoordinates);

  function getCoordinates(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    console.log(latitude, longitude);
    getCuisines();
  }

  //append
  detailsboxEl.append(detailsBox1);
  detailsBox1.append(
    h3Name,
    pAdress,
    pNum,
    pHours,
    pCuisineType,
    webURL,
    pMenuItem,
    moreBtn
  );
<<<<<<< HEAD
<<<<<<< HEAD
  mapboxgl.accessToken =
    "pk.eyJ1IjoiaWNlY2ljbGUwNCIsImEiOiJja2Y1aTN0d2QwbjZ2MzJrdXdrb2pkaWh0In0.R70c-4ioETiAZ9SOJgYNlQ";
  var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
=======
}

function getCuisines() {
  var queryURL =
    "https://developers.zomato.com/api/v2.1/cuisines?&lat=" +
    latitude +
    "648&lon=" +
    longitude;
  $.ajax({
    url: queryURL,
    method: "GET",
    headers: {
      "user-key": "1bd06c11f1c9593babc2673ca5dd7d34",
      "content-type": "application/json",
    },
  }).then(function (response) {
    var cuisineArr = response.cuisines;
    for (
      var cuisineIndex = 0;
      cuisineIndex < cuisineArr.length;
      cuisineIndex++
    ) {
      $(".cuisine-dropdown").append(
        $("<option>").text(cuisineArr[cuisineIndex].cuisine.cuisine_name)
      );
    }
>>>>>>> 4e6f7c615073f6b930efed095fd8b1d886a7800f
  });
}
=======
  moreBtn.on("click", function (event) {
    event.preventDefault();
    window.open("details.html")
  })
};
>>>>>>> 0c6772ae53c3b7d516aa2d6639e160f28386d28e

// Event Listeners

randomBtnEL.on("click", function (event) {
  event.preventDefault();
  clicked++
  // console.log(clicked)
  if (clicked > 3) {
    detailsboxEl.prepend($("<h2> HANGRY? Pick a place. <h2>").addClass("is-size-1 has-text-weight-bold mt-6"));

  } else {
    createBox();
  }
});
<<<<<<< HEAD
<<<<<<< HEAD

// <!-- map box map -->
// <figure class="image is-200x300">
//   <div
//     id="map"
//     style="width: 400px; height: 300px"
//     class="disabled"
//   ></div>
// </figure>
=======
>>>>>>> 4e6f7c615073f6b930efed095fd8b1d886a7800f
=======

}
>>>>>>> 0c6772ae53c3b7d516aa2d6639e160f28386d28e
