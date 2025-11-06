import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Hotel, CheckCircle2, DollarSign, BarChart3, 
  Calendar, Users, Shield, Zap, TrendingUp, Clock
} from "lucide-react";

const ProductHotelAI = () => {
  const clients = ["Ramada", "Motel 6", "Choice Hotels", "Wyndham", "Quality Inn"];

  const modules = [
    {
      icon: BarChart3,
      title: "Real-Time Operations Dashboard",
      features: [
        "Live Room Grid: available, stay-overs, arrivals, departures, walk-ins, out-of-order",
        "Front Desk Quick Actions: early/late check-in, upgrades, comp, folio adjustments",
        "Turn status tracking for housekeeping coordination",
        "Real-time occupancy and availability visibility"
      ]
    },
    {
      icon: DollarSign,
      title: "Revenue & Rate Intelligence",
      features: [
        "AI Rate Recommendations combining historical pickup, competitor data, local events",
        "Rate Guardrails: min/max floors, length-of-stay fences, channel-specific rates",
        "What-If Simulator for price elasticity and displacement analysis",
        "One-click rate publishing (where PMS integration allows)"
      ]
    },
    {
      icon: TrendingUp,
      title: "Forecasting & Analytics",
      features: [
        "Occupancy, ADR, RevPAR, GOPPAR views with booking curves",
        "Pace vs last year comparisons and channel mix analysis",
        "Geo & Market Layers: ZIP/county/state trends, brand benchmarking",
        "Auto-generated owner packs with commentary and alerts"
      ]
    },
    {
      icon: Clock,
      title: "Night Audit Automation",
      features: [
        "End-of-Day Checks: folio mismatches, payment reconciliations, rate anomalies",
        "Tax summaries and compliance reporting",
        "Auto Reports distributed to owner/GM/auditor mailboxes",
        "Exception alerts requiring acknowledgment"
      ]
    },
    {
      icon: Users,
      title: "Housekeeping & Labor",
      features: [
        "Rosters & Blocks with auto-assign rooms and workload balancing",
        "Dirty/clean/inspected state tracking",
        "Labor Planning: forecast workload vs staffing with overtime alerts",
        "Shift management and task assignment"
      ]
    }
  ];

  const integrations = [
    { name: "Opera PMS", type: "Property Management" },
    { name: "Cloudbeds", type: "Property Management" },
    { name: "ChoiceAdvantage", type: "Property Management" },
    { name: "Booking.com", type: "OTA Channel" },
    { name: "Expedia", type: "OTA Channel" },
    { name: "POS Systems", type: "Point of Sale (Optional)" }
  ];

  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-emerald-500/10 via-cyan-500/5 to-blue-500/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6">Hospitality Intelligence Suite</Badge>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
              Hotel Operations AI
              <span className="block text-3xl md:text-4xl mt-4 bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                Revenue Optimization & Multi-Property Operations
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Multi-property operations platform with AI rate recommendations, real-time dashboards, 
              and revenue optimization—trusted by leading hotel brands.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild variant="hero" size="lg">
                <Link to="/contact">Request a Demo</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/services">See Hospitality IT Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-heading font-bold mb-4">Trusted by Leading Hotel Brands</h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 max-w-4xl mx-auto">
            {clients.map((client) => (
              <div key={client} className="glass-card px-8 py-4 rounded-lg">
                <p className="text-lg font-heading font-semibold">{client}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Modules */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Core Features</Badge>
            <h2 className="text-4xl md:text-5xl font-heading font-bold">
              Complete Hospitality Operations Platform
            </h2>
          </div>

          <div className="space-y-8 max-w-6xl mx-auto">
            {modules.map((module) => (
              <Card key={module.title} className="glass-card p-8">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center flex-shrink-0">
                    <module.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-heading font-bold mb-4">{module.title}</h3>
                    <ul className="grid md:grid-cols-2 gap-3">
                      {module.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground text-sm">{feature}</span>
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

      {/* AI Revenue Intelligence */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center mx-auto mb-6">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <Badge className="mb-4">AI-Powered</Badge>
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                Intelligent Revenue Optimization
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Machine learning models that analyze market conditions and recommend optimal rates
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Historical booking patterns and seasonal trends",
                "Competitor rate tracking and market positioning",
                "Local events and demand drivers (conferences, sports, holidays)",
                "Weather patterns and traveler behavior",
                "Channel performance and optimization",
                "Real-time demand signals and booking pace"
              ].map((factor) => (
                <div key={factor} className="flex items-start gap-3 p-6 rounded-lg bg-background glass-card">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                  <span className="text-muted-foreground">{factor}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4">Integrations</Badge>
              <h2 className="text-3xl font-heading font-bold mb-4">
                Seamless PMS & OTA Connectivity
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {integrations.map((integration) => (
                <Card key={integration.name} className="glass-card p-6 text-center">
                  <h3 className="font-heading font-bold mb-2">{integration.name}</h3>
                  <p className="text-sm text-muted-foreground">{integration.type}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Security & Roles */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-6">
              <Shield className="w-12 h-12 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-heading font-bold mb-4">Security & Role-Based Access</h3>
                <p className="text-muted-foreground mb-4">
                  Granular permissions for Owner/GM/Front-Desk/Housekeeping/Auditor roles with MFA, 
                  IP/location controls, immutable audit trails, and encrypted PMS connectors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Outcomes */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4">Business Outcomes</Badge>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-12">
              Proven Results
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { icon: TrendingUp, label: "Higher RevPAR", desc: "Smarter pricing" },
                { icon: CheckCircle2, label: "Reduced Errors", desc: "Automated audits" },
                { icon: Clock, label: "Faster Turnovers", desc: "Optimized housekeeping" },
                { icon: BarChart3, label: "Unified View", desc: "Multi-property insights" }
              ].map((outcome) => (
                <div key={outcome.label} className="text-center">
                  <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
                    <outcome.icon className="w-8 h-8 text-white" />
                  </div>
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
            Maximize Your Hotel Revenue with AI
          </h2>
          <p className="text-xl text-background/80 mb-8 max-w-2xl mx-auto">
            Join leading hotel brands using AI-powered operations and revenue intelligence.
          </p>
          <Button asChild variant="hero" size="lg">
            <Link to="/contact">Schedule a Demo</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ProductHotelAI;
