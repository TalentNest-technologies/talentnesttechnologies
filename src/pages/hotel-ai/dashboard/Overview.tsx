import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { DollarSign, TrendingUp, Users, Bed, Star, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Overview() {
  const { selectedBusiness } = useOutletContext<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [kpis, setKpis] = useState({
    totalRevenue: 0,
    adr: 0,
    occupancyRate: 0,
    totalBookings: 0,
    avgRating: 0,
  });

  useEffect(() => {
    if (selectedBusiness) {
      loadDashboardData();
    }
  }, [selectedBusiness]);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      // Fetch revenue data for current month
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      
      const { data: revenueData } = await supabase
        .from("revenue_records")
        .select("*")
        .eq("business_id", selectedBusiness)
        .gte("date", startOfMonth.toISOString())
        .order("date", { ascending: false });

      const { data: bookingsData } = await supabase
        .from("bookings")
        .select("*")
        .eq("business_id", selectedBusiness)
        .gte("created_at", startOfMonth.toISOString());

      const { data: reviewsData } = await supabase
        .from("google_reviews")
        .select("rating")
        .eq("business_id", selectedBusiness);

      // Calculate KPIs
      const totalRevenue = revenueData?.reduce((sum, r) => sum + (parseFloat(String(r.total_revenue)) || 0), 0) || 0;
      const avgADR = revenueData?.reduce((sum, r) => sum + (parseFloat(String(r.adr)) || 0), 0) / (revenueData?.length || 1) || 0;
      const avgOccupancy = revenueData?.reduce((sum, r) => sum + (parseFloat(String(r.occupancy_rate)) || 0), 0) / (revenueData?.length || 1) || 0;
      const avgRating = reviewsData?.reduce((sum, r) => sum + r.rating, 0) / (reviewsData?.length || 1) || 0;

      setKpis({
        totalRevenue,
        adr: avgADR,
        occupancyRate: avgOccupancy,
        totalBookings: bookingsData?.length || 0,
        avgRating,
      });
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Sample data for charts
  const weeklyRevenueData = [
    { day: "Mon", revenue: 12500 },
    { day: "Tue", revenue: 14200 },
    { day: "Wed", revenue: 16800 },
    { day: "Thu", revenue: 15300 },
    { day: "Fri", revenue: 19500 },
    { day: "Sat", revenue: 22100 },
    { day: "Sun", revenue: 20800 },
  ];

  const channelMixData = [
    { name: "Direct", value: 35, color: "#0088FE" },
    { name: "Booking.com", value: 25, color: "#00C49F" },
    { name: "Expedia", value: 20, color: "#FFBB28" },
    { name: "Walk-ins", value: 15, color: "#FF8042" },
    { name: "Other", value: 5, color: "#8884d8" },
  ];

  const occupancyTrendData = [
    { date: "Week 1", occupancy: 75 },
    { date: "Week 2", occupancy: 82 },
    { date: "Week 3", occupancy: 88 },
    { date: "Week 4", occupancy: 85 },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-24 mb-2" />
                <Skeleton className="h-3 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground">Your hotel's performance at a glance</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${kpis.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ADR</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${kpis.adr.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Average daily rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
            <Bed className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.occupancyRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              +5.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.avgRating.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">
              From {kpis.totalBookings} reviews
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Booking Channel Mix</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={channelMixData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {channelMixData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Occupancy Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={occupancyTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="occupancy" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
