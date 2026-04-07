import { useState } from "react";

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
    --red:       #dc2626;
    --red-lt:    #fee2e2;
    --blue:      #2563eb;
    --blue-lt:   #dbeafe;
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
  .rc-wrap {
    min-height: 100vh;
    background: var(--bg);
    padding: 28px 36px;
  }

  /* ── HEADER ── */
  .rc-header {
    margin-bottom: 32px;
    animation: fadeUp 0.3s ease both;
  }

  .rc-greeting {
    font-size: 13px;
    font-weight: 500;
    color: var(--text-3);
    margin-bottom: 4px;
    letter-spacing: 0.3px;
  }

  .rc-title {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 26px;
    font-weight: 800;
    color: var(--text-1);
    letter-spacing: -0.4px;
  }

  .rc-title span { color: var(--accent); }

  /* ── MAIN GRID ── */
  .rc-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    align-items: start;
  }

  @media (max-width: 860px) {
    .rc-grid { grid-template-columns: 1fr; }
  }

  /* ── PANEL ── */
  .rc-panel {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow-sm);
    overflow: hidden;
    animation: fadeUp 0.3s ease both;
  }

  .rc-panel-header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 18px 24px;
    background: var(--surface2);
    border-bottom: 1px solid var(--border2);
  }

  .rc-panel-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--accent);
    flex-shrink: 0;
  }

  .rc-panel-title {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: var(--text-1);
  }

  .rc-panel-body {
    padding: 24px;
  }

  /* ── FORM FIELDS ── */
  .rc-field {
    margin-bottom: 18px;
  }

  .rc-label {
    display: block;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    color: var(--text-3);
    margin-bottom: 7px;
  }

  .rc-select,
  .rc-input,
  .rc-textarea {
    width: 100%;
    background: var(--surface);
    border: 1px solid var(--border);
    color: var(--text-1);
    padding: 10px 14px;
    border-radius: var(--radius-sm);
    font-size: 14px;
    font-family: 'Outfit', sans-serif;
    font-weight: 500;
    transition: all 0.18s;
    outline: none;
    box-shadow: var(--shadow-sm);
  }

  .rc-select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239698b4' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    padding-right: 36px;
    cursor: pointer;
  }

  .rc-select:focus,
  .rc-input:focus,
  .rc-textarea:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(79,70,229,0.1);
  }

  .rc-input[readonly] {
    background: var(--surface2);
    color: var(--text-2);
    cursor: not-allowed;
    box-shadow: none;
  }

  .rc-textarea {
    resize: vertical;
    min-height: 110px;
    line-height: 1.6;
  }

  /* ── READONLY ROW ── */
  .rc-readonly-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  /* ── BADGE INSIDE INPUT ── */
  .rc-field-with-badge {
    position: relative;
  }

  .rc-badge-overlay {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }

  .priority-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 700;
  }

  .priority-badge::before {
    content: '';
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: currentColor;
  }

  .pb-high   { background: var(--red-lt);   color: var(--red); }
  .pb-medium { background: var(--amber-lt); color: var(--amber); }
  .pb-low    { background: var(--green-lt); color: var(--green); }

  /* ── SUBMIT BUTTON ── */
  .rc-submit {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: var(--accent);
    border: none;
    color: #fff;
    padding: 12px 24px;
    border-radius: var(--radius-sm);
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.18s ease;
    box-shadow: 0 2px 8px rgba(79,70,229,0.3);
    margin-top: 4px;
  }

  .rc-submit:hover:not(:disabled) {
    background: #4338ca;
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(79,70,229,0.4);
  }

  .rc-submit:disabled {
    opacity: 0.65;
    cursor: not-allowed;
    transform: none;
  }

  .rc-spinner-inline {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255,255,255,0.35);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.65s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── TICKET CARD ── */
  .rc-ticket {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow-md);
    overflow: hidden;
    animation: fadeUp 0.35s ease both;
  }

  .rc-ticket-header {
    background: linear-gradient(135deg, var(--accent) 0%, #7c3aed 100%);
    padding: 20px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .rc-ticket-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.7);
    margin-bottom: 4px;
  }

  .rc-ticket-id {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 22px;
    font-weight: 800;
    color: #fff;
    letter-spacing: 0.5px;
  }

  .rc-ticket-icon {
    font-size: 32px;
    opacity: 0.8;
  }

  .rc-ticket-body {
    padding: 0;
  }

  .rc-ticket-row {
    display: flex;
    align-items: center;
    padding: 13px 24px;
    border-bottom: 1px solid var(--border2);
  }

  .rc-ticket-row:last-child {
    border-bottom: none;
  }

  .rc-ticket-key {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.7px;
    text-transform: uppercase;
    color: var(--text-3);
    width: 120px;
    flex-shrink: 0;
  }

  .rc-ticket-val {
    font-size: 13.5px;
    color: var(--text-2);
    font-weight: 500;
    flex: 1;
  }

  .rc-ticket-val strong {
    color: var(--text-1);
    font-weight: 600;
  }

  .rc-success-banner {
    display: flex;
    align-items: center;
    gap: 10px;
    background: var(--green-lt);
    border: 1px solid var(--green-md);
    border-radius: var(--radius-sm);
    padding: 12px 16px;
    margin-bottom: 20px;
    font-size: 13.5px;
    font-weight: 600;
    color: var(--green);
    animation: fadeUp 0.3s ease both;
  }

  /* ── STATUS BADGE ── */
  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 700;
  }

  .status-badge::before {
    content: '';
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: currentColor;
  }

  .sb-pending  { background: var(--amber-lt); color: var(--amber); }
  .sb-progress { background: var(--blue-lt);  color: var(--blue); }
  .sb-resolved { background: var(--green-lt); color: var(--green); }

  /* ── ANIMATIONS ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── PLACEHOLDER ── */
  .rc-select option[value=""] { color: var(--text-3); }
  .rc-empty-ticket {
    padding: 48px 24px;
    text-align: center;
    color: var(--text-3);
  }
  .rc-empty-ticket-icon { font-size: 36px; margin-bottom: 10px; opacity: 0.4; }
  .rc-empty-ticket-text { font-size: 13px; font-weight: 500; }
`;

const issues = [
  { issue: "WiFi not working",            department: "NMC Team",        priority: "High" },
  { issue: "Internet completely down",    department: "NMC Team",        priority: "High" },
  { issue: "Student portal login failure",department: "NMC Team",        priority: "High" },
  { issue: "LMS access issue",            department: "NMC Team",        priority: "High" },
  { issue: "Lab network down",            department: "NMC Team",        priority: "High" },
  { issue: "Slow internet speed",         department: "NMC Team",        priority: "Medium" },
  { issue: "Printer not working",         department: "NMC Team",        priority: "Medium" },
  { issue: "Power failure in classroom",  department: "Electrical Team", priority: "High" },
  { issue: "AC not working",              department: "Electrical Team", priority: "Medium" },
  { issue: "Fan not working",             department: "Electrical Team", priority: "Medium" },
  { issue: "Washroom not clean",          department: "Cleaning Team",   priority: "High" },
  { issue: "Garbage overflow",            department: "Cleaning Team",   priority: "High" },
  { issue: "Classroom cleaning required", department: "Cleaning Team",   priority: "Medium" },
  { issue: "Bus breakdown",               department: "Transport Team",  priority: "High" },
  { issue: "Bus delay",                   department: "Transport Team",  priority: "Medium" },
  { issue: "No water supply in hostel",   department: "Hostel Team",     priority: "High" },
  { issue: "Laundry service issue",       department: "Hostel Team",     priority: "Low" },
  { issue: "Drinking water not available",department: "Water Team",      priority: "High" },
  { issue: "Water cooler not working",    department: "Water Team",      priority: "Medium" },
  { issue: "Food contamination",          department: "Mess Team",       priority: "High" },
  { issue: "Lunch timing issue",          department: "Mess Team",       priority: "Medium" },
];

const priorityBadgeClass = { High: "pb-high", Medium: "pb-medium", Low: "pb-low" };
const statusBadgeClass   = { Pending: "sb-pending", "In Progress": "sb-progress", Resolved: "sb-resolved" };

function RaiseComplaint() {
  const [isOther, setIsOther]     = useState(false);
  const [formData, setFormData]   = useState({
    title: "", department: "", priority: "", description: "",
  });
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading]     = useState(false);

  const userId = localStorage.getItem("userId");

  const handleIssueChange = (e) => {
    const val = e.target.value;
    if (val === "__other__") {
      setIsOther(true);
      setFormData({ title: "", department: "", priority: "", description: formData.description });
    } else {
      setIsOther(false);
      const selected = issues.find(item => item.issue === val);
      if (selected) {
        setFormData({
          ...formData,
          title:      selected.issue,
          department: selected.department,
          priority:   selected.priority,
        });
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, userId }),
      });
      const data = await response.json();
      if (response.ok) {
        setComplaint(data.complaint);
        setIsOther(false);
        setFormData({ title: "", department: "", priority: "", description: "" });
      } else {
        alert(data.message || "Error submitting complaint");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
    setLoading(false);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="rc-wrap">

        {/* HEADER */}
        <div className="rc-header">
          <div className="rc-greeting">Submit a new issue for review</div>
          <div className="rc-title">Raise a <span>Complaint</span></div>
        </div>

        <div className="rc-grid">

          {/* ── FORM PANEL ── */}
          <div className="rc-panel">
            <div className="rc-panel-header">
              <div className="rc-panel-dot" />
              <div className="rc-panel-title">Complaint Form</div>
            </div>
            <div className="rc-panel-body">
              <form onSubmit={handleSubmit}>

                {/* Issue Select */}
                <div className="rc-field">
                  <label className="rc-label">Select Issue</label>
                  <select className="rc-select" onChange={handleIssueChange} required defaultValue="">
                    <option value="" disabled>Choose an issue…</option>
                    {issues.map((item, i) => (
                      <option key={i} value={item.issue}>{item.issue}</option>
                    ))}
                    <option value="__other__">✏️ Other (describe below)</option>
                  </select>
                </div>

                {/* If OTHER: free-text title input */}
                {isOther && (
                  <div className="rc-field">
                    <label className="rc-label">Issue Title</label>
                    <input
                      className="rc-input"
                      name="title"
                      placeholder="Briefly describe your issue…"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                )}

                {/* Department + Priority */}
                <div className="rc-readonly-row">
                  <div className="rc-field">
                    <label className="rc-label">
                      Department
                      {isOther && <span style={{color:"var(--accent)",marginLeft:4,fontSize:10}}>(assigned by admin)</span>}
                    </label>
                    <input
                      className="rc-input"
                      value={formData.department}
                      placeholder={isOther ? "To be assigned by admin" : "Auto-filled"}
                      readOnly
                    />
                  </div>
                  <div className="rc-field">
                    <label className="rc-label">
                      Priority
                      {isOther && <span style={{color:"var(--accent)",marginLeft:4,fontSize:10}}>(assigned by admin)</span>}
                    </label>
                    <div className="rc-field-with-badge" style={{position:"relative"}}>
                      <input
                        className="rc-input"
                        value={formData.priority}
                        placeholder={isOther ? "To be assigned by admin" : "Auto-filled"}
                        readOnly
                        style={{paddingRight: formData.priority ? "90px" : "14px"}}
                      />
                      {formData.priority && (
                        <div className="rc-badge-overlay">
                          <span className={`priority-badge ${priorityBadgeClass[formData.priority]}`}>
                            {formData.priority}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Info note for Other */}
                {isOther && (
                  <div style={{
                    display:"flex", alignItems:"flex-start", gap:10,
                    background:"var(--accent-lt)", border:"1px solid var(--accent-md)",
                    borderRadius:"var(--radius-sm)", padding:"12px 14px",
                    marginBottom:18, fontSize:13, color:"var(--accent)", fontWeight:500, lineHeight:1.5
                  }}>
                    <span style={{fontSize:16, flexShrink:0}}>ℹ️</span>
                    <span>
                      Since this is a custom issue, <strong>department and priority will be reviewed and assigned by the admin</strong> after submission.
                    </span>
                  </div>
                )}

                {/* Description */}
                <div className="rc-field">
                  <label className="rc-label">Description</label>
                  <textarea
                    className="rc-textarea"
                    name="description"
                    placeholder="Describe your issue in detail…"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button className="rc-submit" type="submit" disabled={loading}>
                  {loading ? (
                    <><div className="rc-spinner-inline" /> Submitting…</>
                  ) : (
                    <>✦ Submit Complaint</>
                  )}
                </button>

              </form>
            </div>
          </div>

          {/* ── TICKET PANEL ── */}
          <div>
            {complaint ? (
              <>
                <div className="rc-success-banner">
                  ✅ Complaint submitted successfully! Keep your Ticket ID safe.
                </div>
                <div className="rc-ticket">
                  <div className="rc-ticket-header">
                    <div>
                      <div className="rc-ticket-label">Ticket ID</div>
                      <div className="rc-ticket-id">{complaint.token}</div>
                    </div>
                    <div className="rc-ticket-icon">🎫</div>
                  </div>
                  <div className="rc-ticket-body">
                    {[
                      { k: "Issue",      v: complaint.title },
                      { k: "Department", v: complaint.department
                          ? complaint.department
                          : <span style={{color:"var(--accent)",fontStyle:"italic",fontSize:12}}>Pending admin assignment</span>
                      },
                      { k: "Priority",   v: complaint.priority
                          ? <span className={`priority-badge ${priorityBadgeClass[complaint.priority]}`}>{complaint.priority}</span>
                          : <span style={{color:"var(--accent)",fontStyle:"italic",fontSize:12}}>Pending admin assignment</span>
                      },
                      { k: "Status",     v: (
                          <span className={`status-badge ${statusBadgeClass[complaint.status] || "sb-pending"}`}>
                            {complaint.status}
                          </span>
                        )
                      },
                      { k: "Submitted",  v: new Date(complaint.createdAt).toLocaleString() },
                    ].map(({ k, v }) => (
                      <div className="rc-ticket-row" key={k}>
                        <div className="rc-ticket-key">{k}</div>
                        <div className="rc-ticket-val">{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="rc-panel">
                <div className="rc-panel-header">
                  <div className="rc-panel-dot" />
                  <div className="rc-panel-title">Your Ticket</div>
                </div>
                <div className="rc-empty-ticket">
                  <div className="rc-empty-ticket-icon">🎫</div>
                  <div className="rc-empty-ticket-text">
                    Your ticket details will appear here after submission.
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}

export default RaiseComplaint;
