import { useState, useEffect } from 'react'
import api from '../../utils/api'

const stats = [
  { key: 'total', label: 'Total Pendaftar', icon: '👥', color: '' },
  { key: 'pending', label: 'Menunggu Verifikasi', icon: '⏳', color: 'border-l-blue-500' },
  { key: 'accepted', label: 'Diterima', icon: '✅', color: 'border-l-green-500' },
  { key: 'revision', label: 'Perlu Revisi', icon: '🔄', color: 'border-l-orange-500' },
  { key: 'rejected', label: 'Ditolak', icon: '❌', color: 'border-l-red-500' },
  { key: 'draft', label: 'Draft', icon: '📝', color: 'border-l-gray-400' },
]

export default function AdminDashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('api/admin/statistik').then(res => setData(res.data)).catch(() => {}).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex justify-center py-20"><div className="spinner"></div></div>

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Dashboard Admin</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map(s => (
          <div key={s.key} className={`bg-white rounded-xl border border-gray-200 border-l-4 ${s.color || 'border-l-primary'} p-5 shadow-sm hover:shadow-md transition-shadow`}>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{s.icon}</span>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{s.label}</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{data?.[s.key] ?? 0}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
