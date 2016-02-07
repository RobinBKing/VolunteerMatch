//business logic
function Opportunities(recordsReturnMax, location, distance, startDate, endDate, keyword){
  this.recordsReturnMax = recordsReturnMax;
  this.recordsReturn = 100;
  this.location = location;
  this.distance = distance;
  this.startDate = startDate;
  this.endDate = endDate;
  this.keyword = keyword;
  this.totalOpportunities = 0;
  this.startRecord = 0;
  this.sort = "geodist() asc";
  this.items =[];
  this.jsonString = "http://api2.allforgood.org/api/volopps?&key=epicodus&num=" + this.recordsReturn + "&type=all&merge=3&output=json-hoc&vol_loc=" + this.location + "&vol_dist=" + this.distance +  "&vol_startdate=" + this.startDate +  this.endDate + "&output=json-hoc&sort=" + this.sort + "&q=" + this.keyword + " ";
};
var checkDates = function (startDate, endDate) {
  if (startDate === "") {
    if (endDate === "") {
      return true;
    } else {
      if (new Date(endDate) >= new Date()) {
        return true;
      } else {
        return false;
      };
    };
  } else {
    if (endDate === "") {
      return true;
    } else {
      if (new Date(endDate) >= new Date(startDate)) {
        return true;
      } else {
        return false;
      };
    };
  };
};
var jsonOportunities = function(newOpportunities) {
  $.ajaxSetup({
    async: false
  });

  $.getJSON(newOpportunities.jsonString, function(jsonOpportunities) {
    newOpportunities.totalOpportunities = jsonOpportunities.TotalOpportunities;
    console.log(jsonOpportunities);
    newOpportunities.recordsReturn = jsonOpportunities.num;
    if (jsonOpportunities.num > 0) {
      for (var i = 0; i < jsonOpportunities.items.length; i++) {
         newOpportunities.items.push(jsonOpportunities.items[i]);
       };
    };  
  });

  $.ajaxSetup({
    async: true
  });
};
var newDistanceNumber = function(newDistance){
  var newDistanceNumber =  0;
  switch(newDistance) {
    case "10 Miles":
      newDistanceNumber = 10;
      break;
    case "15 Miles":
      newDistanceNumber = 15;
    break;
    case "20 Miles":
      newDistanceNumber = 20;
      break;
    case "25 Miles":
      newDistanceNumber = 25;
      break;
    case "Any":
      newDistanceNumber = 10000;
      break;
    default:
      newDistanceNumber = 10;
      break;
  };
  return newDistanceNumber;
};
//interface
$(document).ready(function() {
  $('#newSearch').on('click', function (e) {
    $("#newOpportunities").empty();
  });
  $("form").submit(function (event) {
    event.preventDefault();
    $("#newOpportunities").empty();
    var newRecordsReturnMax = 100;
    var newSerchCriteria = "";
    var newKeyword = $("input#insert-text").val();
    if(newKeyword !== ""){
      newSerchCriteria += newKeyword
    };
    var newCategories = $("select#categories").val();
    if(newCategories !== "" && newCategories !== "Categories" ){
      newSerchCriteria += " " + newCategories
    };
    var newLocation = $("input#location").val();
    var newDistance = newDistanceNumber($("select#distance").val());
    var newStartdate = $("input#start-date").val();
    var newEnddate = $("input#end-date").val();
    if(checkDates(newStartdate, newEnddate)){
      if(newStartdate === ""){
        newStartdate = "NOW"
      };
      if (newEnddate !== ""){
        newEnddate = "&vol_enddate=" + newEnddate;
      };
      var newOpportunities = new Opportunities(newRecordsReturnMax, newLocation, newDistance, newEnddate, newEnddate, newSerchCriteria);
      jsonOportunities(newOpportunities);

      //$('form#opportunities').trigger("reset");

      if(newOpportunities.recordsReturn > 0){
        for (var i = 0; i < newOpportunities.items.length; i++) {
          newOpportunities.items[i];
          var newDistance = parseFloat(newOpportunities.items[i].Distance).toFixed(2);
          $("#newOpportunities").append("<div class='col-xs-12 col-sm-6 col-md-4 col-lg-3 border'>" +
                                          "<h4>" + newOpportunities.items[i].title + "</h4>" +
                                          "<p>" +  newOpportunities.items[i].description + "</p>" +
                                          "<ul>" +
                                            "<li>"+newOpportunities.items[i].location_name +"</li>" +
                                            "<li>"+ newDistance +"</li>" +
                                            "<li><a href='" + newOpportunities.items[i].detailUrl + "'>" + "Click here for the link" + "</a></li>" +
                                            "<li>"+newOpportunities.items[i].startDate +"</li>" +
                                            "<li>"+newOpportunities.items[i].endDate +"</li>" +
                                            "<li>"+newOpportunities.items[i].volunteerHubOrganizationName +"</li>" +
                                            "<li><a href='" + newOpportunities.items[i].volunteerHubOrganizationUrl + "'>" + "Click here for info about the organization" + "</a></li>" +
                                          "<ul>" +
                                        "</div>");
        };
      }
      else {
        alert("No results found. Try changing your search criteria.")
      };
    }
    else{
      alert("The end date must be greater than or equal to the start date.")
    };
  });
});
