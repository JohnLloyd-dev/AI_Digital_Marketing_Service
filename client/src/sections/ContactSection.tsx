import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { MapPin, Phone, Mail, Linkedin, Twitter, Facebook, Instagram } from "lucide-react";

const ContactSection = () => {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    newsletter: false,
  });

  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (formData: typeof formState) => {
      return await apiRequest("POST", "/api/contact", formData);
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
        variant: "default",
      });
      // Reset form
      setFormState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        message: "",
        newsletter: false,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      console.error("Contact form error:", error);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formState);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormState((prev) => ({ ...prev, newsletter: checked }));
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-base font-semibold text-primary tracking-wide uppercase">
            Contact Us
          </h2>
          <p className="mt-2 text-3xl font-display font-bold text-gray-900 sm:text-4xl">
            Ready to Transform Your Marketing?
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Get in touch to discuss how our AI marketing solutions can help your business grow.
          </p>
        </motion.div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                <div>
                  <Label htmlFor="firstName">First name</Label>
                  <div className="mt-1">
                    <Input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formState.firstName}
                      onChange={handleChange}
                      autoComplete="given-name"
                      required
                      className="py-3 px-4 block w-full"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="lastName">Last name</Label>
                  <div className="mt-1">
                    <Input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formState.lastName}
                      onChange={handleChange}
                      autoComplete="family-name"
                      required
                      className="py-3 px-4 block w-full"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="company">Company</Label>
                  <div className="mt-1">
                    <Input
                      type="text"
                      id="company"
                      name="company"
                      value={formState.company}
                      onChange={handleChange}
                      autoComplete="organization"
                      className="py-3 px-4 block w-full"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="mt-1">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      autoComplete="email"
                      required
                      className="py-3 px-4 block w-full"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="phone">Phone</Label>
                  <div className="mt-1">
                    <Input
                      type="text"
                      name="phone"
                      id="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      autoComplete="tel"
                      className="py-3 px-4 block w-full"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="message">Message</Label>
                  <div className="mt-1">
                    <Textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      rows={4}
                      required
                      className="py-3 px-4 block w-full"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-0.5">
                      <Checkbox
                        id="newsletter"
                        checked={formState.newsletter}
                        onCheckedChange={handleCheckboxChange}
                      />
                    </div>
                    <div className="ml-3">
                      <Label htmlFor="newsletter" className="text-base text-gray-500">
                        By selecting this, you agree to receive marketing communications from us.
                      </Label>
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </div>
              </div>
            </form>
          </motion.div>

          <motion.div
            className="mt-16 lg:mt-0"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-xl font-display font-bold text-gray-900 mb-6">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-base font-medium text-gray-900">Office Location</p>
                    <p className="mt-1 text-base text-gray-500">
                      123 AI Innovation Center
                      <br />
                      San Francisco, CA 94103
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-base font-medium text-gray-900">Phone</p>
                    <p className="mt-1 text-base text-gray-500">+1 (555) 123-4567</p>
                    <p className="mt-1 text-sm text-gray-500">Mon-Fri from 8am to 6pm PST</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-base font-medium text-gray-900">Email</p>
                    <p className="mt-1 text-base text-gray-500">info@aimarketingpro.com</p>
                    <p className="mt-1 text-sm text-gray-500">We'll respond within 24 hours</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-display font-bold text-gray-900 mb-6">Follow Us</h3>
                <div className="flex space-x-6">
                  <a
                    href="#"
                    className="text-gray-400 hover:text-primary transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-6 w-6" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-primary transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-6 w-6" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-primary transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-primary transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
