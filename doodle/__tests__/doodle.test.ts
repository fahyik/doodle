import { buildCheckLimit } from "../doodle";

describe("buildCheckLimit()", () => {
  describe("when given an empty store", () => {
    const dataStore = new Map<string, Date[]>();
    const checkLimit = buildCheckLimit(dataStore);
    describe("and a new request", () => {
      it("returns true", () => {
        const result = checkLimit.checkLimit("randomCustomer");
        expect(result).toEqual(true);
      });
    });
  });

  describe("when given datastore with 5 previous requests within 2 seconds", () => {
    const dataStore = new Map<string, Date[]>();
    const checkLimit = buildCheckLimit(dataStore);

    dataStore.set("randomCustomer", [
      new Date(),
      new Date(),
      new Date(),
      new Date(),
      new Date(),
    ]);

    describe("and a new request", () => {
      it("returns false", () => {
        const result = checkLimit.checkLimit("randomCustomer");
        expect(result).toEqual(false);
      });
    });
  });

  describe("when given datastore with more than 5 requests past 2 seconds", () => {
    const dataStore = new Map<string, Date[]>();
    const checkLimit = buildCheckLimit(dataStore);

    dataStore.set("randomCustomer", [
      new Date("2020-01-01"),
      new Date("2020-01-01"),
      new Date("2020-01-01"),
      new Date("2020-01-01"),
      new Date("2020-01-01"),
    ]);

    describe("and a new request", () => {
      it("returns true", () => {
        const result = checkLimit.checkLimit("randomCustomer");
        expect(result).toEqual(true);
      });
    });
  });
});
