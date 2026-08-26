/* Coastal Modernist shell: every route is framed as a field-guide chapter with a persistent route rail and a quiet, high-contrast header. */
import { useEffect, useState, type PropsWithChildren } from "react";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { IMG, navItems } from "@/data/siteData";

export default function SiteShell({ children }: PropsWithChildren) {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 32);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location]);

  return (
    <div className="page-noise">
      <header className={`site-header ${scrolled || location !== "/" ? "scrolled" : ""}`}>
        <div className="header-inner">
          <Link href="/" className="brand-link" aria-label="Kudla Coastal Almanac home">
            <img src={IMG.mark} className="brand-mark" alt="Kudla route pin" />
            <span className="brand-lockup"><strong>Kudla</strong><small>Coastal almanac</small></span>
          </Link>
          <nav className={`header-nav ${menuOpen ? "open" : ""}`} aria-label="Primary navigation">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} aria-current={location === item.href ? "page" : undefined}>
                {item.label}
              </Link>
            ))}
            <Link href="/plan-your-visit" aria-current={location === "/plan-your-visit" ? "page" : undefined}>Plan a visit <ArrowUpRight size={12} /></Link>
          </nav>
          <button className="mobile-menu-button" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      <main className="page-main">{children}</main>

      <footer className="footer">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <img src={IMG.mark} className="brand-mark" alt="" />
              <span className="brand-lockup"><strong>Kudla</strong><small>Coastal almanac</small></span>
            </div>
            <p>A considered guide to Mangaluru for travelers who want the coast beyond the obvious — with room for weather, appetite, and a good detour.</p>
          </div>
          <div>
            <h3>Explore</h3>
            <div className="footer-links">
              <Link href="/places">Places to visit</Link>
              <Link href="/beaches">Beaches &amp; backwaters</Link>
              <Link href="/culture">Culture &amp; heritage</Link>
              <Link href="/experiences">Things to do</Link>
            </div>
          </div>
          <div>
            <h3>Plan</h3>
            <div className="footer-links">
              <Link href="/food">Food &amp; drink</Link>
              <Link href="/itineraries">Itineraries</Link>
              <Link href="/travel-guide">Travel guide</Link>
              <Link href="/plan-your-visit">Build your route</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom"><span>Made for slow arrivals</span><span>© 2026 Kudla Field Guide</span></div>
      </footer>
    </div>
  );
}
