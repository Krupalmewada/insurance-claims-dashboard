import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { useMemo } from 'react'
import { useClaims } from '../../context/ClaimsContext'
import { useTheme } from '../../context/ThemeContext'
import './Chart.css'

const STATUS_COLORS = {
  Open: '#f85149',
  'In Review': '#e3b341',
  Closed: '#3fb950',
}

const STATUS_COLORS_LIGHT = {
  Open: '#dc2626',
  'In Review': '#d97706',
  Closed: '#059669',
}

const STATUSES = ['Open', 'In Review', 'Closed']

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip__label">{label}</p>
      <p className="chart-tooltip__value">
        {payload[0].value} {payload[0].value === 1 ? 'claim' : 'claims'}
      </p>
    </div>
  )
}

export default function Chart() {
  const { claims } = useClaims()
  const { isDark } = useTheme()

  const colors = isDark ? STATUS_COLORS : STATUS_COLORS_LIGHT
  const gridColor = isDark ? '#30363d' : '#e8edf3'
  const tickColor = isDark ? '#8b949e' : '#6b7a8d'

  const data = useMemo(
    () =>
      STATUSES.map((status) => ({
        status,
        count: claims.filter((c) => c.status === status).length,
      })),
    [claims],
  )

  return (
    <div className="chart-container" role="img" aria-label="Bar chart showing claims by status">
      <div className="chart-header">
        <h2 className="chart-title">Claims by Status</h2>
        <p className="chart-subtitle">Current distribution across all statuses</p>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart
          data={data}
          margin={{ top: 8, right: 16, left: -10, bottom: 0 }}
          aria-hidden="true"
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={gridColor}
            vertical={false}
          />
          <XAxis
            dataKey="status"
            tick={{ fill: tickColor, fontSize: 12, fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fill: tickColor, fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,59,113,0.04)' }}
          />
          <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={64}>
            {data.map((entry) => (
              <Cell key={entry.status} fill={colors[entry.status]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="chart-legend" aria-label="Chart legend">
        {STATUSES.map((status) => (
          <div key={status} className="chart-legend__item">
            <span
              className="chart-legend__dot"
              style={{ backgroundColor: colors[status] }}
              aria-hidden="true"
            />
            <span>{status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
