import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};
export default MainLayout;
