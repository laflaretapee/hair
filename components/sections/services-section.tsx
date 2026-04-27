import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { SiteContent } from "@/data/site-content";

type ServicesSectionProps = {
  content: SiteContent["services"];
};

export function ServicesSection({ content }: ServicesSectionProps) {
  return (
    <Reveal as="section" className="site-section" ariaLabel="Услуги">
      <Container>
        <SectionHeading eyebrow={content.eyebrow} title={content.title} />

        <div className="services-grid">
          {content.items.map((item) => (
            <article className="service-card glass-card" key={item.name}>
              <div className="service-icon" aria-hidden="true" />
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <strong>{item.priceFrom}</strong>
            </article>
          ))}
        </div>

        <p className="services-note">{content.note}</p>
      </Container>
    </Reveal>
  );
}

