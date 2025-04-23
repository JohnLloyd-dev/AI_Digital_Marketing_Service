import { Helmet } from 'react-helmet';
import TeamSection from "@/sections/TeamSection";
import StatsSection from "@/sections/StatsSection";
import CtaSection from "@/sections/CtaSection";
import { motion } from "framer-motion";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us - AI Marketing Pro</title>
        <meta name="description" content="Learn about our mission, values, and the team behind AI Marketing Pro's innovative digital marketing solutions." />
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
              About AI Marketing Pro
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              We're on a mission to revolutionize digital marketing through the power of artificial intelligence.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                AI Marketing Pro was founded with a clear vision: to make advanced AI marketing technology accessible to businesses of all sizes. We believe that artificial intelligence represents the future of digital marketing, enabling unprecedented levels of personalization, efficiency, and ROI.
              </p>
              <p className="text-lg text-gray-600">
                Our team of AI specialists, data scientists, and marketing experts work together to develop cutting-edge solutions that help our clients stay ahead in the rapidly evolving digital landscape. We're committed to continuous innovation, exceptional service, and measurable results.
              </p>
            </motion.div>
            
            <motion.div 
              className="rounded-xl overflow-hidden shadow-xl"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="relative h-96 gradient-bg flex items-center justify-center">
                <div className="absolute inset-0 opacity-10 bg-pattern"></div>
                <div className="text-white text-8xl font-bold">AI</div>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="mt-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-6 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="bg-white p-8 rounded-xl shadow-md">
                <div className="w-14 h-14 rounded-full gradient-bg flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-display font-bold text-gray-900 mb-3">Innovation</h3>
                <p className="text-gray-600">
                  We're constantly exploring new technologies and approaches to stay at the forefront of AI marketing advancements.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md">
                <div className="w-14 h-14 rounded-full gradient-bg flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-display font-bold text-gray-900 mb-3">Results-Driven</h3>
                <p className="text-gray-600">
                  We measure our success by the tangible results and ROI we deliver for our clients, not by the services we sell.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md">
                <div className="w-14 h-14 rounded-full gradient-bg flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-display font-bold text-gray-900 mb-3">Client Partnership</h3>
                <p className="text-gray-600">
                  We view our clients as partners and are committed to understanding their unique needs and challenges.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      <TeamSection />
      <StatsSection />
      <CtaSection />
    </>
  );
};

export default About;
