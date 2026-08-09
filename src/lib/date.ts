/** Formats a value into a relative "time ago" label in Indonesian, e.g. "2 jam lalu". */
export function formatRelativeTime(isoDate: string): string {
  const now = Date.now();
  const then = new Date(isoDate).getTime();
  const diffMs = Math.max(0, now - then);

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diffMs < minute) return "Baru saja";
  if (diffMs < hour) {
    const m = Math.floor(diffMs / minute);
    return `${m} menit lalu`;
  }
  if (diffMs < day) {
    const h = Math.floor(diffMs / hour);
    return `${h} jam lalu`;
  }
  if (diffMs < 2 * day) return "Kemarin";

  const d = Math.floor(diffMs / day);
  if (d < 30) return `${d} hari lalu`;

  return new Date(isoDate).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Formats an ISO date into a long Indonesian date label, e.g. "Minggu, 02 Agustus 2026". */
export function formatLongDateID(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Makassar",
  });
}
