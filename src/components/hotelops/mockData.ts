export const properties = [
  { id: "ramada", name: "Ramada – Jersey City" },
  { id: "motel6", name: "Motel 6 – Newark" },
  { id: "wyndham", name: "Wyndham – Secaucus" },
  { id: "choice", name: "Choice – Edison" },
];

export type RoomStatus = "available" | "occupied" | "stayover" | "arrival" | "departure" | "out-of-order";
export type HKStatus = "clean" | "dirty" | "inspected";

export interface Room {
  id: string;
  number: string;
  floor: number;
  type: string;
  status: RoomStatus;
  hkStatus: HKStatus;
  guest?: string;
  rate?: number;
  notes?: string;
}

const guestNames = [
  "James Wilson", "Maria Garcia", "Chen Wei", "Sarah Johnson", "Ahmed Hassan",
  "Emily Davis", "Robert Kim", "Lisa Patel", "Michael Brown", "Anna Kowalski",
  "David Lee", "Rachel Torres", "Thomas Müller", "Priya Sharma", "John O'Brien",
];

const roomTypes = ["King", "Double Queen", "Suite", "King Deluxe", "Double"];

export const generateRooms = (): Room[] => {
  const statuses: RoomStatus[] = ["available", "occupied", "stayover", "arrival", "departure", "out-of-order"];
  const hkStatuses: HKStatus[] = ["clean", "dirty", "inspected"];
  const rooms: Room[] = [];

  for (let i = 0; i < 28; i++) {
    const floor = Math.floor(i / 7) + 1;
    const roomNum = `${floor}${String((i % 7) + 1).padStart(2, "0")}`;
    const status = statuses[Math.floor(Math.random() * 100) % statuses.length];
    const isOccupied = ["occupied", "stayover", "arrival"].includes(status);

    rooms.push({
      id: `room-${i}`,
      number: roomNum,
      floor,
      type: roomTypes[i % roomTypes.length],
      status,
      hkStatus: status === "available" ? "clean" : hkStatuses[Math.floor(Math.random() * 3)],
      guest: isOccupied ? guestNames[i % guestNames.length] : undefined,
      rate: isOccupied ? 89 + Math.floor(Math.random() * 120) : undefined,
      notes: i % 5 === 0 ? "VIP guest — late checkout approved" : undefined,
    });
  }
  return rooms;
};

export const kpiData: Record<string, { occupancy: number; adr: number; revpar: number; arrivals: number; departures: number; ooo: number }> = {
  ramada: { occupancy: 78, adr: 129, revpar: 101, arrivals: 12, departures: 8, ooo: 2 },
  motel6: { occupancy: 85, adr: 72, revpar: 61, arrivals: 18, departures: 14, ooo: 1 },
  wyndham: { occupancy: 71, adr: 159, revpar: 113, arrivals: 9, departures: 11, ooo: 3 },
  choice: { occupancy: 82, adr: 94, revpar: 77, arrivals: 15, departures: 10, ooo: 0 },
};

export const rateRecommendations = [
  { roomType: "King", current: 129, recommended: 142, confidence: 91, reason: "Competitor avg $148; local convention drives +18% demand" },
  { roomType: "Double Queen", current: 109, recommended: 119, confidence: 87, reason: "Weekend pickup pace 22% above LY; supply tightening" },
  { roomType: "Suite", current: 219, recommended: 239, confidence: 78, reason: "Only 3 suites left; similar hotels sold out at $250+" },
];

export const auditItems = [
  { id: "folio", label: "Folio Mismatches", status: "pass" as const, detail: "All 142 folios balanced. No variance detected." },
  { id: "payment", label: "Payment Reconciliation", status: "fail" as const, detail: "2 discrepancies found: Room 203 ($14.50 overpayment), Room 412 ($8.00 missing minibar charge)." },
  { id: "rate", label: "Rate Anomalies", status: "pass" as const, detail: "All published rates within guardrail bounds. No override flags." },
  { id: "tax", label: "Tax Summary", status: "pass" as const, detail: "State tax $1,842.16, City occupancy tax $612.40, Tourism levy $204.80. Totals reconciled." },
  { id: "noshow", label: "No-Show Review", status: "fail" as const, detail: "3 no-shows: Booking #8821 (King, $129), #8834 (Suite, $219), #8847 (Double, $109). Cancellation fees pending." },
];

export const multiPropertyData = [
  { property: "Ramada – Jersey City", occupancy: 78, adr: 129, revpar: 101, paceVsLY: "+6.2%" },
  { property: "Motel 6 – Newark", occupancy: 85, adr: 72, revpar: 61, paceVsLY: "+12.1%" },
  { property: "Wyndham – Secaucus", occupancy: 71, adr: 159, revpar: 113, paceVsLY: "-2.4%" },
  { property: "Choice – Edison", occupancy: 82, adr: 94, revpar: 77, paceVsLY: "+8.7%" },
];

export const alerts = [
  { type: "warning" as const, message: "Pickup spike detected at Motel 6 – Newark for Mar 22–24" },
  { type: "error" as const, message: "Competitor undercutting rates: Quality Inn Edison at $79 (your rate $94)" },
  { type: "info" as const, message: "IEEE Conference (Mar 20-23) expected to drive 400+ room nights in region" },
];
