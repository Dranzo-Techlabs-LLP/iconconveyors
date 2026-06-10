import { ContentProvider } from "./data/ContentContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ClientsMarquee from "./components/ClientsMarquee";
import About from "./components/About";
import Products from "./components/Products";
import Industries from "./components/Industries";
import Stats from "./components/Stats";
import WhyChoose from "./components/WhyChoose";
import QualityWarranty from "./components/QualityWarranty";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import WhatsappFloat from "./components/WhatsappFloat";
import ScrollProgress from "./components/ScrollProgress";

export default function App() {
  return (
    <ContentProvider>
      <div className="min-h-screen bg-white text-brand-900 overflow-x-hidden">
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <Stats />
          <About />
          <Products />
          <Industries />
          <WhyChoose />
          <QualityWarranty />
          <Process />
          <ClientsMarquee />
          <Testimonials />
          <CTA />
        </main>
        <Footer />
        <WhatsappFloat />
      </div>
    </ContentProvider>
  );
}
