import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { ScreenId } from './types/wedding';
import { DEFAULT_GUEST_LABEL, getSlugFromPath, resolveGuest } from './lib/guests';
import InvitationCover from './components/InvitationCover';
import BottomNavigation from './components/BottomNavigation';
import ScreenTransition from './components/ScreenTransition';
import MusicControl from './components/MusicControl';
import HomeScreen from './screens/HomeScreen';
import StoryScreen from './screens/StoryScreen';
import EventScreen from './screens/EventScreen';
import GalleryScreen from './screens/GalleryScreen';
import DetailsScreen from './screens/DetailsScreen';

export default function App() {
  const [guestLabel, setGuestLabel] = useState(DEFAULT_GUEST_LABEL);
  const [hasOpened, setHasOpened] = useState(false);
  const [activeScreen, setActiveScreen] = useState<ScreenId>('home');

  useEffect(() => {
    let cancelled = false;
    const slug = getSlugFromPath();
    resolveGuest(slug).then((guest) => {
      if (!cancelled) setGuestLabel(guest?.name ?? DEFAULT_GUEST_LABEL);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const renderScreen = () => {
    switch (activeScreen) {
      case 'home':
        return <HomeScreen guestLabel={guestLabel} />;
      case 'story':
        return <StoryScreen />;
      case 'event':
        return <EventScreen />;
      case 'gallery':
        return <GalleryScreen />;
      case 'details':
        return <DetailsScreen />;
      default:
        return null;
    }
  };

  return (
    <div className="app-shell">
      <AnimatePresence mode="wait">
        {!hasOpened ? (
          <InvitationCover key="cover" guestLabel={guestLabel} onOpen={() => setHasOpened(true)} />
        ) : (
          <div key="app" className="relative">
            <main aria-live="polite">
              <AnimatePresence mode="wait">
                <ScreenTransition key={activeScreen}>{renderScreen()}</ScreenTransition>
              </AnimatePresence>
            </main>
            <MusicControl autoStart={hasOpened} />
            <BottomNavigation active={activeScreen} onChange={setActiveScreen} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
