import { Radio } from "lucide-react";
import { Section } from "../layout/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { weddingData } from "../../data/wedding";

export function LiveStreaming() {
  const { livestream } = weddingData;
  const hasUrl = Boolean(livestream.url);

  return (
    <Section tone="charcoal">
      <SectionHeading
        eyebrow="Tidak Bisa Hadir?"
        title="Live Streaming"
        description="Kami mengundang Bapak/Ibu/Saudara/i untuk menyaksikan pernikahan kami secara virtual, yang disiarkan langsung melalui media sosial."
        invert
      />

      <div className="mt-10 flex justify-center">
        <Button
          variant="outline"
          icon={<Radio size={15} strokeWidth={1.5} />}
          disabled={!hasUrl}
          onClick={() => hasUrl && window.open(livestream.url, "_blank", "noopener,noreferrer")}
          className="border-gold-light text-ivory hover:bg-gold-light hover:text-charcoal"
        >
          {hasUrl ? `Klik Disini · ${livestream.platformLabel}` : "Segera Hadir"}
        </Button>
      </div>
    </Section>
  );
}
