import { getGuestBySlug } from "@/lib/guests";
import { rsvpRepository } from "@/lib/rsvp-repository";
import InvitationExperience from "@/app/components/InvitationExperience";
import GuestNotFound from "@/app/components/GuestNotFound";
import Wishes from "@/app/components/Wishes";

// Always render fresh per request — this page depends on live RSVP status,
// so it must never be served from a stale cache.
export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ guest: string }>;
}

export default async function GuestInvitationPage({ params }: PageProps) {
  const { guest: slug } = await params;
  const guest = await getGuestBySlug(slug);

  // Unrecognized slugs get nothing but the denial screen — no generic
  // "Dear Guest" fallback, no RSVP form, no content underneath it.
  if (!guest) {
    return <GuestNotFound />;
  }

  const initialRecord = await rsvpRepository.findByGuestId(guest.id);

  return (
    <InvitationExperience
      guestId={guest.id}
      guestName={guest.name}
      initialRecord={initialRecord}
      wishesSection={<Wishes />}
    />
  );
}
