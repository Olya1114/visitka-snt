import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { AboutApp } from "@/components/about-app"
import { SiteFooter } from "@/components/site-footer"
import { CookieBanner } from "@/components/cookie-banner"

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <AboutApp />
      </main>
      <SiteFooter />
      <CookieBanner />
    </>
  )
}
