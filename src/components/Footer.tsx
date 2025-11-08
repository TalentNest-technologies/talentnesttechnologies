import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Twitter, Github } from "lucide-react";
import { Subscribe } from "./Subscribe";
import logo from "@/assets/talentnest-logo.png";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div>
            <img src={logo} alt="TalentNest Technologies" className="h-12 w-auto mb-4" />
            <p className="text-background/80 text-sm">
              AI-driven solutions for hiring, housing, and hospitality.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-background/80 hover:text-background smooth-transition text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-background/80 hover:text-background smooth-transition text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-background/80 hover:text-background smooth-transition text-sm">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-background/80 hover:text-background smooth-transition text-sm">
                  Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-heading font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/products/talentnest"
                  className="text-background/80 hover:text-background smooth-transition text-sm"
                >
                  TalentNest
                </Link>
              </li>
              <li>
                <Link
                  to="/products/tenantnest"
                  className="text-background/80 hover:text-background smooth-transition text-sm"
                >
                  TenantNest
                </Link>
              </li>
              <li>
                <Link
                  to="/products/hotel-ai"
                  className="text-background/80 hover:text-background smooth-transition text-sm"
                >
                  Hotel Operations AI
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-background/80 text-sm">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:team@talentnesttechnologies.info"
                  className="hover:text-background smooth-transition"
                >
                  team@talentnesttechnologies.info
                </a>
              </li>
              <li className="flex items-start gap-2 text-background/80 text-sm">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a href="tel:+14256281028" className="hover:text-background smooth-transition">
                  +1 (425) 628-1028
                </a>
              </li>
              <li className="flex items-start gap-2 text-background/80 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>118 Jewett Avenue, Jersey City, NJ, 07304</span>
              </li>
            </ul>
          </div>

          {/* Subscribe */}
          <div>
            <Subscribe />
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/60 text-sm">
            © 2025 TalentNest Technologies. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/legal/privacy" className="text-background/60 hover:text-background smooth-transition text-sm">
              Privacy Policy
            </Link>
            <Link to="/legal/terms" className="text-background/60 hover:text-background smooth-transition text-sm">
              Terms of Service
            </Link>
            <div className="flex gap-3 ml-4">
              <a href="#" className="text-background/60 hover:text-background smooth-transition">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-background smooth-transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-background smooth-transition">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
