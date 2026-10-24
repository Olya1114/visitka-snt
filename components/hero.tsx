import { ArrowRight } from "lucide-react"
import { ParallaxImage } from "@/components/parallax-image"

export function Hero() {
  return (
    <section className="relative isolate flex min-h-svh items-end overflow-hidden px-3 pb-3 pt-24 md:items-center md:px-6 md:pb-16">
      <ParallaxImage src="/images/hero-garden.png" alt="Утро на дачном участке: деревянный стол, грядки и теплица" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-foreground/55 via-foreground/10 to-transparent" />

      <div className="relative mx-auto w-full max-w-6xl">
        <div className="glass relative flex max-w-xl flex-col gap-5 rounded-3xl p-6 md:p-10">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">
            Приложение для садовых товариществ
          </p>
          <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
            Документы, решения и разговоры садоводства — в одном месте
          </h1>
          <p className="text-pretty leading-relaxed text-foreground/75 md:text-lg">
            СНТ Онлайн хранит протоколы и отчёты товарищества так, что их нельзя потерять или тихо удалить. Председатель
            видит каждое действие, садоводы — каждое решение, а Алиса помогает собрать отчёт голосом.
          </p>
          <div className="flex flex-col gap-3">
            <button type="button" className="cta-button w-full sm:w-fit">
              Присоединиться
              <ArrowRight className="size-5" aria-hidden="true" />
            </button>
            <p className="text-xs leading-relaxed text-foreground/60">
              {"Нажимая «Присоединиться», вы соглашаетесь с "}
              <a href="/privacy" className="underline underline-offset-2 hover:text-foreground">
                политикой обработки персональных данных
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
