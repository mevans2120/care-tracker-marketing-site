"use client"

import { useState } from "react"
import { Logo } from "./icons"
import type { SiteSettings } from "@/types/sanity"

interface NavigationProps {
  siteSettings: SiteSettings
}

const navLinks = [
  { href: "#how-it-works", label: "How It Works" },
  { href: "#features", label: "Features" },
  { href: "#providers", label: "For Providers" },
  { href: "#about", label: "About" },
]

export function Navigation({ siteSettings }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/92 backdrop-blur-[12px] border-b border-navy/6">
      <div className="container-main flex items-center justify-between h-[72px]">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 font-serif text-2xl font-bold text-navy">
          <Logo className="w-9 h-9" />
          {siteSettings.siteName}
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-9">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[15px] font-medium text-navy/75 hover:text-navy transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="inline-flex items-center px-6 py-2.5 bg-primary text-white text-[15px] font-semibold rounded-full hover:bg-primary-hover hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(19,144,255,0.3)] transition-all duration-300"
          >
            Learn More
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="flex md:hidden flex-col gap-[5px] p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span className="block w-6 h-0.5 bg-navy rounded-sm" />
          <span className="block w-6 h-0.5 bg-navy rounded-sm" />
          <span className="block w-6 h-0.5 bg-navy rounded-sm" />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[72px] left-0 right-0 bottom-0 bg-cream/98 backdrop-blur-[12px] flex flex-col items-center pt-[60px] gap-8 z-[99]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMobileMenu}
              className="text-xl font-medium text-navy"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={closeMobileMenu}
            className="inline-flex items-center px-6 py-2.5 bg-primary text-white text-[15px] font-semibold rounded-full mt-2"
          >
            Learn More
          </a>
        </div>
      )}
    </nav>
  )
}
