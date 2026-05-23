import { useState, useEffect } from 'react'
import api from '../../utils/api'

const STEPS = ['Data Diri', 'Data Orang Tua', 'Asal Sekolah', 'Berkas', 'Review & Kirim']

export default function SiswaFormulir() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState({})
  const [msg, setMsg] = useState('')

  useEffect(() => { loadData() }, [])

  async function loadData() {
    try {
      const res = await api.get('api/siswa/formulir')
      if (res.data) setFormData(res.data)
    } catch (err) {
      if (err.status === 401) {
        setMsg('Sesi berakhir, silakan login kembali')
      } else if (err.message) {
        setMsg(err.message)
      }
    } finally { setLoading(false) }
  }

  function onChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  async function saveStep(stepNum) {
    setSaving(true); setMsg(''); setErrors({})
    try {
      await api.post(`api/siswa/formulir/step${stepNum}`, formData)
      setMsg('Data berhasil disimpan!')
      setTimeout(() => setMsg(''), 3000)
      return true
    } catch (err) {
      if (err.errors) setErrors(err.errors)
      else setMsg(err.message || 'Gagal menyimpan')
      return false
    } finally { setSaving(false) }
  }

  async function handleNext() {
    if (step < 3) {
      const success = await saveStep(step + 1)
      if (success) setStep(step + 1)
    }
  }

  async function handleSubmit() {
    if (!confirm('Data tidak dapat diubah setelah dikirim. Lanjutkan?')) return
    setSaving(true)
    try {
      await api.post('api/siswa/formulir/submit', {})
      setMsg('🎉 Pendaftaran berhasil dikirim!')
    } catch (err) {
      setMsg(err.message || 'Gagal mengirim pendaftaran')
    } finally { setSaving(false) }
  }

  const inputCls = (name) => `w-full px-4 py-2.5 border rounded-lg text-sm outline-none transition-all ${errors[name] ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-2 focus:ring-primary/30 focus:border-primary'}`

  if (loading) return <div className="flex justify-center py-20"><div className="spinner"></div></div>

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Formulir Pendaftaran</h2>

      {/* Step Indicator */}
      <div className="flex items-center justify-center mb-8 gap-0">
        {STEPS.map((s, i) => (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center relative">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${i < step ? 'bg-primary-light text-white border-primary-light' : i === step ? 'bg-primary text-white border-primary shadow-md' : 'bg-white text-gray-400 border-gray-300'}`}>
                {i < step ? '✓' : i + 1}
              </div>
              <span className={`absolute top-11 text-[10px] whitespace-nowrap font-medium ${i === step ? 'text-primary' : 'text-gray-400'}`}>{s}</span>
            </div>
            {i < STEPS.length - 1 && <div className={`w-8 sm:w-14 h-0.5 mx-1 ${i < step ? 'bg-primary-light' : 'bg-gray-300'}`} />}
          </div>
        ))}
      </div>

      {msg && <div className={`mb-4 p-3 rounded-lg text-sm ${msg.includes('berhasil') || msg.includes('🎉') ? 'bg-green-50 text-green-700 border-l-4 border-green-500' : 'bg-red-50 text-red-700 border-l-4 border-red-500'}`}>{msg}</div>}

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        {/* Step 1: Data Diri */}
        {step === 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 mb-2">Data Diri Calon Siswa</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap <span className="text-red-500">*</span></label><input name="nama_lengkap" value={formData.nama_lengkap||''} onChange={onChange} className={inputCls('nama_lengkap')} />{errors.nama_lengkap && <p className="text-xs text-red-500 mt-1">{errors.nama_lengkap}</p>}</div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">NIK <span className="text-red-500">*</span></label><input name="nik" value={formData.nik||''} onChange={onChange} maxLength="16" className={inputCls('nik')} />{errors.nik && <p className="text-xs text-red-500 mt-1">{errors.nik}</p>}</div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">NISN <span className="text-red-500">*</span></label><input name="nisn" value={formData.nisn||''} onChange={onChange} maxLength="10" className={inputCls('nisn')} />{errors.nisn && <p className="text-xs text-red-500 mt-1">{errors.nisn}</p>}</div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Tempat Lahir <span className="text-red-500">*</span></label><input name="tempat_lahir" value={formData.tempat_lahir||''} onChange={onChange} className={inputCls('tempat_lahir')} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir <span className="text-red-500">*</span></label><input type="date" name="tanggal_lahir" value={formData.tanggal_lahir||''} onChange={onChange} className={inputCls('tanggal_lahir')} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin <span className="text-red-500">*</span></label>
                <div className="flex gap-6 mt-2">
                  <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="jenis_kelamin" value="L" checked={formData.jenis_kelamin==='L'} onChange={onChange} className="accent-primary w-4 h-4" /> Laki-laki</label>
                  <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="jenis_kelamin" value="P" checked={formData.jenis_kelamin==='P'} onChange={onChange} className="accent-primary w-4 h-4" /> Perempuan</label>
                </div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Agama <span className="text-red-500">*</span></label>
                <select name="agama" value={formData.agama||''} onChange={onChange} className={inputCls('agama')}>
                  <option value="">Pilih Agama</option>
                  {['Islam','Kristen','Katolik','Hindu','Buddha','Konghucu'].map(a=><option key={a} value={a}>{a}</option>)}
                </select>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Nomor HP <span className="text-red-500">*</span></label><input name="nomor_hp" value={formData.nomor_hp||''} onChange={onChange} placeholder="08xxx" className={inputCls('nomor_hp')} /></div>
            </div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap <span className="text-red-500">*</span></label><textarea name="alamat" value={formData.alamat||''} onChange={onChange} rows="3" className={inputCls('alamat')} /></div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Anak ke-</label><input type="number" name="anak_ke" value={formData.anak_ke||''} onChange={onChange} min="1" max="20" className={inputCls('anak_ke')} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Saudara</label><input type="number" name="jumlah_saudara" value={formData.jumlah_saudara||''} onChange={onChange} min="0" max="20" className={inputCls('jumlah_saudara')} /></div>
            </div>
          </div>
        )}

        {/* Step 2: Data Orang Tua */}
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="font-semibold text-gray-900">Data Orang Tua / Wali</h3>
            {['ayah', 'ibu'].map(tipe => (
              <div key={tipe} className="border border-gray-200 rounded-lg p-4 space-y-3">
                <h4 className="font-medium text-gray-800 capitalize">Data {tipe}</h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div><label className="block text-xs font-medium text-gray-600 mb-1">Nama {tipe} <span className="text-red-500">*</span></label><input name={`nama_${tipe}`} value={formData[`nama_${tipe}`]||''} onChange={onChange} className={inputCls(`nama_${tipe}`)} /></div>
                  <div><label className="block text-xs font-medium text-gray-600 mb-1">NIK {tipe}</label><input name={`nik_${tipe}`} value={formData[`nik_${tipe}`]||''} onChange={onChange} maxLength="16" className={inputCls(`nik_${tipe}`)} /></div>
                  <div><label className="block text-xs font-medium text-gray-600 mb-1">Pekerjaan <span className="text-red-500">*</span></label><input name={`pekerjaan_${tipe}`} value={formData[`pekerjaan_${tipe}`]||''} onChange={onChange} className={inputCls(`pekerjaan_${tipe}`)} /></div>
                  <div><label className="block text-xs font-medium text-gray-600 mb-1">Penghasilan/bulan <span className="text-red-500">*</span></label>
                    <select name={`penghasilan_${tipe}`} value={formData[`penghasilan_${tipe}`]||''} onChange={onChange} className={inputCls(`penghasilan_${tipe}`)}>
                      <option value="">Pilih</option>
                      <option value="<1000000">&lt; Rp 1.000.000</option>
                      <option value="1000000-3000000">Rp 1.000.000 - 3.000.000</option>
                      <option value="3000000-5000000">Rp 3.000.000 - 5.000.000</option>
                      <option value=">5000000">&gt; Rp 5.000.000</option>
                    </select>
                  </div>
                  <div><label className="block text-xs font-medium text-gray-600 mb-1">No. HP <span className="text-red-500">*</span></label><input name={`hp_${tipe}`} value={formData[`hp_${tipe}`]||''} onChange={onChange} className={inputCls(`hp_${tipe}`)} /></div>
                  <div><label className="block text-xs font-medium text-gray-600 mb-1">Pendidikan Terakhir</label>
                    <select name={`pendidikan_${tipe}`} value={formData[`pendidikan_${tipe}`]||''} onChange={onChange} className={inputCls(`pendidikan_${tipe}`)}>
                      <option value="">Pilih</option>
                      {['SD','SMP','SMA','D3','S1','S2','S3'].map(p=><option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Step 3: Asal Sekolah */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Asal Sekolah & Akademik</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Nama Sekolah Asal <span className="text-red-500">*</span></label><input name="nama_sekolah" value={formData.nama_sekolah||''} onChange={onChange} placeholder="SMP/MTs" className={inputCls('nama_sekolah')} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">NPSN Sekolah <span className="text-red-500">*</span></label><input name="npsn" value={formData.npsn||''} onChange={onChange} maxLength="8" className={inputCls('npsn')} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Tahun Lulus <span className="text-red-500">*</span></label>
                <select name="tahun_lulus" value={formData.tahun_lulus||''} onChange={onChange} className={inputCls('tahun_lulus')}>
                  <option value="">Pilih</option><option value="2026">2026</option><option value="2025">2025</option>
                </select>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Nilai Rata-rata Raport <span className="text-red-500">*</span></label><input type="number" step="0.01" name="nilai_rata_rata" value={formData.nilai_rata_rata||''} onChange={onChange} min="0" max="100" className={inputCls('nilai_rata_rata')} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Pilihan Jurusan</label>
                <div className="flex gap-6 mt-2">
                  <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="pilihan_jurusan" value="IPA" checked={formData.pilihan_jurusan==='IPA'} onChange={onChange} className="accent-primary w-4 h-4" /> IPA</label>
                  <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="pilihan_jurusan" value="IPS" checked={formData.pilihan_jurusan==='IPS'} onChange={onChange} className="accent-primary w-4 h-4" /> IPS</label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Berkas (redirect) */}
        {step === 3 && (
          <div className="text-center py-8">
            <span className="text-5xl mb-4 block">📎</span>
            <h3 className="font-semibold text-gray-900 mb-2">Upload Berkas Pendaftaran</h3>
            <p className="text-sm text-gray-500 mb-4">Silakan upload berkas di halaman Unggah Berkas</p>
            <a href="/PPDB_MUSOKA/frontend/siswa/berkas" className="inline-block px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all font-medium text-sm">Buka Halaman Unggah Berkas →</a>
          </div>
        )}

        {/* Step 5: Review */}
        {step === 4 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Review Data Pendaftaran</h3>
            <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800">Pastikan semua data sudah benar sebelum mengirim pendaftaran.</div>
            <div className="grid gap-2 text-sm">
              {[['Nama', formData.nama_lengkap], ['NIK', formData.nik], ['NISN', formData.nisn], ['Tempat, Tgl Lahir', `${formData.tempat_lahir||'-'}, ${formData.tanggal_lahir||'-'}`], ['Sekolah Asal', formData.nama_sekolah]].map(([k,v], i) => (
                <div key={i} className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">{k}</span><span className="font-medium text-gray-800">{v || '-'}</span>
                </div>
              ))}
            </div>
            <label className="flex items-start gap-2 mt-4 cursor-pointer">
              <input type="checkbox" id="confirm" className="accent-primary w-4 h-4 mt-0.5" />
              <span className="text-sm text-gray-700">Saya menyatakan bahwa data yang saya isi adalah benar dan dapat dipertanggungjawabkan.</span>
            </label>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-5 border-t border-gray-200">
          <button onClick={() => step > 0 && setStep(step - 1)} disabled={step === 0} className="px-5 py-2.5 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40 transition-all cursor-pointer disabled:cursor-not-allowed">
            ← Sebelumnya
          </button>
          {step < 4 ? (
            <button onClick={handleNext} disabled={saving} className="px-5 py-2.5 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-60 transition-all cursor-pointer">
              {saving ? 'Menyimpan...' : 'Selanjutnya →'}
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={saving} className="px-6 py-2.5 text-sm font-bold bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-60 transition-all cursor-pointer">
              {saving ? 'Mengirim...' : '✓ Kirim Pendaftaran'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
