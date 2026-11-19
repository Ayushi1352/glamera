import type { CSSProperties } from "react";

export interface ThemeFonts {
  primary: string;
  /** the wider sans of the hero and About texts */
  text: string;
  heading: string;
  /** narrow serif capitals of the About title */
  display: string;
  nav: string;
  form: string;
  script: string;
}

/** CSS variables set on <html> from templates.json (fonts) */
export type RootVariables = CSSProperties & {
  "--font-primary": string;
  "--font-text": string;
  "--font-heading": string;
  "--font-display": string;
  "--font-nav": string;
  "--font-form": string;
  "--font-script": string;
};

export interface ThemeData {
  fonts: ThemeFonts;
}

export interface SiteMetadataData {
  title: string;
  description: string;
  icon: string;
  lang: string;
}

export interface LinkItem {
  id: string;
  label: string;
  url: string;
}

export interface ContactItem {
  id: string;
  icon: string;
  title: string;
  lines: string[];
  url: string;
}

export interface CompanyData {
  logo: string;
  logoAlt: string;
  logoWidth: number;
  logoHeight: number;
  contactItems: ContactItem[];
}

export interface SocialLink {
  id: string;
  icon: string;
  label: string;
  url: string;
}

export interface FooterData {
  description: string;
  socialLabel: string;
  socialLinks: SocialLink[];
  quickLinksTitle: string;
  quickLinks: LinkItem[];
  moreLinksTitle: string;
  moreLinks: LinkItem[];
  contactTitle: string;
  /** which of the company contact details the footer lists, in order */
  contactIds: string[];
  copyrightText: string;
}

export interface HeaderData {
  logoUrl: string;
  homeLabel: string;
  navLinks: LinkItem[];
  buttonText: string;
  buttonUrl: string;
  mainNavLabel: string;
  mobileNavLabel: string;
  openMenuLabel: string;
  closeMenuLabel: string;
}

/** A section title with its highlighted words (titleAccent) in maroon italics */
export interface SplitTitle {
  label: string;
  titleTop: string;
  titleAccent: string;
  description: string;
}

export interface PhotoItem {
  id: string;
  image: string;
  imageAlt: string;
}

export interface HeroData {
  id: string;
  titleTop: string;
  titleBottom: string;
  titleAccent: string;
  description: string;
  /** the large pale script word behind the headline */
  watermark: string;
  buttonText: string;
  buttonUrl: string;
  /** the two photos under the headline (left: smaller, right: wider) */
  photos: PhotoItem[];
}

export interface AboutData {
  id: string;
  label: string;
  titleTop: string;
  titleAccent: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  /** words written around the round badge, clockwise from the bottom left */
  badgeWords: string[];
  visitIcon: string;
  visitTitle: string;
  visitText: string;
  visitUrl: string;
}

export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  text: string;
}

export interface ServicesData extends SplitTitle {
  id: string;
  items: ServiceItem[];
}

export interface PackageItem {
  id: string;
  nameAccent: string;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
  /** pale line drawing in the bottom-right corner of the card */
  decor: string;
  features: { id: string; text: string }[];
}

export interface PackagesData extends SplitTitle {
  id: string;
  checkIcon: string;
  items: PackageItem[];
}

export interface GalleryFilter {
  id: string;
  label: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  /** id of the filter this photo belongs to */
  category: string;
  image: string;
}

export interface GalleryData extends SplitTitle {
  id: string;
  /** the first filter shows every photo */
  filters: GalleryFilter[];
  items: GalleryItem[];
  filterLabel: string;
  viewerLabel: string;
  openLabel: string;
  closeLabel: string;
  previousLabel: string;
  nextLabel: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  time: string;
  quote: string;
  image: string;
  stars: number;
}

export interface TestimonialsData extends SplitTitle {
  id: string;
  ratingLabel: string;
  showLabel: string;
  /** the review shown in the middle first */
  startIndex: number;
  items: TestimonialItem[];
}

export interface ContactData {
  id: string;
  label: string;
  titleTop: string;
  titleAccent: string;
  descriptionLines: string[];
  image: string;
  imageAlt: string;
}

export interface FormField {
  placeholder: string;
  icon: string;
}

export interface ContactFormData {
  fields: {
    name: FormField;
    email: FormField;
    date: FormField;
    service: FormField;
    message: FormField;
  };
  /** how a package appears in the service list; the services and packages themselves come from their sections */
  packageOption: string;
  consentText: string;
  consentLinkText: string;
  consentUrl: string;
  button: string;
  sending: string;
  successTitle: string;
  success: string;
  closeLabel: string;
}

interface Variants<T> {
  variants: Record<string, T>;
}

export interface TemplateComponent {
  key: string;
  component: string;
}

export interface SalonTemplateData {
  common: {
    theme: ThemeData;
    metadata: SiteMetadataData;
    company: CompanyData;
    Footer: FooterData;
  };
  categories: {
    BeautySalon: {
      sections: {
        Header?: Variants<HeaderData>;
        Hero?: Variants<HeroData>;
        About?: Variants<AboutData>;
        Services?: Variants<ServicesData>;
        Packages?: Variants<PackagesData>;
        Gallery?: Variants<GalleryData>;
        Testimonials?: Variants<TestimonialsData>;
        Contact?: Variants<ContactData>;
        ContactForm?: Variants<ContactFormData>;
      };
      templateComponents: {
        [template: string]: {
          shared: Record<string, string>;
          pages: Record<string, { components: TemplateComponent[] }>;
        };
      };
    };
  };
}
