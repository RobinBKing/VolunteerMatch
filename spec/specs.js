describe('Opportunities', function () {
  it("creates a new object Opportunities with given properties", function() {
    var testOpportunities = new Opportunities(1, "Portland, OR", 15, "NOW", "2016-07-29", "hunger homelessness OR Health & Wellness");
    jsonOportunities(testOpportunities);
    expect(testOpportunities.recordsReturn).to.equal(1);
    expect(testOpportunities.items.length).to.equal(1);
  });
});
describe('Distance', function () {
  it("returns a new distance number from distanse selection", function() {
    var testDistance = newDistanceNumber("15 Miles");
    expect(testDistance).to.equal(15);
  });
});
