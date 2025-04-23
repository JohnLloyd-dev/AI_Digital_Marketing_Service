import { Helmet } from 'react-helmet';
import PricingSection from "@/sections/PricingSection";
import FaqSection from "@/sections/FaqSection";
import CtaSection from "@/sections/CtaSection";
import { motion } from "framer-motion";

const Pricing = () => {
  return (
    <>
      <Helmet>
        <title>Pricing - AI Marketing Pro</title>
        <meta name="description" content="Explore our transparent pricing plans for AI-powered digital marketing services designed to fit businesses of all sizes." />
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
              Transparent Pricing
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that's right for your business needs and start transforming your digital marketing strategy today.
            </p>
          </motion.div>
        </div>
      </section>
      
      <PricingSection />
      <FaqSection />
      <CtaSection />
    </>
  );
};

export default Pricing;
