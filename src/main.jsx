import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import * as I from 'lucide-react';
import './styles.css';

const courses = ['JEE 2027', 'NEET 2027', 'MHT-CET', 'Foundation', 'Mathematics', 'Spoken English'];
const nav = [['Dashboard', I.LayoutDashboard], ['Leads', I.UsersRound], ['Students', I.GraduationCap], ['Admissions', I.BadgeCheck], ['Demo Classes', I.CalendarDays], ['Batches', I.Layers], ['Attendance', I.ClipboardCheck], ['Fees', I.CreditCard], ['Tests & Results', I.NotebookTabs], ['Teachers', I.UserRound], ['Parents', I.HeartHandshake], ['WhatsApp', I.MessageCircle], ['Campaigns', I.Send], ['Reviews', I.Star], ['Analytics', I.ChartNoAxesCombined], ['Settings', I.Settings]];
const names = ['Aarav Kulkarni', 'Saanvi Patil', 'Aditya Joshi', 'Ananya Deshmukh', 'Vedant Shinde', 'Ishita Pawar', 'Rohan Jadhav', 'Myra Kulkarni', 'Omkar Patil', 'Aditi More', 'Atharva Joshi', 'Riya Deshmukh', 'Tanmay Pawar', 'Sai Kulkarni', 'Neha Jadhav', 'Kabir More', 'Pranav Patil', 'Mahi Joshi', 'Yash Deshmukh', 'Kiara Pawar'];
const sources = ['Website', 'WhatsApp', 'Instagram', 'Facebook', 'Google', 'Walk-in', 'Referral'];
const statuses = ['New', 'Contacted', 'Demo Scheduled', 'Demo Completed', 'Counselling', 'Admission Won', 'Not Interested', 'Follow-up'];
function seedLeads() { return Array.from({ length: 30 }, (_, i) => ({ id: `LD-${1001 + i}`, name: names[i % names.length], parent: ['Rahul', 'Sneha', 'Vivek', 'Pooja', 'Suresh'][i % 5] + ' ' + ['Kulkarni', 'Patil', 'Joshi', 'Pawar'][i % 4], phone: `+91 9${String(820000000 + i).slice(1)}`, course: courses[i % courses.length], source: sources[i % sources.length], status: statuses[i % statuses.length], counsellor: ['Priya', 'Amit', 'Neha'][i % 3], follow: i % 3 === 0 ? 'Today' : i % 3 === 1 ? 'Tomorrow' : 'Sep 08' })) }
const leadTrend = [{ m: 'Apr', v: 42 }, { m: 'May', v: 58 }, { m: 'Jun', v: 66 }, { m: 'Jul', v: 72 }, { m: 'Aug', v: 91 }, { m: 'Sep', v: 99 }];
const sourceData = [{ name: 'Google', value: 30 }, { name: 'Instagram', value: 24 }, { name: 'Website', value: 18 }, { name: 'WhatsApp', value: 15 }, { name: 'Referral', value: 13 }];
const revenue = [{ m: 'Apr', v: 320000 }, { m: 'May', v: 410000 }, { m: 'Jun', v: 455000 }, { m: 'Jul', v: 510000 }, { m: 'Aug', v: 590000 }, { m: 'Sep', v: 640000 }];
function App() {
    const [page, setPage] = useState('Dashboard'), [sales, setSales] = useState(false), [leads, setLeads] = useState(seedLeads()), [modal, setModal] = useState(null), [toast, setToast] = useState('');
    const [search, setSearch] = useState(''); const [status, setStatus] = useState('All');
    const [attendance, setAttendance] = useState({ Present: 26, Absent: 4, Late: 2 }); const [paid, setPaid] = useState(318000);
    const notify = (x) => { setToast(x); setTimeout(() => setToast(''), 2200) };
    const filtered = useMemo(() => leads.filter(l => (l.name + l.course + l.phone + l.source).toLowerCase().includes(search.toLowerCase()) && (status === 'All' || l.status === status)), [leads, search, status]);
    const addLead = (e) => { e.preventDefault(); const f = new FormData(e.currentTarget); setLeads([{ id: `LD-${1001 + leads.length}`, name: f.get('name'), parent: f.get('parent'), phone: f.get('phone'), course: f.get('course'), source: 'Website', status: 'New', counsellor: 'Priya', follow: 'Tomorrow' }, ...leads]); setModal(null); notify('Lead created successfully'); };
    const navClick = (p) => { setPage(p); setSales(false) };
    return <div className="app">
        <aside className="sidebar"><div className="brand"><div className="mark">A</div><div><b>AFTERHOURS</b><small>Complete Business Solutions</small></div></div><div className="demo-pill">● DEMO DATA</div><nav>{nav.map(([n, Icon]) => <button className={page === n && !sales ? 'active' : ''} onClick={() => navClick(n)} key={n}><Icon size={18} /><span>{n}</span></button>)}</nav><button className="sales" onClick={() => { setSales(true); setPage('Dashboard') }}><I.PlayCircle size={18} /> Sales Demo</button><div className="user"><div className="avatar">MD</div><div><b>Mahesh Demo</b><small>Admin</small></div><I.MoreHorizontal size={18} /></div></aside>
        <main className="main"><header><div><div className="eyebrow">BRIGHTPATH ACADEMY · DEMO</div><h1>{sales ? 'Sales Demo' : page}</h1></div><div className="header-actions"><button className="icon-btn" onClick={() => notify('3 new notifications')}><I.Bell size={19} /><i>3</i></button><button className="outline" onClick={() => setModal('lead')}><I.Plus size={17} /> Add Lead</button><div className="profile">MD</div></div></header>
            {sales ? <SalesDemo notify={notify} /> : <Page page={page} leads={filtered} search={search} setSearch={setSearch} status={status} setStatus={setStatus} setModal={setModal} setLeads={setLeads} notify={notify} attendance={attendance} setAttendance={setAttendance} paid={paid} setPaid={setPaid} />}
        </main>{toast && <div className="toast"><I.CheckCircle2 size={18} />{toast}</div>}
        {modal === 'lead' && <Modal title="Add New Lead" close={() => setModal(null)}><form onSubmit={addLead} className="form"><label>Student name<input name="name" required placeholder="e.g. Aarav Kulkarni" /></label><label>Parent name<input name="parent" required placeholder="Parent name" /></label><label>Phone<input name="phone" required placeholder="+91 98XXXXXXXX" /></label><label>Course<select name="course">{courses.map(c => <option>{c}</option>)}</select></label><button className="primary">Create Lead</button></form></Modal>}
        {modal === 'demo' && <Modal title="Book Free Demo Class" close={() => setModal(null)}><form onSubmit={e => { e.preventDefault(); setModal(null); notify('Demo class booked'); }} className="form"><label>Course<select>{courses.map(c => <option>{c}</option>)}</select></label><label>Student name<input required placeholder="Student name" /></label><label>Parent name<input required placeholder="Parent name" /></label><label>Phone<input required placeholder="+91 98XXXXXXXX" /></label><div className="two"><label>Date<input type="date" required /></label><label>Mode<select><option>Offline</option><option>Online</option></select></label></div><button className="primary">Confirm Demo</button></form></Modal>}
    </div>
}
function Page({ page, leads, search, setSearch, status, setStatus, setModal, setLeads, notify, attendance, setAttendance, paid, setPaid }) {
    if (page === 'Dashboard') return <Dashboard notify={notify} setSales={null} />;
    if (page === 'Leads') return <Leads leads={leads} search={search} setSearch={setSearch} status={status} setStatus={setStatus} setModal={setModal} setLeads={setLeads} notify={notify} />;
    if (page === 'Students') return <Students notify={notify} />;
    if (page === 'Attendance') return <Attendance attendance={attendance} setAttendance={setAttendance} notify={notify} />;
    if (page === 'Fees') return <Fees paid={paid} setPaid={setPaid} notify={notify} />;
    if (page === 'Analytics') return <Analytics />;
    if (page === 'WhatsApp') return <WhatsApp notify={notify} />;
    if (page === 'Demo Classes') return <Demos setModal={setModal} notify={notify} />;
    if (page === 'Batches') return <Batches notify={notify} />;
    if (page === 'Teachers') return <Teachers />;
    if (page === 'Parents') return <Parents notify={notify} />;
    if (page === 'Reviews') return <Reviews notify={notify} />;
    if (page === 'Campaigns') return <Campaigns notify={notify} />;
    if (page === 'Admissions') return <Admissions notify={notify} />;
    if (page === 'Tests & Results') return <Tests />;
    return <Placeholder title={page} />;
}
const Card = ({ children, className = '' }) => <section className={'card ' + className}>{children}</section>;
function Dashboard({ notify }) { return <><div className="hero"><div><span className="tag">● LIVE SALES DEMO</span><h2>More enquiries. Faster follow-ups.<br /><em>More admissions.</em></h2><p>One connected system for admissions, students, fees, attendance and parent communication.</p><button className="primary" onClick={() => notify('Sales demo ready to present')}>Start guided demo <I.ArrowRight size={17} /></button></div><div className="funnel"><div><b>428</b><small>Leads</small></div><span>→</span><div><b>18</b><small>Demo</small></div><span>→</span><div><b>11</b><small>Admissions</small></div></div></div><div className="kpis">{[['Total Leads', '428', '+18.4%', I.UsersRound], ['New Enquiries', '36', '+12.6%', I.Sparkles], ['Demo Classes', '18', '+28.6%', I.CalendarDays], ['Admissions', '11', '+22.2%', I.BadgeCheck], ['Conversion', '30.5%', '+4.2%', I.TrendingUp], ['Pending Fees', '₹1,42,000', '-8.1%', I.CreditCard], ['Active Students', '684', '+7.8%', I.GraduationCap]].map(([a, b, c, Icon]) => <div className="kpi" key={a}><div className="kpi-top"><span>{a}</span><Icon size={17} /></div><strong>{b}</strong><small>{c} vs last month</small></div>)}</div><div className="grid2"><Card><SectionHead title="Lead pipeline" action="Last 6 months" /><div className="chart"><ResponsiveContainer><LineChart data={leadTrend}><XAxis dataKey="m" /><YAxis hide /><Tooltip /><Line type="monotone" dataKey="v" strokeWidth={3} dot={false} /></LineChart></ResponsiveContainer></div></Card><Card><SectionHead title="Lead sources" action="This month" /><div className="donut"><ResponsiveContainer><PieChart><Pie data={sourceData} dataKey="value" innerRadius={58} outerRadius={82} paddingAngle={3}>{sourceData.map((_, i) => <Cell key={i} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer><div><b>428</b><small>Total leads</small></div></div><div className="legend">{sourceData.map(x => <span key={x.name}><i /> {x.name} <b>{x.value}%</b></span>)}</div></Card></div><div className="grid2"><Card><SectionHead title="Today's attention" action="View all" /><div className="tasks">{[['New enquiry', 'Aarav Kulkarni · JEE 2027', '2 min ago'], ['Demo in 2 hours', 'Saanvi Patil · NEET 2027', 'Today, 4:00 PM'], ['Fee overdue', 'Aditya Joshi · ₹8,500', '2 days overdue'], ['Follow-up due', 'Ananya Deshmukh · MHT-CET', 'Today, 11:30 AM']].map(x => <div className="task"><div className="task-dot" /><div><b>{x[0]}</b><small>{x[1]}</small></div><span>{x[2]}</span></div>)}</div></Card><Card><SectionHead title="Conversion funnel" action="August" /><div className="funnel-bars">{[['Enquiries', 428], ['Contacted', 312], ['Demo booked', 146], ['Demo attended', 112], ['Admissions', 71]].map((x, i) => <div><label><span>{x[0]}</span><b>{x[1]}</b></label><div><i style={{ width: (x[1] / 428 * 100) + '%' }} /></div></div>)}</div></Card></div></> }
function SectionHead({ title, action }) { return <div className="section-head"><h3>{title}</h3><button>{action} <I.ChevronDown size={14} /></button></div> }
function Leads({ leads, search, setSearch, status, setStatus, setModal, setLeads, notify }) { return <><div className="page-intro"><div><p>Manage enquiries from every channel and move them toward admission.</p></div><button className="primary" onClick={() => setModal('lead')}><I.Plus size={17} /> Add Lead</button></div><Card><div className="toolbar"><div className="search"><I.Search size={17} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search students, phone, course..." /></div><select value={status} onChange={e => setStatus(e.target.value)}><option>All</option>{statuses.map(s => <option>{s}</option>)}</select><button className="outline"><I.SlidersHorizontal size={16} /> Filters</button></div><div className="table-wrap"><table><thead><tr><th>Student</th><th>Course</th><th>Source</th><th>Status</th><th>Follow-up</th><th>Actions</th></tr></thead><tbody>{leads.map(l => <tr key={l.id}><td><div className="person"><div className="mini-avatar">{l.name.split(' ').map(x => x[0]).join('')}</div><div><b>{l.name}</b><small>{l.parent} · {l.phone}</small></div></div></td><td>{l.course}</td><td><span className="source">{l.source}</span></td><td><span className={'status ' + l.status.toLowerCase().replaceAll(' ', '-')}>{l.status}</span></td><td>{l.follow}</td><td><div className="row-actions"><button title="WhatsApp" onClick={() => notify('WhatsApp preview opened')}><I.MessageCircle size={16} /></button><button title="Call" onClick={() => notify('Call action simulated')}><I.Phone size={16} /></button><button title="Convert" onClick={() => { setLeads(ls => ls.map(x => x.id === l.id ? { ...x, status: 'Admission Won' } : x)); notify(`${l.name} moved to Admission Won`) }}><I.BadgeCheck size={16} /></button></div></td></tr>)}</tbody></table></div></Card></> }
function Students({ notify }) { let students = names.slice(0, 10); return <><div className="page-intro"><p>684 active students across 6 programs and 6 batches.</p><button className="primary" onClick={() => notify('Student profile creation opened')}><I.Plus size={17} /> Add Student</button></div><div className="student-grid">{students.map((n, i) => <Card><div className="student-head"><div className="big-avatar">{n.split(' ').map(x => x[0]).join('')}</div><div><b>{n}</b><small>{courses[i % courses.length]} · Batch {['A', 'B', 'C'][i % 3]}</small></div><I.MoreVertical size={18} /></div><div className="stats"><span><b>{92 - i}%</b>Attendance</span><span><b>{78 + i}%</b>Avg score</span><span><b>₹{(i % 4 + 1) * 6500}</b>Pending</span></div><button className="ghost" onClick={() => notify('Student profile opened')}>View profile <I.ArrowUpRight size={15} /></button></Card>)}</div></> }
function Attendance({ notify }) {
    const [currentDate, setCurrentDate] = useState(2); // Default to Sept 2
    const [view, setView] = useState('Students');
    const [records, setRecords] = useState({});
    const [savedViews, setSavedViews] = useState({}); // Tracks which date/views have been saved

    const teachersList = ['Dr. Amit Rao', 'Neha Kulkarni', 'Rahul Joshi', 'Priya Deshmukh', 'Vivek Patil', 'Snehal More', 'Kunal Shah'];
    const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);
    const startDayOffset = 2; // Sept 1, 2026 is a Tuesday

    const markAttendance = (person, status) => {
        setRecords(prev => ({ ...prev, [`${currentDate}-${person}`]: status }));
        // Optional: if you want them to re-sort automatically when changed AFTER saving, 
        // it will happen automatically because the render uses the latest records.
    };

    const currentList = view === 'Students' ? names : teachersList;

    // 1. Calculate totals for the selected date and view
    const totals = { Present: 0, 'Half Day': 0, Absent: 0 };
    currentList.forEach(n => {
        const status = records[`${currentDate}-${n}`];
        if (status) totals[status]++;
    });

    // 2. Handle Save & trigger sorting
    const handleSave = () => {
        setSavedViews(prev => ({ ...prev, [`${currentDate}-${view}`]: true }));
        notify(`${view} attendance saved & sorted for Sep ${currentDate}`);
    };

    // 3. Determine display list (Sort only if this specific date/view has been saved)
    const isSaved = savedViews[`${currentDate}-${view}`];
    const displayList = [...currentList].sort((a, b) => {
        if (!isSaved) return 0; // Keep original order until saved

        const weight = { 'Present': 1, 'Half Day': 2, 'Absent': 3 };
        const statA = records[`${currentDate}-${a}`];
        const statB = records[`${currentDate}-${b}`];

        const weightA = statA ? weight[statA] : 4; // 4 puts unmarked at the bottom
        const weightB = statB ? weight[statB] : 4;

        return weightA - weightB;
    });

    return (
        <div className="attendance-module">
            <div className="calendar-sidebar">
                <Card>
                    <div className="calendar-header">
                        <button>&lt;</button>
                        <h3>September 2026</h3>
                        <button>&gt;</button>
                    </div>
                    <div className="calendar-grid">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <div key={d} className="cal-day-name">{d}</div>)}
                        {Array.from({ length: startDayOffset }).map((_, i) => <div key={`empty-${i}`} />)}
                        {daysInMonth.map(d => (
                            <button
                                key={d}
                                className={`cal-date ${currentDate === d ? 'active' : ''}`}
                                onClick={() => setCurrentDate(d)}
                            >
                                {d}
                            </button>
                        ))}
                    </div>
                    <div className="cal-summary">
                        <p><strong>{view} overview for Sep {currentDate}</strong></p>
                        <div className="cal-stats">
                            <span style={{ color: '#19a974' }}><b>{totals.Present}</b> Present</span>
                            <span style={{ color: '#f59e0b' }}><b>{totals['Half Day']}</b> Half Day</span>
                            <span style={{ color: '#ef5b63' }}><b>{totals.Absent}</b> Absent</span>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="attendance-details">
                <Card>
                    <div className="view-tabs">
                        <button className={view === 'Students' ? 'active' : ''} onClick={() => setView('Students')}>Students</button>
                        <button className={view === 'Teachers' ? 'active' : ''} onClick={() => setView('Teachers')}>Teachers</button>
                        <button className="primary save-btn" onClick={handleSave}>Save Date</button>
                    </div>

                    <div className="attendance-list">
                        {displayList.map((n) => {
                            const currentStatus = records[`${currentDate}-${n}`];
                            return (
                                <div key={n}>
                                    <div className="person">
                                        <div className="mini-avatar">{n.split(' ').map(x => x[0]).join('')}</div>
                                        <div>
                                            <b>{n}</b>
                                            <small>{view === 'Students' ? 'Batch A' : 'Faculty'}</small>
                                        </div>
                                    </div>
                                    <div className="attendance-buttons">
                                        {['Present', 'Half Day', 'Absent'].map(s => (
                                            <button
                                                key={s}
                                                className={currentStatus === s ? `chosen ${s.replace(' ', '')}` : ''}
                                                onClick={() => markAttendance(n, s)}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </Card>
            </div>
        </div>
    );
} function Fees({ paid, setPaid, notify }) { return <><div className="kpis mini">{[['Collected', '₹3,18,000', I.CircleDollarSign], ['Pending', '₹1,42,000', I.Clock3], ['Overdue', '₹48,500', I.AlertCircle], ['Upcoming', '₹93,500', I.CalendarClock]].map(([a, b, Icon]) => <div className="kpi"><div className="kpi-top"><span>{a}</span><Icon size={17} /></div><strong>{b}</strong><small>Current cycle</small></div>)}</div><Card><SectionHead title="Fee ledger" action="All courses" /><div className="table-wrap"><table><thead><tr><th>Student</th><th>Course</th><th>Total</th><th>Paid</th><th>Pending</th><th>Due</th><th /></tr></thead><tbody>{names.slice(0, 10).map((n, i) => <tr><td><b>{n}</b></td><td>{courses[i % 6]}</td><td>₹45,000</td><td>₹{(45 - (i % 4) * 7) * 1000}</td><td>₹{(i % 4) * 7000}</td><td>Sep {4 + i}</td><td><button className="tiny" onClick={() => { setPaid(p => p + 5000); notify('Payment recorded · ₹5,000') }}>Record payment</button></td></tr>)}</tbody></table></div></Card></> }
function WhatsApp({ notify }) { return <div className="automation"><div className="flow-card"><div className="flow-title"><I.MessageCircle /> New Enquiry <span>ACTIVE</span></div>{['Lead captured', 'Send welcome message', 'Course information', 'Demo invitation', 'Counsellor notification'].map((x, i) => <React.Fragment key={x}><div className="flow-node"><b>{i + 1}</b>{x}<small>{i === 0 ? 'Trigger' : i === 1 ? 'WhatsApp' : 'Automation'}</small></div>{i < 4 && <div className="connector">↓</div>}</React.Fragment>)}<button className="primary full" onClick={() => notify('Workflow test sent successfully')}>Test workflow</button></div><div><Card><SectionHead title="Message preview" action="WhatsApp" /><div className="chat"><div className="bubble">Hi Aarav 👋<br /><br />Thanks for enquiring about <b>JEE 2027</b> at BrightPath Academy.<br /><br />Would you like to attend a <b>FREE demo class</b> this week?</div><small>Delivered · just now</small></div></Card><Card><SectionHead title="Automation library" action="5 active" /><div className="automation-list">{['Demo reminder · 24h + 2h', 'Admission follow-up · 1/3/7 days', 'Fee reminder · due date', 'Inactive student · 7 days'].map(x => <div><I.Workflow size={17} /><span>{x}</span><b>ON</b></div>)}</div></Card></div></div> }
function Demos({ setModal, notify }) { return <><div className="page-intro"><p>10 upcoming demo bookings · reminders are simulated.</p><button className="primary" onClick={() => setModal('demo')}><I.CalendarPlus size={17} /> Book Demo</button></div><Card><div className="demo-list">{names.slice(0, 10).map((n, i) => <div className="demo-row"><div className="date"><b>{String(3 + i).padStart(2, '0')}</b><small>SEP</small></div><div><b>{n}</b><small>{courses[i % 6]} · {i % 2 ? '4:00 PM' : '8:00 AM'} · {i % 2 ? 'Online' : 'Campus'}</small></div><span className={'status ' + (i < 3 ? 'demo-scheduled' : 'new')}>{i < 3 ? 'Scheduled' : 'New'}</span><button className="ghost" onClick={() => notify('Reminder sent to parent')}>Send reminder</button></div>)}</div></Card></> }
function Parents({ notify }) { return <Card><SectionHead title="Parent communication" action="684 parents" /><div className="table-wrap"><table><thead><tr><th>Parent</th><th>Student</th><th>Attendance</th><th>Fees</th><th>Performance</th><th /></tr></thead><tbody>{names.slice(0, 10).map((n, i) => <tr><td><b>{['Rahul', 'Sneha', 'Vivek', 'Pooja'][i % 4]} {n.split(' ')[1]}</b></td><td>{n}</td><td>{92 - i}%</td><td><span className="status admission-won">Paid</span></td><td>{78 + i}%</td><td><button className="tiny" onClick={() => notify('Parent update prepared')}>Send update</button></td></tr>)}</tbody></table></div></Card> }
function Reviews({ notify }) { return <><div className="review-hero"><div><span className="tag">GOOGLE REVIEWS</span><strong>4.8 ★</strong><p>1,284 reviews · +86 this month</p></div><button className="primary" onClick={() => notify('Review request queued')}>Request review</button></div><Card><SectionHead title="Recent reviews" action="All reviews" /><div className="reviews">{['Excellent faculty and very organised communication.', 'My son’s attendance and test updates are finally easy to track.', 'The demo-to-admission process was smooth and professional.'].map((r, i) => <div><div className="stars">★★★★★</div><p>“{r}”</p><b>{['Sneha Patil', 'Rahul Kulkarni', 'Pooja Deshmukh'][i]}</b><small>2 days ago</small></div>)}</div></Card></> }
function Campaigns({ notify }) { return <Card><div className="page-intro"><p>Reach segmented students and parents with automated campaigns.</p><button className="primary" onClick={() => notify('Campaign builder opened')}><I.Plus size={17} /> New campaign</button></div><div className="campaign-grid">{['New Batch Launch', 'Admission Open', 'Scholarship 2027', 'Free Demo Week', 'Referral Drive', 'Exam Prep'].map((x, i) => <div className="campaign"><div className="campaign-icon"><I.Send size={17} /></div><b>{x}</b><small>{['2,840', '1,920', '1,240', '3,410', '860', '2,180'][i]} recipients</small><div><span>Delivered {94 - i}%</span><span>Conv. {8 + i}%</span></div></div>)}</div></Card> }
function Admissions({ notify }) { return <div className="student-grid">{names.slice(0, 8).map((n, i) => <Card><div className="student-head"><div className="big-avatar">{n[0]}</div><div><b>{n}</b><small>{courses[i % 6]} · Admission #{240 + i}</small></div></div><div className="admission-stage"><span>Demo</span><i /> <span>Counselling</span><i /> <b>Won</b></div><button className="ghost" onClick={() => notify('Admission record opened')}>View admission</button></Card>)}</div> }
function Placeholder({ title }) { return <div className="empty"><I.Sparkles size={34} /><h2>{title}</h2><p>This module is ready in the demo architecture. Use the sidebar to explore the working operational modules.</p></div> }
function SalesDemo({ notify }) { const [step, setStep] = useState(0); const steps = [['New enquiry arrives', 'Lead automatically created'], ['WhatsApp triggered', 'Welcome + course info sent'], ['Demo booked', 'Calendar slot confirmed'], ['Reminder sent', '24h + 2h automation'], ['Student admitted', 'Lead converted to student'], ['Attendance recorded', 'Teacher marks present'], ['Fee reminder', 'Payment follow-up sent'], ['Parent updated', 'Performance + attendance shared']]; return <><div className="sales-hero"><div><span className="tag">AFTERHOURS · GUIDED SALES DEMO</span><h2>From first enquiry to<br /><em>long-term retention.</em></h2><p>Show an owner the complete journey in under two minutes.</p></div><div className="sales-counter"><b>{String(step + 1).padStart(2, '0')}</b><span>/ 08</span></div></div><div className="sales-flow">{steps.map((s, i) => <button className={i === step ? 'current' : i < step ? 'done' : ''} onClick={() => setStep(i)}><span>{i < step ? <I.Check size={16} /> : i + 1}</span><div><b>{s[0]}</b><small>{s[1]}</small></div><I.ChevronRight size={17} /></button>)}</div><Card className="demo-screen"><div className="demo-screen-top"><span>SIMULATED LIVE EVENT</span><span>BrightPath Academy</span></div><div className="event"><div className="event-icon"><I.Zap size={25} /></div><div><small>STEP {step + 1} · AUTOMATION</small><h2>{steps[step][0]}</h2><p>{steps[step][1]}</p></div><button className="primary" onClick={() => { if (step < 7) setStep(step + 1); else notify('Sales demo completed') }}>{step < 7 ? 'Next step' : 'Complete demo'} <I.ArrowRight size={17} /></button></div></Card></> }
function Modal({ title, close, children }) { return <div className="overlay"><div className="modal"><div className="modal-head"><h2>{title}</h2><button onClick={close}><I.X /></button></div>{children}</div></div> }

function Batches({ notify }) {
    const [showModal, setShowModal] = useState(false);
    const [batches, setBatches] = useState([
        { name: 'JEE 2027 · Morning', teacher: 'Dr. Amit Rao', room: '101', enrolled: 32, max: 40 },
        { name: 'NEET 2027 · Evening', teacher: 'Neha Kulkarni', room: '102', enrolled: 36, max: 40 },
        { name: 'MHT-CET · Prime', teacher: 'Rahul Joshi', room: '103', enrolled: 28, max: 40 }
    ]);

    const addBatch = (e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        setBatches([{
            name: f.get('name'),
            teacher: 'Assign Teacher',
            room: 'TBD',
            enrolled: 0,
            max: f.get('capacity')
        }, ...batches]);
        setShowModal(false);
        notify('Batch created successfully');
    };

    return (
        <>
            <div className="page-intro">
                <p>Manage batches, schedules, and capacities.</p>
                <button className="primary" onClick={() => setShowModal(true)}><I.Plus size={17} /> Add Batch</button>
            </div>
            <div className="batch-grid">
                {batches.map((b, i) => (
                    <Card key={i}>
                        <div className="batch-head"><div className="batch-icon"><I.Layers size={19} /></div><span>ACTIVE</span></div>
                        <h3>{b.name}</h3>
                        <p>{b.teacher} · Room {b.room}</p>
                        <div className="capacity"><span>Capacity</span><b>{b.enrolled} / {b.max}</b></div>
                        <div className="progress"><i style={{ width: (b.enrolled / b.max * 100) + '%' }} /></div>
                        <button className="ghost" onClick={() => notify('Batch details opened')}>View students <I.ArrowRight size={15} /></button>
                    </Card>
                ))}
            </div>

            {showModal && (
                <Modal title="Create New Batch" close={() => setShowModal(false)}>
                    <form onSubmit={addBatch} className="form">
                        <label>Batch Name<input name="name" required placeholder="e.g. JEE 2027 Morning" /></label>
                        <label>Course<select name="course">{courses.map(c => <option key={c}>{c}</option>)}</select></label>
                        <label>Capacity<input name="capacity" type="number" required defaultValue={40} /></label>
                        <button className="primary">Create Batch</button>
                    </form>
                </Modal>
            )}
        </>
    );
}

function Teachers({ notify }) {
    const [showModal, setShowModal] = useState(false);
    const [teachers, setTeachers] = useState([
        { name: 'Dr. Amit Rao', subject: 'Physics', exp: 8, batches: 1, students: 60, att: 94 },
        { name: 'Neha Kulkarni', subject: 'Chemistry', exp: 9, batches: 2, students: 68, att: 96 },
        { name: 'Rahul Joshi', subject: 'Mathematics', exp: 10, batches: 3, students: 76, att: 92 }
    ]);

    const addTeacher = (e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        setTeachers([{
            name: f.get('name'),
            subject: f.get('subject'),
            exp: f.get('exp'),
            batches: 0,
            students: 0,
            att: 100
        }, ...teachers]);
        setShowModal(false);
        notify('Teacher added successfully');
    };

    return (
        <>
            <div className="page-intro">
                <p>Manage faculty, subjects, and assignments.</p>
                <button className="primary" onClick={() => setShowModal(true)}><I.Plus size={17} /> Add Teacher</button>
            </div>
            <div className="student-grid">
                {teachers.map((t, i) => (
                    <Card key={i}>
                        <div className="student-head">
                            <div className="big-avatar">{t.name.split(' ').map(x => x[0]).join('')}</div>
                            <div><b>{t.name}</b><small>{t.subject} · {t.exp} yrs</small></div>
                        </div>
                        <div className="stats">
                            <span><b>{t.batches}</b>Batches</span>
                            <span><b>{t.students}</b>Students</span>
                            <span><b>{t.att}%</b>Attendance</span>
                        </div>
                    </Card>
                ))}
            </div>

            {showModal && (
                <Modal title="Add New Teacher" close={() => setShowModal(false)}>
                    <form onSubmit={addTeacher} className="form">
                        <label>Full Name<input name="name" required placeholder="Teacher name" /></label>
                        <label>Subject<input name="subject" required placeholder="e.g. Physics" /></label>
                        <label>Experience (Years)<input name="exp" type="number" required /></label>
                        <button className="primary">Add Teacher</button>
                    </form>
                </Modal>
            )}
        </>
    );
}

function Tests({ notify }) {
    const [showModal, setShowModal] = useState(false);
    const [tests, setTests] = useState([
        { name: 'JEE Full Test 04', course: 'JEE 2027', avg: 74, topper: 91 },
        { name: 'NEET Biology Sprint', course: 'NEET 2027', avg: 75, topper: 92 },
        { name: 'CET Mock 07', course: 'MHT-CET', avg: 76, topper: 93 }
    ]);

    const testScores = [{ t: 'Jul W1', avg: 68 }, { t: 'Jul W3', avg: 71 }, { t: 'Aug W1', avg: 74 }, { t: 'Aug W3', avg: 78 }, { t: 'Sep W1', avg: 82 }];

    const addTest = (e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        setTests([{
            name: f.get('name'),
            course: f.get('course'),
            avg: 0,
            topper: 0
        }, ...tests]);
        setShowModal(false);
        notify('Test scheduled successfully');
    };

    return (
        <>
            <div className="page-intro">
                <p>Track student performance across all courses.</p>
                <button className="primary" onClick={() => setShowModal(true)}><I.Plus size={17} /> Add Test</button>
            </div>
            <div className="kpis mini">{[['Tests this month', tests.length + 12], ['Avg score', '78%'], ['Topper', '94%'], ['Students tested', '612']].map(([a, b]) => <div className="kpi" key={a}><div className="kpi-top"><span>{a}</span><I.NotebookTabs size={17} /></div><strong>{b}</strong><small>Current cycle</small></div>)}</div>

            <div className="grid2">
                <Card>
                    <SectionHead title="Test Analytics: Avg Scores" action="Last 3 Months" />
                    <div className="chart">
                        <ResponsiveContainer>
                            <LineChart data={testScores}>
                                <XAxis dataKey="t" tick={{ fontSize: 10 }} />
                                <YAxis tick={{ fontSize: 10 }} />
                                <Tooltip />
                                <Line type="monotone" dataKey="avg" stroke="#5b6cff" strokeWidth={3} dot={{ r: 4 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
                <Card>
                    <SectionHead title="Recent tests" action="All tests" />
                    <div className="table-wrap">
                        <table>
                            <thead><tr><th>Test</th><th>Course</th><th>Average</th><th>Topper</th></tr></thead>
                            <tbody>
                                {tests.map((x, i) => (
                                    <tr key={i}><td><b>{x.name}</b></td><td>{x.course}</td><td>{x.avg}%</td><td>{x.topper}%</td></tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>

            {showModal && (
                <Modal title="Schedule Test" close={() => setShowModal(false)}>
                    <form onSubmit={addTest} className="form">
                        <label>Test Name<input name="name" required placeholder="e.g. Weekly Mock 04" /></label>
                        <label>Course<select name="course">{courses.map(c => <option key={c}>{c}</option>)}</select></label>
                        <div className="two">
                            <label>Date<input type="date" required /></label>
                            <label>Total Marks<input name="marks" type="number" required defaultValue={100} /></label>
                        </div>
                        <button className="primary">Schedule Test</button>
                    </form>
                </Modal>
            )}
        </>
    );
}

function Analytics() {
    const attendanceTrend = [{ m: 'Week 1', p: 92, a: 8 }, { m: 'Week 2', p: 95, a: 5 }, { m: 'Week 3', p: 89, a: 11 }, { m: 'Week 4', p: 94, a: 6 }];
    return <>
        <div className="kpis mini">{[['Leads', '428', '+18.4%'], ['Demo → Admission', '63.4%', '+7.2%'], ['Avg. fee', '₹28,400', '+4.1%'], ['Monthly revenue', '₹6.4L', '+12.8%']].map(([a, b, c]) => <div className="kpi" key={a}><div className="kpi-top"><span>{a}</span><I.TrendingUp size={17} /></div><strong>{b}</strong><small>{c}</small></div>)}</div>
        <div className="grid2">
            <Card><SectionHead title="Revenue trend" action="6 months" /><div className="chart"><ResponsiveContainer><BarChart data={revenue}><XAxis dataKey="m" /><YAxis hide /><Tooltip /><Bar dataKey="v" fill="#111" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer></div></Card>
            <Card><SectionHead title="Course performance" action="This year" /><div className="bars">{courses.map((c, i) => <div key={i}><label>{c}<b>{[82, 74, 68, 61, 54, 48][i]}%</b></label><div><i style={{ width: [82, 74, 68, 61, 54, 48][i] + '%' }} /></div></div>)}</div></Card>
        </div>
        <div className="grid2">
            <Card>
                <SectionHead title="Attendance Analytics" action="Last 4 Weeks" />
                <div className="chart">
                    <ResponsiveContainer>
                        <BarChart data={attendanceTrend}>
                            <XAxis dataKey="m" tick={{ fontSize: 10 }} />
                            <YAxis tick={{ fontSize: 10 }} />
                            <Tooltip />
                            <Bar dataKey="p" name="Present %" fill="#19a974" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="a" name="Absent %" fill="#ef5b63" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>
    </>
}

function Settings({ notify }) {
    return (
        <div className="grid2">
            <Card>
                <SectionHead title="Login Management & Users" action="Add User" />
                <div className="table-wrap">
                    <table>
                        <thead><tr><th>User</th><th>Role</th><th>Status</th><th>Actions</th></tr></thead>
                        <tbody>
                            <tr><td><b>Mahesh Shinde</b></td><td>Super Admin</td><td><span className="status admission-won">Active</span></td><td><button className="tiny">Edit</button></td></tr>
                            <tr><td><b>Tejashree Dravyakar</b></td><td>Admin</td><td><span className="status admission-won">Active</span></td><td><button className="tiny">Edit</button></td></tr>
                            <tr><td><b>Dr. Amit Rao</b></td><td>Teacher</td><td><span className="status admission-won">Active</span></td><td><button className="tiny">Edit</button></td></tr>
                            <tr><td><b>Priya Deshmukh</b></td><td>Counsellor</td><td><span className="status demo-scheduled">Inactive</span></td><td><button className="tiny">Edit</button></td></tr>
                        </tbody>
                    </table>
                </div>
            </Card>
            <Card>
                <SectionHead title="Security Settings" action="Update" />
                <form className="form" onSubmit={(e) => { e.preventDefault(); notify('Security settings updated') }}>
                    <label>Require 2FA for Admins <select><option>Enabled</option><option>Disabled</option></select></label>
                    <label>Session Timeout (mins) <input type="number" defaultValue={60} /></label>
                    <label>Password Expiry (days) <input type="number" defaultValue={90} /></label>
                    <button className="primary" style={{ marginTop: '10px' }}>Save Settings</button>
                </form>
            </Card>
        </div>
    )
}

createRoot(document.getElementById('root')).render(<App />);
