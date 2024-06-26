"use client"
import { useRouter } from "next/router"

export function Location() {
  const router = useRouter()

  const dashboard = router.pathname === "/dashboard"

  return [dashboard]
}
