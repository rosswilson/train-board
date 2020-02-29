const nock = require("nock");
const { fetchServices } = require("../src/api");
const fakeResponseBody = require("../test/mocks/response.json");

describe("api", () => {
  beforeEach(() => {
    process.env.REAL_TIME_TRAINS_API_USERNAME = "example";
    process.env.REAL_TIME_TRAINS_API_PASSWORD = "example";
  });

  describe("fetchServices", () => {
    it("returns the expected data", async () => {
      nock("https://api.rtt.io")
        .get("/api/v1/json/searchv3/CREWE")
        .basicAuth({ user: "example", pass: "example" })
        .reply(200, fakeResponseBody);

      const result = await fetchServices("CREWE");

      expect(result).toEqual([
        {
          atocName: "Avanti West Coast",
          destination: { description: "Glasgow Central", time: "1915" },
          identity: "9S77",
          isPassenger: true,
          origin: { description: "London Euston", time: "1343" },
          passingTime: undefined
        },
        {
          atocName: "Avanti West Coast",
          destination: { description: "Manchester Piccadilly", time: "1646" },
          identity: "1H69",
          isPassenger: true,
          origin: { description: "London Euston", time: "1440" },
          passingTime: undefined
        },
        {
          atocName: "Northern",
          destination: { description: "Liverpool Lime Street", time: "1828" },
          identity: "2F29",
          isPassenger: true,
          origin: { description: "Crewe", time: "1616" },
          passingTime: undefined
        }
      ]);
    });
  });
});
