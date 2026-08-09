import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import type { AttendanceStatus, WishEntry } from "../../types/wedding";
import { Button } from "../ui/Button";
import { useGuestName } from "../../hooks/useGuestName";
import { cn, generateId } from "../../lib/utils";

interface RSVPFormProps {
  onSubmit: (entry: WishEntry) => void;
}

interface FormErrors {
  name?: string;
  attendance?: string;
  message?: string;
}

export function RSVPForm({ onSubmit }: RSVPFormProps) {
  const guestName = useGuestName();
  const [name, setName] = useState(guestName === "Nama Tamu" ? "" : guestName);
  const [attendance, setAttendance] = useState<AttendanceStatus | null>(null);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [justSubmitted, setJustSubmitted] = useState(false);

  function validate(): boolean {
    const nextErrors: FormErrors = {};
    if (name.trim().length < 2) {
      nextErrors.name = "Nama minimal 2 karakter.";
    }
    if (!attendance) {
      nextErrors.attendance = "Silakan konfirmasi kehadiran.";
    }
    if (message.trim().length === 0) {
      nextErrors.message = "Ucapan tidak boleh kosong.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate() || !attendance) return;

    const entry: WishEntry = {
      id: generateId("wish"),
      name: name.trim(),
      attendance,
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    onSubmit(entry);
    setMessage("");
    setJustSubmitted(true);
    window.setTimeout(() => setJustSubmitted(false), 2500);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5 text-left">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="rsvp-name" className="font-body text-[11px] uppercase tracking-widest text-charcoal-soft">
          Nama
        </label>
        <input
          id="rsvp-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama Anda"
          className="border-b border-beige-dark bg-transparent py-2 font-body text-[15px] text-charcoal outline-none placeholder:text-charcoal-soft/50 focus:border-gold"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "rsvp-name-error" : undefined}
        />
        {errors.name && (
          <span id="rsvp-name-error" className="font-body text-xs text-red-700">
            {errors.name}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <span className="font-body text-[11px] uppercase tracking-widest text-charcoal-soft">
          Konfirmasi Kehadiran
        </span>
        <div className="flex gap-3" role="radiogroup" aria-label="Konfirmasi kehadiran">
          {(
            [
              { value: "hadir", label: "Hadir" },
              { value: "tidak-hadir", label: "Tidak Hadir" },
            ] as const
          ).map((option) => (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={attendance === option.value}
              onClick={() => setAttendance(option.value)}
              className={cn(
                "flex-1 border px-4 py-2.5 font-body text-[13px] tracking-wide transition-colors cursor-pointer",
                attendance === option.value
                  ? "border-gold bg-gold text-ivory"
                  : "border-beige-dark text-charcoal-soft hover:border-gold hover:text-gold"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
        {errors.attendance && (
          <span className="font-body text-xs text-red-700">{errors.attendance}</span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="rsvp-message" className="font-body text-[11px] uppercase tracking-widest text-charcoal-soft">
          Ucapan / Doa
        </label>
        <textarea
          id="rsvp-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tuliskan ucapan dan doa terbaik Anda..."
          rows={3}
          className="resize-none border border-beige-dark bg-transparent px-3 py-2.5 font-body text-[15px] text-charcoal outline-none placeholder:text-charcoal-soft/50 focus:border-gold"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "rsvp-message-error" : undefined}
        />
        {errors.message && (
          <span id="rsvp-message-error" className="font-body text-xs text-red-700">
            {errors.message}
          </span>
        )}
      </div>

      <Button type="submit" icon={<Send size={14} strokeWidth={1.5} />} className="self-center mt-2">
        Kirim Ucapan
      </Button>

      {justSubmitted && (
        <p className="text-center font-accent italic text-sm text-moss" role="status">
          Terima kasih atas ucapan dan doanya.
        </p>
      )}
    </form>
  );
}
