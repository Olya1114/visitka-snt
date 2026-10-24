"use client"

import { useSyncExternalStore, useState } from "react"

const KEY = "snt-cookie-consent"

const subscribe = () => () => {}
const getAccepted = () => localStorage.getItem(KEY) === "1"
const getServerAccepted = () => true

export function CookieBanner() {
  const stored = useSyncExternalStore(subscribe, getAccepted, getServerAccepted)
  const [accepted, setAccepted] = useState(false)

  if (stored || accepted) return null

  return (
    <div
      role="region"
      aria-label="Уведомление об использовании cookie"
      className="glass fixed inset-x-3 bottom-3 z-50 mx-auto flex max-w-xl flex-col gap-3 rounded-2xl p-4 text-sm sm:flex-row sm:items-center"
    >
      <p className="leading-relaxed">
        {"Мы используем cookie, чтобы сайт работал корректно. Подробнее — в "}
        <a href="/privacy" className="underline underline-offset-2">
          политике обработки данных
        </a>
        .
      </p>
      <button
        type="button"
        onClick={() => {
          localStorage.setItem(KEY, "1")
          setAccepted(true)
        }}
        className="shrink-0 rounded-xl bg-primary px-4 py-2 font-medium text-primary-foreground transition hover:shadow-md"
      >
        Принять
      </button>
    </div>
  )
}
