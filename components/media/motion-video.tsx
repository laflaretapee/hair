"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { useMotionMode } from "./use-motion-mode";

type MotionVideoSource = {
  src: string;
  type: string;
};

type MotionVideoProps = {
  sources: MotionVideoSource[];
  poster: string;
  mobilePoster?: string;
  alt: string;
  className?: string;
  videoClassName?: string;
  lazy?: boolean;
  mobilePosterOnly?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  decorative?: boolean;
  testId?: string;
  ariaLabel?: string;
  onVideoRef?: (node: HTMLVideoElement | null) => void;
};

export function MotionVideo({
  sources,
  poster,
  mobilePoster,
  alt,
  className,
  videoClassName,
  lazy = false,
  mobilePosterOnly = false,
  autoPlay = true,
  loop = true,
  muted = true,
  decorative = false,
  testId,
  ariaLabel,
  onVideoRef,
}: MotionVideoProps) {
  const { isMobile, isReducedMotion, mounted } = useMotionMode();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(!lazy);

  useEffect(() => {
    if (!lazy || !wrapperRef.current) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
          }
        });
      },
      { rootMargin: "240px 0px" },
    );

    observer.observe(wrapperRef.current);

    return () => observer.disconnect();
  }, [lazy]);

  useEffect(() => {
    onVideoRef?.(videoRef.current);
  }, [onVideoRef, shouldLoad, mounted, isMobile, isReducedMotion]);

  const posterOnly = isReducedMotion || (mounted && isMobile && mobilePosterOnly);
  const fallbackPoster = mounted && isMobile && mobilePoster ? mobilePoster : poster;

  return (
    <div
      ref={wrapperRef}
      className={cn("motion-card", className)}
      data-testid={testId}
      aria-hidden={decorative || undefined}
    >
      <img className="video-poster-fallback" src={fallbackPoster} alt={decorative ? "" : alt} />
      {!posterOnly ? (
        <video
          ref={videoRef}
          className={cn("motion-card-video", videoClassName)}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline
          preload="metadata"
          poster={poster}
          aria-label={decorative ? undefined : ariaLabel ?? alt}
          aria-hidden={decorative || undefined}
        >
          {shouldLoad ? sources.map((source) => <source key={source.src} src={source.src} type={source.type} />) : null}
        </video>
      ) : null}
    </div>
  );
}
