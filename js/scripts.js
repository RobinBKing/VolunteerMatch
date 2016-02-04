//business logic
function Opportunities(recordsReturnMax, location, distance, startDate, endDate, keyword){
  this.recordsReturnMax = recordsReturnMax;
  this.recordsReturn = 0;
  this.location = location;
  this.distance = distance;
  this.startDate = startDate;
  this.endDate = endDate;
  if(this.endDate !== "") {
    this.endDate = "&vol_enddate=" + this.endDate;
  };
  this.keyword = keyword;
  this.totalOpportunities = 0;
  this.startRecord = 0;
  this.sort = "geodist() asc";
  this.items =[];
  this.jsonString = "http://api2.allforgood.org/api/volopps?start=" + this.startRecord + "&num=" + this.recordsReturn + "&key=epicodus&type=all&merge=3&output=json-hoc&vol_loc=" + location + "&vol_dist=" + this.distance +  "&vol_startdate=" + this.startDate +  this.endDate + "&output=json-hoc&sort=" + this.sort + "&q=" + this.keyword + " ";
};
var jsonOportunities = function(newOpportunities) {
  $.ajaxSetup({
  async: false
  });

  $.getJSON(newOpportunities.jsonString, function(jsonOpportunities) {
    newOpportunities.totalOpportunities = jsonOpportunities.TotalOpportunities;
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
  $("form").submit(function(event) {
    event.preventDefault();
    //defaults
    var startRecord = 0;
    var sort = "geodist() asc";
    var recordsReturn = 100;
    //end defaults
    var newLocation = $("input#location").val();
    var newDistance = newDistanceNumber($("select#distance").val());
    var newStartdate = $("input#start-date").val();
    var newEnddate = $("input#end--date").val();
    //If opportunity is Start Date = End Date , then display: [Start date] 	ex: June 1
// If opportunity is End Date - Start Date <= 30  && Start Date <> End Date , then display: [Start date] - [End Date]	ex: June 1 - June 30
// If opportunity is End Date - Start Date > 30 && End Date - Current Date > 30, then display: Ongoing

// If opportunity is End Date - Start Date > 30  && Start Date <> End Date && End Date - Current Date <= 30 then display: Now until [End Date]  ex: Now until June 15
    var startDate = "";
    vare endDate = "";
    // var endDate = "&vol_enddate=" + "2016-07-29";
    if(newStartdate === newEnddate) {
      startDate = newStartdate;
    };
    if((newEnddate - newStartdate <= 30) && (newStartdate != newEnddate)) {
      startDate = newStartdate;
      endDate = "&vol_enddate=" + newEnddate;
    };
    if((newEnddate - newStartdate > 30) &&  (newEnddate - currentDate > 30) {
      startDate =  "NOW";
      endDate = "";
    };
    if((newEnddate - newStartdate > 30) &&  (newStartdate != newEnddate) && (newEnddate - currentDate <= 30) {
      startDate =  "NOW";
      endDate = "&vol_enddate=" + newEnddate;
    };

    // var keyword = "hunger homelessness OR Health & Wellness";
    var keyword = $("input#insert-text").val();
    console.log(location);

    var newOpportunities = new Opportunities(recordsReturn, location, distance, startDate, endDate, keyword);
    jsonOportunities(newOpportunities);
    if(newOpportunities.recordsReturn > o){
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
