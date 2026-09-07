export type BookingStatus = "pending" | "confirmed" | "cancelled" | "expired";

export type Booking = {
  id: string;
  token: string;
  serviceId: string;
  serviceName: string;
  startIso: string;
  endIso: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes?: string;
  status: BookingStatus;
  depositPence: number;
  remainingPence: number;
  totalPence: number;
  stripeSessionId?: string;
  googleEventId?: string;
  createdAt: string;
  expiresAt?: string;
};
