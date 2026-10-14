import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <header>
      <nav>
        <Link href="/" className="logo">
          <Image src="/icons/logo.png" alt="" width={28} height={28} />

          <p>DevEvent</p>
        </Link>

        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/#events">Explore events</Link></li>
          <li><Link href="/#about">About</Link></li>
        </ul>

        <Link className="nav-submit" href="/create-event">
          Submit an event <span aria-hidden="true">↗</span>
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
