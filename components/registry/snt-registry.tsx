"use client"

import { useState, type FormEvent } from "react"
import useSWR from "swr"
import { Loader2, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { REGIONS } from "@/lib/site"
import type { SntRecord } from "@/lib/egrul"
import { SntDetailsPanel } from "@/components/registry/snt-details"

type Mode = "name" | "address" | "code"
type SearchResponse = { results: SntRecord[]; total: number; hidden: number; source: string }

const MODES: { id: Mode; label: string; placeholder: string; hint: string }[] = [
  {
    id: "name",
    label: "Название",
    placeholder: "Например: Ромашка",
    hint: "Ищем по наименованию товарищества. Регион поможет сузить список.",
  },
  {
    id: "address",
    label: "Адрес",
    placeholder: "Район, город или посёлок",
    hint: "Выберите регион и укажите район или населённый пункт — ищем совпадения в сведениях ЕГРЮЛ.",
  },
  {
    id: "code",
    label: "ОГРН / ИНН",
    placeholder: "13 цифр ОГРН или 10 цифр ИНН",
    hint: "Самый точный способ: номер есть в квитанциях и на стенде правления.",
  },
]

const fetcher = async (url: string) => {
  const res = await fetch(url)
  const json = await res.json()
  if (!res.ok) throw new Error(json.error ?? "Ошибка поиска")
  return json
}

export function SntRegistry() {
  const [mode, setMode] = useState<Mode>("name")
  const [query, setQuery] = useState("")
  const [region, setRegion] = useState("")
  const [submitted, setSubmitted] = useState<string | null>(null)
  const [selected, setSelected] = useState<SntRecord | null>(null)

  const { data, error, isLoading } = useSWR<SearchResponse>(submitted, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  })

  const current = MODES.find((m) => m.id === mode)!

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams({ mode, q: query.trim() })
    if (mode !== "code" && region) params.set("region", region)
    setSelected(null)
    setSubmitted(`/api/snt/search?${params}`)
  }

  const results = data?.results ?? []

  return (
    <section id="reestr" className="scroll-mt-24 bg-secondary/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 md:px-6 md:py-24">
        <div className="flex max-w-2xl flex-col gap-4">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">Реестр садоводств</p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">Найдите своё СНТ</h2>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            Живой поиск по ЕГРЮЛ: председатель, адрес, статус, выписка и ссылки на суды, кадастр и открытые данные — с
            переходом на первоисточник.
          </p>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 md:p-6">
          <div role="tablist" aria-label="Способ поиска" className="flex w-fit gap-1 rounded-lg bg-muted p-1">
            {MODES.map((m) => (
              <button
                key={m.id}
                type="button"
                role="tab"
                aria-selected={mode === m.id}
                onClick={() => setMode(m.id)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  mode === m.id ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {m.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3 md:flex-row">
            <label className="flex flex-1 flex-col gap-1.5">
              <span className="sr-only">{current.label}</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={current.placeholder}
                inputMode={mode === "code" ? "numeric" : "text"}
                required
                minLength={2}
                maxLength={120}
                className="h-11 rounded-lg border border-input bg-background px-3 outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </label>
            {mode !== "code" && (
              <label className="flex flex-col gap-1.5 md:w-72">
                <span className="sr-only">Регион</span>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  required={mode === "address"}
                  className="h-11 rounded-lg border border-input bg-background px-3 outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">{mode === "address" ? "Выберите регион" : "Все регионы"}</option>
                  {REGIONS.map((r) => (
                    <option key={r.code} value={r.code}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </label>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              ) : (
                <Search className="size-4" aria-hidden="true" />
              )}
              Найти
            </button>
          </div>
          <p className="text-sm text-muted-foreground">{current.hint}</p>
        </form>

        <div aria-live="polite" className="sr-only">
          {isLoading ? "Ищем в ЕГРЮЛ" : data ? `Найдено: ${results.length}` : ""}
        </div>

        {error && (
          <p role="alert" className="rounded-lg border border-destructive/40 bg-card p-4 text-sm text-destructive">
            {error.message}
          </p>
        )}

        {isLoading && (
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Запрашиваем ЕГРЮЛ на сайте ФНС…
          </p>
        )}

        {data && !isLoading && (
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="flex flex-col gap-3 lg:col-span-5">
              <p className="text-sm text-muted-foreground">
                {results.length > 0
                  ? `Садоводств в выдаче: ${results.length}`
                  : "Садоводческих товариществ не нашлось. Попробуйте другое написание или поиск по ОГРН."}
                {data.hidden > 0 && ` · скрыто других организаций: ${data.hidden}`}
              </p>
              <ul className="flex flex-col gap-2">
                {results.map((r) => (
                  <li key={r.token}>
                    <button
                      type="button"
                      onClick={() => setSelected(r)}
                      aria-pressed={selected?.token === r.token}
                      className={cn(
                        "flex w-full flex-col gap-1 rounded-lg border bg-card p-4 text-left transition-colors",
                        selected?.token === r.token ? "border-primary ring-1 ring-primary" : "border-border hover:border-primary/50",
                      )}
                    >
                      <span className="flex items-start justify-between gap-3">
                        <span className="font-medium leading-snug">{r.shortName}</span>
                        <span
                          className={cn(
                            "shrink-0 rounded-full px-2 py-0.5 text-xs font-medium",
                            r.liquidatedAt ? "bg-muted text-muted-foreground" : "bg-secondary text-primary",
                          )}
                        >
                          {r.liquidatedAt ? "ликвидировано" : "действует"}
                        </span>
                      </span>
                      <span className="text-sm text-muted-foreground">{r.region}</span>
                      <span className="font-mono text-xs text-muted-foreground">
                        ИНН {r.inn} · ОГРН {r.ogrn}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-7">
              {selected ? (
                <SntDetailsPanel key={selected.token} entity={selected} />
              ) : (
                results.length > 0 && (
                  <div className="flex h-full min-h-40 items-center justify-center rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                    Выберите садоводство из списка, чтобы увидеть сведения и документы
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
