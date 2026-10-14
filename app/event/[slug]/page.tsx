import EventDetails from "@/components/EventDetails";
import { events } from "@/lib/constants";

const EventPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const event = events.find((item) => item.slug === slug) ?? null;

  return <EventDetails slug={slug} initialEvent={event} />;
};

export default EventPage;
