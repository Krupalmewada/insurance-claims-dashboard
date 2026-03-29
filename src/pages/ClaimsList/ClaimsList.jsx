import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useClaims } from '../../context/ClaimsContext'
import ClaimsTable from '../../components/ClaimsTable/ClaimsTable'
import './ClaimsList.css'

const STATUS_OPTIONS = ['All', 'Open', 'In Review', 'Closed']

function IconSearch() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

export default function ClaimsList() {
  const { claims } = useClaims()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const filteredClaims = useMemo(() => {
    const q = search.toLowerCase().trim()
    return claims.filter((c) => {
      const matchesStatus =
        statusFilter === 'All' || c.status === statusFilter
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q)
      return matchesStatus && matchesSearch
    })
  }, [claims, search, statusFilter])

  return (
    <div className="claims-list">
      <div className="page-header claims-list__header">
        <div>
          <h1 className="page-title">All Claims</h1>
          <p className="page-subtitle">
            {filteredClaims.length} of {claims.length} claims
          </p>
        </div>
        <Link to="/claims/new" className="claims-list__new-btn" aria-label="Submit a new claim">
          + New Claim
        </Link>
      </div>

      <div className="claims-list__toolbar" role="search" aria-label="Filter claims">
        <div className="claims-list__search-wrapper">
          <span className="claims-list__search-icon">
            <IconSearch />
          </span>
          <input
            type="search"
            className="claims-list__search"
            placeholder="Search by name or claim ID…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search claims by name or ID"
          />
          {search && (
            <button
              className="claims-list__search-clear"
              onClick={() => setSearch('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        <div
          className="claims-list__filters"
          role="group"
          aria-label="Filter by status"
        >
          {STATUS_OPTIONS.map((status) => (
            <button
              key={status}
              className={`claims-list__filter-btn${statusFilter === status ? ' claims-list__filter-btn--active' : ''}`}
              onClick={() => setStatusFilter(status)}
              aria-pressed={statusFilter === status}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <ClaimsTable claims={filteredClaims} />
    </div>
  )
}
