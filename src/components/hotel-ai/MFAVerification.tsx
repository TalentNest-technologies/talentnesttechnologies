import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Shield, Loader2 } from "lucide-react";

interface MFAVerificationProps {
  factorId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export function MFAVerification({ factorId, onSuccess, onCancel }: MFAVerificationProps) {
  const { toast } = useToast();
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [challengeId, setChallengeId] = useState<string>("");

  useState(() => {
    // Create MFA challenge on mount
    const createChallenge = async () => {
      try {
        const { data, error } = await supabase.auth.mfa.challenge({ factorId });
        if (error) throw error;
        if (data) {
          setChallengeId(data.id);
        }
      } catch (error: any) {
        toast({
          title: "Challenge failed",
          description: error.message,
          variant: "destructive",
        });
      }
    };
    createChallenge();
  });

  const verifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!verificationCode || verificationCode.length !== 6) {
      toast({
        title: "Invalid code",
        description: "Please enter a 6-digit code",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);
    try {
      const { error } = await supabase.auth.mfa.verify({
        factorId,
        challengeId,
        code: verificationCode,
      });

      if (error) throw error;

      toast({
        title: "Verification successful",
        description: "Welcome back!",
      });
      
      onSuccess();
    } catch (error: any) {
      toast({
        title: "Verification failed",
        description: error.message,
        variant: "destructive",
      });
      setVerificationCode("");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4 mx-auto">
          <Shield className="w-6 h-6 text-primary" />
        </div>
        <CardTitle>Two-Factor Authentication</CardTitle>
        <CardDescription>
          Enter the 6-digit code from your authenticator app
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={verifyCode} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mfa-code">Verification Code</Label>
            <Input
              id="mfa-code"
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ""))}
              placeholder="000000"
              className="text-center text-2xl tracking-widest"
              required
              autoFocus
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="flex-1" disabled={isVerifying}>
              {isVerifying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify"
              )}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
