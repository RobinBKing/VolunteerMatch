//business logic
function Opportunities(recordsReturnMax, location, distance, startDate, endDate, keyword){
  this.recordsReturnMax = recordsReturnMax;
  this.recordsReturn = 100;
  this.location = location;
  this.distance = distance;
  // this.startDate = newStartDate(startDate, endDate);
  // this.endDate = newEndDate(startDate, endDate);
  this.startDate = startDate;
  this.endDate = endDate;
  this.keyword = keyword;
  this.totalOpportunities = 0;
  this.startRecord = 0;
  this.sort = "geodist() asc";
  this.items =[];
  this.jsonString = "http://api2.allforgood.org/api/volopps?&key=epicodus&num=" + this.recordsReturn + "&type=all&merge=3&output=json-hoc&vol_loc=" + this.location + "&vol_dist=" + this.distance +  "&vol_startdate=" + this.startDate +  this.endDate + "&output=json-hoc&sort=" + this.sort + "&q=" + this.keyword + " ";
};
var convertedStartdate = function(startDate, endDate){
  var newStartDate = new Date(startDate);
  var newEndDate = new Date(endDate);
  var newStartdateNumber = Date.parse(startDate);
  var newEnddateNumber = Date.parse(endDate);
  var currentDateNumber = Number(new Date());
  var newStartYear = newStartDate.getFullYear();
  var newStartMonth = newStartDate.getMonth();
  var newStartDay = newStartDate.getDate();
  var newEndYear = newEndDate.getFullYear();
  var newEndMonth = newEndDate.getMonth();
  var newEndDay = newEndDate.getDate();
  var newCurrentYear = new Date().getFullYear();
  var newCurrentMonth = new Date().getMonth();
  var newCurrentDay = new Date().getDate();
  // if(newStartYear === newEndYear && newStartMonth === newEndMonth && newStartDay === newEndDay){
  //   return startDate;
  // } else {
  //   return startDate;
  // };
  // if(newStartYear === newEndYear && newStartMonth === newEndMonth && newEndDate - newStartDate <= 30){
  //   return startDate;
  // } else {
  //   return startDate;
  // };
  if(startDate === ""){
    startDate = "NOW"
  };
  return startDate;
};
var convertedEnddate = function(startDate, endDate){
  var newStartDate = new Date(startDate);
  var newEndDate = new Date(endDate);
  var newStartdateNumber = Date.parse(startDate);
  var newEnddateNumber = Date.parse(endDate);
  var currentDateNumber = Number(new Date());
  if (endDate !== ""){
    endDate = "&vol_enddate=" + endDate;
  };
  return endDate;
};
var jsonOportunities = function(newOpportunities) {
  $.ajaxSetup({
  async: false
  });

  $.getJSON(newOpportunities.jsonString, function(jsonOpportunities) {
    newOpportunities.totalOpportunities = jsonOpportunities.TotalOpportunities;
    newOpportunities.recordsReturn = jsonOpportunities.num;
    console.log(newOpportunities.jsonString);
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
  $("form").submit(function(event) {
    event.preventDefault();
    $("#newOpportunities").empty();
    //defaults
    var recordsReturnMax = 100;
    //end defaults
    var newSerchCriteria = "";
    var newKeyword = $("input#insert-text").val();
    if(newKeyword !== ""){
      newSerchCriteria += newKeyword
    };
    var newCatagories = $("select#categories").val();
    if(newCatagories !== ""){
      newSerchCriteria += newCatagories
    };
    var newLocation = $("input#location").val();
    var newDistance = newDistanceNumber($("select#distance").val());
    var newStartdate = $("input#start-date").val();
    var newEnddate = $("input#end-date").val();
    var startDate = convertedStartdate(newStartdate, newEnddate);
    var endDate = convertedEnddate(newStartdate, newEnddate);

    // var keyword = "hunger homelessness OR Health & Wellness";
    var newOpportunities = new Opportunities(recordsReturnMax, newLocation, newDistance, startDate, endDate, newSerchCriteria);
    jsonOportunities(newOpportunities);

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
                                      "<ul></div>");
      };

    } else {
      alert("No results found. Try changing your search criteria.")
    };

  });
});
