import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { terms } from './content';
import './terms.css';

export const metadata: Metadata = {
  title: 'Termos de Uso | Klyv',
  description: 'Termos de Uso do Klyv: conta, funcionalidades, inteligência artificial, responsabilidades e proteção de dados pessoais.',
  alternates: { canonical: '/termos-de-uso' },
  robots: { index: false, follow: true }, // Draft: enable indexing only after legal approval.
};

export default function TermsPage() {
  return <div className="legal-page">
    <a className="skip-link" href="#documento">Pular para os termos</a>
    <header className="site-header"><div className="nav-wrap wrap"><Link className="brand" href="/" aria-label="Klyv, início"><Image src="/klyv.svg" alt="Klyv" width={140} height={56} priority /></Link><Link className="legal-back" href="/"><ArrowLeft size={15}/>Voltar ao site</Link></div></header>
    <main className="wrap legal-main" id="documento">
      <div className="legal-heading"><span className="eyebrow">INFORMAÇÕES LEGAIS</span><h1>Termos de Uso</h1><p>As condições para usar o Klyv, com clareza sobre direitos, responsabilidades e proteção de dados.</p><div className="legal-meta"><span>Versão 0.1</span><span>Atualizada em <time dateTime="2026-10-18">18 de outubro de 2026</time></span></div></div>
      <aside className="legal-draft" aria-label="Status do documento"><strong>Minuta para revisão jurídica</strong><p>Este documento ainda não está em vigor. A identificação da responsável pelo Klyv, o CNPJ, os canais de atendimento e as condições operacionais indicadas no texto precisam ser definidos antes da adoção definitiva.</p></aside>
      <div className="legal-layout">
        <nav className="legal-index" aria-label="Índice dos Termos de Uso"><span>NESTA PÁGINA</span><ol>{terms.map((section,index)=><li key={section.id}><a href={`#${section.id}`}><span>{String(index+1).padStart(2,'0')}</span>{section.title}</a></li>)}</ol><a className="legal-sources-link" href="#referencias">Referências legais <ArrowUpRight size={13}/></a></nav>
        <article className="legal-document">{terms.map((section,index)=><section key={section.id} id={section.id}><h2><span>{String(index+1).padStart(2,'0')}</span>{section.title}</h2>{section.paragraphs.map((paragraph,i)=><p key={i}>{paragraph}</p>)}</section>)}
          <section id="referencias"><h2>Referências legais</h2><p>Fontes oficiais consultadas para a elaboração desta minuta. A legislação e a regulamentação aplicáveis prevalecem sobre qualquer resumo apresentado.</p><ul className="legal-references">
            <li><a href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm">Lei nº 13.709/2018 — Lei Geral de Proteção de Dados Pessoais</a></li>
            <li><a href="https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2014/lei/l12965.htm">Lei nº 12.965/2014 — Marco Civil da Internet</a></li>
            <li><a href="https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm">Lei nº 8.078/1990 — Código de Defesa do Consumidor</a></li>
            <li><a href="https://www.gov.br/anpd/pt-br/assuntos/noticias/anpd-aprova-o-regulamento-de-comunicacao-de-incidente-de-seguranca">ANPD — Regulamento de Comunicação de Incidente de Segurança, Resolução nº 15/2024</a></li>
            <li><a href="https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd/resolucao-cd-anpd-no-19-de-23-de-agosto-de-2024">ANPD — Transferência Internacional de Dados, Resolução nº 19/2024</a></li>
          </ul></section>
        </article>
      </div>
    </main>
    <footer className="site-footer wrap"><div className="footer-top"><Link className="brand" href="/" aria-label="Klyv, início"><Image src="/klyv.svg" alt="Klyv" width={140} height={56}/></Link><p>Boas relações. Grandes negócios.</p><Link href="/">Conheça o Klyv <ArrowUpRight size={14}/></Link></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Klyv · Inteligência comercial</span><nav aria-label="Links do rodapé"><Link href="/#produto">Produto</Link><Link href="/#planos">Planos</Link><Link href="/termos-de-uso" aria-current="page">Termos de Uso</Link></nav><span>Feito para aproximar.</span></div></footer>
  </div>;
}
