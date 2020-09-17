//Bulga nav bar burger click function
$(document).ready(function () {
  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function () {
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });
});

//Variables
detailsboxEl = $("#detailsBoxes");
randomBtnEL = $("#random-submit");
var latitude = "";
var longitude = "";



function getCoordinates(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  console.log(latitude, longitude);
  getCuisines();
}

//Functions
function createBox() {
  // console.log("clicked")
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
  console.log(response);
});
};

// Event Listeners

randomBtnEL.on("click", function (event) {
  window.navigator.geolocation.getCurrentPosition(getCoordinates);
  event.preventDefault();
  createBox();
});
