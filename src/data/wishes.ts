import type { WishEntry } from "../types/wedding";

/**
 * Seed data shown before any guest submits their own wish.
 * Real submissions are merged in from localStorage at runtime
 * (see hooks/useWishes.ts equivalent logic inside Wishes.tsx).
 */
export const seedWishes: WishEntry[] = [
  {
    id: "seed-1",
    name: "Aisyah Rahma",
    attendance: "hadir",
    message:
      "Selamat menempuh hidup baru. Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "seed-2",
    name: "Fajar Pratama",
    attendance: "hadir",
    message: "Barakallahu lakuma. Semoga selalu diberikan kebahagiaan.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
  },
  {
    id: "seed-3",
    name: "Nadia",
    attendance: "tidak-hadir",
    message: "Mohon maaf belum bisa hadir. Semoga acara berjalan lancar.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
  },
  {
    id: "seed-4",
    name: "Rizky Ananda",
    attendance: "hadir",
    message: "Selamat berbahagia untuk Olif & Usman! Semoga rumah tangganya penuh berkah.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
  {
    id: "seed-5",
    name: "Dewi Lestari",
    attendance: "hadir",
    message: "Bahagia sekali mendengar kabar ini. Sehat selalu dan langgeng ya kalian berdua.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
  },
  {
    id: "seed-6",
    name: "PW IPPNU SULTRA",
    attendance: "hadir",
    message: "Turut berbahagia atas pernikahan Kolifatun & Usman. Barakallahu fii kum.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
  },
];
