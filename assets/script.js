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
  //store the favorite resturants 
  // function storeFavorites(){
  //   console.log("clicked")
  //   // fav = response.restaurants[randomIndex].restaurant.name;
  //   // favoritesName.push(fav);
  //   // localStorage.setItem("FavName", JSON.stringify(favoritesName));
  //   // favId = response.restaurants[randomIndex].restaurant.id; 
  //   // favoritesId.push(favId);
  //   // localStorage.setItem("FavID", JSON.stringify(favoritesId));
  //   // console.log(favId);
  //   // console.log(fav);
    
  // }

  //get the favorite resturants list on page load 
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
  //get resturant ID 
  // function getRestId (){
  //   console.log("clicked")
  //   // moreRestID = restId;
  //   // lat = restLat;
  //   // lon = restLon;
  //   // localStorage.setItem("fMoreRestId",JSON.stringify(moreRestID));
  //   // localStorage.setItem('lat',JSON.stringify(lat));
  //   // localStorage.setItem("lon",JSON.stringify(lon));
  //   // window.open("details.html");

  // };

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
    if (clicked === 1){
      detailsBoxEl.empty();
      var headerEl = $("<h1>").text("Here's what we found for you!").addClass("is-size-3");
      detailsBoxEl.append(headerEl);
      previewBoxEl = $("<div>");
      detailsBoxEl.append(previewBoxEl);
    } else {};
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
      // detailsBoxEl.empty();
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

      if (response.restaurants[randomNum].restaurant.featured_img != undefined) {
        imgURL = response.restaurants[randomNum].restaurant.featured_img;
      } else {
        imgURL = "https://static.thenounproject.com/png/978640-200.png";
      }

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
      h3Name.addClass("is-size-2 is-family-code");
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
      moreBtn.attr("id", "moreBtn");
      moreBtn.attr("rest-id", response.restaurants[randomNum].restaurant.id);

      //append
      boxEl.addClass("box py-6 is-centered");
      imgSrc.attr("src", imgURL);
      imgSrc.attr("id", "preview-image")
      imageFig.append(imgSrc);
      imageEl.append(imageFig, h3Name);
      contentDiv.append(pCuisineType, pHours, moreBtn, faveBtn);
      contentEl.append(contentDiv);
      detailsBox1.append(imageEl, contentEl);
      boxEl.append(detailsBox1);
      previewBoxEl.prepend(boxEl);
      
      //onclicks 
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

      });

    
      
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
      // if both = null, modal - you must select one option
      // if both = same id - you must be hungry, you're delirious! Error: Positive and negative filters cannot be the same cuisine.
      // if just positive - do the below
      // if just negative, do search with no cuisine filter and filter through results so the negative does not display
      // if both, search with positive cuisine and filter through results so the negative does not display
      console.log(queryURL);
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
        var faveBtn = $("<button>").text("Add to Favorites");
        var pHours = $("<p>");
        var faveBtn = $("<button>").text("Add to Favorites");
        var imgURL = "";

        if (response.restaurants[randomIndex].restaurant.featured_img != undefined) {
          imgURL = response.restaurants[randomIndex].restaurant.featured_img;
        } else {
          imgURL = "https://static.thenounproject.com/png/978640-200.png";
        }

        // console.log(response);
        detailsBoxEl.addClass("box py-6 media");
        imageEl.addClass("media-left");
        moreBtn.attr("id", "moreBtn");
        moreBtn.attr("rest-id", response.restaurants[randomIndex].restaurant.id);
        faveBtn.attr("id","faveBtnF");
        
        h3Name.text(response.restaurants[randomIndex].restaurant.name);
        h3Name.addClass("is-size-2 is-family-code");
        pHours.text("Hours: " + response.restaurants[randomIndex].restaurant.timings);
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

        boxEl.addClass("box py-6 is-centered");
        imgSrc.attr("src", imgURL);
        imgSrc.attr("id", "preview-image")
        imageFig.append(imgSrc);
        imageEl.append(imageFig, h3Name);
        contentDiv.append(pCuisineType, pHours, moreBtn, faveBtn);
        contentEl.append(contentDiv);
        detailsBox1.append(imageEl, contentEl);
        boxEl.append(detailsBox1);
        detailsBoxEl.prepend(boxEl);

      }
      detailsBoxEl.prepend($("<h1>").text("Here are your top 3 results!").addClass("is-size-3"));
      

      $('#faveBtnF').on("click", function (event){
        event.preventDefault();
        console.log("clicked")
        fav = response.restaurants[randomIndex].restaurant.name;
          favoritesName.push(fav);
          localStorage.setItem("FavName", JSON.stringify(favoritesName));
        favId = response.restaurants[randomIndex].restaurant.id; 
          favoritesId.push(favId);
          localStorage.setItem("FavID", JSON.stringify(favoritesId));
          // console.log(favId);
          // console.log(fav);
      });
      $("#moreBtn").on("click", function(event) {
        event.preventDefault();
        console.log("clicked")
        moreRestID = $(this).attr("rest-id");
        localStorage.setItem("moreRestId", moreRestID);
        window.open("details.html");
      });
 
      
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
    clicked = 0;
    filteredSearch();
  });


  
  // $("#detailsBoxes").on("click",$("#moreBtn"), function (event) {
  //       event.preventDefault();
  //       console.log("clicked")
  //       moreRestID = $(this).attr("rest-id");
  //       localStorage.setItem("moreRestId", moreRestID);
  //       window.open("details.html");
  //   event.preventDefault();
  //   // console.log("clicked");
    
  //   event.stopPropagation();
  //   // console.log($(this).children);
  //   moreRestID = restId;
  //   lat = restLat;
  //   lon = restLon;
  //   localStorage.setItem("fMoreRestId",JSON.stringify(moreRestID));
  //   localStorage.setItem('lat',JSON.stringify(lat));
  //   localStorage.setItem("lon",JSON.stringify(lon));
  //   window.open("details.html");
  // });

});
