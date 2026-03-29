import { useParams, useNavigate } from 'react-router-dom'
import { useClaims } from '../../context/ClaimsContext'
import StatusBadge from '../../components/StatusBadge/StatusBadge'
import './ClaimDetail.css'

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
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function IconArrowLeft() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  )
}

function DetailField({ label, value, children }) {
  return (
    <div className="claim-detail__field">
      <dt className="claim-detail__field-label">{label}</dt>
      <dd className="claim-detail__field-value">{children ?? value}</dd>
    </div>
  )
}

export default function ClaimDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getClaimById } = useClaims()
  const claim = getClaimById(id)

  if (!claim) {
    return (
      <div className="claim-detail__not-found" role="main">
        <h1 className="claim-detail__not-found-title">Claim Not Found</h1>
        <p>No claim with ID <strong>{id}</strong> exists in the system.</p>
        <button
          className="claim-detail__back-btn"
          onClick={() => navigate('/claims')}
        >
          <IconArrowLeft />
          Back to Claims
        </button>
      </div>
    )
  }

  return (
    <div className="claim-detail" role="main">
      <div className="claim-detail__topbar">
        <button
          className="claim-detail__back-btn"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <IconArrowLeft />
          Back
        </button>
        <div className="claim-detail__breadcrumb" aria-label="Breadcrumb">
          <span>Claims</span>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">{claim.id}</span>
        </div>
      </div>

      <div className="claim-detail__card">
        <header className="claim-detail__header">
          <div className="claim-detail__header-left">
            <span className="claim-detail__id">{claim.id}</span>
            <h1 className="claim-detail__claimant">{claim.name}</h1>
          </div>
          <div className="claim-detail__header-right">
            <StatusBadge status={claim.status} />
          </div>
        </header>

        <div className="claim-detail__amount-banner">
          <div>
            <p className="claim-detail__amount-label">Claim Amount</p>
            <p className="claim-detail__amount-value">
              {formatCurrency(claim.amount)}
            </p>
          </div>
          <div>
            <p className="claim-detail__amount-label">Claim Type</p>
            <p className="claim-detail__type-value">{claim.type}</p>
          </div>
          <div>
            <p className="claim-detail__amount-label">Date Filed</p>
            <p className="claim-detail__date-value">{formatDate(claim.date)}</p>
          </div>
        </div>

        <dl className="claim-detail__fields">
          <DetailField label="Claimant Name" value={claim.name} />
          <DetailField label="Email Address" value={claim.email} />
          <DetailField label="Claim Type" value={claim.type} />
          <DetailField label="Status">
            <StatusBadge status={claim.status} />
          </DetailField>
          <DetailField label="Date Filed" value={formatDate(claim.date)} />
          <DetailField label="Claim Amount" value={formatCurrency(claim.amount)} />
        </dl>

        <div className="claim-detail__description">
          <h2 className="claim-detail__description-title">Claim Description</h2>
          <p className="claim-detail__description-text">{claim.description}</p>
        </div>
      </div>
    </div>
  )
}
