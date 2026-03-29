import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useClaims } from '../../context/ClaimsContext'
import ClaimForm from '../../components/ClaimForm/ClaimForm'
import './NewClaim.css'

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

export default function NewClaim() {
  const navigate = useNavigate()
  const { addClaim } = useClaims()
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [newClaimId, setNewClaimId] = useState(null)

  const handleSubmit = (formData) => {
    setLoading(true)
    // Simulate a short async operation for realism
    setTimeout(() => {
      const id = addClaim(formData)
      setNewClaimId(id)
      setLoading(false)
      setSubmitted(true)
    }, 600)
  }

  const handleViewClaim = () => {
    navigate(`/claims/${newClaimId}`)
  }

  const handleGoToList = () => {
    navigate('/claims')
  }

  if (submitted) {
    return (
      <div className="new-claim__success" role="main" aria-live="polite">
        <div className="new-claim__success-icon" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h1 className="new-claim__success-title">Claim Submitted Successfully</h1>
        <p className="new-claim__success-message">
          Your claim <strong>{newClaimId}</strong> has been received and is now{' '}
          <strong>Open</strong> for review by our team.
        </p>
        <div className="new-claim__success-actions">
          <button className="new-claim__btn new-claim__btn--primary" onClick={handleViewClaim}>
            View Claim {newClaimId}
          </button>
          <button className="new-claim__btn new-claim__btn--secondary" onClick={handleGoToList}>
            Back to Claims
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="new-claim" role="main">
      <div className="new-claim__topbar">
        <button
          className="new-claim__back-btn"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <IconArrowLeft />
          Back
        </button>
      </div>

      <div className="page-header">
        <h1 className="page-title">Submit New Claim</h1>
        <p className="page-subtitle">
          Complete the form below. All submitted claims begin with <strong>Open</strong> status.
        </p>
      </div>

      <div className="new-claim__card">
        <ClaimForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  )
}
