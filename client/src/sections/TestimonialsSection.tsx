import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-base font-semibold text-primary tracking-wide uppercase">
            Testimonials
          </h2>
          <p className="mt-2 text-3xl font-display font-bold text-gray-900 sm:text-4xl">
            What Our Clients Say
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Don't just take our word for it — hear from the businesses we've
            helped transform.
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="relative" id="testimonial-slider">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="testimonial slide-in-bottom"
              >
                <div className="bg-gray-50 p-8 rounded-2xl">
                  <div className="flex text-yellow-400 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-current"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <blockquote>
                    <p className="text-xl italic font-medium text-gray-900 mb-8">
                      "{testimonials[activeIndex].quote}"
                    </p>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 mr-4">
                        <img
                          className="h-12 w-12 rounded-full"
                          src={testimonials[activeIndex].avatar}
                          alt={testimonials[activeIndex].name}
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {testimonials[activeIndex].name}
                        </p>
                        <p className="text-gray-600">
                          {testimonials[activeIndex].title}
                        </p>
                      </div>
                    </div>
                  </blockquote>
                </div>
              </motion.div>

              <div className="mt-8 flex justify-center space-x-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full hover:bg-primary-400 focus:outline-none ${
                      index === activeIndex
                        ? "bg-primary-600"
                        : "bg-primary-200"
                    }`}
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Go to testimonial ${index + 1}`}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
