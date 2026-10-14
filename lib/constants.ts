export type EventItem = {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
  category?: string;
  description?: string;
  website?: string;
};

export const events: EventItem[] = [
  {
    title: "JSNation Live 2026",
    image: "/images/event1.png",
    slug: "jsnation-live-2026",
    location: "Amsterdam, Netherlands",
    date: "September 10, 2026",
    time: "9:00 AM - 6:00 PM CEST",
  },
  {
    title: "Vercel Ship 2026",
    image: "/images/event2.png",
    slug: "vercel-ship-2026",
    location: "San Francisco, California",
    date: "October 7, 2026",
    time: "10:00 AM - 5:00 PM PDT",
  },
  {
    title: "React Advanced London 2026",
    image: "/images/event3.png",
    slug: "react-advanced-london-2026",
    location: "London, United Kingdom",
    date: "October 12-13, 2026",
    time: "9:30 AM - 5:00 PM BST",
  },
  {
    title: "HackMIT 2026",
    image: "/images/event4.png",
    slug: "hackmit-2026",
    location: "Cambridge, Massachusetts",
    date: "October 23-25, 2026",
    time: "Friday 6:00 PM - Sunday 4:00 PM EDT",
  },
  {
    title: "GitHub Universe 2026",
    image: "/images/event5.png",
    slug: "github-universe-2026",
    location: "San Francisco, California",
    date: "November 10-12, 2026",
    time: "9:00 AM - 6:00 PM PST",
  },
  {
    title: "AWS re:Invent 2026",
    image: "/images/event6.png",
    slug: "aws-reinvent-2026",
    location: "Las Vegas, Nevada",
    date: "December 1-4, 2026",
    time: "8:00 AM - 7:00 PM PST",
  },
];
