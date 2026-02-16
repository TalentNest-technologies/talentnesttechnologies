import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LiveOpsDashboard } from "./LiveOpsDashboard";
import { AIRateRecommendations } from "./AIRateRecommendations";
import { NightAudit } from "./NightAudit";
import { MultiPropertyInsights } from "./MultiPropertyInsights";
import { BarChart3, DollarSign, Moon, Building2 } from "lucide-react";

export const HotelOpsInteractiveDemo = () => {
  return (
    <div className="w-full rounded-2xl border bg-card/50 backdrop-blur-sm shadow-lg overflow-hidden">
      {/* Demo chrome bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-foreground/5 border-b">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-amber-400" />
          <span className="w-3 h-3 rounded-full bg-emerald-400" />
        </div>
        <span className="text-xs text-muted-foreground ml-2 font-mono">hotel-ops.talentnest.app/dashboard</span>
      </div>

      <div className="p-4 md:p-6">
        <Tabs defaultValue="ops" className="w-full">
          <TabsList className="w-full justify-start flex-wrap h-auto gap-1 bg-muted/50 p-1">
            <TabsTrigger value="ops" className="gap-1.5 text-xs sm:text-sm">
              <BarChart3 className="w-4 h-4" /> Live Ops Dashboard
            </TabsTrigger>
            <TabsTrigger value="rates" className="gap-1.5 text-xs sm:text-sm">
              <DollarSign className="w-4 h-4" /> AI Rate Recommendations
            </TabsTrigger>
            <TabsTrigger value="audit" className="gap-1.5 text-xs sm:text-sm">
              <Moon className="w-4 h-4" /> Night Audit
            </TabsTrigger>
            <TabsTrigger value="multi" className="gap-1.5 text-xs sm:text-sm">
              <Building2 className="w-4 h-4" /> Multi-Property Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ops" className="mt-4">
            <LiveOpsDashboard />
          </TabsContent>
          <TabsContent value="rates" className="mt-4">
            <AIRateRecommendations />
          </TabsContent>
          <TabsContent value="audit" className="mt-4">
            <NightAudit />
          </TabsContent>
          <TabsContent value="multi" className="mt-4">
            <MultiPropertyInsights />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
