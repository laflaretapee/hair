import { describe, expect, it } from "vitest";
import { siteContent } from "../data/site-content";

describe("siteContent", () => {
  it("defines the required landing sections and CTA link", () => {
    expect(siteContent.hero.title).toContain("Риды Яшиной");
    expect(siteContent.services.items).toHaveLength(5);
    expect(siteContent.reviews.badge.rating).toBe("4,9");
    expect(siteContent.contacts.primaryCta.href).toMatch(/^https:\/\/wa\.me\//);
    expect(siteContent.about.video.title).toMatch(/продукц/i);
    expect(siteContent.motionVideos.colorFlow.poster).toContain("color-flow-poster");
  });
});
