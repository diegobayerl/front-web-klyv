import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { terms } from './content';
import './terms.css';

export const metadata: Metadata = {
  title: 'Termos de Uso',
  description: 'Termos de Uso do Klyv: conta, funcionalidades, inteligência artificial, responsabilidades e proteção de dados pessoais.',
  alternates: { canonical: '/termos-de-uso' },
  robots: { index: false, follow: true }, // Draft: enable indexing only after legal approval.
};

function SectionLinks() {
  return (
    <>
      <ol>
        {terms.map((section, index) => (
          <li key={section.id}>
            <a href={`#${section.id}`}>
              <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              {section.title}
            </a>
          </li>
        ))}
      </ol>
      <a className="legal-source-link" href="#referencias">Referências legais</a>
    </>
  );
}

export default function TermsPage() {
  return (
    <div className="legal-page" id="topo">
      <a className="skip-link" href="#documento">Pular para os termos</a>
      <header className="legal-header">
        <div className="legal-wrap legal-bar">
          <Link className="legal-brand" href="/" aria-label="Klyv, início">
            <Image src="/klyv.svg" alt="" width={104} height={56} priority />
          </Link>
          <Link className="legal-back" href="/"><span aria-hidden="true">←</span> Voltar ao site</Link>
        </div>
      </header>
      <main className="legal-wrap legal-main" id="documento" tabIndex={-1}>
        <div className="legal-heading">
          <h1>Termos de Uso</h1>
          <p>Condições de contratação e uso do CRM Klyv, incluindo licenças, dados pessoais e a assistente Lia.</p>
          <div className="legal-meta">
            <span>Versão 0.3</span>
            <span>Revisada em <time dateTime="2026-11-10">10 de novembro de 2026</time></span>
          </div>
        </div>
        <aside className="legal-draft" aria-labelledby="status-minuta">
          <strong id="status-minuta">Minuta para revisão jurídica</strong>
          <p>Esta versão ainda não está em vigor. A identificação da responsável pelo Klyv, os canais de atendimento e as condições operacionais pendentes devem ser definidos antes da adoção definitiva.</p>
        </aside>
        <div className="legal-layout">
          <nav className="legal-index" aria-label="Índice dos Termos de Uso">
            <div className="legal-desktop-index">
              <h2>Índice do documento</h2>
              <SectionLinks />
            </div>
            <details className="legal-mobile-index">
              <summary>Consultar índice <span aria-hidden="true">⌄</span></summary>
              <SectionLinks />
            </details>
          </nav>
          <article className="legal-document" aria-label="Cláusulas e referências legais">
            {terms.map((section, index) => (
              <section key={section.id} id={section.id} tabIndex={-1}>
                <h2><span>{String(index + 1).padStart(2, '0')}.</span> {section.title}</h2>
                {section.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
              </section>
            ))}
            <section id="referencias" tabIndex={-1}>
              <h2>Referências legais</h2>
              <p>Fontes oficiais consultadas na elaboração desta minuta.</p>
              <ul className="legal-references">
<li><a href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm">Lei nº 13.709/2018 — Lei Geral de Proteção de Dados Pessoais</a></li>
            <li><a href="https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2014/lei/l12965.htm">Lei nº 12.965/2014 — Marco Civil da Internet</a></li>
            <li><a href="https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm">Lei nº 10.406/2002 — Código Civil</a></li>
            <li><a href="https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm">Lei nº 8.078/1990 — Código de Defesa do Consumidor</a></li>
            <li><a href="https://www.gov.br/anpd/pt-br/assuntos/noticias/anpd-aprova-o-regulamento-de-comunicacao-de-incidente-de-seguranca">ANPD — Regulamento de Comunicação de Incidente de Segurança, Resolução nº 15/2024</a></li>
            <li><a href="https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd/resolucao-cd-anpd-no-19-de-23-de-agosto-de-2024">ANPD — Transferência Internacional de Dados, Resolução nº 19/2024</a></li>
              </ul>
            </section>
          </article>
        </div>
      </main>
      <footer className="legal-footer">
        <div className="legal-wrap legal-bar">
          <span>© {new Date().getFullYear()} Klyv</span>
          <a href="#topo">Voltar ao início <span aria-hidden="true">↑</span></a>
        </div>
      </footer>
    </div>
  );
}
