import { useState } from "react";
import { WeddingLayout } from "../components/layout/WeddingLayout";
import { InvitationCover } from "../components/wedding/InvitationCover";
import { HeroSection } from "../components/wedding/HeroSection";
import { QuranVerse } from "../components/wedding/QuranVerse";
import { CoupleSection } from "../components/wedding/CoupleSection";
import { CountdownTimer } from "../components/wedding/CountdownTimer";
import { EventSection } from "../components/wedding/EventSection";
import { LocationSection } from "../components/wedding/LocationSection";
import { LoveStory } from "../components/wedding/LoveStory";
import { Gallery } from "../components/wedding/Gallery";
import { LiveStreaming } from "../components/wedding/LiveStreaming";
import { WeddingGift } from "../components/wedding/WeddingGift";
import { Wishes } from "../components/wedding/Wishes";
import { ClosingSection } from "../components/wedding/ClosingSection";
import { MusicPlayer } from "../components/wedding/MusicPlayer";

function App() {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <WeddingLayout>
      {/* Opening cover — slides away once the guest opens the invitation */}
      <div
        className={`fixed inset-0 z-50 transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpened ? "-translate-y-full pointer-events-none" : "translate-y-0"
        }`}
        aria-hidden={isOpened}
      >
        <InvitationCover onOpen={() => setIsOpened(true)} />
      </div>

      <main>
        <HeroSection />
        <QuranVerse />
        <CoupleSection />
        <CountdownTimer />
        <EventSection />
        <LocationSection />
        <LoveStory />
        <Gallery />
        <LiveStreaming />
        <WeddingGift />
        <Wishes />
        <ClosingSection />
      </main>

      <MusicPlayer shouldStart={isOpened} />
    </WeddingLayout>
  );
}

export default App;
