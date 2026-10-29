"use client"

import { useState, type FormEvent } from "react"
import { ArrowUpRight } from "lucide-react"
import { REGIONS } from "@/lib/site"

function yandexSearchUrl(inn: string, regionName: string) {
  const text = `СНТ ИНН ${inn} ${regionName}`
  return `https://yandex.ru/search/?${new URLSearchParams({ text })}`
}

export function SntRegistry() {
  const [inn, setInn] = useState("")
  const [region, setRegion] = useState("")

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const regionName = REGIONS.find((r) => r.code === region)?.name
    if (!regionName) return
    const url = yandexSearchUrl(inn, regionName)
    // Yandex refuses to render inside frames, so leave the preview iframe via a new tab.
    if (window.self !== window.top) {
      window.open(url, "_blank", "noopener,noreferrer")
    } else {
      window.location.assign(url)
    }
  }

  return (
    <section id="reestr" className="scroll-mt-24 bg-secondary/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 md:px-6 md:py-24">
        <div className="flex max-w-2xl flex-col gap-4">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">Реестр садоводств</p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">Найдите своё СНТ</h2>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            Введите ИНН товарищества и выберите регион — откроем поиск Яндекса по этому СНТ.
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
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Найти
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground">ИНН есть в квитанциях и на стенде правления. Поиск откроется в Яндексе.</p>
        </form>
      </div>
    </section>
  )
}
