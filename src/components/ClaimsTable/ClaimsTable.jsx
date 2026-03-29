import { useNavigate } from 'react-router-dom'
import StatusBadge from '../StatusBadge/StatusBadge'
import './ClaimsTable.css'

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function ClaimsTable({ claims, compact = false }) {
  const navigate = useNavigate()

  if (claims.length === 0) {
    return (
      <div className="claims-table__empty" role="status">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
        <p>No claims found</p>
      </div>
    )
  }

  return (
    <div className="claims-table-wrapper" role="region" aria-label="Claims table">
      <table className="claims-table">
        <thead>
          <tr>
            <th scope="col">Claim ID</th>
            <th scope="col">Claimant</th>
            <th scope="col">Type</th>
            <th scope="col">Status</th>
            <th scope="col">Amount</th>
            {!compact && <th scope="col">Date Filed</th>}
          </tr>
        </thead>
        <tbody>
          {claims.map((claim) => (
            <tr
              key={claim.id}
              className="claims-table__row"
              onClick={() => navigate(`/claims/${claim.id}`)}
              onKeyDown={(e) => e.key === 'Enter' && navigate(`/claims/${claim.id}`)}
              tabIndex={0}
              role="button"
              aria-label={`View claim ${claim.id} for ${claim.name}`}
            >
              <td>
                <span className="claims-table__id">{claim.id}</span>
              </td>
              <td>
                <div className="claims-table__claimant">
                  <span className="claims-table__name">{claim.name}</span>
                  {!compact && (
                    <span className="claims-table__email">{claim.email}</span>
                  )}
                </div>
              </td>
              <td>
                <span className="claims-table__type">{claim.type}</span>
              </td>
              <td>
                <StatusBadge status={claim.status} />
              </td>
              <td>
                <span className="claims-table__amount">
                  {formatCurrency(claim.amount)}
                </span>
              </td>
              {!compact && <td>{formatDate(claim.date)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
