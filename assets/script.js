//Variables 
detailsboxEl = $("#detailsBoxes");



//Functions 

function createDetailBox(){
     //create article 
     var detailsBox1 = $("<article>");
     var h3Name = $("<h3>");
     var moreBtn = $("<button>");
     var pAdress = $("<p>");
     var pNum = $("<p>");
     var pHours = $("<p>");
     var pCuisineType = $("<p>");
     var webURL = $("<a>");
     var pMenuItem = $("<p>");
 
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
     detailsBox1.append(h3Name, pAdress, pNum, pHours, pCuisineType, webURL, pMenuItem, moreBtn)

}
   


// Event Listeners


