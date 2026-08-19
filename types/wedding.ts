export interface Guest {
  id: string;
  name: string;
  slug: string;
}

export type Attendance = "attending" | "not_attending";

export interface RSVPRecord {
  id: string;
  guestId: string;
  guestName: string;
  attendance: Attendance;
  message: string;
  submittedAt: string;
}

export interface RSVPCreateInput {
  guestId: string;
  guestName: string;
  attendance: Attendance;
  message?: string;
}

export type RSVPResult =
  | { success: true; message: string; record: RSVPRecord }
  | { success: false; code: "ALREADY_SUBMITTED" | "INVALID_GUEST" | "INVALID_INPUT" | "SERVER_ERROR"; message: string };

export interface StoryMoment {
  year: string;
  title: string;
  text: string;
}

export interface WeddingEventDetail {
  label: string;
  date: string;
  time: string;
  venueName: string;
  address: string;
  mapsUrl: string;
}

export interface WeddingDetail {
  label: string;
  value: string;
}

export interface WeddingConfig {
  coupleNames: {
    bride: string;
    groom: string;
    display: string;
  };
  weddingDateISO: string;
  weddingDateDisplay: string;
  invitationHeadline: string;
  greetingMessage: string;
  coupleIntro: {
    groom: { name: string; initial: string; parents: string; bio: string };
    bride: { name: string; initial: string; parents: string; bio: string };
  };
  story: StoryMoment[];
  events: {
    akad: WeddingEventDetail;
    reception: WeddingEventDetail;
  };
  details: WeddingDetail[];
  venue: {
    name: string;
    address: string;
    mapsUrl: string;
    note: string;
  };
  gift: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
    note: string;
  };
  music: {
    src: string;
    title: string;
  };
  contact: {
    whatsapp: string;
    email: string;
  };
}
