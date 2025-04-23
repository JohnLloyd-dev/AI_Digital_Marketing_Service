import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Star, StarHalf } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 sm:pb-24 sm:pt-24 lg:pt-32">
      <div className="absolute inset-0 -z-10 opacity-10">
        <div
          className="absolute inset-0 h-full w-full"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <h1 className="mt-4 text-4xl font-display font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              <span className="block">Transform Your Business with</span>
              <span className="block gradient-text">AI-Powered Marketing</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-3xl">
              Unlock the full potential of your digital marketing strategy with
              our cutting-edge AI solutions. Drive more leads, increase
              conversions, and maximize ROI across all channels.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="px-8">
                <Link href="/services">Explore Services</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8">
                <Link href="/case-studies">View Case Studies</Link>
              </Button>
            </div>
            <div className="mt-8 flex items-center">
              <div className="flex -space-x-2">
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Happy client"
                />
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Happy client"
                />
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Happy client"
                />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">
                  Trusted by 500+ businesses
                </p>
                <div className="flex items-center mt-1">
                  <div className="flex text-yellow-400">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <StarHalf className="h-4 w-4 fill-current" />
                  </div>
                  <p className="ml-2 text-sm text-gray-600">4.8/5 average rating</p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 lg:mt-0 lg:col-span-6 flex justify-center"
          >
            <div className="relative">
              <div className="floating relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="AI Marketing Dashboard"
                  className="rounded-xl shadow-2xl max-w-full"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-full h-full rounded-xl gradient-bg -z-0"></div>
              <div className="absolute -top-6 -left-6 bg-secondary-100 w-24 h-24 rounded-full flex items-center justify-center">
                <div className="text-secondary-600 text-xl font-bold">AI</div>
              </div>
              <div className="absolute bottom-8 right-8 bg-white p-4 rounded-lg shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">ROI +167%</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-20 flex justify-center"
        >
          <div className="scroll-indicator text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
