import { Outlet, Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

export default function PublicLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const isLanding = pathname === '/' || pathname === ''

  return (
    <>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-primary-dark border-b-[3px] border-secondary shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 sm:h-[68px]">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3 no-underline">
            <img src="/PPDB_MUSOKA/frontend/logo.png" alt="Logo MUSOKA" className="h-8 sm:h-10 w-auto" />
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="font-heading font-bold text-[0.9375rem] text-white">SMA Muhammadiyah Sokaraja</span>
              <span className="text-xs text-secondary tracking-widest">MUSOKA</span>
            </div>
          </Link>

          {/* Hamburger */}
          <button className="sm:hidden flex flex-col gap-[5px] p-1" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span className={`w-6 h-[2.5px] bg-white rounded transition-transform ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`w-6 h-[2.5px] bg-white rounded transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-[2.5px] bg-white rounded transition-transform ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>

          {/* Nav Links */}
          <div className={`${menuOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0 fixed sm:relative top-[59px] sm:top-0 left-0 right-0 bottom-0 sm:bottom-auto bg-primary-dark sm:bg-transparent p-6 sm:p-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-1 transition-transform z-50`}>
            <div className="flex flex-col sm:flex-row gap-0 sm:gap-1">
              {isLanding ? (
                <>
                  <a href="#hero" onClick={() => setMenuOpen(false)} className="px-3.5 py-3 sm:py-2 text-white/85 hover:text-white hover:bg-white/10 rounded-md text-sm font-medium transition-all">Beranda</a>
                  <a href="#info" onClick={() => setMenuOpen(false)} className="px-3.5 py-3 sm:py-2 text-white/85 hover:text-white hover:bg-white/10 rounded-md text-sm font-medium transition-all">Info</a>
                  <a href="#persyaratan" onClick={() => setMenuOpen(false)} className="px-3.5 py-3 sm:py-2 text-white/85 hover:text-white hover:bg-white/10 rounded-md text-sm font-medium transition-all">Persyaratan</a>
                  <a href="#jadwal" onClick={() => setMenuOpen(false)} className="px-3.5 py-3 sm:py-2 text-white/85 hover:text-white hover:bg-white/10 rounded-md text-sm font-medium transition-all">Jadwal</a>
                  <a href="#kontak" onClick={() => setMenuOpen(false)} className="px-3.5 py-3 sm:py-2 text-white/85 hover:text-white hover:bg-white/10 rounded-md text-sm font-medium transition-all">Kontak</a>
                </>
              ) : (
                <Link to="/" onClick={() => setMenuOpen(false)} className="px-3.5 py-3 sm:py-2 text-white/85 hover:text-white hover:bg-white/10 rounded-md text-sm font-medium transition-all">← Beranda</Link>
              )}
            </div>

            {/* Auth Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:ml-3 mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-white/15">
              <Link to="/login" onClick={() => setMenuOpen(false)} className="px-4 py-2.5 sm:py-[7px] text-center text-white text-[0.8125rem] font-medium border border-white/40 hover:border-white hover:bg-white/10 rounded-md transition-all">Masuk</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="px-4 py-2.5 sm:py-[7px] text-center bg-secondary text-gray-900 text-[0.8125rem] font-semibold rounded-md hover:bg-secondary-dark hover:text-white hover:shadow-lg transition-all">Daftar Sekarang</Link>
            </div>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  )
}
