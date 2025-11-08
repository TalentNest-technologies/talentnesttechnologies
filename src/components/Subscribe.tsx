import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export const Subscribe = () => {
  const { toast } = useToast();
  const [data, setData] = useState({ name: "", phone: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // IMPORTANT: Get your Formspree ID from https://formspree.io
      // Replace 'YOUR_FORMSPREE_ID' below with your actual form ID (e.g., 'mxyz1234')
      const response = await fetch("https://formspree.io/f/YOUR_FORMSPREE_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: "Subscribed Successfully!",
          description: "Thank you for subscribing to our updates.",
        });
        setData({ name: "", phone: "", email: "" });
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      toast({
        title: "Subscription Failed",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h3 className="font-heading font-semibold mb-4 text-background">Stay Updated</h3>
      <Input
        placeholder="Name"
        value={data.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
        required
        className="bg-background/10 border-background/20 text-background placeholder:text-background/60"
      />
      <Input
        type="tel"
        placeholder="Phone Number"
        value={data.phone}
        onChange={(e) => setData({ ...data, phone: e.target.value })}
        required
        className="bg-background/10 border-background/20 text-background placeholder:text-background/60"
      />
      <Input
        type="email"
        placeholder="Email"
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
        required
        className="bg-background/10 border-background/20 text-background placeholder:text-background/60"
      />
      <Button
        type="submit"
        variant="hero"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Subscribing..." : "Subscribe"}
      </Button>
    </form>
  );
};
