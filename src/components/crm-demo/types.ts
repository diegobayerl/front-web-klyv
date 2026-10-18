export type PeriodOption = 'month' | 'qtd' | 'ytd';

export interface DashboardData {
  kpis: {
    totalRevenue: number;
    pipelineValue: number;
    forecastValue: number;
    winRate: number;
    avgTicket: number;
    salesCycleDays: number;
    totalProposals: number;
    approvedCount: number;
    monthlyTarget: number;
    periodTarget?: number;
    periodAchieved?: number;
    periodRemaining?: number;
    periodPercent?: number;
    periodType?: PeriodOption;
    annualTarget: number;
    annualAchieved?: number;
    annualPercentage?: number;
    annualRemaining?: number;
    annualRunRate?: number;
    goalAchievementPercent: number;
    hasCustomGoal: boolean;
    accumulatedShortfall: number;
    extraPerRemainingMonth: number;
    totalCustomers: number;
  };
  funnel: Array<{ key: string; label: string; count: number; value: number; color: string }>;
  monthlyRevenue: Array<{ month: string; revenue: number }>;
  trendLine: Array<{ month: string; monthName: string; realized: number; forecast: number; baseTarget: number; isPast: boolean; isCurrent: boolean }>;
  topDeals: Array<{ id: string; title: string; amount: number; currency: string; status: string; customerName: string; customerCity: string | null }>;
  activeDeals?: Array<{ id: string; title: string; amount: number; currency: string; status: string; customerName: string; customerCity: string | null; createdAt?: string }>;
  stalledDeals: Array<{ id: string; title: string; amount: number; currency: string; status: string; customerName: string; lastTouchDays: number }>;
  stalledCount: number;
  teamMembers: Array<{ id: string; name: string; email: string; role: string }>;
  surveyMetrics: {
    totalCampaigns: number; totalSent: number; totalResponded: number;
    totalPending: number; totalUnanswered: number; responseRate: number;
    promotersCount: number; neutralsCount: number; detractorsCount: number;
    npsScore: number | null; avgCsat: number | null;
    pendingTreatmentCount?: number;
  };
  customersBySegment?: Array<{ segment: string; label: string; count: number; color: string }>;
  revenueBySegment?: Array<{ segment: string; label: string; value: number; count: number; percentage: number; color: string }>;
  topCustomers?: Array<{ id: string; name: string; revenue: number; pipelineValue: number; proposalCount: number; city: string }>;
  funnelConversion?: { prospectingToNegotiation: number; negotiationToApproved: number; overallConversion: number };
  executionMetrics?: {
    total: number;
    toStart: number;
    inProgress: number;
    paused: number;
    completed: number;
    completionRate: number;
    surveySentCount: number;
    awaitingProposalCount?: number;
    recentExecutions: Array<{
      id: string;
      title: string;
      status: 'TO_START' | 'IN_PROGRESS' | 'PAUSED' | 'COMPLETED';
      responsibleName: string;
      customerName: string;
      proposalTitle: string | null;
      surveySent: boolean;
      startDate: string | null;
      endDate: string | null;
    }>;
  };
  pendingSurveysList?: Array<{
    id: string;
    customerName: string;
    campaignTitle: string;
    channel: string;
    status: string;
    submittedAt: string;
    daysWaiting: number;
  }>;
}

