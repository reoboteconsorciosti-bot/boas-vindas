import type { Metadata } from 'next'
import WebVisor from '@/components/web-visor'

export const metadata: Metadata = {
  title: 'Welcome Studio — Tela da recepção',
}

export default function WebVisorPage() {
  return <WebVisor />
}
