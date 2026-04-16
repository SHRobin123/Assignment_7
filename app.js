/* =====================================================
   KEENKEEPER — app.js
   Vanilla JS. No build step. Open index.html directly.
   ===================================================== */

/* ===== FRIENDS DATA ===== */
const FRIENDS = [
  {
    id: 1, name: "Emma Wilson",
    picture: "https://i.pravatar.cc/150?img=5",
    email: "emma.wilson@gmail.com",
    days_since_contact: 62, status: "overdue",
    tags: ["Family"], bio: "Former colleague turned close friend. Great mentor and even better listener.",
    goal: 30, next_due_date: "2026-02-27"
  },
  {
    id: 2, name: "David Kim",
    picture: "https://i.pravatar.cc/150?img=11",
    email: "david.kim@outlook.com",
    days_since_contact: 8, status: "almost-due",
    tags: ["Work", "College"], bio: "Classmate from university. We bonded over late-night study sessions. Now catches up every few weeks.",
    goal: 14, next_due_date: "2026-04-20"
  },
  {
    id: 3, name: "Lisa Nakamura",
    picture: "https://i.pravatar.cc/150?img=9",
    email: "lisa.n@designco.io",
    days_since_contact: 21, status: "overdue",
    tags: ["Work"], bio: "Brilliant UI designer met through a mutual friend. Challenges me to think differently about aesthetics.",
    goal: 21, next_due_date: "2026-04-18"
  },
  {
    id: 4, name: "James Wright",
    picture: "https://i.pravatar.cc/150?img=53",
    email: "james.wright@studio.com",
    days_since_contact: 45, status: "overdue",
    tags: ["Hobby", "Travel"], bio: "Adventure buddy and travel partner. Met backpacking through Southeast Asia.",
    goal: 30, next_due_date: "2026-03-01"
  },
  {
    id: 5, name: "Sarah Chen",
    picture: "https://i.pravatar.cc/150?img=47",
    email: "sarah.chen@techlab.dev",
    days_since_contact: 3, status: "on-track",
    tags: ["Work", "Close Friend"], bio: "Senior engineer I met at a hackathon. Coffee chats keep me grounded and motivated.",
    goal: 7, next_due_date: "2026-04-17"
  },
  {
    id: 6, name: "Marcus Johnson",
    picture: "https://i.pravatar.cc/150?img=57",
    email: "marcus.j@creativestudio.net",
    days_since_contact: 18, status: "on-track",
    tags: ["Hobby", "College"], bio: "Music producer and one of the most creative people I know. Still collab occasionally.",
    goal: 21, next_due_date: "2026-04-26"
  },
  {
    id: 7, name: "Olivia Martinez",
    picture: "https://i.pravatar.cc/150?img=16",
    email: "olivia.m@healthco.org",
    days_since_contact: 35, status: "almost-due",
    tags: ["Family", "Close Friend"], bio: "A lifelong friend since kindergarten. She knows everything about me.",
    goal: 30, next_due_date: "2026-04-20"
  },
  {
    id: 8, name: "Ryan O'Brien",
    picture: "https://i.pravatar.cc/150?img=60",
    email: "ryan.ob@ventures.co",
    days_since_contact: 55, status: "overdue",
    tags: ["Work", "Travel"], bio: "Startup founder met through a mentorship program. Incredibly driven and creative.",
    goal: 30, next_due_date: "2026-03-10"
  }
];

/* ===== TIMELINE DATA ===== */
let TIMELINE = [
  { id:"t1",  type:"Meetup", person:"Tom Baker",       date:"2026-03-29" },
  { id:"t2",  type:"Text",   person:"Sarah Chen",      date:"2026-03-28" },
  { id:"t3",  type:"Meetup", person:"Olivia Martinez", date:"2026-03-26" },
  { id:"t4",  type:"Video",  person:"David Kim",       date:"2026-03-23" },
  { id:"t5",  type:"Meetup", person:"Sarah Chen",      date:"2026-03-21" },
  { id:"t6",  type:"Call",   person:"Marcus Johnson",  date:"2026-03-19" },
  { id:"t7",  type:"Meetup", person:"Lisa Nakamura",   date:"2026-03-17" },
  { id:"t8",  type:"Text",   person:"Olivia Martinez", date:"2026-03-13" },
  { id:"t9",  type:"Call",   person:"Lisa Nakamura",   date:"2026-03-11" },
  { id:"t10", type:"Call",   person:"Sarah Chen",      date:"2026-03-11" },
  { id:"t11", type:"Video",  person:"Marcus Johnson",  date:"2026-03-06" },
  { id:"t12", type:"Video",  person:"Ryan O'Brien",    date:"2026-02-24" }
];

/* ===== CONSTANTS ===== */
const CHART_COLORS = {
  Call:   "#1D4E3A",
  Text:   "#7c73e6",
  Video:  "#3b82f6",
  Meetup: "#f59e0b"
};

const TAG_CLASS = {
  "Work": "tag-Work", "Family": "tag-Family",
  "Hobby": "tag-Hobby", "Travel": "tag-Travel",
  "College": "tag-College", "Close Friend": "tag-Close-Friend"
};

let currentFriendId = null;
let statsChartInstance = null;

/* ===== INIT ===== */
window.addEventListener('DOMContentLoaded', () => {
  renderSkeletons();
  setTimeout(() => {
    renderFriendCards();
    updateSummary();
  }, 900);
  renderTimeline();
});

/* ===== NAVIGATION ===== */
function navigateTo(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

  const pageEl = document.getElementById('page-' + page);
  if (!pageEl) { document.getElementById('page-404').classList.add('active'); return false; }
  pageEl.classList.add('active');

  const navBtn = document.getElementById('nav-' + page);
  if (navBtn) navBtn.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (page === 'timeline') renderTimeline();
  if (page === 'stats')    renderStats();

  return false; // prevent href navigation
}

/* ===== MOBILE MENU ===== */
function toggleMobileMenu() {
  document.getElementById('mobile-menu').classList.toggle('open');
}
function closeMobileMenu() {
  document.getElementById('mobile-menu').classList.remove('open');
}

/* ===== SKELETONS ===== */
function renderSkeletons() {
  const grid = document.getElementById('friends-grid');
  grid.innerHTML = Array.from({length: 8}, () => `
    <div class="skeleton-card">
      <div class="sk-avatar"></div>
      <div class="sk-line w60"></div>
      <div class="sk-line w40"></div>
      <div class="sk-line w50"></div>
    </div>
  `).join('');
}

/* ===== SUMMARY ===== */
function updateSummary() {
  document.getElementById('s-total').textContent    = FRIENDS.length;
  document.getElementById('s-ontrack').textContent  = FRIENDS.filter(f => f.status === 'on-track').length;
  document.getElementById('s-attention').textContent = FRIENDS.filter(f => f.status !== 'on-track').length;
}

/* ===== FRIEND CARDS ===== */
function renderFriendCards() {
  const grid = document.getElementById('friends-grid');
  grid.innerHTML = '';
  FRIENDS.forEach(f => {
    const div = document.createElement('div');
    div.className = 'friend-card';
    div.onclick = () => openDetail(f.id);
    const statusLabels = { overdue:'Overdue', 'almost-due':'Almost Due', 'on-track':'On-Track' };
    const statusClass  = { overdue:'badge-overdue', 'almost-due':'badge-almost-due', 'on-track':'badge-on-track' };
    const tagsHTML = f.tags.map(t => `<span class="tag ${TAG_CLASS[t]||''}">${t.toUpperCase()}</span>`).join('');
    div.innerHTML = `
      <img src="${f.picture}" alt="${f.name}" class="friend-avatar"
           onerror="this.src='https://i.pravatar.cc/150?u=${f.id}'" />
      <p class="friend-name">${f.name}</p>
      <p class="friend-meta">${f.days_since_contact}d ago</p>
      <div class="tags">${tagsHTML}</div>
      <span class="badge ${statusClass[f.status]}">${statusLabels[f.status]||f.status}</span>
    `;
    grid.appendChild(div);
  });
}

/* ===== FRIEND DETAIL ===== */
function openDetail(id) {
  const f = FRIENDS.find(x => x.id === id);
  if (!f) return;
  currentFriendId = id;

  /* Populate */
  document.getElementById('d-picture').src = f.picture;
  document.getElementById('d-picture').onerror = function() {
    this.src = `https://i.pravatar.cc/150?u=${id}`;
  };
  document.getElementById('d-name').textContent = f.name;
  document.getElementById('d-bio').textContent  = `"${f.bio}"`;
  document.getElementById('d-email').textContent = f.email;

  const statusLabels = { overdue:'Overdue', 'almost-due':'Almost Due', 'on-track':'On Track' };
  const statusClass  = { overdue:'badge-overdue', 'almost-due':'badge-almost-due', 'on-track':'badge-on-track' };
  const tagsHTML = f.tags.map(t => `<span class="tag ${TAG_CLASS[t]||''}">${t.toUpperCase()}</span>`).join('');
  document.getElementById('d-badges').innerHTML =
    `<span class="badge ${statusClass[f.status]}">${statusLabels[f.status]}</span> ${tagsHTML}`;

  document.getElementById('d-days').textContent    = f.days_since_contact;
  document.getElementById('d-goal-num').textContent = f.goal;
  document.getElementById('d-due').textContent      = formatDate(f.next_due_date);

  document.getElementById('goal-display-val').textContent = `${f.goal} days`;
  document.getElementById('goal-input').value              = f.goal;
  document.getElementById('goal-display').classList.remove('hidden');
  document.getElementById('goal-edit-form').classList.add('hidden');

  /* Switch page */
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('page-detail').classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ===== GOAL EDIT ===== */
function toggleEditGoal() {
  document.getElementById('goal-display').classList.toggle('hidden');
  document.getElementById('goal-edit-form').classList.toggle('hidden');
}
function saveGoal() {
  const val = parseInt(document.getElementById('goal-input').value);
  if (!val || val < 1) return;
  const f = FRIENDS.find(x => x.id === currentFriendId);
  if (f) {
    f.goal = val;
    document.getElementById('goal-display-val').textContent = `${val} days`;
    document.getElementById('d-goal-num').textContent = val;
  }
  toggleEditGoal();
  showToast('Goal updated ✓', 'success');
}

/* ===== LOG INTERACTION ===== */
function logInteraction(type) {
  const f = FRIENDS.find(x => x.id === currentFriendId);
  if (!f) return;
  const today = new Date().toISOString().split('T')[0];
  TIMELINE.unshift({ id: 't' + Date.now(), type, person: f.name, date: today });
  const emojis = { Call:'📞', Text:'💬', Video:'🎥' };
  showToast(`${emojis[type]||'✅'} ${type} with ${f.name} logged!`, 'success');
}

/* ===== TIMELINE ===== */
function renderTimeline() {
  const filter = (document.getElementById('timeline-filter') || {}).value || 'All';
  const list   = document.getElementById('timeline-list');
  if (!list) return;
  list.innerHTML = '';

  const entries = filter === 'All' ? TIMELINE : TIMELINE.filter(e => e.type === filter);
  if (!entries.length) {
    list.innerHTML = '<div class="no-entries">No entries for this filter.</div>';
    return;
  }

  entries.forEach(e => {
    const div = document.createElement('div');
    div.className = 'tl-item';
    div.innerHTML = `
      <div class="tl-icon ${e.type.toLowerCase()}">${tlIconHTML(e.type)}</div>
      <div class="tl-content">
        <p class="tl-title"><strong>${e.type}</strong> <span>with ${e.person}</span></p>
        <p class="tl-date">${formatDate(e.date)}</p>
      </div>
    `;
    list.appendChild(div);
  });
}

function tlIconHTML(type) {
  /* Use local images with SVG fallback */
  const svgs = {
    Call:  `<img src="call.png"  alt="Call"  width="20" height="20" style="object-fit:contain"
              onerror="this.onerror=null;this.outerHTML='<svg width=20 height=20 viewBox=&quot;0 0 24 24&quot; fill=none stroke=&quot;#374151&quot; stroke-width=2 stroke-linecap=round stroke-linejoin=round><path d=&quot;M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.31 11a19.79 19.79 0 01-3.07-8.67A2 2 0 013.22 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z&quot;/></svg>'" />`,
    Text:  `<img src="text.png"  alt="Text"  width="20" height="20" style="object-fit:contain"
              onerror="this.onerror=null;this.outerHTML='<svg width=20 height=20 viewBox=&quot;0 0 24 24&quot; fill=none stroke=&quot;#374151&quot; stroke-width=2 stroke-linecap=round stroke-linejoin=round><path d=&quot;M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z&quot;/></svg>'" />`,
    Video: `<img src="video.png" alt="Video" width="20" height="20" style="object-fit:contain"
              onerror="this.onerror=null;this.outerHTML='<svg width=20 height=20 viewBox=&quot;0 0 24 24&quot; fill=none stroke=&quot;#374151&quot; stroke-width=2 stroke-linecap=round stroke-linejoin=round><polygon points=&quot;23 7 16 12 23 17 23 7&quot;/><rect x=1 y=5 width=15 height=14 rx=2/></svg>'" />`,
    Meetup:`🤝`
  };
  return svgs[type] || '📝';
}

/* ===== STATS PAGE ===== */
function renderStats() {
  /* Count interactions by type */
  const counts = {};
  TIMELINE.forEach(e => { counts[e.type] = (counts[e.type] || 0) + 1; });

  const labels = Object.keys(counts);
  const data   = labels.map(k => counts[k]);
  const colors = labels.map(k => CHART_COLORS[k] || '#888');
  const total  = data.reduce((a,b) => a+b, 0);

  /* --- Donut chart --- */
  if (statsChartInstance) { statsChartInstance.destroy(); statsChartInstance = null; }
  const ctx = document.getElementById('stats-chart');
  if (ctx) {
    statsChartInstance = new Chart(ctx.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          data, backgroundColor: colors,
          borderWidth: 3, borderColor: '#fff', hoverOffset: 6
        }]
      },
      options: {
        cutout: '65%',
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx => ` ${ctx.label}: ${ctx.parsed} (${Math.round(ctx.parsed/total*100)}%)`
            }
          }
        },
        animation: { animateRotate: true, duration: 800 }
      }
    });
  }

  /* --- Legend pills below chart --- */
  const legendEl = document.getElementById('chart-legend-row');
  if (legendEl) {
    legendEl.innerHTML = labels.map((l,i) => `
      <div class="legend-pill">
        <div class="legend-dot" style="background:${colors[i]}"></div>
        <span>● ${l}</span>
      </div>
    `).join('');
    /* Make them look like the Figma dots-with-label */
    legendEl.innerHTML = labels.map((l,i) => `
      <div class="legend-pill">
        <div class="legend-dot" style="background:${colors[i]}"></div>
        <span>${l}</span>
      </div>
    `).join('');
  }

  /* --- Count cards --- */
  const countGrid = document.getElementById('stats-count-grid');
  if (countGrid) {
    countGrid.innerHTML = labels.map((l,i) => `
      <div class="stats-count-card">
        <div class="sc-dot" style="background:${colors[i]}"></div>
        <span class="sc-num">${data[i]}</span>
        <span class="sc-label">${l}s</span>
      </div>
    `).join('');
  }

  /* --- Most active friend --- */
  const personCounts = {};
  TIMELINE.forEach(e => { personCounts[e.person] = (personCounts[e.person]||0)+1; });
  const topPerson = Object.entries(personCounts).sort((a,b)=>b[1]-a[1])[0];
  const mostActiveEl = document.getElementById('stats-most-active');
  if (mostActiveEl && topPerson) {
    const friend = FRIENDS.find(f => f.name === topPerson[0]);
    const pic = friend ? friend.picture : `https://i.pravatar.cc/150?u=${topPerson[0]}`;
    mostActiveEl.innerHTML = `
      <div class="most-active-row">
        <img src="${pic}" alt="${topPerson[0]}" class="most-active-avatar"
             onerror="this.src='https://i.pravatar.cc/150?u=999'" />
        <div>
          <p class="most-active-name">${topPerson[0]}</p>
          <p class="most-active-count">${topPerson[1]} interaction${topPerson[1]>1?'s':''}</p>
        </div>
      </div>
    `;
  }

  /* --- Status breakdown --- */
  const overdue   = FRIENDS.filter(f => f.status === 'overdue').length;
  const almostDue = FRIENDS.filter(f => f.status === 'almost-due').length;
  const onTrack   = FRIENDS.filter(f => f.status === 'on-track').length;
  const total2    = FRIENDS.length;
  const statusEl  = document.getElementById('stats-status-list');
  if (statusEl) {
    const rows = [
      { label: 'On Track',   count: onTrack,   color: '#1D4E3A' },
      { label: 'Almost Due', count: almostDue, color: '#f59e0b' },
      { label: 'Overdue',    count: overdue,   color: '#ef4444' },
    ];
    statusEl.innerHTML = rows.map(r => `
      <div class="status-row">
        <span class="status-label">
          <span style="width:8px;height:8px;border-radius:50%;background:${r.color};display:inline-block"></span>
          ${r.label}
        </span>
        <div class="status-bar-wrap">
          <div class="status-bar" style="width:${total2?Math.round(r.count/total2*100):0}%;background:${r.color}"></div>
        </div>
        <span class="status-count">${r.count}</span>
      </div>
    `).join('');
  }

  /* --- Avg days since contact --- */
  const avgEl = document.getElementById('stats-avg-days');
  if (avgEl) {
    const avg = Math.round(FRIENDS.reduce((a,f)=>a+f.days_since_contact,0)/FRIENDS.length);
    avgEl.innerHTML = `
      <p class="avg-days-big">${avg}</p>
      <p class="avg-days-lbl">days on average</p>
    `;
  }
}

/* ===== MODAL ===== */
function showAddModal() { document.getElementById('modal-overlay').classList.remove('hidden'); }
function hideAddModal() { document.getElementById('modal-overlay').classList.add('hidden'); }
document.addEventListener('keydown', e => { if(e.key==='Escape') hideAddModal(); });

/* ===== TOAST ===== */
function showToast(msg, type='success') {
  const container = document.getElementById('toast-container');
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.innerHTML = `<span>${msg}</span>`;
  container.appendChild(t);
  setTimeout(() => {
    t.style.animation = 'slideOut .3s ease forwards';
    setTimeout(() => t.remove(), 300);
  }, 3000);
}

/* ===== DATE FORMATTER ===== */
function formatDate(str) {
  const [y,m,d] = str.split('-').map(Number);
  return new Date(y,m-1,d).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'});
}