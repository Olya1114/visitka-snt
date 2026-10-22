import { NextResponse, type NextRequest } from "next/server"
import { isGardenAssociation, searchEgrul } from "@/lib/egrul"

export const maxDuration = 30

const CODE_PATTERN = /^(\d{10}|\d{12}|\d{13}|\d{15})$/

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const mode = params.get("mode") ?? "name"
  const raw = (params.get("q") ?? "").replace(/\s+/g, " ").trim()
  const region = params.get("region") ?? ""

  if (!/^(\d{2})?$/.test(region)) {
    return NextResponse.json({ error: "Некорректный регион" }, { status: 400 })
  }

  let query = raw
  if (mode === "code") {
    query = raw.replace(/\D/g, "")
    if (!CODE_PATTERN.test(query)) {
      return NextResponse.json(
        { error: "Введите ИНН (10 цифр) или ОГРН (13 цифр)" },
        { status: 400 },
      )
    }
  } else {
    if (query.length < 2 || query.length > 120) {
      return NextResponse.json({ error: "Введите от 2 до 120 символов" }, { status: 400 })
    }
    if (mode === "address" && !region) {
      return NextResponse.json({ error: "Для поиска по адресу выберите регион" }, { status: 400 })
    }
  }

  try {
    const { all, total } = await searchEgrul(query, mode === "code" ? "" : region)
    const results = mode === "code" ? all : all.filter(isGardenAssociation)
    return NextResponse.json({
      results,
      total,
      hidden: all.length - results.length,
      source: "https://egrul.nalog.ru/index.html",
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Сервис ФНС недоступен" },
      { status: 502 },
    )
  }
}
