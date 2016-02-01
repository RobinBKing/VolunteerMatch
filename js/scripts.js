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
//interface
// $(document).ready(function() {
// });
