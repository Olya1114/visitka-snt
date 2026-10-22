"use client"

import { useState, type FormEvent } from "react"
import { Search } from "lucide-react"

export const SNT_SEARCH_EVENT = "snt:search"

export function HeroSearch() {
  const [query, setQuery] = useState("")

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const q = query.trim()
    if (q) window.dispatchEvent(new CustomEvent<string>(SNT_SEARCH_EVENT, { detail: q }))
    document.getElementById("reestr")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-5 text-center">
      <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">Найдите своё СНТ</h2>
      <p className="text-pretty leading-relaxed text-muted-foreground">
        Председатель, адрес, статус и выписка из ЕГРЮЛ — по названию, ОГРН или ИНН.
      </p>
      <form
        onSubmit={onSubmit}
        role="search"
        className="flex w-full flex-col gap-2 rounded-2xl border-2 border-primary bg-card p-2 shadow-lg sm:flex-row"
      >
        <label htmlFor="hero-snt-search" className="sr-only">
          Название, ОГРН или ИНН садоводства
        </label>
        <div className="flex flex-1 items-center gap-3 px-3">
          <Search className="size-6 shrink-0 text-primary" aria-hidden="true" />
          <input
            id="hero-snt-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Например: Ромашка или 1025000000000"
            className="h-14 w-full bg-transparent text-lg outline-none placeholder:text-muted-foreground"
          />
        </div>
        <button
          type="submit"
          className="h-14 rounded-xl bg-primary px-8 text-lg font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Найти СНТ
        </button>
      </form>
    </div>
  )
}
