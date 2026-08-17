export type ScreenId = 'home' | 'story' | 'event' | 'gallery' | 'details';

export interface Guest {
  id: string;
  name: string;
  slug: string;
}

export interface StoryChapter {
  year: string;
  title: string;
  text: string;
  image: string;
}

export interface EventSession {
  id: 'akad' | 'reception';
  label: string;
  date: string; // ISO date, used for countdown + display
  timeLabel: string;
  venueName: string;
  address: string;
  mapUrl: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  orientation: 'portrait' | 'landscape';
  span?: 'wide' | 'tall' | 'normal';
}

export interface GiftAccount {
  bank: string;
  accountNumber: string;
  accountName: string;
}

export interface WeddingConfig {
  couple: {
    groom: string;
    groomFull: string;
    bride: string;
    brideFull: string;
  };
  weddingDateISO: string;
  weddingDateLabel: string;
  hero: {
    image: string;
    invitationMessage: string;
  };
  cover: {
    monogram: string;
  };
  story: StoryChapter[];
  events: EventSession[];
  gallery: GalleryImage[];
  details: {
    dressCode: {
      title: string;
      description: string;
      palette: string[];
    };
    venueNotes: string;
    notes: string[];
    contact: { name: string; phone: string }[];
    gift: GiftAccount[];
  };
  music: {
    src: string;
    title: string;
  };
}
