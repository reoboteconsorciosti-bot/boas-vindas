import { createHash, timingSafeEqual } from 'node:crypto'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Compara o PIN sem vazar informação pelo tempo de resposta
function pinValido(recebido: string | null) {
  const esperado = process.env.PAINEL_PIN
  if (!esperado || !recebido) return false
  const a = createHash('sha256').update(recebido).digest()
  const b = createHash('sha256').update(esperado).digest()
  return timingSafeEqual(a, b)
}

// Nunca cachear: a TV precisa sempre da mensagem mais recente
export const dynamic = 'force-dynamic'

// POST /api/mensagem → o painel manda { nome, mensagem } e a gente salva no banco
export async function POST(request: Request) {
  if (!process.env.PAINEL_PIN) {
    console.error('PAINEL_PIN não configurado no .env')
    return NextResponse.json({ erro: 'Servidor sem PIN configurado' }, { status: 500 })
  }
  if (!pinValido(request.headers.get('x-painel-pin'))) {
    return NextResponse.json({ erro: 'PIN incorreto' }, { status: 401 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ erro: 'JSON inválido' }, { status: 400 })
  }

  const { nome, mensagem } = (body ?? {}) as { nome?: unknown; mensagem?: unknown }
  const nomeLimpo = typeof nome === 'string' ? nome.trim() : ''
  const mensagemLimpa = typeof mensagem === 'string' ? mensagem.trim() : ''

  if (!nomeLimpo || !mensagemLimpa) {
    return NextResponse.json({ erro: 'Nome e mensagem são obrigatórios' }, { status: 400 })
  }
  if (nomeLimpo.length > 80 || mensagemLimpa.length > 140) {
    return NextResponse.json({ erro: 'Texto grande demais' }, { status: 400 })
  }

  try {
    const salva = await prisma.mensagem.create({
      data: { nome: nomeLimpo, mensagem: mensagemLimpa },
    })
    return NextResponse.json(salva, { status: 201 })
  } catch (error) {
    console.error('Erro ao salvar mensagem:', error)
    return NextResponse.json({ erro: 'Não foi possível salvar a mensagem' }, { status: 500 })
  }
}

// GET /api/mensagem → devolve a última mensagem (é isso que a TV no /web-visor vai ler)
export async function GET() {
  try {
    const ultima = await prisma.mensagem.findFirst({ orderBy: { criadoEm: 'desc' } })
    return NextResponse.json(ultima)
  } catch (error) {
    console.error('Erro ao buscar mensagem:', error)
    return NextResponse.json({ erro: 'Não foi possível buscar a mensagem' }, { status: 500 })
  }
}
