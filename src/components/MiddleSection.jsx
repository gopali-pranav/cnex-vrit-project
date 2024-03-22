import HeroSection from "../components/HeroSection";
import AboutSection from "./AboutSection";
import ContactSection from "./ContactSection";
import CtaSection from "./CtaSection";
import FeatureSection from "./FeatureSection";
import FeedbackSection from "./FeedbackSection";
import ReasonSection from "./ReasonSection";

const MiddleSection = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ReasonSection />
      <FeatureSection />
      <FeedbackSection />
      <CtaSection />
      <ContactSection />
    </>
  );
};

export default MiddleSection;
