import { WeddingConfig } from "@/types/wedding";

// Centralized configuration — every piece of wedding content lives here so the
// entire invitation can be re-skinned for another couple without touching components.
export const weddingConfig: WeddingConfig = {
  coupleNames: {
    groom: "Asri",
    bride: "Husnul",
    display: "Asri & Husnul",
  },
  weddingDateISO: "2026-12-20T09:00:00+07:00",
  weddingDateDisplay: "20 · 12 · 2026",
  invitationHeadline: "Together with their families",
  greetingMessage:
    "With joyful hearts and the blessing of our families, we invite you to celebrate the beginning of our forever.",
  coupleIntro: {
    groom: {
      name: "Asri",
      initial: "A",
      parents: "Son of Mr. Bambang Wicaksono & Mrs. Ratna Wicaksono",
      bio: "The quiet one who somehow always knows what to say. Finds peace in long drives, old records, and Sunday mornings.",
    },
    bride: {
      name: "Clara Anindita",
      initial: "C",
      parents: "Daughter of Mr. Hendra Anindita & Mrs. Wulan Anindita",
      bio: "Believes in showing up fully — for people, for mornings, for small joys. Collects postcards and unfinished sentences.",
    },
  },
  story: [
    {
      year: "2019",
      title: "A crowded room, somehow quiet",
      text: "We first met at a mutual friend's dinner, seated by accident on the same side of a table too small for eight people. Neither of us remembers what was said. Both of us remember staying long after the plates were cleared.",
    },
    {
      year: "2022",
      title: "The years that followed",
      text: "Ordinary Tuesdays, long-distance calls, a shared apartment with too many plants. We learned each other slowly — the good mornings and the hard ones — and found we preferred every version.",
    },
    {
      year: "2025",
      title: "One question, changed everything",
      text: "On a quiet evening, no orchestra, no grand plan — just a question asked plainly, and an answer that had been ready for a long time.",
    },
    {
      year: "2026",
      title: "Our forever begins",
      text: "And now, surrounded by the people who raised us and walked with us, we begin the next chapter — as one.",
    },
  ],
  events: {
    akad: {
      label: "Akad Ceremony",
      date: "Sunday, 20 December 2026",
      time: "09:00 — 11:00 WIB",
      venueName: "Graha Kencana Estate",
      address: "Jl. Kenanga Raya No. 18, Yogyakarta, Indonesia",
      mapsUrl: "https://maps.google.com/?q=Graha+Kencana+Estate+Yogyakarta",
    },
    reception: {
      label: "Reception",
      date: "Sunday, 20 December 2026",
      time: "13:00 — 17:00 WIB",
      venueName: "Graha Kencana Estate — Garden Pavilion",
      address: "Jl. Kenanga Raya No. 18, Yogyakarta, Indonesia",
      mapsUrl: "https://maps.google.com/?q=Graha+Kencana+Estate+Yogyakarta",
    },
  },
  details: [
    { label: "Dress Code", value: "Earth tones & formal attire. No white, please — that's reserved for the bride." },
    { label: "Arrival", value: "Doors open thirty minutes before each ceremony. Please arrive with time to spare." },
    { label: "Children", value: "We adore your little ones, but this celebration is an adults-only occasion." },
    { label: "Parking", value: "Complimentary on-site parking, with valet available at the main entrance." },
  ],
  venue: {
    name: "Graha Kencana Estate",
    address: "Jl. Kenanga Raya No. 18, Yogyakarta, Indonesia 55281",
    mapsUrl: "https://maps.google.com/?q=Graha+Kencana+Estate+Yogyakarta",
    note: "Parking available on-site. Doors open thirty minutes before each ceremony.",
  },
  gift: {
    bankName: "Bank Central Asia (BCA)",
    accountNumber: "8801234567",
    accountHolder: "Clara Anindita",
    note: "Your presence is the only gift we ask for. For those who wish to send a token of love from afar, we've included this with gratitude.",
  },
  music: {
    src: "/audio/wedding.mp3",
    title: "A Thousand Years",
  },
  contact: {
    whatsapp: "+62 812 3456 7890",
    email: "hello@adrianandclara.id",
  },
};
