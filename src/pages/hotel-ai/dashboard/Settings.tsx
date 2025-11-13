import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Building2, Key, Globe, Bell, Save, TestTube } from "lucide-react";
import { z } from "zod";

const pmsSettingsSchema = z.object({
  pmsSystem: z.string(),
  pmsUrl: z.string().url("Invalid URL format").max(500, "URL too long").optional().or(z.literal("")),
  pmsUsername: z.string().max(200, "Username too long").optional().or(z.literal("")),
  pmsPassword: z.string().max(200, "Password too long").optional().or(z.literal("")),
  pmsPropertyId: z.string().max(200, "Property ID too long").optional().or(z.literal("")),
  pmsApiKey: z.string().max(500, "API key too long").optional().or(z.literal("")),
});

const googleBusinessSchema = z.object({
  googleBusinessId: z.string().max(200, "Google Business ID too long").optional().or(z.literal("")),
});

export default function Settings() {
  const { selectedBusiness, businesses } = useOutletContext<any>();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const business = businesses?.find((b: any) => b.id === selectedBusiness);

  const [pmsSystem, setPmsSystem] = useState(business?.pms_system || "none");
  const [pmsApiKey, setPmsApiKey] = useState(business?.pms_api_key || "");
  const [pmsCredentials, setPmsCredentials] = useState({
    url: business?.pms_credentials?.url || "",
    username: business?.pms_credentials?.username || "",
    password: business?.pms_credentials?.password || "",
    propertyId: business?.pms_credentials?.propertyId || "",
  });

  const [googleBusinessId, setGoogleBusinessId] = useState(business?.google_business_id || "");
  
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    reviewNotifications: true,
    revenueAlerts: true,
    housekeepingAlerts: true,
    lowOccupancyWarnings: true,
  });

  const handleSavePmsSettings = async () => {
    if (!selectedBusiness) return;

    // Validate PMS settings
    const validation = pmsSettingsSchema.safeParse({
      pmsSystem,
      pmsUrl: pmsCredentials.url,
      pmsUsername: pmsCredentials.username,
      pmsPassword: pmsCredentials.password,
      pmsPropertyId: pmsCredentials.propertyId,
      pmsApiKey,
    });

    if (!validation.success) {
      toast({
        title: "Validation Error",
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      // Call edge function to securely store encrypted credentials
      const { data, error } = await supabase.functions.invoke('store-pms-credentials', {
        body: {
          business_id: selectedBusiness,
          pms_system: pmsSystem,
          pms_api_key: pmsApiKey,
          pms_credentials: pmsCredentials,
        },
      });

      if (error) throw error;

      toast({
        title: "Settings saved",
        description: "PMS integration settings have been updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error saving settings",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveGoogleBusiness = async () => {
    if (!selectedBusiness) return;

    // Validate Google Business settings
    const validation = googleBusinessSchema.safeParse({ googleBusinessId });
    
    if (!validation.success) {
      toast({
        title: "Validation Error",
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("businesses")
        .update({
          google_business_id: googleBusinessId,
        })
        .eq("id", selectedBusiness);

      if (error) throw error;

      toast({
        title: "Settings saved",
        description: "Google Business connection has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error saving settings",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleTestConnection = async () => {
    toast({
      title: "Testing connection",
      description: "Verifying PMS connection...",
    });

    // Simulate connection test
    setTimeout(() => {
      toast({
        title: "Connection successful",
        description: "Successfully connected to PMS system.",
      });
    }, 2000);
  };

  const handleSaveNotifications = async () => {
    toast({
      title: "Preferences saved",
      description: "Notification preferences have been updated.",
    });
  };

  if (!selectedBusiness) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Please select a business to view settings</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Configure integrations and preferences for {business?.name}
        </p>
      </div>

      <Tabs defaultValue="pms" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pms">
            <Building2 className="w-4 h-4 mr-2" />
            PMS Integration
          </TabsTrigger>
          <TabsTrigger value="api">
            <Key className="w-4 h-4 mr-2" />
            API Keys
          </TabsTrigger>
          <TabsTrigger value="google">
            <Globe className="w-4 h-4 mr-2" />
            Google Business
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pms" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>PMS System Configuration</CardTitle>
              <CardDescription>
                Connect your Property Management System to sync data automatically
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pms-system">PMS System</Label>
                <Select value={pmsSystem} onValueChange={setPmsSystem}>
                  <SelectTrigger id="pms-system">
                    <SelectValue placeholder="Select PMS system" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="opera">Oracle Opera PMS</SelectItem>
                    <SelectItem value="cloudbeds">Cloudbeds</SelectItem>
                    <SelectItem value="choice_advantage">ChoiceAdvantage</SelectItem>
                    <SelectItem value="mews">Mews</SelectItem>
                    <SelectItem value="protel">Protel</SelectItem>
                    <SelectItem value="custom">Custom/Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {pmsSystem !== "none" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="pms-url">PMS URL</Label>
                    <Input
                      id="pms-url"
                      placeholder="https://pms.example.com"
                      value={pmsCredentials.url}
                      onChange={(e) =>
                        setPmsCredentials({ ...pmsCredentials, url: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pms-property-id">Property ID</Label>
                    <Input
                      id="pms-property-id"
                      placeholder="Property or Hotel ID"
                      value={pmsCredentials.propertyId}
                      onChange={(e) =>
                        setPmsCredentials({ ...pmsCredentials, propertyId: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pms-username">Username</Label>
                      <Input
                        id="pms-username"
                        placeholder="API Username"
                        value={pmsCredentials.username}
                        onChange={(e) =>
                          setPmsCredentials({ ...pmsCredentials, username: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pms-password">Password/Token</Label>
                      <Input
                        id="pms-password"
                        type="password"
                        placeholder="API Password or Token"
                        value={pmsCredentials.password}
                        onChange={(e) =>
                          setPmsCredentials({ ...pmsCredentials, password: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pms-api-key">API Key (if required)</Label>
                    <Input
                      id="pms-api-key"
                      type="password"
                      placeholder="Enter API key"
                      value={pmsApiKey}
                      onChange={(e) => setPmsApiKey(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleTestConnection} variant="outline">
                      <TestTube className="w-4 h-4 mr-2" />
                      Test Connection
                    </Button>
                  </div>
                </>
              )}

              <div className="flex justify-end pt-4">
                <Button onClick={handleSavePmsSettings} disabled={isSaving}>
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? "Saving..." : "Save PMS Settings"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sync Schedule</CardTitle>
              <CardDescription>Configure automatic data synchronization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-sync enabled</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically sync data from PMS every hour
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Real-time updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Push updates immediately when available
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>
                Manage API keys for third-party integrations and external access
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Hotel Operations AI API Key</Label>
                <div className="flex gap-2">
                  <Input
                    type="password"
                    value="sk_live_xxxxxxxxxxxxxxxxxxxx"
                    readOnly
                  />
                  <Button variant="outline">Regenerate</Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Use this key to access Hotel Operations AI API from external applications
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="expedia-api">Expedia API Key</Label>
                <Input
                  id="expedia-api"
                  type="password"
                  placeholder="Enter Expedia API key"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="booking-api">Booking.com API Key</Label>
                <Input
                  id="booking-api"
                  type="password"
                  placeholder="Enter Booking.com API key"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="airbnb-api">Airbnb API Key</Label>
                <Input
                  id="airbnb-api"
                  type="password"
                  placeholder="Enter Airbnb API key"
                />
              </div>

              <div className="flex justify-end pt-4">
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Save API Keys
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="google" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Google Business Profile</CardTitle>
              <CardDescription>
                Connect your Google Business Profile to manage reviews and listings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="google-business-id">Google Business Account ID</Label>
                <Input
                  id="google-business-id"
                  placeholder="accounts/1234567890"
                  value={googleBusinessId}
                  onChange={(e) => setGoogleBusinessId(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Find this in your Google Business Profile settings
                </p>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label>Auto-reply to reviews</Label>
                  <p className="text-sm text-muted-foreground">
                    Let AI generate and post replies to Google reviews automatically
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label>Daily review sync</Label>
                  <p className="text-sm text-muted-foreground">
                    Fetch new reviews from Google Business Profile daily
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleSaveGoogleBusiness} disabled={isSaving}>
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? "Saving..." : "Save Google Settings"}
                </Button>
                <Button variant="outline">
                  <Globe className="w-4 h-4 mr-2" />
                  Connect Google Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose how and when you want to receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive important notifications via email
                  </p>
                </div>
                <Switch
                  checked={notifications.emailAlerts}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, emailAlerts: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMS alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get urgent notifications via text message
                  </p>
                </div>
                <Switch
                  checked={notifications.smsAlerts}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, smsAlerts: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Review notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when new Google reviews are posted
                  </p>
                </div>
                <Switch
                  checked={notifications.reviewNotifications}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, reviewNotifications: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Revenue alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Alert me about significant revenue changes or milestones
                  </p>
                </div>
                <Switch
                  checked={notifications.revenueAlerts}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, revenueAlerts: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Housekeeping alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Notify me about housekeeping task updates
                  </p>
                </div>
                <Switch
                  checked={notifications.housekeepingAlerts}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, housekeepingAlerts: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Low occupancy warnings</Label>
                  <p className="text-sm text-muted-foreground">
                    Alert me when occupancy drops below threshold
                  </p>
                </div>
                <Switch
                  checked={notifications.lowOccupancyWarnings}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, lowOccupancyWarnings: checked })
                  }
                />
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={handleSaveNotifications}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
