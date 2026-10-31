import { Sprout } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 md:px-6 md:pt-4">
      <div className="glass mx-auto flex max-w-6xl items-center rounded-2xl px-3 py-2 md:px-4">
        <a
          href="https://snt.online"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          aria-label="СНТ Онлайн — открыть приложение snt.online"
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Sprout className="size-5" aria-hidden="true" />
          </span>
          <span className="text-base font-semibold tracking-tight">СНТ Онлайн</span>
        </a>
      </div>
    </header>
  )
}
