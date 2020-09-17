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

//Functions
function createBox() {
  // console.log("clicked")
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
  moreBtn.addClass('button has-text-weight-bold is-primary is-rounded is-large mt-6 mb-6');
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

// Event Listeners

randomBtnEL.on("click", function (event) {
  event.preventDefault();
  createBox();
} );


