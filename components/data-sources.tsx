import { ExternalLink } from "lucide-react"

const SOURCES = [
  {
    org: "ФНС России",
    title: "Сведения о юридических лицах",
    text: "Все СНТ, ОНТ и ДНП — юрлица, их базовые данные публичны: наименование, ИНН, ОГРН, председатель, адрес, статус. Садоводческие товарищества отмечены кодом ОКОПФ 2 01 02.",
    links: [
      { label: "Выписки из ЕГРЮЛ", href: "https://egrul.nalog.ru/index.html" },
      { label: "Прозрачный бизнес", href: "https://pb.nalog.ru/" },
      { label: "Открытые данные ФНС", href: "https://www.nalog.gov.ru/opendata/" },
    ],
  },
  {
    org: "Росреестр",
    title: "Пространственные данные и кадастр",
    text: "Границы СНТ, кадастровые кварталы и участки. Часть данных регионы выкладывают на своих порталах открытых данных.",
    links: [
      { label: "НСПД — карта", href: "https://nspd.gov.ru/map" },
      { label: "Открытые данные Москвы", href: "https://data.mos.ru/" },
    ],
  },
  {
    org: "data.gov.ru",
    title: "Федеральный портал открытых данных",
    text: "Реестры садоводческих объединений от администраций районов. Ищите по словам «садоводческое» или «СНТ» — актуальность у наборов разная.",
    links: [{ label: "Портал открытых данных", href: "https://data.gov.ru/" }],
  },
]

export function DataSources() {
  return (
    <section id="istochniki" className="scroll-mt-20 mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
      <div className="flex max-w-2xl flex-col gap-4">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">Откуда данные</p>
        <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
          Только официальные первоисточники
        </h2>
        <p className="text-pretty leading-relaxed text-muted-foreground">
          Поиск СНТ работает поверх открытых государственных сервисов. Мы ничего не храним — каждая цифра ведёт на
          страницу, где её можно проверить.
        </p>
      </div>
      <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3">
        {SOURCES.map((s) => (
          <article key={s.org} className="flex flex-col gap-3 bg-card p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{s.org}</p>
            <h3 className="text-lg font-semibold tracking-tight">{s.title}</h3>
            <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            <ul className="mt-auto flex flex-col gap-2 pt-2">
              {s.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
                  >
                    {l.label}
                    <ExternalLink className="size-3.5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
