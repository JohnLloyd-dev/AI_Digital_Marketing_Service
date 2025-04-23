import { Helmet } from 'react-helmet';
import ContactSection from "@/sections/ContactSection";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us - AI Marketing Pro</title>
        <meta name="description" content="Get in touch with our team to discuss how our AI marketing solutions can help your business grow." />
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
              Contact Us
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to transform your digital marketing strategy? Get in touch with our team today.
            </p>
          </motion.div>
        </div>
      </section>
      
      <ContactSection />
    </>
  );
};

export default Contact;
