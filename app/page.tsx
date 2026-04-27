import { AboutSection } from "@/components/sections/about-section";
import { BookingSection } from "@/components/sections/booking-section";
import { ColorFlowSection } from "@/components/sections/color-flow-section";
import { FooterSection } from "@/components/sections/footer-section";
import { HeroSection } from "@/components/sections/hero-section";
import { PortfolioSection } from "@/components/sections/portfolio-section";
import { ReviewsSection } from "@/components/sections/reviews-section";
import { ServicesSection } from "@/components/sections/services-section";
import { siteContent } from "@/data/site-content";

export default function HomePage() {
  return (
    <main className="page-shell">
      <HeroSection content={siteContent.hero} video={siteContent.motionVideos.hero} />
      <AboutSection content={siteContent.about} video={siteContent.motionVideos.product} />
      <ServicesSection content={siteContent.services} />
      <ColorFlowSection content={siteContent.colorFlow} />
      <PortfolioSection content={siteContent.portfolio} />
      <ReviewsSection content={siteContent.reviews} />
      <BookingSection content={siteContent.contacts} />
      <FooterSection content={{ ...siteContent.contacts, ...siteContent.footer }} />
    </main>
  );
}
