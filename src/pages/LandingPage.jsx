import { Link } from 'react-router-dom'

const steps = [
  { num: '1', title: 'Buat Akun', desc: 'Daftarkan email dan data diri Anda untuk membuat akun.' },
  { num: '2', title: 'Isi Formulir', desc: 'Lengkapi data diri, orang tua, dan asal sekolah.' },
  { num: '3', title: 'Upload Berkas', desc: 'Unggah pas foto, ijazah, KK, dan akta lahir.' },
  { num: '4', title: 'Kirim & Tunggu', desc: 'Kirim pendaftaran dan pantau status verifikasi.' },
]

const persyaratan = [
  'Lulusan SMP/MTs sederajat',
  'Pas foto 3×4 terbaru (JPG/PNG, maks 1MB)',
  'Scan ijazah / SKL / SKHUN (JPG/PDF, maks 2MB)',
  'Scan Kartu Keluarga (JPG/PDF, maks 2MB)',
  'Scan Akta Kelahiran (JPG/PDF, maks 2MB)',
  'Kartu NISN (opsional)',
]

const jadwal = [
  { kegiatan: 'Pendaftaran Online Gelombang 1', tanggal: '15 Mei – 15 Juli 2026' },
  { kegiatan: 'Verifikasi Data & Berkas', tanggal: '16 – 25 Juli 2026' },
  { kegiatan: 'Pengumuman Hasil', tanggal: '28 Juli 2026' },
  { kegiatan: 'Daftar Ulang', tanggal: '29 Juli – 5 Agustus 2026' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section id="hero" className="relative bg-gradient-to-br from-primary-dark via-primary to-primary-light text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 lg:py-36 flex flex-col items-center text-center">
          <img src="/PPDB_MUSOKA/frontend/logo.png" alt="Logo" className="h-24 sm:h-28 w-auto mb-6 drop-shadow-xl" />
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
            PPDB Online<br />
            <span className="text-secondary">SMA Muhammadiyah Sokaraja</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mb-8 leading-relaxed">
            Pendaftaran Peserta Didik Baru Tahun Ajaran 2026/2027. Daftar sekarang, proses cepat dan transparan!
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/register" className="px-8 py-3.5 bg-secondary text-gray-900 font-bold text-base rounded-lg hover:bg-secondary-dark hover:text-white hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Daftar Sekarang →
            </Link>
            <a href="#info" className="px-8 py-3.5 border-2 border-white/40 text-white font-medium text-base rounded-lg hover:bg-white/10 hover:border-white transition-all duration-300">
              Pelajari Selengkapnya
            </a>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section id="info" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Alur Pendaftaran</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Proses pendaftaran mudah dan cepat, semua dilakukan secara online</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={i} className="group relative bg-gradient-to-b from-primary-bg to-white border border-primary-bg-deep/50 rounded-xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mx-auto mb-4 group-hover:bg-secondary group-hover:text-gray-900 transition-colors shadow-md">
                  {s.num}
                </div>
                <h3 className="font-heading font-semibold text-lg text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Persyaratan */}
      <section id="persyaratan" className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Persyaratan Pendaftaran</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Siapkan dokumen berikut sebelum memulai pendaftaran online</p>
          </div>
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {persyaratan.map((item, i) => (
              <div key={i} className="flex items-start gap-3 px-6 py-4 border-b border-gray-100 last:border-b-0 hover:bg-primary-bg/30 transition-colors">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                <span className="text-gray-700 text-[0.9375rem]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Jadwal */}
      <section id="jadwal" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Jadwal PPDB</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Tahun Ajaran 2026/2027 — Gelombang 1</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary-bg">
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-primary-dark uppercase tracking-wider">Kegiatan</th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-primary-dark uppercase tracking-wider">Tanggal</th>
                  </tr>
                </thead>
                <tbody>
                  {jadwal.map((j, i) => (
                    <tr key={i} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-[0.9375rem] text-gray-800 font-medium">{j.kegiatan}</td>
                      <td className="px-6 py-4 text-[0.9375rem] text-gray-600">{j.tanggal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Kontak */}
      <section id="kontak" className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Hubungi Kami</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Butuh bantuan? Tim panitia PPDB siap membantu Anda</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: '📍', title: 'Alamat', text: 'Jl. Raya Sokaraja, Banyumas, Jawa Tengah' },
              { icon: '📞', title: 'Telepon', text: '(0281) 6940000' },
              { icon: '📧', title: 'Email', text: 'ppdb@musoka.sch.id' },
            ].map((c, i) => (
              <div key={i} className="bg-white rounded-xl p-6 text-center border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                <span className="text-3xl block mb-3">{c.icon}</span>
                <h4 className="font-semibold text-gray-900 mb-1">{c.title}</h4>
                <p className="text-sm text-gray-500">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-primary-dark to-primary text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-4">Siap Bergabung Bersama Kami?</h2>
          <p className="text-white/80 mb-8 text-lg">Daftarkan diri Anda sekarang dan mulai perjalanan pendidikan di SMA Muhammadiyah Sokaraja.</p>
          <Link to="/register" className="inline-block px-10 py-4 bg-secondary text-gray-900 font-bold text-lg rounded-lg hover:bg-secondary-dark hover:text-white hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            Mulai Pendaftaran →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-dark text-white/70 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p>© 2026 SMA Muhammadiyah Sokaraja. All rights reserved.</p>
          <p className="text-secondary font-medium">PPDB Online — MUSOKA</p>
        </div>
      </footer>
    </div>
  )
}
