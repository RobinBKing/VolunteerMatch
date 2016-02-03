//business logic
function Opportunities(recordsReturn, location, distance, startDate, endDate, keyword){
  this.recordsReturn = recordsReturn;
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
    if (jsonOpportunities.num > 0) {
    //  var newOpportunities = new Opportunities(jsonOpportunities.TotalOpportunities);
    for (var i = 0; i < jsonOpportunities.items.length; i++) {
       newOpportunities.items.push(jsonOpportunities.items[i]);
     };
     newOpportunities.totalOpportunities = jsonOpportunities.TotalOpportunities;
    //  console.log(jsonOpportunities);
    }
    else
    {
      alert("No results found. Try changing your search criteria.")
    };
  });
};
function Organization(organizationName, organizationDescription, street, city, state, zip, phone, website){
  this.organizationName =  organizationName;
  this.organizationDescription = organizationDescription;
  this.street = street;
  this.city = city;
  this.state = state;
  this.zip = zip;
  this.phone = phone;
  this.website = website;
};
Organization.prototype.fullAddress = function() {
  return this.street + ", " + this.city + ", " + this.state + " " + this.zip;
  };
function OrganizationGroup(){
  this.organizations = [];
}
//interface
$(document).ready(function() {
  $("form").submit(function(event) {
    event.preventDefault();
    var startRecord = 0;
    var sort = "geodist() asc";
    var recordsReturn = 100;
    var location = "97006";
    var distance = 15;
    var startDate = "NOW";
    var endDate = "&vol_enddate=" + "2016-07-29";
    var keyword = "hunger homelessness OR Health & Wellness";

    var newOpportunities = new Opportunities(recordsReturn, location, distance, startDate, endDate, keyword);
    jsonOportunities(newOpportunities);
    for (var i = 0; i < newOpportunities.items.length; i++) {
      newOpportunities.items[i];
      var newDistance = parseFloat(newOpportunities.items[i].Distance).toFixed(2);
      $("#newOpportunities").append("<h4>" + newOpportunities.items[i].title + "</h4>" +
                                    "<p>" +  newOpportunities.items[i].description + "</p>" +
                                    "<ul>" +
                                      "<li>"+newOpportunities.items[i].location_name +"</li>" +
                                      "<li>"+ newDistance +"</li>" +
                                      "<li><a href='" + newOpportunities.items[i].detailUrl + "'>" + newOpportunities.items[i].detailUrl + "</a></li>" +
                                      "<li>"+newOpportunities.items[i].startDate +"</li>" +
                                      "<li>"+newOpportunities.items[i].endDate +"</li>" +
                                      "<li>"+newOpportunities.items[i].volunteerHubOrganizationName +"</li>" +
                                      "<li><a href='" + newOpportunities.items[i].volunteerHubOrganizationUrl + "'>" + newOpportunities.items[i].volunteerHubOrganizationUrl + "</a></li>" +
                                    "<ul>");
    };

   });
});
