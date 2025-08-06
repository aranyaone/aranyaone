import React, { useEffect, useState, useMemo } from 'react';

function exportCSV(data) {
  const headers = ['Service','User','Feedback','Category','Sentiment','Date'];
  const rows = data.map(f => [
    f.service,
    f.user || 'anonymous',
    f.feedback,
    f.ai?.category,
    f.ai?.sentiment?.score,
    new Date(f.date).toLocaleString()
  ]);
  const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'feedbacks.csv';
  a.click();
  URL.revokeObjectURL(url);
}

function exportPDF(data) {
  // Simple PDF export using browser print
  const win = window.open('', '', 'width=800,height=600');
  win.document.write('<html><head><title>Feedback Report</title></head><body>');
  win.document.write('<h1>Feedback Report</h1>');
  win.document.write('<table border="1" style="width=100%;border-collapse:collapse;"><tr><th>Service</th><th>User</th><th>Feedback</th><th>Category</th><th>Sentiment</th><th>Date</th></tr>');
  data.forEach(f => {
    win.document.write(`<tr><td>${f.service}</td><td>${f.user || 'anonymous'}</td><td>${f.feedback}</td><td>${f.ai?.category}</td><td>${f.ai?.sentiment?.score}</td><td>${new Date(f.date).toLocaleString()}</td></tr>`);
  });
  win.document.write('</table></body></html>');
  win.print();
  win.close();
}

function sentimentEmoji(score) {
  if (score > 2) return '😃';
  if (score > 0) return '🙂';
  if (score === 0) return '😐';
  if (score < 0 && score > -2) return '😕';
  return '😠';
}

function PieChart({ data }) {
  // Simple pie chart for sentiment distribution
  const total = data.reduce((sum, f) => sum + 1, 0);
  const counts = {
    positive: data.filter(f => f.ai?.sentiment?.score > 0).length,
    neutral: data.filter(f => f.ai?.sentiment?.score === 0).length,
    negative: data.filter(f => f.ai?.sentiment?.score < 0).length,
  };
  const angles = [
    (counts.positive / total) * 360,
    (counts.neutral / total) * 360,
    (counts.negative / total) * 360,
  ];
  return (
    <svg width="120" height="120" viewBox="0 0 120 120">
      <circle r="50" cx="60" cy="60" fill="#e5e7eb" />
      <path d={`M60,60 L60,10 A50,50 0 ${angles[0] > 180 ? 1 : 0},1 ${60 + 50 * Math.sin((angles[0] * Math.PI) / 180)},${60 - 50 * Math.cos((angles[0] * Math.PI) / 180)} Z`} fill="#34d399" />
      <path d={`M60,60 L${60 + 50 * Math.sin((angles[0] * Math.PI) / 180)},${60 - 50 * Math.cos((angles[0] * Math.PI) / 180)} A50,50 0 ${angles[1] > 180 ? 1 : 0},1 ${60 + 50 * Math.sin(((angles[0] + angles[1]) * Math.PI) / 180)},${60 - 50 * Math.cos(((angles[0] + angles[1]) * Math.PI) / 180)} Z`} fill="#fbbf24" />
      <path d={`M60,60 L${60 + 50 * Math.sin(((angles[0] + angles[1]) * Math.PI) / 180)},${60 - 50 * Math.cos(((angles[0] + angles[1]) * Math.PI) / 180)} A50,50 0 ${angles[2] > 180 ? 1 : 0},1 60,10 Z`} fill="#f87171" />
    </svg>
  );
}

function LineChart({ data }) {
  // Line chart for feedback count over time
  const points = useMemo(() => {
    const byDay = {};
    data.forEach(f => {
      const day = new Date(f.date).toISOString().slice(0, 10);
      byDay[day] = (byDay[day] || 0) + 1;
    });
    return Object.entries(byDay).map(([day, count]) => ({ day, count }));
  }, [data]);
  if (!points.length) return null;
  const max = Math.max(...points.map(p => p.count));
  return (
    <svg width="320" height="80">
      {points.map((p, i) => (
        i > 0 && <line key={i} x1={20 + (i - 1) * 30} y1={70 - points[i - 1].count / max * 60} x2={20 + i * 30} y2={70 - p.count / max * 60} stroke="#2563eb" strokeWidth="2" />
      ))}
      {points.map((p, i) => (
        <circle key={i} cx={20 + i * 30} cy={70 - p.count / max * 60} r={4} fill="#2563eb" />
      ))}
      {points.map((p, i) => (
        <text key={i} x={20 + i * 30} y={75} fontSize="10" textAnchor="middle">{p.day.slice(5)}</text>
      ))}
    </svg>
  );
}

async function escalateFeedback(feedback) {
  // Example: send to Slack and Trello
  await fetch('/api/escalate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(feedback),
  });
  alert('Feedback escalated to Slack and Trello!');
}

function getEscalationMeta(f) {
  // For demo, randomize escalation meta if not present
  if (!f.escalationMeta) {
    const priorities = ['Critical','High','Normal','Low'];
    const assigned = ['Finance Team','Support Team','Security Team','General Team'];
    return {
      priority: priorities[Math.floor(Math.random()*priorities.length)],
      slaHours: [24,48,72,96][Math.floor(Math.random()*4)],
      assignedTo: assigned[Math.floor(Math.random()*assigned.length)],
      approved: Math.random() > 0.5,
      escalatedAt: f.date,
    };
  }
  return f.escalationMeta;
}

// World-class feedback dashboard with AI insights
const FeedbackDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [serviceFilter, setServiceFilter] = useState('All');
  const [editIdx, setEditIdx] = useState(null);
  const [editText, setEditText] = useState('');
  const [replyIdx, setReplyIdx] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [replies, setReplies] = useState({});
  const [approvalIdx, setApprovalIdx] = useState(null);
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    async function fetchFeedbacks() {
      setLoading(true);
      const res = await fetch('/api/feedbacks');
      const data = await res.json();
      setFeedbacks(data.feedbacks || []);
      setLoading(false);
    }
    fetchFeedbacks();
  }, []);

  const categories = ['All', 'Bug Report', 'Feature Request', 'Praise', 'General'];

  const serviceList = Array.from(new Set(feedbacks.map(f => f.service)));

  const filtered = feedbacks.filter(f => {
    let ok = true;
    if (filter !== 'All') ok = ok && f.ai?.category === filter;
    if (serviceFilter !== 'All') ok = ok && f.service === serviceFilter;
    if (dateFrom) ok = ok && f.date >= new Date(dateFrom).getTime();
    if (dateTo) ok = ok && f.date <= new Date(dateTo).getTime();
    return ok;
  });

  const analytics = useMemo(() => {
    if (!feedbacks.length) return { count: 0, avgSentiment: 0 };
    const count = filtered.length;
    const avgSentiment = (filtered.reduce((sum, f) => sum + (f.ai?.sentiment?.score || 0), 0) / count).toFixed(2);
    return { count, avgSentiment };
  }, [filtered]);

  useEffect(() => {
    // Automated SLA reminders for overdue items
    const overdue = filtered.filter(f => {
      const meta = getEscalationMeta(f);
      const deadline = meta.escalatedAt + meta.slaHours*3600*1000;
      return !meta.approved && Date.now() > deadline;
    });
    setReminders(overdue.map(f => f.service + ' - ' + f.feedback));
  }, [filtered]);

  // Scheduled SLA reminders every 10 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      const overdue = filtered.filter(f => {
        const meta = getEscalationMeta(f);
        const deadline = meta.escalatedAt + meta.slaHours*3600*1000;
        return !meta.approved && Date.now() > deadline;
      });
      setReminders(overdue.map(f => f.service + ' - ' + f.feedback));
    }, 600000);
    return () => clearInterval(interval);
  }, [filtered]);

  // Integration status indicators (for demo, randomize)
  function getIntegrationStatus(f) {
    return {
      slack: Math.random() > 0.2 ? '✅' : '❌',
      trello: Math.random() > 0.2 ? '✅' : '❌',
      email: Math.random() > 0.2 ? '✅' : '❌',
      sentry: Math.random() > 0.2 ? '✅' : '❌',
    };
  }

  // Escalation history (for demo, randomize if not present)
  function getHistory(f) {
    if (!f.history) {
      return [
        { action: 'Created', at: f.date },
        { action: 'Assigned', at: f.date + 1000*60*10 },
        { action: 'Escalated', at: f.date + 1000*60*30 },
      ];
    }
    return f.history;
  }

  async function deleteFeedback(idx) {
    // For demo, just remove locally
    setFeedbacks(fbs => fbs.filter((_, i) => i !== idx));
    // TODO: Add API call to delete from backend
  }

  async function saveEdit(idx) {
    setFeedbacks(fbs => fbs.map((f, i) => i === idx ? { ...f, feedback: editText } : f));
    setEditIdx(null);
    setEditText('');
    // TODO: Add API call to persist edit
  }

  async function saveReply(idx) {
    setReplies(r => ({ ...r, [idx]: replyText }));
    setReplyIdx(null);
    setReplyText('');
    // TODO: Add API call to persist reply
  }

  async function approveEscalation(idx) {
    // For demo, just update locally
    setFeedbacks(fbs => fbs.map((f, i) => i === idx ? { ...f, escalationMeta: { ...getEscalationMeta(f), approved: true } } : f));
    setApprovalIdx(null);
    // TODO: Add API call to persist approval
  }

  return (
    <div className="p-6 bg-white rounded shadow-xl max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Feedback Dashboard</h1>
      <div className="mb-4 flex gap-2 flex-wrap items-center">
        {categories.map(cat => (
          <button key={cat} className={`px-3 py-1 rounded ${filter === cat ? 'bg-blue-600 text-white' : 'bg-gray-200'}`} onClick={() => setFilter(cat)}>{cat}</button>
        ))}
        <select className="ml-2 px-2 py-1 rounded border" value={serviceFilter} onChange={e => setServiceFilter(e.target.value)}>
          <option value="All">All Services</option>
          {serviceList.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <input type="date" className="ml-2 px-2 py-1 rounded border" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
        <input type="date" className="ml-2 px-2 py-1 rounded border" value={dateTo} onChange={e => setDateTo(e.target.value)} />
        <button className="px-3 py-1 rounded bg-green-600 text-white ml-auto" onClick={() => exportCSV(filtered)}>Export CSV</button>
        <button className="px-3 py-1 rounded bg-purple-600 text-white" onClick={() => exportPDF(filtered)}>Export PDF</button>
      </div>
      {/* Analytics summary */}
      <div className="mb-4 flex gap-8 items-center">
        <div className="font-semibold">Total: {analytics.count}</div>
        <div className="font-semibold">Avg Sentiment: {analytics.avgSentiment}</div>
        <PieChart data={filtered} />
      </div>
      <div className="mb-6">
        <div className="font-semibold mb-2">Feedback Over Time</div>
        <LineChart data={filtered} />
      </div>
      {/* Simple chart (bar) for category distribution */}
      <div className="mb-6">
        <div className="font-semibold mb-2">Category Distribution</div>
        <div className="flex gap-2">
          {categories.filter(c => c !== 'All').map(cat => {
            const catCount = feedbacks.filter(f => f.ai?.category === cat).length;
            return (
              <div key={cat} className="flex flex-col items-center">
                <div className="w-8 h-8 bg-blue-400 rounded mb-1 flex items-end" style={{ height: `${catCount * 10 + 10}px` }}></div>
                <span className="text-xs">{cat} ({catCount})</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mb-6">
        <div className="font-semibold mb-2">Escalation Status & SLA Compliance</div>
        <table className="w-full border mb-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Service</th>
              <th className="p-2">Priority</th>
              <th className="p-2">Assigned</th>
              <th className="p-2">SLA (hrs)</th>
              <th className="p-2">Approved</th>
              <th className="p-2">SLA Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((f, i) => {
              const meta = getEscalationMeta(f);
              const deadline = meta.escalatedAt + meta.slaHours*3600*1000;
              const slaStatus = Date.now() < deadline ? 'On Track' : 'Overdue';
              return (
                <tr key={i} className="border-t">
                  <td className="p-2">{f.service}</td>
                  <td className="p-2">{meta.priority}</td>
                  <td className="p-2">{meta.assignedTo}</td>
                  <td className="p-2">{meta.slaHours}</td>
                  <td className="p-2">{meta.approved ? '✅' : '⏳'}</td>
                  <td className={`p-2 ${slaStatus === 'Overdue' ? 'text-red-600' : 'text-green-600'}`}>{slaStatus}</td>
                  <td className="p-2">
                    {!meta.approved && <button className="px-2 py-1 bg-blue-600 text-white rounded" onClick={() => setApprovalIdx(i)}>Approve</button>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {approvalIdx !== null && (
          <div className="mb-4 p-4 bg-blue-50 rounded">
            <div className="mb-2 font-semibold">Approve escalation for feedback?</div>
            <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={() => approveEscalation(approvalIdx)}>Approve</button>
            <button className="px-3 py-1 ml-2 bg-gray-300 rounded" onClick={() => setApprovalIdx(null)}>Cancel</button>
          </div>
        )}
      </div>
      <div className="mb-6">
        <div className="font-semibold mb-2">Automated SLA Reminders</div>
        {reminders.length > 0 ? (
          <ul className="mb-4">
            {reminders.map((r, i) => <li key={i} className="text-red-600">Reminder: SLA Overdue - {r}</li>)}
          </ul>
        ) : <div className="text-green-600 mb-4">All escalations are on track.</div>}
        <div className="font-semibold mb-2">Escalation History</div>
        <table className="w-full border mb-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Service</th>
              <th className="p-2">History</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((f, i) => (
              <tr key={i} className="border-t">
                <td className="p-2">{f.service}</td>
                <td className="p-2">
                  <ul>
                    {getHistory(f).map((h, j) => (
                      <li key={j}>{h.action} at {new Date(h.at).toLocaleString()}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {loading ? <div>Loading...</div> : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Service</th>
              <th className="p-2">User</th>
              <th className="p-2">Feedback</th>
              <th className="p-2">Category</th>
              <th className="p-2">Sentiment</th>
              <th className="p-2">Date</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((f, i) => (
              <tr key={i} className="border-t">
                <td className="p-2">{f.service}</td>
                <td className="p-2">{f.user || 'anonymous'}</td>
                <td className="p-2">
                  {editIdx === i ? (
                    <>
                      <textarea className="border rounded p-1 w-full" value={editText} onChange={e => setEditText(e.target.value)} />
                      <button className="px-2 py-1 bg-blue-600 text-white rounded" onClick={() => saveEdit(i)}>Save</button>
                      <button className="px-2 py-1 ml-2 bg-gray-300 rounded" onClick={() => setEditIdx(null)}>Cancel</button>
                    </>
                  ) : f.feedback}
                </td>
                <td className="p-2">{f.ai?.category}</td>
                <td className="p-2">{sentimentEmoji(f.ai?.sentiment?.score)}</td>
                <td className="p-2">{new Date(f.date).toLocaleString()}</td>
                <td className="p-2 flex gap-2">
                  <button className="text-blue-600" onClick={() => { setEditIdx(i); setEditText(f.feedback); }}>Edit</button>
                  <button className="text-green-600" onClick={() => { setReplyIdx(i); setReplyText(''); }}>Reply</button>
                  <button className="text-yellow-600" onClick={() => escalateFeedback(f)}>Escalate</button>
                  <button className="text-red-600" onClick={() => deleteFeedback(i)}>Delete</button>
                </td>
              </tr>
            ))}
            {replyIdx !== null && (
              <tr className="bg-gray-50">
                <td colSpan={7} className="p-2">
                  <textarea className="border rounded p-1 w-full" value={replyText} onChange={e => setReplyText(e.target.value)} placeholder="Type your reply..." />
                  <button className="px-2 py-1 bg-green-600 text-white rounded" onClick={() => saveReply(replyIdx)}>Send Reply</button>
                  <button className="px-2 py-1 ml-2 bg-gray-300 rounded" onClick={() => setReplyIdx(null)}>Cancel</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      <div className="mb-6">
        <div className="font-semibold mb-2">Integration Status</div>
        <table className="w-full border mb-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Service</th>
              <th className="p-2">Slack</th>
              <th className="p-2">Trello</th>
              <th className="p-2">Email</th>
              <th className="p-2">Sentry</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((f, i) => {
              const status = getIntegrationStatus(f);
              return (
                <tr key={i} className="border-t">
                  <td className="p-2">{f.service}</td>
                  <td className="p-2">{status.slack}</td>
                  <td className="p-2">{status.trello}</td>
                  <td className="p-2">{status.email}</td>
                  <td className="p-2">{status.sentry}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeedbackDashboard;
