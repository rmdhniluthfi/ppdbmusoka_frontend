import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import PublicLayout from './layouts/PublicLayout'
import DashboardLayout from './layouts/DashboardLayout'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import SiswaDashboard from './pages/siswa/Dashboard'
import SiswaFormulir from './pages/siswa/Formulir'
import SiswaBerkas from './pages/siswa/Berkas'
import SiswaStatus from './pages/siswa/Status'
import SiswaProfil from './pages/siswa/Profil'
import AdminDashboard from './pages/admin/Dashboard'
import AdminPendaftar from './pages/admin/Pendaftar'
import AdminPendaftarDetail from './pages/admin/PendaftarDetail'
import AdminLaporan from './pages/admin/Laporan'
import AdminPengaturan from './pages/admin/Pengaturan'

function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="page-loader"><div className="spinner"></div></div>
  if (!user) return <Navigate to="/login" replace />
  if (role && user.role !== role) {
    return <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/siswa/dashboard'} replace />
  }
  return children
}

function GuestRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="page-loader"><div className="spinner"></div></div>
  if (user) {
    return <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/siswa/dashboard'} replace />
  }
  return children
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
          <Route path="/register" element={<GuestRoute><RegisterPage /></GuestRoute>} />
        </Route>

        {/* Siswa */}
        <Route path="/siswa" element={<ProtectedRoute role="siswa"><DashboardLayout role="siswa" /></ProtectedRoute>}>
          <Route path="dashboard" element={<SiswaDashboard />} />
          <Route path="formulir" element={<SiswaFormulir />} />
          <Route path="berkas" element={<SiswaBerkas />} />
          <Route path="status" element={<SiswaStatus />} />
          <Route path="profil" element={<SiswaProfil />} />
        </Route>

        {/* Admin */}
        <Route path="/admin" element={<ProtectedRoute role="admin"><DashboardLayout role="admin" /></ProtectedRoute>}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="pendaftar" element={<AdminPendaftar />} />
          <Route path="pendaftar/:id" element={<AdminPendaftarDetail />} />
          <Route path="laporan" element={<AdminLaporan />} />
          <Route path="pengaturan" element={<AdminPengaturan />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  )
}
