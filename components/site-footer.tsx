import { Mail, MessageCircle, Send, Sprout } from "lucide-react"
import { CONTACTS, LEGAL } from "@/lib/site"

const MESSENGERS = [
  { label: "Telegram", href: CONTACTS.telegram, icon: Send },
  { label: "MAX", href: CONTACTS.max, icon: MessageCircle },
  { label: "ВКонтакте", href: CONTACTS.vk, icon: MessageCircle },
  { label: "Почта", href: CONTACTS.email ? `mailto:${CONTACTS.email}` : "", icon: Mail },
]

export function SiteFooter() {
  const legalRows = [
    ["Правообладатель", LEGAL.owner],
    ["ИНН", LEGAL.inn],
    ["ОГРН / ОГРНИП", LEGAL.ogrn],
    ["Адрес", LEGAL.address],
  ].filter(([, value]) => value)

  return (
    <footer id="kontakty" className="scroll-mt-24 bg-foreground text-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-14 md:px-6 md:py-20">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">Контакты</h2>
            <p className="max-w-md text-pretty leading-relaxed opacity-75">
              Напишите нам, если хотите подключить своё садоводство или задать вопрос о приложении.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-3 self-start">
            {MESSENGERS.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-2xl bg-background/10 px-4 py-4 font-medium transition hover:bg-background/20"
                  >
                    <Icon className="size-5" aria-hidden="true" />
                    {label}
                  </a>
                ) : (
                  <span className="flex items-center gap-3 rounded-2xl bg-background/5 px-4 py-4 font-medium opacity-60">
                    <Icon className="size-5" aria-hidden="true" />
                    {label}
                    <span className="ml-auto text-xs font-normal">скоро</span>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-6 border-t border-background/15 pt-8 text-sm md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-3">
            <span className="flex items-center gap-2 text-base font-semibold">
              <Sprout className="size-5" aria-hidden="true" />
              СНТ Онлайн
            </span>
            {legalRows.length > 0 && (
              <dl className="flex flex-col gap-1 opacity-70">
                {legalRows.map(([k, v]) => (
                  <div key={k} className="flex gap-2">
                    <dt>{k}:</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            )}
            <p className="opacity-60">{"© СНТ Онлайн. Данные о товариществах — из открытых государственных источников."}</p>
          </div>
          <a href="/privacy" className="underline underline-offset-4 opacity-80 hover:opacity-100">
            Политика обработки персональных данных
          </a>
        </div>
      </div>
    </footer>
  )
}
