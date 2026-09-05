import { WeddingConfig } from "@/types/wedding";

// Konfigurasi terpusat — seluruh isi undangan ada di sini, sehingga undangan
// ini bisa digunakan ulang untuk pasangan lain tanpa menyentuh komponen.
export const weddingConfig: WeddingConfig = {
  coupleNames: {
    groom: "Asri",
    bride: "Husnul Khotimah",
    display: "Asri & Husnul Khotimah",

  },
  weddingDateISO: "2026-09-19T09:00:00+07:00",
  weddingDateDisplay: "19 · 09 · 2026",
  invitationHeadline: "Bersama keluarga besar kami",
  greetingMessage:
    "Dengan penuh sukacita dan restu dari kedua keluarga, kami mengundang Bapak/Ibu/Saudara/i untuk turut merayakan awal kebersamaan kami selamanya.",
  coupleIntro: {
    groom: {
      name: "Asri",
      initial: "A",
      parents: "Putra dari Bapak Asis lauto & Almh Ibu cut fatmawati",
      bio: "Sosok yang tenang namun selalu tahu apa yang harus dikatakan. Menemukan ketenangan dalam perjalanan panjang, piringan hitam lama, dan pagi hari Minggu.",
    },
    bride: {
      name: "Husnul Khotimah",
      initial: "H",
      parents: "Putri dari Bapak Hendra Anindita & Ibu Wulan Anindita",
      bio: "Percaya untuk selalu hadir sepenuhnya — bagi orang-orang, bagi setiap pagi, bagi kebahagiaan kecil. Menyukai kartu pos dan kalimat yang belum selesai.",
    },
  },
  events: {
    akad: {
      label: "Akad Nikah",
      date: "Sabtu, 19 September 2026",
      time: "09.00 — 11.00 WIB",
      venueName: "Desa Margacinta",
      address: "kediaman Bapak Sodri Blok. F Desa margacinta Kec. Moramo-Kab Konawe selatan",
      mapsUrl: "https://maps.app.goo.gl/E26W2bgdsT1sesSU8",
    },
    reception: {
      label: "Resepsi",
      date: "Sabtu, 19 September 2026",
      time: "13.00 — 17.00 WIB",
      venueName: "Desa Margacinta",
      address: "kediaman Bapak Sodri Blok. F Desa margacinta Kec. Moramo-Kab Konawe selatan",
      mapsUrl: "https://maps.app.goo.gl/E26W2bgdsT1sesSU8",
    },
  },
  details: [
    { label: "Kode Berpakaian", value: "Kode Berpakaian Mohon mengenakan pakaian yang sopan. Mohon menghindari warna putih, karena warna tersebut khusus untuk mempelai wanita." },
    { label: "Kedatangan", value: "Pintu dibuka tiga puluh menit sebelum masing-masing acara dimulai. Mohon hadir tepat waktu." },
    { label: "Anak-anak", value: "Kami sangat menyayangi putra-putri Bapak/Ibu, namun perayaan ini dikhususkan untuk tamu dewasa." },
  ],
  venue: {
    name: "Desa Margacinta",
    address: "kediaman Bapak Sodri Blok. F Desa margacinta Kec. Moramo-Kab Konawe selatan",
    mapsUrl: "https://maps.app.goo.gl/E26W2bgdsT1sesSU8",
    note: "Tersedia area parkir. Pintu dibuka tiga puluh menit sebelum masing-masing acara.",
  },
  gift: {
    bankName: "Dana",
    accountNumber: "082218350103",
    accountHolder: "An. Husnul khotimah",
    note: "Kehadiran Bapak/Ibu/Saudara/i adalah hadiah terindah bagi kami. Bagi yang ingin mengirimkan tanda kasih dari jauh, kami sertakan informasi berikut dengan penuh rasa syukur.",
  },
  music: {
    src: "https://ufyeavfzyymupaohdnxd.supabase.co/storage/v1/object/sign/Music/0906%20(1).MP3?token=eyJraWQiOiJhZmM3ZGMzMy01MjUzLTQ2MjgtYTM3MS1jOTRjYzk0MGU3MmIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNdXNpYy8wOTA2ICgxKS5NUDMiLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg4NjM4ODgzLCJleHAiOjE4MjAxNzQ4ODN9.eb1VlBHPZYrwNLcK3boHKuTsot1TwXqRZtuAlir5HrA",
    title: "Instrumental Pernikahan (placeholder)",
  },
  contact: {
    whatsapp: "085117228100",
    email: "decade.fastmedia@gmail.com",
  },
};
