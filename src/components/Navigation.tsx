import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    {
      name: "Products",
      path: "/products",
      children: [
        { name: "TalentNest", path: "/products/talentnest" },
        { name: "TenantNest", path: "/products/tenantnest" },
        { name: "Hotel Operations AI", path: "/products/hotel-ai" },
      ],
    },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-xl">TN</span>
            </div>
            <span className="font-heading font-bold text-xl">TalentNest</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.children ? (
                  <div
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                    className="relative"
                  >
                    <button
                      className={cn(
                        "px-4 py-2 rounded-lg smooth-transition flex items-center gap-1",
                        isActive(item.path)
                          ? "text-primary font-medium"
                          : "text-foreground hover:text-primary hover:bg-muted"
                      )}
                    >
                      {item.name}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {activeDropdown === item.name && (
                      <div className="absolute top-full left-0 mt-1 w-56 glass-card rounded-lg shadow-lg py-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            to={child.path}
                            className={cn(
                              "block px-4 py-2 smooth-transition",
                              isActive(child.path)
                                ? "text-primary font-medium bg-muted"
                                : "text-foreground hover:text-primary hover:bg-muted"
                            )}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={cn(
                      "px-4 py-2 rounded-lg smooth-transition",
                      isActive(item.path)
                        ? "text-primary font-medium"
                        : "text-foreground hover:text-primary hover:bg-muted"
                    )}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="hidden md:block">
            <Button asChild variant="hero" size="default">
              <Link to="/contact">Request a Demo</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navItems.map((item) => (
              <div key={item.name}>
                <Link
                  to={item.path}
                  className={cn(
                    "block px-4 py-2 rounded-lg smooth-transition",
                    isActive(item.path)
                      ? "text-primary font-medium bg-muted"
                      : "text-foreground hover:text-primary hover:bg-muted"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
                {item.children && (
                  <div className="ml-4 mt-2 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        to={child.path}
                        className={cn(
                          "block px-4 py-2 rounded-lg smooth-transition text-sm",
                          isActive(child.path)
                            ? "text-primary font-medium bg-muted"
                            : "text-foreground hover:text-primary hover:bg-muted"
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Button asChild variant="hero" size="default" className="w-full mt-4">
              <Link to="/contact" onClick={() => setIsOpen(false)}>
                Request a Demo
              </Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};
