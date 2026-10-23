import type { CSSProperties, ReactNode } from 'react';
import type { AchievementIcon, CategoryId } from '../data/types';

export interface IconProps {
  size?: number;
  strokeWidth?: number;
  className?: string;
  style?: CSSProperties;
}

interface IconBaseProps extends IconProps {
  children: ReactNode;
}

function IconBase({ size = 24, strokeWidth = 1.7, className, style, children }: IconBaseProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export function BrandMark({ size = 38 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" focusable="false">
      <rect width="40" height="40" rx="11" fill="#0A1E3A" />
      <path
        d="M10 30c0-7 7-6 7-12s8-4 8-9"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <circle cx="10" cy="30" r="3" fill="#F2F7A0" />
      <circle cx="25" cy="9" r="2.4" fill="#65D0F4" />
      <path
        d="M30 25v7M26.5 28.5h7"
        stroke="#65D0F4"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity=".8"
      />
    </svg>
  );
}

export function DeductionGlyph({ size = 24, strokeWidth = 1.7, className }: IconProps) {
  return (
    <IconBase size={size} strokeWidth={strokeWidth} className={className}>
      <circle cx="12" cy="12" r="9" />
      <text
        x="12"
        y="12"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="8.5"
        fontWeight="800"
        fill="currentColor"
        stroke="none"
        letterSpacing="-.4"
      >
        12
      </text>
    </IconBase>
  );
}

export function FineGlyph({ size = 24, strokeWidth = 1.7, className }: IconProps) {
  return (
    <IconBase size={size} strokeWidth={strokeWidth} className={className}>
      <rect x="2.5" y="6" width="19" height="12" rx="2.6" />
      <text
        x="12"
        y="12"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="9"
        fontWeight="800"
        fill="currentColor"
        stroke="none"
      >
        ¥
      </text>
      <path d="M6 9.3v5.4M18 9.3v5.4" opacity=".55" />
    </IconBase>
  );
}

export function AbbrGlyph({ size = 24, strokeWidth = 1.7, className }: IconProps) {
  return (
    <IconBase size={size} strokeWidth={strokeWidth} className={className}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="3.2" />
      <text
        x="12"
        y="12"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="7"
        fontWeight="800"
        fill="currentColor"
        stroke="none"
        letterSpacing=".4"
      >
        ABC
      </text>
    </IconBase>
  );
}

export function SpeedGlyph({ size = 24, strokeWidth = 1.7, className }: IconProps) {
  return (
    <IconBase size={size} strokeWidth={strokeWidth} className={className}>
      <path d="M3.8 17.5a8.2 8.2 0 1116.4 0" />
      <path d="M12 17.2l3.6-4.8" />
      <circle cx="12" cy="17.2" r="1.3" fill="currentColor" stroke="none" />
      <path d="M5.4 13.6h1.7M16.9 13.6h1.7M7 9.3l1.2 1.2M17 9.3l-1.2 1.2" />
    </IconBase>
  );
}

export function LicenseGlyph({ size = 24, strokeWidth = 1.7, className }: IconProps) {
  return (
    <IconBase size={size} strokeWidth={strokeWidth} className={className}>
      <rect x="2.5" y="5" width="19" height="14" rx="2.6" />
      <circle cx="8" cy="10.8" r="2.1" />
      <path d="M5.6 15.8c.5-1.6 1.5-2.3 2.4-2.3s1.9.7 2.4 2.3" />
      <path d="M13 9.2h5.5M13 12.2h5.5M13 15.2h3.4" />
    </IconBase>
  );
}

export function CategoryGlyph({
  categoryId,
  size = 24,
  className,
}: IconProps & { categoryId: CategoryId }) {
  switch (categoryId) {
    case 'deduction':
      return <DeductionGlyph size={size} className={className} />;
    case 'fine':
      return <FineGlyph size={size} className={className} />;
    case 'abbr':
      return <AbbrGlyph size={size} className={className} />;
    case 'speed':
      return <SpeedGlyph size={size} className={className} />;
    case 'license':
      return <LicenseGlyph size={size} className={className} />;
  }
}

export function IconRoute(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M3 15.5c3.2 0 3.2-6.5 6.4-6.5s3.2 6.5 6.4 6.5 3.4-6.5 5.2-6.5" />
      <circle cx="3" cy="15.5" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="9" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="21" cy="15.5" r="1.5" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

export function IconBook(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 5.4A2.4 2.4 0 016.4 3H20v15.6H6.4A2.4 2.4 0 004 21z" />
      <path d="M4 21V5.4M8 7.5h7.5M8 11h5" />
    </IconBase>
  );
}

export function IconBolt(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M13.2 2.5L4.8 13.2h6.1l-1 8.3 8.3-10.7h-6.1z" />
    </IconBase>
  );
}

export function IconTarget(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="8.2" />
      <circle cx="12" cy="12" r="4.4" />
      <circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

export function IconCrown(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4.2 17.8L3 8.4l5.3 3.2L12 5.2l3.7 6.4L21 8.4l-1.2 9.4z" />
      <path d="M4.2 17.8h15.6" />
    </IconBase>
  );
}

export function IconFlag(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M5.5 21V3.6" />
      <path d="M5.5 4.6c3.9-2 6.1 2.1 10 0.2v7.1c-3.9 1.9-6.1-2.2-10-.2" />
    </IconBase>
  );
}

export function IconShield(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 2.8l7.3 2.9v5.6c0 4.6-3 8.1-7.3 9.9-4.3-1.8-7.3-5.3-7.3-9.9V5.7z" />
      <path d="M8.8 11.8l2.2 2.2 4.3-4.4" />
    </IconBase>
  );
}

export function IconSpark(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 3.2l1.9 5.1L19 10.2l-5.1 1.9L12 17.2l-1.9-5.1L5 10.2l5.1-1.9z" />
      <path d="M18.2 15.8l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z" />
    </IconBase>
  );
}

export function IconGauge(props: IconProps) {
  return <SpeedGlyph {...props} />;
}

export function IconStamp(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M9.6 3.2h4.8v3.4l-1 4.1h3.8a3 3 0 013 3v2.6H3.8v-2.6a3 3 0 013-3h3.8l-1-4.1z" />
      <path d="M4.5 20.5h15" />
    </IconBase>
  );
}

export function AchievementGlyph({
  name,
  size = 24,
  className,
}: IconProps & { name: AchievementIcon }) {
  switch (name) {
    case 'route':
      return <IconRoute size={size} className={className} />;
    case 'book':
      return <IconBook size={size} className={className} />;
    case 'bolt':
      return <IconBolt size={size} className={className} />;
    case 'target':
      return <IconTarget size={size} className={className} />;
    case 'crown':
      return <IconCrown size={size} className={className} />;
    case 'flag':
      return <IconFlag size={size} className={className} />;
    case 'shield':
      return <IconShield size={size} className={className} />;
    case 'spark':
      return <IconSpark size={size} className={className} />;
    case 'gauge':
      return <IconGauge size={size} className={className} />;
    case 'stamp':
      return <IconStamp size={size} className={className} />;
  }
}

export function IconArrowRight(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 12h15.5M13.5 6l6 6-6 6" />
    </IconBase>
  );
}

export function IconArrowLeft(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M20 12H4.5M10.5 6l-6 6 6 6" />
    </IconBase>
  );
}

export function IconChevronRight(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M9 5l7 7-7 7" />
    </IconBase>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 12.5l5 5L20 6.5" />
    </IconBase>
  );
}

export function IconCheckCircle(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.2l2.6 2.6L16.2 9" />
    </IconBase>
  );
}

export function IconXCircle(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 9l6 6M15 9l-6 6" />
    </IconBase>
  );
}

export function IconClose(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </IconBase>
  );
}

export function IconTrash(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4.8 7h14.4M9.2 7V4.8h5.6V7M7 7l.7 12.2h8.6L17 7" />
      <path d="M10 10.5v5.2M14 10.5v5.2" />
    </IconBase>
  );
}

export function IconLock(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="4.8" y="10" width="14.4" height="10" rx="2.2" />
      <path d="M8 10V7a4 4 0 018 0v3" />
    </IconBase>
  );
}

export function IconTrophy(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M7.2 4h9.6v4.8a4.8 4.8 0 01-9.6 0z" />
      <path d="M7.2 6.2H4.4v1.6a3 3 0 003 3M16.8 6.2h2.8v1.6a3 3 0 01-3 3" />
      <path d="M12 13.6v3.6M8.6 20.6h6.8M10 17.2h4" />
    </IconBase>
  );
}

export function IconMarker(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M15.4 4.2l4.4 4.4-9.6 9.6H5.8v-4.4z" />
      <path d="M13.2 6.4l4.4 4.4M4 21h16" />
    </IconBase>
  );
}

export function IconRefresh(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M20.2 11.2A8.2 8.2 0 106 17.8" />
      <path d="M20.2 4.8v6.4h-6.4" />
    </IconBase>
  );
}

export function IconSparkle(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 3.5l1.7 4.8 4.8 1.7-4.8 1.7L12 16.5l-1.7-4.8L5.5 10l4.8-1.7z" />
      <path d="M18.5 16.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" />
    </IconBase>
  );
}

export function IconPlay(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M8 5.2l11 6.8-11 6.8z" />
    </IconBase>
  );
}

export function IconBookOpen(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 6.2C10 4.2 7 3.8 4 4.6v14.1c3-.8 6-.4 8 1.3 2-1.7 5-2.1 8-1.3V4.6c-3-.8-6-.4-8 1.6z" />
      <path d="M12 6.2v13.8" />
    </IconBase>
  );
}
