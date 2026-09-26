import "./globals.css";

export const metadata = {
  title: "HimKosh e-Challan — Academic Concept Redesign",
  description: "Human-centered redesign of an e-Challan public service for Himachal Pradesh.",
  openGraph: {
    title: "HimKosh e-Challan — Academic Concept Redesign",
    description: "Human-centered redesign of an e-Challan public service for Himachal Pradesh.",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0d3c2e" />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
