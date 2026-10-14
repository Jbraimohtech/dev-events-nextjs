"use client";

import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";

const ExploreBtn = () => {
  return (
    <Link
      href="#events"
      id="explore-btn"
      className="mt-7 mx-auto"
      onClick={() => {
        posthog.capture("event_exploration_started");
      }}
    >
      Explore events
      <Image
        src="/icons/arrow-down.svg"
        alt=""
        width={20}
        height={20}
      />
    </Link>
  );
};

export default ExploreBtn;
