import { siteUrl } from "../../lib/site";

export const dynamic = "force-static";

export function GET() {
  const index = `# Klyv

> CRM em português para acompanhar clientes, propostas comerciais, metas de vendas, execução de serviços e pesquisas de satisfação.

As telas da demonstração usam dados fictícios. Consulte a comparação de planos para verificar preços, limites de usuários e disponibilidade da assistente Lia e da operação pelo WhatsApp.

## Produto

- [Demonstração do CRM](${siteUrl}/#produto): dashboard, propostas e pós-venda.
- [Planos e preços](${siteUrl}/#planos): condições do teste, mensalidades e recursos por plano.
- [Assistente Lia](${siteUrl}/#lia): exemplos de uso no CRM.
- [Perguntas frequentes](${siteUrl}/#duvidas): dúvidas sobre o produto e o teste gratuito.
`;
  return new Response(index, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
