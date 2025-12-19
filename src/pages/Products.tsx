import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Building2, Hotel, Palette, ArrowRight, ExternalLink } from "lucide-react";

const Products = () => {
  const products = [
    {
      name: "TalentNest",
      tagline: "AI Recruitment & HRIS Platform",
      description:
        "Unified ecosystem for recruiters, candidates, HR teams, and freelancers with ATS, HRIS, Learning, and cloud workspace.",
      icon: Users,
      link: "/products/talentnest",
      externalLink: "https://talentnesttechnologies.com/",
      color: "from-blue-500 to-indigo-600",
      features: [
        "AI-powered ATS with resume parsing",
        "Complete HRIS with payroll & benefits",
        "Freelancing cloud workspace",
        "Learning platform with anti-cheat proctoring",
        "Identity verification & security",
      ],
    },
    {
      name: "TenantNest",
      tagline: "Smart Property Management",
      description:
        "Cloud suite for landlords, tenants, and property managers with AI-driven insights and automation.",
      icon: Building2,
      link: "/products/tenantnest",
      externalLink: "https://nest-rent-suite.lovable.app",
      color: "from-cyan-500 to-blue-600",
      features: [
        "Tenant onboarding & KYC",
        "Automated rent collection",
        "Maintenance tracking with SLA",
        "AI forecasting for rent & occupancy",
        "Owner dashboards & analytics",
      ],
    },
    {
      name: "Hotel Operations AI",
      tagline: "Hospitality Intelligence Suite",
      description:
        "Multi-property operations platform with AI rate recommendations and revenue optimization.",
      icon: Hotel,
      link: "/products/hotel-ai",
      externalLink: "https://tenantnest-hub.lovable.app/",
      color: "from-emerald-500 to-cyan-600",
      features: [
        "Real-time operations dashboard",
        "AI-powered rate optimization",
        "Occupancy & revenue forecasting",
        "PMS & OTA integrations",
        "Multi-property benchmarking",
      ],
    },
    {
      name: "Yiolet Couture",
      tagline: "AI Fashion Commerce & Virtual Design Studio",
      description:
        "Design, visualize, customize, and shop—all in one platform with AI-driven virtual try-on and real-time design tools.",
      icon: Palette,
      link: "/products/yiolet-couture",
      externalLink: "https://yiolet-couture.lovable.app/",
      color: "from-purple-500 to-pink-600",
      features: [
        "Design Your Own Outfit (DYO) Studio",
        "AI Virtual Try-On Engine",
        "Designer Collaboration Hub",
        "AI Merchandising & Analytics",
        "Global Commerce & Logistics",
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6">Our Products</Badge>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
              Four Powerful{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                AI Platforms
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Comprehensive solutions for recruitment, property management, and hospitality operations
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-24">
            {products.map((product, index) => (
              <div
                key={product.name}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <Card className="glass-card p-12 h-full">
                    <div
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${product.color} flex items-center justify-center mb-6`}
                    >
                      <product.icon className="w-10 h-10 text-white" />
                    </div>
                    <Badge className="mb-4">{product.tagline}</Badge>
                    <h2 className="text-4xl font-heading font-bold mb-4">{product.name}</h2>
                    <p className="text-lg text-muted-foreground mb-8">{product.description}</p>
                    <Button asChild variant="hero">
                      <Link to={product.link}>
                        Learn More <ArrowRight className="ml-2" />
                      </Link>
                    </Button>
                    <a
                      href={product.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary font-medium flex items-center gap-2 smooth-transition text-sm mt-3"
                    >
                      Visit Website <ExternalLink className="w-4 h-4" />
                    </a>
                  </Card>
                </div>

                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-heading font-semibold mb-6">Key Features</h3>
                    {product.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-accent"></div>
                        </div>
                        <p className="text-lg text-muted-foreground">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-foreground text-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Ready to See Our Platforms in Action?
          </h2>
          <p className="text-xl text-background/80 mb-8 max-w-2xl mx-auto">
            Schedule a personalized demo to discover how our AI-powered solutions can transform your business.
          </p>
          <Button asChild variant="hero" size="lg">
            <Link to="/contact">Request a Demo</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Products;
