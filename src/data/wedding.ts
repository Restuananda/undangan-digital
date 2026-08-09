import type { WeddingData } from "../types/wedding";

/**
 * Single source of truth for all wedding-specific content.
 * Replace these values to reuse this project as a template for
 * another couple — no component should hard-code wedding info.
 */
export const weddingData: WeddingData = {
  couple: {
    bride: {
      fullName: "Kolifatun, S.Pd.",
      shortName: "Olif",
      initial: "K",
      parents: {
        father: "Bapak Ahmad Rahman",
        mother: "Ibu Siti Aminah",
      },
      photo: "https://picsum.photos/seed/olif-bride-portrait/900/1200",
    },
    groom: {
      fullName: "Usman Pratama",
      shortName: "Usman",
      initial: "U",
      parents: {
        father: "Bapak Muhammad Yusuf",
        mother: "Ibu Nurhayati",
      },
      photo: "https://picsum.photos/seed/usman-groom-portrait/900/1200",
    },
  },

  weddingDateISO: "2026-08-02T15:00:00+08:00",
  timezone: "Asia/Makassar",

  quote: {
    arabic:
      "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً",
    translation:
      "Dan diantara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan-pasangan dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang.",
    reference: "QS. Ar-Rum : 21",
  },

  events: [
    {
      id: "akad",
      title: "Akad Nikah",
      dateLabel: "Minggu, 02 Agustus 2026",
      timeLabel: "12:30 WITA – Selesai",
      venue: "Rumah Kediaman Mempelai Wanita",
      address: "Desa Langgea, Kec. Padangguni, Kab. Konawe",
      mapsUrl: "https://maps.google.com/?q=Desa+Langgea+Padangguni+Konawe",
    },
    {
      id: "resepsi",
      title: "Resepsi",
      dateLabel: "Minggu, 02 Agustus 2026",
      timeLabel: "15:00 WITA – Selesai",
      venue: "Rumah Kediaman Mempelai Wanita",
      address: "Desa Langgea, Kec. Padangguni, Kab. Konawe",
      mapsUrl: "https://maps.google.com/?q=Desa+Langgea+Padangguni+Konawe",
    },
  ],

  location: {
    name: "Rumah Kediaman Mempelai Wanita",
    address: "Desa Langgea, Kecamatan Padangguni, Kabupaten Konawe, Sulawesi Tenggara",
    mapsUrl: "https://maps.google.com/?q=Desa+Langgea+Padangguni+Konawe",
    mapsEmbedUrl:
      "https://maps.google.com/maps?q=Desa%20Langgea%20Padangguni%20Konawe&t=&z=13&ie=UTF8&iwloc=&output=embed",
  },

  loveStory: [
    {
      id: "awal",
      year: "2016",
      title: "Awal Cerita Kita",
      description:
        "Berkenalan pada tahun 2016 melalui sosial media. Sebuah perkenalan sederhana yang perlahan menjadi bagian penting dalam perjalanan kami.",
    },
    {
      id: "dipertemukan",
      year: "2023",
      title: "Kembali Dipertemukan",
      description:
        "Setelah beberapa tahun kehilangan kabar, takdir mempertemukan kami kembali. Percakapan sederhana berubah menjadi hubungan yang semakin dekat.",
    },
    {
      id: "lamaran",
      year: "2025",
      title: "Lamaran",
      description:
        "Pada Juli 2025, dua keluarga dipertemukan dalam sebuah khitbah sederhana.",
    },
    {
      id: "pernikahan",
      year: "2026",
      title: "Pernikahan",
      description:
        "Dengan penuh rasa syukur, kami memutuskan untuk melangkah bersama dalam ikatan suci pernikahan.",
    },
  ],

  gallery: [
    { id: "g1", src: "https://picsum.photos/seed/wedding-couple-01/900/1200", alt: "Olif & Usman — momen kebersamaan", aspect: "portrait" },
    { id: "g2", src: "https://picsum.photos/seed/wedding-couple-02/1200/900", alt: "Olif & Usman — perjalanan bersama", aspect: "landscape" },
    { id: "g3", src: "https://picsum.photos/seed/wedding-couple-03/900/900", alt: "Olif & Usman — kebersamaan sederhana", aspect: "square" },
    { id: "g4", src: "https://picsum.photos/seed/wedding-couple-04/900/1300", alt: "Olif & Usman — sesi foto pranikah", aspect: "portrait" },
    { id: "g5", src: "https://picsum.photos/seed/wedding-couple-05/1200/860", alt: "Olif & Usman — di antara ladang", aspect: "landscape" },
    { id: "g6", src: "https://picsum.photos/seed/wedding-couple-06/950/950", alt: "Olif & Usman — senja bersama", aspect: "square" },
  ],

  livestream: {
    url: "https://www.youtube.com/live/wedding-olif-usman",
    platformLabel: "YouTube Live",
  },

  gift: {
    bankAccounts: [
      { id: "bca", bankName: "Bank BCA", accountNumber: "1234567890", accountHolder: "Kolifatun" },
    ],
    eWallets: [
      { id: "dana", providerName: "DANA", phoneNumber: "081234567890", accountHolder: "Kolifatun" },
    ],
    shippingAddress: {
      receiverName: "Kolifatun",
      phoneNumber: "081234567890",
      address: "Desa Langgea, Kecamatan Padangguni, Kabupaten Konawe",
    },
  },

  closingMessage:
    "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu. Atas kehadiran dan doa restunya, kami mengucapkan terima kasih.",

  audioSrc: "/audio/wedding-music.mp3",
};
