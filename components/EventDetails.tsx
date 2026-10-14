"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useSyncExternalStore } from "react";
import type { EventItem } from "@/lib/constants";
import {
  getCommunityEventsSnapshot,
  parseCommunityEvents,
  SERVER_EVENT_SNAPSHOT,
  subscribeToCommunityEvents,
} from "@/lib/community-events";

const EventDetails = ({
  slug,
  initialEvent,
}: {
  slug: string;
  initialEvent: EventItem | null;
}) => {
  const snapshot = useSyncExternalStore(
    subscribeToCommunityEvents,
    getCommunityEventsSnapshot,
    () => SERVER_EVENT_SNAPSHOT,
  );
  const { events: communityEvents, hasError: storageError } = useMemo(
    () => parseCommunityEvents(snapshot),
    [snapshot],
  );
  const event =
    initialEvent ??
    communityEvents.find((savedEvent) => savedEvent.slug === slug) ??
    null;

  if (!event && snapshot === SERVER_EVENT_SNAPSHOT) {
    return <div className="event-loading" aria-label="Loading event" />;
  }

  if (!event) {
    return (
      <section className="event-not-found">
        <p className="eyebrow">LOOKS LIKE THIS ONE GOT AWAY</p>
        <h1>Event not found.</h1>
        <p>
          {storageError
            ? "We couldn't read the events saved in this browser."
            : "This event may have been created in a different browser."}
        </p>
        <Link href="/#events" className="submit-event-button">
          Find another event <span aria-hidden="true">↗</span>
        </Link>
      </section>
    );
  }

  return (
    <article className="event-detail-page">
      <Link href="/#events" className="back-link">← All events</Link>
      <div className="event-detail-layout">
        <div className="event-detail-content">
          <div className="event-detail-image">
            <Image
              src={event.image}
              alt={event.title}
              width={1200}
              height={720}
              priority
            />
            <span className="event-category">
              {event.category || "Developer event"}
            </span>
          </div>
          <p className="eyebrow event-detail-eyebrow">A DEV EVENT WORTH YOUR TIME</p>
          <h1>{event.title}</h1>
          <p className="event-detail-description">
            {event.description ||
              "A chance to learn something new, meet fellow developers, and leave with ideas worth building."}
          </p>
          <div className="event-detail-community">
            <span aria-hidden="true">✳</span>
            Made for curious minds and ambitious builders.
          </div>
        </div>

        <aside className="event-info-card">
          <p className="eyebrow">SAVE THE DETAILS</p>
          <h2>Your next plan.</h2>
          <dl>
            <div>
              <dt>Date</dt>
              <dd>{event.date}</dd>
            </div>
            <div>
              <dt>Time</dt>
              <dd>{event.time}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{event.location}</dd>
            </div>
          </dl>
          {event.website ? (
            <a
              className="submit-event-button"
              href={event.website}
              target="_blank"
              rel="noreferrer"
            >
              Visit event website <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <Link href="/#events" className="submit-event-button">
              Discover more events <span aria-hidden="true">↗</span>
            </Link>
          )}
          <p className="event-info-note">
            Details are shared by the event organizer. Check their website for
            the latest updates.
          </p>
        </aside>
      </div>
    </article>
  );
};

export default EventDetails;
