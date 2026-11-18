import type { Metadata } from 'next'
import WelcomeMessageApp from '@/components/welcome-message-app'

export const metadata: Metadata = {
  title: 'Reobote — Painel de boas-vindas',
  robots: { index: false, follow: false },
}

// "/painel" é onde a recepção digita o nome e envia
export default function PainelPage() {
  return <WelcomeMessageApp />
}
