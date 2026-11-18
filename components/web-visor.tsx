'use client'

import { useEffect, useState } from 'react'

type Mensagem = {
  id: number
  nome: string
  mensagem: string
  criadoEm: string
}

const INTERVALO_MS = 2000

export default function WebVisor() {
  const [atual, setAtual] = useState<Mensagem | null>(null)
  const [online, setOnline] = useState(true)

  useEffect(() => {
    let ativo = true

    async function buscarMensagem() {
      try {
        const resposta = await fetch('/api/mensagem', { cache: 'no-store' })
        if (!resposta.ok) throw new Error('Falha na API')
        const dados: Mensagem | null = await resposta.json()
        if (!ativo) return
        setOnline(true)
        // Só troca o estado se chegou mensagem nova (evita re-render à toa)
        setAtual((anterior) => (anterior?.id === dados?.id ? anterior : dados))
      } catch {
        if (ativo) setOnline(false)
      }
    }

    buscarMensagem()
    const timer = setInterval(buscarMensagem, INTERVALO_MS)
    return () => {
      ativo = false
      clearInterval(timer)
    }
  }, [])

  return (
    <main className="welcome-stage" aria-label="Tela de boas-vindas">
      <div className="stage-glow stage-glow-one" aria-hidden="true" />
      <div className="stage-glow stage-glow-two" aria-hidden="true" />
      <header className="stage-header">
        <div className="brand-lockup stage-brand">
          <img className="brand-logo" src="/logo%20reobote.svg" alt="Reobote" />
        </div>
        {!online && <span className="stage-eyebrow">RECONECTANDO...</span>}
      </header>

      {atual ? (
        // A key muda a cada mensagem nova, então a animação de entrada roda de novo
        <div className="stage-content" key={atual.id} aria-live="polite">
          <h1 className="stage-name">{atual.nome}</h1>
          <div className="stage-divider"><span /></div>
          <p className="stage-message">{atual.mensagem}</p>
          <p className="stage-signoff">Seja muito bem-vindo(a)</p>
        </div>
      ) : (
        <div className="stage-content">
          <p className="stage-eyebrow"><span /> AGUARDANDO MENSAGEM</p>
          <p className="stage-message">Em instantes, uma recepção especial.</p>
        </div>
      )}

    </main>
  )
}
