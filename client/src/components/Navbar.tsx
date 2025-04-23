import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Brain } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/services", label: "Services" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/about", label: "About Us" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-primary mr-2">
                <Brain className="h-6 w-6" />
              </div>
              <span className="text-xl font-display font-bold text-primary">
                AI Marketing Pro
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium ${
                  location === link.href
                    ? "text-primary"
                    : "text-gray-700 hover:text-primary transition-colors"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild>
              <Link href="/contact">Get Started</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Menu"
                  className="text-gray-500 hover:text-primary focus:outline-none"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85%] sm:w-[385px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-6">
                    <Link
                      href="/"
                      className="flex items-center space-x-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="text-primary mr-2">
                        <Brain className="h-6 w-6" />
                      </div>
                      <span className="text-xl font-display font-bold text-primary">
                        AI Marketing Pro
                      </span>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                    >
                      <X className="h-6 w-6" />
                    </Button>
                  </div>
                  <div className="flex flex-col space-y-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`px-4 py-2 rounded-md text-base font-medium ${
                          location === link.href
                            ? "text-primary bg-primary/10"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <Button
                      className="mt-4 w-full"
                      onClick={() => {
                        setIsOpen(false);
                      }}
                      asChild
                    >
                      <Link href="/contact">Get Started</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
