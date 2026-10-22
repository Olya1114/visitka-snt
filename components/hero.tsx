import Image from "next/image"
import { ArrowRight, LogIn, Search } from "lucide-react"
import { QualitySeal } from "@/components/quality-seal"
import { LOGIN_URL, REGISTER_URL } from "@/lib/site"

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-12 md:grid-cols-2 md:px-6 md:pb-24 md:pt-20">
      <div className="flex flex-col gap-6">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">
          Приложение для садовых товариществ
        </p>
        <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
          Документы, решения и разговоры садоводства — в одном месте
        </h1>
        <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
          СНТ Портал хранит протоколы и отчёты товарищества так, что их нельзя потерять или тихо удалить. Председатель
          видит каждое действие, садоводы — каждое решение, а Алиса помогает собрать отчёт голосом.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Зарегистрироваться
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
          <a
            href={LOGIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 font-medium transition-colors hover:bg-muted"
          >
            <LogIn className="size-4" aria-hidden="true" />
            Логин
          </a>
          <a
            href="#reestr"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 font-medium transition-colors hover:bg-muted"
          >
            <Search className="size-4" aria-hidden="true" />
            Найти своё СНТ
          </a>
        </div>
      </div>

      <div className="relative">
        <div className="overflow-hidden rounded-2xl border border-border">
          <Image
            src="/images/snt-aerial.png"
            alt="Садовое товарищество с высоты: участки, домики и теплицы"
            width={1200}
            height={900}
            priority
            className="aspect-[4/3] w-full object-cover"
          />
        </div>
        <QualitySeal className="absolute -bottom-10 -left-6 size-36 rounded-full bg-background/85 p-1 md:-left-12 md:size-44" />
      </div>
    </section>
  )
}
