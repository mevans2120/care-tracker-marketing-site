import { Logo } from "./icons"
import type { SiteSettings } from "@/types/sanity"

interface FooterProps {
  siteSettings: SiteSettings
}

const footerLinks = {
  product: [
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#providers", label: "For Providers" },
  ],
  company: [
    { href: "#", label: "About" },
    { href: "#", label: "Blog" },
    { href: "#contact", label: "Contact" },
  ],
  legal: [
    { href: "#", label: "Privacy" },
    { href: "#", label: "Terms" },
    { href: "#", label: "HIPAA" },
  ],
}

export function Footer({ siteSettings }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="about" className="py-20 pb-10 bg-navy text-white max-md:py-16 max-md:pb-10">
      <div className="container-main">
        {/* Grid */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-16 max-md:grid-cols-2 max-md:gap-8 max-sm:grid-cols-1">
          {/* Brand */}
          <div className="max-w-[280px] max-md:col-span-2 max-sm:col-span-1">
            <div className="font-serif text-[22px] font-bold mb-3 flex items-center gap-2">
              <Logo className="w-7 h-7" />
              {siteSettings.siteName}
            </div>
            <p className="text-[15px] leading-relaxed opacity-60">
              {siteSettings.tagline}
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-serif text-[16px] font-semibold mb-5 opacity-90">
              Product
            </h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[15px] opacity-55 hover:opacity-100 transition-opacity duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-serif text-[16px] font-semibold mb-5 opacity-90">
              Company
            </h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[15px] opacity-55 hover:opacity-100 transition-opacity duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-serif text-[16px] font-semibold mb-5 opacity-90">
              Legal
            </h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[15px] opacity-55 hover:opacity-100 transition-opacity duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between pt-8 border-t border-white/10 max-md:flex-col max-md:gap-2 max-md:text-center">
          <span className="text-[14px] opacity-45">
            Made with care
          </span>
          <span className="text-[14px] opacity-45">
            {currentYear} {siteSettings.siteName}. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}
