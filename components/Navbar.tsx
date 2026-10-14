"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header>
      <nav>
        <Link href="/" className="logo">
          <Image src="/icons/logo.png" alt="" width={28} height={28} />

          <p>DevEvent</p>
        </Link>

        <div
          id="primary-navigation"
          className={`nav-menu${isMenuOpen ? " is-open" : ""}`}
        >
          <ul className="nav-links">
            <li><Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
            <li><Link href="/#events" onClick={() => setIsMenuOpen(false)}>Explore events</Link></li>
            <li><Link href="/#about" onClick={() => setIsMenuOpen(false)}>About</Link></li>
          </ul>

          <Link
            className="nav-submit"
            href="/create-event"
            onClick={() => setIsMenuOpen(false)}
          >
            Submit an event <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <button
          className="nav-menu-toggle"
          type="button"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
