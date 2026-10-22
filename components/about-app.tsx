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

type Feature = { icon: LucideIcon; title: string; text: string }
type Group = { title: string; lead: string; features: Feature[] }

const GROUPS: Group[] = [
  {
    title: "Вход только для своих",
    lead: "Боты и посторонние до документов не доберутся.",
    features: [
      {
        icon: KeyRound,
        title: "Логин и подтверждение по СМС",
        text: "Вход по логину, а то, что это живой человек, подтверждается кодом на телефон.",
      },
      {
        icon: ShieldCheck,
        title: "Доступ выдаёт председатель",
        text: "Заявки приходят в отдельный раздел. Председатель сверяет ФИО и номер участка и открывает доступ.",
      },
    ],
  },
  {
    title: "Документы под контролем",
    lead: "Смотреть могут все зарегистрированные садоводы, загружать — только те, кому выданы права.",
    features: [
      {
        icon: Upload,
        title: "Загрузка — для правления",
        text: "Права на загрузку получают члены правления. Остальные видят документы, но не меняют их.",
      },
      {
        icon: BellRing,
        title: "Председатель узнаёт сразу",
        text: "Загрузили протокол правления — председателю приходит уведомление, кто и когда это сделал. Следить вручную не нужно.",
      },
      {
        icon: FolderTree,
        title: "Папки под ваше садоводство",
        text: "Разделы называем так, как удобно и понятно всем, и добавляем новые по мере надобности.",
      },
    ],
  },
  {
    title: "Ничего не исчезает",
    lead: "Удаление данных убрано полностью — даже для разработчика.",
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
    title: "Общение и отчёты",
    lead: "Меньше бумажной рутины, больше прозрачности для садоводов.",
    features: [
      {
        icon: Mic,
        title: "Отчёт с Алисой — голосом",
        text: "Спросите Алису по загруженным документам, расскажите, что ещё сделано или идёт сейчас. Она соберёт аналитику, уберёт лишнее и составит отчёт.",
      },
      {
        icon: MessagesSquare,
        title: "Общие чаты",
        text: "Объявления о собраниях, новые решения, опросы и квартальные отчёты — в одном месте. Не приживутся — отключим.",
      },
    ],
  },
]

export function AboutApp() {
  return (
    <section id="o-prilozhenii" className="scroll-mt-20 border-y border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-16 md:px-6 md:py-24">
        <div className="flex max-w-2xl flex-col gap-4">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">О приложении</p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Приятный и понятный инструмент для товарищества
          </h2>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            Порядок в документах, контроль для председателя и открытость для каждого садовода — без лишней сложности.
          </p>
        </div>

        <div className="flex flex-col divide-y divide-border">
          {GROUPS.map((group) => (
            <div key={group.title} className="grid gap-6 py-8 first:pt-0 last:pb-0 md:grid-cols-12 md:gap-10">
              <div className="flex flex-col gap-2 md:col-span-4">
                <h3 className="text-xl font-semibold tracking-tight">{group.title}</h3>
                <p className="text-pretty leading-relaxed text-muted-foreground">{group.lead}</p>
              </div>
              <ul className="grid gap-6 sm:grid-cols-2 md:col-span-8">
                {group.features.map((f) => (
                  <li key={f.title} className="flex gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                      <f.icon className="size-5" aria-hidden="true" />
                    </span>
                    <div className="flex flex-col gap-1">
                      <p className="font-medium">{f.title}</p>
                      <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{f.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 rounded-xl bg-secondary p-6 md:flex-row md:items-center md:gap-6">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <ServerCog className="size-6" aria-hidden="true" />
          </span>
          <p className="text-pretty leading-relaxed">
            <span className="font-semibold">Обычные надёжные технологии, без блокчейна.</span> Данные хранятся на
            стандартных серверах внутри России, поэтому отключить что-либо извне невозможно.
          </p>
        </div>
      </div>
    </section>
  )
}
