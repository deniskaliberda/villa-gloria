import { NextRequest, NextResponse } from "next/server";
import { priceQuerySchema } from "@/lib/validations";
import { calculatePrice } from "@/lib/pricing";

export async function GET(request: NextRequest) {
  try {
    const params = Object.fromEntries(request.nextUrl.searchParams);
    const parsed = priceQuerySchema.safeParse(params);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid parameters", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const { checkIn, checkOut, propertyType, hasPet } = parsed.data;
    const breakdown = await calculatePrice(
      checkIn,
      checkOut,
      propertyType,
      hasPet
    );

    return NextResponse.json(breakdown);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
