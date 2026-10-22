import { ArrowRight } from "lucide-react"
import { QualitySeal } from "@/components/quality-seal"
import { APP_URL, LOGIN_URL, REGISTER_URL } from "@/lib/site"

export function RegisterCta() {
  return (
    <>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-4 py-16 md:flex-row md:items-center md:justify-between md:px-6">
          <div className="flex max-w-xl flex-col gap-4">
            <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              Подключите своё садоводство
            </h2>
            <p className="text-pretty leading-relaxed opacity-85">
              Зарегистрируйтесь, укажите ФИО и номер участка — председатель подтвердит заявку, и документы товарищества
              будут у вас под рукой.
            </p>
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-background px-5 py-3 font-medium text-foreground transition-opacity hover:opacity-90"
            >
              Зарегистрироваться в СНТ Портале
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <p className="text-sm opacity-85">
              Уже зарегистрированы?{" "}
              <a
                href={LOGIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline underline-offset-4 hover:opacity-80"
              >
                Логин
              </a>
            </p>
          </div>
          <QualitySeal animated={false} className="size-40 shrink-0 rounded-full bg-background p-1 md:size-48" />
        </div>
      </section>
      <footer className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground md:flex-row md:justify-between md:px-6">
        <p>{"© СНТ Портал. Данные о товариществах — из открытых государственных источников."}</p>
        <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
          {APP_URL.replace("https://", "")}
        </a>
      </footer>
    </>
  )
}
