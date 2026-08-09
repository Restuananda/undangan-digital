import { Navigation } from "lucide-react";
import { Section } from "../layout/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { weddingData } from "../../data/wedding";

export function LocationSection() {
  const { location } = weddingData;

  return (
    <Section tone="ivory">
      <SectionHeading eyebrow="Lokasi Acara" title="Menuju Lokasi" description={location.address} />

      <div className="mt-10 overflow-hidden border border-beige-dark/50">
        {location.mapsEmbedUrl ? (
          <iframe
            title="Lokasi acara pernikahan"
            src={location.mapsEmbedUrl}
            loading="lazy"
            className="h-56 w-full grayscale-[35%] sm:h-72"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <div className="flex h-56 w-full items-center justify-center bg-cream text-charcoal-soft sm:h-72">
            Peta tidak tersedia
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <Button
          icon={<Navigation size={15} strokeWidth={1.5} />}
          onClick={() => window.open(location.mapsUrl, "_blank", "noopener,noreferrer")}
        >
          Buka Google Maps
        </Button>
      </div>
    </Section>
  );
}
