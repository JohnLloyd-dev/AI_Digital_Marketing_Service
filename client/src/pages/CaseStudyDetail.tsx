import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Helmet } from "react-helmet";
import { ArrowLeft, Check } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import type { CaseStudy } from "@shared/schema";

// Extended Case Study type with fullContent
interface ExtendedCaseStudy extends CaseStudy {
  fullContent: {
    challenge: string;
    solution: string;
    results: string[];
    testimonial: {
      quote: string;
      author: string;
      position: string;
    };
  };
}
import CtaSection from "@/sections/CtaSection";

const CaseStudyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const caseStudyId = parseInt(id);

  const { data, isLoading, error } = useQuery<{ success: boolean; data: ExtendedCaseStudy }>({
    queryKey: ['/api/case-studies', caseStudyId],
    enabled: !isNaN(caseStudyId),
  });

  const caseStudy = data?.data as ExtendedCaseStudy;

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        <div className="animate-pulse flex flex-col items-center justify-center">
          <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </div>
      </div>
    );
  }

  if (error || !caseStudy || !caseStudy.fullContent) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Case Study Not Found</h2>
        <p className="mt-2 text-gray-600">The case study you're looking for doesn't exist or couldn't be loaded.</p>
        <Link to="/case-studies" className="mt-4 inline-flex items-center text-primary hover:underline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Case Studies
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{caseStudy.title} | AI Marketing Pro Case Study</title>
        <meta name="description" content={caseStudy.description} />
      </Helmet>

      <div className="relative h-96 bg-gradient-to-r from-gray-900 to-gray-800 overflow-hidden">
        <img
          src={caseStudy.image}
          alt={caseStudy.title}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-16">
          <Link to="/case-studies" className="inline-flex items-center text-white mb-6 hover:text-primary transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to all case studies
          </Link>
          <span
            className={`inline-block px-3 py-1 text-xs font-semibold ${caseStudy.badgeColor} text-white rounded-full mb-4`}
          >
            {caseStudy.category}
          </span>
          <motion.h1
            className="text-4xl md:text-5xl font-display font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {caseStudy.title}
          </motion.h1>
        </div>
      </div>

      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.div
                className="prose prose-lg max-w-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2>The Challenge</h2>
                <p>{caseStudy.fullContent.challenge}</p>

                <h2>Our Solution</h2>
                <p>{caseStudy.fullContent.solution}</p>

                <h2>The Results</h2>
                <ul className="space-y-2">
                  {caseStudy.fullContent.results.map((result: string, index: number) => (
                    <motion.li
                      key={index}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    >
                      <span className="mr-2 mt-1 flex-shrink-0 flex items-center justify-center rounded-full bg-primary w-5 h-5 text-white">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                      <span>{result}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                className="mt-12 bg-gray-50 p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                      <span className="text-xl font-bold leading-none text-white">"</span>
                    </span>
                  </div>
                  <div className="ml-4">
                    <p className="text-base font-medium text-gray-900 mb-2">
                      {caseStudy.fullContent.testimonial.quote}
                    </p>
                    <div className="text-sm text-gray-500">
                      <p className="font-medium text-gray-800">{caseStudy.fullContent.testimonial.author}</p>
                      <p>{caseStudy.fullContent.testimonial.position}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div>
              <motion.div
                className="bg-gray-50 rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Client Information</h3>
                <div className="flex items-center mb-6">
                  <img
                    className="h-16 w-16 rounded-full mr-4"
                    src={caseStudy.clientImage}
                    alt={caseStudy.clientName}
                  />
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{caseStudy.clientName}</h4>
                    <p className="text-gray-600">{caseStudy.clientType}</p>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mt-8 mb-4">Key Metrics</h3>
                <div className="space-y-4">
                  {caseStudy.fullContent.results.slice(0, 3).map((result: string, index: number) => {
                    const matches = result.match(/^(\d+%|[\d.]+ ?[xX])(.+)$/);
                    if (matches) {
                      return (
                        <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                          <p className="text-2xl font-bold text-primary">{matches[1]}</p>
                          <p className="text-gray-600">{matches[2]}</p>
                        </div>
                      );
                    }
                    return (
                      <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                        <p className="text-gray-600">{result}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Interested in similar results?</h3>
                  <Link
                    to="/contact"
                    className="inline-block w-full py-3 px-4 rounded bg-primary hover:bg-primary-dark text-white text-center transition-colors font-medium"
                  >
                    Contact Us Today
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <CtaSection />
    </>
  );
};

export default CaseStudyDetail;