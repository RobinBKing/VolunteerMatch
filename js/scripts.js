//business logic
function Opportunities(totalOpportunities){
  this.totalOpportunities = totalOpportunities;
  this.items = [];
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
  var location = "Portland, OR"
  var distance = 15;
  var keyword = "hunger homelessness OR Health & Wellness";
  // var keyword = "hunger homelessness";
  $.getJSON("http://api2.allforgood.org/api/volopps?key=epicodus&type=all&merge=3&output=json-hoc&vol_loc=" + location + "&vol_dist=" + distance + "&vol_startdate=NOW&q=" + keyword + " ", function(jsonOpportunities) {
    // if (jsonOpportunities != "Nothing found."){
    if (jsonOpportunities.num > 0) {
        var newOpportunities = new Opportunities(jsonOpportunities.TotalOpportunities);
      // console.log(opportunities);
      for (var i = 0; i < jsonOpportunities.items.length; i++) {
        newOpportunities.items.push(jsonOpportunities.items[i]);
      };
    }
    else {
      alert("No results found. Try changing your search criteria.")
    };
  });
});
