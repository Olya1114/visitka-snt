import { NextResponse, type NextRequest } from "next/server"
import { REGIONS } from "@/lib/site"

const ENDPOINT = "https://searchapi.api.cloud.yandex.net/v2/web/search"
const RUSSIA_REGION_ID = "225"

export type YandexResult = { url: string; title: string; snippet: string; domain: string }

function decodeEntities(text: string) {
  return text
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
}

function cleanText(xml: string) {
  return decodeEntities(xml.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim()
}

function pick(block: string, tag: string) {
  const match = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`))
  return match ? match[1] : ""
}

function parseResults(xml: string): YandexResult[] {
  const docs = xml.match(/<doc[\s>][\s\S]*?<\/doc>/g) ?? []
  return docs
    .map((doc) => {
      const url = decodeEntities(pick(doc, "url").trim())
      const passages = doc.match(/<passage>([\s\S]*?)<\/passage>/g) ?? []
      const snippet = passages.map(cleanText).join(" … ") || cleanText(pick(doc, "headline"))
      return { url, title: cleanText(pick(doc, "title")) || url, snippet, domain: cleanText(pick(doc, "domain")) }
    })
    .filter((r) => /^https?:\/\//.test(r.url))
}

export async function GET(request: NextRequest) {
  const inn = (request.nextUrl.searchParams.get("inn") ?? "").replace(/\D/g, "")
  const regionCode = request.nextUrl.searchParams.get("region") ?? ""
  const region = REGIONS.find((r) => r.code === regionCode)

  if (inn.length !== 10 && inn.length !== 12) {
    return NextResponse.json({ error: "ИНН должен содержать 10 цифр (у организаций) или 12 цифр" }, { status: 400 })
  }
  if (!region) {
    return NextResponse.json({ error: "Выберите регион" }, { status: 400 })
  }

  const apiKey = process.env.YANDEX_SEARCH_API_KEY
  const folderId = process.env.YANDEX_FOLDER_ID
  if (!apiKey || !folderId) {
    return NextResponse.json({ error: "Поиск в Яндексе ещё не подключён" }, { status: 503 })
  }

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Api-Key ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      query: { searchType: "SEARCH_TYPE_RU", queryText: `СНТ ИНН ${inn} ${region.name}`, familyMode: "FAMILY_MODE_MODERATE" },
      groupSpec: { groupMode: "GROUP_MODE_FLAT", groupsOnPage: "10", docsInGroup: "1" },
      region: RUSSIA_REGION_ID,
      l10n: "LOCALIZATION_RU",
      folderId,
      responseFormat: "FORMAT_XML",
    }),
    cache: "no-store",
  })

  if (!res.ok) {
    console.error("[yandex-search]", res.status, await res.text())
    return NextResponse.json({ error: "Яндекс не ответил. Попробуйте ещё раз чуть позже" }, { status: 502 })
  }

  const { rawData } = (await res.json()) as { rawData?: string }
  const xml = rawData ? Buffer.from(rawData, "base64").toString("utf-8") : ""
  return NextResponse.json({ results: parseResults(xml) })
}
