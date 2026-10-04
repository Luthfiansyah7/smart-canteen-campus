/* DATA OBSERVASI AWAL
 * Ubah data di berkas ini untuk memperbarui dashboard. Waktu adalah teks.
 * queue = perkiraan antrean; condition dan tables = catatan asli.
 * Jangan menambahkan kapasitas numerik sebelum dilakukan pengukuran.
 */
window.CANTEEN_DATA = {
  times: ['11.20', '11.35', '11.50', '12.20', '12.40'],
  canteens: [
    { id: 'kansip', name: 'Kansip', fullName: 'Kantin Sipil', color: '#087e8b' },
    { id: 'kandok', name: 'Kandok', fullName: 'Kantin Kolam Kodok', color: '#7355ad' },
    { id: 'tn', name: 'Kantin TN', fullName: 'Kantin TN', color: '#b95a16' },
    { id: 'kantek', name: 'Kantek', fullName: 'Kantin Teknik', color: '#2465bf' },
    { id: 'kantel', name: 'Kantel', fullName: 'Kantin Telekomunikasi', color: '#b23e68', smallCapacity: true }
  ],
  observations: [
    { time: '11.20', canteen: 'kansip', condition: 'Mulai ramai', queue: 3, tables: 'Banyak' },
    { time: '11.20', canteen: 'kandok', condition: 'Mulai ramai', queue: 5, tables: 'Banyak' },
    { time: '11.20', canteen: 'tn', condition: 'Mulai ramai', queue: 5, tables: 'Banyak' },
    { time: '11.20', canteen: 'kantek', condition: 'Mulai ramai', queue: 4, tables: 'Banyak' },
    { time: '11.20', canteen: 'kantel', condition: 'Sepi', queue: 1, tables: 'Sedang' },
    { time: '11.35', canteen: 'kansip', condition: 'Ramai sedang', queue: 7, tables: 'Sedang' },
    { time: '11.35', canteen: 'kandok', condition: 'Ramai', queue: 9, tables: 'Sedikit' },
    { time: '11.35', canteen: 'tn', condition: 'Ramai sedang', queue: 8, tables: 'Sedang' },
    { time: '11.35', canteen: 'kantek', condition: 'Ramai sedang', queue: 8, tables: 'Sedang' },
    { time: '11.35', canteen: 'kantel', condition: 'Mulai ramai', queue: 4, tables: 'Sedikit' },
    { time: '11.50', canteen: 'kansip', condition: 'Ramai', queue: 12, tables: 'Sedikit' },
    { time: '11.50', canteen: 'kandok', condition: 'Ramai', queue: 15, tables: 'Sedikit' },
    { time: '11.50', canteen: 'tn', condition: 'Ramai', queue: 14, tables: 'Sedikit' },
    { time: '11.50', canteen: 'kantek', condition: 'Ramai', queue: 13, tables: 'Sedikit' },
    { time: '11.50', canteen: 'kantel', condition: 'Ramai', queue: 8, tables: 'Sedikit' },
    { time: '12.20', canteen: 'kansip', condition: 'Ramai', queue: 9, tables: 'Sedang' },
    { time: '12.20', canteen: 'kandok', condition: 'Ramai', queue: 10, tables: 'Sedang' },
    { time: '12.20', canteen: 'tn', condition: 'Ramai', queue: 13, tables: 'Sedikit' },
    { time: '12.20', canteen: 'kantek', condition: 'Ramai', queue: 10, tables: 'Sedikit' },
    { time: '12.20', canteen: 'kantel', condition: 'Ramai sedang', queue: 5, tables: 'Sedikit' },
    { time: '12.40', canteen: 'kansip', condition: 'Sedikit/sepi', queue: 3, tables: 'Banyak' },
    { time: '12.40', canteen: 'kandok', condition: 'Ramai sedang', queue: 5, tables: 'Banyak' },
    { time: '12.40', canteen: 'tn', condition: 'Sedikit/sepi', queue: 4, tables: 'Banyak' },
    { time: '12.40', canteen: 'kantek', condition: 'Ramai sedang', queue: 5, tables: 'Banyak' },
    { time: '12.40', canteen: 'kantel', condition: 'Sepi', queue: 2, tables: 'Sedang' }
  ]
};
