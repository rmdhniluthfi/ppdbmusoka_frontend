import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ nama_lengkap: '', email: '', password: '', password_confirmation: '', nomor_hp: '' })
  const [errors, setErrors] = useState({})
  const [globalError, setGlobalError] = useState('')
  const [loading, setLoading] = useState(false)

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setGlobalError('')
    setErrors({})
    setLoading(true)
    try {
      await register(form)
      navigate('/siswa/dashboard')
    } catch (err) {
      if (err.errors) setErrors(err.errors)
      else setGlobalError(err.message || 'Registrasi gagal')
    } finally {
      setLoading(false)
    }
  }

  const inputCls = (name) => `w-full px-4 py-2.5 border rounded-lg text-sm outline-none transition-all ${errors[name] ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-primary/30 focus:border-primary'} focus:ring-2`

  return (
    <div className="min-h-[calc(100vh-68px)] bg-gradient-to-br from-primary-bg via-white to-primary-bg flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden p-6 sm:p-8">
          <div className="text-center mb-6">
            <h2 className="font-heading text-xl font-bold text-gray-900">Buat Akun Baru</h2>
            <p className="text-sm text-gray-500 mt-1">Daftarkan diri Anda untuk memulai PPDB Online</p>
          </div>

          {globalError && (
            <div className="mb-4 p-3 bg-danger-bg text-danger text-sm rounded-lg border-l-4 border-danger">⚠ {globalError}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Lengkap <span className="text-red-500">*</span></label>
              <input type="text" name="nama_lengkap" required value={form.nama_lengkap} onChange={onChange} placeholder="Sesuai akta lahir" className={inputCls('nama_lengkap')} />
              {errors.nama_lengkap && <p className="text-xs text-red-500 mt-1">{errors.nama_lengkap}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email <span className="text-red-500">*</span></label>
              <input type="email" name="email" required value={form.email} onChange={onChange} placeholder="email@contoh.com" className={inputCls('email')} />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Nomor HP / WhatsApp <span className="text-red-500">*</span></label>
              <input type="text" name="nomor_hp" required value={form.nomor_hp} onChange={onChange} placeholder="08xxxxxxxxxx" className={inputCls('nomor_hp')} />
              {errors.nomor_hp && <p className="text-xs text-red-500 mt-1">{errors.nomor_hp}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password <span className="text-red-500">*</span></label>
              <input type="password" name="password" required value={form.password} onChange={onChange} placeholder="Minimal 6 karakter" className={inputCls('password')} />
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Konfirmasi Password <span className="text-red-500">*</span></label>
              <input type="password" name="password_confirmation" required value={form.password_confirmation} onChange={onChange} placeholder="Ulangi password" className={inputCls('password_confirmation')} />
              {errors.password_confirmation && <p className="text-xs text-red-500 mt-1">{errors.password_confirmation}</p>}
            </div>
            <button type="submit" disabled={loading} className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer">
              {loading ? 'Memproses...' : 'Daftar Sekarang'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-5">
            Sudah punya akun?{' '}
            <Link to="/login" className="text-primary font-semibold hover:underline">Masuk di sini</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
