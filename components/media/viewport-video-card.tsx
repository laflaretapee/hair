"use client";

import { useEffect, useRef } from "react";
import { MotionVideo } from "./motion-video";
import { useMotionMode } from "./use-motion-mode";

type ViewportVideoCardProps = {
  source: string;
  poster: string;
  mobilePoster?: string;
  alt: string;
  eyebrow: string;
  title: string;
  description: string;
  testId?: string;
};

export function ViewportVideoCard({
  source,
  poster,
  mobilePoster,
  alt,
  eyebrow,
  title,
  description,
  testId,
}: ViewportVideoCardProps) {
  const { isMobile, isReducedMotion } = useMotionMode();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isReducedMotion || isMobile || !cardRef.current || !videoRef.current) {
      return;
    }

    const video = videoRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.35 },
    );

    observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, [isMobile, isReducedMotion]);

  return (
    <div ref={cardRef} className="about-feature-card">
      <MotionVideo
        testId={testId}
        className="about-video-card about-feature-media"
        sources={[{ src: source, type: "video/mp4" }]}
        poster={poster}
        mobilePoster={mobilePoster}
        mobilePosterOnly={!!mobilePoster}
        alt={alt}
        autoPlay={isMobile}
        lazy
        onVideoRef={(node) => {
          videoRef.current = node;
        }}
      />
      <div className="about-video-copy">
        <span className="section-eyebrow">{eyebrow}</span>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}
