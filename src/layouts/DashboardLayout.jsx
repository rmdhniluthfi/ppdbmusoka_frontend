import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const siswaMenu = [
  { path: '/siswa/dashboard', icon: '📊', label: 'Dashboard' },
  { path: '/siswa/formulir', icon: '📝', label: 'Formulir Pendaftaran' },
  { path: '/siswa/berkas', icon: '📎', label: 'Unggah Berkas' },
  { path: '/siswa/status', icon: '📋', label: 'Status Pendaftaran' },
  { path: '/siswa/profil', icon: '👤', label: 'Profil Akun' },
]

const adminMenu = [
  { path: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
  { path: '/admin/pendaftar', icon: '👥', label: 'Data Pendaftar' },
  { path: '/admin/laporan', icon: '📈', label: 'Laporan' },
  { path: '/admin/pengaturan', icon: '⚙️', label: 'Pengaturan' },
]

export default function DashboardLayout({ role }) {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const menu = role === 'admin' ? adminMenu : siswaMenu

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Overlay */}
      {open && <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 bottom-0 w-64 bg-primary-dark text-white flex flex-col z-50 transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        {/* Sidebar Header */}
        <div className="p-5 flex items-center gap-3 border-b border-white/10">
          <img src="/PPDB_MUSOKA/frontend/logo.png" alt="Logo" className="h-9 w-auto" />
          <div className="flex flex-col">
            <span className="font-heading font-bold text-[0.9375rem]">MUSOKA</span>
            <span className="text-[0.6875rem] text-secondary tracking-wider">PPDB Online</span>
            {role === 'admin' && <span className="inline-block mt-0.5 px-2 py-[1px] bg-secondary text-gray-900 text-[0.625rem] font-semibold rounded-full uppercase tracking-wide w-fit">Admin</span>}
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-3 overflow-y-auto">
          {menu.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-[11px] text-sm font-medium border-l-[3px] transition-all ${
                  isActive
                    ? 'text-white bg-white/15 border-secondary'
                    : 'text-white/75 border-transparent hover:text-white hover:bg-white/[0.08]'
                }`
              }
            >
              <span className="w-5 text-center">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
          <div className="h-px bg-white/10 mx-5 my-2" />
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-5 py-[11px] text-sm font-medium text-white/60 hover:text-white border-l-[3px] border-transparent hover:bg-white/[0.08] w-full text-left transition-all cursor-pointer"
          >
            <span className="w-5 text-center">🚪</span>
            Keluar
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 min-h-screen">
        {/* Topbar */}
        <header className="sticky top-0 z-30 h-[60px] bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 shadow-sm">
          <div className="flex items-center gap-3">
            <button className="md:hidden text-xl text-gray-700 cursor-pointer" onClick={() => setOpen(!open)}>☰</button>
            <h1 className="text-lg font-semibold text-gray-800">PPDB Online</h1>
          </div>
          <div className="flex items-center gap-2.5 text-sm text-gray-500">
            <span className="hidden sm:inline">{user?.nama_lengkap}</span>
            <div className="w-9 h-9 rounded-full bg-primary-bg text-primary flex items-center justify-center font-semibold text-sm">
              {user?.nama_lengkap?.charAt(0)?.toUpperCase()}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 sm:p-6 animate-[fadeIn_0.4s_ease]">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
