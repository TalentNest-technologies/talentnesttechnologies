import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Building2, CheckCircle2, CreditCard, Wrench, 
  BarChart3, FileCheck, Bell, TrendingUp, Users
} from "lucide-react";

const ProductTenantNest = () => {
  const modules = [
    {
      icon: FileCheck,
      title: "Onboarding & Leasing",
      features: [
        "KYC & Screening: ID checks, credit/background integrations, income proof & references",
        "Digital Leases with e-sign, clause library, auto-generated addendums",
        "Renewal workflows and lease templates",
        "Move-In/Out Checklists with photos, damage logs, and deposit tracking"
      ]
    },
    {
      icon: CreditCard,
      title: "Rent & Accounting",
      features: [
        "ACH/Card Payments with autopay, proration, and partial payment support",
        "Automated reminders and dunning with payment plans and NSF retries",
        "Owner Statements with cash flow reports and T-accounts export",
        "QuickBooks-ready files with GL category mapping"
      ]
    },
    {
      icon: Wrench,
      title: "Maintenance & Vendors",
      features: [
        "Tenant Ticketing with photos/video submission and priority/SLA tracking",
        "Work Orders & Costs: parts/labor tracking, approvals, invoice matching",
        "Vendor assignment and live status updates",
        "Warranty and repeat-issue detection"
      ]
    },
    {
      icon: BarChart3,
      title: "Portfolio Analytics",
      features: [
        "Occupancy & Turnover views at unit-level and building-level",
        "Time-to-lease metrics and vacancy aging reports",
        "AI Forecasting: rent trends, seasonal demand, delinquency risk",
        "Suggested price bands per unit type",
        "Compliance Vault: inspections, notices, safety certificates, audit logs"
      ]
    }
  ];

  const stakeholders = [
    { icon: Building2, label: "Property Owners", desc: "Multi-property insights" },
    { icon: Users, label: "Property Managers", desc: "Daily operations" },
    { icon: Bell, label: "Tenants", desc: "Self-service portal" },
    { icon: Wrench, label: "Maintenance Vendors", desc: "Work order system" }
  ];

  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-cyan-500/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6">Property Management Platform</Badge>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
              TenantNest
              <span className="block text-3xl md:text-4xl mt-4 bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                Smart Property & Tenant Management
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Cloud suite for landlords, tenants, and property managers with AI-driven insights 
              and automation for the entire rental lifecycle.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild variant="hero" size="lg">
                <Link to="/contact">Request a Demo</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/products">See All Products</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stakeholders */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">Built for Every Stakeholder</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {stakeholders.map((stakeholder) => (
              <Card key={stakeholder.label} className="glass-card p-6 text-center">
                <stakeholder.icon className="w-10 h-10 mx-auto mb-3 text-primary" />
                <h3 className="font-heading font-bold mb-2">{stakeholder.label}</h3>
                <p className="text-sm text-muted-foreground">{stakeholder.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Core Modules */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Core Modules</Badge>
            <h2 className="text-4xl md:text-5xl font-heading font-bold">
              Complete Rental Lifecycle Automation
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {modules.map((module) => (
              <Card key={module.title} className="glass-card p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center flex-shrink-0">
                    <module.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold">{module.title}</h3>
                </div>
                <ul className="space-y-3">
                  {module.features.map((feature) => (
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

      {/* AI Forecasting */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <Badge className="mb-4">Predictive Analytics</Badge>
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                AI-Powered Insights
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Make data-driven decisions with machine learning forecasts
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Rent trend analysis and optimal pricing recommendations",
                "Seasonal demand patterns and vacancy predictions",
                "Delinquency risk scoring and early warning alerts",
                "Market comparisons and competitive positioning"
              ].map((insight) => (
                <div key={insight} className="flex items-start gap-3 p-6 rounded-lg bg-background glass-card">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                  <span className="text-muted-foreground">{insight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Security & Privacy */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-heading font-bold mb-6">Security & Privacy</h3>
            <p className="text-muted-foreground mb-6">
              MFA, role-based access control (Owner/PM/Tenant/Vendor), encrypted documents, 
              PII masking, comprehensive audit logs, and data-sharing controls for external accountants or inspectors.
            </p>
          </div>
        </div>
      </section>

      {/* Business Outcomes */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4">Business Outcomes</Badge>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-12">
              Drive Better Results
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { label: "Lower Delinquency", desc: "Automated reminders & plans" },
                { label: "Faster Turnaround", desc: "Streamlined maintenance" },
                { label: "Clear Communication", desc: "Unified stakeholder platform" },
                { label: "Higher NOI", desc: "AI pricing optimization" }
              ].map((outcome) => (
                <div key={outcome.label} className="text-center">
                  <div className="text-4xl font-heading font-bold text-primary mb-2">✓</div>
                  <h3 className="font-heading font-bold mb-2">{outcome.label}</h3>
                  <p className="text-sm text-muted-foreground">{outcome.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-foreground text-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Automate Your Property Management
          </h2>
          <p className="text-xl text-background/80 mb-8 max-w-2xl mx-auto">
            Discover how TenantNest can reduce vacancies, improve cash flow, and delight your tenants.
          </p>
          <Button asChild variant="hero" size="lg">
            <Link to="/contact">Schedule a Demo</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ProductTenantNest;
