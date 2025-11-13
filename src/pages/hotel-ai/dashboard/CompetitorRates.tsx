import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { TrendingUp, RefreshCw, Plus, Trash2, ExternalLink } from "lucide-react";
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
import { z } from "zod";

const competitorSchema = z.object({
  name: z.string().trim().min(1, "Competitor name is required").max(200, "Name too long"),
  url: z.string().url("Invalid URL format").max(1000, "URL too long"),
});

export default function CompetitorRates() {
  const { selectedBusiness, businesses } = useOutletContext<any>();
  const { toast } = useToast();
  const [rates, setRates] = useState<any[]>([]);
  const [competitors, setCompetitors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isScraping, setIsScraping] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newCompetitor, setNewCompetitor] = useState({
    name: "",
    url: "",
  });

  const business = businesses?.find((b: any) => b.id === selectedBusiness);

  useEffect(() => {
    if (selectedBusiness) {
      fetchRates();
      loadCompetitors();
    }
  }, [selectedBusiness]);

  const fetchRates = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("competitor_rates")
        .select("*")
        .eq("business_id", selectedBusiness)
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) throw error;
      setRates(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading rates",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadCompetitors = () => {
    const stored = localStorage.getItem(`competitors_${selectedBusiness}`);
    if (stored) {
      setCompetitors(JSON.parse(stored));
    }
  };

  const saveCompetitors = (newCompetitors: any[]) => {
    localStorage.setItem(`competitors_${selectedBusiness}`, JSON.stringify(newCompetitors));
    setCompetitors(newCompetitors);
  };

  const handleAddCompetitor = () => {
    // Validate competitor data
    const validation = competitorSchema.safeParse(newCompetitor);
    if (!validation.success) {
      toast({
        title: "Validation Error",
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    const updated = [...competitors, { ...newCompetitor, id: Date.now().toString() }];
    saveCompetitors(updated);
    setNewCompetitor({ name: "", url: "" });
    setIsAddOpen(false);
    toast({
      title: "Competitor added",
      description: "The competitor has been added to your list.",
    });
  };

  const handleRemoveCompetitor = (id: number) => {
    const updated = competitors.filter(c => c.id !== id);
    saveCompetitors(updated);
    toast({
      title: "Competitor removed",
      description: "Competitor has been removed from tracking.",
    });
  };

  const handleScrapeRates = async () => {
    if (competitors.length === 0) {
      toast({
        title: "No competitors",
        description: "Please add competitors to track before scraping.",
        variant: "destructive",
      });
      return;
    }

    setIsScraping(true);
    try {
      const { data, error } = await supabase.functions.invoke('scrape-competitor-rates', {
        body: {
          business_id: selectedBusiness,
          competitors: competitors.map(c => ({ name: c.name, url: c.url })),
        },
      });

      if (error) throw error;

      const successCount = data?.results?.filter((r: any) => r.success).length || 0;
      const totalCount = data?.results?.length || 0;

      toast({
        title: "Scraping complete",
        description: `Successfully scraped ${successCount} out of ${totalCount} competitors.`,
      });

      fetchRates();
    } catch (error: any) {
      toast({
        title: "Scraping failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsScraping(false);
    }
  };

  if (!selectedBusiness) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Please select a business to view competitor rates</p>
      </div>
    );
  }

  const latestRatesByCompetitor = rates.reduce((acc: any, rate: any) => {
    if (!acc[rate.competitor_name] || new Date(rate.created_at) > new Date(acc[rate.competitor_name].created_at)) {
      acc[rate.competitor_name] = rate;
    }
    return acc;
  }, {});

  const ratesWithNumbers = Object.values(latestRatesByCompetitor).filter(
    (r: any) => r.rate && typeof r.rate === 'number'
  ) as Array<{ rate: number; [key: string]: any }>;
  
  const totalRate: number = ratesWithNumbers.reduce(
    (sum: number, r) => sum + r.rate,
    0 as number
  );
  const count: number = ratesWithNumbers.length;
  const avgCompetitorRate: number = count > 0 ? totalRate / count : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Competitor Rate Intelligence</h1>
          <p className="text-muted-foreground">
            Track and compare pricing from competing hotels and OTAs
          </p>
        </div>

        <div className="flex gap-2">
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Competitor
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Competitor</DialogTitle>
                <DialogDescription>
                  Add a competitor hotel or OTA listing URL to track their pricing
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="competitor-name">Competitor Name</Label>
                  <Input
                    id="competitor-name"
                    placeholder="e.g., Marriott Downtown"
                    value={newCompetitor.name}
                    onChange={(e) => setNewCompetitor({ ...newCompetitor, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="competitor-url">OTA Listing URL</Label>
                  <Input
                    id="competitor-url"
                    type="url"
                    placeholder="https://www.booking.com/hotel/..."
                    value={newCompetitor.url}
                    onChange={(e) => setNewCompetitor({ ...newCompetitor, url: e.target.value })}
                  />
                  <p className="text-sm text-muted-foreground">
                    Paste the Booking.com, Expedia, or direct hotel website URL
                  </p>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddCompetitor}>Add Competitor</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button onClick={handleScrapeRates} disabled={isScraping || competitors.length === 0}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isScraping ? 'animate-spin' : ''}`} />
            {isScraping ? 'Scraping...' : 'Scrape Rates'}
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tracked Competitors</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{competitors.length}</div>
            <p className="text-xs text-muted-foreground">
              Active monitoring
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Competitor Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {avgCompetitorRate > 0 ? `$${avgCompetitorRate.toFixed(0)}` : 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all competitors
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {rates[0] ? new Date(rates[0].created_at).toLocaleDateString() : 'Never'}
            </div>
            <p className="text-xs text-muted-foreground">
              Most recent scrape
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tracked Competitors</CardTitle>
          <CardDescription>
            Manage the list of competitors you're tracking
          </CardDescription>
        </CardHeader>
        <CardContent>
          {competitors.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No competitors added yet. Click "Add Competitor" to start tracking.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Competitor</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>Latest Rate</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {competitors.map((competitor) => {
                  const latestRate = latestRatesByCompetitor[competitor.name];
                  return (
                    <TableRow key={competitor.id}>
                      <TableCell className="font-medium">{competitor.name}</TableCell>
                      <TableCell>
                        <a
                          href={competitor.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center gap-1"
                        >
                          View <ExternalLink className="w-3 h-3" />
                        </a>
                      </TableCell>
                      <TableCell>
                        {latestRate?.rate ? (
                          <div>
                            <span className="font-semibold">${latestRate.rate}</span>
                            {latestRate.room_type && (
                              <Badge variant="outline" className="ml-2">
                                {latestRate.room_type}
                              </Badge>
                            )}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">Not scraped yet</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveCompetitor(competitor.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Rate History</CardTitle>
          <CardDescription>
            Recent pricing data from competitor scrapes
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : rates.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No rate data available. Scrape competitor rates to see data here.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Competitor</TableHead>
                  <TableHead>Room Type</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Availability</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rates.slice(0, 20).map((rate) => (
                  <TableRow key={rate.id}>
                    <TableCell>
                      {new Date(rate.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="font-medium">{rate.competitor_name}</TableCell>
                    <TableCell>{rate.room_type || 'N/A'}</TableCell>
                    <TableCell className="font-semibold">
                      {rate.rate ? `$${rate.rate}` : 'N/A'}
                    </TableCell>
                    <TableCell>
                      {rate.availability ? (
                        <Badge
                          variant={
                            rate.availability === 'available'
                              ? 'default'
                              : rate.availability === 'sold_out'
                              ? 'destructive'
                              : 'secondary'
                          }
                        >
                          {rate.availability}
                        </Badge>
                      ) : (
                        'N/A'
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
