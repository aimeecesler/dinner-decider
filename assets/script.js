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
  var previewBoxEl;

  //Functions
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

  //Functions

  //function to create Cusines filter dropdown
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
      // console.log(response);
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

  // Search the resturant results based on location

  // Search the resturant results based on location

  function restaurantSearch() {
    if (clicked === 1) {
      detailsBoxEl.empty();
      var headerEl = $("<h1>")
        .text("Here's what we found for you!")
        .addClass("is-size-3");
      detailsBoxEl.append(headerEl);
      previewBoxEl = $("<div>");
      detailsBoxEl.append(previewBoxEl);
    } else {
    }
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
    $.ajax({
      url: queryURL,
      method: "GET",
      headers: {
        "user-key": "614739258008e260c13bec9702dcb738",
        "content-type": "application/json",
      },
    }).then(function (response) {
      // console.log(response);

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

      if (
        response.restaurants[randomNum].restaurant.featured_img != undefined
      ) {
        imgURL = response.restaurants[randomNum].restaurant.featured_img;
      } else {
        imgURL = "https://static.thenounproject.com/png/978640-200.png";
      }

      var cuisines = response.restaurants[randomNum].restaurant.cuisines;
      var hours = response.restaurants[randomNum].restaurant.timings;
      if (cuisines === ""){
        cuisines = "N/A"
      }
      if (hours === ""){
        hours = "N/A"
      }

      //attributes
      moreBtn.addClass(
        "button has-text-weight-bold is-primary is-rounded is-normal mt-6 mb-6"
      );
      faveBtn.addClass(
        "button has-text-weight-bold is-primary is-rounded is-normal mt-6 mb-6"
      );
      h3Name.text(response.restaurants[randomNum].restaurant.name);
      h3Name.addClass("is-size-2 is-family-code");
      pHours.text(
        "Hours: " + hours
      );
      pCuisineType.text(
        "Type of Cuisine: " +
          cuisines
      );

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
    $.ajax({
      url: queryURL,
      method: "GET",
      headers: {
        "user-key": "cce5f51e69604fc081fc15cd37642e9d",
        "content-type": "application/json",
      },
    }).then(function (response) {
      detailsBoxEl.empty();
      for (var i = 0; i < 3; i++) {
        var randomIndex = Math.floor(
          Math.random() * response.restaurants.length
        );
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

        if (
          response.restaurants[randomIndex].restaurant.featured_img != undefined
        ) {
          imgURL = response.restaurants[randomIndex].restaurant.featured_img;
        } else {
          imgURL = "https://static.thenounproject.com/png/978640-200.png";
        }
        console.log(
          response.restaurants[randomIndex].restaurant.cuisines.includes(
            deselectedCuisineName
          )
        );
        if (
          response.restaurants[randomIndex].restaurant.cuisines.includes(
            deselectedCuisineName
          ) === true
        ) {
          i--;
        } else {
          var cuisines = response.restaurants[randomIndex].restaurant.cuisines;
          var hours = response.restaurants[randomIndex].restaurant.timings;
          if (cuisines === ""){
            cuisines = "N/A"
          }
          if (hours === ""){
            hours = "N/A"
          }
          detailsBoxEl.addClass("box py-6 media");
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
          // faveBtn.attr("id", "fave-btn");

          boxEl.addClass("box py-6 is-centered");
          imgSrc.attr("src", imgURL);
          imgSrc.attr("id", "preview-image");
          imageFig.append(imgSrc);
          imageEl.append(imageFig, h3Name);
          contentDiv.append(pCuisineType, pHours, moreBtn, faveBtn);
          contentEl.append(contentDiv);
          detailsBox1.append(imageEl, contentEl);
          boxEl.append(detailsBox1);
          detailsBoxEl.prepend(boxEl);
        }
      }
      detailsBoxEl.prepend(
        $("<h1>").text("Here are your top 3 results!").addClass("is-size-3")
      );
    });
  }

  // Event Listeners

  randomBtnEL.on("click", function (event) {
    event.preventDefault();
    clicked++;
    // console.log(clicked)
    if (clicked > 3) {
      detailsBoxEl.prepend(
        $("<h2> HANGRY? Pick a place. <h2>").addClass(
          "is-size-1 has-text-weight-bold mt-6"
        )
      );
      clicked = 0;
    } else {
      restaurantSearch();
    }
  });

  filterBtnEL.on("click", function (event) {
    event.preventDefault();
    selectedCuisine = $("#selected-cuisine > option:selected").attr("id");
    deselectedCuisine = $("#unselected-cuisine > option:selected").attr("id");
    deselectedCuisineName = $("#unselected-cuisine > option:selected").val();
    clicked = 0;
    var errorMessage = $("#error-message");
    if (selectedCuisine === "null" && deselectedCuisine === "null") {
      errorMessage.empty();
      errorMessage
        .text("You must select one option!")
        .addClass("is-size-3 has-text-danger-dark");
    } else if (selectedCuisine === deselectedCuisine) {
      errorMessage.empty();
      errorMessage
        .text(
          "You must be hangry, you're delirious! Positive and negative selections cannot be the same thing."
        )
        .addClass("is-size-3 has-text-danger-dark");
    } else {
      errorMessage.empty();
      filteredSearch();
    }
  });

  $("#detailsBoxes").on("click", "#moreBtn", function (event) {
    event.preventDefault();
    console.log("clicked");
    // event.stopPropagation();
    // console.log($(this).attr("rest-id"));
    moreRestID = $(this).attr("rest-id");
    localStorage.setItem("moreRestId", moreRestID);
    window.open("details.html");
  });
});

// $("#detailsBoxes").on("click", "#fave-btn", function(event){
//   console.log("clicked fave");
// })
