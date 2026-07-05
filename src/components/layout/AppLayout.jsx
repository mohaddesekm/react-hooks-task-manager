import { Children } from "react"
import Container from "../common/Container"

export default function AppLayout({Children}) {
  return (
    <main className="min-h-screen bg-slate-100">
        <Container>{Children}</Container>
    </main>
  )
}
