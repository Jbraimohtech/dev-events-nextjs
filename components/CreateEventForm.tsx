"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { EventItem } from "@/lib/constants";
import { saveCommunityEvent } from "@/lib/community-events";

const categoryImages: Record<string, string> = {
  Conference: "/images/event1.png",
  Meetup: "/images/event2.png",
  Hackathon: "/images/event4.png",
  Workshop: "/images/event3.png",
};

const CreateEventForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (formEvent: FormEvent<HTMLFormElement>) => {
    formEvent.preventDefault();
    setError("");
    setIsSaving(true);

    const formData = new FormData(formEvent.currentTarget);
    const title = String(formData.get("title") ?? "").trim();
    const category = String(formData.get("category") ?? "Conference");
    const location = String(formData.get("location") ?? "").trim();
    const dateValue = String(formData.get("date") ?? "");
    const timeValue = String(formData.get("time") ?? "");
    const description = String(formData.get("description") ?? "").trim();
    const website = String(formData.get("website") ?? "").trim();

    const date = new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
      timeZone: "UTC",
    }).format(new Date(`${dateValue}T12:00:00Z`));
    const time = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "UTC",
    }).format(new Date(`1970-01-01T${timeValue}:00Z`));
    const slug = `${title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")}-${crypto.randomUUID().slice(0, 8)}`;

    const event: EventItem = {
      title,
      image: categoryImages[category] ?? categoryImages.Conference,
      slug,
      location,
      date,
      time: `${time} UTC`,
      category,
      description,
      ...(website ? { website } : {}),
    };

    try {
      saveCommunityEvent(event);
      router.push(`/event/${slug}`);
    } catch (saveError) {
      console.error("Could not save the submitted event.", saveError);
      setError(
        "We couldn't save this event in your browser. Check your browser storage settings and try again.",
      );
      setIsSaving(false);
    }
  };

  return (
    <section className="create-event-shell">
      <div className="create-event-intro">
        <Link href="/" className="back-link">← Back to DevEvent</Link>
        <p className="eyebrow">FOR THE PEOPLE BRINGING US TOGETHER</p>
        <h1>Make room<br />for <span>good things.</span></h1>
        <p className="create-event-lede">
          Tell the community what you&apos;re building. Your event page will be
          ready to share in just a minute.
        </p>
        <div className="privacy-note">
          <span aria-hidden="true">✳</span>
          This demo saves submitted events in this browser only.
        </div>
      </div>

      <form className="create-event-form" onSubmit={handleSubmit}>
        <div className="form-heading">
          <div>
            <p className="eyebrow">THE GOOD STUFF</p>
            <h2>Event details</h2>
          </div>
          <span className="required-note">* Required</span>
        </div>

        <label className="form-field">
          Event name <span>*</span>
          <input
            autoComplete="off"
            maxLength={90}
            name="title"
            placeholder="e.g. The Build Club: Summer Hack Night"
            required
          />
        </label>

        <div className="form-row">
          <label className="form-field">
            What kind of event? <span>*</span>
            <select name="category" defaultValue="Conference">
              {Object.keys(categoryImages).map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </label>
          <label className="form-field">
            Where is it? <span>*</span>
            <input
              autoComplete="address-level2"
              maxLength={100}
              name="location"
              placeholder="City, country or online"
              required
            />
          </label>
        </div>

        <div className="form-row">
          <label className="form-field">
            Date <span>*</span>
            <input name="date" type="date" required />
          </label>
          <label className="form-field">
            Start time (UTC) <span>*</span>
            <input name="time" type="time" required />
          </label>
        </div>

        <label className="form-field">
          A little about it <span>*</span>
          <textarea
            maxLength={700}
            minLength={20}
            name="description"
            placeholder="What will people learn, make, or take away?"
            required
            rows={4}
          />
          <span className="field-hint">At least 20 characters, up to 700.</span>
        </label>

        <label className="form-field">
          Event website <span className="optional-label">OPTIONAL</span>
          <input
            name="website"
            placeholder="https://your-event.com"
            type="url"
          />
        </label>

        {error && <p className="form-error" role="alert">{error}</p>}

        <button className="submit-event-button" disabled={isSaving} type="submit">
          {isSaving ? "Saving your event..." : "Create your event page"}
          {!isSaving && <span aria-hidden="true">↗</span>}
        </button>
        <p className="form-footnote">
          By submitting, you confirm this event is open to the developer
          community.
        </p>
      </form>
    </section>
  );
};

export default CreateEventForm;
