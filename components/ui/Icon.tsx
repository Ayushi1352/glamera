import type { IconBaseProps, IconType } from "react-icons";
import { FaFacebookF, FaInstagram, FaPinterestP, FaRegStar, FaStar, FaYoutube } from "react-icons/fa";
import {
  LuCheck,
  LuChevronDown,
  LuChevronLeft,
  LuChevronRight,
  LuLayoutGrid,
  LuMail,
  LuMapPin,
  LuMenu,
  LuMessageSquareText,
  LuPhone,
  LuPlus,
  LuUser,
  LuX,
} from "react-icons/lu";

// Line icons drawn for this design (react-icons has no close match): same props as the library icons.
const outline = { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** Four-point sparkle, centred on (x, y) */
const sparkle = (x: number, y: number, r: number) =>
  `M${x} ${y - r}Q${x + r * 0.12} ${y - r * 0.12} ${x + r} ${y}Q${x + r * 0.12} ${y + r * 0.12} ${x} ${y + r}Q${x - r * 0.12} ${y + r * 0.12} ${x - r} ${y}Q${x - r * 0.12} ${y - r * 0.12} ${x} ${y - r}Z`;

/** Facials: face with a towel turban, closed eyes, hands on the cheeks and two sparkles */
const FacialIcon: IconType = ({ className, strokeWidth = 3.4 }: IconBaseProps) => (
  <svg viewBox="0 0 160 160" className={className} aria-hidden="true" {...outline} strokeWidth={strokeWidth}>
    <path d="M51 70C47 40 61 22 80 22s33 18 29 48" />
    <path d="M52 63c9-9 47-9 56 0" />
    <path d="M58 33c14 3 27 13 33 27M76 52c6-11 17-18 31-18" />
    <path d="M53 66c-1 30 11 51 27 51s28-21 27-51" />
    <path d="M63 85c4 4 9 4 13 0M84 85c4 4 9 4 13 0M80 91v8h-3M74 106c4 3 9 3 12 0" />
    <path d="M64 142 52 128c-8-9-12-19-13-31-1-6 6-8 9-3l9 17M48 103l-3-14c-1-6 6-8 8-2l5 17" />
    <path d="m96 142 12-14c8-9 12-19 13-31 1-6-6-8-9-3l-9 17M112 103l3-14c1-6-6-8-8-2l-5 17" />
    <path d={sparkle(29, 100, 9)} strokeWidth={Number(strokeWidth) * 0.8} />
    <path d={sparkle(132, 82, 9)} strokeWidth={Number(strokeWidth) * 0.8} />
  </svg>
);

/** Waxing: wax bowl with a dripping spatula and a flower */
const WaxingIcon: IconType = ({ className, strokeWidth = 3.4 }: IconBaseProps) => (
  <svg viewBox="0 0 160 160" className={className} aria-hidden="true" {...outline} strokeWidth={strokeWidth}>
    <path d="M24 82h96v9H24zM24 91c2 19 18 32 48 32 14 0 25-3 32-8" />
    <circle cx="35" cy="99" r="1.2" fill="currentColor" />
    <path d="M70 62 109 29c4-3 9 2 6 6L79 72" />
    <path d="M70 62c-5 5-4 11 1 13v8c0 4 6 4 6 0v-5c3 1 6-1 5-4l-3-2" />
    <circle cx="118" cy="114" r="5" />
    <path d="M118 109c-4-8 0-14 4-13 5 1 4 9-1 13M123 112c8-3 13 2 11 6s-9 3-11-2M121 119c5 6 2 12-2 11s-5-7-1-11M115 119c-5 6-11 4-11 0s6-6 10-3M114 111c-7-4-6-11-1-11 4 0 6 6 4 11" />
  </svg>
);

/** Make-up: powder brush, open compact and a powder puff */
const MakeupIcon: IconType = ({ className, strokeWidth = 3.4 }: IconBaseProps) => (
  <svg viewBox="0 0 160 160" className={className} aria-hidden="true" {...outline} strokeWidth={strokeWidth}>
    <path d="M47 140c-3 0-5-2-5-5l5-44h9l1 44c0 3-2 5-5 5z" />
    <path d="M47 91l-3-11h15l-3 11M44 80C31 69 30 47 42 38c13-10 30 2 34 16-5 11-11 19-17 26" />
    <path d="M50 62l3 18M58 58l-2 22" strokeWidth={Number(strokeWidth) * 0.7} />
    <circle cx="112" cy="88" r="30" />
    <circle cx="112" cy="88" r="23" />
    <path d="m103 87 9-9M109 93l9-9" strokeWidth={Number(strokeWidth) * 0.8} />
    <path d="M78 128c0-10 12-15 28-15s28 5 28 15-12 13-28 13-28-3-28-13zM80 127c8-3 17-4 26-4s18 1 26 4" />
  </svg>
);

/** Nails: nail polish bottle, a polish wand and a sparkle */
const NailsIcon: IconType = ({ className, strokeWidth = 3.4 }: IconBaseProps) => (
  <svg viewBox="0 0 160 160" className={className} aria-hidden="true" {...outline} strokeWidth={strokeWidth}>
    <path d="M65 68V30c0-4 3-6 6-6h16c3 0 6 2 6 6v38" />
    <path d="M56 68h46c6 0 9 4 9 9l-2 52c0 6-4 10-10 10H59c-6 0-10-4-10-10l-2-52c0-5 3-9 9-9zM48 122h62" />
    <path d="M121 95V68c0-4 6-4 6 0v27M115 95h18v45h-18z" />
    <path d={sparkle(132, 40, 11)} strokeWidth={Number(strokeWidth) * 0.8} />
  </svg>
);

/** Envelope with the fold lines meeting in the middle */
const EnvelopeIcon: IconType = ({ className, strokeWidth = 1.6 }: IconBaseProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...outline} strokeWidth={strokeWidth}>
    <rect x="2.5" y="5" width="19" height="14" rx="1.5" />
    <path d="m3 5.8 9 7.4 9-7.4M3 18.4l6.8-6.7M21 18.4l-6.8-6.7" />
  </svg>
);

/** Calendar page with a dotted grid and a small clock in the corner */
const CalendarIcon: IconType = ({ className, strokeWidth = 1.6 }: IconBaseProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...outline} strokeWidth={strokeWidth}>
    <path d="M13 20.5H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v6.5M3 9h17M7.5 2.5v3M15.5 2.5v3" />
    <path d="M7 12.5h.01M10 12.5h.01M13 12.5h.01M7 15.5h.01M10 15.5h.01M7 18h.01" strokeWidth={Number(strokeWidth) * 1.4} />
    <circle cx="17.5" cy="17.5" r="3.5" />
    <path d="M17.5 16v1.6l1 .8" />
  </svg>
);

// Every icon the site can use, by the name templates.json stores. A new icon is added here once.
const icons: Record<string, IconType> = {
  CalendarIcon,
  EnvelopeIcon,
  FacialIcon,
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaRegStar,
  FaStar,
  FaYoutube,
  LuCheck,
  LuChevronDown,
  LuChevronLeft,
  LuChevronRight,
  LuLayoutGrid,
  LuMail,
  LuMapPin,
  LuMenu,
  LuMessageSquareText,
  LuPhone,
  LuPlus,
  LuUser,
  LuX,
  MakeupIcon,
  NailsIcon,
  WaxingIcon,
};

type Props = {
  name: string;
  className?: string;
  // Line thickness of the outline icons (Lu and the drawn ones); the filled Fa icons keep their own shape.
  strokeWidth?: number;
};

export const Icon = ({ name, className, strokeWidth }: Props) => {
  const Component = icons[name] ?? LuCheck;
  const filled = name.startsWith("Fa");
  return <Component className={className} strokeWidth={filled ? undefined : strokeWidth ?? (name.startsWith("Lu") ? 1.8 : undefined)} aria-hidden="true" />;
};
