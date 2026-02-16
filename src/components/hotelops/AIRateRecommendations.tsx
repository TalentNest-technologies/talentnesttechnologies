import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { rateRecommendations } from "./mockData";
import { TrendingUp, ArrowUp, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const AIRateRecommendations = () => {
  const [minRate, setMinRate] = useState([60]);
  const [maxRate, setMaxRate] = useState([300]);
  const [priceChange, setPriceChange] = useState([0]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [published, setPublished] = useState(false);

  const baseOccupancy = 78;
  const baseRevpar = 101;
  const elasticity = -0.8;
  const projectedOccupancy = Math.max(0, Math.min(100, baseOccupancy + priceChange[0] * elasticity));
  const projectedRevpar = Math.round(baseRevpar * (1 + priceChange[0] / 100) * (projectedOccupancy / baseOccupancy));

  return (
    <div className="space-y-6">
      {/* Rate Table */}
      <Card className="glass-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" /> AI Rate Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room Type</TableHead>
                <TableHead className="text-right">Current Rate</TableHead>
                <TableHead className="text-right">Recommended</TableHead>
                <TableHead className="text-right">Confidence</TableHead>
                <TableHead className="hidden md:table-cell">Reason</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rateRecommendations.map((r) => (
                <TableRow key={r.roomType}>
                  <TableCell className="font-medium">{r.roomType}</TableCell>
                  <TableCell className="text-right">${r.current}</TableCell>
                  <TableCell className="text-right">
                    <span className="text-emerald-600 font-semibold flex items-center justify-end gap-1">
                      <ArrowUp className="w-3 h-3" />${r.recommended}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="secondary" className={cn(
                      r.confidence >= 90 ? "bg-emerald-100 text-emerald-700" :
                      r.confidence >= 80 ? "bg-amber-100 text-amber-700" :
                      "bg-muted text-muted-foreground"
                    )}>
                      {r.confidence}%
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground max-w-[280px]">{r.reason}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Guardrails */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="glass-card">
          <CardContent className="p-5 space-y-4">
            <p className="font-semibold text-sm">Rate Guardrails</p>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Min Rate</span>
                <span className="font-medium">${minRate[0]}</span>
              </div>
              <Slider value={minRate} onValueChange={setMinRate} min={30} max={200} step={5} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Max Rate</span>
                <span className="font-medium">${maxRate[0]}</span>
              </div>
              <Slider value={maxRate} onValueChange={setMaxRate} min={100} max={500} step={10} />
            </div>
          </CardContent>
        </Card>

        {/* What-if Simulator */}
        <Card className="glass-card">
          <CardContent className="p-5 space-y-4">
            <p className="font-semibold text-sm">What-If Simulator</p>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Price Change</span>
                <span className="font-medium">{priceChange[0] > 0 ? "+" : ""}{priceChange[0]}%</span>
              </div>
              <Slider value={priceChange} onValueChange={setPriceChange} min={-30} max={30} step={1} />
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-muted rounded-lg p-3 text-center">
                <p className="text-2xl font-bold">{projectedOccupancy.toFixed(1)}%</p>
                <p className="text-xs text-muted-foreground">Projected Occupancy</p>
              </div>
              <div className="bg-muted rounded-lg p-3 text-center">
                <p className="text-2xl font-bold">${projectedRevpar}</p>
                <p className="text-xs text-muted-foreground">Projected RevPAR</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={() => { setPublished(false); setShowConfirm(true); }}>
          Publish Rates
        </Button>
      </div>

      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{published ? "Rates Published" : "Confirm Rate Publish"}</DialogTitle>
            <DialogDescription>
              {published
                ? "All recommended rates have been published to connected channels."
                : "You are about to publish AI-recommended rates to all connected OTA channels and PMS."}
            </DialogDescription>
          </DialogHeader>
          {published ? (
            <div className="flex flex-col items-center py-6">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-3" />
              <p className="text-sm text-muted-foreground">Rates are now live across all channels.</p>
            </div>
          ) : (
            <div className="text-sm space-y-1 text-muted-foreground">
              {rateRecommendations.map((r) => (
                <p key={r.roomType}>{r.roomType}: ${r.current} → <strong className="text-foreground">${r.recommended}</strong></p>
              ))}
            </div>
          )}
          <DialogFooter>
            {published ? (
              <Button variant="outline" onClick={() => setShowConfirm(false)}>Close</Button>
            ) : (
              <>
                <Button variant="outline" onClick={() => setShowConfirm(false)}>Cancel</Button>
                <Button onClick={() => setPublished(true)}>Confirm & Publish</Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
