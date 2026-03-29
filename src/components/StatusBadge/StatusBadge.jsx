import './StatusBadge.css'

export default function StatusBadge({ status }) {
  const variant = status === 'In Review' ? 'review' : status.toLowerCase()
  return (
    <span
      className={`status-badge status-badge--${variant}`}
      aria-label={`Status: ${status}`}
    >
      <span className="status-badge__dot" aria-hidden="true" />
      {status}
    </span>
  )
}
