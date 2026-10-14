import type { EventItem } from "@/lib/constants";

export const COMMUNITY_EVENTS_KEY = "devevent-community-events";
export const SERVER_EVENT_SNAPSHOT = "__server-event-snapshot__";

const isEventItem = (value: unknown): value is EventItem => {
  if (!value || typeof value !== "object") return false;

  const event = value as Record<string, unknown>;
  return (
    typeof event.title === "string" &&
    typeof event.image === "string" &&
    typeof event.slug === "string" &&
    typeof event.location === "string" &&
    typeof event.date === "string" &&
    typeof event.time === "string"
  );
};

export const getCommunityEventsSnapshot = (): string | null => {
  try {
    return window.localStorage.getItem(COMMUNITY_EVENTS_KEY);
  } catch (error) {
    console.error("Could not access browser storage for community events.", error);
    return "__storage-unavailable__";
  }
};

export const subscribeToCommunityEvents = (callback: () => void) => {
  window.addEventListener("storage", callback);
  window.addEventListener("devevent:community-events", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("devevent:community-events", callback);
  };
};

export const parseCommunityEvents = (
  snapshot: string | null,
): { events: EventItem[]; hasError: boolean } => {
  if (!snapshot || snapshot === SERVER_EVENT_SNAPSHOT) {
    return { events: [], hasError: false };
  }

  try {
    const parsed: unknown = JSON.parse(snapshot);
    if (!Array.isArray(parsed) || !parsed.every(isEventItem)) {
      throw new Error("Saved community events are not in a readable format.");
    }
    return { events: parsed, hasError: false };
  } catch (error) {
    console.error("Could not read saved community events.", error);
    return { events: [], hasError: true };
  }
};

export const saveCommunityEvent = (event: EventItem): void => {
  const { events: existingEvents, hasError } = parseCommunityEvents(
    getCommunityEventsSnapshot(),
  );
  if (hasError) {
    throw new Error("Saved community events could not be read.");
  }
  window.localStorage.setItem(
    COMMUNITY_EVENTS_KEY,
    JSON.stringify([event, ...existingEvents]),
  );
  window.dispatchEvent(new Event("devevent:community-events"));
};
