import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import api from '../../utils/api'

export default function SiswaProfil() {
  const { user, checkAuth } = useAuth()
  const [form, setForm] = useState({ nama_lengkap: user?.nama_lengkap || '', nomor_hp: user?.nomor_hp || '', password: '', password_confirmation: '' })
  const [msg, setMsg] = useState('')
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault(); setSaving(true); setMsg('')
    try {
      const payload = { nama_lengkap: form.nama_lengkap, nomor_hp: form.nomor_hp }
      if (form.password) { payload.password = form.password; payload.password_confirmation = form.password_confirmation }
      await api.patch('api/auth/me', payload)
      setMsg('Profil berhasil diperbarui!')
      checkAuth()
    } catch (err) { setMsg(err.message || 'Gagal menyimpan') } finally { setSaving(false) }
  }

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Profil Akun</h2>
      {msg && <div className={`mb-4 p-3 rounded-lg text-sm ${msg.includes('berhasil') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{msg}</div>}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input disabled value={user?.email} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-500" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label><input value={form.nama_lengkap} onChange={e => setForm({...form, nama_lengkap: e.target.value})} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Nomor HP</label><input value={form.nomor_hp} onChange={e => setForm({...form, nomor_hp: e.target.value})} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" /></div>
          <hr className="border-gray-200" />
          <p className="text-xs text-gray-500">Kosongkan jika tidak ingin mengubah password</p>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Password Baru</label><input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password</label><input type="password" value={form.password_confirmation} onChange={e => setForm({...form, password_confirmation: e.target.value})} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" /></div>
          <button type="submit" disabled={saving} className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-all disabled:opacity-60 cursor-pointer">{saving ? 'Menyimpan...' : 'Simpan Perubahan'}</button>
        </form>
      </div>
    </div>
  )
}
