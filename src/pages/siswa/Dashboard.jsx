import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../utils/api'
import { STATUS_LABELS } from '../../utils/helpers'

export default function SiswaDashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => { loadDashboard() }, [])

  async function loadDashboard() {
    try {
      const res = await api.get('api/auth/me')
      setData(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="flex justify-center py-20"><div className="spinner"></div></div>

  const p = data?.pendaftaran
  const statusColor = { draft: 'bg-gray-100 text-gray-600', pending: 'bg-blue-50 text-blue-700', revision: 'bg-orange-50 text-orange-700', accepted: 'bg-green-50 text-green-700', rejected: 'bg-red-50 text-red-700' }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Selamat Datang, {data?.user?.nama_lengkap} 👋</h2>
        <p className="text-sm text-gray-500 mt-1">Pantau status pendaftaran Anda di sini.</p>
      </div>

      {/* Status Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Status Pendaftaran</h3>
          {p && <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor[p.status] || ''}`}>{STATUS_LABELS[p.status]}</span>}
        </div>
        {p ? (
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-500">Nomor Pendaftaran</span>
              <span className="font-semibold text-gray-800">{p.nomor_daftar}</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-500">Status</span>
              <span className="font-semibold">{STATUS_LABELS[p.status]}</span>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500">Data pendaftaran belum tersedia.</p>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { to: '/siswa/formulir', icon: '📝', title: 'Isi Formulir', desc: 'Lengkapi data pendaftaran', color: 'border-l-primary' },
          { to: '/siswa/berkas', icon: '📎', title: 'Upload Berkas', desc: 'Unggah dokumen pendaftaran', color: 'border-l-secondary' },
          { to: '/siswa/status', icon: '📋', title: 'Cek Status', desc: 'Lihat riwayat status', color: 'border-l-green-500' },
        ].map((a, i) => (
          <Link key={i} to={a.to} className={`block bg-white rounded-xl border border-gray-200 border-l-4 ${a.color} p-5 hover:shadow-md hover:-translate-y-0.5 transition-all`}>
            <span className="text-2xl">{a.icon}</span>
            <h4 className="font-semibold text-gray-900 mt-2">{a.title}</h4>
            <p className="text-xs text-gray-500 mt-1">{a.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
