import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Target, Eye, Heart, Shield, Users, Zap } from "lucide-react";

const About = () => {
  const values = [
    { icon: Zap, title: "Innovation", description: "Pushing boundaries with cutting-edge AI" },
    { icon: Shield, title: "Security", description: "Enterprise-grade protection always" },
    { icon: Heart, title: "Integrity", description: "Honest and transparent relationships" },
    { icon: Users, title: "Customer Success", description: "Your growth is our mission" },
  ];

  const techStack = [
    "Python / FastAPI",
    "React / Next.js",
    "Node.js",
    "PostgreSQL / MongoDB / Elasticsearch",
    "Snowflake / Databricks",
    "Kafka / Redis",
    "Kubernetes / Docker / Terraform",
    "AWS / Azure / GCP",
    "LLMs / Vector DB / RAG",
  ];

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6">About Us</Badge>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
              Building the Future of{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Intelligent Platforms
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We create AI-powered solutions that simplify recruitment, property management, and hotel
              operations—while delivering enterprise-grade IT services to businesses worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="glass-card p-12">
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-heading font-bold mb-4">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Build intelligent, user-centric platforms powered by AI, automation, and data—enabling
                businesses to operate more efficiently and scale with confidence.
              </p>
            </Card>

            <Card className="glass-card p-12">
              <div className="w-16 h-16 rounded-2xl gradient-secondary flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-heading font-bold mb-4">Our Vision</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Become a global leader in AI-driven workforce, tenancy, and hospitality platforms—transforming
                how businesses manage people, properties, and operations.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Our Values</Badge>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">What Drives Us</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-heading font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Expertise */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4">Technology</Badge>
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                Enterprise-Grade Tech Stack
              </h2>
              <p className="text-xl text-muted-foreground">
                We leverage cutting-edge technologies to build scalable, secure, and intelligent systems
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {techStack.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="px-6 py-3 text-base font-medium hover:shadow-md smooth-transition"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-24 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8 text-center">Who We Are</h2>
            <div className="space-y-6 text-lg text-background/90 leading-relaxed">
              <p>
                TalentNest Technologies is a forward-thinking technology company specializing in AI-powered
                platforms and enterprise IT services. We serve clients across recruitment, property management,
                and hospitality industries.
              </p>
              <p>
                Our platforms—<strong>TalentNest</strong>, <strong>TenantNest</strong>, and{" "}
                <strong>Hotel Operations AI</strong>—are trusted by leading brands including Ramada, Motel 6,
                Choice Hotels, Wyndham, and Quality Inn.
              </p>
              <p>
                Beyond our products, we provide comprehensive IT services including recruiting, software
                development, cloud engineering, and specialized hospitality IT solutions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
