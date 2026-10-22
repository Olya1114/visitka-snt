"use client"

import { useState } from "react"
import useSWR from "swr"
import { Check, Copy, Download, ExternalLink, Loader2 } from "lucide-react"
import type { SntDetails, SntRecord } from "@/lib/egrul"
import { buildSourceGroups } from "@/lib/site"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1 py-3 sm:grid-cols-3 sm:gap-4">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="text-sm sm:col-span-2">{children}</dd>
    </div>
  )
}

function CopyCode({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(value).then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 1500)
        })
      }}
      className="inline-flex items-center gap-1.5 font-mono hover:text-primary"
      aria-label={`Скопировать ${value}`}
    >
      {value}
      {copied ? <Check className="size-3.5 text-primary" aria-hidden="true" /> : <Copy className="size-3.5" aria-hidden="true" />}
    </button>
  )
}

function SourceLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 font-medium text-primary underline-offset-4 hover:underline"
    >
      {children}
      <ExternalLink className="size-3.5" aria-hidden="true" />
    </a>
  )
}

export function SntDetailsPanel({ entity }: { entity: SntRecord }) {
  const { data, isLoading } = useSWR<{ details: SntDetails | null }>(
    `/api/snt/details?inn=${entity.inn}`,
    fetcher,
    { revalidateOnFocus: false },
  )
  const [downloading, setDownloading] = useState(false)
  const [downloadError, setDownloadError] = useState<string | null>(null)
  const details = data?.details
  const groups = buildSourceGroups(entity)

  async function downloadExtract() {
    setDownloading(true)
    setDownloadError(null)
    try {
      const res = await fetch(`/api/snt/extract?t=${entity.token}&inn=${entity.inn}`)
      if (!res.ok) {
        const json = await res.json().catch(() => null)
        throw new Error(json?.error ?? "Не удалось получить выписку")
      }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `vypiska-egrul-${entity.inn}.pdf`
      a.click()
      URL.revokeObjectURL(url)
    } catch (e) {
      setDownloadError(e instanceof Error ? e.message : "Не удалось получить выписку")
    } finally {
      setDownloading(false)
    }
  }

  return (
    <article className="flex flex-col gap-6 rounded-xl border border-border bg-card p-5 md:p-6">
      <header className="flex flex-col gap-2">
        <h3 className="text-pretty text-xl font-semibold leading-snug tracking-tight">{entity.name}</h3>
        <p className="text-sm text-muted-foreground">{entity.region}</p>
      </header>

      <section aria-labelledby="egrul-title" className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h4 id="egrul-title" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Сведения ЕГРЮЛ
          </h4>
          <SourceLink href="https://egrul.nalog.ru/index.html">egrul.nalog.ru</SourceLink>
        </div>
        <dl className="divide-y divide-border border-y border-border">
          <Row label="Статус">
            {entity.liquidatedAt ? (
              <span>Ликвидировано {entity.liquidatedAt}</span>
            ) : (
              <span className="font-medium text-primary">{details?.status ?? "Действует"}</span>
            )}
          </Row>
          {entity.headName && (
            <Row label={entity.headTitle ? entity.headTitle[0].toUpperCase() + entity.headTitle.slice(1) : "Руководитель"}>
              {entity.headName}
            </Row>
          )}
          <Row label="ИНН">
            <CopyCode value={entity.inn} />
          </Row>
          <Row label="ОГРН">
            <CopyCode value={entity.ogrn} />
          </Row>
          {entity.kpp && <Row label="КПП"><span className="font-mono">{entity.kpp}</span></Row>}
          <Row label="Дата регистрации">{entity.registeredAt ?? details?.firstRegisteredAt ?? "—"}</Row>
          <Row label="Вид деятельности">
            {isLoading ? (
              <span className="inline-flex items-center gap-2 text-muted-foreground">
                <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />
                Загружаем
              </span>
            ) : details?.okved ? (
              <span>
                <span className="font-mono">{details.okvedCode}</span> {details.okved}
              </span>
            ) : (
              "—"
            )}
          </Row>
        </dl>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Полный юридический адрес указан в выписке.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={downloadExtract}
            disabled={downloading}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {downloading ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <Download className="size-4" aria-hidden="true" />}
            {downloading ? "ФНС готовит выписку…" : "Скачать выписку ЕГРЮЛ (PDF)"}
          </button>
          {details?.pbCardUrl && (
            <a
              href={details.pbCardUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              Карточка «Прозрачный бизнес»
              <ExternalLink className="size-3.5" aria-hidden="true" />
            </a>
          )}
          {details?.registrationDocsUrl && (
            <a
              href={details.registrationDocsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              Документы при регистрации
              <ExternalLink className="size-3.5" aria-hidden="true" />
            </a>
          )}
        </div>
        {downloadError && (
          <p role="alert" className="text-sm text-destructive">
            {downloadError}
          </p>
        )}
      </section>

      {groups.map((g) => (
        <section key={g.id} aria-labelledby={`g-${g.id}`} className="flex flex-col gap-3 border-t border-border pt-5">
          <h4 id={`g-${g.id}`} className="font-semibold tracking-tight">
            {g.title}
          </h4>
          <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{g.description}</p>
          <ul className="flex flex-col gap-2">
            {g.links.map((l) => (
              <li key={l.label} className="flex flex-wrap items-baseline gap-x-2 text-sm">
                <SourceLink href={l.href}>{l.label}</SourceLink>
                {l.note && <span className="text-xs text-muted-foreground">{l.note}</span>}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </article>
  )
}
