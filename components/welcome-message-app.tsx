'use client'

import { useState, type FormEvent } from 'react'
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  ChevronRight,
  CircleHelp,
  KeyRound,
  Maximize2,
  MessageSquareText,
  Monitor,
  UserRound,
} from 'lucide-react'

// Mensagem pré-setada: aparece como placeholder e é usada se o campo ficar vazio
const MENSAGEM_PADRAO = 'A Reobote Consórcios lhe dá Boas Vindas!'

type WelcomeContent = {
  message: string
  name: string
}

type WelcomeEditorProps = {
  message: string
  name: string
  pin: string
  sending: boolean
  error: string | null
  onMessageChange: (value: string) => void
  onNameChange: (value: string) => void
  onPinChange: (value: string) => void
  onPresent: (event: FormEvent<HTMLFormElement>) => void
}

function WelcomeEditor({
  message,
  name,
  pin,
  sending,
  error,
  onMessageChange,
  onNameChange,
  onPinChange,
  onPresent,
}: WelcomeEditorProps) {
  return (
    <section className="surface-card editor-card" aria-labelledby="editor-title">
      <div className="card-heading">
        <div className="card-heading-icon">
          <MessageSquareText aria-hidden="true" />
        </div>
        <div>
          <p className="card-kicker">PERSONALIZE</p>
          <h2 id="editor-title">Prepare sua mensagem</h2>
        </div>
        <span className="step-indicator" aria-label="Etapa 1 de 1">01</span>
      </div>

      <form className="welcome-form" onSubmit={onPresent}>
        <label className="form-field" htmlFor="welcome-message">
          <span className="field-label">Mensagem de boas-vindas</span>
          <span className="field-control field-control-textarea">
            <MessageSquareText aria-hidden="true" />
            <textarea
              id="welcome-message"
              name="message"
              value={message}
              onChange={(event) => onMessageChange(event.target.value)}
              placeholder={MENSAGEM_PADRAO}
              maxLength={140}
              rows={2}
              aria-describedby="message-hint"
            />
          </span>
          <span className="field-meta" id="message-hint">
            <span>Edite à vontade. Se apagar tudo, vai a mensagem padrão.</span>
            <span>{message.length}/140</span>
          </span>
        </label>

        <label className="form-field" htmlFor="welcome-name">
          <span className="field-label">Nome de quem chega</span>
          <span className="field-control">
            <UserRound aria-hidden="true" />
            <input
              id="welcome-name"
              name="name"
              type="text"
              value={name}
              onChange={(event) => onNameChange(event.target.value)}
              placeholder="Ex.: João Silva"
              maxLength={80}
              autoComplete="off"
              required
            />
          </span>
        </label>

        <label className="form-field" htmlFor="welcome-pin">
          <span className="field-label">PIN do painel</span>
          <span className="field-control">
            <KeyRound aria-hidden="true" />
            <input
              id="welcome-pin"
              name="pin"
              type="password"
              inputMode="numeric"
              value={pin}
              onChange={(event) => onPinChange(event.target.value)}
              placeholder="••••"
              maxLength={32}
              autoComplete="current-password"
              required
            />
          </span>
        </label>

        <button className="primary-action" type="submit" disabled={sending || !name.trim() || !pin}>
          <span>{sending ? 'Enviando...' : 'Exibir mensagem'}</span>
          <span className="action-icon"><ArrowUpRight aria-hidden="true" /></span>
        </button>
        {error ? (
          <p className="form-footnote" role="alert" style={{ color: '#f87171' }}>{error}</p>
        ) : (
          <p className="form-footnote">
            <Check aria-hidden="true" /> A mensagem é enviada para a tela da recepção.
          </p>
        )}
      </form>
    </section>
  )
}

type WelcomePreviewProps = {
  message: string
  name: string
}

function WelcomePreview({ message, name }: WelcomePreviewProps) {
  return (
    <section className="preview-column" aria-labelledby="preview-title">
      <div className="preview-heading">
        <div>
          <p className="card-kicker">AO VIVO</p>
          <h2 id="preview-title">Prévia da apresentação</h2>
        </div>      </div>

      <div className="presentation-preview" aria-live="polite">
        <div className="preview-toolbar">
          <div className="window-dots" aria-hidden="true"><i /><i /><i /></div>
          <span><Monitor aria-hidden="true" /> TELA DE RECEPÇÃO</span>
          <Maximize2 aria-hidden="true" />
        </div>
        <div className="preview-content">
          <p className="preview-overline">É UM PRAZER RECEBER VOCÊ</p>
          <p className="preview-name">{name.trim() || 'Nome de quem chega'}</p>
          <div className="preview-rule"><span /></div>
          <p className="preview-message">{message.trim() || MENSAGEM_PADRAO}</p>
          <p className="preview-signoff">SEJA MUITO BEM-VINDO(A)</p>
        </div>
        <div className="preview-status"><span /> PRONTO PARA APRESENTAR <ChevronRight aria-hidden="true" /></div>
      </div>
      <p className="preview-caption"><CircleHelp aria-hidden="true" /> A apresentação ocupa a tela inteira ao ser exibida.</p>
    </section>
  )
}

type FullscreenWelcomeProps = {
  content: WelcomeContent
  onBack: () => void
}

function FullscreenWelcome({ content, onBack }: FullscreenWelcomeProps) {
  return (
    <main className="welcome-stage" aria-label="Apresentação de boas-vindas">
      <div className="stage-glow stage-glow-one" aria-hidden="true" />
      <div className="stage-glow stage-glow-two" aria-hidden="true" />
      <header className="stage-header">
        <div className="brand-lockup stage-brand">
          <img className="brand-logo" src="/logo%20reobote.svg" alt="Reobote" />
        </div>
        <button className="back-action" type="button" onClick={onBack}>
          <ArrowLeft aria-hidden="true" />
          <span>Voltar ao painel</span>
        </button>
      </header>

      <div className="stage-content" key={`${content.name}-${content.message}`}>
        <h1 className="stage-name">{content.name}</h1>
        <div className="stage-divider"><span /></div>
        <p className="stage-message">{content.message}</p>
        <p className="stage-signoff">Seja muito bem-vindo(a)</p>
      </div>

    </main>
  )
}

export default function WelcomeMessageApp() {
  const [mensagem, setMensagem] = useState(MENSAGEM_PADRAO)
  const [nome, setNome] = useState('')
  const [pin, setPin] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState<string | null>(null)
  const [presentation, setPresentation] = useState<WelcomeContent | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // Campo vazio → usa a mensagem padrão que aparece no placeholder
    const mensagemLimpa = mensagem.trim() || MENSAGEM_PADRAO
    const nomeLimpo = nome.trim()

    if (!mensagemLimpa || !nomeLimpo || !pin || enviando) return

    setEnviando(true)
    setErro(null)

    try {
      const resposta = await fetch('/api/mensagem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-painel-pin': pin },
        body: JSON.stringify({ nome: nomeLimpo, mensagem: mensagemLimpa }),
      })

      if (!resposta.ok) {
        const dados = await resposta.json().catch(() => null)
        throw new Error(dados?.erro ?? 'Falha ao enviar a mensagem')
      }

      setPresentation({ message: mensagemLimpa, name: nomeLimpo })
    } catch (error) {
      setErro(error instanceof Error ? error.message : 'Falha ao enviar a mensagem')
    } finally {
      setEnviando(false)
    }
  }

  if (presentation) {
    return <FullscreenWelcome content={presentation} onBack={() => setPresentation(null)} />
  }

  return (
    <main className="welcome-dashboard" id="inicio">
      <div className="dashboard-ambient dashboard-ambient-top" aria-hidden="true" />
      <div className="dashboard-ambient dashboard-ambient-bottom" aria-hidden="true" />
      <div className="dashboard-container">
        <header className="dashboard-header">
          <a className="brand-lockup" href="#inicio" aria-label="Reobote, início">
            <img className="brand-logo" src="/logo%20reobote.svg" alt="Reobote" />
          </a>        </header>

        <h1 className="sr-only">Painel de boas-vindas</h1>

        <div className="workspace-grid">
          <WelcomeEditor
            message={mensagem}
            name={nome}
            pin={pin}
            sending={enviando}
            error={erro}
            onMessageChange={setMensagem}
            onNameChange={setNome}
            onPinChange={setPin}
            onPresent={handleSubmit}
          />
          <WelcomePreview message={mensagem} name={nome} />
        </div>
      </div>
    </main>
  )
}
