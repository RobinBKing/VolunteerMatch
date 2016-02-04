describe('Opportunities', function () {
  it("creates a new object Opportunities with given properties", function() {
    var testOpportunities = new Opportunities(100, "Portland, OR", 15, "2016-02-05", "2016-02-30", "hunger homelessness OR Health & Wellness");
    jsonOportunities(testOpportunities);
    expect(testOpportunities.recordsReturn).to.equal(100);
    expect(testOpportunities.items.length).to.equal(100);
  });
});
describe('Distance', function () {
  it("returns a new distance number from distance selection", function() {
    var testDistance = newDistanceNumber("15 Miles");
    expect(testDistance).to.equal(15);
  });
});
// describe('DateValue', function () {
//   it("returns a new startdate from NewStartdate selection", function() {
//     var testStartDate = newStartdate("2016-02-05", "2016-02-05");
//     expect(testStartDate).to.equal("2016-02-05");
//   });
//   it("returns a new startdate from NewStartdate selection", function() {
//     var testStartDate = newStartdate("2016-02-05", "2016-02-25");
//     expect(testStartDate).to.equal("2016-02-05");
//   });
  // it("returns a new startdate from NewStartdate selection", function() {
  //   var testStartDate = newStartdate("2016-01-05", "2016-03-02");
  //   expect(testStartDate).to.equal("NOW");
  // });


//   it("returns a new enddate from NewEnddate selection", function() {
//     var testEndDate = newEnddate("2016-02-05", "2016-02-05");
//     expect(testEndDate).to.equal("");
//   });
// });
