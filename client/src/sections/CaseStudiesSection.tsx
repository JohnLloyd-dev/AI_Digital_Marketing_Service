import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { caseStudies } from "@/data/caseStudies";

interface CaseStudiesSectionProps {
  fullDisplay?: boolean;
}

const CaseStudiesSection = ({ fullDisplay = false }: CaseStudiesSectionProps) => {
  // If not fullDisplay, show only first 3 case studies
  const displayedCaseStudies = fullDisplay ? caseStudies : caseStudies.slice(0, 3);

  return (
    <section id="case-studies" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-base font-semibold text-primary tracking-wide uppercase">
            Success Stories
          </h2>
          <p className="mt-2 text-3xl font-display font-bold text-gray-900 sm:text-4xl">
            Our Case Studies
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            See how our AI marketing solutions have transformed businesses across
            industries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayedCaseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative h-60">
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-semibold ${study.badgeColor} text-white rounded-full mb-2`}
                  >
                    {study.category}
                  </span>
                  <h3 className="text-xl font-display font-bold text-white">
                    {study.title}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">{study.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={study.clientImage}
                      alt={study.clientName}
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {study.clientName}
                      </p>
                      <p className="text-xs text-gray-500">{study.clientType}</p>
                    </div>
                  </div>
                  <a
                    href={`/case-studies/${study.id}`}
                    className={`${study.linkColor} hover:${study.linkHoverColor} transition-colors`}
                  >
                    Read Case Study <ArrowRight className="inline h-4 w-4 ml-1" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {!fullDisplay && (
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href="/case-studies"
              className="inline-flex items-center px-6 py-3 border border-primary text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              View All Case Studies
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CaseStudiesSection;
