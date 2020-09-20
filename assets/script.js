//Bulma nav bar burger click function
$(document).ready(function () {
  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function () {
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });

  //Variables
  var detailsBoxEl = $("#detailsBoxes");
  var randomBtnEL = $("#random-submit");
  var filterBtnEL = $("#filter-submit");
  var clicked = 0;
  var latitude = "";
  var longitude = "";
  var selectedCuisine = "";
  var deselectedCuisine = "";
  var deselectedCuisineName = "";
  var moreRestID;
  var favoritesName = [];
  var favoritesId = [];
  var previewBoxEl;

  //Functions
  // runs function to ask user for location
  window.navigator.geolocation.getCurrentPosition(getCoordinates);

  //Get Coordinates function for users location
  function getCoordinates(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    localStorage.setItem("latitude", latitude);
    localStorage.setItem("longitude", longitude);
    getCuisines();
  }

  //get the favorite restaurants list on page load
  function getfavorites() {
    if (
      localStorage.getItem("FavName") != null &&
      localStorage.getItem("FavID") != null
    ) {
      var localStorageArrName = JSON.parse(
        localStorage.getItem("FavName").split(",")
      );
      favoritesName = localStorageArrName;
      var localStorageArrId = JSON.parse(
        localStorage.getItem("FavID").split(",")
      );
      favoritesId = localStorageArrId;
      //render favorites list
    }
  }
  getfavorites();

  //function to create Cuisines filter dropdown
  function getCuisines() {
    var queryURL =
      "https://developers.zomato.com/api/v2.1/cuisines?&lat=" +
      latitude +
      "&lon=" +
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
        var newOption = $("<option>");
        newOption.text(cuisineArr[cuisineIndex].cuisine.cuisine_name);
        newOption.attr("id", cuisineArr[cuisineIndex].cuisine.cuisine_id);
        $(".cuisine-dropdown").append(newOption);
      }
    });
  }

  // Search the restaurant results based on location - API call

  function restaurantSearch() {
    // add a header on the first click
    if (clicked === 1) {
      detailsBoxEl.empty();
      var headerEl = $("<h1>")
        .text("Here's what we found for you!")
        .addClass("is-size-3");
      detailsBoxEl.append(headerEl);
      previewBoxEl = $("<div>");
      detailsBoxEl.append(previewBoxEl);
      var clearResultsButton = $("<button>").text("Clear Results");
      clearResultsButton.addClass(
        "button has-text-weight-bold is-primary is-rounded is-large mt-6 mb-6"
      );
      clearResultsButton.attr("id", "clear-results-btn");
      detailsBoxEl.append(clearResultsButton);
    }
    // get latitude and longitude from local storage
    latitude = localStorage.getItem("latitude");
    longitude = localStorage.getItem("longitude");
    var radius = 1000;
    var queryURL =
      "https://developers.zomato.com/api/v2.1/search?radius=" +
      radius +
      "&lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&sort=real_distance&order=asc";
    // make API call
    $.ajax({
      url: queryURL,
      method: "GET",
      headers: {
        "user-key": "614739258008e260c13bec9702dcb738",
        "content-type": "application/json",
      },
    }).then(function (response) {
      // get a random number
      var randomNum = Math.floor(Math.random() * 19) + 1;
      //create elements
      var boxEl = $("<div>");
      var detailsBox1 = $("<article>");
      var imageEl = $("<div>");
      var imageFig = $("<figure>");
      var imgSrc = $("<img>");
      var contentEl = $("<div>");
      var contentDiv = $("<div>");
      var h3Name = $("<h1>");
      var pCuisineType = $("<p>");
      var moreBtn = $("<button>");
      var pHours = $("<p>");
      var faveBtn = $("<button>").text("Add to Favorites");
      var imgURL = "";
      // if no image is present, use stock image
      if (
        response.restaurants[randomNum].restaurant.featured_img != undefined
      ) {
        imgURL = response.restaurants[randomNum].restaurant.featured_img;
      } else {
        imgURL = "https://static.thenounproject.com/png/978640-200.png";
      }

      // if no cuisine or hours are present, use N/A
      var cuisines = response.restaurants[randomNum].restaurant.cuisines;
      var hours = response.restaurants[randomNum].restaurant.timings;
      if (cuisines === "") {
        cuisines = "N/A";
      }
      if (hours === "") {
        hours = "N/A";
      }

      //attributes
      moreBtn.addClass(
        "button has-text-weight-bold is-primary is-rounded is-normal mt-6 mb-6"
      );
      faveBtn.addClass(
        "button has-text-weight-bold is-primary is-rounded is-normal mt-6 mb-6"
      );
      faveBtn.attr("id", "faveBtnF");
      faveBtn.attr("rest-id", response.restaurants[randomNum].restaurant.id);
      faveBtn.attr(
        "rest-name",
        response.restaurants[randomNum].restaurant.name
      );
      h3Name.text(response.restaurants[randomNum].restaurant.name);
      h3Name.addClass("is-size-2 is-family-code");
      pHours.text("Hours: " + hours);
      pCuisineType.text("Type of Cuisine: " + cuisines);

      moreBtn.text("More info");
      moreBtn.attr("id", "moreBtn");
      moreBtn.attr("rest-id", response.restaurants[randomNum].restaurant.id);

      //append
      boxEl.addClass("box py-6 is-centered");
      imgSrc.attr("src", imgURL);
      imgSrc.attr("id", "preview-image");
      imageFig.append(imgSrc);
      imageEl.append(imageFig, h3Name);
      contentDiv.append(pCuisineType, pHours, moreBtn, faveBtn);
      contentEl.append(contentDiv);
      detailsBox1.append(imageEl, contentEl);
      boxEl.append(detailsBox1);
      previewBoxEl.prepend(boxEl);
    });
  }

  function filteredSearch() {
    // get latitude and longitude from local storage
    latitude = localStorage.getItem("latitude");
    longitude = localStorage.getItem("longitude");
    var radius = 1000;
    var queryURL =
      "https://developers.zomato.com/api/v2.1/search?radius=" +
      radius +
      "&lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&cuisines=" +
      selectedCuisine +
      "&sort=real_distance&order=asc";
    // make API call
    $.ajax({
      url: queryURL,
      method: "GET",
      headers: {
        "user-key": "cce5f51e69604fc081fc15cd37642e9d",
        "content-type": "application/json",
      },
    }).then(function (response) {
      // empty the details box of previous information
      detailsBoxEl.empty();
      // for loop to render 3 results
      for (var i = 0; i < 3; i++) {
        // get a random number
        var randomIndex = Math.floor(
          Math.random() * response.restaurants.length
        );
        // create elements
        var boxEl = $("<div>");
        var detailsBox1 = $("<article>");
        var imageEl = $("<div>");
        var imageFig = $("<figure>");
        var imgSrc = $("<img>");
        var contentEl = $("<div>");
        var contentDiv = $("<div>");
        var h3Name = $("<h1>");
        var pCuisineType = $("<p>");
        var moreBtn = $("<button>");
        var faveBtn = $("<button>").text("Add to Favorites");
        var pHours = $("<p>");
        var faveBtn = $("<button>").text("Add to Favorites");
        var imgURL = "";
        // if no image is present, use stock image
        if (
          response.restaurants[randomIndex].restaurant.featured_img != undefined
        ) {
          imgURL = response.restaurants[randomIndex].restaurant.featured_img;
        } else {
          imgURL = "https://static.thenounproject.com/png/978640-200.png";
        }
        // if cuisine is equal to the negative filter, stop and loop again
        if (
          response.restaurants[randomIndex].restaurant.cuisines.includes(
            deselectedCuisineName
          ) === true
        ) {
          i--;
          // if cuisine is not equal to negative filter, add details box and continue
        } else {
          var cuisines = response.restaurants[randomIndex].restaurant.cuisines;
          var hours = response.restaurants[randomIndex].restaurant.timings;
          // if no cuisine or hours are present, use N/A
          if (cuisines === "") {
            cuisines = "N/A";
          }
          if (hours === "") {
            hours = "N/A";
          }
          //attributes
          detailsBoxEl.addClass("media");
          imageEl.addClass("media-left");
          moreBtn.attr("id", "moreBtn");
          moreBtn.attr(
            "rest-id",
            response.restaurants[randomIndex].restaurant.id
          );
          h3Name.text(response.restaurants[randomIndex].restaurant.name);
          h3Name.addClass("is-size-2 is-family-code");
          pHours.text("Hours: " + hours);
          pCuisineType.text("Type of Cuisine: " + cuisines);
          moreBtn.text("More info");
          moreBtn.addClass(
            "button has-text-weight-bold is-primary is-rounded is-normal mt-6 mb-6"
          );
          faveBtn.addClass(
            "button has-text-weight-bold is-primary is-rounded is-normal mt-6 mb-6"
          );
          faveBtn.attr("id", "faveBtnF");
          faveBtn.attr(
            "rest-id",
            response.restaurants[randomIndex].restaurant.id
          );
          faveBtn.attr(
            "rest-name",
            response.restaurants[randomIndex].restaurant.name
          );
          boxEl.addClass("box py-6 is-centered");
          imgSrc.attr("src", imgURL);
          imgSrc.attr("id", "preview-image");
          // append
          imageFig.append(imgSrc);
          imageEl.append(imageFig, h3Name);
          contentDiv.append(pCuisineType, pHours, moreBtn, faveBtn);
          contentEl.append(contentDiv);
          detailsBox1.append(imageEl, contentEl);
          boxEl.append(detailsBox1);
          detailsBoxEl.prepend(boxEl);
        }
      }
      // add header above boxes
      detailsBoxEl.prepend(
        $("<h1>").text("Here are your top 3 results!").addClass("is-size-3")
      );
      // add clear button below boxes
      var clearResultsButton = $("<button>").text("Clear Results");
      clearResultsButton.addClass(
        "button has-text-weight-bold is-primary is-rounded is-large mt-6 mb-6"
      );
      clearResultsButton.attr("id", "clear-results-btn");
      detailsBoxEl.append(clearResultsButton);
    });
  }

  // Event Listeners
  // listener for click on random search button
  randomBtnEL.on("click", function (event) {
    event.preventDefault();
    clicked++;
    // display message on fourth click and reset number of clicks, otherwise search restaurants
    if (clicked > 3) {
      previewBoxEl.prepend(
        $("<h2> HANGRY? Pick a place. <h2>").addClass(
          "is-size-1 has-text-weight-bold mt-6"
        )
      );
      clicked = 0;
    } else {
      restaurantSearch();
    }
  });

  // listens for click on filtered search button
  filterBtnEL.on("click", function (event) {
    event.preventDefault();
    // get restaurant ids from selected and deselected cuisines
    selectedCuisine = $("#selected-cuisine > option:selected").attr("id");
    deselectedCuisine = $("#unselected-cuisine > option:selected").attr("id");
    deselectedCuisineName = $("#unselected-cuisine > option:selected").val();
    // reset clicks to zero
    clicked = 0;
    // target error message div
    var errorMessage = $("#error-message");
    // if both drop downs are empty, render error message
    if (selectedCuisine === "null" && deselectedCuisine === "null") {
      errorMessage.empty();
      errorMessage
        .text("You must select one option!")
        .addClass("is-size-3 has-text-danger-dark");
      // if both drop downs are the same, render error message
    } else if (selectedCuisine === deselectedCuisine) {
      errorMessage.empty();
      errorMessage
        .text(
          "You must be hangry, you're delirious! Positive and negative selections cannot be the same thing."
        )
        .addClass("is-size-3 has-text-danger-dark");
      // otherwise, empty error message and run filtered search
    } else {
      errorMessage.empty();
      filteredSearch();
    }
  });

  // event listener for click on more info button
  detailsBoxEl.on("click", "#moreBtn", function (event) {
    event.preventDefault();
    // get the restaurant id from the button, save to local storage and open details page
    moreRestID = $(this).attr("rest-id");
    localStorage.setItem("moreRestId", moreRestID);
    window.open("details.html");
  });
  // event listener for click on add to favorites button
  detailsBoxEl.on("click", "#faveBtnF", function (event) {
    event.preventDefault();
    // get restaurant name and id from button and push to local storage array
    var fav = $(this).attr("rest-name");
    favoritesName.push(fav);
    localStorage.setItem("FavName", JSON.stringify(favoritesName));
    var favId = $(this).attr("rest-id");
    favoritesId.push(favId);
    localStorage.setItem("FavID", JSON.stringify(favoritesId));
  });

  // event listener for click on clear results button, resets clicks to 0 and empties details boxes
  detailsBoxEl.on("click", "#clear-results-btn", function (event) {
    event.preventDefault();
    clicked = 0;
    detailsBoxEl.empty();
  });
});
