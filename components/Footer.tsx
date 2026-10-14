import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-cta">
          <div className="footer-cta-copy">
            <p className="eyebrow">YOUR NEXT CHAPTER IS OUT THERE</p>
            <h2>Don&apos;t just scroll.<br />Show up.</h2>
            <p>
              Find your next room full of brilliant people — or bring them
              together yourself.
            </p>
          </div>
          <Link href="/create-event" className="footer-cta-button">
            Put your event on the map <span aria-hidden="true">↗</span>
          </Link>
          <span className="footer-orbit footer-orbit-one" aria-hidden="true" />
          <span className="footer-orbit footer-orbit-two" aria-hidden="true" />
        </div>

        <div className="footer-main">
          <div className="footer-brand">
            <Link href="/" className="footer-logo">
              <Image src="/icons/logo.png" alt="" width={30} height={30} />
              <span>DevEvent</span>
            </Link>
            <p>
              A little less searching.<br />A lot more building together.
            </p>
          </div>

          <div className="footer-column">
            <h3>Discover</h3>
            <Link href="/#events">Browse events</Link>
            <Link href="/#about">About DevEvent</Link>
            <Link href="/create-event">Submit an event</Link>
          </div>

          <div className="footer-column">
            <h3>Say hello</h3>
            <a
              href="https://github.com/Jbraimohtech/dev-events-nextjs/issues/new"
              target="_blank"
              rel="noreferrer"
            >
              Send feedback <span aria-hidden="true">↗</span>
            </a>
            <a
              href="https://github.com/Jbraimohtech/dev-events-nextjs"
              target="_blank"
              rel="noreferrer"
            >
              GitHub <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} DevEvent. Made for the makers.</span>
          <a href="#home">Back to top <span aria-hidden="true">↑</span></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
