import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SidebarProvider } from "@/components/ui/sidebar";
import { HotelAISidebar } from "./HotelAISidebar";
import { HotelAIHeader } from "./HotelAIHeader";
import { useToast } from "@/hooks/use-toast";

export function DashboardLayout() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/hotel-ai/signin");
        return;
      }

      setUser(user);

      // Fetch user's businesses
      const { data: businessData, error } = await supabase
        .from("businesses")
        .select("*")
        .or(`owner_id.eq.${user.id},user_roles.user_id.eq.${user.id}`)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setBusinesses(businessData || []);
      
      // Set first business as selected by default
      if (businessData && businessData.length > 0 && !selectedBusiness) {
        setSelectedBusiness(businessData[0].id);
      }

      // If no businesses, redirect to onboarding
      if (!businessData || businessData.length === 0) {
        navigate("/hotel-ai/onboarding");
      }
    } catch (error: any) {
      toast({
        title: "Error loading data",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/hotel-ai/signin");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <HotelAISidebar />
        
        <div className="flex-1 flex flex-col">
          <HotelAIHeader
            user={user}
            businesses={businesses}
            selectedBusiness={selectedBusiness}
            onBusinessChange={setSelectedBusiness}
            onSignOut={handleSignOut}
          />
          
          <main className="flex-1 p-6 overflow-auto">
            <Outlet context={{ selectedBusiness, businesses, user }} />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
