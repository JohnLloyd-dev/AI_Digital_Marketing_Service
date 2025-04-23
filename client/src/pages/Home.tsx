import Hero from "@/sections/Hero";
import FeaturedClients from "@/sections/FeaturedClients";
import ServicesSection from "@/sections/ServicesSection";
import HowItWorks from "@/sections/HowItWorks";
import CaseStudiesSection from "@/sections/CaseStudiesSection";
import TestimonialsSection from "@/sections/TestimonialsSection";
import StatsSection from "@/sections/StatsSection";
import PricingSection from "@/sections/PricingSection";
import TeamSection from "@/sections/TeamSection";
import NewsletterSection from "@/sections/NewsletterSection";
import ContactSection from "@/sections/ContactSection";
import FaqSection from "@/sections/FaqSection";
import CtaSection from "@/sections/CtaSection";
import { Helmet } from 'react-helmet';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>AI Marketing Pro - AI-Powered Digital Marketing Solutions</title>
        <meta name="description" content="Transform your business with AI-powered marketing solutions. Drive more leads, increase conversions, and maximize ROI across all channels." />
      </Helmet>
      <Hero />
      <FeaturedClients />
      <ServicesSection />
      <HowItWorks />
      <CaseStudiesSection />
      <TestimonialsSection />
      <StatsSection />
      <PricingSection />
      <TeamSection />
      <NewsletterSection />
      <ContactSection />
      <FaqSection />
      <CtaSection />
    </>
  );
};

export default Home;
