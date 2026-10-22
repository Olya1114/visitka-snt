import { NextResponse, type NextRequest } from "next/server"
import { fetchPbDetails } from "@/lib/egrul"

export const maxDuration = 30

export async function GET(request: NextRequest) {
  const inn = request.nextUrl.searchParams.get("inn") ?? ""
  if (!/^\d{10}$/.test(inn)) {
    return NextResponse.json({ error: "Некорректный ИНН" }, { status: 400 })
  }
  try {
    const details = await fetchPbDetails(inn)
    return NextResponse.json({ details })
  } catch {
    return NextResponse.json({ details: null })
  }
}
