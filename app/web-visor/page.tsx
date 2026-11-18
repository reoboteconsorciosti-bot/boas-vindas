import { redirect } from 'next/navigation'

// Endereço antigo da TV: manda pra "/" pra não quebrar quem já salvou o link
export default function WebVisorPage() {
  redirect('/')
}
