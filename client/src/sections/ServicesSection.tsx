import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { services } from "@/data/services";

interface ServicesSectionProps {
  fullDisplay?: boolean;
}

const ServicesSection = ({ fullDisplay = false }: ServicesSectionProps) => {
  // If not fullDisplay, show only first 3 services
  const displayedServices = fullDisplay ? services : services.slice(0, 3);

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-base font-semibold text-primary tracking-wide uppercase">
            Our Services
          </h2>
          <p className="mt-2 text-3xl font-display font-bold text-gray-900 sm:text-4xl">
            AI-Powered Marketing Solutions
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Harness the power of artificial intelligence to revolutionize your
            digital marketing strategy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {displayedServices.map((service, index) => (
            <motion.div
              key={service.id}
              className="service-card relative p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div
                className={`h-12 w-12 rounded-lg ${service.iconBgColor} flex items-center justify-center mb-5`}
              >
                <service.icon className={`h-6 w-6 ${service.iconColor}`} />
              </div>
              <h3 className="text-xl font-display font-bold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-5">{service.description}</p>
              <ul className="space-y-2 mb-6 text-sm">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <p
                className={`font-display font-semibold ${service.priceColor}`}
              >
                From ${service.price}/month
              </p>
              <a
                href={`/services#${service.id}`}
                className={`absolute bottom-6 right-6 ${service.arrowColor} hover:${service.arrowHoverColor} transition-colors`}
              >
                <ArrowRight className="h-5 w-5" />
              </a>
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
            <Button asChild size="lg" className="px-8">
              <Link href="/services">
                View All Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
