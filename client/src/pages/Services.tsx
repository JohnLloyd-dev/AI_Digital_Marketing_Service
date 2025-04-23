import { Helmet } from 'react-helmet';
import ServicesSection from "@/sections/ServicesSection";
import HowItWorks from "@/sections/HowItWorks";
import StatsSection from "@/sections/StatsSection";
import CtaSection from "@/sections/CtaSection";
import { motion } from "framer-motion";

const Services = () => {
  return (
    <>
      <Helmet>
        <title>Our Services - AI Marketing Pro</title>
        <meta name="description" content="Explore our comprehensive AI-powered digital marketing services designed to transform your business." />
      </Helmet>
      
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-display font-bold text-gray-900 sm:text-5xl">
              Our AI Marketing Services
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Harness the power of artificial intelligence to transform your digital marketing strategy and drive measurable results.
            </p>
          </motion.div>
        </div>
      </section>
      
      <ServicesSection fullDisplay={true} />
      <HowItWorks />
      <StatsSection />
      <CtaSection />
    </>
  );
};

export default Services;
