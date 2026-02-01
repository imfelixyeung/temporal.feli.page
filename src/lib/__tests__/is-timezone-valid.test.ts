import { describe, expect, it } from "vitest";
import { isValidTimeZone } from "../is-timezone-valid";

describe("isValidTimeZone", () => {
  describe("Valid timezones", () => {
    it("should accept UTC", () => {
      expect(isValidTimeZone("UTC")).toBe(true);
    });

    it("should accept common IANA timezones", () => {
      expect(isValidTimeZone("America/New_York")).toBe(true);
      expect(isValidTimeZone("Europe/London")).toBe(true);
      expect(isValidTimeZone("Asia/Tokyo")).toBe(true);
      expect(isValidTimeZone("Australia/Sydney")).toBe(true);
    });

    it("should accept timezone abbreviations", () => {
      expect(isValidTimeZone("EST")).toBe(true);
      expect(isValidTimeZone("PST")).toBe(true);
      expect(isValidTimeZone("CET")).toBe(true);
    });

    it("should accept timezone offsets", () => {
      expect(isValidTimeZone("GMT+5")).toBe(false);
      expect(isValidTimeZone("GMT-8")).toBe(false);
      expect(isValidTimeZone("UTC-5")).toBe(false);
    });

    it("should accept various format variations", () => {
      expect(isValidTimeZone("US/Eastern")).toBe(true);
      expect(isValidTimeZone("Europe/Paris")).toBe(true);
      expect(isValidTimeZone("America/Los_Angeles")).toBe(true);
      expect(isValidTimeZone("Asia/Shanghai")).toBe(true);
    });
  });

  describe("Invalid timezones", () => {
    it("should reject completely invalid strings", () => {
      expect(isValidTimeZone("Invalid/Timezone")).toBe(false);
      expect(isValidTimeZone("Fake/Zone")).toBe(false);
      expect(isValidTimeZone("Not/A/Timezone")).toBe(false);
    });

    it("should reject empty string", () => {
      expect(isValidTimeZone("")).toBe(false);
    });

    it("should reject nonsense strings", () => {
      expect(isValidTimeZone("abcdef")).toBe(false);
      expect(isValidTimeZone("123456")).toBe(false);
      expect(isValidTimeZone("!@#$%")).toBe(false);
    });

    it("should reject malformed timezone strings", () => {
      expect(isValidTimeZone("America/")).toBe(false);
      expect(isValidTimeZone("/New_York")).toBe(false);
      expect(isValidTimeZone("America//New_York")).toBe(false);
    });

    it("should reject invalid timezone offsets", () => {
      expect(isValidTimeZone("GMT+25")).toBe(false);
      expect(isValidTimeZone("GMT-13")).toBe(false);
      expect(isValidTimeZone("GMT+abc")).toBe(false);
    });
  });

  describe("Edge cases", () => {
    it("should handle case sensitivity correctly", () => {
      expect(isValidTimeZone("utc")).toBe(true);
      expect(isValidTimeZone("america/new_york")).toBe(true);
    });

    it("should handle whitespace", () => {
      expect(isValidTimeZone(" UTC")).toBe(false);
      expect(isValidTimeZone("UTC ")).toBe(false);
      expect(isValidTimeZone(" America/New_York ")).toBe(false);
    });

    it("should handle special characters", () => {
      expect(isValidTimeZone("America/New_York!")).toBe(false);
      expect(isValidTimeZone("Europe/Paris?")).toBe(false);
    });
  });

  describe("Obscure but valid timezones", () => {
    it("should accept less common but valid IANA timezones", () => {
      expect(isValidTimeZone("Antarctica/South_Pole")).toBe(true);
      expect(isValidTimeZone("Pacific/Honolulu")).toBe(true);
      expect(isValidTimeZone("Atlantic/Reykjavik")).toBe(true);
      expect(isValidTimeZone("Indian/Maldives")).toBe(true);
    });

    it("should accept timezone with underscores", () => {
      expect(isValidTimeZone("America/Indiana/Indianapolis")).toBe(true);
      expect(isValidTimeZone("America/North_Dakota/Center")).toBe(true);
    });
  });
});
