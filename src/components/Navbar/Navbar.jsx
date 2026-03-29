import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import './Navbar.css'

function IconMenu() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

function IconBell() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
}

function IconMoon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function IconSun() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function IconLogout() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  )
}

const PAGE_TITLES = {
  '/': 'Dashboard',
  '/claims': 'All Claims',
  '/claims/new': 'New Claim',
}

function getTitle(pathname) {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname]
  if (pathname.startsWith('/claims/')) return 'Claim Detail'
  return 'ClaimTrack'
}

export default function Navbar({ onMenuClick }) {
  const { pathname } = useLocation()
  const { currentUser, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const title = getTitle(pathname)

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="navbar" role="banner">
      <div className="navbar__left">
        <button
          className="navbar__menu-btn"
          onClick={onMenuClick}
          aria-label="Toggle navigation menu"
        >
          <IconMenu />
        </button>
        <h1 className="navbar__title">{title}</h1>
      </div>
      <div className="navbar__right">
        <button
          className="navbar__icon-btn navbar__theme-btn"
          onClick={toggleTheme}
          aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
          title={isDark ? 'Light mode' : 'Dark mode'}
        >
          {isDark ? <IconSun /> : <IconMoon />}
        </button>
        <button className="navbar__icon-btn" aria-label="Notifications (3 unread)">
          <IconBell />
          <span className="navbar__badge" aria-label="3 notifications">3</span>
        </button>
        {currentUser && (
          <div className="navbar__user-group">
            <div className="navbar__user" aria-label={`Signed in as ${currentUser.name}`}>
              <div
                className="navbar__avatar"
                style={{ backgroundColor: currentUser.avatarColor || 'var(--color-primary)' }}
                aria-hidden="true"
              >
                {currentUser.initials}
              </div>
              <div className="navbar__user-text">
                <span className="navbar__user-name">{currentUser.name}</span>
                <span className="navbar__user-role">{currentUser.role}</span>
              </div>
            </div>
            <button
              className="navbar__icon-btn navbar__logout-btn"
              onClick={handleLogout}
              aria-label="Sign out"
              title="Sign out"
            >
              <IconLogout />
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
