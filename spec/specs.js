describe('Organization', function() {
  it("creates a new orgainzation with given properties", function() {
     var testOrgization = new Organization("Portland Rescue Mission", "A place for homless people", "123 main st.", "Portland", "Oregon", "97123", "503-313-1234", "http://www.PortlandRescueMission.org");
     expect(testOrgization.organizationName).to.equal("Portland Rescue Mission");
     expect(testOrgization.organizationDescription).to.equal("A place for homless people");
     expect(testOrgization.street).to.equal("123 main st.");
     expect(testOrgization.city).to.equal("Portland");
     expect(testOrgization.state).to.equal("Oregon");
     expect(testOrgization.zip).to.equal("97123");
     expect(testOrgization.phone).to.equal("503-313-1234");
     expect(testOrgization.website).to.equal("http://www.PortlandRescueMission.org");
   });
   it("adds the address information into one string", function() {
     var testOrgization = new Organization("Portland Rescue Mission", "A place for homless people", "123 main st.", "Portland", "Oregon", "97123", "503-313-1234", "http://www.PortlandRescueMission.org");
     expect(testOrgization.fullAddress()).to.equal("123 main st., Portland, Oregon 97123");
   });
});
