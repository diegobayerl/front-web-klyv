"use client";

import { useState } from "react";
import { Calendar, Target, MessageCircle, StickyNote } from "lucide-react";
import { dashboardData, deals } from "./crm-demo/data";
import styles from "./LiaShowcase.module.css";

const { kpis } = dashboardData("ytd");
const reais = (value: number) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
const meetingDeal = deals[0];
const followUpDeal = deals[1];

const examples = [
  {
    label: "Consultar a meta",
    prompt: "Quanto falta vender para bater a meta do ano?",
    reply: `Faltam ${reais(kpis.annualTarget - kpis.totalRevenue)}. A equipe já realizou ${reais(kpis.totalRevenue)} dos ${reais(kpis.annualTarget)} planejados.`,
    location: "Dashboard · Progresso anual",
    Icon: Target,
  },
  {
    label: "Agendar reunião",
    prompt: `Marque uma reunião com a ${meetingDeal.customer} em 21 de outubro de 2026, às 10h, para revisar a proposta “${meetingDeal.title}”.`,
    reply: `Agendei a revisão com a ${meetingDeal.customer} para 21/10 às 10h e vinculei a reunião à proposta “${meetingDeal.title}”.`,
    location: "Agenda · Reuniões",
    Icon: Calendar,
  },
  {
    label: "Criar follow-up",
    prompt: `Na proposta “${followUpDeal.title}”, registre um retorno por telefone para 23 de outubro de 2026, às 14h. Preciso saber se a ${followUpDeal.customer} aprovou o escopo.`,
    reply: `Registrei o follow-up para 23/10 às 14h. A pauta da ligação é confirmar a aprovação do escopo com a ${followUpDeal.customer}.`,
    location: "Propostas · Follow-ups",
    Icon: StickyNote,
  },
];

export function LiaShowcase() {
  const [active, setActive] = useState(0);
  const [hasSwitched, setHasSwitched] = useState(false);
  const example = examples[active];

  return (
    <section id="lia" className={`sales-lia-section ${styles.section}`} aria-labelledby="lia-heading">
      <div className={`sales-wrap sales-lia-layout ${styles.layout}`}>
        <div className="sales-lia-copy">
          <h2 id="lia-heading">Cuide da próxima negociação com a Lia.</h2>
          <p>Consulte a meta da equipe, marque uma reunião ou registre um retorno para o cliente em uma conversa com a assistente do Klyv.</p>
          <div role="group" aria-label="Escolha um exemplo da Lia" className={styles.choices}>
            {examples.map(({ label, Icon }, index) => (
              <button key={label} type="button" aria-pressed={active === index} aria-controls="lia-example" onClick={() => {
                if (index === active) return;
                setHasSwitched(true);
                setActive(index);
              }}>
                <Icon size={17} aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="sales-lia-demo">
          <header>
            <div><MessageCircle size={20} aria-hidden="true" /><strong>Lia</strong></div>
            <span>Demonstração guiada</span>
          </header>
          <div id="lia-example" className="sales-lia-conversation" aria-live="polite" aria-atomic="true">
            <div className="sales-lia-message user"><small>Você</small><p>{example.prompt}</p></div>
            <div key={example.label} className={`sales-lia-message ${hasSwitched ? styles.replyChange : ""}`}><small>Lia</small><p>{example.reply}</p></div>
            <p className={styles.location}><example.Icon size={15} aria-hidden="true" />{example.location}</p>
          </div>
          <footer>Exemplo com dados fictícios.</footer>
        </div>
      </div>
    </section>
  );
}
