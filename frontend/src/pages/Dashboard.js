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
    --shadow-sm: 0 1px 3px rgba(20,21,42,0.06), 0 1px 2px rgba(20,21,42,0.04);
    --shadow-md: 0 4px 16px rgba(20,21,42,0.08), 0 2px 6px rgba(20,21,42,0.04);
    --shadow-lg: 0 12px 40px rgba(20,21,42,0.12), 0 4px 12px rgba(20,21,42,0.06);
    --radius:    14px;
    --radius-sm: 8px;
  }

  body { background: var(--bg); font-family: 'Outfit', sans-serif; }

  .sd-wrap { min-height: 100vh; background: var(--bg); padding: 28px 36px; }

  .sd-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 36px; }
  .sd-greeting { font-size: 13px; font-weight: 500; color: var(--text-3); margin-bottom: 4px; letter-spacing: 0.3px; }
  .sd-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 26px; font-weight: 800; color: var(--text-1); letter-spacing: -0.4px; line-height: 1.1; }
  .sd-title span { color: var(--accent); }
  .sd-header-actions { display: flex; gap: 10px; align-items: center; flex-shrink: 0; }

  .btn-primary-sd {
    display: inline-flex; align-items: center; gap: 7px;
    background: var(--accent); border: none; color: #fff;
    padding: 10px 20px; border-radius: var(--radius-sm);
    font-family: 'Outfit', sans-serif; font-size: 13.5px; font-weight: 600;
    cursor: pointer; transition: all 0.18s ease;
    box-shadow: 0 2px 8px rgba(79,70,229,0.3); white-space: nowrap;
  }
  .btn-primary-sd:hover { background: #4338ca; transform: translateY(-1px); box-shadow: 0 4px 14px rgba(79,70,229,0.4); }

  .btn-secondary-sd {
    display: inline-flex; align-items: center; gap: 7px;
    background: var(--surface); border: 1px solid var(--border); color: var(--text-2);
    padding: 10px 20px; border-radius: var(--radius-sm);
    font-family: 'Outfit', sans-serif; font-size: 13.5px; font-weight: 600;
    cursor: pointer; transition: all 0.18s ease; box-shadow: var(--shadow-sm); white-space: nowrap;
  }
  .btn-secondary-sd:hover { background: var(--accent-lt); border-color: var(--accent-md); color: var(--accent); transform: translateY(-1px); }

  .sd-cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 28px; }
  @media (max-width: 900px) { .sd-cards { grid-template-columns: repeat(2, 1fr); } }

  .sd-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 20px; position: relative;
    overflow: hidden; transition: all 0.22s ease; box-shadow: var(--shadow-sm); cursor: default;
  }
  .sd-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: var(--card-accent); border-radius: var(--radius) var(--radius) 0 0;
  }
  .sd-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); border-color: transparent; }
  .sd-card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
  .sd-card-icon { width: 40px; height: 40px; border-radius: 10px; background: var(--card-icon-bg); display: flex; align-items: center; justify-content: center; font-size: 18px; }
  .sd-card-trend { font-size: 11px; font-weight: 700; color: var(--text-3); background: var(--surface2); padding: 3px 8px; border-radius: 20px; }
  .sd-card-value { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 34px; font-weight: 800; color: var(--text-1); line-height: 1; margin-bottom: 5px; }
  .sd-card-label { font-size: 12px; font-weight: 600; color: var(--text-3); letter-spacing: 0.5px; text-transform: uppercase; }

  .cc-blue   { --card-accent: #2563eb; --card-icon-bg: #dbeafe; }
  .cc-amber  { --card-accent: #d97706; --card-icon-bg: #fef3c7; }
  .cc-violet { --card-accent: #7c3aed; --card-icon-bg: #ede9fe; }
  .cc-green  { --card-accent: #059669; --card-icon-bg: #d1fae5; }

  .sd-panel { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); box-shadow: var(--shadow-sm); overflow: hidden; }
  .sd-panel-header { display: flex; justify-content: space-between; align-items: center; padding: 18px 24px; background: var(--surface2); border-bottom: 1px solid var(--border2); }
  .sd-panel-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 15px; font-weight: 700; color: var(--text-1); display: flex; align-items: center; gap: 8px; }
  .sd-panel-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); }
  .sd-panel-count { font-size: 12px; font-weight: 600; color: var(--text-3); background: var(--border2); padding: 3px 10px; border-radius: 20px; }

  .sd-table { width: 100%; border-collapse: collapse; }
  .sd-table thead tr { background: var(--surface2); }
  .sd-table th { padding: 11px 20px; font-size: 10.5px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: var(--text-3); text-align: left; border-bottom: 1px solid var(--border2); white-space: nowrap; }
  .sd-table td { padding: 14px 20px; font-size: 13.5px; color: var(--text-2); border-bottom: 1px solid var(--border2); vertical-align: middle; }
  .sd-table tbody tr:last-child td { border-bottom: none; }
  .sd-table tbody tr { transition: background 0.15s; animation: rowIn 0.3s ease both; cursor: pointer; }
  .sd-table tbody tr:hover td { background: var(--accent-lt); }

  .sd-row-link { color: var(--accent); font-weight: 700; display: flex; align-items: center; gap: 6px; }
  .sd-row-link:hover { color: #3730a3; }

  @keyframes rowIn { from { opacity: 0; transform: translateX(-6px); } to { opacity: 1; transform: translateX(0); } }

  .td-title { font-weight: 600; color: var(--text-1); }
  .td-date  { color: var(--text-3); font-size: 12px; }
  .td-muted { color: var(--text-3); font-style: italic; font-size: 12px; }

  .badge { display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; white-space: nowrap; }
  .badge::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: currentColor; flex-shrink: 0; }
  .badge-pending  { background: var(--amber-lt);  color: var(--amber); }
  .badge-progress { background: var(--blue-lt);   color: var(--blue); }
  .badge-resolved { background: var(--green-lt);  color: var(--green); }
  .badge-high     { background: #fee2e2; color: #dc2626; }
  .badge-medium   { background: var(--amber-lt);  color: var(--amber); }
  .badge-low      { background: var(--green-lt);  color: var(--green); }

  .sd-empty { text-align: center; padding: 56px 24px; color: var(--text-3); }
  .sd-empty-icon { font-size: 40px; margin-bottom: 12px; opacity: 0.5; }
  .sd-empty-text { font-size: 14px; font-weight: 500; margin-bottom: 18px; }

  .sd-spinner-wrap { display: flex; justify-content: center; align-items: center; min-height: 320px; }
  .sd-spinner { width: 38px; height: 38px; border: 3px solid var(--accent-md); border-top-color: var(--accent); border-radius: 50%; animation: spin 0.7s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }

  .fade-in { animation: fadeIn 0.25s ease both; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  .sd-card:nth-child(1) { animation: fadeIn 0.3s ease 0.05s both; }
  .sd-card:nth-child(2) { animation: fadeIn 0.3s ease 0.10s both; }
  .sd-card:nth-child(3) { animation: fadeIn 0.3s ease 0.15s both; }
  .sd-card:nth-child(4) { animation: fadeIn 0.3s ease 0.20s both; }

  .sd-modal-overlay {
    position: fixed; inset: 0;
    background: rgba(14,15,30,0.55);
    backdrop-filter: blur(4px);
    z-index: 1000;
    display: flex; align-items: center; justify-content: center;
    padding: 20px;
    animation: overlayIn 0.2s ease both;
  }
  @keyframes overlayIn { from { opacity:0; } to { opacity:1; } }

  .sd-modal {
    background: var(--surface);
    border-radius: var(--radius);
    box-shadow: var(--shadow-lg);
    width: 100%;
    max-width: 560px;
    overflow: hidden;
    animation: modalIn 0.25s ease both;
  }
  @keyframes modalIn { from { opacity:0; transform: translateY(20px) scale(0.97); } to { opacity:1; transform: translateY(0) scale(1); } }

  .sd-modal-header {
    background: linear-gradient(135deg, var(--accent) 0%, #7c3aed 100%);
    padding: 22px 24px;
    display: flex; justify-content: space-between; align-items: flex-start;
  }
  .sd-modal-token-label { font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(255,255,255,0.65); margin-bottom: 3px; }
  .sd-modal-token { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 22px; font-weight: 800; color: #fff; letter-spacing: 0.5px; }
  .sd-modal-close {
    background: rgba(255,255,255,0.15); border: none; color: #fff;
    width: 32px; height: 32px; border-radius: 50%; font-size: 16px;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    transition: background 0.15s; flex-shrink: 0;
  }
  .sd-modal-close:hover { background: rgba(255,255,255,0.28); }

  .sd-modal-body { padding: 0; }

  .sd-detail-row {
    display: flex; align-items: flex-start;
    padding: 13px 24px;
    border-bottom: 1px solid var(--border2);
  }
  .sd-detail-row:last-child { border-bottom: none; }

  .sd-detail-key {
    font-size: 11px; font-weight: 700; letter-spacing: 0.7px; text-transform: uppercase;
    color: var(--text-3); width: 130px; flex-shrink: 0; padding-top: 2px;
  }

  .sd-detail-val {
    font-size: 13.5px; color: var(--text-2); font-weight: 500; flex: 1; line-height: 1.5;
  }
  .sd-detail-val strong { color: var(--text-1); font-weight: 700; }

  .sd-pending-notice {
    display: inline-flex; align-items: center; gap: 5px;
    background: var(--amber-lt); border: 1px solid var(--amber-md);
    color: var(--amber); border-radius: 20px;
    font-size: 11px; font-weight: 700; padding: 3px 10px;
  }

  .sd-modal-status-bar {
    padding: 10px 24px;
    background: var(--surface2);
    border-top: 1px solid var(--border2);
    display: flex; align-items: center; gap: 8px;
    font-size: 12px; font-weight: 600; color: var(--text-3);
  }
`;

const getBadge = (val, type = "status") => {
  if (!val) return null;
  const statusMap   = { Pending: "badge-pending", "In Progress": "badge-progress", Resolved: "badge-resolved" };
  const priorityMap = { High: "badge-high", Medium: "badge-medium", Low: "badge-low" };
  const cls = type === "priority" ? priorityMap[val] : statusMap[val];
  return <span className={`badge ${cls || "badge-pending"}`}>{val}</span>;
};

/* ── COMPLAINT DETAIL MODAL ── */
function ComplaintModal({ complaint, onClose, studentFeedback, setStudentFeedback, submitFeedback }) {
  if (!complaint) return null;

  const isPriorityPending = !complaint.priority;
  const isDeptPending     = !complaint.department;

  const rows = [
    { k: "Ticket ID",   v: <strong>{complaint.token || complaint._id}</strong> },
    { k: "Issue",       v: <strong>{complaint.title}</strong> },
    {
      k: "Department",
      v: isDeptPending
        ? <span className="sd-pending-notice">⏳ Pending admin assignment</span>
        : complaint.department
    },
    {
      k: "Priority",
      v: isPriorityPending
        ? <span className="sd-pending-notice">⏳ Pending admin assignment</span>
        : getBadge(complaint.priority, "priority")
    },
    { k: "Status",      v: getBadge(complaint.status, "status") },
    {
      k: "Assigned To",
      v: complaint.assignedTo?.name
        ? complaint.assignedTo.name
        : <span style={{ color: "var(--text-3)", fontStyle: "italic" }}>Not yet assigned</span>
    },
    { k: "Submitted",   v: complaint.createdAt ? new Date(complaint.createdAt).toLocaleString() : "—" },

    ...(complaint.status === "Resolved" ? [
      {
        k: "Resolved At",
        v: <span style={{ color: "var(--green)", fontWeight: 700 }}>
          {complaint.resolvedAt ? new Date(complaint.resolvedAt).toLocaleString() : "—"}
        </span>
      },

      ...(complaint.remark ? [
        { k: "Technician Remark", v: <em>{complaint.remark}</em> }
      ] : []),

      ...(complaint.studentResolved ? [
        { k: "Student Response", v: complaint.studentResolved },
        { k: "Student Remark",   v: complaint.studentRemark || "—" }
      ] : [
        {
          k: "Confirm Resolution",
          v: (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <select
                style={{ padding: "6px", borderRadius: "6px" }}
                onChange={(e) =>
                  setStudentFeedback(prev => ({
                    ...prev,
                    [complaint._id]: { ...prev[complaint._id], resolved: e.target.value }
                  }))
                }
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>

              <textarea
                placeholder="Enter remarks"
                style={{ padding: "6px", borderRadius: "6px" }}
                onChange={(e) =>
                  setStudentFeedback(prev => ({
                    ...prev,
                    [complaint._id]: { ...prev[complaint._id], remark: e.target.value }
                  }))
                }
              />

              <button
                className="btn-primary-sd"
                onClick={() => submitFeedback(complaint._id)}
              >
                Submit
              </button>
            </div>
          )
        }
      ])
    ] : []),

    { k: "Description", v: <span style={{ lineHeight: 1.7, display: "block" }}>{complaint.description || "—"}</span> },
  ];

  return (
    <div className="sd-modal-overlay" onClick={onClose}>
      <div className="sd-modal" onClick={e => e.stopPropagation()}>

        <div className="sd-modal-header">
          <div>
            <div className="sd-modal-token-label">Complaint Ticket</div>
            <div className="sd-modal-token">{complaint.token || complaint._id}</div>
          </div>
          <button className="sd-modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="sd-modal-status-bar">
          <span>Status:</span>
          {getBadge(complaint.status, "status")}
          {(isPriorityPending || isDeptPending) && (
            <span className="sd-pending-notice" style={{ marginLeft: "auto" }}>
              ⏳ Admin review pending
            </span>
          )}
        </div>

        <div className="sd-modal-body">
          {rows.map(({ k, v }) => (
            <div className="sd-detail-row" key={k}>
              <div className="sd-detail-key">{k}</div>
              <div className="sd-detail-val">{v}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════ */
function Dashboard() {
  const navigate = useNavigate();

  const [complaints, setComplaints]           = useState([]);
  const [loading, setLoading]                 = useState(true);
  const [selectedComplaint, setSelected]      = useState(null);
  const [studentFeedback, setStudentFeedback] = useState({});

  const role   = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");
  const name   = localStorage.getItem("name");

  const fetchComplaints = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/complaints/my/${userId}`);
      const data = await response.json();
      setComplaints(response.ok && Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching complaints:", error);
      setComplaints([]);
    }
    setLoading(false);
  };

  const submitFeedback = async (id) => {
    const data = studentFeedback[id];

    if (!data?.resolved) {
      alert("Please select Yes or No");
      return;
    }

    try {
      await fetch(`http://localhost:5000/api/complaints/student-feedback/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentResolved: data.resolved,
          studentRemark:   data.remark
        })
      });

      alert("Feedback submitted successfully");
      fetchComplaints();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (role !== "student") navigate("/login");
    else fetchComplaints();
  }, [role, navigate]);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const total      = complaints.length;
  const pending    = complaints.filter(c => c.status === "Pending").length;
  const inProgress = complaints.filter(c => c.status === "In Progress").length;
  const resolved   = complaints.filter(c => c.status === "Resolved").length;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <>
      <style>{styles}</style>

      {/* DETAIL MODAL */}
      {selectedComplaint && (
        <ComplaintModal
          complaint={selectedComplaint}
          onClose={() => setSelected(null)}
          studentFeedback={studentFeedback}
          setStudentFeedback={setStudentFeedback}
          submitFeedback={submitFeedback}
        />
      )}

      <div className="sd-wrap">

        {/* HEADER */}
        <div className="sd-header fade-in">
          <div className="sd-header-left">
            <div className="sd-greeting">{greeting}{name ? `, ${name}` : ""} 👋</div>
            <div className="sd-title">Student <span>Dashboard</span></div>
          </div>
          <div className="sd-header-actions">
            {/* <button className="btn-secondary-sd" onClick={() => navigate("/my-complaints")}>📋 My Complaints</button> */}
            <button className="btn-primary-sd"   onClick={() => navigate("/raise-complaint")}>+ Raise Complaint</button>
          </div>
        </div>

        {loading ? (
          <div className="sd-spinner-wrap"><div className="sd-spinner" /></div>
        ) : (
          <>
            {/* STAT CARDS */}
            <div className="sd-cards">
              <div className="sd-card cc-blue">
                <div className="sd-card-top"><div className="sd-card-icon">📋</div><span className="sd-card-trend">All</span></div>
                <div className="sd-card-value">{total}</div>
                <div className="sd-card-label">Total Complaints</div>
              </div>
              <div className="sd-card cc-amber">
                <div className="sd-card-top"><div className="sd-card-icon">⏳</div><span className="sd-card-trend">Open</span></div>
                <div className="sd-card-value">{pending}</div>
                <div className="sd-card-label">Pending</div>
              </div>
              <div className="sd-card cc-violet">
                <div className="sd-card-top"><div className="sd-card-icon">⚙️</div><span className="sd-card-trend">Active</span></div>
                <div className="sd-card-value">{inProgress}</div>
                <div className="sd-card-label">In Progress</div>
              </div>
              <div className="sd-card cc-green">
                <div className="sd-card-top"><div className="sd-card-icon">✅</div><span className="sd-card-trend">Done</span></div>
                <div className="sd-card-value">{resolved}</div>
                <div className="sd-card-label">Resolved</div>
              </div>
            </div>

            {/* COMPLAINTS TABLE */}
            <div className="sd-panel fade-in">
              <div className="sd-panel-header">
                <div className="sd-panel-title">
                  <div className="sd-panel-dot" />
                  My Complaints
                  <span style={{ fontSize: 11, color: "var(--text-3)", fontWeight: 500, fontStyle: "italic" }}>
                    — click any row to view details
                  </span>
                </div>
                {complaints.length > 0 && (
                  <span className="sd-panel-count">{complaints.length} records</span>
                )}
              </div>

              {complaints.length === 0 ? (
                <div className="sd-empty">
                  <div className="sd-empty-icon">📭</div>
                  <div className="sd-empty-text">No complaints submitted yet.</div>
                  <button className="btn-primary-sd" onClick={() => navigate("/raise-complaint")}>
                    + Raise your first complaint
                  </button>
                </div>
              ) : (
                <table className="sd-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Department</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {complaints.map((c) => (
                      <tr key={c._id} onClick={() => setSelected(c)}>
                        <td className="td-title">{c.title}</td>
                        <td>
                          {c.department
                            ? <span style={{ color: "var(--text-2)", fontWeight: 500 }}>{c.department}</span>
                            : <span className="td-muted">Pending</span>}
                        </td>
                        <td>
                          {c.priority
                            ? getBadge(c.priority, "priority")
                            : <span style={{
                                display: "inline-flex", alignItems: "center", gap: 4,
                                background: "var(--amber-lt)", color: "var(--amber)",
                                border: "1px solid var(--amber-md)", borderRadius: 20,
                                fontSize: 10, fontWeight: 700, padding: "3px 8px"
                              }}>⏳ Pending</span>}
                        </td>
                        <td>{getBadge(c.status, "status")}</td>
                        <td className="td-date">{new Date(c.createdAt).toLocaleString()}</td>
                        <td style={{ width: 40 }}>
                          <span style={{ color: "var(--accent)", fontWeight: 700, fontSize: 13 }}>↗</span>
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

export default Dashboard;