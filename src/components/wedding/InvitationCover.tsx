import { Mail } from "lucide-react";
import { ArchOrnament } from "../ui/Ornament";
import { Button } from "../ui/Button";
import { Divider } from "../ui/Divider";
import { weddingData } from "../../data/wedding";
import { useGuestName } from "../../hooks/useGuestName";

interface InvitationCoverProps {
  onOpen: () => void;
}

export function InvitationCover({ onOpen }: InvitationCoverProps) {
  const guestName = useGuestName();
  const { bride, groom } = weddingData.couple;

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-ivory px-6 py-10 text-center">
      {/* ambient texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--color-charcoal) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
        aria-hidden="true"
      />

      <ArchOrnament className="pointer-events-none absolute left-1/2 top-6 h-[85%] w-auto -translate-x-1/2 opacity-70" />

      <div className="relative z-10 flex flex-col items-center pt-10 animate-fade-in">
        <span className="font-accent italic text-base tracking-[0.15em] text-gold">
          The Wedding Of
        </span>
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-6 animate-fade-up">
        <h1 className="font-display text-5xl leading-[1.05] text-charcoal">
          {bride.shortName}
        </h1>
        <span className="font-accent italic text-2xl text-gold">&amp;</span>
        <h1 className="font-display text-5xl leading-[1.05] text-charcoal">
          {groom.shortName}
        </h1>

        <Divider className="mt-4 max-w-[220px]" />

        <div className="font-body text-[13px] tracking-[0.35em] text-charcoal-soft">
          02 &nbsp;·&nbsp; 08 &nbsp;·&nbsp; 2026
        </div>
      </div>

      <div className="relative z-10 flex w-full max-w-xs flex-col items-center gap-5 pb-4 animate-fade-up [animation-delay:200ms]">
        <div className="flex flex-col items-center gap-1.5">
          <span className="font-body text-[11px] uppercase tracking-[0.28em] text-charcoal-soft">
            Kepada Yth. Bapak/Ibu/Saudara/i
          </span>
          <span className="font-display text-xl text-charcoal text-balance">
            {guestName}
          </span>
        </div>

        <Button onClick={onOpen} icon={<Mail size={15} strokeWidth={1.5} />}>
          Buka Undangan
        </Button>
      </div>
    </div>
  );
}
