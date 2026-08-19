"use client";

import { useEffect, useState } from "react";
import { RSVPRecord } from "@/types/wedding";
import InvitationCover from "./InvitationCover";
import GuestGreeting from "./GuestGreeting";
import CoupleIntroduction from "./CoupleIntroduction";
import CoupleStory from "./CoupleStory";
import WeddingEvent from "./WeddingEvent";
import Countdown from "./Countdown";
import Details from "./Details";
import Venue from "./Venue";
import RSVP from "./RSVP";
import WeddingGift from "./WeddingGift";
// Note: `Wishes` is a server component (reads rsvp.json), so it's passed in
// as `wishesSection` from the page rather than imported directly here.
import MusicControl from "./MusicControl";
import ClosingSection from "./ClosingSection";

interface InvitationExperienceProps {
  guestId: string | null;
  guestName: string;
  initialRecord: RSVPRecord | null;
  wishesSection: React.ReactNode;
}

export default function InvitationExperience({
  guestId,
  guestName,
  initialRecord,
  wishesSection,
}: InvitationExperienceProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "auto" : "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div id="top">
      <InvitationCover guestName={guestName} isOpen={isOpen} onOpen={() => setIsOpen(true)} />

      <main className={isOpen ? "" : "select-none"}>
        <GuestGreeting guestName={guestName} />
        <CoupleIntroduction />
        <div id="story">
          <CoupleStory />
        </div>
        <WeddingEvent />
        <Countdown />
        <Details />
        <Venue />
        <RSVP guestId={guestId} guestName={guestName} initialRecord={initialRecord} />
        {wishesSection}
        <WeddingGift />
        <ClosingSection />
      </main>

      <MusicControl enabled={isOpen} />
    </div>
  );
}
