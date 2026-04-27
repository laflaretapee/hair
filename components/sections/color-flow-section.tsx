"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { useMotionMode } from "@/components/media/use-motion-mode";
import { assetPath } from "@/lib/utils";
import type { SiteContent } from "@/data/site-content";

type ColorFlowSectionProps = {
  content: SiteContent["colorFlow"];
  video?: SiteContent["motionVideos"]["colorFlow"];
};

const frameCount = 8;
const firstFrame = assetPath("/assets/frames/color-flow/Abstract_Hair_Color_Pigment_Animation_001.jpg");

function framePath(index: number) {
  return assetPath(`/assets/frames/color-flow/Abstract_Hair_Color_Pigment_Animation_${String(index).padStart(3, "0")}.jpg`);
}

function drawCover(context: CanvasRenderingContext2D, image: HTMLImageElement, width: number, height: number) {
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const scaledWidth = image.naturalWidth * scale;
  const scaledHeight = image.naturalHeight * scale;
  const x = (width - scaledWidth) / 2;
  const y = (height - scaledHeight) / 2;

  context.clearRect(0, 0, width, height);
  context.drawImage(image, x, y, scaledWidth, scaledHeight);
}

export function ColorFlowSection({ content }: ColorFlowSectionProps) {
  const { isReducedMotion, isMobile, mounted } = useMotionMode();
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef(0);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) {
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
      { rootMargin: "280px 0px" },
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad || !sectionRef.current || !canvasRef.current) {
      return;
    }

    const section = sectionRef.current;
    const canvas = canvasRef.current;

    if (navigator.userAgent.toLowerCase().includes("jsdom")) {
      return;
    }

    const context = canvas.getContext("2d");
    let rafId = 0;
    let cancelled = false;

    if (!context) {
      return;
    }

    const syncCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.floor(rect.width * ratio));
      const height = Math.max(1, Math.floor(rect.height * ratio));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const renderFrame = (index: number) => {
      const image = imagesRef.current[index];

      if (!image?.complete || !image.naturalWidth) {
        return;
      }

      syncCanvasSize();
      drawCover(context, image, canvas.width, canvas.height);
    };

    const updateFromScroll = () => {
      rafId = 0;
      const rect = section.getBoundingClientRect();
      const travel = window.innerHeight + rect.height;
      const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / travel));
      const nextFrame = isReducedMotion ? 0 : Math.min(frameCount - 1, Math.round(progress * (frameCount - 1)));

      if (nextFrame !== frameRef.current || !canvas.width) {
        frameRef.current = nextFrame;
        renderFrame(nextFrame);
      }
    };

    const scheduleUpdate = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(updateFromScroll);
      }
    };

    const loadFrames = () => {
      imagesRef.current = Array.from({ length: frameCount }, (_, index) => {
        const image = new Image();
        image.src = framePath(index + 1);
        image.decoding = "async";
        image.onload = () => {
          if (!cancelled && index === frameRef.current) {
            renderFrame(index);
          }
        };
        return image;
      });
    };

    loadFrames();
    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      cancelled = true;
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [isReducedMotion, shouldLoad]);

  const showMobileImage = mounted && isMobile;

  return (
    <section ref={sectionRef} className="site-section color-flow-section" aria-label="Color Flow">
      <div className="color-flow-backdrop" aria-hidden="true">
        {showMobileImage ? (
          <img className="color-flow-frame-fallback" src={assetPath("/assets/mobile/color.webp")} alt="" />
        ) : (
          <>
            <img className="color-flow-frame-fallback" src={firstFrame} alt="" />
            <canvas ref={canvasRef} className="color-flow-canvas" />
          </>
        )}
      </div>
      <Container>
        <div className="color-flow-content" data-testid="color-flow-video">
          <span className="section-eyebrow">{content.eyebrow}</span>
          <h2>{content.title}</h2>
          <p>{content.description}</p>
          <div className="color-flow-copy">
            <span>{content.caption}</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
