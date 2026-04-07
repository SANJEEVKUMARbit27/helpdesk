import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Outfit:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:        #f0f2f8;
    --surface:   #ffffff;
    --surface2:  #f7f8fc;
    --border:    #e4e6f0;
    --border2:   #eceef8;
    --text-1:    #14152a;
    --text-2:    #4b4d6b;
    --text-3:    #9698b4;
    --accent:    #4f46e5;
    --accent-lt: #eef2ff;
    --accent-md: #c7d2fe;
    --green:     #059669;
    --green-lt:  #d1fae5;
    --green-md:  #6ee7b7;
    --amber:     #d97706;
    --amber-lt:  #fef3c7;
    --amber-md:  #fcd34d;
    --blue:      #2563eb;
    --blue-lt:   #dbeafe;
    --blue-md:   #93c5fd;
    --red:       #dc2626;
    --red-lt:    #fee2e2;
    --red-md:    #fca5a5;
    --shadow-sm: 0 1px 3px rgba(20,21,42,0.06), 0 1px 2px rgba(20,21,42,0.04);
    --shadow-md: 0 4px 16px rgba(20,21,42,0.08), 0 2px 6px rgba(20,21,42,0.04);
    --shadow-lg: 0 12px 40px rgba(20,21,42,0.12), 0 4px 12px rgba(20,21,42,0.06);
    --radius:    14px;
    --radius-sm: 8px;
  }

  body { background: var(--bg); font-family: 'Outfit', sans-serif; }

  .td-wrap { min-height: 100vh; background: var(--bg); padding: 28px 36px; }

  /* HEADER */
  .td-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; }
  .td-header-left {}
  .td-greeting { font-size: 13px; font-weight: 500; color: var(--text-3); margin-bottom: 4px; letter-spacing: 0.3px; }
  .td-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 26px; font-weight: 800; color: var(--text-1); letter-spacing: -0.4px; line-height: 1.1; }
  .td-title span { color: var(--accent); }
  .td-dept-pill {
    display: inline-flex; align-items: center; gap: 6px;
    background: var(--accent-lt); border: 1px solid var(--accent-md);
    color: var(--accent); border-radius: 20px;
    font-size: 12px; font-weight: 700; padding: 5px 14px; margin-top: 8px;
  }
  .td-header-actions { display: flex; gap: 10px; align-items: center; }

  /* BUTTONS */
  .btn-primary-td {
    display: inline-flex; align-items: center; gap: 7px;
    background: var(--accent); border: none; color: #fff;
    padding: 10px 20px; border-radius: var(--radius-sm);
    font-family: 'Outfit', sans-serif; font-size: 13.5px; font-weight: 600;
    cursor: pointer; transition: all 0.18s ease;
    box-shadow: 0 2px 8px rgba(79,70,229,0.3);
  }
  .btn-primary-td:hover { background: #4338ca; transform: translateY(-1px); }

  .btn-ghost-td {
    display: inline-flex; align-items: center; gap: 7px;
    background: var(--surface); border: 1px solid var(--border); color: var(--text-2);
    padding: 10px 20px; border-radius: var(--radius-sm);
    font-family: 'Outfit', sans-serif; font-size: 13.5px; font-weight: 600;
    cursor: pointer; transition: all 0.18s ease; box-shadow: var(--shadow-sm);
  }
  .btn-ghost-td:hover { background: var(--accent-lt); border-color: var(--accent-md); color: var(--accent); }

  /* STAT CARDS */
  .td-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 28px; }

  .td-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 20px; position: relative;
    overflow: hidden; transition: all 0.22s ease; box-shadow: var(--shadow-sm);
  }
  .td-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: var(--card-accent); border-radius: var(--radius) var(--radius) 0 0;
  }
  .td-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); border-color: transparent; }
  .td-card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
  .td-card-icon { width: 40px; height: 40px; border-radius: 10px; background: var(--card-icon-bg); display: flex; align-items: center; justify-content: center; font-size: 18px; }
  .td-card-value { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 34px; font-weight: 800; color: var(--text-1); line-height: 1; margin-bottom: 5px; }
  .td-card-label { font-size: 12px; font-weight: 600; color: var(--text-3); letter-spacing: 0.5px; text-transform: uppercase; }

  .cc-amber  { --card-accent: #d97706; --card-icon-bg: #fef3c7; }
  .cc-blue   { --card-accent: #2563eb; --card-icon-bg: #dbeafe; }
  .cc-green  { --card-accent: #059669; --card-icon-bg: #d1fae5; }

  /* CURRENT TASK */
  .td-current {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius); box-shadow: var(--shadow-sm);
    overflow: hidden; margin-bottom: 28px;
    position: relative;
  }
  .td-current::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, var(--accent), #7c3aed);
  }
  .td-current-header {
    display: flex; justify-content: space-between; align-items: center;
    padding: 16px 24px; background: var(--surface2); border-bottom: 1px solid var(--border2);
  }
  .td-current-label {
    font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; font-weight: 700;
    color: var(--accent); letter-spacing: 0.5px; text-transform: uppercase;
    display: flex; align-items: center; gap: 8px;
  }
  .td-current-label::before {
    content: ''; width: 8px; height: 8px; border-radius: 50%; background: var(--accent);
    animation: pulse 1.5s ease-in-out infinite;
  }
  @keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.5; transform:scale(1.3); } }

  .td-current-body { padding: 20px 24px; display: grid; grid-template-columns: 1fr auto; gap: 20px; align-items: start; }
  .td-current-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 18px; font-weight: 700; color: var(--text-1); margin-bottom: 6px; }
  .td-current-desc { font-size: 13.5px; color: var(--text-2); margin-bottom: 12px; line-height: 1.5; }
  .td-current-meta { display: flex; gap: 16px; flex-wrap: wrap; }
  .td-current-meta-item { font-size: 12px; color: var(--text-3); font-weight: 500; }
  .td-current-meta-item strong { color: var(--text-2); }

  /* TIMER WIDGET */
  .td-timer {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    min-width: 140px; padding: 16px 20px;
    background: var(--timer-bg); border: 2px solid var(--timer-border);
    border-radius: var(--radius); text-align: center;
  }
  .td-timer-label { font-size: 10px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: var(--timer-color); opacity: 0.7; margin-bottom: 4px; }
  .td-timer-time { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 26px; font-weight: 800; color: var(--timer-color); letter-spacing: -0.5px; line-height: 1; margin-bottom: 4px; font-variant-numeric: tabular-nums; }
  .td-timer-sub { font-size: 10px; font-weight: 600; color: var(--timer-color); opacity: 0.6; }

  .timer-red    { --timer-bg: var(--red-lt);   --timer-border: var(--red-md);   --timer-color: var(--red); }
  .timer-amber  { --timer-bg: var(--amber-lt); --timer-border: var(--amber-md); --timer-color: var(--amber); }
  .timer-green  { --timer-bg: var(--green-lt); --timer-border: var(--green-md); --timer-color: var(--green); }
  .timer-done   { --timer-bg: var(--green-lt); --timer-border: var(--green-md); --timer-color: var(--green); }

  /* NO TASK BANNER */
  .td-no-task {
    background: var(--blue-lt); border: 1px solid var(--blue-md);
    border-radius: var(--radius); padding: 20px 24px;
    display: flex; align-items: center; gap: 12px;
    font-size: 14px; font-weight: 500; color: var(--blue);
    margin-bottom: 28px;
  }

  /* TABLE PANEL */
  .td-panel { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); box-shadow: var(--shadow-sm); overflow: hidden; }
  .td-panel-header { display: flex; justify-content: space-between; align-items: center; padding: 18px 24px; background: var(--surface2); border-bottom: 1px solid var(--border2); }
  .td-panel-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 15px; font-weight: 700; color: var(--text-1); display: flex; align-items: center; gap: 8px; }
  .td-panel-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); }
  .td-panel-count { font-size: 12px; font-weight: 600; color: var(--text-3); background: var(--border2); padding: 3px 10px; border-radius: 20px; }

  /* TABLE */
  .td-table { width: 100%; border-collapse: collapse; }
  .td-table thead tr { background: var(--surface2); }
  .td-table th { padding: 11px 16px; font-size: 10.5px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: var(--text-3); text-align: left; border-bottom: 1px solid var(--border2); white-space: nowrap; }
  .td-table td { padding: 13px 16px; font-size: 13px; color: var(--text-2); border-bottom: 1px solid var(--border2); vertical-align: middle; }
  .td-table tbody tr:last-child td { border-bottom: none; }
  .td-table tbody tr { transition: background 0.15s; animation: rowIn 0.3s ease both; }
  .td-table tbody tr:hover td { background: var(--accent-lt); }
  .td-table tbody tr.row-high { background: #fff5f5; }
  .td-table tbody tr.row-high:hover td { background: #fee2e2; }

  @keyframes rowIn { from { opacity: 0; transform: translateX(-6px); } to { opacity: 1; transform: translateX(0); } }

  /* INLINE TIMER CHIP */
  .timer-chip {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 4px 10px; border-radius: 20px;
    font-size: 11px; font-weight: 700; font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }
  .timer-chip-red   { background: var(--red-lt);   color: var(--red); }
  .timer-chip-amber { background: var(--amber-lt); color: var(--amber); }
  .timer-chip-green { background: var(--green-lt); color: var(--green); }
  .timer-chip-done  { background: var(--green-lt); color: var(--green); }

  /* BADGES */
  .badge { display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; white-space: nowrap; }
  .badge::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: currentColor; flex-shrink: 0; }
  .badge-pending  { background: var(--amber-lt); color: var(--amber); }
  .badge-progress { background: var(--blue-lt);  color: var(--blue); }
  .badge-resolved { background: var(--green-lt); color: var(--green); }
  .badge-high     { background: var(--red-lt);   color: var(--red); }
  .badge-medium   { background: var(--amber-lt); color: var(--amber); }
  .badge-low      { background: var(--green-lt); color: var(--green); }

  /* REMARK INPUT */
  .td-remark-input {
    width: 100%; padding: 7px 11px;
    border: 1px solid var(--border); border-radius: var(--radius-sm);
    font-family: 'Outfit', sans-serif; font-size: 12.5px; color: var(--text-1);
    background: var(--surface2); transition: border 0.15s;
    outline: none;
  }
  .td-remark-input:focus { border-color: var(--accent); background: #fff; }

  /* ACTION BUTTONS */
  .btn-start {
    display: inline-flex; align-items: center; gap: 5px;
    background: var(--blue); color: #fff; border: none;
    padding: 7px 14px; border-radius: var(--radius-sm);
    font-family: 'Outfit', sans-serif; font-size: 12px; font-weight: 600;
    cursor: pointer; transition: all 0.15s;
  }
  .btn-start:hover { background: #1d4ed8; transform: translateY(-1px); }

  .btn-resolve {
    display: inline-flex; align-items: center; gap: 5px;
    background: var(--green); color: #fff; border: none;
    padding: 7px 14px; border-radius: var(--radius-sm);
    font-family: 'Outfit', sans-serif; font-size: 12px; font-weight: 600;
    cursor: pointer; transition: all 0.15s;
  }
  .btn-resolve:hover { background: #047857; transform: translateY(-1px); }

  .td-completed-text { color: var(--green); font-weight: 700; font-size: 12px; display: flex; align-items: center; gap: 4px; }

  /* SPINNER */
  .td-spinner-wrap { display: flex; justify-content: center; align-items: center; min-height: 200px; }
  .td-spinner { width: 38px; height: 38px; border: 3px solid var(--accent-md); border-top-color: var(--accent); border-radius: 50%; animation: spin 0.7s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* ANIMATIONS */
  .fade-in { animation: fadeIn 0.25s ease both; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  .td-card:nth-child(1) { animation: fadeIn 0.3s ease 0.05s both; }
  .td-card:nth-child(2) { animation: fadeIn 0.3s ease 0.10s both; }
  .td-card:nth-child(3) { animation: fadeIn 0.3s ease 0.15s both; }

  /* SLA label */
  .sla-label { font-size: 10px; font-weight: 600; color: var(--text-3); margin-top: 2px; }
`;

/* ── SLA per priority (in hours) ── */
const SLA_HOURS = { High: 4, Medium: 12, Low: 24 };

/* ── Compute time left string from createdAt + priority ── */
function getTimeLeft(createdAt, priority) {
  if (!createdAt || !priority) return null;
  const slaMs   = (SLA_HOURS[priority] || 24) * 60 * 60 * 1000;
  const created = new Date(createdAt).getTime();
  const deadline = created + slaMs;
  const now      = Date.now();
  const diff     = deadline - now;

  if (diff <= 0) return { label: "Overdue", chip: "red", overdue: true, pct: 100 };

  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  const label = h > 0 ? `${h}h ${m}m` : `${m}m ${s}s`;
  const pct   = Math.min(100, Math.round(((slaMs - diff) / slaMs) * 100));

  let chip = "green";
  if (pct > 75) chip = "red";
  else if (pct > 40) chip = "amber";

  return { label, chip, overdue: false, pct, h, m, s };
}

/* ── Live Timer component ── */
function LiveTimer({ createdAt, priority, resolved }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (resolved) return;
    const id = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(id);
  }, [resolved]);

  if (resolved) {
    return <span className="timer-chip timer-chip-done">✅ Resolved</span>;
  }

  const t = getTimeLeft(createdAt, priority);
  if (!t) return null;

  return (
    <span className={`timer-chip timer-chip-${t.chip}`}>
      {t.overdue ? "🔴" : t.chip === "red" ? "🔴" : t.chip === "amber" ? "🟡" : "🟢"} {t.label}
    </span>
  );
}

/* ── Big timer for current task ── */
function BigTimer({ createdAt, priority }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const t = getTimeLeft(createdAt, priority);
  if (!t) return null;

  const timerClass = `td-timer timer-${t.chip}`;

  return (
    <div className={timerClass}>
      <div className="td-timer-label">SLA Time Left</div>
      <div className="td-timer-time">
        {t.overdue ? "Overdue" : t.label}
      </div>
      <div className="td-timer-sub">
        {SLA_HOURS[priority]}h SLA · {t.pct}% elapsed
      </div>
    </div>
  );
}

const getBadge = (val, type = "status") => {
  if (!val) return null;
  const statusMap   = { Pending: "badge-pending", "In Progress": "badge-progress", Resolved: "badge-resolved" };
  const priorityMap = { High: "badge-high", Medium: "badge-medium", Low: "badge-low" };
  const cls = type === "priority" ? priorityMap[val] : statusMap[val];
  return <span className={`badge ${cls || "badge-pending"}`}>{val}</span>;
};

/* ══════════════════════════════════════════════ */
function TechnicianDashboard() {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [department, setDepartment] = useState("");
  const [remarks, setRemarks]       = useState({});
  const [loading, setLoading]       = useState(true);

  const technicianId = localStorage.getItem("userId");
  const name         = localStorage.getItem("name");

  useEffect(() => {
    const interval = setInterval(fetchComplaints, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "technician") { navigate("/login"); return; }

    fetchComplaints();

    fetch("http://localhost:5000/api/admin/users")
      .then(res => res.json())
      .then(data => {
        const tech = data.find(u => u._id === technicianId);
        if (tech) setDepartment(tech.department);
      });
  }, [navigate]);

  const fetchComplaints = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/technician/complaints/${technicianId}`);
      const data = await response.json();
      if (response.ok) setComplaints(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const updateStatus = async (id, status) => {
    const remark = remarks[id] || "";
    if (status === "Resolved" && remark.trim() === "") {
      alert("Please enter a remark before resolving this task");
      return;
    }
    try {
      await fetch(`http://localhost:5000/api/complaints/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, remark })
      });
      fetchComplaints();
    } catch (error) {
      console.error(error);
    }
  };

  const inQueue     = complaints.filter(c => c.status === "Pending").length;
  const inProgress  = complaints.filter(c => c.status === "In Progress").length;
  const completed   = complaints.filter(c => c.status === "Resolved").length;
  const currentTask = complaints.find(c => c.status === "In Progress");

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <>
      <style>{styles}</style>

      <div className="td-wrap">

        {/* HEADER */}
        <div className="td-header fade-in">
          <div className="td-header-left">
            <div className="td-greeting">{greeting}{name ? `, ${name}` : ""} 🔧</div>
            <div className="td-title">Technician <span>Dashboard</span></div>
            {department && (
              <div className="td-dept-pill">🏢 {department}</div>
            )}
          </div>
          <div className="td-header-actions">
            <button className="btn-ghost-td" onClick={fetchComplaints}>↻ Refresh</button>
          </div>
        </div>

        {loading ? (
          <div className="td-spinner-wrap"><div className="td-spinner" /></div>
        ) : (
          <>
            {/* STAT CARDS */}
            <div className="td-cards">
              <div className="td-card cc-amber">
                <div className="td-card-top">
                  <div className="td-card-icon">⏳</div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-3)", background: "var(--surface2)", padding: "3px 8px", borderRadius: 20 }}>Open</span>
                </div>
                <div className="td-card-value">{inQueue}</div>
                <div className="td-card-label">In Queue</div>
              </div>
              <div className="td-card cc-blue">
                <div className="td-card-top">
                  <div className="td-card-icon">⚙️</div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-3)", background: "var(--surface2)", padding: "3px 8px", borderRadius: 20 }}>Active</span>
                </div>
                <div className="td-card-value">{inProgress}</div>
                <div className="td-card-label">In Progress</div>
              </div>
              <div className="td-card cc-green">
                <div className="td-card-top">
                  <div className="td-card-icon">✅</div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-3)", background: "var(--surface2)", padding: "3px 8px", borderRadius: 20 }}>Done</span>
                </div>
                <div className="td-card-value">{completed}</div>
                <div className="td-card-label">Completed</div>
              </div>
            </div>

            {/* CURRENT TASK */}
            {currentTask ? (
              <div className="td-current fade-in">
                <div className="td-current-header">
                  <div className="td-current-label">Currently Working On</div>
                  <span style={{ fontSize: 11, color: "var(--text-3)", fontWeight: 500 }}>Token: {currentTask.token}</span>
                </div>
                <div className="td-current-body">
                  <div>
                    <div className="td-current-title">{currentTask.title}</div>
                    <div className="td-current-desc">{currentTask.description}</div>
                    <div className="td-current-meta">
                      <div className="td-current-meta-item">👤 <strong>{currentTask.userId?.name || "—"}</strong></div>
                      <div className="td-current-meta-item">Priority: {getBadge(currentTask.priority, "priority")}</div>
                      <div className="td-current-meta-item" style={{ fontSize: 11, color: "var(--text-3)" }}>
                        SLA: High=4h · Medium=12h · Low=24h
                      </div>
                    </div>
                  </div>
                  <BigTimer createdAt={currentTask.createdAt} priority={currentTask.priority} />
                </div>
              </div>
            ) : (
              <div className="td-no-task fade-in">
                <span style={{ fontSize: 20 }}>ℹ️</span>
                <span>No task currently in progress. Pick one from the queue below.</span>
              </div>
            )}

            {/* TASK TABLE */}
            <div className="td-panel fade-in">
              <div className="td-panel-header">
                <div className="td-panel-title">
                  <div className="td-panel-dot" />
                  All Assigned Tasks
                </div>
                {complaints.length > 0 && (
                  <span className="td-panel-count">{complaints.length} tasks</span>
                )}
              </div>

              {complaints.length === 0 ? (
                <div style={{ textAlign: "center", padding: "56px 24px", color: "var(--text-3)" }}>
                  <div style={{ fontSize: 40, marginBottom: 12, opacity: 0.5 }}>📭</div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>No tasks assigned yet.</div>
                </div>
              ) : (
                <table className="td-table">
                  <thead>
                    <tr>
                      <th>Task ID</th>
                      <th>Student</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th>Time Left</th>
                      <th>Remark</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {complaints.map((c) => (
                      <tr key={c._id} className={c.priority === "High" ? "row-high" : ""}>
                        <td style={{ fontWeight: 600, color: "var(--text-1)", fontSize: 12 }}>{c.token}</td>
                        <td style={{ fontWeight: 500 }}>{c.userId?.name}</td>
                        <td style={{ fontWeight: 600, color: "var(--text-1)" }}>{c.title}</td>
                        <td style={{ maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.description}</td>
                        <td>{getBadge(c.priority, "priority")}</td>
                        <td>
                          <span className={`badge ${c.status === "Pending" ? "badge-pending" : c.status === "In Progress" ? "badge-progress" : "badge-resolved"}`}>
                            {c.status === "Pending" ? "In Queue" : c.status}
                          </span>
                        </td>

                        {/* TIME LEFT */}
                        <td>
                          <LiveTimer
                            createdAt={c.createdAt}
                            priority={c.priority}
                            resolved={c.status === "Resolved"}
                          />
                          <div className="sla-label">SLA: {SLA_HOURS[c.priority] || "—"}h</div>
                        </td>

                        {/* REMARK */}
                        <td>
                          {c.status !== "Resolved" ? (
                            <input
                              type="text"
                              className="td-remark-input"
                              placeholder="Enter remark"
                              value={remarks[c._id] || ""}
                              onChange={(e) => setRemarks({ ...remarks, [c._id]: e.target.value })}
                            />
                          ) : (
                            <span style={{ color: "var(--green)", fontWeight: 600, fontSize: 12 }}>
                              {c.remark || "—"}
                            </span>
                          )}
                        </td>

                        {/* ACTION */}
                        <td>
                          {c.status === "Pending" && (
                            <button className="btn-start" onClick={() => updateStatus(c._id, "In Progress")}>
                              ▶ Start
                            </button>
                          )}
                          {c.status === "In Progress" && (
                            <button className="btn-resolve" onClick={() => updateStatus(c._id, "Resolved")}>
                              ✓ Resolve
                            </button>
                          )}
                          {c.status === "Resolved" && (
                            <span className="td-completed-text">✅ Done</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default TechnicianDashboard;