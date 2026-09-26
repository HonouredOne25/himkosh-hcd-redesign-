import "./globals.css";

export const metadata = {
  title: "HimKosh e-Challan — Concept Redesign",
  description: "Human-centered redesign of an e-Challan service for Himachal Pradesh.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
