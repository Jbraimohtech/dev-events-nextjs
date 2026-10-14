"use client";

import { useMemo, useSyncExternalStore } from "react";
import type { EventItem } from "@/lib/constants";
import {
  getCommunityEventsSnapshot,
  parseCommunityEvents,
  SERVER_EVENT_SNAPSHOT,
  subscribeToCommunityEvents,
} from "@/lib/community-events";
import EventCard from "@/components/EventCard";

const EventGrid = ({ events }: { events: EventItem[] }) => {
  const snapshot = useSyncExternalStore(
    subscribeToCommunityEvents,
    getCommunityEventsSnapshot,
    () => SERVER_EVENT_SNAPSHOT,
  );
  const { events: communityEvents, hasError: loadError } = useMemo(
    () => parseCommunityEvents(snapshot),
    [snapshot],
  );

  return (
    <>
      {loadError && (
        <p className="storage-notice" role="status">
          Community-submitted events could not be loaded in this browser.
        </p>
      )}
      <ul className="events list-none">
        {communityEvents.map((event) => (
          <li key={event.slug}>
            <EventCard {...event} isCommunityEvent />
          </li>
        ))}
        {events.map((event) => (
          <li key={event.slug}>
            <EventCard {...event} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default EventGrid;
