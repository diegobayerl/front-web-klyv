"use client";

import Image from 'next/image';
import { useState } from 'react';
import { ArrowUp, ArrowUpRight, Bell, Building2, Calendar, Check, FileText, LayoutDashboard, LogOut, MessageCircle, MessageSquareHeart, Moon, PanelLeftClose, PanelLeftOpen, Plus, Rocket, Search, Settings, StickyNote, Sun, Target, Users, X } from 'lucide-react';
import { dashboardData, deals } from './crm-demo/data';
import { formatCurrency as money } from './crm-demo/formatters';
import type { PeriodOption } from './crm-demo/types';
import '@fontsource-variable/plus-jakarta-sans';
import './crm-demo/dashboard.css';
import './interactive-preview.css';

export type Page = 'dashboard' | 'pipeline' | 'surveys';

const navigation = [
  { id: 'dashboard', label: 'Dashboard', Icon: LayoutDashboard },
  { id: 'customers', label: 'Clientes', Icon: Users },
  { id: 'pipeline', label: 'Propostas', Icon: FileText },
  { id: 'execution', label: 'Execução', Icon: Rocket },
  { id: 'surveys', label: 'Pesquisas', Icon: MessageSquareHeart },
  { id: 'goals', label: 'Metas', Icon: Target },
  { id: 'calendar', label: 'Agenda', Icon: Calendar },
  { id: 'notes', label: 'Anotações', Icon: StickyNote },
] as const;

const stages = ['Prospecção', 'Em negociação', 'Aprovada', 'Recusada'];
const colors = ['#3b82f6', '#f59e0b', '#10b981', '#f43f5e'];

/** Offline product demonstration. Only maintains code for Dashboard, Propostas, and Pesquisas de Satisfação. */
export function InteractiveDashboardPreview({
  initialPage = 'dashboard',
  lockToDashboard = false,
}: {
  initialPage?: Page;
  lockToDashboard?: boolean;
}) {
  const [theme, setTheme] = useState('light');
  const [page, setPage] = useState<Page>(lockToDashboard ? 'dashboard' : initialPage);
  const [collapsed, setCollapsed] = useState(false);
  const [lia, setLia] = useState(false);
  const [period, setPeriod] = useState<PeriodOption>('ytd');
  const [search, setSearch] = useState('');
  const [deal, setDeal] = useState<number | null>(null);
  const [notifications, setNotifications] = useState(false);
  const [list, setList] = useState(false);
  const [input, setInput] = useState('');

  const data = dashboardData(period);
  const k = data.kpis;
  const activePage: Page = lockToDashboard ? 'dashboard' : page;

  const changePage = (next: Page) => {
    if (lockToDashboard) return;
    setPage(next);
    setSearch('');
    setDeal(null);
  };

  const goal = (
    <>
      <div className="dashboard-section-title">
        <h2>Metas</h2>
      </div>
      <section className="dashboard-goal-strip">
        <div>
          <span className="dashboard-eyebrow">META {period === 'ytd' ? 'ANUAL' : period === 'qtd' ? 'TRIMESTRAL' : 'MENSAL'} · 2026</span>
          <h2>{money(k.totalRevenue)} realizados</h2>
          <p>de {money(k.periodTarget!)} planejados para o período</p>
        </div>
        <div className="dashboard-goal-progress">
          <div>
            <span>Progresso {period === 'ytd' ? 'anual' : 'do período'}</span>
            <strong>{((k.totalRevenue / k.periodTarget!) * 100).toFixed(1)}%</strong>
          </div>
          <div className="dashboard-goal-track" role="progressbar" aria-label="Progresso da meta" aria-valuenow={(k.totalRevenue / k.periodTarget!) * 100} aria-valuemin={0} aria-valuemax={100}>
            <span className="dashboard-goal-fill" style={{ width: `${(k.totalRevenue / k.periodTarget!) * 100}%` }} />
          </div>
          <p>{money(k.periodTarget! - k.totalRevenue)} para atingir a meta</p>
        </div>
      </section>
    </>
  );

  const periods = (
    <div className="demo-periods">
      {([['month', 'Este mês'], ['qtd', 'Trimestre'], ['ytd', 'Ano atual']] as const).map(([id, label]) => (
        <button key={id} aria-pressed={period === id} onClick={() => setPeriod(id)}>
          {label}
        </button>
      ))}
    </div>
  );

  return (
    <div className="crm-demo" data-theme={theme} aria-label="Demonstração interativa do Klyv">
      <div className="demo-shell">
        <aside className={`demo-sidebar ${collapsed ? 'is-collapsed' : ''}`}>
          <div className="demo-brand">
            <Image src={theme === 'light' ? '/logo-klyv-blue.svg' : '/logo-klyv-white.svg'} alt="Klyv" width={64} height={32} />
            <button className="demo-icon" onClick={() => setCollapsed(!collapsed)} aria-label={collapsed ? 'Expandir menu' : 'Minimizar menu'}>
              {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
            </button>
          </div>
          <nav aria-label="Navegação da demonstração">
            {navigation.map(({ id, label, Icon }) => {
              const isNavigable = id === 'dashboard' || id === 'pipeline' || id === 'surveys';
              const isSelected = activePage === id;
              return (
                <button
                  key={id}
                  type="button"
                  title={label}
                  aria-current={isSelected ? 'page' : undefined}
                  onClick={lockToDashboard || !isNavigable ? undefined : () => changePage(id as Page)}
                >
                  <Icon size={17} />
                  <span>{label}</span>
                </button>
              );
            })}
            <div className="demo-divider" />
            <button type="button" title="Configurações">
              <Settings size={17} />
              <span>Configurações</span>
            </button>
            <button type="button" className="demo-lia-trigger" title="Lia" aria-expanded={lia} onClick={() => setLia(!lia)}>
              <MessageCircle size={18} />
              <span>Lia</span>
              <small>IA</small>
            </button>
          </nav>
          <footer>
            <button type="button" title={theme === 'light' ? 'Tema escuro' : 'Tema claro'} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
              <span>Tema {theme === 'light' ? 'escuro' : 'claro'}</span>
            </button>
            <div className="demo-user">
              <span className="demo-avatar">DB</span>
              <div>
                Diego Bayerl Hupp<small>PRO</small>
              </div>
              <LogOut size={16} />
            </div>
          </footer>
        </aside>

        {lia && (
          <section className="demo-chat" aria-label="Chat demonstrativo da Lia">
            <header>
              <MessageCircle size={18} />
              <strong>Lia</strong>
              <small>Assistente IA</small>
              <button type="button" className="demo-icon" aria-label="Limpar texto" onClick={() => setInput('')}>
                <Plus size={17} />
              </button>
              <button type="button" className="demo-icon" aria-label="Fechar Lia" onClick={() => setLia(false)}>
                <X size={17} />
              </button>
            </header>
            <div className="demo-chat-messages">
              <div className="demo-chat-welcome">
                <MessageCircle size={27} />
                <h2>Olá.</h2>
                <p>Por onde vamos começar?</p>
                {['Acompanhar minhas metas', 'Organizar as propostas', 'Pesquisas de satisfação'].map((text) => (
                  <button type="button" key={text} onClick={() => setInput(text)}>
                    {text}
                    <ArrowUpRight size={12} />
                  </button>
                ))}
              </div>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
              <textarea
                aria-label="Mensagem para Lia na demonstração"
                placeholder="Converse com a Lia..."
                value={input}
                maxLength={500}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                  }
                }}
              />
              <div>
                <small>Demonstração interativa</small>
                <button type="button" aria-label="Envio desativado nesta demonstração" onClick={(e) => e.preventDefault()} style={{ opacity: input.trim() ? 0.7 : 0.4, cursor: 'default' }}>
                  <ArrowUp size={17} />
                </button>
              </div>
            </form>
            <small className="demo-chat-disclaimer">Demonstração · apenas digitação disponível nesta prévia.</small>
          </section>
        )}

        <div className="demo-main" aria-label="Conteúdo do CRM demonstrativo">
          {activePage === 'dashboard' ? (
            <>
              <header className="demo-dashboard-header">
                <div>
                  <h2>Performance Comercial</h2>
                  <span>· &nbsp;70% da meta anual atingida · 12 propostas ganhas</span>
                </div>
                <div>
                  {periods}
                  <button className="demo-icon demo-bell" aria-label="Notificações demonstrativas" aria-expanded={notifications} onClick={() => setNotifications(!notifications)}>
                    <Bell size={16} />
                  </button>
                </div>
                {notifications && (
                  <div className="demo-notifications">
                    <strong>Notificações</strong>
                    <p>Proposta da Horizonte Saúde vence em 7 dias.</p>
                    <p>Reunião com Aurora Tecnologia em 20/10, às 10h.</p>
                  </div>
                )}
              </header>
              <section className="dashboard-kpis">
                {[
                  ['Receita realizada', money(k.totalRevenue), '12 propostas ganhas'],
                  ['Pipeline ativo', money(k.pipelineValue), ''],
                  ['Previsão de receita', money(k.forecastValue), ''],
                  ['Clientes na carteira', '24', ''],
                ].map(([label, value, detail]) => (
                  <div className="dashboard-kpi" key={label}>
                    <div>{label}</div>
                    <strong>{value}</strong>
                    {detail && <p>{detail}</p>}
                  </div>
                ))}
              </section>
              {goal}
            </>
          ) : activePage === 'pipeline' ? (
            <>
              <h2 className="demo-page-title">Propostas</h2>
              <div className="demo-toolbar">
                <label className="demo-search">
                  <Search size={16} />
                  <input
                    aria-label="Buscar propostas demonstrativas"
                    placeholder="Buscar por título ou cliente..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </label>
                <div className="demo-periods">
                  <button aria-pressed={!list} onClick={() => setList(false)}>Kanban</button>
                  <button aria-pressed={list} onClick={() => setList(true)}>Lista</button>
                </div>
              </div>
              <div className={list ? 'demo-deal-list' : 'demo-kanban'}>
                {stages.map((stage, i) => (
                  <section key={stage}>
                    <header>
                      <span><i style={{ background: colors[i] }} />{stage}</span>
                      <small>{deals.filter((d) => d.stage === i).length}</small>
                    </header>
                    {deals
                      .filter((d) => d.stage === i && (d.title + d.customer).toLowerCase().includes(search.toLowerCase()))
                      .map((d) => (
                        <button className="demo-deal" key={d.title} onClick={() => setDeal(deals.indexOf(d))}>
                          <strong>{d.title}</strong>
                          <span><Building2 size={13} />{d.customer}</span>
                          <footer>
                            <b>{money(d.value)}</b>
                            <small>{d.product}</small>
                          </footer>
                        </button>
                      ))}
                  </section>
                ))}
              </div>
            </>
          ) : (
            <>
              <h2 className="demo-page-title">Pesquisas de Satisfação</h2>
              <div className="dashboard-kpis">
                {[
                  ['NPS Geral', '75'],
                  ['Média de Satisfação', '4,8 / 5'],
                  ['Total de Respostas', '32'],
                  ['Taxa de Resposta', '80%'],
                ].map(([label, value]) => (
                  <article className="dashboard-kpi" key={label}>
                    <div>{label}</div>
                    <strong>{value}</strong>
                  </article>
                ))}
              </div>
              <h3>Campanhas de Satisfação</h3>
              {[
                'Experiência de implantação',
                'Relacionamento trimestral',
                'Entrega de projeto',
              ].map((title, i) => (
                <details className="dashboard-card demo-campaign" key={title} open>
                  <summary>
                    {title}<span>Ativa</span>
                  </summary>
                  <p>{[12, 14, 6][i]} respostas · Coletadas via e-mail e link direto</p>
                  <p>“Equipe atenciosa, com clareza em cada etapa.” — Cliente demonstrativo</p>
                </details>
              ))}
            </>
          )}
          <p className="demo-data-note">Ambiente demonstrativo · dados fictícios</p>
        </div>
      </div>

      {deal !== null && (
        <div className="demo-modal-backdrop" onClick={() => setDeal(null)}>
          <section className="demo-modal" role="dialog" aria-modal="true" aria-label="Detalhes da proposta demonstrativa" onClick={(e) => e.stopPropagation()} onKeyDown={(e) => { if (e.key === 'Escape') setDeal(null); }}>
            <button autoFocus className="demo-icon" aria-label="Fechar proposta" onClick={() => setDeal(null)}>
              <X size={18} />
            </button>
            <small>{stages[deals[deal].stage]}</small>
            <h2>{deals[deal].title}</h2>
            <p>{deals[deal].customer}</p>
            <div className="demo-detail-metrics">
              <div>
                <small>Valor comercial</small>
                <strong>{money(deals[deal].value)}</strong>
              </div>
              <div>
                <small>Validade</small>
                <strong>30/11/2026</strong>
              </div>
            </div>
            <h3>Versão #1 <Check size={14} /></h3>
            <p>{deals[deal].product} · Condições comerciais demonstrativas.</p>
            <p className="demo-count">Prévia local. Nenhuma alteração será enviada ao CRM.</p>
          </section>
        </div>
      )}
    </div>
  );
}
