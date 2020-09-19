$(document).ready(function () {
  var favoritesDiv = $("#favDiv");
  var favoritesName = [];
  var favoritesId = [];
  var moreRestID = "";

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
    renderFavorites();
  }

  getFavorites();

  function renderFavorites() {
    for (i = 0; i < favoritesName.length; i++) {
      var favoritesItem = $("<div>").addClass("notification is-primary level");
      favoritesItem.append(
        $("<h2>")
          .text(favoritesName[i])
          .addClass("is-white is-size-2 level-left")
      );
      favoritesItem.append(
        $("<button>")
          .text("Info")
          .addClass("button level-right")
          .attr("rest-id", favoritesId[i]).attr("id","info-btn")
      );
      favoritesDiv.append(favoritesItem);
    }
  }

  $("#clear-faves").on("click", function (event) {
    localStorage.removeItem("FavName");
    localStorage.removeItem("FavID");
    favoritesDiv.empty();
  });

  $("#info-btn").on("click", function(event){
    moreRestID = $(this).attr("rest-id");
    localStorage.setItem("moreRestId", moreRestID);
    window.open("details.html");
  })
  
});
