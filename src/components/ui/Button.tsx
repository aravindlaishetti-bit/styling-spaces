import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant =
  | "primary"
  | "terracotta"
  | "secondary"
  | "outline"
  | "light"
  | "ghost";
type Size = "sm" | "md" | "lg";
type IconPosition = "start" | "end";

type SharedProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  withIcon?: boolean;
  icon?: LucideIcon;
  iconClassName?: string;
  iconPosition?: IconPosition;
  className?: string;
};

const base =
  "group relative inline-flex select-none items-center justify-center overflow-hidden rounded-full border text-center font-bold uppercase leading-none tracking-[0.16em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 disabled:pointer-events-none disabled:opacity-55";

const variants: Record<Variant, string> = {
  primary: "button-surface button-primary",
  terracotta: "button-surface button-terracotta",
  secondary: "button-surface button-secondary",
  outline: "button-surface button-outline",
  light: "button-surface button-light",
  ghost:
    "min-h-10 gap-2 border-transparent bg-transparent px-0 text-[0.62rem] tracking-[0.15em] text-ink shadow-none",
};

const sizes: Record<Size, string> = {
  sm: "min-h-10 gap-2 px-4 text-[0.58rem]",
  md: "min-h-12 gap-2.5 px-6 text-[0.62rem]",
  lg: "min-h-14 gap-3 px-8 text-[0.66rem]",
};

const iconBoxes: Record<Size, string> = {
  sm: "h-7 w-7",
  md: "h-8 w-8",
  lg: "h-9 w-9",
};

const iconGlyphs: Record<Size, number> = {
  sm: 14,
  md: 16,
  lg: 18,
};

const iconBadgeTones: Record<Variant, string> = {
  primary:
    "border-white/10 bg-white/10 text-ivory shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]",
  terracotta:
    "border-ink/10 bg-ink/10 text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.34)]",
  secondary:
    "border-ink/10 bg-ink/5 text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]",
  outline:
    "border-ink/10 bg-ink/5 text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]",
  light:
    "border-ivory/15 bg-ivory/10 text-ivory shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]",
  ghost: "border-transparent bg-transparent text-ink shadow-none",
};

function ButtonIcon({
  variant,
  size,
  icon: Icon = ArrowUpRight,
  iconClassName,
  iconPosition,
}: {
  variant: Variant;
  size: Size;
  icon?: LucideIcon;
  iconClassName?: string;
  iconPosition: IconPosition;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "icon-circle relative z-10 border transition-transform duration-300 group-hover:-translate-y-0.5",
        variant === "ghost" ? "h-5 w-5" : iconBoxes[size],
        iconPosition === "start"
          ? "group-hover:-translate-x-0.5"
          : "group-hover:translate-x-0.5",
        iconBadgeTones[variant],
      )}
    >
      <Icon
        aria-hidden="true"
        size={variant === "ghost" ? 14 : iconGlyphs[size]}
        strokeWidth={1.8}
        className={iconClassName}
      />
    </span>
  );
}

type ButtonProps = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className">;

type ButtonLinkProps = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className">;

export function Button({
  children,
  variant = "primary",
  size = "md",
  withIcon = true,
  icon,
  iconClassName,
  iconPosition = "end",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        base,
        variants[variant],
        variant === "ghost" ? "" : sizes[size],
        className,
      )}
      {...props}
    >
      {withIcon && iconPosition === "start" ? (
        <ButtonIcon
          variant={variant}
          size={size}
          icon={icon}
          iconClassName={iconClassName}
          iconPosition={iconPosition}
        />
      ) : null}
      <span className="relative z-10 inline-flex items-center gap-2 whitespace-nowrap">
        {children}
      </span>
      {withIcon && iconPosition === "end" ? (
        <ButtonIcon
          variant={variant}
          size={size}
          icon={icon}
          iconClassName={iconClassName}
          iconPosition={iconPosition}
        />
      ) : null}
    </button>
  );
}

export function ButtonLink({
  children,
  variant = "primary",
  size = "md",
  withIcon = true,
  icon,
  iconClassName,
  iconPosition = "end",
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={cn(
        base,
        variants[variant],
        variant === "ghost" ? "" : sizes[size],
        className,
      )}
      {...props}
    >
      {withIcon && iconPosition === "start" ? (
        <ButtonIcon
          variant={variant}
          size={size}
          icon={icon}
          iconClassName={iconClassName}
          iconPosition={iconPosition}
        />
      ) : null}
      <span className="relative z-10 inline-flex items-center gap-2 whitespace-nowrap">
        {children}
      </span>
      {withIcon && iconPosition === "end" ? (
        <ButtonIcon
          variant={variant}
          size={size}
          icon={icon}
          iconClassName={iconClassName}
          iconPosition={iconPosition}
        />
      ) : null}
    </a>
  );
}

type IconLinkProps = {
  label: string;
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark" | "outline";
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className">;

const iconTones = {
  light: "border-ivory/35 text-ivory",
  dark: "border-ink/25 text-ink",
  outline: "border-ink/30 text-ink",
} as const;

export function IconLink({
  label,
  children,
  className,
  tone = "outline",
  ...props
}: IconLinkProps) {
  return (
    <a
      aria-label={label}
      className={cn(
        "button-icon icon-circle h-12 w-12 border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4",
        iconTones[tone],
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
