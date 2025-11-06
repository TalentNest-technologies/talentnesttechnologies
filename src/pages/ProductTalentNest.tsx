import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Users, CheckCircle2, Shield, Brain, Briefcase, 
  GraduationCap, Code, Clock, Target, Award 
} from "lucide-react";

const ProductTalentNest = () => {
  const modules = [
    {
      icon: Users,
      title: "Recruiter & Vendor Suite (ATS)",
      features: [
        "AI Resume Parsing & Ranking with skills extraction and match scoring",
        "Job & Gig Publishing with auto-tagging and pay bands",
        "Pipeline Kanban with drag-drop stages and SLA timers",
        "Vendor Submissions with duplicate detection and compliance checks",
        "Interview Orchestration with calendar sync and panel creation",
        "Recruiting Analytics: time-to-fill, productivity, source effectiveness"
      ]
    },
    {
      icon: Target,
      title: "Candidate Hub",
      features: [
        "AI Profile Builder that imports resume and creates structured skills graph",
        "Assessments: coding, data, cloud, QA, business analysis, case interviews",
        "One-click applications with real-time status tracking",
        "Portfolio Integrations: GitHub, Behance, Kaggle, demo videos",
        "Career Guidance with resume scoring and recommended roles"
      ]
    },
    {
      icon: Code,
      title: "Freelancing Workspace",
      features: [
        "In-Browser IDE & Analytics Tools: VS Code-like editor and BI viewers",
        "Projects & Milestones with SOW templates and contract e-sign",
        "Real-time Collaboration with file versioning and client approvals",
        "Invoice generator, payout ledger, and tax documents vault"
      ]
    },
    {
      icon: Briefcase,
      title: "HRIS & Employee Services",
      features: [
        "Digital Onboarding: offer e-sign, document capture, provisioning checklists",
        "Core Records: jobs, compensation, benefits, dependents, documents, assets",
        "Time, Leave & Attendance with timesheet approvals and accrual policies",
        "Payroll-Ready Exports with connectors for common payroll systems",
        "Performance & OKRs: quarterly goals, 360 reviews, competency matrix"
      ]
    },
    {
      icon: GraduationCap,
      title: "Learning & Certification (LMS)",
      features: [
        "AI-suggested learning paths based on role gaps and job targets",
        "Live/recorded classes with auto-graded quizzes and coding sandboxes",
        "Role-based certifications with verifiable credential links",
        "Cohort Analytics: completion rates, scores, time-on-task"
      ]
    }
  ];

  const securityFeatures = [
    "FaceID + liveness verification and voiceprint authentication",
    "IP geofencing, device fingerprinting, secure browser",
    "Tab-switch detection and copy/paste monitoring",
    "Proxy detection and duplicate profile flags",
    "SSO/SAML/OAuth2, MFA, RBAC with full audit trails",
    "TLS 1.3 in transit, AES-256 at rest, GDPR/SOC2 controls"
  ];

  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-purple-500/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6">AI Recruitment Platform</Badge>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
              TalentNest
              <span className="block text-3xl md:text-4xl mt-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                AI Recruitment, HRIS & Freelance Workspace
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Unified ecosystem for recruiters, candidates, HR teams, and freelancers with ATS, HRIS, 
              Learning platform, and cloud workspace—all secured with identity verification and anti-fraud measures.
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

      {/* Who It's For */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">Who It's For</h2>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {[
              "Staffing firms & vendor partners",
              "Enterprise HR/TA teams",
              "Startups scaling quickly",
              "Universities & bootcamps",
              "Freelancers & consultants"
            ].map((audience) => (
              <Card key={audience} className="glass-card p-6 text-center">
                <Users className="w-8 h-8 mx-auto mb-3 text-primary" />
                <p className="font-medium">{audience}</p>
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
              Complete Workforce Platform
            </h2>
          </div>

          <div className="space-y-12 max-w-6xl mx-auto">
            {modules.map((module, index) => (
              <Card key={module.title} className="glass-card p-8">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center flex-shrink-0">
                    <module.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-heading font-bold mb-4">{module.title}</h3>
                    <ul className="space-y-3">
                      {module.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
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

      {/* Security & Authenticity */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <Badge className="mb-4">Enterprise Security</Badge>
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                Security & Authenticity
              </h2>
              <p className="text-lg text-muted-foreground">
                Industry-leading fraud prevention for interviews, exams, and identity verification
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {securityFeatures.map((feature) => (
                <div key={feature} className="flex items-start gap-3 p-4 rounded-lg bg-background/60">
                  <Shield className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
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
              Measurable Results
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { icon: Clock, label: "Faster Shortlists", desc: "AI-powered matching" },
                { icon: Shield, label: "Verified Identities", desc: "Zero proxy risk" },
                { icon: Target, label: "Higher Quality", desc: "Measurable performance" },
                { icon: Award, label: "Single Platform", desc: "Sourcing to performance" }
              ].map((outcome) => (
                <div key={outcome.label} className="text-center">
                  <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
                    <outcome.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-heading font-bold text-lg mb-2">{outcome.label}</h3>
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
            Transform Your Recruiting & HR Operations
          </h2>
          <p className="text-xl text-background/80 mb-8 max-w-2xl mx-auto">
            See how TalentNest's AI-powered platform can streamline your entire workforce lifecycle.
          </p>
          <Button asChild variant="hero" size="lg">
            <Link to="/contact">Schedule a Demo</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ProductTalentNest;
