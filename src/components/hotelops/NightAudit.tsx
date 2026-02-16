import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { auditItems } from "./mockData";
import { CheckCircle2, XCircle, ChevronDown, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export const NightAudit = () => {
  const [showOwnerPack, setShowOwnerPack] = useState(false);

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardContent className="p-6 space-y-2">
          <p className="font-semibold text-lg font-heading mb-4">Night Audit Checklist</p>
          {auditItems.map((item) => (
            <Collapsible key={item.id}>
              <CollapsibleTrigger className="flex items-center w-full gap-3 p-3 rounded-lg hover:bg-muted smooth-transition text-left">
                {item.status === "pass" ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                )}
                <span className="flex-1 font-medium text-sm">{item.label}</span>
                <Badge variant={item.status === "pass" ? "secondary" : "destructive"} className="text-xs">
                  {item.status === "pass" ? "Pass" : "Action Needed"}
                </Badge>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="ml-8 mr-4 mb-3 p-3 bg-muted rounded-lg text-sm text-muted-foreground">
                  {item.detail}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={() => setShowOwnerPack(true)} className="gap-2">
          <FileText className="w-4 h-4" /> Generate Owner Pack (PDF)
        </Button>
      </div>

      <Dialog open={showOwnerPack} onOpenChange={setShowOwnerPack}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" /> Owner Pack Preview
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm max-h-[400px] overflow-y-auto">
            <div>
              <p className="font-semibold text-base">Daily Performance Summary</p>
              <p className="text-muted-foreground">February 15, 2026 — Ramada Jersey City</p>
            </div>
            <Separator />
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-lg font-bold">78%</p>
                <p className="text-xs text-muted-foreground">Occupancy</p>
              </div>
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-lg font-bold">$129</p>
                <p className="text-xs text-muted-foreground">ADR</p>
              </div>
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-lg font-bold">$101</p>
                <p className="text-xs text-muted-foreground">RevPAR</p>
              </div>
            </div>
            <Separator />
            <div>
              <p className="font-semibold">Anomalies & Exceptions</p>
              <ul className="list-disc ml-5 text-muted-foreground space-y-1 mt-1">
                <li>Room 203: $14.50 overpayment — refund recommended</li>
                <li>Room 412: Missing minibar charge of $8.00</li>
                <li>3 no-shows totaling $457 in potential cancellation fees</li>
              </ul>
            </div>
            <Separator />
            <div>
              <p className="font-semibold">Recommended Actions</p>
              <ul className="list-disc ml-5 text-muted-foreground space-y-1 mt-1">
                <li>Process refund for Room 203 overpayment</li>
                <li>Post minibar charge to Room 412 folio</li>
                <li>Apply cancellation fees per policy for no-show bookings</li>
                <li>Consider rate increase for King rooms (competitor avg $148)</li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowOwnerPack(false)}>Close</Button>
            <Button onClick={() => setShowOwnerPack(false)}>Download PDF</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
