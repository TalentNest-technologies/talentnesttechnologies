import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Users,
  Code,
  Cloud,
  Hotel,
  CheckCircle2,
  Shield,
  Zap,
  TrendingUp,
} from "lucide-react";
import { FloatingBackground } from "@/components/FloatingBackground";

const Services = () => {
  const services = [
    {
      icon: Users,
      title: "IT Recruiting & Contracting",
      description:
        "End-to-end talent acquisition with verified candidates across all engagement models: C2C, W2, Contract-to-Hire, and Full-time.",
      features: [
        "Data Engineering & Cloud specialists (AWS/Azure/GCP/Snowflake/Databricks)",
        "Full-stack developers (Python/FastAPI/React/Node/.NET)",
        "DevOps/SRE engineers (Kubernetes/Terraform/Jenkins)",
        "BI/Analytics experts (Power BI/Tableau/Foundry)",
        "AI/ML engineers and data scientists",
        "Identity & interview verification with anti-fraud measures",
      ],
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: Hotel,
      title: "Hospitality IT Services",
      description:
        "Specialized IT solutions for hotel operations, serving leading brands including Ramada, Motel 6, Choice Hotels, Wyndham, and Quality Inn.",
      features: [
        "Cloud & data migration for PMS/POS/accounting systems",
        "Hotel dashboards & revenue analytics with AI forecasting",
        "PMS/OTA integration & automation (Opera/Cloudbeds/ChoiceAdvantage)",
        "DevOps & infrastructure hardening with CI/CD pipelines",
        "Cybersecurity: RBAC, MFA, audit logs, encryption",
        "Custom staff applications for housekeeping, shifts, and maintenance",
      ],
      color: "from-emerald-500 to-cyan-600",
    },
    {
      icon: Code,
      title: "Software Development & Integrations",
      description:
        "Custom software solutions with modern tech stacks and seamless integrations.",
      features: [
        "Multi-tenant SaaS dashboards and APIs",
        "Mobile applications (iOS/Android)",
        "Real-time data pipelines with event streaming",
        "SSO/SAML/OAuth implementation",
        "Payment gateway integrations",
        "Webhooks & notification systems",
      ],
      color: "from-cyan-500 to-blue-600",
    },
    {
      icon: Cloud,
      title: "Cloud / DevOps / Data Engineering",
      description:
        "Enterprise-grade cloud infrastructure and data platforms that scale with your business.",
      features: [
        "Kubernetes/Docker containerization",
        "Infrastructure as Code (Terraform/CloudFormation)",
        "CI/CD automation (GitHub Actions/Jenkins)",
        "Data warehousing (Snowflake/Databricks/BigQuery)",
        "ETL/ELT pipelines with dbt and Airflow",
        "Observability with Grafana/Prometheus",
      ],
      color: "from-indigo-500 to-purple-600",
    },
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Verified Talent",
      description: "Every candidate undergoes identity verification and technical validation",
    },
    {
      icon: Zap,
      title: "Rapid Deployment",
      description: "Fast turnaround with pre-vetted professionals ready to start",
    },
    {
      icon: TrendingUp,
      title: "Proven Track Record",
      description: "Trusted by Fortune 500 companies and leading hotel chains",
    },
  ];

  return (
    <div className="min-h-screen pt-24 relative">
      <FloatingBackground variant="services" />
      {/* Hero Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6">Our Services</Badge>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
              Enterprise IT Solutions{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                That Scale
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              From talent acquisition to cloud infrastructure—we deliver end-to-end IT services with
              specialized expertise in hospitality technology.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service) => (
              <Card key={service.title} className="glass-card p-8 hover:shadow-lg smooth-transition">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6`}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-heading font-bold mb-4">{service.title}</h2>
                <p className="text-lg text-muted-foreground mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Why Choose Us</Badge>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Quality You Can Trust
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-heading font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recruiting Process */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4">Our Process</Badge>
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                How We Deliver Excellence
              </h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Discovery & Requirements",
                  description: "Deep dive into your technical needs and company culture",
                },
                {
                  step: "2",
                  title: "Sourcing & Matching",
                  description: "AI-powered candidate matching from our verified talent pool",
                },
                {
                  step: "3",
                  title: "Verification & Screening",
                  description: "Identity verification, technical assessments, and background checks",
                },
                {
                  step: "4",
                  title: "Presentation & Interviews",
                  description: "Shortlisted candidates with detailed profiles and verified credentials",
                },
                {
                  step: "5",
                  title: "Onboarding & Support",
                  description: "Seamless onboarding with continuous performance monitoring",
                },
              ].map((item) => (
                <Card key={item.step} className="glass-card p-6 flex items-start gap-6">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0 text-white font-heading font-bold text-xl">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-foreground text-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Let's Build Something Great Together
          </h2>
          <p className="text-xl text-background/80 mb-8 max-w-2xl mx-auto">
            Whether you need skilled professionals or robust IT infrastructure, we're ready to help.
          </p>
          <Button asChild variant="hero" size="lg">
            <Link to="/contact">Get Started Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Services;
