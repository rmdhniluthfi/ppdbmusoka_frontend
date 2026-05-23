import { useState, useEffect } from 'react'
import api from '../../utils/api'
import { STATUS_LABELS, formatDate } from '../../utils/helpers'

export default function SiswaStatus() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('api/siswa/status').then(res => setData(res.data)).catch(() => {}).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex justify-center py-20"><div className="spinner"></div></div>

  const statusColor = { draft: 'bg-gray-100 text-gray-600 border-gray-300', pending: 'bg-blue-50 text-blue-700 border-blue-400', revision: 'bg-orange-50 text-orange-700 border-orange-400', accepted: 'bg-green-50 text-green-700 border-green-500', rejected: 'bg-red-50 text-red-700 border-red-500' }
  const dotColor = { draft: 'bg-gray-400', pending: 'bg-blue-500', revision: 'bg-orange-500', accepted: 'bg-green-500', rejected: 'bg-red-500' }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Status Pendaftaran</h2>

      {data?.status && (
        <div className={`rounded-xl p-5 mb-6 border-l-4 ${statusColor[data.status] || ''}`}>
          <p className="text-sm font-medium mb-1">Status Saat Ini</p>
          <p className="text-lg font-bold">{STATUS_LABELS[data.status]}</p>
          {data.catatan_admin && <p className="mt-2 text-sm opacity-80">Catatan Admin: {data.catatan_admin}</p>}
        </div>
      )}

      <h3 className="font-semibold text-gray-900 mb-4">Riwayat Status</h3>
      <div className="relative pl-8">
        <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-200" />
        {(data?.log || []).map((item, i) => (
          <div key={i} className="relative pb-6 last:pb-0">
            <div className={`absolute left-[-25px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white ${dotColor[item.status_baru] || 'bg-gray-400'}`} />
            <p className="text-xs text-gray-400">{formatDate(item.created_at)}</p>
            <p className="text-sm font-semibold text-gray-800 mt-0.5">{STATUS_LABELS[item.status_baru]}</p>
            {item.catatan && <p className="text-xs text-gray-500 mt-0.5">{item.catatan}</p>}
            <p className="text-xs text-gray-400 mt-0.5">oleh {item.oleh_nama}</p>
          </div>
        ))}
        {(!data?.log || data.log.length === 0) && <p className="text-sm text-gray-400">Belum ada riwayat perubahan status.</p>}
      </div>
    </div>
  )
}
