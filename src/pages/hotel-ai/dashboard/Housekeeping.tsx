import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bed, CheckCircle, Clock, AlertCircle, Users } from "lucide-react";

export default function Housekeeping() {
  const [selectedFloor, setSelectedFloor] = useState("all");

  const stats = {
    totalRooms: 120,
    cleanRooms: 85,
    dirtyRooms: 20,
    inspectionNeeded: 10,
    outOfOrder: 5,
    staffOnDuty: 12,
    avgCleanTime: 28,
  };

  const rooms = [
    { number: "101", status: "clean", floor: 1, lastCleaned: "2 hours ago", assignedTo: "Maria" },
    { number: "102", status: "dirty", floor: 1, lastCleaned: "4 hours ago", assignedTo: "John" },
    { number: "103", status: "inspection", floor: 1, lastCleaned: "1 hour ago", assignedTo: "Sarah" },
    { number: "201", status: "clean", floor: 2, lastCleaned: "3 hours ago", assignedTo: "Maria" },
    { number: "202", status: "dirty", floor: 2, lastCleaned: "5 hours ago", assignedTo: "John" },
    { number: "203", status: "clean", floor: 2, lastCleaned: "2 hours ago", assignedTo: "Sarah" },
    { number: "301", status: "ooo", floor: 3, lastCleaned: "1 day ago", assignedTo: "Maintenance" },
    { number: "302", status: "dirty", floor: 3, lastCleaned: "6 hours ago", assignedTo: "Maria" },
    { number: "303", status: "inspection", floor: 3, lastCleaned: "30 mins ago", assignedTo: "John" },
  ];

  const tasks = [
    { id: 1, room: "102", task: "Deep Clean", priority: "high", assignedTo: "John", status: "in-progress" },
    { id: 2, room: "202", task: "Standard Clean", priority: "medium", assignedTo: "Maria", status: "pending" },
    { id: 3, room: "302", task: "Turndown Service", priority: "low", assignedTo: "Sarah", status: "completed" },
    { id: 4, room: "103", task: "Inspection", priority: "high", assignedTo: "Sarah", status: "in-progress" },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      clean: { className: "bg-green-500/10 text-green-500 border-green-500/20", label: "Clean" },
      dirty: { className: "bg-red-500/10 text-red-500 border-red-500/20", label: "Dirty" },
      inspection: { className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20", label: "Inspection" },
      ooo: { className: "bg-gray-500/10 text-gray-500 border-gray-500/20", label: "Out of Order" },
    };
    return variants[status as keyof typeof variants] || variants.clean;
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      high: { className: "bg-red-500/10 text-red-500 border-red-500/20" },
      medium: { className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" },
      low: { className: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
    };
    return variants[priority as keyof typeof variants] || variants.medium;
  };

  const cleanProgress = (stats.cleanRooms / stats.totalRooms) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Housekeeping Management</h1>
        <p className="text-muted-foreground">Track room status and housekeeping tasks</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clean Rooms</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.cleanRooms}/{stats.totalRooms}</div>
            <Progress value={cleanProgress} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Needs Cleaning</CardTitle>
            <Bed className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.dirtyRooms}</div>
            <p className="text-xs text-muted-foreground">Priority rooms</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Clean Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgCleanTime} min</div>
            <p className="text-xs text-muted-foreground">Per room</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Staff on Duty</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.staffOnDuty}</div>
            <p className="text-xs text-muted-foreground">Active today</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="rooms" className="space-y-4">
        <TabsList>
          <TabsTrigger value="rooms">Room Status</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
        </TabsList>

        <TabsContent value="rooms" className="space-y-4">
          <div className="flex gap-2 mb-4">
            <Button
              variant={selectedFloor === "all" ? "default" : "outline"}
              onClick={() => setSelectedFloor("all")}
            >
              All Floors
            </Button>
            {[1, 2, 3].map((floor) => (
              <Button
                key={floor}
                variant={selectedFloor === floor.toString() ? "default" : "outline"}
                onClick={() => setSelectedFloor(floor.toString())}
              >
                Floor {floor}
              </Button>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {rooms
              .filter((r) => selectedFloor === "all" || r.floor.toString() === selectedFloor)
              .map((room) => (
                <Card key={room.number}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Room {room.number}</CardTitle>
                      <Badge variant="outline" className={getStatusBadge(room.status).className}>
                        {getStatusBadge(room.status).label}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-sm text-muted-foreground">
                      <p>Assigned: {room.assignedTo}</p>
                      <p>Last cleaned: {room.lastCleaned}</p>
                    </div>
                    {room.status === "dirty" && (
                      <Button size="sm" className="w-full">
                        Start Cleaning
                      </Button>
                    )}
                    {room.status === "inspection" && (
                      <Button size="sm" variant="outline" className="w-full">
                        Complete Inspection
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <div className="space-y-4">
            {tasks.map((task) => (
              <Card key={task.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <CardTitle className="text-base">Room {task.room}</CardTitle>
                      <Badge variant="outline" className={getPriorityBadge(task.priority).className}>
                        {task.priority}
                      </Badge>
                      <Badge variant="secondary">{task.status}</Badge>
                    </div>
                    <Button size="sm" variant="outline">View Details</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{task.task}</p>
                      <p className="text-sm text-muted-foreground">Assigned to: {task.assignedTo}</p>
                    </div>
                    {task.status === "pending" && (
                      <Button>Start Task</Button>
                    )}
                    {task.status === "in-progress" && (
                      <Button variant="outline">Complete</Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="staff" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Staff Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Staff management features coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
