import type { Metadata } from 'next'
import WebVisor from '@/components/web-visor'

export const metadata: Metadata = {
  title: 'Reobote — Boas-vindas',
}

// "/" é a TV: o link principal abre direto a tela de boas-vindas
export default function Page() {
  return <WebVisor />
}
