import type { DashboardData, PeriodOption } from './types';
export const customers = [
  { name: 'Aurora Tecnologia', segment: 'Tecnologia', city: 'São Paulo, SP', contact: 'Marina Costa', email: 'marina@example.com', value: 180000 },
  { name: 'Horizonte Saúde', segment: 'Saúde', city: 'Curitiba, PR', contact: 'Lucas Almeida', email: 'lucas@example.com', value: 120000 },
  { name: 'Verde Norte', segment: 'Florestal', city: 'Vitória, ES', contact: 'Beatriz Lima', email: 'beatriz@example.com', value: 240000 },
  { name: 'Rota Sul Logística', segment: 'Logística', city: 'Porto Alegre, RS', contact: 'Rafael Souza', email: 'rafael@example.com', value: 96000 },
];
export const deals = [
  { title: 'Expansão da operação', customer: 'Aurora Tecnologia', value: 48000, stage: 0, product: 'Plano Enterprise' },
  { title: 'Gestão de relacionamento', customer: 'Horizonte Saúde', value: 36000, stage: 1, product: 'Klyv Pro' },
  { title: 'Licenciamento anual', customer: 'Verde Norte', value: 240000, stage: 2, product: 'Plano Enterprise' },
  { title: 'Integração comercial', customer: 'Rota Sul Logística', value: 24000, stage: 1, product: 'Implantação' },
];
export function dashboardData(period: PeriodOption): DashboardData {
  const totalRevenue = { month: 84000, qtd: 252000, ytd: 840000 }[period];
  const target = { month: 100000, qtd: 300000, ytd: 1200000 }[period];
  return {
    kpis: { totalRevenue, pipelineValue: 108000, forecastValue: totalRevenue + 108000, winRate: 80, avgTicket: totalRevenue / 12, salesCycleDays: 35, totalProposals: 18, approvedCount: 12, monthlyTarget: 100000, periodTarget: target, periodAchieved: totalRevenue, annualTarget: 1200000, annualAchieved: 840000, goalAchievementPercent: 70, hasCustomGoal: true, accumulatedShortfall: 0, extraPerRemainingMonth: 0, totalCustomers: 24 },
    funnel: [{ key: 'p', label: 'Prospecção', count: 1, value: 48000, color: '#3b82f6' }, { key: 'n', label: 'Em negociação', count: 2, value: 60000, color: '#f59e0b' }, { key: 'a', label: 'Aprovadas', count: 12, value: totalRevenue, color: '#10b981' }, { key: 'r', label: 'Recusadas', count: 3, value: 42000, color: '#f43f5e' }],
    monthlyRevenue: [], trendLine: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'].map((monthName,i) => ({ month: `2026-${i+1}`, monthName, realized: i < 10 ? [42000,54000,60000,66000,78000,90000,108000,126000,132000,84000][i] : 0, forecast: i < 10 ? [42000,54000,60000,66000,78000,90000,108000,126000,132000,84000][i] : 150000, baseTarget: 100000, isPast:i<9, isCurrent:i===9 })),
    revenueBySegment: [{ segment:'FOREST',label:'Florestal',value:totalRevenue*.4,count:5,percentage:40,color:'#10b981' }, { segment:'TECH',label:'Tecnologia',value:totalRevenue*.3,count:4,percentage:30,color:'#6366f1' }, { segment:'HEALTH',label:'Saúde',value:totalRevenue*.2,count:2,percentage:20,color:'#3b82f6' }, { segment:'LOG',label:'Logística',value:totalRevenue*.1,count:1,percentage:10,color:'#f59e0b' }],
    topDeals: [], stalledDeals: [], stalledCount: 0, teamMembers: [],
    surveyMetrics: { totalCampaigns:3,totalSent:40,totalResponded:32,totalPending:4,totalUnanswered:4,responseRate:80,promotersCount:26,neutralsCount:4,detractorsCount:2,npsScore:75,avgCsat:4.8 },
  };
}
