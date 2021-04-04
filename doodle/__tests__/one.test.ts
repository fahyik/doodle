import { parse_accept_language } from "../one";

describe("test one", () => {
  it("returns something", () => {
    const res = parse_accept_language("fr-CA, fr-FR", ["en-US", "fr-FR"]);

    expect(res).toEqual(["fr-FR"]);
  });
});

describe("test two", () => {
  it("returns something", () => {
    const res = parse_accept_language("en-US, fr-CA, fr-FR", [
      "fr-FR",
      "en-US",
    ]);

    const expected = ["en-US", "fr-FR"];

    expect(res).toEqual(expected);
  });
});

describe("test three", () => {
  it("returns something", () => {
    const res = parse_accept_language("en-US,fr-CA,fr-FR", ["fr-FR", "en-US"]);

    const expected = ["en-US", "fr-FR"];

    expect(res).toEqual(expected);
  });
});

describe("test four", () => {
  it("returns something", () => {
    const res = parse_accept_language("en", ["en-US", "fr-CA", "fr-FR"]);

    const expected = ["en-US"];

    expect(res).toEqual(expected);
  });
});

describe("test five", () => {
  it("returns something", () => {
    const res = parse_accept_language("fr", ["en-US", "fr-CA", "fr-FR"]);

    const expected = ["fr-CA", "fr-FR"];

    expect(res).toEqual(expected);
  });
});

describe("test six", () => {
  it("returns something", () => {
    const res = parse_accept_language("fr-FR, fr", ["en-US", "fr-CA", "fr-FR"]);

    const expected = ["fr-FR", "fr-CA"];

    expect(res).toEqual(expected);
  });
});

describe("test seven", () => {
  it("returns something", () => {
    const res = parse_accept_language("fr-FR, fr, fr-FR, fr", [
      "en-US",
      "fr-CA",
      "fr-FR",
    ]);

    const expected = ["fr-FR", "fr-CA"];

    expect(res).toEqual(expected);
  });
});

describe("test eight", () => {
  it("returns something", () => {
    const res = parse_accept_language("fr-FR   ,   fr, fr-FR, fr,", [
      "en-US",
      "fr-CA",
      "fr-FR",
    ]);

    const expected = ["fr-FR", "fr-CA"];

    expect(res).toEqual(expected);
  });
});

describe("test nine", () => {
  it("returns something", () => {
    const res = parse_accept_language("", ["en-US", "fr-CA", "fr-FR"]);

    expect(res.length).toEqual(0);
  });
});

describe("test ten", () => {
  it("returns something", () => {
    const res = parse_accept_language("en-US, *", ["en-US", "fr-CA", "fr-FR"]);
    const expected = ["en-US", "fr-CA", "fr-FR"];

    expect(res).toEqual(expected);
  });
});

describe("test eleven", () => {
  it("returns something", () => {
    const res = parse_accept_language("fr-FR, fr, *", [
      "en-US",
      "fr-CA",
      "fr-FR",
    ]);

    const expected = ["fr-FR", "fr-CA", "en-US"];

    expect(res).toEqual(expected);
  });
});

describe("test twelve", () => {
  it("returns something", () => {
    const res = parse_accept_language("*", ["en-US", "fr-CA", "fr-FR"]);

    const expected = ["en-US", "fr-CA", "fr-FR"];

    expect(res).toEqual(expected);
  });
});
