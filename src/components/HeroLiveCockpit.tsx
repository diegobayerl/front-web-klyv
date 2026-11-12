"use client";

import { useState } from "react";
import { InteractiveDashboardPreview, type Page } from "./InteractiveDashboardPreview";

interface HeroLiveCockpitProps {
  currentTime: number;
}

export function HeroLiveCockpit({ currentTime }: HeroLiveCockpitProps) {
  const [manualPage, setManualPage] = useState<Page | null>(null);
  const [lastManualTime, setLastManualTime] = useState<number>(0);

  // 18.75s loop do vídeo blue-fox-mascot.mp4
  const t = currentTime % 18.75;

  // Sincronização exata com o movimento da cabeça da Lia:
  // 0.0 - 4.2s: Cabeça levantada -> Dashboard de Resultados
  // 4.5 - 8.2s: Cabeça abaixada no tablet -> Pipeline de Propostas
  // 8.5 - 10.8s: Cabeça levantada sorrindo -> Propostas
  // 11.0 - 14.2s: Cabeça abaixada no tablet -> Pós-Venda & NPS
  // 14.5 - 16.8s: Cabeça levantada sorrindo -> Pós-Venda
  // 17.0 - 18.75s: Preparando ciclo seguinte -> Retorna ao Dashboard

  let autoPage: Page = "dashboard";

  if (t >= 4.3 && t < 10.9) {
    autoPage = "pipeline";
  } else if (t >= 10.9 && t < 17.0) {
    autoPage = "surveys";
  } else {
    autoPage = "dashboard";
  }

  // Libera controle manual após 8s sem cliques
  const activePage: Page =
    manualPage && Date.now() - lastManualTime < 8000 ? manualPage : autoPage;

  const handlePageChange = (next: Page) => {
    setManualPage(next);
    setLastManualTime(Date.now());
  };

  return (
    <div className="hero-mini-crm-window" role="region" aria-label="Miniatura do sistema Klyv">
      {/* Frame em Miniatura com o Sistema Real Klyv */}
      <div className="hero-mini-crm-viewport">
        <div className="hero-mini-crm-scaler">
          <InteractiveDashboardPreview
            currentPage={activePage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
