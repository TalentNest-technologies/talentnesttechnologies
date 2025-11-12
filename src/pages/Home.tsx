import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Building2, Hotel, Sparkles, Shield, TrendingUp, Zap, CheckCircle2, ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { FloatingBackground } from "@/components/FloatingBackground";
const Home = () => {
  const products = [{
    name: "TalentNest",
    description: "AI-powered recruitment platform with ATS, HRIS, and freelance workspace",
    icon: Users,
    link: "/products/talentnest",
    color: "from-blue-500 to-indigo-600"
  }, {
    name: "TenantNest",
    description: "Smart property and tenant management with AI-driven insights",
    icon: Building2,
    link: "/products/tenantnest",
    color: "from-cyan-500 to-blue-600"
  }, {
    name: "Hotel Operations AI",
    description: "Revenue intelligence and operations automation for hospitality",
    icon: Hotel,
    link: "/products/hotel-ai",
    color: "from-emerald-500 to-cyan-600"
  }];
  const clients = ["Ramada", "Motel 6", "Choice Hotels", "Wyndham", "Quality Inn"];
  const features = [{
    icon: Sparkles,
    title: "AI-Powered Intelligence",
    description: "Advanced machine learning for smarter decisions"
  }, {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC2-ready with end-to-end encryption"
  }, {
    icon: TrendingUp,
    title: "Real-Time Analytics",
    description: "Live dashboards with actionable insights"
  }, {
    icon: Zap,
    title: "Multi-Tenant Platform",
    description: "Scalable architecture for growing businesses"
  }];
  return <div className="min-h-screen relative">
      <FloatingBackground variant="home" />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{
      backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.9)), url(${heroBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center"
    }}>
        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/20 text-primary border-primary/30">
              AI-Driven Platforms. Real-World Impact.
            </Badge>
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 leading-tight">
              Transform Your Business with{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                AI Intelligence
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
              Powerful platforms for recruitment, property management, and hospitality operations.
              Trusted by leading hotel brands worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="hero" size="lg">
                <Link to="/contact">
                  Request a Demo <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-foreground">
                <Link to="/products">Explore Products Features  </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background"></div>
      </section>

      {/* Products Preview */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Our Products</Badge>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Three Powerful Platforms
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive solutions designed for modern businesses
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map(product => <Card key={product.name} className="glass-card p-8 smooth-transition hover:shadow-lg hover:-translate-y-1 group cursor-pointer" onClick={() => window.location.href = product.link}>
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${product.color} flex items-center justify-center mb-6 group-hover:scale-110 smooth-transition`}>
                  <product.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-heading font-semibold mb-3">{product.name}</h3>
                <p className="text-muted-foreground mb-6">{product.description}</p>
                <Link to={product.link} className="text-primary font-medium flex items-center gap-2 group-hover:gap-3 smooth-transition">
                  Learn more <ArrowRight className="w-4 h-4" />
                </Link>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Services Snapshot */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Our Services</Badge>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              End-to-End IT Solutions
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {["IT Recruiting & Contracting", "Software Development & Integrations", "Cloud / DevOps / Data Engineering", "Hospitality IT Services"].map(service => <Card key={service} className="glass-card p-6 text-center hover:shadow-md smooth-transition">
                <CheckCircle2 className="w-8 h-8 text-accent mx-auto mb-3" />
                <h3 className="font-heading font-semibold">{service}</h3>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Featured Clients */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4">Trusted By</Badge>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Leading Hotel Brands
            </h2>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-12">
            {clients.map(client => <div key={client} className="text-2xl font-heading font-bold text-muted-foreground/50 hover:text-foreground smooth-transition">
                {client}
              </div>)}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Why TalentNest</Badge>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Built for Scale and Security
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map(feature => <div key={feature.title} className="text-center">
                <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-heading font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-foreground text-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Ready to Transform Your Operations?
          </h2>
          <p className="text-xl text-background/80 mb-8 max-w-2xl mx-auto">
            Join leading enterprises using our AI-powered platforms to drive growth and efficiency.
          </p>
          <Button asChild variant="hero" size="lg">
            <Link to="/contact">Schedule a Demo Today</Link>
          </Button>
        </div>
      </section>
    </div>;
};
export default Home;