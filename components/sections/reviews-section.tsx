import { FloatingBadge } from "@/components/motion/floating-badge";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { SiteContent } from "@/data/site-content";

type ReviewsSectionProps = {
  content: SiteContent["reviews"];
};

export function ReviewsSection({ content }: ReviewsSectionProps) {
  return (
    <Reveal as="section" className="site-section" ariaLabel="Отзывы">
      <Container>
        <SectionHeading eyebrow={content.eyebrow} title={content.title} />

        <div className="reviews-layout">
          <FloatingBadge className="review-badge glass-card">
            <span className="rating-value">{content.badge.rating}</span>
            <p>{content.badge.votes}</p>
            <p>{content.badge.award}</p>
            <p>Клиенты чаще всего отмечают атмосферу, бережную работу и дорогой результат без ощущения перегруза.</p>
          </FloatingBadge>

          <div className="reviews-grid">
            {content.items.map((item) => (
              <article className="review-card glass-card" key={item.author}>
                <h3>{item.author}</h3>
                <p>{item.text}</p>
                <span>★★★★★</span>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </Reveal>
  );
}

