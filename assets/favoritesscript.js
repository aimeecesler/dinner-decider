$(document).ready(function () {
  //Bulma nav bar burger click function
  $(".navbar-burger").click(function () {
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });
  // variables
  var favoritesDiv = $("#favDiv");
  var favoritesName = [];
  var favoritesId = [];
  var moreRestID = "";

  // checks local storage for favorites list
  // if it is not empty, push contents to array and split it fom string to array
  function getFavorites() {
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
    }
    // run function to render favorites
    renderFavorites();
  }

  // run function to check local storage
  getFavorites();

  // function to loop through array and render favorites list
  function renderFavorites() {
    for (i = 0; i < favoritesName.length; i++) {
      // create div
      var favoritesItem = $("<div>").addClass("notification is-primary level");
      // append header
      favoritesItem.append(
        $("<h2>")
          .text(favoritesName[i])
          .addClass("is-white is-size-2 level-left")
      );
      // append button
      favoritesItem.append(
        $("<button>")
          .text("Info")
          .addClass("button level-right")
          .attr("rest-id", favoritesId[i])
          .attr("id", "info-btn")
      );
      favoritesDiv.append(favoritesItem);
    }
  }
  // click listener for clear button, empties div and clears local storage
  $("#clear-faves").on("click", function (event) {
    localStorage.removeItem("FavName");
    localStorage.removeItem("FavID");
    favoritesDiv.empty();
  });

  // click listener for info button, saves restaurant ID to local storage and opens details page
  favoritesDiv.on("click", "#info-btn", function (event) {
    moreRestID = $(this).attr("rest-id");
    localStorage.setItem("moreRestId", moreRestID);
    window.open("details.html");
  });
});
