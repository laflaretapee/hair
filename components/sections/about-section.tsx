import { ViewportVideoCard } from "@/components/media/viewport-video-card";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import type { SiteContent } from "@/data/site-content";

type AboutSectionProps = {
  content: SiteContent["about"];
  video: SiteContent["motionVideos"]["product"];
};

export function AboutSection({ content, video }: AboutSectionProps) {
  return (
    <Reveal as="section" className="site-section about-section" ariaLabel="О студии">
      <Container>
        <div className="about-heading">
          <span className="section-eyebrow">{content.eyebrow}</span>
          <h2>{content.title}</h2>
        </div>

        <div className="about-grid">
          <ViewportVideoCard
            testId="product-video"
            source={video.mp4}
            poster={video.poster}
            mobilePoster="/assets/mobile/product.webp"
            alt={video.alt}
            eyebrow={content.video.eyebrow}
            title={content.video.title}
            description={content.video.description}
          />

          <div className="about-story-column">
            <div className="about-story-header">
              <span className="section-eyebrow">Подход к работе</span>
              <h3>Перед окрашиванием мы сначала разбираем состояние волос и желаемый оттенок.</h3>
            </div>

            <div className="about-story-grid">
              {content.paragraphs.map((paragraph, index) => (
                <article className="about-point-card" key={paragraph}>
                  <span className="about-point-index">{String(index + 1).padStart(2, "0")}</span>
                  <p>{paragraph}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Reveal>
  );
}
