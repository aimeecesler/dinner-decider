//Bulga nav bar burger click function
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
  var moreRestID;
  var restId;
  var restLat;
  var restLon; 
  var lat;
  var lon;
  var favoritesName =  [];
  var favoritesId = [];
  var fav;
  var favId;
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
  // function storeFavorites(){
    
  // }

  function getfavorites (){
    if(localStorage.getItem("FavName") != null && localStorage.getItem("FavID") !=null ){
      var localStorageArrName = JSON.parse(localStorage.getItem("FavName").split(","));
      favoritesName = localStorageArrName;
      var localStorageArrId = JSON.parse(localStorage.getItem("FavID").split(","));
      favoritesId = localStorageArrId;
      //render favorites list 
    }
  };
  getfavorites();
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
      detailsBoxEl.empty();
      var randomNum = Math.floor(Math.random() * 19) + 1;
      //create elements
      var detailsBox1 = $("<article>");
      var h3Name = $("<h3>");
      var pCuisineType = $("<p>");
      var moreBtn = $("<button>");
      var pHours = $("<p>");
      var faveBtn = $("<button>").text("Add to Favorites");

      //attributes
      moreBtn.addClass(
        "button has-text-weight-bold is-primary is-rounded is-normal mt-6 mb-6"
      );

      faveBtn.addClass(
        "button has-text-weight-bold is-primary is-rounded is-normal mt-6 mb-6"
      );

      // webURL.attr("href", response.restaurants[randomNum].restaurant.url);
      // //attributes
      // moreBtn.addClass('button has-text-weight-bold is-primary is-rounded is-normal mt-6 mb-6');

      // webURL.attr("href", response.restaurants[randomNum].restaurant.url);
      //text

      h3Name.text(response.restaurants[randomNum].restaurant.name);
      // pAdress.text(response.restaurants[randomNum].restaurant.location.address);
      // pNum.text(
      //   "Phone Number: " +
      //     response.restaurants[randomNum].restaurant.phone_numbers
      // );
      pHours.text(
        "Hours: " + response.restaurants[randomNum].restaurant.timings
      );
      pCuisineType.text(
        "Type of Cuisine: " +
          response.restaurants[randomNum].restaurant.cuisines
      );
      // webURL.text("Visit Site");

      moreBtn.text("More info");

      //append
      detailsBoxEl.append(detailsBox1);
      detailsBox1.append(h3Name, pCuisineType, pHours, moreBtn, faveBtn);
      moreBtn.on("click", function (event) {
        event.preventDefault();
        moreRestID = response.restaurants[randomNum].restaurant.id;
        // console.log("clicked")
        // console.log(response.restaurants[randomNum].restaurant.id);
        
        lat = response.restaurants[randomNum].restaurant.location.latitude;
        lon = response.restaurants[randomNum].restaurant.location.longitude;
        localStorage.setItem('lat',JSON.stringify(lat));
        localStorage.setItem("lon",JSON.stringify(lon));
        localStorage.setItem("dMoreRestId",JSON.stringify(moreRestID));
        window.open("details.html");
      });

      faveBtn.on("click", function (event){
        event.preventDefault();
        event.stopPropagation();
        // console.log("clicked");
        fav = response.restaurants[randomNum].restaurant.name;
        favoritesName.push(fav);
        localStorage.setItem("FavName", JSON.stringify(favoritesName));
        favId = response.restaurants[randomNum].restaurant.id; 
        favoritesId.push(favId);
        localStorage.setItem("FavID", JSON.stringify(favoritesId));
        console.log(favId);
        console.log(fav);

        //have an favs array that contains the name and ID of the restaurant 
        //set the array to the storage as an array not one that changes every click 
        // empty the set items and push the array 
        //when favorites button is clicked in the corner a modal or sidebar of favs appear

      })

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
        var detailsBox1 = $("<article>");
        var h3Name = $("<h3>");
        var moreBtn = $("<button>");
        var faveBtn = $("<button>").text("Add to Favorites");
        var pHours = $("<p>");
        var pCuisineType = $("<p>");
        // console.log(response);
        detailsBoxEl.addClass("box py-6");
        moreBtn.attr("id", "moreBtn");
        moreBtn.attr("rest-id", response.restaurants[randomIndex].restaurant.id);
        faveBtn.attr("id","faveBtn");
         restId = response.restaurants[randomIndex].restaurant.id;
         
         restLat = response.restaurants[randomIndex].restaurant.location.latitude;
         restLon = response.restaurants[randomIndex].restaurant.location.longitude;
        h3Name.text(response.restaurants[randomIndex].restaurant.name);
        pHours.text(response.restaurants[randomIndex].restaurant.timings);
        pCuisineType.text(
          "Type of Cuisine: " +
            response.restaurants[randomIndex].restaurant.cuisines
        );
        moreBtn.text("More info");
        moreBtn.addClass(
          "button has-text-weight-bold is-primary is-rounded is-normal mt-6 mb-6"
        );
        faveBtn.addClass(
          "button has-text-weight-bold is-primary is-rounded is-normal mt-6 mb-6"
        );

        detailsBox1.append(h3Name, pHours, pCuisineType, moreBtn,faveBtn);
        detailsBoxEl.append(detailsBox1);
      }

      
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
    } else {
      restaurantSearch();
    }
  });

  filterBtnEL.on("click", function (event) {
    event.preventDefault();
    selectedCuisine = $("#selected-cuisine > option").attr("id");
    // console.log(selectedCuisine);
    filteredSearch();
  });
  
  $("#detailsBoxes").on("click",$("#moreBtn"), function (event) {
    event.preventDefault();
    console.log("clicked");
    
    event.stopPropagation();
    // console.log($(this).children);
    moreRestID = restId;
    lat = restLat;
    lon = restLon;
    localStorage.setItem("fMoreRestId",JSON.stringify(moreRestID));
    localStorage.setItem('lat',JSON.stringify(lat));
    localStorage.setItem("lon",JSON.stringify(lon));
    window.open("details.html");
  });

  // $("#detailsBoxes").on("click", "#favBtn", function (event) {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   console.log("clicked");

  // })

});
