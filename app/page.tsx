import ExploreBtn from "@/components/ExploreBtn";
import EventGrid from "@/components/EventGrid";
import { events } from "@/lib/constants";
import Link from "next/link";

const Page = () => {
  return (
    <section id="home">
      <div className="hero">
        <p className="hero-kicker"><span /> YOUR NEXT BIG IDEA STARTS HERE</p>
        <h1>
          Find your people.
          <br />
          <span>Find your next event.</span>
        </h1>
        <p className="subheading">
          The best hackathons, conferences, and meetups for people who love to
          build. All in one place.
        </p>
        <ExploreBtn />
        <div className="hero-note">
          <span aria-hidden="true">✳</span> Good people. Big ideas. No endless
          searching.
        </div>
      </div>

      <section id="events" className="featured-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">MAKE SOMETHING HAPPEN</p>
            <h2>Worth showing up for.</h2>
            <p>Hand-picked events for curious minds and ambitious builders.</p>
          </div>
          <Link href="/create-event" className="text-link">
            Hosting something? <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <EventGrid events={events} />
      </section>

      <section id="about" className="about-section">
        <div className="about-mark" aria-hidden="true">D.</div>
        <div>
          <p className="eyebrow">BUILT FOR THE BUILDERS</p>
          <h2>Good things happen<br />when we show up.</h2>
          <p>
            DevEvent makes it easier to find the rooms where ideas grow:
            developer conferences, community meetups, and hackathons worth
            putting on your calendar.
          </p>
        </div>
        <Link href="/create-event" className="about-link">
          Bring your event to the community <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </section>
  );
};

export default Page;
