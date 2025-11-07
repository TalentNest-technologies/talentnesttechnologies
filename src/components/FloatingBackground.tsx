interface FloatingBackgroundProps {
  variant?: "home" | "talentnest" | "tenantnest" | "hotel" | "contracting" | "contact" | "services" | "about";
}

export const FloatingBackground = ({ variant = "home" }: FloatingBackgroundProps) => {
  const colors: Record<string, string> = {
    home: "from-primary/40 via-primary-glow/40 to-secondary/40",
    talentnest: "from-primary/40 via-primary-glow/40 to-primary/30",
    tenantnest: "from-accent/40 via-secondary/40 to-primary-glow/30",
    hotel: "from-secondary/40 via-accent/40 to-primary-glow/30",
    contracting: "from-primary-glow/40 via-primary/40 to-secondary/30",
    contact: "from-primary/30 via-primary-glow/30 to-muted/30",
    services: "from-secondary/40 via-accent/40 to-primary/30",
    about: "from-muted/30 via-primary-glow/20 to-secondary/30",
  };

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className={`animate-floatSlow blur-3xl rounded-full w-[650px] h-[650px] absolute -top-40 -left-40 bg-gradient-to-br ${colors[variant]}`} />
      <div className={`animate-floatMedium blur-3xl rounded-full w-[520px] h-[520px] absolute -bottom-40 -right-32 bg-gradient-to-br ${colors[variant]}`} />
      <div className={`animate-floatFast blur-3xl rounded-full w-[380px] h-[380px] absolute top-64 right-10 bg-gradient-to-br ${colors[variant]}`} />
    </div>
  );
};
