const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"

const EGRUL = "https://egrul.nalog.ru"
const PB = "https://pb.nalog.ru"

export type SntRecord = {
  token: string
  name: string
  shortName: string
  inn: string
  ogrn: string
  kpp: string | null
  region: string | null
  registeredAt: string | null
  liquidatedAt: string | null
  headTitle: string | null
  headName: string | null
}

export type SntDetails = {
  status: string | null
  okved: string | null
  okvedCode: string | null
  firstRegisteredAt: string | null
  pbCardUrl: string | null
  registrationDocsUrl: string | null
}

type EgrulRow = {
  t: string
  n?: string
  c?: string
  i?: string
  o?: string
  p?: string
  r?: string
  e?: string
  g?: string
  rn?: string
  k?: string
  tot?: string
}

const GARDEN_PATTERN =
  /садовод|огородн|дачн|\bснт\b|\bднп\b|\bднт\b|\bонт\b|\bсонт\b|\bст\b|коллективный сад|садов(ое|ый) товарищ/i

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

async function egrulFetch(path: string, init?: RequestInit) {
  const res = await fetch(`${EGRUL}${path}`, {
    ...init,
    headers: {
      "User-Agent": UA,
      "X-Requested-With": "XMLHttpRequest",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
    signal: AbortSignal.timeout(20000),
  })
  if (!res.ok) throw new Error(`ФНС ответила ошибкой ${res.status}`)
  return res
}

function mapRow(row: EgrulRow): SntRecord {
  const [title, ...rest] = (row.g ?? "").split(":")
  const headName = rest.join(":").trim()
  return {
    token: row.t,
    name: row.n ?? "",
    shortName: row.c || row.n || "",
    inn: row.i ?? "",
    ogrn: row.o ?? "",
    kpp: row.p ?? null,
    region: row.rn ?? null,
    registeredAt: row.r ?? null,
    liquidatedAt: row.e ?? null,
    headTitle: headName ? title.trim().toLowerCase() : null,
    headName: headName || null,
  }
}

export async function searchEgrul(query: string, region?: string) {
  const body = new URLSearchParams({ query, region: region ?? "", page: "" })
  const start = await egrulFetch("/", {
    method: "POST",
    body,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  })
  const startJson = (await start.json()) as { t?: string; captchaRequired?: boolean }
  if (startJson.captchaRequired) throw new Error("ФНС временно запросила капчу, попробуйте чуть позже")
  if (!startJson.t) throw new Error("ФНС не вернула результат поиска")

  for (let attempt = 0; attempt < 6; attempt++) {
    await sleep(attempt === 0 ? 700 : 1000)
    const res = await egrulFetch(`/search-result/${startJson.t}?r=${Date.now()}`)
    const json = (await res.json()) as { rows?: EgrulRow[]; status?: string }
    if (json.rows) {
      const all = json.rows.filter((r) => r.k === "ul").map(mapRow)
      const total = Number(json.rows[0]?.tot ?? all.length) || all.length
      return { all, total }
    }
    if (json.status && json.status !== "wait") break
  }
  return { all: [] as SntRecord[], total: 0 }
}

export function isGardenAssociation(r: SntRecord) {
  return GARDEN_PATTERN.test(`${r.name} ${r.shortName}`)
}

export async function fetchPbDetails(inn: string): Promise<SntDetails | null> {
  const post = (data: Record<string, string>) =>
    fetch(`${PB}/search-proc.json`, {
      method: "POST",
      body: new URLSearchParams(data),
      headers: {
        "User-Agent": UA,
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      cache: "no-store",
      signal: AbortSignal.timeout(20000),
    }).then((r) => (r.ok ? r.json() : null))

  const start = (await post({ mode: "search-ul", queryUl: inn, page: "1", pageSize: "3" })) as {
    id?: string
  } | null
  if (!start?.id) return null

  for (let attempt = 0; attempt < 5; attempt++) {
    await sleep(attempt === 0 ? 1200 : 1000)
    const json = (await post({ id: start.id, method: "get-response" })) as {
      ul?: { data?: Record<string, string>[] }
    } | null
    const data = json?.ul?.data
    if (data) {
      const row = data.find((d) => d.inn === inn) ?? data[0]
      if (!row) return null
      return {
        status: row.sulst_name_ex ?? null,
        okved: row.okved2mainname ?? row.okved2name ?? null,
        okvedCode: row.okved2main ?? row.okved2 ?? null,
        firstRegisteredAt: row.dtreg ?? null,
        pbCardUrl: row.token ? `${PB}/company.html?token=${row.token}` : null,
        registrationDocsUrl: row.puchdocurl ?? null,
      }
    }
  }
  return null
}

export async function downloadExtract(token: string) {
  const req = await egrulFetch(`/vyp-request/${token}?r=&_=${Date.now()}`)
  const reqJson = (await req.json()) as { t?: string; captchaRequired?: boolean }
  if (reqJson.captchaRequired || !reqJson.t) throw new Error("ФНС не приняла запрос на выписку")

  for (let attempt = 0; attempt < 12; attempt++) {
    await sleep(1000)
    const status = await egrulFetch(`/vyp-status/${reqJson.t}?r=&_=${Date.now()}`)
    const json = (await status.json()) as { status?: string }
    if (json.status === "ready") {
      const pdf = await egrulFetch(`/vyp-download/${reqJson.t}`)
      return pdf.arrayBuffer()
    }
  }
  throw new Error("Выписка готовится дольше обычного, попробуйте ещё раз")
}
