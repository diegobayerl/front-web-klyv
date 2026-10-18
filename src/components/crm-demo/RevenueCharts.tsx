// Adapted from front-end/src/pages/access/dashboard/RevenueCharts.tsx. Static demo date; no API.
import { useState } from 'react';
import { 
  Bar, 
  BarChart,
  CartesianGrid, 
  Cell, 
  ComposedChart, 
  Line, 
  Pie, 
  PieChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from 'recharts';
import { formatCurrency } from './formatters';
import type { DashboardData, PeriodOption } from './types';

const axis = { fontSize: 11, fill: 'var(--crm-muted)' };
const compact = (value: number) => new Intl.NumberFormat('pt-BR', { notation: 'compact', maximumFractionDigits: 1 }).format(value);
const tooltipStyle = { background: 'var(--crm-surface)', border: '1px solid var(--crm-border)', borderRadius: 10, color: 'var(--crm-text)', fontSize: 12 };
const currency = (value: unknown) => formatCurrency(Number(value));

export function RevenueCharts({ data, period = 'ytd' }: { data: DashboardData; period?: PeriodOption }) {
  const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowDetails(prev => !prev);
  };

  const hasRevenue = Boolean(data.revenueBySegment && data.revenueBySegment.length > 0);
  const segmentData = hasRevenue && data.revenueBySegment
    ? data.revenueBySegment
    : (data.customersBySegment?.map(c => ({
        segment: c.segment,
        label: c.label,
        value: c.count,
        count: c.count,
        percentage: data.kpis.totalCustomers > 0 ? Number(((c.count / data.kpis.totalCustomers) * 100).toFixed(1)) : 0,
        color: c.color,
        isCount: true
      })) || []);

  return <section className="dashboard-charts" aria-label="Receita por segmento e metas mensais">
    <article className="dashboard-card">
      <div className="h-[44px] flex items-center justify-between mb-2">
        <h2 className="text-sm font-extrabold tracking-tight" style={{ color: 'var(--crm-text)' }}>
          {hasRevenue ? 'Receita por Segmento' : 'Distribuição por Segmento'}
        </h2>
        {segmentData.length > 0 && (
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full" style={{ backgroundColor: 'var(--crm-hover)', color: 'var(--crm-muted)' }}>
            {segmentData.length} {segmentData.length === 1 ? 'segmento' : 'segmentos'}
          </span>
        )}
      </div>

      {segmentData.length > 0 ? (
        <div className="dashboard-chart flex flex-col sm:flex-row items-center justify-between gap-4" style={{ height: 240, marginTop: 8 }}>
          {/* DONUT CHART COM INDICADOR CENTRAL */}
          <div className="relative flex items-center justify-center shrink-0 w-full sm:w-[190px] h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip 
                  contentStyle={tooltipStyle} 
                  formatter={(val: unknown) => hasRevenue ? formatCurrency(Number(val)) : `${val} clientes`} 
                />
                <Pie
                  data={segmentData}
                  dataKey="value"
                  nameKey="label"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={3}
                  stroke="var(--crm-surface)"
                  strokeWidth={2}
                  isAnimationActive={false}
                >
                  {segmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
              <span className="text-[10px] uppercase font-bold tracking-wider" style={{ color: 'var(--crm-muted)' }}>
                {hasRevenue ? 'Total' : 'Clientes'}
              </span>
              <strong className="text-xs font-black tracking-tight" style={{ color: 'var(--crm-text)' }}>
                {hasRevenue ? compact(data.kpis.totalRevenue) : data.kpis.totalCustomers}
              </strong>
            </div>
          </div>

          {/* LEGENDA DETALHADA COM BARRA E PARTICIPAÇÃO */}
          <div className="flex-1 w-full space-y-2 max-h-[220px] overflow-y-auto custom-scrollbar pr-1">
            {segmentData.slice(0, 5).map((item) => (
              <div key={item.label} className="text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-semibold truncate" style={{ color: 'var(--crm-text)' }}>
                    <i className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: item.color }} />
                    <span className="truncate">{item.label}</span>
                  </span>
                  <span className="font-bold shrink-0 ml-2" style={{ color: 'var(--crm-muted)' }}>
                    {item.percentage}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all"
                    style={{ width: `${Math.min(100, item.percentage)}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="dashboard-chart flex items-center justify-center text-xs font-semibold" style={{ height: 240, marginTop: 8, color: 'var(--crm-muted)' }}>
          Nenhum dado de segmento disponível
        </div>
      )}

      <details className="chart-data pt-2" style={{ marginTop: 16 }} open={showDetails}>
        <summary onClick={toggleDetails}>
          {showDetails ? 'Ocultar valores do gráfico' : 'Ver valores do gráfico'}
        </summary>
        <table>
          <thead>
            <tr>
              <th>Segmento</th>
              <th>{hasRevenue ? 'Receita' : 'Clientes'}</th>
              <th>Participação</th>
            </tr>
          </thead>
          <tbody>
            {segmentData.map((row) => (
              <tr key={row.label}>
                <td>
                  <span className="inline-flex items-center gap-1.5">
                    <i className="w-2 h-2 rounded-full inline-block" style={{ background: row.color }} />
                    {row.label}
                  </span>
                </td>
                <td>{hasRevenue ? formatCurrency(row.value) : `${row.value} clientes`}</td>
                <td>{row.percentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </article>
    {/* CARD 2: METAS E EVOLUÇÃO (DINÂMICO CONFORME O FILTRO DE PERÍODO) */}
    <article className="dashboard-card">
      {(() => {
        const now = new Date('2026-10-17T12:00:00-03:00');
        const currentYear = now.getFullYear();
        const currentMonthIdx = now.getMonth();
        const monthNames = [
          'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
          'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        const currentMonthName = monthNames[currentMonthIdx];
        const currentQuarterIdx = Math.floor(currentMonthIdx / 3);
        const currentQuarterNum = currentQuarterIdx + 1;

        // Dados para o modo "Este mês": Gráfico comparativo de 3 Barras (Realizado, Forecast, Meta)
        const monthTarget = data.kpis.periodTarget ?? data.kpis.monthlyTarget;
        const monthRealized = data.kpis.periodAchieved ?? data.kpis.totalRevenue;
        const monthForecast = data.kpis.forecastValue;

        const monthBarsData = [
          { name: 'Realizado', value: monthRealized, fill: '#10b981' },
          { name: 'Forecast', value: monthForecast, fill: '#6366f1' },
          { name: 'Meta', value: monthTarget, fill: '#f59e0b' }
        ];

        // Dados para o modo "Trimestre": Zoom nos 3 meses do trimestre corrente
        const quarterTrendData = data.trendLine.slice(currentQuarterIdx * 3, currentQuarterIdx * 3 + 3);

        const isMonth = period === 'month';
        const isQuarter = period === 'qtd';

        if (isMonth) {
          return (
            <>
              <div className="h-[44px] flex flex-col justify-between mb-2">
                <h2 className="text-sm font-extrabold tracking-tight" style={{ color: 'var(--crm-text)' }}>
                  Meta de {currentMonthName} · {currentYear}
                </h2>
                <div className="chart-legend">
                  <span><i style={{ background: '#10b981' }} />Realizado</span>
                  <span><i style={{ background: '#6366f1' }} />Forecast</span>
                  <span><i style={{ background: '#f59e0b' }} />Meta</span>
                </div>
              </div>

              <div className="dashboard-chart" role="img" aria-label={`Comparativo de realizado, forecast e meta de ${currentMonthName}`} style={{ height: 240, marginTop: 8 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthBarsData} margin={{ top: 16, right: 16, left: 0, bottom: 4 }}>
                    <CartesianGrid vertical={false} stroke="var(--crm-border)" strokeDasharray="3 5" />
                    <XAxis dataKey="name" tick={axis} axisLine={false} tickLine={false} dy={8} />
                    <YAxis tick={axis} tickFormatter={compact} axisLine={false} tickLine={false} width={48} />
                    <Tooltip contentStyle={tooltipStyle} formatter={currency} />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={48} isAnimationActive={false}>
                      {monthBarsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <details className="chart-data pt-2" style={{ marginTop: 16 }} open={showDetails}>
                <summary onClick={toggleDetails}>
                  {showDetails ? 'Ocultar valores do gráfico' : 'Ver valores do gráfico'}
                </summary>
                <table>
                  <thead>
                    <tr>
                      <th>Indicador</th>
                      <th>Valor</th>
                      <th>% da Meta</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthBarsData.map(row => (
                      <tr key={row.name}>
                        <td>
                          <span className="inline-flex items-center gap-1.5 font-semibold">
                            <i className="w-2 h-2 rounded-full inline-block" style={{ background: row.fill }} />
                            {row.name}
                          </span>
                        </td>
                        <td>{formatCurrency(row.value)}</td>
                        <td>{monthTarget > 0 ? `${((row.value / monthTarget) * 100).toFixed(1)}%` : '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </details>
            </>
          );
        }

        return (
          <>
            <div className="h-[44px] flex flex-col justify-between mb-2">
              <h2 className="text-sm font-extrabold tracking-tight" style={{ color: 'var(--crm-text)' }}>
                {isQuarter 
                  ? `Meta do ${currentQuarterNum}º Trimestre (Q${currentQuarterNum}) · ${currentYear}`
                  : `Meta por mês · ${currentYear}`}
              </h2>
              <div className="chart-legend">
                <span><i style={{ background: '#10b981' }} />Realizado</span>
                <span><i style={{ background: '#6366f1' }} />Forecast</span>
                <span><i style={{ background: '#f59e0b' }} />Meta</span>
              </div>
            </div>

            <div className="dashboard-chart" role="img" aria-label="Realizado, previsão e meta por mês" style={{ height: 240, marginTop: 8 }}>
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart 
                  data={isQuarter ? quarterTrendData : data.trendLine} 
                  margin={{ top: 12, right: 8, left: 0, bottom: 0 }}
                >
                  <CartesianGrid vertical={false} stroke="var(--crm-border)" strokeDasharray="3 5" />
                  <XAxis dataKey="monthName" tick={axis} axisLine={false} tickLine={false} dy={8} minTickGap={12} />
                  <YAxis tick={axis} tickFormatter={compact} axisLine={false} tickLine={false} width={48} />
                  <Tooltip contentStyle={tooltipStyle} formatter={currency} />
                  <Bar dataKey="realized" name="Realizado" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={isQuarter ? 32 : 18} isAnimationActive={false} />
                  <Line type="monotone" dataKey="forecast" name="Forecast" stroke="#6366f1" strokeWidth={2} strokeDasharray="5 4" dot={false} isAnimationActive={false} />
                  <Line dataKey="baseTarget" name="Meta" stroke="#f59e0b" strokeWidth={2.5} strokeDasharray="6 4" dot={{ r: 3, fill: '#f59e0b' }} isAnimationActive={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            <details className="chart-data pt-2" style={{ marginTop: 16 }} open={showDetails}>
              <summary onClick={toggleDetails}>
                {showDetails ? 'Ocultar valores do gráfico' : 'Ver valores do gráfico'}
              </summary>
              <table>
                <thead>
                  <tr>
                    <th>Mês</th>
                    <th>Realizado</th>
                    <th>Forecast</th>
                    <th>Meta</th>
                  </tr>
                </thead>
                <tbody>
                  {(isQuarter ? quarterTrendData : data.trendLine).map(row => (
                    <tr key={row.month}>
                      <td>{row.monthName}</td>
                      <td>{formatCurrency(row.realized)}</td>
                      <td>{formatCurrency(row.forecast)}</td>
                      <td>{formatCurrency(row.baseTarget)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </details>
          </>
        );
      })()}
    </article>
  </section>;
}
