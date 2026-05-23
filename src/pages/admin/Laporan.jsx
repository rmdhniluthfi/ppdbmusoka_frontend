import { useState } from 'react'
import api from '../../utils/api'

export default function AdminLaporan() {
  const [msg, setMsg] = useState('')

  async function handleExport(format) {
    try {
      setMsg('Mempersiapkan data...')
      await api.get(`api/admin/export?format=${format}`)
      setMsg('Export berhasil disiapkan!')
    } catch (err) { setMsg(err.message || 'Gagal') }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Laporan & Export</h2>
      {msg && <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded-lg text-sm">{msg}</div>}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="font-semibold text-gray-900 mb-3">Export Data Pendaftar</h3>
        <p className="text-sm text-gray-500 mb-4">Unduh data seluruh pendaftar:</p>
        <div className="flex gap-3">
          <button onClick={() => handleExport('csv')} className="px-5 py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 cursor-pointer">📊 CSV</button>
          <button onClick={() => handleExport('excel')} className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 cursor-pointer">📑 Excel</button>
        </div>
      </div>
    </div>
  )
}
