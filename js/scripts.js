//business logic
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
  var keyword = "homelessness"
  $.getJSON("http://api2.allforgood.org/api/volopps?key=epicodus&type=all&merge=3&output=json-hoc&vol_loc=" + location + "&vol_dist=" + distance + "&vol_startdate=NOW&q=(" + keyword + ")", function(json) {
    if (json != "Nothing found."){
      console.log(json);
      alert(json.items[0].location_name);
    }
    else {
      alert("No results found. Try changing your search criteria.")
    };
  });
});
