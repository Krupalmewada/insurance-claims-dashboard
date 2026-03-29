import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useClaims } from '../../context/ClaimsContext'
import ClaimCard from '../../components/ClaimCard/ClaimCard'
import Chart from '../../components/Chart/Chart'
import ClaimsTable from '../../components/ClaimsTable/ClaimsTable'
import './Dashboard.css'

export default function Dashboard() {
  const { claims } = useClaims()

  const stats = useMemo(
    () => ({
      total: claims.length,
      open: claims.filter((c) => c.status === 'Open').length,
      inReview: claims.filter((c) => c.status === 'In Review').length,
      closed: claims.filter((c) => c.status === 'Closed').length,
    }),
    [claims],
  )

  const recentClaims = useMemo(
    () =>
      [...claims]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5),
    [claims],
  )

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Welcome back — here's your claims overview</p>
      </div>

      <div className="dashboard__stats" role="list" aria-label="Claims summary">
        <div role="listitem">
          <ClaimCard title="Total Claims" value={stats.total} variant="total" />
        </div>
        <div role="listitem">
          <ClaimCard title="Open" value={stats.open} variant="open" />
        </div>
        <div role="listitem">
          <ClaimCard title="In Review" value={stats.inReview} variant="review" />
        </div>
        <div role="listitem">
          <ClaimCard title="Closed" value={stats.closed} variant="closed" />
        </div>
      </div>

      <div className="dashboard__grid">
        <section className="dashboard__chart-section" aria-label="Claims chart">
          <Chart />
        </section>

        <section className="dashboard__recent-section" aria-label="Recent claims">
          <div className="dashboard__section-header">
            <h2 className="dashboard__section-title">Recent Claims</h2>
            <Link to="/claims" className="dashboard__view-all">
              View all →
            </Link>
          </div>
          <ClaimsTable claims={recentClaims} compact />
        </section>
      </div>
    </div>
  )
}
