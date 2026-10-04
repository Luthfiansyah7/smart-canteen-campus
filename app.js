(() => {
  'use strict';
  const data = window.CANTEEN_DATA;
  const $ = s => document.querySelector(s);
  const escape = v => String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const paths = {
    canteen: '<path d="M3 10h18M4 10v11h16V10M3 10l2-7h14l2 7M8 21v-7h4v7M16 14h1M7 3v7M12 3v7M17 3v7"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    chart: '<path d="M3 3v18h18M6 15l5-5 4 3 6-7"/>',
    layers: '<path d="m12 3 10 5-10 5L2 8l10-5ZM2 12l10 5 10-5M2 16l10 5 10-5"/>',
    flow: '<rect x="8" y="2" width="8" height="5" rx="1"/><rect x="2" y="17" width="8" height="5" rx="1"/><rect x="14" y="17" width="8" height="5" rx="1"/><path d="M12 7v5M6 17v-5h12v5"/>',
    book: '<path d="M12 5v16M3 3l9 2 9-2v16l-9 2-9-2V3Z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    clipboard: '<rect x="5" y="4" width="14" height="18" rx="2"/><rect x="9" y="2" width="6" height="4" rx="1"/><path d="M9 11h6M9 16h6"/>',
    queue: '<circle cx="8" cy="7" r="3"/><path d="M2 20v-3a6 6 0 0 1 12 0v3M17 4a3 3 0 0 1 0 6M22 20v-3a6 6 0 0 0-5-6"/>',
    table: '<path d="M3 8h18v4H3zM5 12v9M19 12v9M5 17h14"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/>',
    close: '<path d="m6 6 12 12M6 18 18 6"/>'
  };
  const icon = name => `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${paths[name] || paths.info}</svg>`;
  document.querySelectorAll('[data-icon]').forEach(el => { el.innerHTML = icon(el.dataset.icon); });
  function statusClass(condition) {
    if (condition === 'Sepi' || condition === 'Sedikit/sepi') return 'status-green';
    if (condition === 'Mulai ramai' || condition === 'Sedang') return 'status-yellow';
    if (condition === 'Sangat Ramai') return 'status-red';
    return 'status-orange';
  }
  const badge = condition => `<span class="status ${statusClass(condition)}">${escape(condition)}</span>`;
  let selectedTime = '11.50';
  const visible = new Set(data.canteens.map(c => c.id));
  const getCanteen = id => data.canteens.find(c => c.id === id);
  function renderCards() {
    $('#selected-time').textContent = selectedTime;
    $('#canteen-cards').innerHTML = data.canteens.map((c, i) => {
      const row = data.observations.find(r => r.time === selectedTime && r.canteen === c.id);
      return `<article class="canteen-card" data-canteen="${escape(c.id)}"><div class="card-heading"><span class="canteen-icon">${icon('canteen')}</span><span class="card-code">K0${i + 1}</span></div><h3>${escape(c.name)}</h3><p class="full-name">${escape(c.fullName)}</p>${badge(row.condition)}<div class="queue-metric"><span class="metric-label">${icon('queue')}Antrean sekitar</span><p class="queue-value">${row.queue}<small>orang</small></p></div><div class="tables-metric"><span class="metric-label">${icon('table')}Meja tersedia</span><strong>${escape(row.tables)}</strong></div>${c.smallCapacity ? '<p class="small-capacity">Kapasitas fisik lebih kecil</p>' : ''}<div class="card-footer"><button class="detail-button" type="button" data-detail="${escape(c.id)}" aria-label="Lihat detail ${escape(c.name)}">Lihat detail</button></div></article>`;
    }).join('');
    document.querySelectorAll('[data-time]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.time === selectedTime)));
  }
  $('#time-buttons').innerHTML = data.times.map(t => `<button type="button" class="time-button" data-time="${escape(t)}" aria-pressed="${t === selectedTime}">${escape(t)}</button>`).join('');
  $('#time-buttons').addEventListener('click', e => {
    const button = e.target.closest('[data-time]');
    if (!button) return;
    selectedTime = button.dataset.time;
    renderCards();
  });
  $('#canteen-cards').addEventListener('click', e => {
    const button = e.target.closest('[data-detail]');
    if (button) openDetail(button.dataset.detail);
  });
  function tableRows(rows, withCanteen = true) {
    return rows.map(row => `<tr><td>${escape(row.time)}</td>${withCanteen ? `<td>${escape(getCanteen(row.canteen).name)}</td>` : ''}<td>${escape(row.condition)}</td><td>${row.queue}</td><td>${escape(row.tables)}</td></tr>`).join('');
  }
  function openDetail(id) {
    const c = getCanteen(id);
    const row = data.observations.find(r => r.time === selectedTime && r.canteen === id);
    $('#detail-title').textContent = c.name;
    $('#detail-content').innerHTML = `<p class="detail-summary">${escape(c.fullName)} · Data observasi awal</p>${c.smallCapacity ? `<div class="capacity-note">${icon('info')}<p><strong>Kapasitas fisik lebih kecil.</strong> Kiosk kecil dengan sedikit meja dan bangku. Kapasitas numerik belum diukur.</p></div>` : '<p class="source-note">Kapasitas numerik belum diukur. Antrean perlu dibaca bersama konteks kapasitas.</p>'}<div class="detail-current"><strong>${escape(selectedTime)}</strong>${badge(row.condition)}<span>Antrean sekitar <strong>${row.queue} orang</strong></span><span>Meja: <strong>${escape(row.tables)}</strong></span></div><h3>Riwayat observasi</h3><div class="table-scroll" tabindex="0" role="region" aria-label="Riwayat observasi ${escape(c.name)}"><table><caption class="sr-only">Riwayat observasi ${escape(c.name)}</caption><thead><tr><th scope="col">Waktu</th><th scope="col">Kondisi</th><th scope="col">Antrean sekitar</th><th scope="col">Meja tersedia</th></tr></thead><tbody>${tableRows(data.observations.filter(r => r.canteen === id), false)}</tbody></table></div><p class="source-note">Catatan kondisi mengikuti observasi asli; bukan kategori prediksi model.</p>`;
    $('#detail-dialog').showModal();
  }
  $('#close-dialog').addEventListener('click', () => $('#detail-dialog').close());
  $('#detail-dialog').addEventListener('click', e => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (e.target === e.currentTarget && (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom)) e.currentTarget.close();
  });
  $('#canteen-filter').insertAdjacentHTML('beforeend', data.canteens.map(c => `<option value="${escape(c.id)}">${escape(c.name)}</option>`).join(''));
  function renderTable() {
    const filter = $('#canteen-filter').value;
    const rows = data.observations.filter(r => filter === 'all' || r.canteen === filter);
    $('#observation-rows').innerHTML = tableRows(rows);
    $('#row-count').textContent = `${rows.length} catatan observasi${filter !== 'all' ? ` · ${getCanteen(filter).name}` : ''}`;
  }
  $('#canteen-filter').addEventListener('change', renderTable);
  const x = i => 58 + i * 212;
  const y = q => 249 - q * 13;
  const dashPatterns = ['', '8 4', '3 5', '12 4 3 4', '2 4'];
  function renderChart() {
    const grid = [0, 4, 8, 12, 16].map(q => `<line x1="58" y1="${y(q)}" x2="906" y2="${y(q)}" stroke="#e3ebf0"/><text x="43" y="${y(q) + 5}" text-anchor="end" fill="#526c80" font-size="14">${q}</text>`).join('');
    const labels = data.times.map((t, i) => `<text x="${x(i)}" y="278" text-anchor="middle" fill="#526c80" font-size="15">${escape(t)}</text>`).join('');
    const lines = data.canteens.map((c, ci) => {
      if (!visible.has(c.id)) return '';
      const rows = data.times.map(t => data.observations.find(r => r.canteen === c.id && r.time === t));
      const line = `<polyline points="${rows.map((r, i) => `${x(i)},${y(r.queue)}`).join(' ')}" fill="none" stroke="${c.color}" stroke-width="2.7" stroke-linejoin="round" stroke-dasharray="${dashPatterns[ci]}"/>`;
      // Coincident observations stay at their exact coordinates; slight hit-target offsets
      // allow each value to be selected without altering the plotted data.
      const points = rows.map((r, i) => `<g class="chart-point" tabindex="0" role="button" data-point="${c.id}|${r.time}" aria-label="${escape(c.name)}, ${escape(r.time)}, antrean sekitar ${r.queue} orang"><title>${escape(c.name)} · ${escape(r.time)} · sekitar ${r.queue} orang</title><circle class="point-target" cx="${x(i) + (ci - 2) * 5}" cy="${y(r.queue) + (ci - 2) * 5}" r="8" fill="transparent"/><circle class="visible-point" cx="${x(i)}" cy="${y(r.queue)}" r="4.6" fill="white" stroke="${c.color}" stroke-width="2.3" pointer-events="none"/></g>`).join('');
      return line + points;
    }).join('');
    $('#queue-chart').innerHTML = grid + labels + lines;
    document.querySelectorAll('[data-series]').forEach(button => button.setAttribute('aria-pressed', String(visible.has(button.dataset.series))));
    if (visible.size === 0) $('#chart-readout').textContent = 'Semua garis disembunyikan. Pilih nama kantin untuk menampilkan garis kembali.';
    else $('#chart-readout').textContent = 'Arahkan kursor, ketuk, atau fokuskan titik grafik untuk melihat antrean.';
  }
  $('#chart-controls').innerHTML = data.canteens.map(c => `<button class="chart-toggle" type="button" data-series="${c.id}" style="--series-color:${c.color}" aria-pressed="true" aria-label="Tampilkan garis ${escape(c.name)}"><span class="line-swatch" aria-hidden="true"></span>${escape(c.name)}</button>`).join('');
  $('#chart-controls').addEventListener('click', e => {
    const button = e.target.closest('[data-series]');
    if (!button) return;
    const id = button.dataset.series;
    if (visible.has(id)) visible.delete(id); else visible.add(id);
    renderChart();
  });
  function readPoint(e) {
    const point = e.target.closest('[data-point]');
    if (!point) return;
    const [id, time] = point.dataset.point.split('|');
    const row = data.observations.find(r => r.canteen === id && r.time === time);
    $('#chart-readout').textContent = `${time} · ${getCanteen(id).name} · Antrean sekitar ${row.queue} orang`;
  }
  ['pointerover', 'click', 'focusin'].forEach(event => $('#queue-chart').addEventListener(event, readPoint));
  $('#queue-chart').addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); readPoint(e); }
  });
  // Fixed interface examples, deliberately independent of the observation dataset.
  const examples = [{name:'Kansip', category:'Ramai'}, {name:'Kandok', category:'Sangat Ramai'}, {name:'Kantin TN', category:'Sepi'}, {name:'Kantek', category:'Sedang'}, {name:'Kantel', category:'Ramai'}];
  $('#prediction-cards').innerHTML = examples.map(c => `<article class="prediction-card"><h3>${c.name}</h3>${badge(c.category)}<p>Contoh kategori simulasi</p></article>`).join('');
  $('#simulation-toggle').addEventListener('click', () => {
    const open = $('#simulation-results').hidden;
    $('#simulation-results').hidden = !open;
    $('#simulation-empty').hidden = open;
    $('#simulation-toggle').setAttribute('aria-expanded', String(open));
    $('#simulation-toggle').textContent = open ? 'Tutup contoh tampilan prediksi' : 'Lihat contoh tampilan prediksi';
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      const active = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!active) return;
      document.querySelectorAll('.nav-link').forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${active.target.id}`));
    }, {rootMargin:'-5% 0px -55% 0px', threshold:0});
    document.querySelectorAll('main>section').forEach(section => observer.observe(section));
  }
  renderCards(); renderTable(); renderChart();
})();
