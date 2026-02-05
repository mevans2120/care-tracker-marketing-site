"use client"

import { useEffect } from "react"

export function useScrollAnimation() {
  useEffect(() => {
    const fadeElements = document.querySelectorAll(".fade-up")

    if (!("IntersectionObserver" in window)) {
      fadeElements.forEach((el) => el.classList.add("visible"))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    )

    fadeElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}
