export function formatDate(dateStr) {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / 1048576).toFixed(1) + ' MB'
}

export const STATUS_LABELS = {
  draft: 'Belum Lengkap',
  pending: 'Menunggu Verifikasi',
  revision: 'Perlu Revisi',
  accepted: 'Diterima',
  rejected: 'Ditolak',
}

export const STATUS_COLORS = {
  draft: 'neutral',
  pending: 'pending',
  revision: 'revision',
  accepted: 'accepted',
  rejected: 'rejected',
}
