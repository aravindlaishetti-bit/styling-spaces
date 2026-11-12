"use client";

import { useEffect, useRef } from "react";

type CopyrightYearProps = {
  initialYear: number;
};

export function CopyrightYear({ initialYear }: CopyrightYearProps) {
  const yearRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (yearRef.current) {
      yearRef.current.textContent = String(new Date().getFullYear());
    }
  }, []);

  return <span ref={yearRef}>{initialYear}</span>;
}
