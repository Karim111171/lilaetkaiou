import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} Lila & Kaiou. All rights reserved.
      </p>
      <p>
        <Link href="/Legal">Mentions légales & CGV</Link>
      </p>
    </footer>
  );
}