import {
  Archive,
  BellRing,
  FolderTree,
  KeyRound,
  MessagesSquare,
  Mic,
  ServerCog,
  ShieldCheck,
  Upload,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

type Feature = { icon: LucideIcon; title: string; text: string }
type Tile = {
  title: string
  lead: string
  features: Feature[]
  className: string
  tone: "primary" | "card" | "stamp"
}

const TILES: Tile[] = [
  {
    title: "Ничего не исчезает",
    lead: "Удаление данных убрано полностью — даже для разработчика.",
    tone: "primary",
    className: "md:col-span-6 md:flex-row md:items-start md:justify-between md:gap-12",
    features: [
      {
        icon: Archive,
        title: "Архив вместо корзины",
        text: "Устаревшие или неверно оформленные документы переносятся в архив и остаются доступны для проверки.",
      },
      {
        icon: ShieldCheck,
        title: "Каждое действие подписано",
        text: "У любого документа видно, кто, что и когда с ним делал.",
      },
    ],
  },
  {
    title: "Вход только для своих",
    lead: "Боты и посторонние до документов не доберутся.",
    tone: "card",
    className: "md:col-span-3",
    features: [
      {
        icon: KeyRound,
        title: "Логин и код по СМС",
        text: "Вход по логину, а то, что это живой человек, подтверждается кодом на телефон.",
      },
      {
        icon: ShieldCheck,
        title: "Доступ выдаёт председатель",
        text: "Председатель сверяет ФИО и номер участка и открывает доступ.",
      },
    ],
  },
  {
    title: "Отчёт с Алисой — голосом",
    lead: "Меньше бумажной рутины.",
    tone: "stamp",
    className: "md:col-span-3",
    features: [
      {
        icon: Mic,
        title: "Расскажите, что сделано",
        text: "Алиса соберёт аналитику по загруженным документам, уберёт лишнее и составит отчёт.",
      },
    ],
  },
  {
    title: "Документы под контролем",
    lead: "Смотреть могут все зарегистрированные садоводы, загружать — только те, кому выданы права.",
    tone: "card",
    className: "md:col-span-3",
    features: [
      {
        icon: Upload,
        title: "Загрузка — для правления",
        text: "Остальные видят документы, но не меняют их.",
      },
      {
        icon: BellRing,
        title: "Председатель узнаёт сразу",
        text: "Загрузили протокол — приходит уведомление, кто и когда это сделал.",
      },
      {
        icon: FolderTree,
        title: "Папки под ваше садоводство",
        text: "Разделы называем так, как понятно всем, и добавляем новые по мере надобности.",
      },
    ],
  },
  {
    title: "Общие чаты",
    lead: "Больше прозрачности для садоводов.",
    tone: "card",
    className: "md:col-span-3",
    features: [
      {
        icon: MessagesSquare,
        title: "Всё в одном месте",
        text: "Объявления о собраниях, новые решения, опросы и квартальные отчёты. Не приживутся — отключим.",
      },
      {
        icon: ServerCog,
        title: "Обычные надёжные технологии",
        text: "Данные хранятся на стандартных серверах внутри России, поэтому отключить что-либо извне невозможно.",
      },
    ],
  },
]

const TONES = {
  primary: "bg-primary text-primary-foreground",
  stamp: "bg-primary text-primary-foreground",
  card: "bg-card text-card-foreground border border-border",
} as const

export function AboutApp() {
  return (
    <section id="o-prilozhenii" className="scroll-mt-24 px-3 py-16 md:px-6 md:py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="flex max-w-2xl flex-col gap-4">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">О приложении</p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Приятный и понятный инструмент для товарищества
          </h2>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            Порядок в документах, контроль для председателя и открытость для каждого садовода — без лишней сложности.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-6 md:gap-4">
          {TILES.map((tile) => {
            const dark = tile.tone !== "card"
            return (
              <article
                key={tile.title}
                className={cn("bento-tile flex flex-col gap-5 rounded-3xl p-6 md:p-8", TONES[tile.tone], tile.className)}
              >
                <div className={cn("flex flex-col gap-2", tile.tone === "primary" && "md:max-w-sm md:shrink-0")}>
                  <h3
                    className={cn(
                      "text-balance font-semibold tracking-tight",
                      tile.tone === "primary" ? "text-3xl md:text-4xl" : "text-xl",
                    )}
                  >
                    {tile.title}
                  </h3>
                  <p className={cn("text-pretty leading-relaxed", dark ? "opacity-80" : "text-muted-foreground")}>
                    {tile.lead}
                  </p>
                </div>
                <ul className={cn("flex flex-col gap-4", tile.tone === "primary" && "md:grid md:flex-1 md:grid-cols-2 md:gap-6")}>
                  {tile.features.map((f) => (
                    <li key={f.title} className="flex gap-3">
                      <span
                        className={cn(
                          "flex size-9 shrink-0 items-center justify-center rounded-xl",
                          dark ? "bg-primary-foreground/15" : "bg-secondary text-primary",
                        )}
                      >
                        <f.icon className="size-5" aria-hidden="true" />
                      </span>
                      <div className="flex flex-col gap-1">
                        <h4 className="font-medium leading-snug">{f.title}</h4>
                        <p
                          className={cn(
                            "text-sm leading-relaxed",
                            dark ? "opacity-80" : "text-muted-foreground",
                          )}
                        >
                          {f.text}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
