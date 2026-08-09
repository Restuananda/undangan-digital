import { Calendar, Clock, MapPin } from "lucide-react";
import type { WeddingEvent } from "../../types/wedding";
import { Section } from "../layout/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { Divider } from "../ui/Divider";
import { weddingData } from "../../data/wedding";

function EventCard({ event }: { event: WeddingEvent }) {
  return (
    <div className="flex flex-col items-center gap-5 border border-beige-dark/50 bg-ivory/60 px-8 py-10 text-center">
      <span className="font-accent italic text-lg text-gold">{event.title}</span>
      <Divider withMark={false} className="max-w-[80px]" />

      <div className="flex flex-col items-center gap-3 font-body text-[13px] text-charcoal-soft">
        <span className="flex items-center gap-2">
          <Calendar size={15} strokeWidth={1.5} className="text-gold" />
          {event.dateLabel}
        </span>
        <span className="flex items-center gap-2">
          <Clock size={15} strokeWidth={1.5} className="text-gold" />
          {event.timeLabel}
        </span>
        <span className="flex items-start gap-2 text-left max-w-[220px]">
          <MapPin size={15} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold" />
          <span>
            {event.venue}
            <br />
            {event.address}
          </span>
        </span>
      </div>

      <Button
        variant="ghost"
        className="mt-2"
        onClick={() => window.open(event.mapsUrl, "_blank", "noopener,noreferrer")}
      >
        Lihat Lokasi
      </Button>
    </div>
  );
}

export function EventSection() {
  return (
    <Section tone="cream">
      <SectionHeading eyebrow="Save The Date" title="Rangkaian Acara" />

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {weddingData.events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </Section>
  );
}
