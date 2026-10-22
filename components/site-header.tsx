import { Sprout } from "lucide-react"
import { LOGIN_URL, REGISTER_URL } from "@/lib/site"

const NAV = [
  { href: "#o-prilozhenii", label: "О приложении" },
  { href: "#reestr", label: "Найти СНТ" },
  { href: "#istochniki", label: "Источники" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
        <a href="#" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sprout className="size-5" aria-hidden="true" />
          </span>
          СНТ Портал
        </a>
        <nav aria-label="Разделы" className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-foreground">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={LOGIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium transition-colors hover:bg-muted sm:px-4"
          >
            Логин
          </a>
          <a
            href={REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:px-4"
          >
            <span className="sm:hidden">Регистрация</span>
            <span className="hidden sm:inline">Зарегистрироваться</span>
          </a>
        </div>
      </div>
    </header>
  )
}
