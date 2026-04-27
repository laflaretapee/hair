import Image from "next/image";
import { MotionVideo } from "@/components/media/motion-video";
import { assetPath } from "@/lib/utils";
import type { SiteContent } from "@/data/site-content";

type HeroSectionProps = {
  content: SiteContent["hero"];
  video: SiteContent["motionVideos"]["hero"];
};

function TrustIcon({ kind }: { kind: SiteContent["hero"]["trust"][number]["icon"] }) {
  if (kind === "yandex-award") {
    return (
      <Image
        src={assetPath("/assets/trust/yandex-award.webp")}
        alt=""
        width={28}
        height={28}
        className="hero-trust-icon-image hero-trust-icon-image-award"
      />
    );
  }

  if (kind === "yandex-maps") {
    return (
      <Image
        src={assetPath("/assets/trust/yandex-maps.webp")}
        alt=""
        width={28}
        height={28}
        className="hero-trust-icon-image hero-trust-icon-image-maps"
      />
    );
  }

  if (kind === "clock") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.8v4.6l3.2 1.9" />
      </svg>
    );
  }

  return null;
}

export function HeroSection({ content, video }: HeroSectionProps) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-stage">
        <MotionVideo
          testId="hero-video"
          className="hero-motion-card"
          videoClassName="hero-motion-video"
          sources={[{ src: video.mp4, type: "video/mp4" }]}
          poster={video.poster}
          mobilePoster="/assets/mobile/hero.webp"
          alt={video.alt}
          decorative
          mobilePosterOnly
        />

        <div className="hero-content-wrap">
          <div className="hero-copy">
            <div className="brand-badge">
              <Image
                src={assetPath("/assets/brand/logo.webp")}
                alt="Логотип студии Риды Яшиной"
                width={64}
                height={64}
                className="brand-badge-logo"
                priority
              />
              <div className="brand-badge-copy">
                <strong>Рида Яшина</strong>
                <span>Студия колористики</span>
              </div>
            </div>
            <div className="hero-kicker pill">Уфа · колористика · забота о качестве волос</div>
            <h1 id="hero-title">{content.title}</h1>
            <p className="hero-subtitle">{content.subtitle}</p>

            <div className="hero-actions">
              <a className="button-primary" href={content.primaryCta.href} target="_blank" rel="noreferrer">
                {content.primaryCta.label}
              </a>
              <a className="button-secondary" href="#booking">
                Обсудить услугу
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-trust-strip">
        <div className="hero-trust-panel">
          <div className="hero-trust-header">
            <span className="section-eyebrow">Преимущества студии</span>
            <p>Коротко о том, за что нас ценят и почему здесь спокойно записываться на сложное окрашивание.</p>
          </div>

          <div className="hero-trust">
            {content.trust.map((item) => (
              <article className="hero-trust-item" key={item.title}>
                <div className="hero-trust-icon">
                  <TrustIcon kind={item.icon} />
                </div>
                <div className="hero-trust-copy">
                  <strong>{item.title}</strong>
                  <span>{item.detail}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
