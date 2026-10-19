export type ServiceGroup = "hair" | "beard" | "packages";

export type Service = {
  id: string;
  name: string;
  description?: string;
  pricePence: number;
  durationMinutes: number;
  group: ServiceGroup;
  featured?: boolean;
};

export const serviceGroups: { id: ServiceGroup; label: string }[] = [
  { id: "hair", label: "Hair" },
  { id: "beard", label: "Beard & Shaving" },
  { id: "packages", label: "Packages & Grooming" },
];

export const services: Service[] = [
  {
    id: "classic-hair-cut",
    name: "Classic Hair Cut",
    pricePence: 1900,
    durationMinutes: 30,
    group: "hair",
  },
  {
    id: "skin-fade",
    name: "Skin Fade",
    pricePence: 2200,
    durationMinutes: 30,
    group: "hair",
  },
  {
    id: "one-guard-clipper-cut",
    name: "One Guard Clipper Cut",
    pricePence: 1500,
    durationMinutes: 20,
    group: "hair",
  },
  {
    id: "kids-hair-cut",
    name: "Kids Hair Cut — Under 12s",
    description: "For a skin fade, choose Skin Fade at the standard £22 price.",
    pricePence: 1500,
    durationMinutes: 30,
    group: "hair",
  },
  {
    id: "oap-hair-cut",
    name: "OAP Hair Cut",
    pricePence: 1200,
    durationMinutes: 30,
    group: "hair",
  },
  {
    id: "hot-towel-wet-shave",
    name: "Shave — Hot Towel Wet Shave",
    pricePence: 1900,
    durationMinutes: 30,
    group: "beard",
  },
  {
    id: "beard-trim-hot-towel",
    name: "Beard Trim + Hot Towel Shave",
    pricePence: 1900,
    durationMinutes: 30,
    group: "beard",
  },
  {
    id: "one-guard-clipper-shave",
    name: "One Guard Clipper Shave",
    pricePence: 1000,
    durationMinutes: 15,
    group: "beard",
  },
  {
    id: "full-service",
    name: "Full Service",
    description: "Hair cut + hot towel shave",
    pricePence: 3000,
    durationMinutes: 45,
    group: "packages",
  },
  {
    id: "gold-package",
    name: "Gold Package",
    description: "Hair cut + wet shave + hot wax + steam",
    pricePence: 4000,
    durationMinutes: 60,
    group: "packages",
    featured: true,
  },
  {
    id: "hot-waxing",
    name: "Hot Face, Ear & Nose Waxing",
    pricePence: 1000,
    durationMinutes: 30,
    group: "packages",
  },
];

export function getService(id: string) {
  return services.find((service) => service.id === id);
}

export function formatPrice(pence: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(pence / 100);
}

export function formatDuration(minutes: number) {
  if (minutes < 60) return `${minutes} minutes`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (rest === 0) return hours === 1 ? "60 minutes" : `${hours} hours`;
  return `${hours} hr ${rest} min`;
}

export const depositRate = 0.25;

export function getDeposit(pence: number) {
  return Math.round(pence * depositRate);
}

export function getRemaining(pence: number) {
  return pence - getDeposit(pence);
}
