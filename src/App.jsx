import { useState } from 'react'
import { Routes, Route, Outlet, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Sidebar from './components/Sidebar/Sidebar'
import Navbar from './components/Navbar/Navbar'
import Dashboard from './pages/Dashboard/Dashboard'
import ClaimsList from './pages/ClaimsList/ClaimsList'
import ClaimDetail from './pages/ClaimDetail/ClaimDetail'
import NewClaim from './pages/NewClaim/NewClaim'
import Login from './pages/Login/Login'
import './App.css'

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <div className="app-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="app-main">
        <Navbar onMenuClick={() => setSidebarOpen((prev) => !prev)} />
        <main className="app-content" id="main-content" tabIndex={-1}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

function ProtectedLayout() {
  const { currentUser } = useAuth()
  if (!currentUser) return <Navigate to="/login" replace />
  return <AppLayout />
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/claims" element={<ClaimsList />} />
        <Route path="/claims/new" element={<NewClaim />} />
        <Route path="/claims/:id" element={<ClaimDetail />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
