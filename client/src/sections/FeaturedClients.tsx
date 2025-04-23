import { motion } from "framer-motion";
import { 
  SiMicrosoft, 
  SiAmazon, 
  SiGoogle, 
  SiAdobe, 
  SiSlack, 
  SiShopify 
} from "react-icons/si";

const clients = [
  { id: 1, name: "Microsoft", icon: SiMicrosoft },
  { id: 2, name: "Amazon", icon: SiAmazon },
  { id: 3, name: "Google", icon: SiGoogle },
  { id: 4, name: "Adobe", icon: SiAdobe },
  { id: 5, name: "Slack", icon: SiSlack },
  { id: 6, name: "Shopify", icon: SiShopify },
];

const FeaturedClients = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p 
          className="text-center text-sm font-medium text-gray-500 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          TRUSTED BY INDUSTRY LEADERS
        </motion.p>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {clients.map((client, index) => (
            <motion.div
              key={client.id}
              className="flex justify-center items-center col-span-1 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <client.icon className="h-10 w-10" aria-label={client.name} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedClients;
