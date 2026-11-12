import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "light",
  align = "left",
  className,
  titleClassName,
}: SectionHeadingProps) {
  const isDark = tone === "dark";

  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <Reveal>
        <p
          className={cn(
            "eyebrow",
            isDark ? "text-terracotta" : "text-terracotta-deep",
          )}
        >
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.06}>
        <h2
            className={cn(
              "mt-6 font-serif text-[clamp(2.6rem,5.5vw,4.8rem)] leading-[0.98] tracking-[-0.025em] text-balance",
              isDark ? "text-ivory" : "text-ink",
              titleClassName,
            )}
        >
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "mt-6 max-w-xl text-base leading-relaxed",
              align === "center" && "mx-auto",
              isDark ? "text-ivory-muted" : "text-muted",
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
