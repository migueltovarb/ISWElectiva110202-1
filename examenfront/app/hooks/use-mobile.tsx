"use client"

import { useState, useEffect } from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    checkIfMobile()

    window.addEventListener("resize", checkIfMobile)


    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  return isMobile
}
