import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../utils/api'
import { STATUS_LABELS, formatDate } from '../../utils/helpers'

export default function AdminPendaftarDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [action, setAction] = useState('')
  const [catatan, setCatatan] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => { loadDetail() }, [id])

  async function loadDetail() {
    try {
      const res = await api.get(`api/admin/pendaftar/${id}`)
      setData(res.data)
    } catch { navigate('/admin/pendaftar') } finally { setLoading(false) }
  }

  async function handleAction() {
    if ((action === 'rejected' || action === 'revision') && !catatan.trim()) {
      alert('Catatan wajib diisi untuk aksi ini'); return
    }
    setSaving(true)
    try {
      await api.patch(`api/admin/pendaftar/${id}/status`, { status: action, catatan })
      loadDetail()
      setAction(''); setCatatan('')
    } catch (err) { alert(err.message || 'Gagal') } finally { setSaving(false) }
  }

  if (loading) return <div className="flex justify-center py-20"><div className="spinner"></div></div>
  if (!data) return null

  const dd = data.data_diri
  const ds = data.data_sekolah
  const ortu = data.data_orang_tua || []
  const berkas = data.berkas || []

  const badgeColor = { draft: 'bg-gray-100 text-gray-600', pending: 'bg-blue-50 text-blue-700', revision: 'bg-orange-50 text-orange-700', accepted: 'bg-green-50 text-green-700', rejected: 'bg-red-50 text-red-700' }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button onClick={() => navigate('/admin/pendaftar')} className="text-sm text-primary hover:underline cursor-pointer">← Kembali ke Daftar Pendaftar</button>

      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{data.user_nama}</h2>
          <p className="text-sm text-gray-500">{data.nomor_daftar} • {data.user_email}</p>
        </div>
        <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${badgeColor[data.status]||''}`}>{STATUS_LABELS[data.status]}</span>
      </div>

      {/* Data Diri */}
      {dd && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Data Diri</h3>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
            {[['NIK', dd.nik], ['NISN', dd.nisn], ['Nama', dd.nama_lengkap], ['TTL', `${dd.tempat_lahir}, ${formatDate(dd.tanggal_lahir)}`], ['Jenis Kelamin', dd.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'], ['Agama', dd.agama], ['HP', dd.nomor_hp], ['Alamat', dd.alamat]].map(([k, v], i) => (
              <div key={i} className="flex justify-between py-1.5 border-b border-gray-100"><span className="text-gray-500">{k}</span><span className="font-medium text-gray-800 text-right">{v||'-'}</span></div>
            ))}
          </div>
        </div>
      )}

      {/* Data Orang Tua */}
      {ortu.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Data Orang Tua</h3>
          {ortu.map((o, i) => (
            <div key={i} className="mb-4 last:mb-0 p-3 bg-gray-50 rounded-lg">
              <p className="text-xs font-semibold text-gray-500 uppercase mb-2">{o.tipe}</p>
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm">
                {[['Nama', o.nama], ['Pekerjaan', o.pekerjaan], ['Penghasilan', o.penghasilan], ['HP', o.nomor_hp]].map(([k, v], j) => (
                  <div key={j} className="flex justify-between py-1"><span className="text-gray-500">{k}</span><span className="font-medium">{v||'-'}</span></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Data Sekolah */}
      {ds && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Asal Sekolah</h3>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
            {[['Sekolah', ds.nama_sekolah], ['NPSN', ds.npsn], ['Tahun Lulus', ds.tahun_lulus], ['Nilai Rata-rata', ds.nilai_rata_rata], ['Jurusan', ds.pilihan_jurusan||'-']].map(([k, v], i) => (
              <div key={i} className="flex justify-between py-1.5 border-b border-gray-100"><span className="text-gray-500">{k}</span><span className="font-medium text-gray-800">{v||'-'}</span></div>
            ))}
          </div>
        </div>
      )}

      {/* Berkas */}
      {berkas.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Berkas</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {berkas.map((b, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-xl">📄</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{b.nama_file_asli}</p>
                  <p className="text-xs text-gray-400">{b.jenis} • {(b.ukuran / 1024).toFixed(0)} KB</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Admin Actions */}
      {(data.status === 'pending' || data.status === 'revision') && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Aksi Verifikasi</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            <button onClick={() => setAction('accepted')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${action==='accepted'?'bg-green-600 text-white':'bg-green-50 text-green-700 hover:bg-green-100'}`}>✓ Terima</button>
            <button onClick={() => setAction('revision')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${action==='revision'?'bg-orange-600 text-white':'bg-orange-50 text-orange-700 hover:bg-orange-100'}`}>↩ Minta Perbaikan</button>
            <button onClick={() => setAction('rejected')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${action==='rejected'?'bg-red-600 text-white':'bg-red-50 text-red-700 hover:bg-red-100'}`}>✗ Tolak</button>
          </div>
          {action && (
            <div className="space-y-3">
              <textarea value={catatan} onChange={e => setCatatan(e.target.value)} placeholder={(action==='accepted') ? 'Catatan (opsional)' : 'Catatan (wajib diisi)...'} rows="3" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
              <button onClick={handleAction} disabled={saving} className="px-6 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark disabled:opacity-60 transition-all cursor-pointer">
                {saving ? 'Menyimpan...' : 'Konfirmasi'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
