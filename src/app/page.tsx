"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, BarChart3, Check, ChevronDown, ChevronLeft, ChevronRight, FileText, Menu, MessageSquare, Minus, X } from "lucide-react";
import { InteractiveDashboardPreview, type Page } from "../components/InteractiveDashboardPreview";
import { LiaShowcase } from "../components/LiaShowcase";
import { SalesStructuredData } from "../components/SalesStructuredData";
import "./sales.css";

const crm = (process.env.NEXT_PUBLIC_CRM_URL || "https://app.klyv.com.br").replace(/\/$/, "");
const signup = `${crm}/company/create`;
const trial = `${signup}?plan=free`;
const previews: { id: Page; label: string; icon: typeof BarChart3; title: string; text: string }[] = [
  { id: "dashboard", label: "Resultados", icon: BarChart3, title: "Receita, propostas e metas na mesma visão.", text: "Alterne o período para acompanhar os resultados e o que falta para a meta." },
  { id: "pipeline", label: "Propostas", icon: FileText, title: "Veja em que etapa está cada negociação.", text: "Busque um cliente, alterne entre kanban e lista ou abra uma proposta para ver os detalhes." },
  { id: "surveys", label: "Pós-venda", icon: MessageSquare, title: "Acompanhe o que seus clientes têm a dizer.", text: "Explore as campanhas e os indicadores de satisfação depois da entrega." },
];
const plans = [
  { key: "free", name: "Teste 14 dias", price: "R$ 0", billing: "14 dias completos", audience: "Para testar o CRM e a Lia com até 2 pessoas.", cta: "Testar 14 dias grátis" },
  { key: "basic", name: "Basic", price: "R$ 67", billing: "por mês", audience: "Para organizar a operação individual.", cta: "Escolher Basic" },
  { key: "pro", name: "Pro", price: "R$ 157", billing: "por mês", audience: "Para trabalhar em dupla, com a Lia.", cta: "Escolher Pro" },
  { key: "enterprise", name: "Enterprise", price: "Personalizado", billing: "sob demanda", audience: "Para equipes e operação pelo WhatsApp.", cta: "Criar conta Enterprise" },
] as const;
type PlanKey = typeof plans[number]["key"];
type Feature = { name: string } & Record<PlanKey, string>;
const features: Feature[] = [
  { name: "Usuários incluídos", free: "Até 2 usuários", basic: "1 usuário", pro: "Até 2 usuários", enterprise: "Sob demanda" },
  { name: "Clientes e contatos", free: "full", basic: "full", pro: "full", enterprise: "full" },
  { name: "Propostas e pipeline", free: "full", basic: "full", pro: "full", enterprise: "full" },
  { name: "Agenda e anotações", free: "full", basic: "full", pro: "full", enterprise: "full" },
  { name: "Execução e pós-venda", free: "full", basic: "full", pro: "full", enterprise: "full" },
  { name: "Metas comerciais", free: "full", basic: "basic", pro: "full", enterprise: "full" },
  { name: "Dashboard", free: "full", basic: "basic", pro: "full", enterprise: "full" },
  { name: "Pesquisas de satisfação", free: "full", basic: "full", pro: "full", enterprise: "full" },
  { name: "Lia (Assistente IA)", free: "full", basic: "none", pro: "full", enterprise: "full" },
  { name: "Lia nas pesquisas", free: "full", basic: "none", pro: "full", enterprise: "full" },
  { name: "Lia no dashboard", free: "full", basic: "none", pro: "full", enterprise: "full" },
  { name: "Operação pelo WhatsApp", free: "none", basic: "none", pro: "none", enterprise: "full" },
];
const faqs = [
  ["Para quem é o Klyv?", "Para quem precisa acompanhar clientes, negociar propostas e continuar o relacionamento depois da venda. Você pode organizar sua operação individual ou trabalhar com uma equipe, conforme o plano escolhido."],
  ["O que posso experimentar nos 14 dias grátis?", "Até duas pessoas podem cadastrar clientes, acompanhar propostas e entregas, consultar metas e usar a Lia durante 14 dias. O teste não exige cartão de crédito."],
  ["A Lia e o WhatsApp estão liberados durante o teste?", "O teste inclui a Lia no chat, nas pesquisas e no dashboard. A operação pelo WhatsApp é exclusiva do Enterprise."],
  ["A demonstração usa dados da minha empresa?", "Não. As telas e os exemplos desta página usam dados fictícios, sem conexão com a sua conta. Os comandos demonstrados não cadastram reuniões nem enviam mensagens."],
  ["O valor do plano é por usuário?", "Os valores apresentados são mensais por plano, com os usuários indicados na comparação: 1 no Basic e até 2 no Pro. No Enterprise, o número de usuários e as condições são personalizados."],
  ["O Klyv também acompanha o pós-venda?", "Sim. Depois da aprovação da proposta, você pode acompanhar os prazos de execução e consultar o retorno dos clientes nas pesquisas de satisfação."],
];
function Status({ value }: { value: string }) {
  if (value === "full") return <span className="sales-status"><Check size={15} aria-hidden="true" />Completo</span>;
  if (value === "none") return <span className="sales-status unavailable"><Minus size={14} aria-hidden="true" />Não incluído</span>;
  if (value === "basic") return <span className="sales-status limited">Básico</span>;
  return <span>{value}</span>;
}

export default function Home() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activePreview, setActivePreview] = useState(0);
  const [mobilePlan, setMobilePlan] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const productPanel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const panel = productPanel.current;
    if (!panel || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      panel.classList.add("sales-panel-entered");
      observer.disconnect();
    }, { threshold: 0.08 });
    observer.observe(panel);
    return () => observer.disconnect();
  }, []);
  const preview = previews[activePreview];
  const selectedPlan = plans[mobilePlan];
  useEffect(() => {
    if (!mobileMenu) return;
    const close = (event: PointerEvent) => { if (!header.current?.contains(event.target as Node)) setMobileMenu(false); };
    const desktop = window.matchMedia("(min-width: 821px)");
    const resize = () => { if (desktop.matches) setMobileMenu(false); };
    document.addEventListener("pointerdown", close);
    desktop.addEventListener("change", resize);
    return () => { document.removeEventListener("pointerdown", close); desktop.removeEventListener("change", resize); };
  }, [mobileMenu]);

  return <div className="sales-site">
    <SalesStructuredData faqs={faqs} plans={plans} />
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <header className={`sales-header ${scrolled ? "is-scrolled" : "at-top"}`} ref={header} onKeyDown={event => { if (event.key === "Escape" && mobileMenu) { setMobileMenu(false); menuButton.current?.focus(); } }}>
      <div className="sales-scroll-progress" aria-hidden="true" />
      <div className="sales-wrap sales-nav">
        <a href="#" aria-label="Klyv, início" className="sales-brand-link"><Image src="/klyv.svg" alt="Klyv" width={138} height={75} priority /></a>
        <nav id="sales-navigation" className={mobileMenu ? "sales-links is-open" : "sales-links"} aria-label="Navegação principal">
          {[["#produto", "Produto"], ["#planos", "Planos"], ["#lia", "Conheça a Lia"], ["#duvidas", "Dúvidas"]].map(([href, label]) => <a key={href} href={href} onClick={() => setMobileMenu(false)}>{label}</a>)}
          <a href={crm} className="sales-mobile-login">Entrar no Klyv <ArrowUpRight size={14} /></a>
        </nav>
        <div className="sales-nav-actions"><a className="sales-login" href={crm}>Entrar <ArrowUpRight size={14} /></a><a className="sales-button compact" href={trial}>Começar agora <ArrowRight size={15} /></a><button ref={menuButton} type="button" className="sales-menu" aria-label={mobileMenu ? "Fechar menu" : "Abrir menu"} aria-expanded={mobileMenu} aria-controls="sales-navigation" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X size={22} /> : <Menu size={22} />}</button></div>
      </div>
    </header>
    <main id="conteudo">
      <section className="sales-hero-centered" id="inicio">
        <div className="sales-hero-content">
          <h1 className="sales-hero-title">
            Cada negociação no lugar.<br />
            <span className="sales-hero-highlight">O próximo passo, claro.</span>
          </h1>
          <p className="sales-hero-subtitle">
            O CRM para equipes que vendem serviços. Veja qual proposta precisa de retorno hoje e acompanhe a entrega depois que o cliente disser sim.
          </p>
          <div className="sales-hero-actions">
            <a className="sales-hero-primary-btn" href={trial}>
              <span>Testar 14 dias grátis</span>
              <ArrowUpRight size={17} />
            </a>
            <a className="sales-hero-secondary-btn" href="#produto">
              Ver demonstração
            </a>
          </div>
          <p className="sales-hero-reassurance">
            Até 2 usuários no teste · Sem cartão de crédito
          </p>
        </div>
      </section>
      <section className="sales-product sales-wrap scroll-reveal-scale" id="produto" aria-label="Explore o Klyv">
        <div className="sales-demo-bar"><span><i aria-hidden="true" />Demonstração interativa · Dados fictícios</span></div>
        <div className="sales-tabs" role="tablist" aria-label="Telas do Klyv">{previews.map((item, index) => <button key={item.id} type="button" id={`tab-${item.id}`} role="tab" aria-selected={index === activePreview} aria-controls="product-panel" tabIndex={index === activePreview ? 0 : -1} onClick={() => setActivePreview(index)} onKeyDown={event => { const next = event.key === "ArrowRight" ? (index + 1) % previews.length : event.key === "ArrowLeft" ? (index + previews.length - 1) % previews.length : event.key === "Home" ? 0 : event.key === "End" ? previews.length - 1 : null; if (next !== null) { event.preventDefault(); setActivePreview(next); document.getElementById(`tab-${previews[next].id}`)?.focus(); } }}><item.icon size={16} /><span>{item.label}</span></button>)}</div>
        <div ref={productPanel} id="product-panel" role="tabpanel" aria-labelledby={`tab-${preview.id}`} tabIndex={0}><InteractiveDashboardPreview currentPage={preview.id} onPageChange={page => { const index = previews.findIndex(item => item.id === page); if (index >= 0) setActivePreview(index); }} /></div>
        <div className="sales-demo-caption"><strong>{preview.title}</strong><p>{preview.text}</p></div>
      </section>
      <section className="sales-flow sales-wrap" id="recursos" aria-label="Do primeiro contato ao pós-venda">{[
        ["01", "Retome a conversa com contexto.", "Encontre os contatos, as propostas e o histórico do cliente sem procurar em lugares diferentes."],
        ["02", "Dê um próximo passo à proposta.", "Organize versões, reuniões e follow-ups para acompanhar cada negociação até a decisão."],
        ["03", "Continue presente depois da venda.", "Acompanhe a execução e reúna o retorno do cliente nas pesquisas de satisfação."],
      ].map(([number, title, text], index) => <article key={number} className={`scroll-reveal stagger-${index + 1}`}><span>{number}</span><h2>{title}</h2><p>{text}</p></article>)}</section>
      <section className="sales-section sales-pricing sales-wrap scroll-reveal" id="planos">
        <div className="sales-section-heading"><div><p className="sales-eyebrow">PLANOS</p><h2>Planos e preços</h2></div><p>Compare os recursos e o número de pessoas que podem usar cada plano.</p></div>
        <div className="sales-mobile-plans">
          <div className="sales-plan-selector" aria-label="Escolher plano">{plans.map((plan, index) => <button key={plan.key} type="button" aria-pressed={index === mobilePlan} onClick={() => setMobilePlan(index)}>{plan.key === "free" ? "Teste" : plan.name}</button>)}</div>
          <div className="sales-plan-navigation"><button type="button" aria-label="Plano anterior" onClick={() => setMobilePlan((mobilePlan + plans.length - 1) % plans.length)}><ChevronLeft size={21} /></button><div aria-live="polite" aria-atomic="true"><strong>{selectedPlan.name}</strong><span>{mobilePlan + 1} de {plans.length}</span></div><button type="button" aria-label="Próximo plano" onClick={() => setMobilePlan((mobilePlan + 1) % plans.length)}><ChevronRight size={21} /></button></div>
          <div className="sales-mobile-price"><strong>{selectedPlan.price}</strong><span>{selectedPlan.billing}</span><p>{selectedPlan.audience}</p></div>
          <a className={`sales-button ${selectedPlan.key === "pro" ? "" : "secondary"}`} href={`${signup}?plan=${selectedPlan.key}`}>{selectedPlan.cta}<ArrowUpRight size={15} /></a>
          <dl className="sales-mobile-features">{features.map(row => <div key={row.name}><dt>{row.name}</dt><dd><Status value={row[selectedPlan.key]} /></dd></div>)}</dl>
        </div>
        <div className="sales-table-wrapper" role="region" aria-label="Comparação de planos" tabIndex={0}><table className="sales-table"><caption className="sr-only">Comparação de preços, usuários e funcionalidades do Klyv</caption><thead><tr><th scope="col">O que está incluído</th>{plans.map(plan => <th scope="col" key={plan.key} className={plan.key === "pro" ? "sales-pro" : undefined}><div className="sales-plan-heading"><strong>{plan.name}</strong><span className="sales-plan-price">{plan.price}</span><span>{plan.billing}</span><p>{plan.audience}</p><a className={`sales-button ${plan.key === "pro" ? "" : "secondary"}`} href={`${signup}?plan=${plan.key}`}>{plan.cta}<ArrowUpRight size={13} /></a></div></th>)}</tr></thead><tbody>{features.map(row => <tr key={row.name}><th scope="row">{row.name}</th>{plans.map(plan => <td key={plan.key} className={plan.key === "pro" ? "sales-pro" : undefined}><Status value={row[plan.key]} /></td>)}</tr>)}</tbody></table></div>
      </section>
      <LiaShowcase />
      <section className="sales-section sales-faq sales-wrap scroll-reveal" id="duvidas"><div><p className="sales-eyebrow">ANTES DE COMEÇAR</p><h2>Perguntas frequentes</h2><a className="sales-text-link" href="#planos">Rever os planos <ArrowUpRight size={16} /></a></div><div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown size={18} /></summary><p>{answer}</p></details>)}</div></section>
      <section className="sales-cta-banner">
        <div className="sales-wrap sales-cta-banner-content scroll-reveal">
          <h2 className="sales-cta-banner-title">
            Comece com uma proposta real.
          </h2>
          <p className="sales-cta-banner-sub">
            Cadastre um cliente, adicione uma proposta e marque seu primeiro follow-up.
          </p>
          <div>
            <a className="sales-cta-banner-btn" href={trial}>
              Testar 14 dias grátis <ArrowUpRight size={16} />
            </a>
          </div>
          <p className="sales-cta-banner-note">
            Teste de 14 dias · Até 2 usuários · Sem cartão de crédito
          </p>
        </div>
      </section>
    </main>
    <footer className="sales-footer-dark">
      <div className="sales-wrap">
        <div className="sales-footer-dark-grid">
          <div className="sales-footer-dark-brand">
            <a href="#" aria-label="Klyv, voltar ao início" className="sales-footer-dark-logo">
              <Image src="/logo-klyv-white.svg" alt="Klyv" width={118} height={64} priority={false} />
            </a>
            <p>
              Inteligência comercial para conectar clientes, negociações e o que vem depois.
            </p>
          </div>
          <div className="sales-footer-dark-col">
            <h3>PRODUTO</h3>
            <nav aria-label="Produto">
              <a href="#inicio">Visão geral</a>
              <a href="#produto">Demonstração interativa</a>
              <a href="#lia">Assistente Lia</a>
              <a href="#planos">Planos</a>
            </nav>
          </div>
          <div className="sales-footer-dark-col">
            <h3>COMECE NA KLYV</h3>
            <nav aria-label="Comece na Klyv">
              <a href={trial}>Testar 14 dias grátis <ArrowUpRight size={13} /></a>
              <a href={crm}>Entrar na plataforma <ArrowUpRight size={13} /></a>
            </nav>
          </div>
        </div>
        <div className="sales-footer-dark-bottom">
          <span>© {new Date().getFullYear()} Klyv. Todos os direitos reservados.</span>
          <a href="/termos-de-uso">Termos de uso</a>
        </div>
      </div>
    </footer>
  </div>;
}
