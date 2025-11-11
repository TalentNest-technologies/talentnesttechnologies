import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { useState } from "react";

export default function Revenue() {
  const [period, setPeriod] = useState("month");

  const revenueData = [
    { date: "Jan", revenue: 42500, adr: 178, revpar: 160, goppar: 95 },
    { date: "Feb", revenue: 45800, adr: 182, revpar: 165, goppar: 98 },
    { date: "Mar", revenue: 51200, adr: 189, revpar: 172, goppar: 102 },
    { date: "Apr", revenue: 54100, adr: 195, revpar: 178, goppar: 108 },
    { date: "May", revenue: 58500, adr: 201, revpar: 185, goppar: 112 },
    { date: "Jun", revenue: 62300, adr: 208, revpar: 192, goppar: 118 },
  ];

  const roomTypeData = [
    { type: "Standard", revenue: 125000, rooms: 650 },
    { type: "Deluxe", revenue: 98500, rooms: 420 },
    { type: "Suite", revenue: 145000, rooms: 280 },
    { type: "Executive", revenue: 87000, rooms: 180 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Revenue Analytics</h1>
          <p className="text-muted-foreground">Detailed revenue insights and metrics</p>
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$314,400</div>
            <div className="flex items-center text-xs text-green-500">
              <TrendingUp className="mr-1 h-3 w-3" />
              +16.5% from last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ADR</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$192.50</div>
            <div className="flex items-center text-xs text-green-500">
              <TrendingUp className="mr-1 h-3 w-3" />
              +5.2% from last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">RevPAR</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$175.30</div>
            <div className="flex items-center text-xs text-green-500">
              <TrendingUp className="mr-1 h-3 w-3" />
              +8.7% from last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">GOPPAR</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$105.70</div>
            <div className="flex items-center text-xs text-green-500">
              <TrendingUp className="mr-1 h-3 w-3" />
              +12.3% from last period
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} name="Revenue" />
              <Line type="monotone" dataKey="adr" stroke="#82ca9d" strokeWidth={2} name="ADR" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Room Type Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue by Room Type</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={roomTypeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="hsl(var(--primary))" name="Revenue ($)" />
              <Bar dataKey="rooms" fill="#82ca9d" name="Rooms Sold" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>RevPAR Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-4">$175.30</div>
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={revenueData}>
                <Line type="monotone" dataKey="revpar" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>GOPPAR Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-4">$105.70</div>
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={revenueData}>
                <Line type="monotone" dataKey="goppar" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ADR Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-4">$192.50</div>
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={revenueData}>
                <Line type="monotone" dataKey="adr" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
