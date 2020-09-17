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
var detailsboxEl = $("#detailsBoxes");
var randomBtnEL = $("#random-submit");
var clicked = 0;
var latitude = "";
var longitude = "";

//Functions

<<<<<<< HEAD
//function to create Cusines filter dropdown
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
=======
  //function to create Cusines filter dropdown 
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

  //Get Coordinates function for users location 
  function getCoordinates(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    // console.log(latitude, longitude);
    localStorage.setItem("latitude", latitude);
    localStorage.setItem("longitude", longitude);
    getCuisines();
    
  }

  // Search the resturant results based on location 
  
  function restaurantSearch(){
    latitude = localStorage.getItem("latitude");
    longitude = localStorage.getItem("longitude");
    var radius = 5000;
    var queryURL = "http://developers.zomato.com/api/v2.1/search?radius=" +
    radius + 
    "&lat=" +
    latitude + 
    "648&lon=" +
    longitude;
    $.ajax({
      url:queryURL, 
      method: "GET", 
      headers: {
        "user-key": "614739258008e260c13bec9702dcb738",
        "content-type": "application/json",
      }
    }).then(function (response) {
      // console.log(response)
    
      var randomNum = Math.floor(Math.random() * 19) + 1; 
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
      moreBtn.addClass('button has-text-weight-bold is-primary is-rounded is-normal mt-6 mb-6');
      webURL.attr("href", response.restaurants[randomNum].restaurant.url);
      //text
  
      h3Name.text(response.restaurants[randomNum].restaurant.name);
      pAdress.text(response.restaurants[randomNum].restaurant.location.address);
      pNum.text("Phone Number: " + response.restaurants[randomNum].restaurant.phone_numbers);
      pHours.text("Hours: " + response.restaurants[randomNum].restaurant.timings);
      pCuisineType.text("Type of Cuisine: " + response.restaurants[randomNum].restaurant.cuisines);
      webURL.text("Visit Site");
     
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
        moreBtn
      );
      moreBtn.on("click", function (event) {
        event.preventDefault();
        window.open("details.html")
      })

    });
    
  };


  // Event Listeners

  randomBtnEL.on("click", function (event) {
    event.preventDefault();
    clicked++
    // console.log(clicked)
    if (clicked > 3) {
      detailsboxEl.prepend($("<h2> HANGRY? Pick a place. <h2>").addClass("is-size-1 has-text-weight-bold mt-6"));

    } else {
      
      restaurantSearch ();
>>>>>>> 5db8f5299e0674d57ad0b540f8ef528088010e8b
    }
  });
}

window.navigator.geolocation.getCurrentPosition(getCoordinates);

//Get Coordinates function for users location
function getCoordinates(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  console.log(latitude, longitude);
  getCuisines();
}

//function to create the details box
function createBox() {
  // console.log("clicked")
  var randomNum = Math.floor(Math.random() * 19) + 1;

  // creating the favorites button
  var faveButton = $("<button>").text("Add to favorites");
  faveButton.addClass(
    "button has-text-weight-bold is-primary is-rounded is-normal mt-6 mb-6"
  );

  console.log(document.faveButton);

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
    moreBtn,
    faveButton
  );
  moreBtn.on("click", function (event) {
    event.preventDefault();
    window.open("details.html");
  });
}

// Event Listeners

randomBtnEL.on("click", function (event) {
  event.preventDefault();
  clicked++;
  // console.log(clicked)
  if (clicked > 3) {
    detailsboxEl.prepend(
      $("<h2> HANGRY? Pick a place. <h2>").addClass(
        "is-size-1 has-text-weight-bold mt-6"
      )
    );
  } else {
    createBox();
  }
});
