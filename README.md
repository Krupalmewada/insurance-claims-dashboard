# ClaimTrack — Insurance Claims Dashboard

A responsive, enterprise-style insurance claims management dashboard built as a frontend portfolio project. It demonstrates real-world React patterns including multi-user authentication, protected routing, per-user data isolation, dark/light theming, and full form validation — all without a backend.

---

## Screenshots

> Dashboard · Claims List · Claim Detail · New Claim · Login

*(Add screenshots here after deployment)*

---

## Features

### Authentication
- Login page with email + password validation
- 3 demo accounts with click-to-autofill buttons
- Session persisted in `localStorage` — survives page refresh
- Protected routes: unauthenticated users are redirected to `/login`
- Logout from sidebar or navbar

### Dashboard (`/`)
- KPI summary cards — Total, Open, In Review, Closed claim counts
- Interactive bar chart (Recharts) showing claims by status
- Recent claims table (latest 5, sorted by date)

### Claims List (`/claims`)
- Full table of all claims for the logged-in user
- Real-time search by claimant name or claim ID
- Status filter pills — All / Open / In Review / Closed
- Clickable rows navigate to claim detail

### Claim Detail (`/claims/:id`)
- Full claim info displayed in a structured layout
- Prominent amount + type + date banner
- Color-coded status badge
- Back navigation

### New Claim Form (`/claims/new`)
- Fields: Full Name, Email, Claim Type, Description, Amount
- Inline validation with field-level error messages (on blur + submit)
- Animated success screen with quick navigation after submit
- New claims are scoped to the current user and persisted to `localStorage`

### Multi-User
- 3 independent user accounts, each with their own set of claims
- Switching accounts shows a completely different dashboard
- Claims submitted by a user stay on their account

### UI / UX
- Dark and light theme toggle (persists across sessions, respects `prefers-color-scheme` on first visit)
- Fully responsive — mobile slide-out sidebar with overlay, hamburger menu
- Accessible: semantic HTML, ARIA labels, keyboard-navigable table rows, focus management
- Smooth CSS transitions on all theme switches

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| React | 18 | UI library |
| React Router | v6 | Client-side routing + protected routes |
| Recharts | 2 | Claims bar chart |
| Context API | — | Auth state, claims state, theme state |
| Plain CSS | — | All styling, no Tailwind or UI library |
| Vite | 5 | Build tool & dev server |

---

## Getting Started

```bash
git clone https://github.com/Krupalmewada/IsuranceDemoApp.git
cd IsuranceDemoApp
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Demo Accounts

| Name | Email | Password | Role |
|---|---|---|---|
| John Doe | john.doe@claimtrack.com | password123 | Claims Adjuster |
| Sarah Lee | sarah.lee@claimtrack.com | password123 | Senior Adjuster |
| Mike Torres | mike.torres@claimtrack.com | password123 | Claims Manager |

---

## Project Structure

```
src/
  components/
    Chart/            # Recharts bar chart (theme-aware colors)
    ClaimCard/        # KPI stat cards on Dashboard
    ClaimForm/        # New claim form with validation
    ClaimsTable/      # Reusable table used by Dashboard + ClaimsList
    Navbar/           # Top bar — user info, theme toggle, logout
    Sidebar/          # Fixed sidebar nav — user info, logout
    StatusBadge/      # Color-coded Open / In Review / Closed pill
  context/
    AuthContext.jsx   # Login, logout, currentUser, localStorage session
    ClaimsContext.jsx # Per-user claim filtering, addClaim, localStorage persist
    ThemeContext.jsx  # Dark/light toggle, localStorage + prefers-color-scheme
  data/
    claims.js         # 12 mock claims (4 per user)
    users.js          # 3 mock users with credentials
  pages/
    Login/            # /login — auth form + demo account quick-login
    Dashboard/        # / — KPI cards, chart, recent claims
    ClaimsList/       # /claims — searchable, filterable claims table
    ClaimDetail/      # /claims/:id — full detail view
    NewClaim/         # /claims/new — form + success screen
  App.jsx             # Routes, ProtectedLayout, AppLayout (Outlet)
  main.jsx            # Entry point — provider tree
```

---

## Data Shape

```js
// Claim
{
  id:          "CLM-001",
  userId:      1,                          // links to a user
  name:        "Jane Smith",              // claimant name
  email:       "jane@email.com",
  type:        "Auto" | "Home" | "Health" | "Life",
  status:      "Open" | "In Review" | "Closed",
  amount:      4500,                       // USD
  description: "...",
  date:        "2026-01-15",
}

// User
{
  id:          1,
  name:        "John Doe",
  email:       "john.doe@claimtrack.com",
  role:        "Claims Adjuster",
  initials:    "JD",
  avatarColor: "#0066cc",
}
```

---

## Status Badge Colors

| Status | Color |
|---|---|
| Open | Red |
| In Review | Amber / Yellow |
| Closed | Green |

---

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run preview  # Preview production build locally
```

---

## Why This Project

This project was built to demonstrate frontend skills relevant to enterprise insurance software. It covers:

- Real-world React patterns (context, protected routes, controlled forms)
- Multi-user UX with scoped data per account
- Accessible, production-quality UI without a CSS framework
- Clean component architecture that mirrors industry codebases
