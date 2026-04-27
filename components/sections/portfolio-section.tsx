import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { SiteContent } from "@/data/site-content";

type PortfolioSectionProps = {
  content: SiteContent["portfolio"];
};

export function PortfolioSection({ content }: PortfolioSectionProps) {
  return (
    <Reveal as="section" className="site-section" ariaLabel="Портфолио">
      <Container>
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description="Пока здесь стоят премиальные плейсхолдеры под фото и видео. Следующим этапом заменим их на реальные материалы и интерактив до/после."
        />

        <div className="portfolio-grid">
          {content.items.map((item) => (
            <article className="portfolio-card glass-card" key={item.id}>
              <div className="portfolio-visual">
                <div className="portfolio-before">{item.beforeLabel}</div>
                <div className="portfolio-divider" />
                <div className="portfolio-after">{item.afterLabel}</div>
              </div>
              <h3>{item.title}</h3>
              <p>Будущий модуль для фото, видео и мягкого reveal-эффекта трансформации оттенка.</p>
            </article>
          ))}
        </div>
      </Container>
    </Reveal>
  );
}

