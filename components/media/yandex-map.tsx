"use client";

import { useEffect, useRef } from "react";

export function YandexMap() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const script = document.createElement("script");
    script.src =
      "https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A1f191680bcd7733b3cd2c89ae48e0e1423a105ad13a1afe0a0c9c76629f9ba3c&width=100%25&height=400&lang=ru_RU&scroll=true";
    script.charset = "utf-8";
    script.async = true;
    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return <div ref={containerRef} className="yandex-map" />;
}
