import "@/assets/styles/globals.css";

/**
 * * add elements between <head></head>
 * * These elements can be overwritten in individual pages
 */
export const metadata = {
  title: "PropertyPulse | Find The Perfect-Rental",
  description: "Find your dream rental property",
  keywords: "rentals, find rentals, find properties",
};

const MainLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};
export default MainLayout;
