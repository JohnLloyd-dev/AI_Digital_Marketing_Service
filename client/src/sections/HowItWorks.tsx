import { motion } from "framer-motion";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Data Collection & Analysis",
      description:
        "Our AI systems collect and analyze data from all your marketing channels to understand performance patterns and customer behavior.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "AI Strategy Development",
      description:
        "Based on the analysis, our AI develops a customized marketing strategy optimized for your specific goals and target audience.",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "Implementation & Automation",
      description:
        "We implement the strategy using our AI tools, automating campaigns, content creation, and channel optimization.",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      title: "Continuous Learning & Optimization",
      description:
        "Our AI continuously learns from performance data, making real-time adjustments to improve results and maximize ROI.",
      image:
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-base font-semibold text-primary tracking-wide uppercase">
            How It Works
          </h2>
          <p className="mt-2 text-3xl font-display font-bold text-gray-900 sm:text-4xl">
            Our AI-Driven Approach
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            A simple and effective process to transform your digital marketing
            results.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 border-l-2 border-dashed border-gray-200 h-full z-0"></div>

          <div className="space-y-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                className="relative z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="flex flex-col md:flex-row items-center">
                  <div
                    className={`md:w-1/2 md:pr-12 ${
                      step.id % 2 === 0 ? "md:text-left" : "md:text-right"
                    } order-2 ${step.id % 2 === 0 ? "md:order-2" : "md:order-1"}`}
                  >
                    <div className="bg-white p-2">
                      <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">
                        {step.title}
                      </h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 mx-auto md:mx-0 mb-6 md:mb-0 order-1 md:order-2">
                    <div className="h-16 w-16 rounded-full gradient-bg flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                      {step.id}
                    </div>
                  </div>
                  <div
                    className={`md:w-1/2 ${
                      step.id % 2 === 0 ? "md:pr-12" : "md:pl-12"
                    } order-3`}
                  >
                    <div className="bg-white p-2">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="rounded-lg shadow-md max-w-xs mx-auto"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Schedule a Demo
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2 h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
