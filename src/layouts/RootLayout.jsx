import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ReasonSection from "../components/ReasonSection";
import FeatureSection from "../components/FeatureSection";
import FeedbackSection from "../components/FeedbackSection";
import FaqSection from "../components/FaqSection";
import CtaSection from "../components/CtaSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

const RootLayout = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <AboutSection />
      <ReasonSection />
      <FeatureSection />
      <FeedbackSection />
      <FaqSection />
      <CtaSection />
      <ContactSection />
      <Footer />
    </>
  );
};

export default RootLayout;
