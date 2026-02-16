import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { multiPropertyData, alerts } from "./mockData";
import { AlertTriangle, Info, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const alertIcons = {
  warning: AlertTriangle,
  error: AlertTriangle,
  info: Info,
};

const alertStyles = {
  warning: "border-amber-500/30 bg-amber-500/10",
  error: "border-destructive/30 bg-destructive/10",
  info: "border-primary/30 bg-primary/10",
};

export const MultiPropertyInsights = () => {
  const [region, setRegion] = useState("all");

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex gap-3">
        <Select value={region} onValueChange={setRegion}>
          <SelectTrigger className="w-[180px]"><SelectValue placeholder="Region" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Regions</SelectItem>
            <SelectItem value="north-nj">North NJ</SelectItem>
            <SelectItem value="central-nj">Central NJ</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Comparison Table */}
      <Card className="glass-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" /> Portfolio Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead className="text-right">Occupancy</TableHead>
                <TableHead className="text-right">ADR</TableHead>
                <TableHead className="text-right">RevPAR</TableHead>
                <TableHead className="text-right">Pace vs LY</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {multiPropertyData.map((p) => (
                <TableRow key={p.property}>
                  <TableCell className="font-medium">{p.property}</TableCell>
                  <TableCell className="text-right">{p.occupancy}%</TableCell>
                  <TableCell className="text-right">${p.adr}</TableCell>
                  <TableCell className="text-right">${p.revpar}</TableCell>
                  <TableCell className="text-right">
                    <span className={cn(
                      "font-semibold",
                      p.paceVsLY.startsWith("+") ? "text-emerald-600" : "text-destructive"
                    )}>
                      {p.paceVsLY}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Alerts Panel */}
      <Card className="glass-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Active Alerts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {alerts.map((alert, i) => {
            const Icon = alertIcons[alert.type];
            return (
              <div key={i} className={cn("flex items-start gap-3 p-3 rounded-lg border", alertStyles[alert.type])}>
                <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm">{alert.message}</p>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};
