import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const CtaSection = () => {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-display font-bold text-white sm:text-4xl">
            Ready to Transform Your Digital Marketing with AI?
          </h2>
          <p className="mt-6 text-xl text-gray-300">
            Join hundreds of businesses that have already revolutionized their marketing strategy
            with our AI-powered solutions.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row sm:justify-center gap-4">
            <Button asChild size="lg" className="px-8 py-6">
              <Link href="/contact">Schedule a Demo</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="px-8 py-6 text-primary-300 bg-gray-800 hover:bg-gray-700 border-gray-700"
            >
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
