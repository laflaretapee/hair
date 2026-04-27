import Image from "next/image";
import { Container } from "@/components/ui/container";
import type { SiteContent } from "@/data/site-content";

type FooterSectionProps = {
  content: SiteContent["contacts"] & SiteContent["footer"];
};

export function FooterSection({ content }: FooterSectionProps) {
  return (
    <footer className="site-section" style={{ paddingTop: 0 }}>
      <Container>
        <div className="footer-panel glass-card">
          <div className="footer-brand">
            <Image
              src="/assets/brand/logo.webp"
              alt="Логотип студии Риды Яшиной"
              width={72}
              height={72}
              className="footer-logo"
            />
            <div>
            <strong>{content.note}</strong>
            <p>{content.address}</p>
            </div>
          </div>
          <div>
            <p>{content.phone}</p>
            <p>{content.hours}</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
