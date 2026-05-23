import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../utils/api'
import { STATUS_LABELS, formatDate } from '../../utils/helpers'

export default function AdminPendaftar() {
  const [data, setData] = useState({ data: [], total: 0, page: 1, pages: 1 })
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => { loadData() }, [filter, page])

  async function loadData() {
    setLoading(true)
    try {
      let q = `api/admin/pendaftar?page=${page}&limit=15`
      if (filter) q += `&status=${filter}`
      if (search) q += `&search=${encodeURIComponent(search)}`
      const res = await api.get(q)
      setData(res.data)
    } catch {} finally { setLoading(false) }
  }

  function handleSearch(e) {
    e.preventDefault()
    setPage(1)
    loadData()
  }

  const badgeColor = { draft: 'bg-gray-100 text-gray-600', pending: 'bg-blue-50 text-blue-700', revision: 'bg-orange-50 text-orange-700', accepted: 'bg-green-50 text-green-700', rejected: 'bg-red-50 text-red-700' }

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Data Pendaftar</h2>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari nama atau nomor daftar..." className="px-3 py-2 border border-gray-300 rounded-lg text-sm w-64 outline-none focus:border-primary" />
            <button type="submit" className="px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary-dark cursor-pointer">Cari</button>
          </form>
          <select value={filter} onChange={e => { setFilter(e.target.value); setPage(1) }} className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none cursor-pointer">
            <option value="">Semua Status</option>
            {Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="bg-blue-50/60">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">No. Daftar</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Nama</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Email</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Tanggal</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Aksi</th>
            </tr></thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="6" className="text-center py-10 text-gray-400"><div className="spinner mx-auto"></div></td></tr>
              ) : data.data.length === 0 ? (
                <tr><td colSpan="6" className="text-center py-10 text-gray-400">Belum ada data pendaftar</td></tr>
              ) : data.data.map(row => (
                <tr key={row.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm font-mono text-gray-700">{row.nomor_daftar}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">{row.nama_lengkap}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{row.email}</td>
                  <td className="px-4 py-3"><span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${badgeColor[row.status]||''}`}>{STATUS_LABELS[row.status]}</span></td>
                  <td className="px-4 py-3 text-sm text-gray-500">{formatDate(row.created_at)}</td>
                  <td className="px-4 py-3"><Link to={`/admin/pendaftar/${row.id}`} className="px-3 py-1.5 bg-primary-bg text-primary text-xs font-medium rounded-lg hover:bg-primary hover:text-white transition-all">Detail</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {data.pages > 1 && (
          <div className="p-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
            <span>Total: {data.total} pendaftar</span>
            <div className="flex gap-1">
              <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1} className="px-3 py-1.5 border border-gray-300 rounded text-xs hover:bg-gray-50 disabled:opacity-40 cursor-pointer">←</button>
              {Array.from({length: Math.min(5, data.pages)}, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setPage(p)} className={`px-3 py-1.5 border rounded text-xs cursor-pointer ${page === p ? 'bg-primary text-white border-primary' : 'border-gray-300 hover:bg-gray-50'}`}>{p}</button>
              ))}
              <button onClick={() => setPage(p => Math.min(data.pages, p+1))} disabled={page === data.pages} className="px-3 py-1.5 border border-gray-300 rounded text-xs hover:bg-gray-50 disabled:opacity-40 cursor-pointer">→</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
