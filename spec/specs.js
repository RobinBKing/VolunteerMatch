describe('Opportunities', function () {
  it("creates a new object Opportunities with given properties", function() {
    var testOpportunities = new Opportunities(1,"Portland, OR", 15, "2016-02-05", "2016-02-30", "hunger homelessness OR Health & Wellness");
    jsonOportunities(testOpportunities);
    expect(testOpportunities.recordsReturnMax).to.equal(1);
    expect(testOpportunities.items[0].location_name).to.equal("Portland OR United States ");

  });
});
describe('Distance', function () {
  it("returns a new distance number from distance selection", function() {
    var testDistance = newDistanceNumber("15 Miles");
    expect(testDistance).to.equal(15);
  });
});
describe('Date check', function () {
  it("return true if endDate is > startdate", function() {
    var testDate = checkDates("2016-02-05", "2016-02-05");
    expect(testDate).to.equal(false);
  });
});
