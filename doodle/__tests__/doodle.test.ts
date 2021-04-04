import { sum } from "../doodle";

describe("sum()", () => {
  describe("when given two integers", () => {
    it("returns the correct sum", () => {
      expect(sum(1, 2)).toEqual(1 + 2);
    });
  });
});
