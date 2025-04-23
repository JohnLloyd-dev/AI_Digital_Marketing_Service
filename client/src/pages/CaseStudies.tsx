import { Helmet } from 'react-helmet';
import CaseStudiesSection from "@/sections/CaseStudiesSection";
import TestimonialsSection from "@/sections/TestimonialsSection";
import CtaSection from "@/sections/CtaSection";
import { motion } from "framer-motion";

const CaseStudies = () => {
  return (
    <>
      <Helmet>
        <title>Case Studies - AI Marketing Pro</title>
        <meta name="description" content="Explore real-world examples of how our AI marketing solutions have transformed businesses across various industries." />
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
              Our Success Stories
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how our AI marketing solutions have helped businesses achieve outstanding results and significant ROI.
            </p>
          </motion.div>
        </div>
      </section>
      
      <CaseStudiesSection fullDisplay={true} />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
};

export default CaseStudies;
