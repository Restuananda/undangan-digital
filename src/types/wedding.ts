export interface Parents {
  father: string;
  mother: string;
}

export interface Person {
  fullName: string;
  shortName: string;
  parents: Parents;
  initial: string;
  photo?: string;
}

export interface WeddingEvent {
  id: string;
  title: string;
  dateLabel: string;
  timeLabel: string;
  venue: string;
  address: string;
  mapsUrl: string;
}

export interface LocationInfo {
  name: string;
  address: string;
  mapsUrl: string;
  mapsEmbedUrl?: string;
}

export interface LoveStoryItem {
  id: string;
  year: string;
  title: string;
  description: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  aspect: "portrait" | "landscape" | "square";
}

export interface LivestreamInfo {
  url: string;
  platformLabel: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
}

export interface EWallet {
  id: string;
  providerName: string;
  phoneNumber: string;
  accountHolder: string;
}

export interface ShippingAddress {
  receiverName: string;
  phoneNumber: string;
  address: string;
}

export interface GiftInfo {
  bankAccounts: BankAccount[];
  eWallets: EWallet[];
  shippingAddress: ShippingAddress;
}

export type AttendanceStatus = "hadir" | "tidak-hadir";

export interface WishEntry {
  id: string;
  name: string;
  attendance: AttendanceStatus;
  message: string;
  createdAt: string; // ISO timestamp
}

export interface QuranVerse {
  arabic?: string;
  translation: string;
  reference: string;
}

export interface WeddingData {
  couple: {
    bride: Person;
    groom: Person;
  };
  weddingDateISO: string;
  timezone: string;
  quote: QuranVerse;
  events: WeddingEvent[];
  location: LocationInfo;
  loveStory: LoveStoryItem[];
  gallery: GalleryImage[];
  livestream: LivestreamInfo;
  gift: GiftInfo;
  closingMessage: string;
  audioSrc: string;
}
