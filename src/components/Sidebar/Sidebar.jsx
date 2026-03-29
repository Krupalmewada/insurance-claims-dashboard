import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Sidebar.css'

function IconDashboard() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </svg>
  )
}

function IconClaims() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  )
}

function IconPlus() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  )
}

function IconShield() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  )
}

function IconLogout() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  )
}

export default function Sidebar({ isOpen, onClose }) {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const linkClass = ({ isActive }) =>
    `sidebar__link${isActive ? ' sidebar__link--active' : ''}`

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <>
      {isOpen && (
        <div className="sidebar-overlay" onClick={onClose} aria-hidden="true" />
      )}
      <aside
        className={`sidebar${isOpen ? ' sidebar--open' : ''}`}
        aria-label="Main navigation"
      >
        <div className="sidebar__brand" aria-label="ClaimTrack">
          <div className="sidebar__brand-icon">
            <IconShield />
          </div>
          <div className="sidebar__brand-text">
            <span className="sidebar__brand-name">ClaimTrack</span>
            <span className="sidebar__brand-sub">Insurance Portal</span>
          </div>
        </div>

        <nav className="sidebar__nav" aria-label="Primary navigation">
          <p className="sidebar__section-label">Navigation</p>
          <NavLink to="/" end className={linkClass} onClick={onClose}>
            <IconDashboard />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/claims" className={linkClass} onClick={onClose}>
            <IconClaims />
            <span>Claims</span>
          </NavLink>
          <NavLink to="/claims/new" className={linkClass} onClick={onClose}>
            <IconPlus />
            <span>New Claim</span>
          </NavLink>
        </nav>

        <div className="sidebar__footer">
          {currentUser && (
            <div className="sidebar__user-row">
              <div
                className="sidebar__avatar"
                style={{ backgroundColor: currentUser.avatarColor || 'rgba(255,255,255,0.2)' }}
                aria-hidden="true"
              >
                {currentUser.initials}
              </div>
              <div className="sidebar__user-info">
                <span className="sidebar__user-name">{currentUser.name}</span>
                <span className="sidebar__user-role">{currentUser.role}</span>
              </div>
              <button
                className="sidebar__logout-btn"
                onClick={handleLogout}
                aria-label="Sign out"
                title="Sign out"
              >
                <IconLogout />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
