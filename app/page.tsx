import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { AboutApp } from "@/components/about-app"
import { SntRegistry } from "@/components/registry/snt-registry"
import { DataSources } from "@/components/data-sources"
import { RegisterCta } from "@/components/register-cta"

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <AboutApp />
        <SntRegistry />
        <DataSources />
      </main>
      <RegisterCta />
    </>
  )
}
