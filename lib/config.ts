import { WeddingConfig } from "@/types/wedding";

// Konfigurasi terpusat — seluruh isi undangan ada di sini, sehingga undangan
// ini bisa digunakan ulang untuk pasangan lain tanpa menyentuh komponen.
export const weddingConfig: WeddingConfig = {
  coupleNames: {
    groom: "Asri",
    bride: "Husnul",
    display: "Asri & Husnul",
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
      parents: "Putra dari Bapak Bambang Wicaksono & Ibu Ratna Wicaksono",
      bio: "Sosok yang tenang namun selalu tahu apa yang harus dikatakan. Menemukan ketenangan dalam perjalanan panjang, piringan hitam lama, dan pagi hari Minggu.",
    },
    bride: {
      name: "Husnul",
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
      venueName: "Graha Kencana Estate",
      address: "Jl. Kenanga Raya No. 18, Yogyakarta, Indonesia",
      mapsUrl: "https://maps.google.com/?q=Graha+Kencana+Estate+Yogyakarta",
    },
    reception: {
      label: "Resepsi",
      date: "Sabtu, 19 September 2026",
      time: "13.00 — 17.00 WIB",
      venueName: "Graha Kencana Estate — Garden Pavilion",
      address: "Jl. Kenanga Raya No. 18, Yogyakarta, Indonesia",
      mapsUrl: "https://maps.google.com/?q=Graha+Kencana+Estate+Yogyakarta",
    },
  },
  details: [
    { label: "Kode Berpakaian", value: "Warna earth tone & pakaian formal. Mohon hindari warna putih — warna tersebut khusus untuk mempelai wanita." },
    { label: "Kedatangan", value: "Pintu dibuka tiga puluh menit sebelum masing-masing acara dimulai. Mohon hadir tepat waktu." },
    { label: "Anak-anak", value: "Kami sangat menyayangi putra-putri Bapak/Ibu, namun perayaan ini dikhususkan untuk tamu dewasa." },
    { label: "Area Parkir", value: "Tersedia area parkir gratis, serta layanan valet di pintu masuk utama." },
  ],
  venue: {
    name: "Graha Kencana Estate",
    address: "Jl. Kenanga Raya No. 18, Yogyakarta, Indonesia 55281",
    mapsUrl: "https://maps.google.com/?q=Graha+Kencana+Estate+Yogyakarta",
    note: "Tersedia area parkir. Pintu dibuka tiga puluh menit sebelum masing-masing acara.",
  },
  gift: {
    bankName: "Bank Central Asia (BCA)",
    accountNumber: "8801234567",
    accountHolder: "Clara Anindita",
    note: "Kehadiran Bapak/Ibu/Saudara/i adalah hadiah terindah bagi kami. Bagi yang ingin mengirimkan tanda kasih dari jauh, kami sertakan informasi berikut dengan penuh rasa syukur.",
  },
  music: {
    src: "https://ufyeavfzyymupaohdnxd.supabase.co/storage/v1/object/sign/Music/wedding.mp3?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZmM3ZGMzMy01MjUzLTQ2MjgtYTM3MS1jOTRjYzk0MGU3MmIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNdXNpYy93ZWRkaW5nLm1wMyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODcyMDM3ODcsImV4cCI6MTgxODczOTc4N30.6l_oTFCbTCmO7u35NSC_aU8DwJlSowQ3Of2PVdCL6ow",
    title: "Instrumental Pernikahan (placeholder)",
  },
  contact: {
    whatsapp: "+62 812 3456 7890",
    email: "hello@adrianandclara.id",
  },
};
