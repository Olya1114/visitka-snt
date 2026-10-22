import { NextResponse, type NextRequest } from "next/server"
import { downloadExtract } from "@/lib/egrul"

export const maxDuration = 60

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("t") ?? ""
  const inn = (request.nextUrl.searchParams.get("inn") ?? "").replace(/\D/g, "")
  if (!/^[A-F0-9]{40,400}$/i.test(token)) {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 })
  }
  try {
    const pdf = await downloadExtract(token)
    return new NextResponse(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="vypiska-egrul-${inn || "snt"}.pdf"`,
        "Cache-Control": "no-store",
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Не удалось получить выписку" },
      { status: 502 },
    )
  }
}
