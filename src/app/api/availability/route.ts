import { NextResponse } from "next/server";
import { getAvailableDays } from "@/lib/booking/slots";
import { getService } from "@/lib/config/services";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const serviceId = searchParams.get("serviceId");

  if (!serviceId || !getService(serviceId)) {
    return NextResponse.json({ error: "Choose a valid service." }, { status: 400 });
  }

  const days = await getAvailableDays(serviceId);
  return NextResponse.json({ days });
}
