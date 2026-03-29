import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { mockUsers } from '../../data/users'
import './Login.css'

function IconShield() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  )
}

function IconEye() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function IconEyeOff() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  )
}

function IconAlert() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  )
}

function IconMoon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function IconSun() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function IconSpinner() {
  return <span className="login-spinner" aria-hidden="true" />
}

export default function Login() {
  const { currentUser, login } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (currentUser) return <Navigate to="/" replace />

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    setTimeout(() => {
      const result = login(email, password)
      if (result.success) {
        navigate('/', { replace: true })
      } else {
        setError(result.error)
        setLoading(false)
      }
    }, 500)
  }

  const quickLogin = (user) => {
    setEmail(user.email)
    setPassword(user.password)
    setError('')
  }

  return (
    <div className="login-page" aria-label="Sign in page">
      <button
        className="login-page__theme-btn"
        onClick={toggleTheme}
        aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
        title={isDark ? 'Light mode' : 'Dark mode'}
      >
        {isDark ? <IconSun /> : <IconMoon />}
      </button>

      <div className="login-card" role="main">
        {/* Brand */}
        <div className="login-card__brand">
          <div className="login-card__logo-icon">
            <IconShield />
          </div>
          <div>
            <p className="login-card__app-name">ClaimTrack</p>
            <p className="login-card__app-sub">Insurance Claims Management</p>
          </div>
        </div>

        <div className="login-card__divider" />

        <h1 className="login-card__title">Sign in to your account</h1>

        {error && (
          <div className="login-card__error" role="alert" aria-live="assertive">
            <IconAlert />
            <span>{error}</span>
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div className="login-form__group">
            <label className="login-form__label" htmlFor="login-email">
              Email Address
            </label>
            <input
              id="login-email"
              type="email"
              className="login-form__input"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError('') }}
              placeholder="you@claimtrack.com"
              autoComplete="email"
              autoFocus
              required
              aria-required="true"
            />
          </div>

          <div className="login-form__group">
            <label className="login-form__label" htmlFor="login-password">
              Password
            </label>
            <div className="login-form__pw-wrapper">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                className="login-form__input login-form__input--pw"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError('') }}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                aria-required="true"
              />
              <button
                type="button"
                className="login-form__pw-toggle"
                onClick={() => setShowPassword((p) => !p)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <IconEyeOff /> : <IconEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="login-form__submit"
            disabled={loading || !email || !password}
            aria-busy={loading}
          >
            {loading ? (
              <>
                <IconSpinner />
                Signing in…
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Demo accounts */}
        <div className="login-demo">
          <p className="login-demo__heading">
            Demo Accounts
            <span className="login-demo__hint"> — click any to auto-fill</span>
          </p>
          <div className="login-demo__list" role="list">
            {mockUsers.map((user) => (
              <button
                key={user.id}
                type="button"
                className="login-demo__user"
                onClick={() => quickLogin(user)}
                aria-label={`Quick sign in as ${user.name}, ${user.role}`}
                role="listitem"
              >
                <div
                  className="login-demo__avatar"
                  style={{ backgroundColor: user.avatarColor }}
                  aria-hidden="true"
                >
                  {user.initials}
                </div>
                <div className="login-demo__user-info">
                  <span className="login-demo__user-name">{user.name}</span>
                  <span className="login-demo__user-role">{user.role}</span>
                </div>
                <span className="login-demo__arrow" aria-hidden="true">→</span>
              </button>
            ))}
          </div>
          <p className="login-demo__creds">
            All accounts use password: <code>password123</code>
          </p>
        </div>
      </div>
    </div>
  )
}
