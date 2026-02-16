import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { properties, generateRooms, kpiData, Room, RoomStatus, HKStatus } from "./mockData";
import { Activity, BedDouble, DollarSign, TrendingUp, LogIn, LogOut, AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib/utils";

const statusColors: Record<RoomStatus, string> = {
  available: "bg-emerald-500/20 text-emerald-700 border-emerald-500/30",
  occupied: "bg-blue-500/20 text-blue-700 border-blue-500/30",
  stayover: "bg-amber-500/20 text-amber-700 border-amber-500/30",
  arrival: "bg-cyan-500/20 text-cyan-700 border-cyan-500/30",
  departure: "bg-purple-500/20 text-purple-700 border-purple-500/30",
  "out-of-order": "bg-destructive/20 text-destructive border-destructive/30",
};

const hkColors: Record<HKStatus, string> = {
  clean: "bg-emerald-100 text-emerald-700",
  dirty: "bg-red-100 text-red-700",
  inspected: "bg-blue-100 text-blue-700",
};

export const LiveOpsDashboard = () => {
  const [property, setProperty] = useState("ramada");
  const [dateRange, setDateRange] = useState("today");
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setRooms(generateRooms());
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [property, dateRange]);

  const kpi = kpiData[property];

  const handleAction = (action: string) => {
    if (!selectedRoom) return;
    const updated = rooms.map((r) => {
      if (r.id !== selectedRoom.id) return r;
      switch (action) {
        case "clean": return { ...r, hkStatus: "clean" as HKStatus };
        case "dirty": return { ...r, hkStatus: "dirty" as HKStatus };
        case "inspected": return { ...r, hkStatus: "inspected" as HKStatus };
        case "early-checkin": return { ...r, status: "occupied" as RoomStatus };
        case "late-checkout": return { ...r, notes: (r.notes || "") + " | Late checkout approved" };
        case "comp": return { ...r, rate: 0, notes: (r.notes || "") + " | Comp room" };
        case "upgrade": return { ...r, type: "Suite", notes: (r.notes || "") + " | Upgraded" };
        default: return r;
      }
    });
    setRooms(updated);
    setSelectedRoom(updated.find((r) => r.id === selectedRoom.id) || null);
  };

  const kpis = [
    { label: "Occupancy", value: `${kpi.occupancy}%`, icon: BedDouble },
    { label: "ADR", value: `$${kpi.adr}`, icon: DollarSign },
    { label: "RevPAR", value: `$${kpi.revpar}`, icon: TrendingUp },
    { label: "Arrivals", value: String(kpi.arrivals), icon: LogIn },
    { label: "Departures", value: String(kpi.departures), icon: LogOut },
    { label: "Out-of-Order", value: String(kpi.ooo), icon: AlertTriangle },
  ];

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-3 items-center">
        <Select value={property} onValueChange={setProperty}>
          <SelectTrigger className="w-[220px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            {properties.map((p) => (
              <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="7d">Last 7 Days</SelectItem>
            <SelectItem value="30d">Last 30 Days</SelectItem>
          </SelectContent>
        </Select>
        <Badge variant="outline" className="ml-auto flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Live Updating
        </Badge>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {kpis.map((k) => (
          <Card key={k.label} className="glass-card">
            <CardContent className="p-4 text-center">
              {loading ? (
                <Skeleton className="h-12 w-full" />
              ) : (
                <>
                  <k.icon className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-2xl font-bold font-heading">{k.value}</p>
                  <p className="text-xs text-muted-foreground">{k.label}</p>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Room Grid */}
      <Card className="glass-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Room Grid</CardTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            {Object.entries(statusColors).map(([status, cls]) => (
              <span key={status} className={cn("text-xs px-2 py-0.5 rounded border capitalize", cls)}>
                {status.replace("-", " ")}
              </span>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {Array.from({ length: 28 }).map((_, i) => (
                <Skeleton key={i} className="h-14 w-full rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {rooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => setSelectedRoom(room)}
                  className={cn(
                    "p-2 rounded-lg border text-center smooth-transition hover:scale-105 cursor-pointer",
                    statusColors[room.status]
                  )}
                >
                  <span className="text-sm font-bold block">{room.number}</span>
                  <span className="text-[10px] capitalize">{room.type}</span>
                </button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Room Detail Sheet */}
      <Sheet open={!!selectedRoom} onOpenChange={() => setSelectedRoom(null)}>
        <SheetContent className="w-[380px] sm:w-[440px]">
          {selectedRoom && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center justify-between">
                  Room {selectedRoom.number}
                  <Badge className={cn("capitalize", statusColors[selectedRoom.status])}>
                    {selectedRoom.status.replace("-", " ")}
                  </Badge>
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-muted-foreground">Type:</span> <strong>{selectedRoom.type}</strong></div>
                  <div><span className="text-muted-foreground">Floor:</span> <strong>{selectedRoom.floor}</strong></div>
                  {selectedRoom.guest && (
                    <div className="col-span-2"><span className="text-muted-foreground">Guest:</span> <strong>{selectedRoom.guest}</strong></div>
                  )}
                  {selectedRoom.rate !== undefined && (
                    <div><span className="text-muted-foreground">Rate:</span> <strong>${selectedRoom.rate}/night</strong></div>
                  )}
                  <div>
                    <span className="text-muted-foreground">HK Status:</span>{" "}
                    <Badge variant="secondary" className={cn("capitalize ml-1", hkColors[selectedRoom.hkStatus])}>
                      {selectedRoom.hkStatus}
                    </Badge>
                  </div>
                </div>
                {selectedRoom.notes && (
                  <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">{selectedRoom.notes}</p>
                )}
                <Separator />
                <div>
                  <p className="text-sm font-semibold mb-3">Housekeeping</p>
                  <div className="flex gap-2 flex-wrap">
                    {(["clean", "dirty", "inspected"] as const).map((s) => (
                      <Button key={s} size="sm" variant={selectedRoom.hkStatus === s ? "default" : "outline"} onClick={() => handleAction(s)} className="capitalize">
                        Mark {s}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold mb-3">Quick Actions</p>
                  <div className="flex gap-2 flex-wrap">
                    <Button size="sm" variant="outline" onClick={() => handleAction("early-checkin")}>Early Check-in</Button>
                    <Button size="sm" variant="outline" onClick={() => handleAction("late-checkout")}>Late Checkout</Button>
                    <Button size="sm" variant="outline" onClick={() => handleAction("comp")}>Comp Room</Button>
                    <Button size="sm" variant="outline" onClick={() => handleAction("upgrade")}>Upgrade</Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};
