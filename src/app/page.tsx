"use client";

import Image from "next/image";
import { ScrollEffects } from "../components/ScrollEffects";
import { useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, BarChart3, Check, ChevronDown, FileText, Layers3, Menu, MessageSquare, Minus, Sparkles, Target, Users, Workflow, X } from "lucide-react";
import { InteractiveDashboardPreview } from "../components/InteractiveDashboardPreview";
import { LiaShowcase } from "../components/LiaShowcase";

const crm = (process.env.NEXT_PUBLIC_CRM_URL || "https://app.klyv.com.br").replace(/\/$/, "");
const signup = `${crm}/company/create`;
const previews = [
  { id: "dashboard", label: "Enxergue o todo", icon: BarChart3, title: "Decida com o cenário completo.", text: "Receita, metas e oportunidades na mesma visão. Entenda o momento da operação antes de escolher o próximo passo.", alt: "Prévia ilustrativa do dashboard Klyv, com receita, pipeline e gráficos de metas." },
  { id: "pipeline", label: "Conduza cada negócio", icon: Workflow, title: "A próxima etapa fica clara.", text: "Organize propostas em um kanban, acompanhe versões e mantenha o histórico da negociação por perto.", alt: "Prévia ilustrativa das propostas Klyv organizadas por prospecção, negociação e aprovação." },
  { id: "surveys", label: "Conheça seus clientes", icon: Users, title: "Ouça quem confia no seu trabalho.", text: "Acompanhe métricas de NPS e satisfação para transformar retorno em novos negócios.", alt: "Prévia ilustrativa das pesquisas de satisfação Klyv." },
];
const faqs = [
  ["O que consigo organizar no Klyv?", "Clientes, contatos, propostas e suas versões, contratos, execução, follow-ups, ações, metas, agenda e anotações. As pesquisas de satisfação completam a visão do relacionamento após a venda."],
  ["Posso começar gratuitamente?", "Sim. Novas contas começam com um período de Trial de 14 dias com os recursos indicados na coluna Trial do comparativo."],
  ["A partir de que plano posso ter acesso à Lia?", "Durante o seu teste gratuito de 14 dias (Trial), você pode experimentar a Lia, com as funcionalidades indicadas no comparativo de planos. Após o período de avaliação, o acesso à Lia estará disponível a partir do plano Pro (e Enterprise), voltado para operações que buscam inteligência e automação de rotina."],
  ["Quais funcionalidades a Lia pode fazer?", "A Lia executa tarefas comerciais sob o seu comando: agenda reuniões na sua pauta, cria lembretes e ações de follow-up (via WhatsApp, e-mail ou telefone), consulta metas e receita em tempo real e atualiza negociações — operando tanto pelo chat do Klyv quanto diretamente pelo WhatsApp."],
  ["Existe processo de pós-venda no Klyv?", "Sim. No Klyv, a venda é só o começo: você conta com um módulo de execução para acompanhar entregas, centraliza o histórico do cliente e envia pesquisas de satisfação dinâmicas por e-mail ou link para garantir a melhoria contínua."]
];

const capabilities = [
  { icon: Users, label: "Clientes", action: "#recursos" },
  { icon: FileText, label: "Propostas", action: "pipeline" },
  { icon: Workflow, label: "Execução", action: "#recursos" },
  { icon: Target, label: "Metas", action: "dashboard" },
  { icon: MessageSquare, label: "Pesquisas", action: "surveys" },
] as const;


const plans = [
  { name: 'Free', value: 'R$ 0', billing: 'sempre gratuito', cta: 'Começar grátis', href: `${signup}?plan=free` },
  { name: 'Basic', value: 'R$ 67', billing: 'por mês', cta: 'Escolher Basic', href: `${signup}?plan=basic` },
  { name: 'Pro', value: 'R$ 157', billing: 'por mês', cta: 'Escolher Pro', href: `${signup}?plan=pro` },
  { name: 'Enterprise', value: 'Personalizado', billing: 'sob demanda', cta: 'Conhecer Enterprise', href: `${signup}?plan=enterprise` },
];

type FeatureStatus = 'full' | 'basic' | 'none';

interface ComparisonFeature {
  name: string;
  free: FeatureStatus | string;
  basic: FeatureStatus | string;
  pro: FeatureStatus | string;
  enterprise: FeatureStatus | string;
}

const comparisonFeatures: ComparisonFeature[] = [
  { name: 'Usuários', free: '1 usuário', basic: '1 usuário', pro: 'até 2 usuários', enterprise: 'sob demanda' },
  { name: 'Clientes / Contatos', free: 'full', basic: 'full', pro: 'full', enterprise: 'full' },
  { name: 'Propostas / Pipeline', free: 'full', basic: 'full', pro: 'full', enterprise: 'full' },
  { name: 'Agenda / Anotações', free: 'full', basic: 'full', pro: 'full', enterprise: 'full' },
  { name: 'Execução do serviço', free: 'none', basic: 'full', pro: 'full', enterprise: 'full' },
  { name: 'Metas Comerciais', free: 'none', basic: 'basic', pro: 'full', enterprise: 'full' },
  { name: 'Dashboard', free: 'basic', basic: 'basic', pro: 'full', enterprise: 'full' },
  { name: 'Pós-Venda & Execução', free: 'none', basic: 'full', pro: 'full', enterprise: 'full' },
  { name: 'Pesquisas de Satisfação', free: 'none', basic: 'full', pro: 'full', enterprise: 'full' },
  { name: 'Lia', free: 'none', basic: 'none', pro: 'basic', enterprise: 'full' },
  { name: 'Lia pesquisa de satisfação', free: 'none', basic: 'none', pro: 'none', enterprise: 'full' },
  { name: 'Lia no Dashboard', free: 'none', basic: 'none', pro: 'none', enterprise: 'full' },
  { name: 'Operação pelo WhatsApp', free: 'none', basic: 'none', pro: 'none', enterprise: 'full' },
];

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://klyv.com.br").replace(/\/$/, "");

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Klyv",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/klyv.svg`,
      },
      description: "Plataforma de inteligência comercial para organizar clientes, propostas, execução, metas, pesquisas de satisfação e operar com a assistente de IA Lia.",
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Klyv Inteligência Comercial",
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "pt-BR",
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#software`,
      name: "Klyv",
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Sales & Commercial Intelligence",
      operatingSystem: "Web",
      url: siteUrl,
      inLanguage: "pt-BR",
      publisher: { "@id": `${siteUrl}/#organization` },
      description: "Do primeiro contato à próxima conquista. Organize clientes, conduza propostas em kanban, acompanhe entregas, pesquisas de satisfação (NPS/CSAT) e opere com a assistente de IA Lia no Klyv e no WhatsApp.",
      image: `${siteUrl}/og-image.svg`,
      screenshot: `${siteUrl}/og-image.png`,
      featureList: [
        "Gestão 360° de clientes e contatos",
        "Pipeline Kanban de propostas comerciais e controle de revisões",
        "Acompanhamento de execução e pós-venda",
        "Metas comerciais mensais, trimestrais e anuais em tempo real",
        "Pesquisas dinâmicas de satisfação e NPS por e-mail ou link",
        "Assistente operacional de IA (Lia) integrada ao Klyv e ao WhatsApp",
      ],
      offers: {
        "@type": "Offer",
        name: "Trial Gratuito de 14 dias",
        price: "0.00",
        priceCurrency: "BRL",
        availability: "https://schema.org/InStock",
        url: signup,
        description: "Teste gratuito por 14 dias com acesso completo ao Klyv e à Lia, sem cartão de crédito.",
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: faqs.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      })),
    },
  ],
};

export default function Home() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activePreview, setActivePreview] = useState(0);
  const [mobilePlan, setMobilePlan] = useState(0);
  const planKeys = ['free', 'basic', 'pro', 'enterprise'] as const;
  const selectedPlan = plans[mobilePlan];
  const preview = previews[activePreview];

  const handleCapabilityClick = (action: string) => {
    if (action === "dashboard" || action === "pipeline" || action === "surveys") {
      const targetIndex = previews.findIndex(p => p.id === action);
      if (targetIndex !== -1) {
        setActivePreview(targetIndex);
      }
      document.getElementById("produto")?.scrollIntoView({ behavior: "smooth" });
    } else if (action.startsWith("#")) {
      document.querySelector(action)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return <>
    <ScrollEffects />
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <header className="site-header">
      <div className="nav-wrap wrap">
        <a className="brand" href="#" aria-label="Klyv, início"><Image src="/klyv.svg" alt="Klyv" width={140} height={56} priority /></a>
        <nav className={mobileMenu ? "main-nav open" : "main-nav"} aria-label="Navegação principal">
          {[['#produto', 'O produto'], ['#recursos', 'Possibilidades'], ['#lia', 'IA'], ['#planos', 'Planos'], ['#duvidas', 'Dúvidas']].map(([href, label]) => <a key={href} href={href} onClick={() => setMobileMenu(false)}>{label}</a>)}
          <div className="mobile-nav-cta">
            <a className="login-link-mobile" href={crm} onClick={() => setMobileMenu(false)}>Entrar no Klyv <ArrowUpRight size={15} /></a>
            <a className="button small" href={`${signup}?plan=free`} onClick={() => setMobileMenu(false)}>Começar grátis</a>
          </div>
        </nav>
        <div className="nav-actions"><a className="login-link" href={crm}>Entrar <ArrowUpRight size={14} /></a><a className="button small" href={`${signup}?plan=free`}>Criar conta</a><button className="menu-button" onClick={() => setMobileMenu(value => !value)} aria-label={mobileMenu ? "Fechar menu" : "Abrir menu"} aria-expanded={mobileMenu}>{mobileMenu ? <X size={22} /> : <Menu size={22} />}</button></div>
      </div>
    </header>
    <main id="conteudo">
      <section className="hero wrap">
        <div className="hero-copy"><h1>Seu comercial.<br />Mais próximo.<br /><span>Mais à frente.</span></h1><p>Do primeiro contato à próxima conquista. Organize clientes, conduza propostas e acompanhe cada entrega em um só lugar.</p><div className="hero-actions"><a className="button" href={`${signup}?plan=free`}>Começar agora</a><a className="button secondary" href="#produto">Conheça a Klyv</a></div><span className="hero-note"><span className="tiny-check"><Check size={11} /></span> Comece no plano gratuito · Sem cartão de crédito</span></div>
        <div className="hero-visual">
          <div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" />
          <div className="hero-product">
            <InteractiveDashboardPreview lockToDashboard />
          </div>
          <div className="float-label"><span className="float-icon"><Layers3 size={18} /></span><div><strong>Menos ferramentas soltas.</strong><span>Mais contexto em cada decisão.</span></div></div>
          <div className="visual-caption"><span className="caption-line" /> Uma visão clara do que move seu negócio.</div>
        </div>
      </section>
      <div className="capabilities wrap" aria-label="Áreas do Klyv">
        <span>Uma jornada.<br /><strong>Tudo conectado.</strong></span>
        {capabilities.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              type="button"
              className="capability-item"
              onClick={() => handleCapabilityClick(item.action)}
            >
              <Icon size={18} strokeWidth={1.5} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
      <section className="section product-section" id="produto">
        <div className="wrap">
          <div className="section-heading">
            <div><span className="eyebrow">O trabalho flui quando tudo conversa</span><h2>Menos tempo procurando.<br /><span>Mais tempo construindo relações.</span></h2></div>
            <div className="section-narrative">
              <p>Seu cliente não é só uma linha na planilha. É uma conversa, uma oportunidade e uma história que merece continuidade.</p>
            </div>
          </div>
          <div className="product-tabs" role="tablist" aria-label="Conheça as telas do Klyv">{previews.map((item, index) => <button key={item.id} id={`tab-${item.id}`} role="tab" aria-selected={index === activePreview} aria-controls="product-panel" tabIndex={index === activePreview ? 0 : -1} onClick={() => setActivePreview(index)} onKeyDown={event => { const next = event.key === 'ArrowRight' ? (index + 1) % previews.length : event.key === 'ArrowLeft' ? (index + previews.length - 1) % previews.length : event.key === 'Home' ? 0 : event.key === 'End' ? previews.length - 1 : null; if (next !== null) { event.preventDefault(); setActivePreview(next); document.getElementById(`tab-${previews[next].id}`)?.focus(); } }}><item.icon size={17} /><span>{item.label}</span></button>)}</div>
          <div className="product-panel" id="product-panel" role="tabpanel" aria-labelledby={`tab-${preview.id}`} tabIndex={0}>
            <div className="product-panel-copy">
              <div>
                <h3>{preview.title}</h3>
                <p>{preview.text}</p>
              </div>
              <a className="text-link" href={`${signup}?plan=free`}>
                Começar agora <ArrowRight size={15} />
              </a>
            </div>
            <div className="product-screen">
              <InteractiveDashboardPreview
                currentPage={preview.id as "dashboard" | "pipeline" | "surveys"}
                onPageChange={(nextPage) => {
                  const targetIndex = previews.findIndex((p) => p.id === nextPage);
                  if (targetIndex !== -1) {
                    setActivePreview(targetIndex);
                  }
                }}
              />
            </div>
            <p className="preview-caption">Prévia interativa real do Klyv · Clique nas abas e cartões para explorar.</p>
          </div>
        </div>
      </section>
      <section className="section wrap" id="recursos">
        <div className="section-heading"><div><h2>O negócio avança.<br /><span>O contexto vai junto.</span></h2></div></div>
        <div className="feature-grid">
          <article className="feature-card large"><span className="feature-index">01 / RELACIONAMENTO</span><Users size={26} strokeWidth={1.4} /><h3>Um cliente.<br />A história inteira.</h3><p>Contatos, interações e oportunidades reunidos. Prepare a próxima conversa sabendo o que já foi combinado.</p><div className="relationship-art" aria-hidden="true"><div className="avatar-stack"><span>AC</span><span>MO</span><span>PM</span></div><div className="relationship-copy"><strong>Pessoas antes de processos.</strong><span>O contexto que aproxima.</span></div></div></article>
          <article className="feature-card"><span className="feature-index">02 / NEGOCIAÇÃO</span><FileText size={25} strokeWidth={1.4} /><h3>Cada proposta,<br />com seu próximo passo.</h3><p>Acompanhe versões, condições, follow-ups e ações. Clareza para conduzir negociações sem perder os detalhes.</p></article>
          <article className="feature-card"><span className="feature-index">03 / CONTINUIDADE</span><Workflow size={25} strokeWidth={1.4} /><h3>A venda é só<br />o começo.</h3><p>Leve o relacionamento para a execução. Acompanhe entregas e ouça o cliente com pesquisas por e-mail ou link.</p></article>
          <article className="feature-card wide"><div><span className="feature-index">04 / DIREÇÃO</span><h3>Saiba onde está.<br />Escolha aonde ir.</h3><p>Conecte a rotina às metas. Receita, pipeline, agenda e anotações ajudam a transformar informação em próximos passos.</p></div><div className="direction-art" aria-hidden="true"><div className="direction-ring"><Target size={34} strokeWidth={1} /></div><span>Visão → Decisão → Ação</span></div></article>
        </div>
      </section>
      <LiaShowcase />
      <section className="method-section"><div className="wrap method-inner"><div><h2>Cada feedback<br />transformado em<br /><em>melhoria contínua.</em></h2><a className="button light" href={`${signup}?plan=free`}>Dê o primeiro passo <ArrowRight size={16} /></a></div><ol className="steps">{[['Pesquisas de satisfação no timing certo.', 'Dispare pesquisas dinâmicas por e-mail ou link. Colete notas, percepções e retornos reais logo após cada entrega ou fechamento.'], ['Acúmulo de histórico e dados reais.', 'Cada resposta enriquece a história do seu cliente na Klyv, transformando opiniões em uma base estruturada de inteligência comercial.'], ['A Lia e a melhoria contínua.', 'Com base no histórico acumulado e no retorno dos clientes, a Lia cruza satisfação e metas para apoiar a evolução constante das suas vendas.']].map(([title, text], index) => <li key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></div></section>
      <section className="section wrap pricing-section" id="planos">
        <div className="pricing-heading">
          <h2>Um plano para cada momento.</h2>
        </div>

        <div className="mobile-plan-comparison">
          <div className="mobile-plan-navigation">
            <button type="button" aria-label="Plano anterior" onClick={() => setMobilePlan(index => (index + plans.length - 1) % plans.length)}><ChevronLeft size={21} aria-hidden="true" /></button>
            <div aria-live="polite" aria-atomic="true"><strong>{selectedPlan.name}</strong><span>{mobilePlan + 1} de {plans.length} planos</span></div>
            <button type="button" aria-label="Próximo plano" onClick={() => setMobilePlan(index => (index + 1) % plans.length)}><ChevronRight size={21} aria-hidden="true" /></button>
          </div>
          <div className="mobile-plan-price"><strong>{selectedPlan.value}</strong><span>{selectedPlan.billing}</span></div>
          <a className={`plan-compare-button ${selectedPlan.name === 'Pro' ? 'primary' : ''}`} href={selectedPlan.href}>{selectedPlan.cta}<ArrowUpRight size={14} aria-hidden="true" /></a>
          <dl className="mobile-plan-features" aria-label={`Funcionalidades do plano ${selectedPlan.name}`}>
            {comparisonFeatures.map(row => {
              const value = row[planKeys[mobilePlan]];
              return <div key={row.name}><dt>{row.name}</dt><dd>
                {value === 'full' ? <span className="comparison-status included"><Check size={14} aria-hidden="true" />Completo</span>
                  : value === 'basic' ? <span className="comparison-status basic">Básico</span>
                  : value === 'none' ? <span className="comparison-status excluded"><Minus size={14} aria-hidden="true" />Não incluso</span> : value}
              </dd></div>;
            })}
          </dl>
          <div className="mobile-plan-dots" aria-label="Escolher plano">{plans.map((plan, index) => <button type="button" key={plan.name} aria-label={`Ver plano ${plan.name}`} aria-pressed={index === mobilePlan} onClick={() => setMobilePlan(index)}><span /></button>)}</div>
        </div>
        <div className="comparison-table-wrapper" role="region" aria-label="Comparação de planos Klyv" tabIndex={0}>
          <table className="comparison-table">
            <caption className="comparison-sr-only">Preços, usuários e funcionalidades de cada plano Klyv</caption>
            <thead>
              <tr>
                <th scope="col" className="col-feature">O que está incluído</th>
                {plans.map(plan => <th scope="col" className="col-plan" key={plan.name}>
                  <div className="plan-th-head">
                    <strong className="plan-th-title">{plan.name}</strong>
                    <span className="plan-th-price">{plan.value}</span>
                    <span className="plan-th-billing">{plan.billing}</span>
                    <a className={`plan-compare-button ${plan.name === 'Pro' ? 'primary' : ''}`} href={plan.href}>{plan.cta}<ArrowUpRight size={13} aria-hidden="true" /></a>
                  </div>
                </th>)}
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map(row => <tr key={row.name}>
                <th scope="row" className="cell-feature-name">{row.name}</th>
                {(['free', 'basic', 'pro', 'enterprise'] as const).map(key => {
                  const value = row[key];
                  return <td className="cell-plan-val" key={key}>
                    {value === 'full' ? <span className="comparison-status included"><Check size={15} aria-hidden="true" />Completo</span>
                      : value === 'basic' ? <span className="comparison-status basic">Básico</span>
                      : value === 'none' ? <span className="comparison-status excluded"><Minus size={14} aria-hidden="true" />Não incluso</span>
                      : <span>{value}</span>}
                  </td>;
                })}
              </tr>)}
            </tbody>
          </table>
        </div>
        <p className="comparison-note">Comece no plano gratuito ou escolha o plano ideal para a sua operação. Você pode alterar seu plano a qualquer momento.</p>
      </section>
      <section className="section faq-section wrap" id="duvidas"><div><span className="eyebrow">Antes de começar</span><h2>Vamos deixar<br /><span>tudo claro.</span></h2><p>Respostas diretas para os próximos passos.</p></div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown size={17} /></summary><p>{answer}</p></details>)}</div></section>
      <section className="final-section wrap">
        <div className="final-cta">
          <div>
            <span className="eyebrow">Pronto para organizar sua operação?</span>
            <h2>Construa relações mais próximas.<br /><span>Feche negócios com clareza.</span></h2>
          </div>
          <div>
            <a className="button" href={`${signup}?plan=free`}>Começar agora <ArrowRight size={16} /></a>
            <p>Venha para a Klyv. Sem cartão de crédito no plano gratuito.</p>
          </div>
        </div>
      </section>
    </main>
    <footer className="site-footer wrap"><div className="footer-top"><a className="brand" href="#" aria-label="Klyv, voltar ao início"><Image src="/klyv.svg" alt="Klyv" width={140} height={56} /></a><p>Boas relações. Grandes negócios.</p><a href={crm}>Já é cliente? Acesse o Klyv <ArrowUpRight size={14} /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Klyv · Inteligência comercial</span><nav aria-label="Links do rodapé"><a href="#produto">Produto</a><a href="#lia">IA</a><a href="#planos">Planos</a><a href="#duvidas">Dúvidas</a><a className="footer-legal-button" href="/termos-de-uso">Termos de Uso <ArrowUpRight size={13} aria-hidden="true" /></a></nav><span>Feito para aproximar.</span></div></footer>
  </>;
}
