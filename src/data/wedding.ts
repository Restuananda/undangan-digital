import type { WeddingConfig } from '../types/wedding';

/**
 * Every piece of wedding-specific copy and content lives here.
 * To reuse this project for another wedding, this is the only
 * file (plus /public/guests.json and /public/images, /public/audio)
 * that needs to change.
 */
export const wedding: WeddingConfig = {
  couple: {
    groom: 'Adrian',
    groomFull: 'Adrian Wicaksono',
    bride: 'Clara',
    brideFull: 'Clara Anindita',
  },
  weddingDateISO: '2026-12-20T09:00:00+07:00',
  weddingDateLabel: '20 · 12 · 2026',
  hero: {
    image: '/images/hero.jpg',
    invitationMessage:
      'We would be delighted to have your company as we celebrate the beginning of our forever.',
  },
  cover: {
    monogram: 'A & C',
  },
  story: [
    {
      year: '2019',
      title: 'The day it began',
      text: 'A crowded lecture hall, a borrowed pen, and a conversation that outlasted the class by three hours.',
      image: '/images/story-01.jpg',
    },
    {
      year: '2021',
      title: 'Somewhere along the way',
      text: 'Long calls became long weekends. Long weekends became a life we kept choosing, again and again.',
      image: '/images/story-02.jpg',
    },
    {
      year: '2023',
      title: 'A home of our own',
      text: 'Two names on one lease, and the quiet realization that home was never a place. It was this.',
      image: '/images/story-03.jpg',
    },
    {
      year: '2025',
      title: 'One question, one answer',
      text: 'On a quiet evening in October, under no particular occasion at all, forever was decided.',
      image: '/images/story-04.jpg',
    },
  ],
  events: [
    {
      id: 'akad',
      label: 'Akad',
      date: '2026-12-20T09:00:00+07:00',
      timeLabel: '09:00 WIB — 10:30 WIB',
      venueName: 'Gedung Pertemuan Wastu Kencana',
      address: 'Jl. Kaliurang No. 12, Sleman, Yogyakarta',
      mapUrl: 'https://maps.google.com/?q=Wastu+Kencana+Yogyakarta',
    },
    {
      id: 'reception',
      label: 'Reception',
      date: '2026-12-20T12:00:00+07:00',
      timeLabel: '12:00 WIB — 15:00 WIB',
      venueName: 'Gedung Pertemuan Wastu Kencana',
      address: 'Jl. Kaliurang No. 12, Sleman, Yogyakarta',
      mapUrl: 'https://maps.google.com/?q=Wastu+Kencana+Yogyakarta',
    },
  ],
  gallery: [
    { id: 'g01', src: '/images/gallery-01.jpg', alt: 'Adrian and Clara, portrait', orientation: 'portrait', span: 'tall' },
    { id: 'g02', src: '/images/gallery-02.jpg', alt: 'Engagement session, landscape', orientation: 'landscape', span: 'wide' },
    { id: 'g03', src: '/images/gallery-03.jpg', alt: 'Candid moment', orientation: 'portrait' },
    { id: 'g04', src: '/images/gallery-04.jpg', alt: 'Detail shot', orientation: 'portrait' },
    { id: 'g05', src: '/images/gallery-05.jpg', alt: 'Golden hour portrait', orientation: 'landscape', span: 'wide' },
    { id: 'g06', src: '/images/gallery-06.jpg', alt: 'Adrian and Clara, close up', orientation: 'portrait', span: 'tall' },
    { id: 'g07', src: '/images/gallery-07.jpg', alt: 'Walking together', orientation: 'portrait' },
    { id: 'g08', src: '/images/gallery-08.jpg', alt: 'Quiet moment', orientation: 'portrait' },
  ],
  details: {
    dressCode: {
      title: 'Dress Code',
      description: 'Formal attire in warm neutral tones. We kindly ask guests to avoid white and ivory.',
      palette: ['#3C2E22', '#6B5A45', '#A9814C', '#DCD3C1'],
    },
    venueNotes: 'Complimentary parking is available on-site. The venue is step-free from the main entrance.',
    notes: [
      'Kindly arrive 15 minutes before the ceremony begins.',
      'This invitation admits two guests.',
      'Children are warmly welcome.',
    ],
    contact: [
      { name: 'Budi (Groom\u2019s side)', phone: '+62 812-0000-0001' },
      { name: 'Sari (Bride\u2019s side)', phone: '+62 812-0000-0002' },
    ],
    gift: [{ bank: 'Bank Example', accountNumber: '1234567890', accountName: 'Adrian Wicaksono' }],
  },
  music: {
    src: '/audio/wedding.mp3',
    title: 'A Thousand Years — Piano',
  },
};
