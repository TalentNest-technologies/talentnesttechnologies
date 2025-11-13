import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Shield, Loader2 } from "lucide-react";

interface MFAEnrollmentProps {
  onComplete: () => void;
  onSkip?: () => void;
}

export function MFAEnrollment({ onComplete, onSkip }: MFAEnrollmentProps) {
  const { toast } = useToast();
  const [qrCode, setQrCode] = useState<string>("");
  const [secret, setSecret] = useState<string>("");
  const [factorId, setFactorId] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    enrollMFA();
  }, []);

  const enrollMFA = async () => {
    setIsEnrolling(true);
    try {
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: "totp",
      });

      if (error) throw error;

      if (data) {
        setQrCode(data.totp.qr_code);
        setSecret(data.totp.secret);
        setFactorId(data.id);
      }
    } catch (error: any) {
      toast({
        title: "MFA enrollment failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsEnrolling(false);
    }
  };

  const verifyMFA = async (e: React.FormEvent) => {
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
      // For enrollment, we need to challenge and verify in one step
      const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({
        factorId,
      });

      if (challengeError) throw challengeError;

      const { error } = await supabase.auth.mfa.verify({
        factorId,
        challengeId: challengeData.id,
        code: verificationCode,
      });

      if (error) throw error;

      toast({
        title: "MFA enabled!",
        description: "Your account is now protected with two-factor authentication",
      });
      
      onComplete();
    } catch (error: any) {
      toast({
        title: "Verification failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  if (isEnrolling) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4 mx-auto">
          <Shield className="w-6 h-6 text-primary" />
        </div>
        <CardTitle>Set Up Two-Factor Authentication</CardTitle>
        <CardDescription>
          Protect your account with an additional layer of security
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            <p className="mb-2">1. Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)</p>
          </div>
          
          {qrCode && (
            <div className="flex justify-center bg-white p-4 rounded-lg">
              <img src={qrCode} alt="MFA QR Code" className="w-48 h-48" />
            </div>
          )}
          
          {secret && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Or enter this code manually:</p>
              <code className="block bg-muted p-3 rounded text-sm font-mono break-all">
                {secret}
              </code>
            </div>
          )}
        </div>

        <form onSubmit={verifyMFA} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code">2. Enter the 6-digit code from your app</Label>
            <Input
              id="code"
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ""))}
              placeholder="000000"
              required
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
                "Verify & Enable"
              )}
            </Button>
            {onSkip && (
              <Button type="button" variant="outline" onClick={onSkip}>
                Skip for now
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
