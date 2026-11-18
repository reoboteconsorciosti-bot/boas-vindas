/** @type {import('next').NextConfig} */
const nextConfig = {
  // Não gerar AGENTS.md automaticamente no `next dev`
  agentRules: false,
  // Gera um servidor enxuto em .next/standalone (usado no Dockerfile)
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
