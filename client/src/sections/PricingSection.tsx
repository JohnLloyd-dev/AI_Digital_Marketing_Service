import { Link } from "wouter";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pricing } from "@/data/pricing";

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-base font-semibold text-primary tracking-wide uppercase">
            Pricing
          </h2>
          <p className="mt-2 text-3xl font-display font-bold text-gray-900 sm:text-4xl">
            Simple, Transparent Pricing
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Choose the plan that's right for your business needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {pricing.map((plan, index) => (
            <motion.div
              key={plan.id}
              className={`${
                plan.popular
                  ? "border-2 border-primary-500 rounded-2xl shadow-md bg-white relative z-10 transform md:-translate-y-4"
                  : "border border-gray-200 rounded-2xl shadow-sm"
              } p-8 hover:shadow-lg transition-all duration-300`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {plan.popular && (
                <div className="absolute top-0 right-6 -translate-y-1/2 bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-display font-bold text-gray-900">
                {plan.name}
              </h3>
              <p className="mt-4 text-gray-600">{plan.description}</p>
              <div className="mt-6 flex items-baseline">
                <span className="text-5xl font-display font-bold text-gray-900">
                  ${plan.price}
                </span>
                <span className="ml-1 text-xl text-gray-500">/month</span>
              </div>
              <ul className="mt-8 space-y-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>{feature}</span>
                  </li>
                ))}
                {plan.nonFeatures && plan.nonFeatures.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-400">
                    <X className="h-5 w-5 text-gray-400 mr-3" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button
                  asChild
                  className="w-full"
                >
                  <Link href="/contact">Get Started</Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-xl text-gray-600 mb-4">Need a custom solution?</p>
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="px-8"
          >
            <Link href="/contact">
              Contact Us for Custom Pricing
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
