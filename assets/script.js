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
detailsboxEl = $("#detailsBoxes");
randomBtnEL = $("#random-submit");

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

  h3Name.text("Name");
  pAdress.text("address");
  pNum.text("Phone Number");
  pHours.text("Hours");
  pCuisineType.text("Cuisine");
  webURL.text("Resturant Link");
  pMenuItem.text("Top Item");
  moreBtn.text("More info");

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
  mapboxgl.accessToken =
    "pk.eyJ1IjoiaWNlY2ljbGUwNCIsImEiOiJja2Y1aTN0d2QwbjZ2MzJrdXdrb2pkaWh0In0.R70c-4ioETiAZ9SOJgYNlQ";
  var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
  });
}

// Event Listeners

randomBtnEL.on("click", function (event) {
  event.preventDefault();
  createBox();
});

// <!-- map box map -->
// <figure class="image is-200x300">
//   <div
//     id="map"
//     style="width: 400px; height: 300px"
//     class="disabled"
//   ></div>
// </figure>
