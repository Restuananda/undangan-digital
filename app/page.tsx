import AccessGate from "@/app/components/AccessGate";
import Wishes from "@/app/components/Wishes";

// The root URL is the one link meant to be shared broadly. It never shows
// invitation content directly — guests must type their name, checked
// server-side against the guest list, before anything is revealed.
export default function Home() {
  return <AccessGate wishesSection={<Wishes />} />;
}
