"use client";

import { useState } from "react";
import { 
  ArrowUp, 
  Calendar, 
  Check, 
  Clock, 
  MessageCircle, 
  Plus, 
  X 
} from "lucide-react";

interface Scenario {
  title: string;
  prompt: string;
  reply: string;
  actionCard?: {
    badge: string;
    summary: string;
    status: string;
  };
}

const scenarios: Record<string, Scenario> = {
  reuniao: {
    title: "Agendar reunião com Aurora Tecnologia",
    prompt: "Lia, agenda uma reunião com a Aurora Tecnologia para amanhã às 10h para falar da proposta.",
    reply: "Reunião de alinhamento agendada com sucesso na sua agenda! Convite preparado e proposta vinculada.",
    actionCard: {
      badge: "Agendamento de Reunião",
      summary: "Reunião de Alinhamento com Aurora Tecnologia em 19/10/2026 às 10:00 (Pauta: Proposta #1042)",
      status: "Confirmado na agenda do Klyv",
    },
  },
  followup: {
    title: "Criar follow-up WhatsApp para Horizonte Saúde",
    prompt: "Cria uma ação de follow-up para a Horizonte Saúde na sexta-feira às 14h via WhatsApp.",
    reply: "Ação de follow-up registrada! A equipe será notificada na data e o canal WhatsApp foi selecionado.",
    actionCard: {
      badge: "Ação de Follow-up",
      summary: "Follow-up WhatsApp com Horizonte Saúde em 24/10/2026 às 14:00 (Validação de Minuta)",
      status: "Ação registrada no CRM",
    },
  },
  metas: {
    title: "Consultar meta anual e propostas quentes",
    prompt: "Como estamos em relação à nossa meta anual e quanto falta para atingir?",
    reply: "Vocês já realizaram R$ 420.000 (70% da meta planejada de R$ 600.000). Faltam R$ 180.000 para atingir a meta anual, e há 5 propostas quentes no funil somando R$ 215.000 com alta probabilidade de fechamento.",
  },
};

export function LiaShowcase() {
  const [activeScenarioKey, setActiveScenarioKey] = useState<string | null>("reuniao");
  const [inputValue, setInputValue] = useState("");

  const handleSelectScenario = (key: string) => {
    setActiveScenarioKey(key);
    setInputValue(scenarios[key].prompt);
  };

  const handleReset = () => {
    setActiveScenarioKey(null);
    setInputValue("");
  };

  const currentScenario = activeScenarioKey ? scenarios[activeScenarioKey] : null;

  return (
    <section className="section lia-showcase-section" id="lia">
      <div className="wrap">
        <div className="lia-grid-layout">
          {/* Coluna da Esquerda: Explicação Conceitual & Potencial da Lia */}
          <div className="lia-text-column">
            <h2>
              Muito além de respostas.<br />
              <span>Uma inteligência que age junto com você.</span>
            </h2>
            <p className="lia-lead">
              A Lia é a assistente operacional integrada ao Klyv que executa tarefas para te auxiliar. 
              Basta você solicitar: ela agenda reuniões, programa follow-ups com clientes e define ações.
            </p>

            {/* O que significa LIA — Tópicos sem card */}
            <div className="lia-acronym-section" aria-label="O que significa LIA">
              <span className="lia-acronym-title">O QUE SIGNIFICA A LIA?</span>
              <div className="lia-acronym-items">
                <div className="lia-acronym-item">
                  <div className="lia-letter">L</div>
                  <div>
                    <strong>Lógica</strong>
                    <span>Entendimento profundo do contexto comercial, regras de negócio e histórico do cliente.</span>
                  </div>
                </div>
                <div className="lia-acronym-item">
                  <div className="lia-letter">I</div>
                  <div>
                    <strong>Inteligência</strong>
                    <span>Análise instantânea de métricas, previsibilidade de receita e indicadores de satisfação.</span>
                  </div>
                </div>
                <div className="lia-acronym-item">
                  <div className="lia-letter">A</div>
                  <div>
                    <strong>Ação</strong>
                    <span>Execução real no CRM sob o seu pedido: agenda compromissos, salva follow-ups e atualiza negociações sem formulários.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna da Direita: A Lia Exatamente Como Aparece na Tela */}
          <div className="lia-interface-column">
            <div className="lia-drawer-frame" aria-label="Interface da Lia no CRM Klyv">
              {/* O Chat Exato da Lia */}
              <div className="kia-chat">
                {/* Cabeçalho Oficial da Lia */}
                <header className="kia-header">
                  <div className="kia-brand">
                    <MessageCircle size={19} strokeWidth={1.6} />
                    <h2>Lia</h2>
                    <span>Assistente IA</span>
                  </div>
                  <div className="kia-tools">
                    <button 
                      type="button" 
                      onClick={handleReset} 
                      aria-label="Nova conversa" 
                      title="Nova conversa"
                    >
                      <Plus size={18} />
                    </button>
                    <button 
                      type="button" 
                      onClick={handleReset} 
                      aria-label="Redefinir" 
                      title="Redefinir"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </header>

                {/* Área de Conversa Oficial da Lia */}
                <div className="kia-conversation">
                  {!currentScenario ? (
                    <div className="kia-welcome">
                      <div className="kia-symbol">
                        <MessageCircle size={28} strokeWidth={1.4} />
                      </div>
                      <h3>Olá.</h3>
                      <p>Por onde vamos começar?</p>
                    </div>
                  ) : (
                    <div className="kia-messages" role="log" aria-live="polite">
                      {/* Mensagem do Usuário */}
                      <div className="kia-message from-user">
                        <span className="kia-author">Você</span>
                        <p>{currentScenario.prompt}</p>
                      </div>

                      {/* Resposta da Lia */}
                      <div className="kia-message from-kia">
                        <span className="kia-author">Lia</span>
                        <p>{currentScenario.reply}</p>

                        {/* Card Oficial de Ação da Lia */}
                        {currentScenario.actionCard && (
                          <div className="kia-action-card">
                            <span className="kia-action-badge">{currentScenario.actionCard.badge}</span>
                            <p className="kia-action-summary">{currentScenario.actionCard.summary}</p>
                            <span className="kia-action-status-confirmed">
                              <Check size={14} />
                              {currentScenario.actionCard.status}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Composer Oficial da Lia */}
                <div className="kia-composer-area">
                  <form className="kia-composer" onSubmit={(e) => e.preventDefault()}>
                    <textarea
                      rows={2}
                      maxLength={500}
                      aria-label="Mensagem para Lia"
                      placeholder="Converse com a Lia…"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          if (inputValue.trim()) {
                            setActiveScenarioKey("reuniao");
                          }
                        }
                      }}
                    />
                    <div className="kia-composer-bottom">
                      <span>Shift + Enter para nova linha</span>
                      <button
                        type="button"
                        aria-label="Enviar"
                        disabled={!inputValue.trim()}
                        style={{ opacity: inputValue.trim() ? 1 : 0.4 }}
                        onClick={() => {
                          if (inputValue.trim()) {
                            setActiveScenarioKey("reuniao");
                          }
                        }}
                      >
                        <ArrowUp size={18} />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fechamento da Seção: 3 Cards de Recursos */}
        <div className="lia-features-grid">
          <div className="lia-feature-card">
            <div className="lia-feature-icon">
              <Calendar size={26} strokeWidth={1.8} />
            </div>
            <h3>Agenda e Reuniões Integradas</h3>
            <p>
              Marque compromissos por conversa. A Lia sincroniza data, horário e proposta na agenda do Klyv.
            </p>
          </div>

          <div className="lia-feature-card">
            <div className="lia-feature-icon">
              <Clock size={26} strokeWidth={1.8} />
            </div>
            <h3>Follow-ups sem Esquecimentos</h3>
            <p>
              Crie ações com canal definido (WhatsApp, telefone ou e-mail) para não deixar propostas esfriarem.
            </p>
          </div>

          <div className="lia-feature-card">
            <div className="lia-feature-icon">
              <MessageCircle size={26} strokeWidth={1.8} />
            </div>
            <h3>Controle Total pelo WhatsApp</h3>
            <p>
              Opere o Klyv direto da conversa. Cadastre reuniões, registre ações de follow-up e acompanhe suas propostas tudo dentro do WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
