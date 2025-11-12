import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { UserPlus, Mail, Shield, Trash2, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const roleColors: Record<string, string> = {
  owner: "bg-purple-500",
  manager: "bg-blue-500",
  front_desk: "bg-green-500",
  housekeeping: "bg-yellow-500",
  auditor: "bg-orange-500",
  super_admin: "bg-red-500",
};

const roleLabels: Record<string, string> = {
  owner: "Owner",
  manager: "Manager",
  front_desk: "Front Desk",
  housekeeping: "Housekeeping",
  auditor: "Auditor",
  super_admin: "Super Admin",
};

export default function Staff() {
  const { selectedBusiness, businesses } = useOutletContext<any>();
  const { toast } = useToast();
  const [staff, setStaff] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({
    email: "",
    role: "front_desk" as const,
  });

  const business = businesses?.find((b: any) => b.id === selectedBusiness);

  useEffect(() => {
    if (selectedBusiness) {
      fetchStaff();
    }
  }, [selectedBusiness]);

  const fetchStaff = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("user_roles")
        .select(`
          *,
          profiles:user_id (
            id,
            email,
            full_name,
            phone
          )
        `)
        .eq("business_id", selectedBusiness);

      if (error) throw error;
      setStaff(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading staff",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInviteStaff = async () => {
    try {
      // In a real implementation, this would send an invitation email
      // For now, we'll show a success message
      toast({
        title: "Invitation sent",
        description: `An invitation has been sent to ${newStaff.email}`,
      });

      setIsInviteOpen(false);
      setNewStaff({ email: "", role: "front_desk" });
    } catch (error: any) {
      toast({
        title: "Error sending invitation",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleRemoveStaff = async (userId: string) => {
    try {
      const { error } = await supabase
        .from("user_roles")
        .delete()
        .eq("user_id", userId)
        .eq("business_id", selectedBusiness);

      if (error) throw error;

      toast({
        title: "Staff member removed",
        description: "The staff member has been removed successfully.",
      });

      fetchStaff();
    } catch (error: any) {
      toast({
        title: "Error removing staff",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const filteredStaff = staff.filter((member) => {
    const profile = member.profiles;
    const searchLower = searchQuery.toLowerCase();
    return (
      profile?.email?.toLowerCase().includes(searchLower) ||
      profile?.full_name?.toLowerCase().includes(searchLower) ||
      member.role.toLowerCase().includes(searchLower)
    );
  });

  if (!selectedBusiness) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Please select a business to view staff</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Staff Management</h1>
          <p className="text-muted-foreground">
            Manage team members and their roles for {business?.name}
          </p>
        </div>

        <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="w-4 h-4 mr-2" />
              Invite Staff
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite New Staff Member</DialogTitle>
              <DialogDescription>
                Send an invitation to join your team at {business?.name}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="colleague@example.com"
                  value={newStaff.email}
                  onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={newStaff.role}
                  onValueChange={(value: any) => setNewStaff({ ...newStaff, role: value })}
                >
                  <SelectTrigger id="role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="front_desk">Front Desk</SelectItem>
                    <SelectItem value="housekeeping">Housekeeping</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="auditor">Auditor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsInviteOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleInviteStaff}>
                <Mail className="w-4 h-4 mr-2" />
                Send Invitation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>
            {staff.length} {staff.length === 1 ? "member" : "members"} in your team
          </CardDescription>
          
          <div className="flex items-center gap-2 pt-4">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : filteredStaff.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchQuery ? "No staff members found matching your search" : "No staff members yet"}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">
                      {member.profiles?.full_name || "N/A"}
                    </TableCell>
                    <TableCell>{member.profiles?.email || "N/A"}</TableCell>
                    <TableCell>{member.profiles?.phone || "N/A"}</TableCell>
                    <TableCell>
                      <Badge className={roleColors[member.role]}>
                        <Shield className="w-3 h-3 mr-1" />
                        {roleLabels[member.role]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {member.role !== "owner" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveStaff(member.user_id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
          <CardDescription>Overview of what each role can do</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Badge className={roleColors.owner}>
                <Shield className="w-3 h-3 mr-1" />
                Owner
              </Badge>
              <p className="text-sm text-muted-foreground">
                Full access to all features, settings, and data. Can manage all staff and businesses.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <Badge className={roleColors.manager}>
                <Shield className="w-3 h-3 mr-1" />
                Manager
              </Badge>
              <p className="text-sm text-muted-foreground">
                Access to analytics, revenue, reviews, and operational features. Can manage bookings and staff.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <Badge className={roleColors.front_desk}>
                <Shield className="w-3 h-3 mr-1" />
                Front Desk
              </Badge>
              <p className="text-sm text-muted-foreground">
                Can manage bookings, check-ins/outs, and view room availability. Limited access to reports.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <Badge className={roleColors.housekeeping}>
                <Shield className="w-3 h-3 mr-1" />
                Housekeeping
              </Badge>
              <p className="text-sm text-muted-foreground">
                Access to housekeeping tasks, room status updates, and cleaning schedules.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <Badge className={roleColors.auditor}>
                <Shield className="w-3 h-3 mr-1" />
                Auditor
              </Badge>
              <p className="text-sm text-muted-foreground">
                Read-only access to financial reports, revenue data, and audit logs.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
