"use client";

import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";

interface Props {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
  category?: string;
  isCommunityEvent?: boolean;
}

const EventCard = ({
  title,
  image,
  slug,
  location,
  date,
  time,
  category,
  isCommunityEvent = false,
}: Props) => {
  return (
    <Link
      href={`/event/${slug}`}
      id="event-card"
      onClick={() => posthog.capture("event_selected", { event_slug: slug })}
    >
      <div className="poster-wrap">
        <Image
          src={image}
          alt={title}
          width={410}
          height={300}
          className="poster"
        />
        <span className="event-category">{category || "Developer event"}</span>
        {isCommunityEvent && <span className="community-badge">COMMUNITY</span>}
      </div>

      <div className="flex flex-row gap-2">
        <Image src="/icons/pin.svg" alt="location" width={14} height={14} />
        <p className="location">{location}</p>
      </div>

      <p className="title">{title}</p>

      <div className="datetime">
        <div>
          <Image
            src="/icons/calendar.svg"
            alt="calendar"
            width={14}
            height={14}
          />
          <p>{date}</p>
        </div>

        <div>
          <Image src="/icons/clock.svg" alt="clock" width={14} height={14} />
          <p>{time}</p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
