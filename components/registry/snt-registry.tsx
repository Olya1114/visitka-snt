"use client"

import { useState, type FormEvent } from "react"
import useSWR from "swr"
import { ArrowUpRight, Loader2, Search } from "lucide-react"
import { REGIONS } from "@/lib/site"

type YandexResult = { url: string; title: string; snippet: string; domain: string }

const fetcher = async (url: string) => {
  const res = await fetch(url)
  const json = await res.json()
  if (!res.ok) throw new Error(json.error ?? "Ошибка поиска")
  return json as { results: YandexResult[] }
}

export function SntRegistry() {
  const [inn, setInn] = useState("")
  const [region, setRegion] = useState("")
  const [submitted, setSubmitted] = useState<string | null>(null)

  const { data, error, isLoading } = useSWR(submitted, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  })

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitted(`/api/snt/yandex?${new URLSearchParams({ inn, region })}`)
  }

  const results = data?.results ?? []

  return (
    <section id="reestr" className="scroll-mt-24 bg-secondary/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 md:px-6 md:py-24">
        <div className="flex max-w-2xl flex-col gap-4">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">Реестр садоводств</p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">Найдите своё СНТ</h2>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            Введите ИНН товарищества и выберите регион — покажем, что о нём находит Яндекс.
          </p>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 md:p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end">
            <label className="flex flex-1 flex-col gap-1.5">
              <span className="text-sm font-medium">ИНН</span>
              <input
                value={inn}
                onChange={(e) => setInn(e.target.value.replace(/\D/g, "").slice(0, 12))}
                placeholder="10 цифр"
                inputMode="numeric"
                autoComplete="off"
                required
                pattern="\d{10}|\d{12}"
                title="ИНН — 10 или 12 цифр"
                className="h-11 rounded-lg border border-input bg-background px-3 font-mono outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </label>
            <label className="flex flex-col gap-1.5 md:w-72">
              <span className="text-sm font-medium">Регион</span>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                required
                className="h-11 rounded-lg border border-input bg-background px-3 outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Выберите регион</option>
                {REGIONS.map((r) => (
                  <option key={r.code} value={r.code}>
                    {r.name}
                  </option>
                ))}
              </select>
            </label>
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
          <p className="text-sm text-muted-foreground">ИНН есть в квитанциях и на стенде правления.</p>
        </form>

        <div aria-live="polite" className="sr-only">
          {isLoading ? "Ищем в Яндексе" : data ? `Найдено: ${results.length}` : ""}
        </div>

        {error && (
          <p role="alert" className="rounded-lg border border-destructive/40 bg-card p-4 text-sm text-destructive">
            {error.message}
          </p>
        )}

        {isLoading && (
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Ищем в Яндексе…
          </p>
        )}

        {data && !isLoading && (
          <div className="flex flex-col gap-3">
            <p className="text-sm text-muted-foreground">
              {results.length > 0 ? `Результаты Яндекса: ${results.length}` : "Яндекс ничего не нашёл. Проверьте ИНН и регион."}
            </p>
            <ul className="flex flex-col gap-2">
              {results.map((r) => (
                <li key={r.url}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="group flex flex-col gap-1.5 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span className="flex items-start justify-between gap-3">
                      <span className="font-medium leading-snug text-primary group-hover:underline">{r.title}</span>
                      <ArrowUpRight className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                    </span>
                    <span className="truncate font-mono text-xs text-muted-foreground">{r.domain || r.url}</span>
                    {r.snippet && <span className="text-pretty text-sm leading-relaxed text-muted-foreground">{r.snippet}</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
