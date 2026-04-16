import { NextRequest, NextResponse } from "next/server";
import { ZODIAC_SIGNS, ZodiacSign } from "@/lib/types/horoscope";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ period: string }> }
) {
  const { period } = await params;
  const searchParams = request.nextUrl.searchParams;
  const sign = searchParams.get("sign")?.toLowerCase();

  const baseUrl = process.env.HOROSCOPE_API_BASE_URL;
  if (!baseUrl) {
    return NextResponse.json(
      { error: "API configuration missing." },
      { status: 500 }
    );
  }

  // Case 1: Fetch list of signs
  if (period === "signs") {
    return NextResponse.json(ZODIAC_SIGNS);
  }

  // Case 2: Fetch combined reading
  if (period === "all") {
    // Validate sign for "all"
    if (!sign || !ZODIAC_SIGNS.includes(sign as ZodiacSign)) {
      return NextResponse.json(
        { error: "Invalid or missing zodiac sign." },
        { status: 400 }
      );
    }

    try {
      const fetchPeriods = ["daily", "weekly", "monthly"];
      const requests = fetchPeriods.map((p) =>
        fetch(`${baseUrl}/get-horoscope/${p}?sign=${sign}`).then((res) => {
          if (!res.ok) throw new Error(`Failed to fetch ${p} data`);
          return res.json();
        })
      );

      const [daily, weekly, monthly] = await Promise.all(requests);

      return NextResponse.json({
        sign,
        daily,
        weekly,
        monthly,
      });
    } catch (error) {
      console.error("Combined Horoscope API Error:", error);
      return NextResponse.json(
        { error: "Failed to fetch aggregated horoscope data." },
        { status: 500 }
      );
    }
  }

  // Case 3: Specific periods (daily, weekly, monthly)
  const validPeriods = ["daily", "weekly", "monthly"];
  if (!validPeriods.includes(period)) {
    return NextResponse.json(
      { error: "Invalid period. Use daily, weekly, monthly, all, or signs." },
      { status: 400 }
    );
  }

  // Validate sign for specific periods
  if (!sign || !ZODIAC_SIGNS.includes(sign as ZodiacSign)) {
    return NextResponse.json(
      { error: "Invalid or missing zodiac sign." },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`${baseUrl}/get-horoscope/${period}?sign=${sign}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch from external API: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Horoscope API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch horoscope data." },
      { status: 500 }
    );
  }
}
