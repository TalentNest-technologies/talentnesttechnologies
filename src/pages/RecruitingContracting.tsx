import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Users, CheckCircle2, Shield, Target, Award, 
  TrendingUp, Briefcase, Search, FileCheck, UserCheck
} from "lucide-react";
import { FloatingBackground } from "@/components/FloatingBackground";

const RecruitingContracting = () => {
  const engagementModels = [
    { name: "W2", desc: "Full-time employment" },
    { name: "C2C", desc: "Corp-to-corp contractors" },
    { name: "Contract-to-Hire", desc: "Trial to permanent" },
    { name: "FTE Search", desc: "Direct placement" }
  ];

  const process = [
    {
      step: "1",
      icon: Search,
      title: "Requirement Intake",
      description: "JD deep-dive, skills/levels, budget, location policy, background requirements, start date, and interview plan"
    },
    {
      step: "2",
      icon: Users,
      title: "Sourcing & Shortlisting",
      description: "Internal bench + external channels → AI matching (skills graph, recency, domain fit) → recruiter review → shortlist within agreed SLA"
    },
    {
      step: "3",
      icon: Shield,
      title: "Authenticity & Identity Verification",
      description: "FaceID with liveness, voiceprint, IP/device fingerprint, government ID checks, education/employment validation, reference calls"
    },
    {
      step: "4",
      icon: Target,
      title: "Technical & Role Fit Evaluation",
      description: "Timed assessments, pair-programming/case studies, domain scenarios with anti-cheat measures (secure browser, tab-switch detection)"
    },
    {
      step: "5",
      icon: UserCheck,
      title: "Live Interview Validation",
      description: "Moderator validates identity at start, monitors for proxy cues, and records structured evidence with consent"
    },
    {
      step: "6",
      icon: FileCheck,
      title: "Submission Package",
      description: "Resume, skills matrix with scores, assessment artifacts, identity verification receipt, availability & rate, risk notes"
    },
    {
      step: "7",
      icon: Briefcase,
      title: "Offer, Onboarding & Compliance",
      description: "Rate/comp negotiation, e-sign, I-9/E-Verify, background/drug screening, device & access checklist, day-1 readiness"
    },
    {
      step: "8",
      icon: TrendingUp,
      title: "Post-Placement Tracking",
      description: "Performance telemetry: weekly timesheets, deliverable milestones, manager NPS, attendance/leave, skill-growth plan with escalation path and backfill guarantees"
    }
  ];

  const specializations = [
    {
      category: "Data & Cloud",
      skills: ["Azure/AWS/GCP", "Snowflake", "Databricks", "Kafka", "Airflow/dbt"]
    },
    {
      category: "Engineering",
      skills: ["Python/FastAPI", "Node/React", ".NET/Java", "Mobile (iOS/Android)"]
    },
    {
      category: "DevOps & SRE",
      skills: ["Kubernetes", "Terraform", "CI/CD", "Monitoring", "Security hardening"]
    },
    {
      category: "Analytics & BI",
      skills: ["Power BI", "Tableau", "Palantir Foundry", "SQL", "Data modeling"]
    },
    {
      category: "Quality & Testing",
      skills: ["QA/SDET", "Test automation", "Performance testing", "Security testing"]
    },
    {
      category: "Hospitality IT",
      skills: ["PMS/OTA integrations", "Revenue analytics", "Hotel data pipelines", "Operations systems"]
    }
  ];

  const metrics = [
    { label: "Submit-to-Interview Ratio", desc: "Track quality of submissions" },
    { label: "Time-to-First-Shortlist", desc: "Speed of candidate delivery" },
    { label: "Identity Verification Pass Rate", desc: "Authenticity assurance" },
    { label: "On-the-Job Retention", desc: "Long-term quality scores" },
    { label: "SLA Adherence", desc: "Communication responsiveness" }
  ];

  return (
    <div className="min-h-screen pt-24 relative">
      <FloatingBackground variant="contracting" />
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-blue-600/10 via-indigo-500/5 to-purple-500/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6">Verified Talent Delivery</Badge>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
              Recruiting & Contracting
              <span className="block text-3xl md:text-4xl mt-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Genuine, Production-Ready Candidates
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Rigorous staffing engine using TalentNest's identity verification, assessment, and tracking 
              layers to deliver verified talent to vendors and direct clients—including hospitality IT and enterprise tech.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild variant="hero" size="lg">
                <Link to="/contact">Start Hiring</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/products/talentnest">See TalentNest Platform</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Engagement Models */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">Flexible Engagement Models</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {engagementModels.map((model) => (
              <Card key={model.name} className="glass-card p-6 text-center">
                <h3 className="font-heading font-bold text-lg mb-2">{model.name}</h3>
                <p className="text-sm text-muted-foreground">{model.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Our Process</Badge>
            <h2 className="text-4xl md:text-5xl font-heading font-bold">
              End-to-End with Authenticity Controls
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {process.map((item) => (
              <Card key={item.step} className="glass-card p-6">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0 text-white font-heading font-bold text-xl">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <item.icon className="w-5 h-5 text-primary" />
                      <h3 className="text-xl font-heading font-semibold">{item.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specializations */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">We Staff</Badge>
            <h2 className="text-4xl md:text-5xl font-heading font-bold">
              Technical Specializations
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {specializations.map((spec) => (
              <Card key={spec.category} className="glass-card p-6">
                <h3 className="text-xl font-heading font-bold mb-4">{spec.category}</h3>
                <ul className="space-y-2">
                  {spec.skills.map((skill) => (
                    <li key={skill} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
                      <span className="text-sm text-muted-foreground">{skill}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-white" />
              </div>
              <Badge className="mb-4">Client Trust Signals</Badge>
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                What We Measure & Share
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {metrics.map((metric) => (
                <div key={metric.label} className="p-6 rounded-lg bg-muted/30">
                  <h3 className="font-heading font-bold mb-2">{metric.label}</h3>
                  <p className="text-sm text-muted-foreground">{metric.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-6">
              <Shield className="w-12 h-12 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-heading font-bold mb-4">Security & Compliance for Staffing Data</h3>
                <p className="text-muted-foreground">
                  Encrypted candidate vaults, strict RBAC, audit logs, GDPR/SOC2 controls, DPA templates, and vendor NDA workflow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-foreground text-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Ready to Hire Verified Talent?
          </h2>
          <p className="text-xl text-background/80 mb-8 max-w-2xl mx-auto">
            Let us deliver production-ready candidates with verified identities and proven technical skills.
          </p>
          <Button asChild variant="hero" size="lg">
            <Link to="/contact">Start Your Search</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default RecruitingContracting;
