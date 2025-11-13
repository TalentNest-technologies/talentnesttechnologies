import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Building2, ArrowRight, ArrowLeft } from "lucide-react";
import { FloatingBackground } from "@/components/FloatingBackground";
import { z } from "zod";

const businessSchema = z.object({
  name: z.string().trim().min(1, "Business name is required").max(200, "Business name too long"),
  businessType: z.string().min(1, "Business type is required"),
  email: z.string().email("Invalid email address").max(255, "Email too long").optional().or(z.literal("")),
  phone: z.string().regex(/^[\d\s\-\+\(\)]*$/, "Invalid phone number").max(20, "Phone number too long").optional().or(z.literal("")),
  website: z.string().url("Invalid URL").max(500, "URL too long").optional().or(z.literal("")),
  address: z.string().trim().max(500, "Address too long").optional().or(z.literal("")),
  city: z.string().trim().max(100, "City name too long").optional().or(z.literal("")),
  state: z.string().trim().max(100, "State name too long").optional().or(z.literal("")),
  zip: z.string().trim().max(20, "ZIP code too long").optional().or(z.literal("")),
  country: z.string().trim().max(100, "Country name too long").optional().or(z.literal("")),
  pmsSystem: z.string(),
  pmsApiKey: z.string().max(500, "API key too long").optional().or(z.literal("")),
  googleBusinessId: z.string().max(200, "Google Business ID too long").optional().or(z.literal("")),
});

export default function Onboarding() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const [businessData, setBusinessData] = useState({
    name: "",
    businessType: "hotel" as "hotel" | "restaurant" | "store" | "other",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "USA",
    phone: "",
    email: "",
    website: "",
    pmsSystem: "none" as "opera" | "cloudbeds" | "choice_advantage" | "custom" | "none",
    pmsApiKey: "",
    googleBusinessId: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setBusinessData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate all business data
      const validation = businessSchema.safeParse(businessData);
      if (!validation.success) {
        toast({
          title: "Validation Error",
          description: validation.error.errors[0].message,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error("User not authenticated");

      const { data: business, error } = await supabase
        .from("businesses")
        .insert([
          {
            owner_id: user.id,
            name: businessData.name,
            business_type: businessData.businessType,
            address: businessData.address,
            city: businessData.city,
            state: businessData.state,
            zip: businessData.zip,
            country: businessData.country,
            phone: businessData.phone,
            email: businessData.email,
            website: businessData.website,
            pms_system: businessData.pmsSystem,
            pms_api_key: businessData.pmsApiKey,
            google_business_id: businessData.googleBusinessId,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      // Delete the default role created by trigger (has NULL business_id)
      // This prevents duplicate role records
      await supabase
        .from("user_roles")
        .delete()
        .eq("user_id", user.id)
        .is("business_id", null);

      // Insert owner role with business_id
      const { error: roleError } = await supabase
        .from("user_roles")
        .insert({ 
          user_id: user.id,
          role: "owner",
          business_id: business.id
        });

      if (roleError) {
        // Rollback business creation
        await supabase.from("businesses").delete().eq("id", business.id);
        throw roleError;
      }

      toast({
        title: "Business added successfully!",
        description: "Your hotel is now set up",
      });

      navigate("/hotel-ai/dashboard");
    } catch (error: any) {
      toast({
        title: "Failed to add business",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <FloatingBackground variant="hotel" />
      
      <div className="w-full max-w-2xl space-y-8 bg-card/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-border">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Building2 className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold">Add Your Business</h2>
          <p className="text-muted-foreground mt-2">Let's set up your hotel property</p>
          
          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 w-12 rounded-full transition-colors ${
                  s <= step ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Information</h3>
              
              <div className="space-y-2">
                <Label htmlFor="name">Business Name *</Label>
                <Input
                  id="name"
                  value={businessData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Grand Hotel"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type *</Label>
                <Select
                  value={businessData.businessType}
                  onValueChange={(value) => handleInputChange("businessType", value as any)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hotel">Hotel</SelectItem>
                    <SelectItem value="restaurant">Restaurant</SelectItem>
                    <SelectItem value="store">Store</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={businessData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={businessData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="info@grandhotel.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  value={businessData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  placeholder="https://grandhotel.com"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Location</h3>
              
              <div className="space-y-2">
                <Label htmlFor="address">Street Address</Label>
                <Input
                  id="address"
                  value={businessData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="123 Main Street"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={businessData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="New York"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={businessData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    placeholder="NY"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input
                    id="zip"
                    value={businessData.zip}
                    onChange={(e) => handleInputChange("zip", e.target.value)}
                    placeholder="10001"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={businessData.country}
                    onChange={(e) => handleInputChange("country", e.target.value)}
                    placeholder="USA"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Integrations</h3>
              
              <div className="space-y-2">
                <Label htmlFor="pmsSystem">PMS System</Label>
                <Select
                  value={businessData.pmsSystem}
                  onValueChange={(value) => handleInputChange("pmsSystem", value as any)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None / Manual Entry</SelectItem>
                    <SelectItem value="opera">Oracle Opera</SelectItem>
                    <SelectItem value="cloudbeds">Cloudbeds</SelectItem>
                    <SelectItem value="choice_advantage">ChoiceAdvantage</SelectItem>
                    <SelectItem value="custom">Custom Integration</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {businessData.pmsSystem !== "none" && (
                <div className="space-y-2">
                  <Label htmlFor="pmsApiKey">PMS API Key</Label>
                  <Input
                    id="pmsApiKey"
                    type="password"
                    value={businessData.pmsApiKey}
                    onChange={(e) => handleInputChange("pmsApiKey", e.target.value)}
                    placeholder="Enter your PMS API key"
                  />
                  <p className="text-xs text-muted-foreground">
                    This will be encrypted and stored securely
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="googleBusinessId">Google Business ID (Optional)</Label>
                <Input
                  id="googleBusinessId"
                  value={businessData.googleBusinessId}
                  onChange={(e) => handleInputChange("googleBusinessId", e.target.value)}
                  placeholder="Your Google Business Profile ID"
                />
                <p className="text-xs text-muted-foreground">
                  Required for automatic review management
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-6">
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(step - 1)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
            )}

            {step < 3 ? (
              <Button
                type="button"
                onClick={() => setStep(step + 1)}
                className="ml-auto"
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" disabled={isLoading} className="ml-auto">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Setting up...
                  </>
                ) : (
                  "Complete Setup"
                )}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
