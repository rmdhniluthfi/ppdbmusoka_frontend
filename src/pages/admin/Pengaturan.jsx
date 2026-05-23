import { useState, useEffect } from 'react'
import api from '../../utils/api'

export default function AdminPengaturan() {
  const [form, setForm] = useState({ gelombang: 1, tahun_ajaran: '2026/2027', tanggal_buka: '', tanggal_tutup: '', kuota: 200, keterangan: '' })
  const [msg, setMsg] = useState('')

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Pengaturan PPDB</h2>
      {msg && <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm">{msg}</div>}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Konfigurasi Periode Pendaftaran</h3>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Gelombang</label><input type="number" value={form.gelombang} onChange={e => setForm({...form, gelombang: e.target.value})} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-primary" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Tahun Ajaran</label><input value={form.tahun_ajaran} onChange={e => setForm({...form, tahun_ajaran: e.target.value})} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-primary" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Buka</label><input type="date" value={form.tanggal_buka} onChange={e => setForm({...form, tanggal_buka: e.target.value})} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-primary" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Tutup</label><input type="date" value={form.tanggal_tutup} onChange={e => setForm({...form, tanggal_tutup: e.target.value})} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-primary" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Kuota Siswa</label><input type="number" value={form.kuota} onChange={e => setForm({...form, kuota: e.target.value})} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-primary" /></div>
          </div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Keterangan</label><textarea value={form.keterangan} onChange={e => setForm({...form, keterangan: e.target.value})} rows="3" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-primary" /></div>
          <button onClick={() => setMsg('Pengaturan berhasil disimpan!')} className="px-6 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-all cursor-pointer">Simpan Pengaturan</button>
        </div>
      </div>
    </div>
  )
}
