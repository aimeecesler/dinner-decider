$(document).ready(function () {
  var restID = localStorage.getItem("moreRestId");

  getRestaurantInfo();

  function getRestaurantInfo() {
    var queryURL =
      "https://developers.zomato.com/api/v2.1/restaurant?res_id=" + restID;
    $.ajax({
      url: queryURL,
      method: "GET",
      headers: {
        "user-key": "cce5f51e69604fc081fc15cd37642e9d",
        "content-type": "application/json",
      },
    }).then(function (response) {
      console.log(response);
    });
  }
});
