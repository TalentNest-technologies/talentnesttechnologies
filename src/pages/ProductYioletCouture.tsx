import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Palette, CheckCircle2, Shield, Brain, ShoppingBag, 
  Shirt, Sparkles, Globe, TrendingUp, Users, BarChart3,
  Truck, CreditCard, Eye, Layers, Award, Target
} from "lucide-react";
import { FloatingBackground } from "@/components/FloatingBackground";

const ProductYioletCouture = () => {
  const modules = [
    {
      icon: Palette,
      title: "Design Your Own Outfit (DYO) Studio",
      features: [
        "Fabric.js / Canvas-based real-time design editor",
        "Upload patterns, colors, prints with AI-generated fabric designs",
        "Measurement customization for perfect fit",
        "Instant visualization with 360° previews",
        "No design skills required—intuitive drag-and-drop interface"
      ]
    },
    {
      icon: Eye,
      title: "AI Virtual Try-On Engine",
      features: [
        "Body segmentation + garment draping technology",
        "Automatic size recommendation based on body metrics",
        "On-model visualization for realistic preview",
        "Reduces guesswork and return rates by 30-50%",
        "Works across all device types and screen sizes"
      ]
    },
    {
      icon: Users,
      title: "Designer Collaboration Hub",
      features: [
        "Fashion designers can offer templates and patterns",
        "Users can customize and purchase designer creations",
        "Designers earn royalties on every sale",
        "Marketplace for creativity and trending styles",
        "Build your brand within the Yiolet ecosystem"
      ]
    },
    {
      icon: BarChart3,
      title: "AI Merchandising & Retail Analytics",
      features: [
        "Demand forecasting with predictive AI models",
        "Conversion prediction and pricing optimization",
        "Inventory intelligence and stock management",
        "Trend insights: colors, prints, styles, seasons",
        "Real-time sales analytics and reporting"
      ]
    },
    {
      icon: Globe,
      title: "Global Commerce & Logistics Layer",
      features: [
        "Multi-country shipping (US, India, UK, Canada, Australia)",
        "Secured payment processing with multiple gateways",
        "Real-time order tracking and notifications",
        "Automated tax calculation and compliance",
        "Returns and exchange management"
      ]
    }
  ];

  const businessBenefits = [
    "Increased conversion rates through personalization",
    "Lower return rates due to AI try-on accuracy",
    "Higher AOV (Average Order Value) via customization",
    "Better inventory management and forecasting",
    "Stronger brand engagement and loyalty",
    "Designer collaborations increase catalog diversity",
    "Gamified user experience leads to repeat purchases"
  ];

  const customerBenefits = [
    "Fully immersive design experience",
    "Try before you buy with virtual try-on",
    "Personal styling guidance through AI",
    "High satisfaction due to perfect fit and visuals",
    "Create unique outfits instantly",
    "Affordable high-fashion customization"
  ];

  const industryStats = [
    { stat: "17.3%", label: "YoY Growth", desc: "Fashion customization market" },
    { stat: "28-65%", label: "Conversion Lift", desc: "With virtual try-on" },
    { stat: "30-50%", label: "Return Reduction", desc: "AI-driven sizing" },
    { stat: "12-22%", label: "Sales Uplift", desc: "AI merchandising impact" }
  ];

  const targetAudiences = [
    "Fashion brands & boutiques",
    "Independent designers",
    "Clothing manufacturers",
    "E-commerce stores",
    "Luxury and premium apparel labels",
    "College fashion programs & design schools"
  ];

  const competitiveAdvantages = [
    "Combines AI Design Studio + Virtual Try-On + E-commerce",
    "Real-time rendering and customization",
    "No coding or design skills required",
    "Enterprise-grade AI analytics",
    "End-to-end solution (design → try-on → order → shipping)",
    "Customizable for B2B2C fashion platforms"
  ];

  return (
    <div className="min-h-screen pt-24 relative">
      <FloatingBackground variant="yiolet" />
      
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-rose-500/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
              AI Fashion Commerce
            </Badge>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
              Yiolet Couture
              <span className="block text-3xl md:text-4xl mt-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                AI Fashion Commerce & Virtual Design Studio
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Design, visualize, customize, and shop—all in one platform. Empower your customers with 
              AI-driven virtual try-on, real-time design tools, and seamless global commerce.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild variant="hero" size="lg">
                <Link to="/contact">Request a Demo</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/services">See Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Stats */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4">Industry Insights</Badge>
            <h2 className="text-3xl font-heading font-bold mb-4">Fashion Tech is Booming</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Consumers prefer brands offering personalization and visualization. Here's why fashion-tech matters.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {industryStats.map((item) => (
              <Card key={item.label} className="glass-card p-6 text-center">
                <div className="text-4xl font-heading font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
                  {item.stat}
                </div>
                <h3 className="font-semibold mb-1">{item.label}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audiences */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">Who It's For</h2>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {targetAudiences.map((audience) => (
              <Card key={audience} className="glass-card p-4 text-center">
                <Shirt className="w-8 h-8 mx-auto mb-3 text-purple-500" />
                <p className="font-medium text-sm">{audience}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Core Modules */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Core Modules</Badge>
            <h2 className="text-4xl md:text-5xl font-heading font-bold">
              Complete Fashion-Tech Platform
            </h2>
          </div>

          <div className="space-y-12 max-w-6xl mx-auto">
            {modules.map((module) => (
              <Card key={module.title} className="glass-card p-8">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <module.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-heading font-bold mb-4">{module.title}</h3>
                    <ul className="space-y-3">
                      {module.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Business Benefits */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-heading font-bold">Benefits for Businesses</h2>
              </div>
              <Card className="glass-card p-6">
                <ul className="space-y-3">
                  {businessBenefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* Customer Benefits */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-heading font-bold">Benefits for End-Users</h2>
              </div>
              <Card className="glass-card p-6">
                <ul className="space-y-3">
                  {customerBenefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Competitive Advantage */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-white" />
              </div>
              <Badge className="mb-4">Why Choose Yiolet</Badge>
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                Competitive Advantage
              </h2>
              <p className="text-lg text-muted-foreground">
                The only platform that combines design, try-on, and commerce in one seamless experience.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {competitiveAdvantages.map((advantage) => (
                <div key={advantage} className="flex items-start gap-3 p-4 rounded-lg bg-background/60">
                  <Shield className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{advantage}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Impact Created</Badge>
            <h2 className="text-4xl md:text-5xl font-heading font-bold">
              Transform Fashion Retail
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { 
                icon: TrendingUp, 
                title: "Business Impact", 
                items: ["Boosts online sales", "Reduces operational costs", "Enhances brand loyalty", "Enables data-driven decisions", "Global e-commerce scalability"]
              },
              { 
                icon: Brain, 
                title: "Technology Impact", 
                items: ["Democratizes fashion design", "Enables hyper-personalized clothing", "Seamless AI + e-commerce fusion", "Real-time 3D rendering", "Enterprise-grade analytics"]
              },
              { 
                icon: Users, 
                title: "Customer Impact", 
                items: ["Empowers creativity", "Makes fashion accessible", "Delivers perfect-match products", "Reduces purchase anxiety", "Unique self-expression"]
              }
            ].map((impact) => (
              <Card key={impact.title} className="glass-card p-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                  <impact.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-4">{impact.title}</h3>
                <ul className="space-y-2">
                  {impact.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TalentNest Fit */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4">TalentNest Technologies</Badge>
            <h2 className="text-3xl font-heading font-bold mb-4">
              Expanding Our AI Ecosystem
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Yiolet Couture represents TalentNest Technologies' expansion into AI-driven retail and creative commerce, 
              showcasing advanced AI capabilities, real-time design tools, large-scale consumer personalization, 
              and complete e-commerce integration.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {["Advanced AI", "Real-time Design", "Consumer Personalization", "E-commerce Integration", "Enterprise Analytics"].map((tag) => (
                <Badge key={tag} variant="outline" className="px-4 py-2">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Ready to Revolutionize Fashion Commerce?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            See how Yiolet Couture can transform your fashion business with AI-powered design, virtual try-on, and intelligent commerce.
          </p>
          <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-white/90">
            <Link to="/contact">Schedule a Demo</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ProductYioletCouture;