import Contact from "./section/Contact";
import FooterBottom from "./section/FooterBottom";
import Platform from "./section/Platform";

export default function Footer() {
  return (
    <div>
      {/* ===== Platform Block ===== */}
      <Platform />

      {/* ===== Contact Block ===== */}
      <Contact />

      {/* ===== Footer Block ===== */}
      <FooterBottom />
    </div>
  );
}
