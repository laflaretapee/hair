"use client";

import { useEffect, useState } from "react";

type MotionMode = {
  mounted: boolean;
  isMobile: boolean;
  isReducedMotion: boolean;
  isTouchSafari: boolean;
};

const initialState: MotionMode = {
  mounted: false,
  isMobile: false,
  isReducedMotion: false,
  isTouchSafari: false,
};

export function useMotionMode() {
  const [state, setState] = useState<MotionMode>(initialState);

  useEffect(() => {
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const userAgent = navigator.userAgent;
    const isTouchSafari =
      /iP(ad|hone|od)/.test(userAgent) ||
      (/Safari/.test(userAgent) && !/Chrome|CriOS|Edg/.test(userAgent) && mobileQuery.matches);

    const sync = () => {
      setState({
        mounted: true,
        isMobile: mobileQuery.matches,
        isReducedMotion: reduceMotionQuery.matches,
        isTouchSafari,
      });
    };

    sync();

    reduceMotionQuery.addEventListener("change", sync);
    mobileQuery.addEventListener("change", sync);

    return () => {
      reduceMotionQuery.removeEventListener("change", sync);
      mobileQuery.removeEventListener("change", sync);
    };
  }, []);

  return state;
}

