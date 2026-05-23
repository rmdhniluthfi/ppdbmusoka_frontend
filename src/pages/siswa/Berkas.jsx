import { useState, useEffect, useRef } from 'react'
import api from '../../utils/api'
import { formatSize } from '../../utils/helpers'

const JENIS_BERKAS = [
  { value: 'foto', label: 'Pas Foto 3×4', required: true, maxSize: 1 },
  { value: 'ijazah', label: 'Ijazah / SKL / SKHUN', required: true, maxSize: 2 },
  { value: 'kk', label: 'Kartu Keluarga (KK)', required: true, maxSize: 2 },
  { value: 'akte', label: 'Akta Kelahiran', required: true, maxSize: 2 },
  { value: 'nisn', label: 'Kartu NISN', required: false, maxSize: 1 },
  { value: 'prestasi', label: 'Piagam / Sertifikat', required: false, maxSize: 2 },
]

export default function SiswaBerkas() {
  const [berkas, setBerkas] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState('')
  const [msg, setMsg] = useState('')
  const fileRef = useRef()

  useEffect(() => { loadBerkas() }, [])

  async function loadBerkas() {
    try {
      const res = await api.get('api/siswa/berkas')
      setBerkas(res.data || [])
    } catch {} finally { setLoading(false) }
  }

  async function handleUpload(jenis, e) {
    const file = e.target.files[0]
    if (!file) return
    setMsg('')
    setUploading(jenis)
    const fd = new FormData()
    fd.append('file', file)
    fd.append('jenis', jenis)
    try {
      await api.upload('api/siswa/berkas/upload', fd)
      setMsg('Berkas berhasil diunggah!')
      loadBerkas()
    } catch (err) {
      setMsg(err.message || 'Gagal mengunggah')
    } finally { setUploading(''); e.target.value = '' }
  }

  async function handleDelete(id) {
    if (!confirm('Hapus berkas ini?')) return
    try {
      await api.delete(`api/siswa/berkas/${id}`)
      loadBerkas()
    } catch (err) { setMsg(err.message || 'Gagal menghapus') }
  }

  if (loading) return <div className="flex justify-center py-20"><div className="spinner"></div></div>

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Unggah Berkas</h2>
      {msg && <div className={`mb-4 p-3 rounded-lg text-sm ${msg.includes('berhasil') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{msg}</div>}

      <div className="space-y-3">
        {JENIS_BERKAS.map(jb => {
          const uploaded = berkas.find(b => b.jenis === jb.value)
          return (
            <div key={jb.value} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm text-gray-800">{jb.label}</span>
                  {jb.required && <span className="text-[10px] px-1.5 py-0.5 bg-red-50 text-red-600 rounded font-medium">Wajib</span>}
                </div>
                {uploaded ? (
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-xs text-green-600 font-medium">✓ {uploaded.nama_file_asli}</span>
                    <span className="text-xs text-gray-400">({formatSize(uploaded.ukuran)})</span>
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 mt-1">Belum diunggah • Maks {jb.maxSize}MB • JPG/PNG/PDF</p>
                )}
              </div>
              <div className="flex gap-2">
                <label className={`px-3 py-1.5 text-xs font-medium rounded-lg cursor-pointer transition-all ${uploading === jb.value ? 'bg-gray-100 text-gray-400' : 'bg-primary text-white hover:bg-primary-dark'}`}>
                  {uploading === jb.value ? '⏳' : uploaded ? '🔄' : '📤'}
                  <input type="file" className="hidden" accept=".jpg,.jpeg,.png,.pdf" onChange={(e) => handleUpload(jb.value, e)} disabled={!!uploading} />
                </label>
                {uploaded && (
                  <button onClick={() => handleDelete(uploaded.id)} className="px-2 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer">🗑</button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
