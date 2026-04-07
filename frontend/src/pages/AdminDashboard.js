import { useEffect, useState, useCallback } from "react";
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
    --red:       #dc2626;
    --red-lt:    #fee2e2;
    --red-md:    #fca5a5;
    --blue:      #2563eb;
    --blue-lt:   #dbeafe;
    --blue-md:   #93c5fd;
    --cyan:      #0891b2;
    --cyan-lt:   #cffafe;
    --cyan-md:   #67e8f9;
    --shadow-sm: 0 1px 3px rgba(20,21,42,0.06), 0 1px 2px rgba(20,21,42,0.04);
    --shadow-md: 0 4px 16px rgba(20,21,42,0.08), 0 2px 6px rgba(20,21,42,0.04);
    --shadow-lg: 0 12px 40px rgba(20,21,42,0.12), 0 4px 12px rgba(20,21,42,0.06);
    --radius:    14px;
    --radius-sm: 8px;
  }

  body {
    background: var(--bg);
    font-family: 'Outfit', sans-serif;
  }

  /* ── LAYOUT ── */
  .aw {
    min-height: 100vh;
    background: var(--bg);
    padding: 28px 36px;
  }

  /* ── HEADER ── */
  .aw-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 36px;
  }

  .aw-header-left {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .aw-logo {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .aw-logo-icon {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, var(--accent) 0%, #7c3aed 100%);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    box-shadow: 0 4px 12px rgba(79,70,229,0.3);
    flex-shrink: 0;
  }

  .aw-title {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 22px;
    font-weight: 800;
    color: var(--text-1);
    letter-spacing: -0.4px;
    line-height: 1;
  }

  .aw-title-sub {
    font-size: 12px;
    font-weight: 500;
    color: var(--text-3);
    letter-spacing: 0.2px;
    margin-top: 3px;
  }

  .aw-divider {
    width: 1px;
    height: 32px;
    background: var(--border);
  }

  .aw-breadcrumb {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: var(--text-3);
  }

  .aw-breadcrumb-sep { opacity: 0.5; }

  .aw-breadcrumb-current {
    color: var(--text-2);
    font-weight: 600;
  }

  .aw-header-right {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  /* ── BUTTONS ── */
  .btn-back {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: var(--surface);
    border: 1px solid var(--border);
    color: var(--text-2);
    padding: 8px 16px;
    border-radius: var(--radius-sm);
    font-family: 'Outfit', sans-serif;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.18s ease;
    box-shadow: var(--shadow-sm);
  }
  .btn-back:hover {
    background: var(--accent-lt);
    border-color: var(--accent-md);
    color: var(--accent);
  }

  .btn-refresh {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: var(--accent);
    border: none;
    color: #fff;
    padding: 8px 18px;
    border-radius: var(--radius-sm);
    font-family: 'Outfit', sans-serif;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.18s ease;
    box-shadow: 0 2px 8px rgba(79,70,229,0.3);
  }
  .btn-refresh:hover {
    background: #4338ca;
    box-shadow: 0 4px 14px rgba(79,70,229,0.4);
    transform: translateY(-1px);
  }

  /* ── STAT CARDS ── */
  .cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
    gap: 18px;
    margin-bottom: 36px;
  }

  .sub-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
    gap: 18px;
  }

  .stat-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 22px 20px 18px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.22s ease;
    box-shadow: var(--shadow-sm);
  }

  .stat-card::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 3px;
    background: var(--card-color);
    opacity: 0;
    transition: opacity 0.22s;
  }

  .stat-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    border-color: transparent;
  }

  .stat-card:hover::after { opacity: 1; }

  .stat-card-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;
  }

  .stat-card-icon-wrap {
    width: 42px;
    height: 42px;
    border-radius: 10px;
    background: var(--card-color-lt);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
  }

  .stat-card-arrow {
    font-size: 16px;
    color: var(--text-3);
    opacity: 0;
    transform: translateX(-4px);
    transition: all 0.2s;
  }

  .stat-card:hover .stat-card-arrow {
    opacity: 1;
    transform: translateX(0);
  }

  .stat-card-value {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 36px;
    font-weight: 800;
    color: var(--text-1);
    line-height: 1;
    margin-bottom: 6px;
  }

  .stat-card-label {
    font-size: 12px;
    font-weight: 600;
    color: var(--text-3);
    letter-spacing: 0.6px;
    text-transform: uppercase;
  }

  /* card color themes */
  .cc-indigo { --card-color: #4f46e5; --card-color-lt: #eef2ff; }
  .cc-amber  { --card-color: #d97706; --card-color-lt: #fef3c7; }
  .cc-green  { --card-color: #059669; --card-color-lt: #d1fae5; }
  .cc-red    { --card-color: #dc2626; --card-color-lt: #fee2e2; }
  .cc-violet { --card-color: #7c3aed; --card-color-lt: #ede9fe; }
  .cc-cyan   { --card-color: #0891b2; --card-color-lt: #cffafe; }
  .cc-blue   { --card-color: #2563eb; --card-color-lt: #dbeafe; }

  /* ── SECTION PANEL ── */
  .panel {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow-sm);
    overflow: hidden;
  }

  .panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px;
    border-bottom: 1px solid var(--border2);
    background: var(--surface2);
  }

  .panel-title {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: var(--text-1);
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .panel-title-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--accent);
    flex-shrink: 0;
  }

  .panel-count {
    font-size: 12px;
    font-weight: 600;
    color: var(--text-3);
    background: var(--border2);
    padding: 3px 10px;
    border-radius: 20px;
  }

  /* ── TABLE ── */
  .aw-table {
    width: 100%;
    border-collapse: collapse;
  }

  .aw-table thead tr {
    background: var(--surface2);
  }

  .aw-table th {
    padding: 11px 20px;
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--text-3);
    text-align: left;
    border-bottom: 1px solid var(--border2);
    white-space: nowrap;
  }

  .aw-table td {
    padding: 14px 20px;
    font-size: 13.5px;
    color: var(--text-2);
    border-bottom: 1px solid var(--border2);
    vertical-align: middle;
  }

  .aw-table tbody tr:last-child td { border-bottom: none; }

  .aw-table tbody tr {
    transition: background 0.15s;
  }

  .aw-table tbody tr:hover td {
    background: var(--accent-lt);
  }

  .td-name {
    font-weight: 600;
    color: var(--text-1);
  }

  .td-email {
    color: var(--text-3);
    font-size: 12.5px;
  }

  .td-link {
    color: var(--accent);
    font-weight: 600;
    cursor: pointer;
    transition: color 0.15s;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .td-link:hover { color: #3730a3; }

  .td-muted { color: var(--text-3); font-size: 12px; }

  /* ── BADGES ── */
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.2px;
    white-space: nowrap;
  }

  .badge::before {
    content: '';
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: currentColor;
    flex-shrink: 0;
  }

  .badge-pending  { background: var(--amber-lt);  color: var(--amber); }
  .badge-progress { background: var(--blue-lt);   color: var(--blue); }
  .badge-resolved { background: var(--green-lt);  color: var(--green); }
  .badge-high     { background: var(--red-lt);    color: var(--red); }
  .badge-medium   { background: var(--amber-lt);  color: var(--amber); }
  .badge-low      { background: var(--green-lt);  color: var(--green); }
  .badge-student  { background: var(--blue-lt);   color: var(--blue); }
  .badge-staff    { background: var(--amber-lt);  color: var(--amber); }
  .badge-tech     { background: var(--green-lt);  color: var(--green); }
  .badge-admin    { background: var(--accent-lt); color: var(--accent); }

  /* ── SELECT ── */
  .aw-select {
    background: var(--surface);
    border: 1px solid var(--border);
    color: var(--text-2);
    padding: 7px 12px;
    border-radius: var(--radius-sm);
    font-size: 12.5px;
    font-family: 'Outfit', sans-serif;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.18s;
    max-width: 185px;
    width: 100%;
    box-shadow: var(--shadow-sm);
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239698b4' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;
    padding-right: 30px;
  }
  .aw-select:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(79,70,229,0.1);
  }
  .aw-select option { background: #fff; color: var(--text-1); }

  /* ── ACTION BUTTONS ── */
  .btn-approve {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: var(--green-lt);
    border: 1px solid var(--green-md);
    color: var(--green);
    padding: 6px 14px;
    border-radius: var(--radius-sm);
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    font-family: 'Outfit', sans-serif;
    margin-right: 6px;
    transition: all 0.18s;
  }
  .btn-approve:hover {
    background: #a7f3d0;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(5,150,105,0.2);
  }

  .btn-reject {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: var(--red-lt);
    border: 1px solid var(--red-md);
    color: var(--red);
    padding: 6px 14px;
    border-radius: var(--radius-sm);
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    font-family: 'Outfit', sans-serif;
    transition: all 0.18s;
  }
  .btn-reject:hover {
    background: #fecaca;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(220,38,38,0.2);
  }

  /* ── TASKS COUNT ── */
  .tasks-pill {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: var(--accent-lt);
    color: var(--accent);
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 700;
    font-size: 13px;
    padding: 3px 11px;
    border-radius: 20px;
  }

  /* ── DETAIL VIEW ── */
  .detail-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
  }

  .detail-row {
    display: contents;
  }

  .detail-row > .detail-key {
    padding: 15px 24px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    color: var(--text-3);
    background: var(--surface2);
    border-bottom: 1px solid var(--border2);
    display: flex;
    align-items: center;
  }

  .detail-row > .detail-val {
    padding: 15px 24px;
    font-size: 14px;
    color: var(--text-2);
    border-bottom: 1px solid var(--border2);
    display: flex;
    align-items: center;
  }

  .detail-row:last-child > .detail-key,
  .detail-row:last-child > .detail-val {
    border-bottom: none;
  }

  .detail-ticket {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 800;
    font-size: 15px;
    color: var(--accent);
    letter-spacing: 0.5px;
  }

  /* ── SPINNER ── */
  .spinner-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 320px;
  }
  .spinner {
    width: 38px;
    height: 38px;
    border: 3px solid var(--accent-md);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── EMPTY ── */
  .empty-state {
    text-align: center;
    color: var(--text-3);
    padding: 48px 24px;
    font-size: 14px;
    font-weight: 500;
  }

  .empty-state-icon {
    font-size: 32px;
    margin-bottom: 10px;
    opacity: 0.5;
  }

  /* ── ANIMATIONS ── */
  .fade-in {
    animation: fadeIn 0.25s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

/* ── helpers ── */
const getBadge = (status) => {
  if (!status) return null;
  const map = {
    Pending:       "badge-pending",
    "In Progress": "badge-progress",
    Resolved:      "badge-resolved",
    High:          "badge-high",
    Medium:        "badge-medium",
    Low:           "badge-low",
    student:       "badge-student",
    staff:         "badge-staff",
    technician:    "badge-tech",
    admin:         "badge-admin",
  };
  return <span className={`badge ${map[status] || "badge-pending"}`}>{status}</span>;
};

const DEPT_OPTIONS = [
  "NMC Team","Electrical Team","Cleaning Team",
  "Transport Team","Mess Team","Hostel Team",
];

const BACK_MAP = {
  usersplit:         "dashboard",
  students:          "usersplit",
  staff:             "usersplit",
  technicians:       "usersplit",
  pending:           "dashboard",
  complaints:        "dashboard",
  resolved:          "dashboard",
  pendingComplaints: "dashboard",
  inprogress:        "dashboard",
};

const VIEW_LABELS = {
  usersplit:         "Users",
  students:          "Students",
  staff:             "Staff",
  technicians:       "Technicians",
  pending:           "Pending Approvals",
  complaints:        "All Complaints",
  resolved:          "Resolved",
  pendingComplaints: "Pending Complaints",
  inprogress:        "In Progress",
  details:           "Complaint Details",
};

/* ── Empty row ── */
const EmptyRow = ({ cols, msg = "No records found." }) => (
  <tr>
    <td colSpan={cols}>
      <div className="empty-state">
        <div className="empty-state-icon">📭</div>
        {msg}
      </div>
    </td>
  </tr>
);

/* ══════════════════════════════════════════════ */
function AdminDashboard() {
  const navigate = useNavigate();

  const [approvedUsers,      setApprovedUsers]     = useState([]);
  const [pendingUsers,       setPendingUsers]       = useState([]);
  const [allComplaints,      setAllComplaints]      = useState([]);
  const [resolvedComplaints, setResolvedComplaints] = useState([]);
  const [selectedComplaint,  setSelectedComplaint]  = useState(null);
  const [view,     setView]     = useState("dashboard");
  const [prevView, setPrevView] = useState("dashboard");
  const [loading,  setLoading]  = useState(true);
  const [deptSelect, setDeptSelect] = useState({});

  const role = localStorage.getItem("role");

  useEffect(() => {
    if (role !== "admin") navigate("/login");
  }, [role, navigate]);

  /* ── fetchers ── */
  const fetchApprovedUsers = useCallback(async () => {
    try { const r = await fetch("http://localhost:5000/api/admin/users"); setApprovedUsers(await r.json().then(d => Array.isArray(d) ? d : [])); }
    catch { setApprovedUsers([]); }
  }, []);

  const fetchPendingUsers = useCallback(async () => {
    try { const r = await fetch("http://localhost:5000/api/admin/pending-users"); setPendingUsers(await r.json().then(d => Array.isArray(d) ? d : [])); }
    catch { setPendingUsers([]); }
  }, []);

  const fetchAllComplaints = useCallback(async () => {
    try { const r = await fetch("http://localhost:5000/api/admin/complaints"); setAllComplaints(await r.json().then(d => Array.isArray(d) ? d : [])); }
    catch { setAllComplaints([]); }
  }, []);

  const fetchResolvedComplaints = useCallback(async () => {
    try { const r = await fetch("http://localhost:5000/api/admin/resolved-complaints"); setResolvedComplaints(await r.json().then(d => Array.isArray(d) ? d : [])); }
    catch { setResolvedComplaints([]); }
  }, []);

  const loadAll = useCallback(async () => {
    setLoading(true);
    await Promise.all([fetchApprovedUsers(), fetchPendingUsers(), fetchAllComplaints(), fetchResolvedComplaints()]);
    setLoading(false);
  }, [fetchApprovedUsers, fetchPendingUsers, fetchAllComplaints, fetchResolvedComplaints]);

  useEffect(() => { loadAll(); }, [loadAll]);

  /* ── actions ── */
  const approveUser = async (id) => {
    const department = deptSelect[id] || "";
    await fetch(`http://localhost:5000/api/admin/approve-user/${id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ department }),
    });
    loadAll();
  };

  const rejectUser = async (id) => {
    await fetch(`http://localhost:5000/api/admin/reject-user/${id}`, { method: "DELETE" });
    loadAll();
  };

  const updateDepartment = async (id, department) => {
    if (!department) return;
    await fetch(`http://localhost:5000/api/admin/update-department/${id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ department }),
    });
    loadAll();
  };

  const changeTechnician = async (complaintId, technicianId) => {
    if (!technicianId) return;
    await fetch(`http://localhost:5000/api/admin/change-technician/${complaintId}`, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ technicianId }),
    });
    loadAll();
  };

  const assignComplaintDetails = async (complaintId, field, value) => {
    if (!value) return;
    await fetch(`http://localhost:5000/api/admin/assign-complaint/${complaintId}`, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: value }),
    });
    setSelectedComplaint(prev => ({ ...prev, [field]: value }));
    loadAll();
  };

  const getCompletedTasks = (tid) =>
    allComplaints.filter(c => c.assignedTo?._id === tid && c.status === "Resolved").length;

  /* ── nav ── */
  const goTo = (v) => setView(v);

  const goDetails = (c, from) => {
    setPrevView(from);
    setSelectedComplaint(c);
    setView("details");
  };

  const handleBack = () => {
    if (view === "details") { setSelectedComplaint(null); setView(prevView); }
    else setView(BACK_MAP[view] || "dashboard");
  };

  /* ── counts ── */
  const totalUsersCount      = approvedUsers.length;
  const studentsCount        = approvedUsers.filter(u => u.role === "student").length;
  const staffCount           = approvedUsers.filter(u => u.role === "staff").length;
  const techniciansCount     = approvedUsers.filter(u => u.role === "technician").length;
  const pendingUsersCount    = pendingUsers.length;
  const totalComplaintsCount = allComplaints.length;
  const resolvedCount        = resolvedComplaints.length;
  const pendingCount         = allComplaints.filter(c => c.status === "Pending").length;
  const inProgressCount      = allComplaints.filter(c => c.status === "In Progress").length;

  /* ── shared complaint rows ── */
  const [expandedAssign, setExpandedAssign] = useState({});
  const [inlineSelects, setInlineSelects]   = useState({});

  const doInlineAssign = async (complaintId) => {
    const sel = inlineSelects[complaintId] || {};
    if (!sel.department && !sel.priority) return;
    const body = {};
    if (sel.department) body.department = sel.department;
    if (sel.priority)   body.priority   = sel.priority;
    try {
      await fetch(`http://localhost:5000/api/admin/assign-complaint/${complaintId}`, {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setExpandedAssign(p => ({ ...p, [complaintId]: false }));
      setInlineSelects(p => ({ ...p, [complaintId]: {} }));
      loadAll();
    } catch(e) { console.error(e); }
  };

  const ComplaintRows = ({ complaints, fromView }) => {
    if (!complaints.length) return <EmptyRow cols={5} msg="No complaints found." />;
    return complaints.flatMap(c => {
      const needsAssignment = !c.department || !c.priority;
      const isOpen = expandedAssign[c._id];
      const sel    = inlineSelects[c._id] || {};
      const canSave = sel.department || sel.priority;

      const mainRow = (
        <tr key={c._id} style={needsAssignment ? {background:"#fffbeb"} : {}}>
          <td>
            <span className="td-link" onClick={() => goDetails(c, fromView)}>
              {c.title} <span style={{fontSize:11}}>↗</span>
            </span>
            {needsAssignment && (
              <span
                onClick={() => setExpandedAssign(p => ({...p, [c._id]: !p[c._id]}))}
                style={{
                  display:"inline-flex", alignItems:"center", gap:3,
                  background: isOpen ? "#fde68a" : "#fef3c7",
                  color:"#d97706", border:"1px solid #fcd34d",
                  borderRadius:20, fontSize:10, fontWeight:700,
                  padding:"2px 8px", marginLeft:8, letterSpacing:0.3,
                  cursor:"pointer", userSelect:"none",
                  transition:"background 0.15s"
                }}
                title="Click to assign department & priority"
              >
                ⚠ Assign {isOpen ? "▲" : "▼"}
              </span>
            )}
          </td>
          <td>
            {c.priority
              ? getBadge(c.priority)
              : <span style={{color:"#d97706", fontSize:12, fontStyle:"italic"}}>Not set</span>}
          </td>
          <td>{getBadge(c.status)}</td>
          <td>
            {c.assignedTo
              ? <span className="td-name">{c.assignedTo.name}</span>
              : <span className="td-muted">Not Assigned</span>}
          </td>
          <td className="td-muted">
            {c.createdAt ? new Date(c.createdAt).toLocaleString() : "—"}
          </td>
        </tr>
      );

      const assignRow = needsAssignment && isOpen ? (
        <tr key={c._id + "-assign"} style={{background:"#fffbeb", borderTop:"1px dashed #fcd34d"}}>
          <td colSpan={5}>
            <div style={{
              display:"flex", alignItems:"center", gap:12, flexWrap:"wrap",
              padding:"10px 14px 14px 14px"
            }}>
              <span style={{fontSize:11,fontWeight:700,color:"#d97706",letterSpacing:0.5,whiteSpace:"nowrap"}}>
                ASSIGN:
              </span>
              {!c.department && (
                <div style={{display:"flex",flexDirection:"column",gap:3}}>
                  <span style={{fontSize:10,fontWeight:700,color:"var(--text-3)",letterSpacing:0.5}}>DEPARTMENT</span>
                  <select className="aw-select" style={{minWidth:170}} defaultValue=""
                    onChange={e => setInlineSelects(p => ({...p, [c._id]: {...(p[c._id]||{}), department: e.target.value}}))}>
                    <option value="">Select dept…</option>
                    {DEPT_OPTIONS.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
              )}
              {!c.priority && (
                <div style={{display:"flex",flexDirection:"column",gap:3}}>
                  <span style={{fontSize:10,fontWeight:700,color:"var(--text-3)",letterSpacing:0.5}}>PRIORITY</span>
                  <select className="aw-select" style={{minWidth:140}} defaultValue=""
                    onChange={e => setInlineSelects(p => ({...p, [c._id]: {...(p[c._id]||{}), priority: e.target.value}}))}>
                    <option value="">Select priority…</option>
                    <option value="High">🔴 High</option>
                    <option value="Medium">🟡 Medium</option>
                    <option value="Low">🟢 Low</option>
                  </select>
                </div>
              )}
              <div style={{display:"flex",gap:8,marginTop:18}}>
                <button
                  onClick={() => doInlineAssign(c._id)}
                  disabled={!canSave}
                  style={{
                    background: canSave ? "var(--accent)" : "var(--border)",
                    color: canSave ? "#fff" : "var(--text-3)",
                    border:"none", borderRadius:"var(--radius-sm)",
                    padding:"7px 18px", fontSize:12, fontWeight:700,
                    cursor: canSave ? "pointer" : "not-allowed",
                    fontFamily:"'Outfit',sans-serif",
                    transition:"all 0.15s"
                  }}
                >✓ Save</button>
                <button
                  onClick={() => setExpandedAssign(p => ({...p, [c._id]: false}))}
                  style={{
                    background:"var(--surface2)", color:"var(--text-2)",
                    border:"1px solid var(--border)", borderRadius:"var(--radius-sm)",
                    padding:"7px 14px", fontSize:12, fontWeight:600,
                    cursor:"pointer", fontFamily:"'Outfit',sans-serif"
                  }}
                >✕ Cancel</button>
              </div>
            </div>
          </td>
        </tr>
      ) : null;

      return [mainRow, assignRow].filter(Boolean);
    });
  };

  /* ── panel helper ── */
  const Panel = ({ title, count, children }) => (
    <div className="panel fade-in">
      <div className="panel-header">
        <div className="panel-title">
          <div className="panel-title-dot" />
          {title}
        </div>
        {count !== undefined && <span className="panel-count">{count} records</span>}
      </div>
      {children}
    </div>
  );

  /* ── breadcrumb ── */
  const Breadcrumb = () => {
    if (view === "dashboard") return null;
    const parent = BACK_MAP[view];
    return (
      <div className="aw-breadcrumb">
        <span>Dashboard</span>
        {parent && parent !== "dashboard" && <>
          <span className="aw-breadcrumb-sep">›</span>
          <span>{VIEW_LABELS[parent]}</span>
        </>}
        <span className="aw-breadcrumb-sep">›</span>
        <span className="aw-breadcrumb-current">{VIEW_LABELS[view]}</span>
      </div>
    );
  };

  /* ════════════════════ RENDER ════════════════════ */
  return (
    <>
      <style>{styles}</style>
      <div className="aw">

        {/* HEADER */}
        <div className="aw-header">
          <div className="aw-header-left">
            {view !== "dashboard" && (
              <button className="btn-back" onClick={handleBack}>← Back</button>
            )}
            <div className="aw-logo">
              <div className="aw-logo-icon">🛡️</div>
              <div>
                <div className="aw-title">Admin Panel</div>
                <div className="aw-title-sub">Campus Helpdesk</div>
              </div>
            </div>
            {view !== "dashboard" && (
              <>
                <div className="aw-divider" />
                <Breadcrumb />
              </>
            )}
          </div>
          <div className="aw-header-right">
            <button className="btn-refresh" onClick={loadAll}>↻ Refresh</button>
          </div>
        </div>

        {loading ? (
          <div className="spinner-wrap"><div className="spinner" /></div>
        ) : (
          <>

            {/* ── DASHBOARD ── */}
            {view === "dashboard" && (
              <div className="cards-grid fade-in">
                {[
                  { label:"Total Users",         val: totalUsersCount,   icon:"👥", cc:"cc-indigo", v:"usersplit" },
                  { label:"Pending Approvals",   val: pendingUsersCount, icon:"⏳", cc:"cc-amber",  v:"pending" },
                  { label:"Total Complaints",    val: totalComplaintsCount,       icon:"📋", cc:"cc-blue",   v:"complaints" },
                  { label:"Pending Complaints",  val: pendingCount,     icon:"🔴", cc:"cc-red",    v:"pendingComplaints" },
                  { label:"In Progress",         val: inProgressCount,  icon:"⚙️", cc:"cc-violet", v:"inprogress" },
                  { label:"Resolved",            val: resolvedCount,    icon:"✅", cc:"cc-green",  v:"resolved" },
                ].map(({ label, val, icon, cc, v }) => (
                  <div key={v} className={`stat-card ${cc}`} onClick={() => goTo(v)}>
                    <div className="stat-card-top">
                      <div className="stat-card-icon-wrap">{icon}</div>
                      <div className="stat-card-arrow">→</div>
                    </div>
                    <div className="stat-card-value">{val}</div>
                    <div className="stat-card-label">{label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* ── USER SPLIT ── */}
            {view === "usersplit" && (
              <div className="sub-cards fade-in">
                {[
                  { label:"Students",    val: studentsCount,    icon:"🎓", cc:"cc-blue",   v:"students" },
                  { label:"Staff",       val: staffCount,      icon:"🏢", cc:"cc-amber",  v:"staff" },
                  { label:"Technicians", val: techniciansCount, icon:"🔧", cc:"cc-green",  v:"technicians" },
                ].map(({ label, val, icon, cc, v }) => (
                  <div key={v} className={`stat-card ${cc}`} onClick={() => goTo(v)}>
                    <div className="stat-card-top">
                      <div className="stat-card-icon-wrap">{icon}</div>
                      <div className="stat-card-arrow">→</div>
                    </div>
                    <div className="stat-card-value">{val}</div>
                    <div className="stat-card-label">{label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* ── STUDENTS ── */}
            {view === "students" && (
              <Panel title="Students" count={studentsCount}>
                <table className="aw-table">
                  <thead><tr><th>Name</th><th>Email</th></tr></thead>
                  <tbody>
                    {approvedUsers.filter(u => u.role === "student").length === 0
                      ? <EmptyRow cols={2} msg="No students found." />
                      : approvedUsers.filter(u => u.role === "student").map(u => (
                        <tr key={u._id}>
                          <td className="td-name">{u.name}</td>
                          <td className="td-email">{u.email}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </Panel>
            )}

            {/* ── STAFF ── */}
            {view === "staff" && (
              <Panel title="Staff" count={staffCount}>
                <table className="aw-table">
                  <thead><tr><th>Name</th><th>Email</th></tr></thead>
                  <tbody>
                    {approvedUsers.filter(u => u.role === "staff").length === 0
                      ? <EmptyRow cols={2} msg="No staff found." />
                      : approvedUsers.filter(u => u.role === "staff").map(u => (
                        <tr key={u._id}>
                          <td className="td-name">{u.name}</td>
                          <td className="td-email">{u.email}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </Panel>
            )}

            {/* ── TECHNICIANS ── */}
            {view === "technicians" && (
              <Panel title="Technicians" count={techniciansCount}>
                <table className="aw-table">
                  <thead>
                    <tr>
                      <th>Name</th><th>Email</th><th>Department</th>
                      <th>Completed</th><th>Change Dept</th>
                    </tr>
                  </thead>
                  <tbody>
                    {approvedUsers.filter(u => u.role === "technician").length === 0
                      ? <EmptyRow cols={5} msg="No technicians found." />
                      : approvedUsers.filter(u => u.role === "technician").map(u => (
                        <tr key={u._id}>
                          <td className="td-name">{u.name}</td>
                          <td className="td-email">{u.email}</td>
                          <td>
                            {u.department
                              ? getBadge(u.department)
                              : <span className="td-muted">Not Assigned</span>}
                          </td>
                          <td>
                            <span className="tasks-pill">✓ {getCompletedTasks(u._id)}</span>
                          </td>
                          <td>
                            <select className="aw-select" defaultValue=""
                              onChange={e => updateDepartment(u._id, e.target.value)}>
                              <option value="">Change dept…</option>
                              {DEPT_OPTIONS.map(d => <option key={d}>{d}</option>)}
                            </select>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </Panel>
            )}

            {/* ── PENDING APPROVALS ── */}
            {view === "pending" && (
              <Panel title="Pending Approvals" count={pendingUsersCount}>
                <table className="aw-table">
                  <thead>
                    <tr><th>Name</th><th>Email</th><th>Role</th><th>Department</th><th>Action</th></tr>
                  </thead>
                  <tbody>
                    {pendingUsers.length === 0
                      ? <EmptyRow cols={5} msg="No pending approvals." />
                      : pendingUsers.map(u => (
                        <tr key={u._id}>
                          <td className="td-name">{u.name}</td>
                          <td className="td-email">{u.email}</td>
                          <td>{getBadge(u.role)}</td>
                          <td>
                            {u.role === "technician" ? (
                              <select className="aw-select" defaultValue=""
                                onChange={e => setDeptSelect(p => ({ ...p, [u._id]: e.target.value }))}>
                                <option value="">Select dept…</option>
                                {DEPT_OPTIONS.map(d => <option key={d}>{d}</option>)}
                              </select>
                            ) : <span className="td-muted">—</span>}
                          </td>
                          <td>
                            <button className="btn-approve" onClick={() => approveUser(u._id)}>✓ Approve</button>
                            <button className="btn-reject"  onClick={() => rejectUser(u._id)}>✕ Reject</button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </Panel>
            )}

            {/* ── ALL COMPLAINTS ── */}
            {view === "complaints" && (
              <Panel title="All Complaints" count={totalComplaintsCount}>
                <table className="aw-table">
                  <thead>
                    <tr><th>Title</th><th>Priority</th><th>Status</th><th>Assigned To</th><th>Date</th></tr>
                  </thead>
                  <tbody><ComplaintRows complaints={allComplaints} fromView="complaints" /></tbody>
                </table>
              </Panel>
            )}

            {/* ── RESOLVED ── */}
            {view === "resolved" && (
              <Panel title="Resolved Complaints" count={resolvedCount}>
                <table className="aw-table">
                  <thead>
                    <tr><th>Title</th><th>Priority</th><th>Status</th><th>Assigned To</th><th>Date</th></tr>
                  </thead>
                  <tbody><ComplaintRows complaints={resolvedComplaints} fromView="resolved" /></tbody>
                </table>
              </Panel>
            )}

            {/* ── PENDING COMPLAINTS ── */}
            {view === "pendingComplaints" && (
              <Panel title="Pending Complaints" count={pendingCount}>
                <table className="aw-table">
                  <thead>
                    <tr><th>Title</th><th>Priority</th><th>Status</th><th>Assigned To</th><th>Date</th></tr>
                  </thead>
                  <tbody>
                    <ComplaintRows
                      complaints={allComplaints.filter(c => c.status === "Pending")}
                      fromView="pendingComplaints"
                    />
                  </tbody>
                </table>
              </Panel>
            )}

            {/* ── IN PROGRESS ── */}
            {view === "inprogress" && (
              <Panel title="In Progress Complaints" count={inProgressCount}>
                <table className="aw-table">
                  <thead>
                    <tr><th>Title</th><th>Priority</th><th>Status</th><th>Assigned To</th><th>Date</th></tr>
                  </thead>
                  <tbody>
                    <ComplaintRows
                      complaints={allComplaints.filter(c => c.status === "In Progress")}
                      fromView="inprogress"
                    />
                  </tbody>
                </table>
              </Panel>
            )}

            {/* ── COMPLAINT DETAILS ── */}
            {view === "details" && selectedComplaint && (
              <div className="panel fade-in">
                <div className="panel-header">
                  <div className="panel-title">
                    <div className="panel-title-dot" />
                    Complaint Details
                  </div>
                  <div style={{display:"flex", alignItems:"center", gap:12}}>
                    {(!selectedComplaint.department || !selectedComplaint.priority) && (
                      <span style={{
                        display:"inline-flex", alignItems:"center", gap:5,
                        background:"#fef3c7", color:"#d97706", border:"1px solid #fcd34d",
                        borderRadius:20, fontSize:11, fontWeight:700, padding:"4px 12px"
                      }}>⚠ Needs Admin Assignment</span>
                    )}
                    <span className="detail-ticket"># {selectedComplaint.token || "—"}</span>
                  </div>
                </div>
                <div className="detail-grid">
                  <div className="detail-row">
                    <div className="detail-key">Submitted By</div>
                    <div className="detail-val">{selectedComplaint.userId?.name || "—"}</div>
                  </div>
                  <div className="detail-row">
                    <div className="detail-key">Email</div>
                    <div className="detail-val" style={{color:"var(--accent)"}}>{selectedComplaint.userId?.email || "—"}</div>
                  </div>
                  <div className="detail-row">
                    <div className="detail-key">Role</div>
                    <div className="detail-val">{getBadge(selectedComplaint.userId?.role)}</div>
                  </div>
                  <div className="detail-row">
                    <div className="detail-key">Title</div>
                    <div className="detail-val"><strong>{selectedComplaint.title}</strong></div>
                  </div>

                  {/* DEPARTMENT — inline assign if missing */}
                  <div className="detail-row">
                    <div className="detail-key">
                      Department
                      {!selectedComplaint.department && (
                        <span style={{color:"var(--amber)",fontSize:9,marginLeft:4,fontWeight:800}}>UNSET</span>
                      )}
                    </div>
                    <div className="detail-val">
                      {selectedComplaint.department ? (
                        <span style={{fontWeight:600,color:"var(--text-1)"}}>{selectedComplaint.department}</span>
                      ) : (
                        <div style={{display:"flex", alignItems:"center", gap:10, flexWrap:"wrap"}}>
                          <select className="aw-select" style={{maxWidth:200}} defaultValue=""
                            onChange={e => assignComplaintDetails(selectedComplaint._id, "department", e.target.value)}>
                            <option value="">Assign department…</option>
                            {DEPT_OPTIONS.map(d => <option key={d}>{d}</option>)}
                          </select>
                          <span style={{fontSize:11,color:"var(--amber)",fontWeight:600}}>⚠ Not assigned yet</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* PRIORITY — inline assign if missing */}
                  <div className="detail-row">
                    <div className="detail-key">
                      Priority
                      {!selectedComplaint.priority && (
                        <span style={{color:"var(--amber)",fontSize:9,marginLeft:4,fontWeight:800}}>UNSET</span>
                      )}
                    </div>
                    <div className="detail-val">
                      {selectedComplaint.priority ? (
                        getBadge(selectedComplaint.priority)
                      ) : (
                        <div style={{display:"flex", alignItems:"center", gap:10}}>
                          <select className="aw-select" style={{maxWidth:200}} defaultValue=""
                            onChange={e => assignComplaintDetails(selectedComplaint._id, "priority", e.target.value)}>
                            <option value="">Assign priority…</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                          </select>
                          <span style={{fontSize:11,color:"var(--amber)",fontWeight:600}}>⚠ Not assigned yet</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="detail-row">
                    <div className="detail-key">Status</div>
                    <div className="detail-val">{getBadge(selectedComplaint.status)}</div>
                  </div>
                  <div className="detail-row">
                    <div className="detail-key">Assigned Technician</div>
                    <div className="detail-val">{selectedComplaint.assignedTo?.name || <span className="td-muted">Not Assigned</span>}</div>
                  </div>
                  <div className="detail-row">
                    <div className="detail-key">Raised At</div>
                    <div className="detail-val td-muted">
                      {selectedComplaint.createdAt ? new Date(selectedComplaint.createdAt).toLocaleString() : "—"}
                    </div>
                  </div>
                  {selectedComplaint.status === "Resolved" && (
                    <div className="detail-row">
                      <div className="detail-key">Resolved At</div>
                      <div className="detail-val" style={{color:"var(--green)", fontWeight:600}}>
                        {selectedComplaint.resolvedAt ? new Date(selectedComplaint.resolvedAt).toLocaleString() : "—"}
                      </div>
                    </div>
                  )}
                  <div className="detail-row">
                    <div className="detail-key">Description</div>
                    <div className="detail-val" style={{lineHeight:"1.7", alignItems:"flex-start", paddingTop:18}}>
                      {selectedComplaint.description || "—"}
                    </div>
                  </div>
                </div>
              </div>
            )}

          </>
        )}
      </div>
    </>
  );
}

export default AdminDashboard;
