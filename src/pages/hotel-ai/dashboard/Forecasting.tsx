import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, DollarSign, AlertCircle, Sparkles, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Forecasting() {
  const next7Days = [
    { date: "Mon 13", occupancy: 82, forecast: 85, recommendedRate: 195, currentRate: 185, demand: "high" },
    { date: "Tue 14", occupancy: 78, forecast: 82, recommendedRate: 185, currentRate: 185, demand: "medium" },
    { date: "Wed 15", occupancy: 88, forecast: 90, recommendedRate: 205, currentRate: 195, demand: "high" },
    { date: "Thu 16", occupancy: 85, forecast: 88, recommendedRate: 198, currentRate: 195, demand: "high" },
    { date: "Fri 17", occupancy: 95, forecast: 96, recommendedRate: 225, currentRate: 210, demand: "very-high" },
    { date: "Sat 18", occupancy: 98, forecast: 99, recommendedRate: 245, currentRate: 225, demand: "very-high" },
    { date: "Sun 19", occupancy: 92, forecast: 94, recommendedRate: 215, currentRate: 205, demand: "high" },
  ];

  const competitorRates = [
    { date: "Mon", yourRate: 185, competitor1: 198, competitor2: 179, competitor3: 205 },
    { date: "Tue", yourRate: 185, competitor1: 195, competitor2: 182, competitor3: 198 },
    { date: "Wed", yourRate: 195, competitor1: 210, competitor2: 188, competitor3: 215 },
    { date: "Thu", yourRate: 195, competitor1: 205, competitor2: 192, competitor3: 210 },
    { date: "Fri", yourRate: 210, competitor1: 230, competitor2: 218, competitor3: 240 },
    { date: "Sat", yourRate: 225, competitor1: 250, competitor2: 235, competitor3: 260 },
    { date: "Sun", yourRate: 205, competitor1: 220, competitor2: 210, competitor3: 230 },
  ];

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case "very-high":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "high":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "medium":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "low":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "";
    }
  };

  const potentialRevenue = next7Days.reduce(
    (sum, day) => sum + (day.recommendedRate - day.currentRate) * (day.forecast / 100) * 120,
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI Forecasting & Pricing</h1>
          <p className="text-muted-foreground">Predictive analytics and dynamic pricing recommendations</p>
        </div>
        <Button>
          <Sparkles className="mr-2 h-4 w-4" />
          Apply AI Recommendations
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Forecast (7d)</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">88.7%</div>
            <p className="text-xs text-muted-foreground">Expected occupancy</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Opportunity</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${potentialRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">If AI rates applied</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peak Days</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Very high demand</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recommendations</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Pricing adjustments</p>
          </CardContent>
        </Card>
      </div>

      {/* 7-Day Forecast */}
      <Card>
        <CardHeader>
          <CardTitle>7-Day Occupancy Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={next7Days}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="occupancy"
                stroke="#8884d8"
                strokeWidth={2}
                name="Current Occupancy"
              />
              <Line
                type="monotone"
                dataKey="forecast"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="AI Forecast"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Pricing Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>AI Pricing Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {next7Days.map((day, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-24">
                    <p className="font-medium">{day.date}</p>
                    <p className="text-sm text-muted-foreground">{day.forecast}% forecast</p>
                  </div>
                  <Badge variant="outline" className={getDemandColor(day.demand)}>
                    {day.demand.replace("-", " ")}
                  </Badge>
                </div>

                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Rate</p>
                    <p className="text-lg font-bold">${day.currentRate}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Recommended</p>
                    <p className="text-lg font-bold text-primary">${day.recommendedRate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Potential Gain</p>
                    <p className="text-lg font-bold text-green-500">
                      +${((day.recommendedRate - day.currentRate) * (day.forecast / 100) * 120).toFixed(0)}
                    </p>
                  </div>
                  {day.recommendedRate > day.currentRate && (
                    <Button size="sm">
                      <Sparkles className="mr-2 h-3 w-3" />
                      Apply
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Competitor Rate Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Competitor Rate Intelligence</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={competitorRates}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="yourRate" stroke="hsl(var(--primary))" strokeWidth={3} name="Your Rate" />
              <Line type="monotone" dataKey="competitor1" stroke="#82ca9d" strokeWidth={2} name="Competitor A" />
              <Line type="monotone" dataKey="competitor2" stroke="#8884d8" strokeWidth={2} name="Competitor B" />
              <Line type="monotone" dataKey="competitor3" stroke="#ffc658" strokeWidth={2} name="Competitor C" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
