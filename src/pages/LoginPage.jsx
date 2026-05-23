import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState('siswa')
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const user = await login(form.email, form.password)
      navigate(user.role === 'admin' ? '/admin/dashboard' : '/siswa/dashboard')
    } catch (err) {
      setError(err.message || 'Email atau password salah')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-68px)] bg-gradient-to-br from-primary-bg via-white to-primary-bg flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button onClick={() => setTab('siswa')} className={`flex-1 py-3.5 text-sm font-semibold transition-colors cursor-pointer ${tab === 'siswa' ? 'text-primary border-b-2 border-primary bg-primary-bg/50' : 'text-gray-400 hover:text-gray-600'}`}>
              👨‍🎓 Calon Siswa
            </button>
            <button onClick={() => setTab('admin')} className={`flex-1 py-3.5 text-sm font-semibold transition-colors cursor-pointer ${tab === 'admin' ? 'text-primary border-b-2 border-primary bg-primary-bg/50' : 'text-gray-400 hover:text-gray-600'}`}>
              🔑 Admin
            </button>
          </div>

          <div className="p-6 sm:p-8">
            <div className="text-center mb-6">
              <h2 className="font-heading text-xl font-bold text-gray-900">
                {tab === 'siswa' ? 'Masuk sebagai Calon Siswa' : 'Masuk sebagai Admin'}
              </h2>
              <p className="text-sm text-gray-500 mt-1">Masukkan email dan password Anda</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-danger-bg text-danger text-sm rounded-lg border-l-4 border-danger">
                ⚠ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <input
                  type="email" required autoFocus
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder={tab === 'admin' ? 'admin@musoka.sch.id' : 'email@contoh.com'}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <input
                  type="password" required
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="Masukkan password"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                />
              </div>
              <button
                type="submit" disabled={loading}
                className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? 'Memproses...' : 'Masuk'}
              </button>
            </form>

            {tab === 'siswa' && (
              <p className="text-center text-sm text-gray-500 mt-5">
                Belum punya akun?{' '}
                <Link to="/register" className="text-primary font-semibold hover:underline">Daftar di sini</Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
