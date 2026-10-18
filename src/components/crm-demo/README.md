# Demonstração local do CRM

- `RevenueCharts.tsx` e `types.ts` vêm do dashboard do front-end. Alterações da cópia: import do formatador e data demonstrativa fixa em outubro/2026.
- `dashboard.css` contém as regras de apresentação do CRM, restritas a `.crm-demo`. Responsividade e shell estão em `../interactive-preview.css`.
- Cores e fonte Plus Jakarta Sans seguem `front-end/src/theme.css` e `index.css`.
- `data.ts` contém somente registros fictícios. As duas prévias usam `InteractiveDashboardPreview`.
- Não importa API, autenticação, banco ou serviços do CRM. Tema, navegação, pesquisa, anotações e conversa ficam em estado React local, descartado ao recarregar.
- O chat usa respostas locais identificadas como demonstração, sem serviço de IA e sem executar ações.
- Páginas secundárias são versões demonstrativas simplificadas; não substituem a aplicação real.

Validação: `npx tsc --noEmit`, `npm run build`. O navegador automatizado ficou indisponível durante esta alteração; conferir layout desktop/mobile, hover dos gráficos, alternância de tema e painel Lia no navegador local.
