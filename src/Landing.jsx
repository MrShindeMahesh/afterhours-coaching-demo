import { useState } from 'react';
import * as I from 'lucide-react';

/* ================= DATA ================= */
const COURSES = [
    { name: 'JEE 2027', icon: I.Rocket, color: '#2b43d9', tag: 'Engineering Entrance', dur: '2-Year Classroom', seats: 'Seats left: 12', intro: 'IIT-JEE Main + Advanced', pts: ['Full syllabus + PYQ banks', 'Weekly JEE-level mocks', 'January 2027 target'] },
    { name: 'NEET 2027', icon: I.FlaskConical, color: '#16a34a', tag: 'Medical Entrance', dur: '2-Year Classroom', seats: 'Seats left: 15', intro: 'NEET-UG 2027', pts: ['NCERT-first biology', '720/720 blueprint mocks', 'April 2027 target'] },
    { name: 'MHT-CET', icon: I.Calculator, color: '#f97316', tag: 'State CET', dur: '1-Year Intensive', seats: 'Seats left: 8', intro: 'MHT-CET (PCM + PCB)', pts: ['Chapter-wise drills', 'Board + CET combo', 'May 2027 target'] },
    { name: 'Foundation', icon: I.Layers, color: '#0891b2', tag: 'Classes 8 - 10', dur: 'Academic Year', seats: 'Seats left: 20', intro: 'Maths · Science · Olympiad', pts: ['Concept-first teaching', 'Olympiad & NTSE prep', 'Build strong basics'] },
    { name: 'Mathematics', icon: I.Percent, color: '#7c3aed', tag: 'XI · XII · Repeaters', dur: 'Semester-wise', seats: 'Seats left: 10', intro: 'Score-booster maths', pts: ['Step-by-step practice', 'Board exam focus', 'Doubt-friendly batches'] },
    { name: 'Spoken English', icon: I.Languages, color: '#db2777', tag: 'Confidence & Careers', dur: '3-Month Batches', seats: 'Seats left: 25', intro: 'Fluency + personality', pts: ['Daily speaking practice', 'Group discussions & GD', 'Interview readiness'] },
];

const WHY_US = [
    { icon: I.Award, title: 'Elite Faculty', desc: 'IIT / NIT alumni and 18+ year veterans who teach concepts, not shortcuts.' },
    { icon: I.Users, title: 'Small Batches (Max 25)', desc: 'Every batch capped at 25 so no doubt is ever left unanswered.' },
    { icon: I.ClipboardCheck, title: 'Daily Practice Tests', desc: 'Topic-wise DPPs every day, full mocks every week with instant analytics.' },
    { icon: I.TrendingUp, title: 'Parent Performance Portal', desc: 'Attendance, scores and rank shared with parents every month — no surprises.' },
    { icon: I.HeartHandshake, title: '1:1 Mentorship', desc: 'A dedicated mentor tracks focus, attendance and progress of each student.' },
    { icon: I.Trophy, title: 'Scholarship Up to 100%', desc: 'Merit-cum-means scholarships through our entrance scholarship test.' },
    { icon: I.MessageCircle, title: 'Doubt WhatsApp Groups', desc: 'Weekday doubt solving on WhatsApp — no question waits till next class.' },
    { icon: I.Building2, title: 'Modern Campus', desc: 'Smart classrooms, AC study halls, labs and a distraction-free library.' },
];

const JOURNEY = [
    { icon: I.CalendarDays, title: 'Book a Free Demo', desc: 'Try a real class with our faculty — online or at the centre, at no cost.' },
    { icon: I.UserCheck, title: 'Scholarship Test', desc: 'Appear for a short assessment and get merit-cum-means scholarships.' },
    { icon: I.BadgeCheck, title: 'Counselling & Admission', desc: 'Get a learning roadmap, batch placement and study kit on admission.' },
    { icon: I.NotebookPen, title: 'Daily Classes + DPPs', desc: 'Concept classes followed by daily practice problems for every topic.' },
    { icon: I.TrendingUp, title: 'Tests & Parent Reports', desc: 'Weekly mocks, rank analytics and a monthly report shared with parents.' },
];

const RESULT_BAND = [
    ['530+', 'Selections in 2026'],
    ['41', 'Rankers in the top 100'],
    ['99.8%', 'Highest MHT-CET %ile'],
    ['720/720', 'Highest NEET score'],
];

const ACHIEVERS = [
    { name: 'Aditi More', initials: 'AM', course: 'JEE', mark: 'AIR 47 · 99.94 %ile', note: 'IIT Bombay · CSE' },
    { name: 'Omkar Patil', initials: 'OP', course: 'NEET', mark: '720 / 720', note: 'Govt Medical College' },
    { name: 'Saanvi Patil', initials: 'SP', course: 'JEE', mark: '99.71 %ile', note: 'IIT Delhi · ECE' },
    { name: 'Rohan Jadhav', initials: 'RJ', course: 'MHT-CET', mark: '99.8 %ile', note: 'COEP · Computer Engg.' },
    { name: 'Ishita Pawar', initials: 'IP', course: 'NEET', mark: '668 / 720', note: 'B.J. Medical College' },
    { name: 'Vedant Shinde', initials: 'VS', course: 'MHT-CET', mark: '99.4 %ile', note: 'VJTI · Mechanical' },
];

const FACULTY = [
    { name: 'Dr. Amit Rao', subj: 'Physics', exp: '18+ years · Ex-FIITJEE', quals: 'PhD, IIT Delhi', initials: 'AR', color: '#2b43d9' },
    { name: 'Neha Kulkarni', subj: 'Chemistry', exp: '12+ years', quals: 'M.Sc., NIT Trichy', initials: 'NK', color: '#7c3aed' },
    { name: 'Rahul Joshi', subj: 'Mathematics', exp: '15+ years · HOD Maths', quals: 'M.Tech, VNIT', initials: 'RJ', color: '#f97316' },
    { name: 'Dr. Sheetal Verma', subj: 'Biology', exp: '11+ years', quals: 'Ph.D, Life Sciences', initials: 'SV', color: '#16a34a' },
];

const CAMPUS = [
    { icon: I.MonitorSmartphone, title: 'Smart Classrooms', desc: 'Digital boards & recorded lectures for revision' },
    { icon: I.Microscope, title: 'Science Labs', desc: 'Physics, chemistry & biology practical support' },
    { icon: I.Library, title: 'Library & Study Hall', desc: 'AC study area with 6,000+ reference books' },
    { icon: I.MessageCircle, title: 'Doubt Room', desc: 'Dedicated doubt counters open every weekday' },
    { icon: I.Wifi, title: 'Wi-Fi Campus', desc: 'High-speed internet + digital practice portal' },
    { icon: I.ShieldCheck, title: 'Safe & Secure', desc: 'CCTV-monitored campus, verified staff, ID cards' },
];

const TESTIMONIALS = [
    { name: 'Rahul Kulkarni', role: 'Parent · JEE 2027', text: 'The daily reports and monthly scorecards changed how we support our son. The academy runs like a professional institution.' },
    { name: 'Aarav Kulkarni', role: 'JEE 2026 · AIR 47', text: 'Small batches meant my doubts were never skipped. The weekly mocks under exam conditions removed all exam-day pressure.' },
    { name: 'Sneha Patil', role: 'Parent · NEET 2027', text: 'I get a WhatsApp summary after every test. Very dependable and transparent — exactly what parents need.' },
    { name: 'Ananya Deshmukh', role: 'NEET 2026 · 668/720', text: 'The NCERT-first biology strategy worked. Every chapter got broken into small daily goals that I could actually achieve.' },
    { name: 'Vivek Pawar', role: 'Parent · MHT-CET', text: 'Scholarship process was crystal clear. My daughter got a 40% fee waiver and joined a batch of just 22 students.' },
    { name: 'Aditya Joshi', role: 'Spoken English 2026', text: 'I used to freeze in interviews. Six months of daily speaking practice and I cracked a job in a reputed firm.' },
];

const FAQS = [
    { q: 'How do I book a free demo class?', a: 'Fill the inquiry form below or WhatsApp us. Our counsellor confirms a slot — online or at the centre — and the demo is completely free with no obligation to join.' },
    { q: 'What is the maximum batch size?', a: 'Every batch is capped at 25 students. This keeps the student-teacher ratio healthy and guarantees personal attention for every doubt.' },
    { q: 'Do you offer scholarships?', a: 'Yes. We run a scholarship test every term and offer waivers from 10% up to 100% based on merit and family income. Our counsellors will guide you through eligibility.' },
    { q: 'Are classes available online too?', a: 'Yes, most programs can be joined in offline classroom or live online mode. Both include the same daily tests, doubt groups and monthly parent reports.' },
    { q: 'How will parents track performance?', a: 'Parents receive a monthly performance report and can view attendance, test scores and fee records on the parent portal in real time.' },
    { q: 'Do you provide study material?', a: 'Yes, every program includes curated notes, daily practice sheets, previous-year question banks and weekly mock tests — all part of the course fee.' },
];

const NAV_LINKS = [
    ['Courses', '#courses'],
    ['Why Us', '#why'],
    ['Results', '#results'],
    ['Faculty', '#faculty'],
    ['Testimonials', '#testimonials'],
    ['FAQ', '#faq'],
];

const PHONE = '+91 98224 56789';
const WHATSAPP_NUM = '919822456789';
const EMAIL = 'admissions@brightpath.academy';

function scrollToId(id) {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Landing({ onLaunch }) {
    const [menu, setMenu] = useState(false);
    const [course, setCourse] = useState('');
    const [openFaq, setOpenFaq] = useState(0);
    const [sent, setSent] = useState(null);
    const [error, setError] = useState('');

    const goEnquiry = (c) => { setCourse(c || ''); setSent(null); scrollToId('#enquiry'); };

    const downloadBrochure = () => {
        const txt = [
            'BRIGHTPATH ACADEMY — ADMISSION BROCHURE 2027-28',
            '================================================='.replace(/=/g, '='),
            '',
            'JEE 2027  |  NEET 2027  |  MHT-CET  |  Foundation  |  Mathematics  |  Spoken English',
            '',
            'Why BrightPath?',
            '• Small batches (max 25) with 1:1 mentorship',
            '• Daily practice tests with instant analytics',
            '• Monthly parent performance portal',
            '• Scholarship up to 100% via entrance test',
            '',
            'Admissions open for batch 2027-28. Limited seats.',
            `Call / WhatsApp: ${PHONE}`,
            `Email: ${EMAIL}`,
            'Visit: Station Road, Pune 411001',
        ].join('\n');
        const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = 'BrightPath-Academy-Brochure.txt'; a.click();
        URL.revokeObjectURL(url);
    };

    const submit = (e) => {
        e.preventDefault();
        setError('');
        const f = new FormData(e.currentTarget);
        const phone = String(f.get('phone') || '').replace(/\D/g, '');
        if (phone.length < 10) { setError('Please enter a valid 10-digit mobile number.'); return; }
        const id = 'BP-' + Date.now().toString(36).toUpperCase().slice(-6);
        const record = {
            id, at: new Date().toISOString(),
            student: f.get('student'), parent: f.get('parent'), phone,
            course: f.get('course'), mode: f.get('mode'), slot: f.get('slot') || '',
            message: f.get('message') || '', source: 'Website', status: 'New',
        };
        try {
            const list = JSON.parse(localStorage.getItem('bp_inquiries') || '[]');
            list.push(record);
            localStorage.setItem('bp_inquiries', JSON.stringify(list));
        } catch (_) { /* storage unavailable — form still succeeds */ }
        setSent(record);
    };

    return (
        <div className="lp">
            {/* ===== Top notice bar ===== */}
            <div className="lp-notice">
                <div className="lp-notice-inner">
                    <span className="lp-notice-txt"><I.Sparkles size={14} /> <b>Admissions Open 2027-28</b> &middot; Limited seats &middot; Scholarship up to 100%</span>
                    <a className="lp-notice-cta" href="#enquiry" onClick={(e) => { e.preventDefault(); goEnquiry(''); }}>Apply Now <I.ArrowRight size={13} /></a>
                </div>
            </div>

            {/* ===== Header ===== */}
            <header className="lp-nav">
                <div className="lp-nav-inner">
                    <a className="lp-brand" href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                        <div className="lp-mark">A</div>
                        <div className="lp-brand-text">
                            <b>BRIGHTPATH ACADEMY</b>
                            <small>JEE · NEET · MHT-CET · Foundation</small>
                        </div>
                    </a>
                    <nav className="lp-links">
                        {NAV_LINKS.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
                    </nav>
                    <div className="lp-nav-cta">
                        <a className="lp-call" href={`tel:${PHONE.replace(/\s/g, '')}`}><I.PhoneCall size={15} /> <b>{PHONE}</b></a>
                        <button className="lp-btn lp-btn-ghost" onClick={onLaunch}><I.LogIn size={15} /> Student Portal</button>
                        <button className="lp-btn lp-btn-primary" onClick={() => goEnquiry('')}><I.Send size={15} /> Enquire Now</button>
                        <button className="lp-burger" onClick={() => setMenu(!menu)} aria-label="Menu">
                            {menu ? <I.X size={22} /> : <I.Menu size={22} />}
                        </button>
                    </div>
                </div>
                {menu && (
                    <div className="lp-mobile-menu">
                        {NAV_LINKS.map(([label, href]) => <a key={label} href={href} onClick={() => setMenu(false)}>{label}</a>)}
                        <a className="lp-m-call" href={`tel:${PHONE.replace(/\s/g, '')}`}><I.PhoneCall size={15} /> Call {PHONE}</a>
                        <button className="lp-btn lp-btn-primary" onClick={onLaunch}><I.LogIn size={15} /> Student Portal</button>
                        <button className="lp-btn lp-btn-outline" onClick={() => { setMenu(false); goEnquiry(''); }}><I.Send size={15} /> Enquire Now</button>
                    </div>
                )}
            </header>

{/* ===== Hero ===== */}
            <section className="lp-hero" id="top">
                <div className="lp-hero-bg" />
                <div className="lp-hero-inner">
                    <div className="lp-hero-copy">
                        <span className="lp-pill"><span className="lp-pill-dot" /> Admissions Open for Batch 2027-28</span>
                        <h1>Coaching that turns <em>hard work</em> into <em>top ranks.</em></h1>
                        <p className="lp-hero-sub">
                            <b>BrightPath Academy</b> is a result-driven coaching institute for <b>JEE, NEET,
                            MHT-CET, Foundation, Mathematics &amp; Spoken English</b> — expert faculty, small
                            batches of 25 and honest performance reports for every parent.
                        </p>
                        <div className="lp-hero-cta">
                            <button className="lp-btn lp-btn-primary lp-btn-lg" onClick={() => goEnquiry('')}>
                                <I.CalendarDays size={18} /> Book a Free Demo Class
                            </button>
                            <a className="lp-btn lp-btn-light lp-btn-lg" href="#courses" onClick={(e) => { e.preventDefault(); scrollToId('#courses'); }}>
                                Explore Courses <I.ArrowRight size={17} />
                            </a>
                            <button className="lp-btn lp-btn-outline lp-btn-lg" onClick={downloadBrochure}>
                                <I.Download size={17} /> Brochure
                            </button>
                        </div>
                        <div className="lp-trust">
                            <div className="lp-avatars"><span>AK</span><span>SP</span><span>RP</span><span>+1200</span></div>
                            <div>
                                <div className="lp-stars">{[...Array(5)].map((_, i) => <I.Star key={i} size={13} fill="currentColor" />)} <b>4.9 / 5</b></div>
                                <small>Rated by 1,200+ students &amp; parents</small>
                            </div>
                            <a className="lp-wa-call" href={`https://wa.me/${WHATSAPP_NUM}`} target="_blank" rel="noreferrer">
                                <I.MessageCircle size={16} /> Chat on WhatsApp
                            </a>
                        </div>
                    </div>

                    <div className="lp-hero-visual">
                        <div className="lp-dash-card">
                            <div className="lp-dash-head">
                                <div><span className="lp-live"><span /> LIVE CLASS</span><b>Physics — Rotational Dynamics</b></div>
                                <div className="lp-dots"><i /><i /><i /></div>
                            </div>
                            <div className="lp-dash-teacher">
                                <div className="lp-tavatar">AR</div>
                                <div><b>Dr. Amit Rao</b><small>Physics · JEE 2027 Batch A</small></div>
                                <span className="lp-chip-blue">32 / 40</span>
                            </div>
                            <div className="lp-dash-body">
                                <div className="lp-dash-line"><span>Chapter coverage</span><b>72%</b><div className="lp-bar"><i style={{ width: '72%' }} /></div></div>
                                <div className="lp-dash-line"><span>Mock test avg. score</span><b>87%</b><div className="lp-bar lp-bar-orange"><i style={{ width: '87%' }} /></div></div>
                            </div>
                            <div className="lp-dash-score">
                                <div className="lp-score-labels"><span>M1</span><span>M2</span><span>M3</span><span>M4</span><span>M5</span></div>
                                <div className="lp-score-bars">
                                    <i style={{ height: '45%' }} /><i style={{ height: '60%' }} /><i style={{ height: '52%' }} /><i style={{ height: '78%' }} /><i style={{ height: '92%' }} />
                                </div>
                            </div>
                            <div className="lp-dash-foot">
                                <span><I.Timer size={13} /> Next mock · Sat 10 AM</span>
                                <span className="lp-chip-green"><I.TrendingUp size={13} /> Rank improving</span>
                            </div>
                        </div>
                        <div className="lp-float lp-float1"><I.Trophy size={15} /><div><b>AIR 47</b><span>JEE 2026 · Aditi M.</span></div></div>
                        <div className="lp-float lp-float2"><I.Zap size={15} /><div><b>720 / 720</b><span>NEET 2026 · Omkar P.</span></div></div>
                        <div className="lp-float lp-float3"><I.BadgeCheck size={15} /><div><b>100% Scholarship</b><span>Merit-cum-means</span></div></div>
                    </div>
                </div>

                <div className="lp-stats">
                    <div><b>12+</b><span>Years of excellence</span></div>
                    <div><b>1,200+</b><span>Students mentored</span></div>
                    <div><b>530+</b><span>Selections in 2026</span></div>
                    <div><b>41</b><span>Rankers in top 100</span></div>
                    <div><b>25</b><span>Max batch size</span></div>
                </div>
            </section>

{/* ===== Courses ===== */}
            <section className="lp-section" id="courses">
                <div className="lp-section-head">
                    <span className="lp-kicker">Our Courses</span>
                    <h2>Choose your goal. <em>We take it from here.</em></h2>
                    <p>Every program runs on the same proven system — small batches, daily practice, weekly tests and monthly parent reports.</p>
                </div>
                <div className="lp-cards">
                    {COURSES.map((c) => {
                        const Icon = c.icon;
                        return (
                            <article className="lp-course" key={c.name} style={{ '--cc': c.color }}>
                                <div className="lp-course-top">
                                    <div className="lp-course-icon" style={{ background: c.color + '14', color: c.color }}><Icon size={22} /></div>
                                    <span className="lp-course-tag" style={{ background: c.color + '14', color: c.color }}>{c.tag}</span>
                                </div>
                                <h3>{c.name}</h3>
                                <p className="lp-course-intro">{c.intro}</p>
                                <div className="lp-course-meta">
                                    <span><I.Clock size={13} /> {c.dur}</span>
                                    <span><I.Users size={13} /> {c.seats}</span>
                                </div>
                                <ul className="lp-course-pts">
                                    {c.pts.map((pt) => <li key={pt}><I.CheckCircle2 size={15} /> {pt}</li>)}
                                </ul>
                                <div className="lp-course-foot">
                                    <button className="lp-btn lp-btn-outline lp-btn-sm" onClick={() => goEnquiry(c.name)}>Enquire</button>
                                    <span className="lp-course-fee-pill">Free Demo Available</span>
                                </div>
                            </article>
                        );
                    })}
                </div>
                <div className="lp-courses-cta">
                    <p>Not sure which course fits your goal? Talk to a counsellor for free.</p>
                    <div>
                        <button className="lp-btn lp-btn-primary" onClick={() => goEnquiry('')}><I.UserCheck size={16} /> Get Free Counselling</button>
                        <a className="lp-btn lp-btn-outline" href={`tel:${PHONE.replace(/\s/g, '')}`}><I.PhoneCall size={16} /> {PHONE}</a>
                    </div>
                </div>
            </section>

{/* ===== Why us ===== */}
            <section className="lp-section lp-section-alt" id="why">
                <div className="lp-section-head">
                    <span className="lp-kicker">Why BrightPath</span>
                    <h2>The coaching parents <em>actually trust</em></h2>
                    <p>Running like a professional institution — not a tuition class. That is the difference you will feel on day one.</p>
                </div>
                <div className="lp-feat-grid">
                    {WHY_US.map((ft, i) => {
                        const Icon = ft.icon;
                        return (
                            <div className="lp-feat" key={ft.title}>
                                <div className="lp-feat-top">
                                    <div className="lp-feat-icon"><Icon size={20} /></div>
                                    <span className="lp-feat-no">{String(i + 1).padStart(2, '0')}</span>
                                </div>
                                <h3>{ft.title}</h3>
                                <p>{ft.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ===== Journey ===== */}
            <section className="lp-section lp-journey-row" id="join">
                <div className="lp-journey-grid">
                    {JOURNEY.map((s, i) => {
                        const Icon = s.icon;
                        return (
                            <div className="lp-journey" key={s.title}>
                                <div className="lp-journey-top">
                                    <span className="lp-journey-no">{i + 1}</span>
                                    <div className="lp-journey-icon"><Icon size={20} /></div>
                                </div>
                                <h3>{s.title}</h3>
                                <p>{s.desc}</p>
                            </div>
                        );
                    })}
                </div>
                <div className="lp-journey-title">
                    <span className="lp-kicker">Your Journey</span>
                    <h2>From first demo to <em>final results</em> — one clear path.</h2>
                    <p>No confusion, no hidden steps. This is exactly how a student moves from enquiry to a successful exam day.</p>
                    <button className="lp-btn lp-btn-primary" onClick={() => goEnquiry('')}><I.Send size={16} /> Start My Journey</button>
                </div>
            </section>

{/* ===== Results ===== */}
            <section className="lp-section" id="results">
                <div className="lp-section-head">
                    <span className="lp-kicker">Results 2026</span>
                    <h2>Results that speak <em>louder than promises</em></h2>
                    <p>Every year our board rewrites the toppers' list. Here is what the class of 2026 achieved.</p>
                </div>
                <div className="lp-result-banner">
                    {RESULT_BAND.map(([num, label]) => <div key={label}><b>{num}</b><span>{label}</span></div>)}
                </div>
                <div className="lp-toppers">
                    {ACHIEVERS.map((r, i) => (
                        <div className="lp-topper" key={r.name}>
                            <div className="lp-topper-rank">#{String(i + 1).padStart(2, '0')}</div>
                            <div className="lp-topper-avatar" style={{ background: 'linear-gradient(135deg, #2b43d9, #3d5cff)' }}>{r.initials}</div>
                            <h3>{r.name}</h3>
                            <span className="lp-topper-course" style={{ color: '#16a34a', background: '#e8f8ef', borderColor: '#bfe9d2' }}>{r.course}</span>
                            <b className="lp-topper-mark">{r.mark}</b>
                            <small>{r.note}</small>
                            <div className="lp-topper-stars">{[...Array(5)].map((_, k) => <I.Star key={k} size={11} fill="currentColor" />)}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== Scholarship ===== */}
            <section className="lp-section lp-scholarship-wrap">
                <div className="lp-scholarship">
                    <div className="lp-scholarship-copy">
                        <span className="lp-schol-badge"><I.Award size={14} /> Scholarship Program</span>
                        <h2>Scholarship up to <em>100%</em> on your course fee</h2>
                        <p>Merit-cum-means scholarships awarded through a simple entrance test. Because talent should never be limited by fees.</p>
                        <ul className="lp-schol-list">
                            <li><I.CheckCircle2 size={17} /> 10% – 100% fee waiver based on merit &amp; family income</li>
                            <li><I.CheckCircle2 size={17} /> Free for EWS / government scheme eligible students</li>
                            <li><I.CheckCircle2 size={17} /> Renewed every year on performance</li>
                        </ul>
                        <div className="lp-schol-ctas">
                            <button className="lp-btn lp-btn-light" onClick={() => goEnquiry('')}><I.BadgeCheck size={16} /> Check My Scholarship</button>
                            <a className="lp-btn lp-btn-ghost-light" href={`https://wa.me/${WHATSAPP_NUM}`} target="_blank" rel="noreferrer"><I.MessageCircle size={16} /> Ask on WhatsApp</a>
                        </div>
                    </div>
                    <div className="lp-schol-card">
                        <div className="lp-schol-num"><b>100</b><span>%</span></div>
                        <div className="lp-schol-discounts">
                            <div><b>90-100%</b><span>Top merit scorer</span></div>
                            <div><b>60-89%</b><span>Merit</span></div>
                            <div><b>30-59%</b><span>Merit-cum-means</span></div>
                            <div><b>10-29%</b><span>Consistency</span></div>
                        </div>
                        <p className="lp-schol-note">Average scholarship awarded this year: <b>42% off</b></p>
                    </div>
                </div>
            </section>

{/* ===== Faculty ===== */}
            <section className="lp-section lp-section-alt" id="faculty">
                <div className="lp-section-head">
                    <span className="lp-kicker">Our Faculty</span>
                    <h2>Learn from people who <em>cracked the system</em></h2>
                    <p>Our faculty are not just teachers — they are exam strategists with years of classroom experience.</p>
                </div>
                <div className="lp-faculty-grid">
                    {FACULTY.map((f) => (
                        <div className="lp-faculty" key={f.name}>
                            <div className="lp-faculty-avatar" style={{ background: f.color }}>{f.initials}</div>
                            <h3>{f.name}</h3>
                            <span className="lp-faculty-subj">{f.subj}</span>
                            <p>{f.exp}</p>
                            <small><I.BadgeCheck size={13} /> {f.quals}</small>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== Campus ===== */}
            <section className="lp-section lp-campus-wrap">
                <div className="lp-campus-head">
                    <div>
                        <span className="lp-kicker">Inside Our Campus</span>
                        <h2>A campus built for <em>focused learning</em></h2>
                    </div>
                    <p>Purpose-built classrooms and facilities so students can study, practice and grow — all under one roof.</p>
                </div>
                <div className="lp-campus-grid">
                    {CAMPUS.map((a) => {
                        const Icon = a.icon;
                        return (
                            <div className="lp-campus" key={a.title}>
                                <div className="lp-campus-icon"><Icon size={20} /></div>
                                <div><h3>{a.title}</h3><p>{a.desc}</p></div>
                            </div>
                        );
                    })}
                </div>
            </section>

{/* ===== Testimonials ===== */}
            <section className="lp-section" id="testimonials">
                <div className="lp-section-head">
                    <span className="lp-kicker">Testimonials</span>
                    <h2>Loved by students, <em>trusted by parents</em></h2>
                    <p>Real words from the people who have walked the journey with us.</p>
                </div>
                <div className="lp-testi-grid">
                    {TESTIMONIALS.map((t) => (
                        <figure className="lp-testi" key={t.name}>
                            <I.Quote size={22} className="lp-quote" />
                            <div className="lp-stars">{[...Array(5)].map((_, i) => <I.Star key={i} size={12} fill="currentColor" />)}</div>
                            <blockquote>“{t.text}”</blockquote>
                            <figcaption>
                                <div className="lp-testi-avatar">{t.name.split(' ').map(x => x[0]).join('')}</div>
                                <div><b>{t.name}</b><small>{t.role}</small></div>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </section>

            {/* ===== FAQ ===== */}
            <section className="lp-section lp-section-alt" id="faq">
                <div className="lp-section-head">
                    <span className="lp-kicker">FAQ</span>
                    <h2>Questions parents <em>usually ask</em></h2>
                </div>
                <div className="lp-faq">
                    {FAQS.map((f, i) => (
                        <div className={'lp-faq-item' + (openFaq === i ? ' open' : '')} key={f.q}>
                            <button className="lp-faq-q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                                <span>{f.q}</span>
                                <I.ChevronDown size={18} />
                            </button>
                            {openFaq === i && <div className="lp-faq-a"><p>{f.a}</p></div>}
                        </div>
                    ))}
                </div>
            </section>

{/* ===== Enquiry form ===== */}
            <section className="lp-section lp-enquiry" id="enquiry">
                <div className="lp-enquiry-inner">
                    <div className="lp-enquiry-left">
                        <span className="lp-kicker">Enquire Now</span>
                        <h2>Book a free demo class &amp; <em>learning roadmap</em></h2>
                        <p>Fill the form and our academic counsellor will call you within 24 hours to understand your goals, suggest the right batch and schedule a demo.</p>
                        <ul className="lp-check-list">
                            <li><I.CheckCircle2 size={18} /> Free demo class — online or at the centre</li>
                            <li><I.CheckCircle2 size={18} /> Scholarship assessment up to 100%</li>
                            <li><I.CheckCircle2 size={18} /> Career counselling for JEE / NEET / CET</li>
                            <li><I.CheckCircle2 size={18} /> No hidden fees · Easy instalments</li>
                        </ul>
                        <div className="lp-contact-card">
                            <div className="lp-contact-row"><span><I.MapPin size={16} /></span><div><b>Visit the centre</b><small>2nd Floor, Smart Point, Station Road, Pune 411001</small></div></div>
                            <div className="lp-contact-row"><span><I.PhoneCall size={16} /></span><div><b>Call / WhatsApp</b><small>{PHONE}</small></div></div>
                            <div className="lp-contact-row"><span><I.Clock size={16} /></span><div><b>Timings</b><small>Mon – Sat · 7:00 AM to 9:00 PM</small></div></div>
                            <div className="lp-contact-row"><span><I.Mail size={16} /></span><div><b>Email</b><small>{EMAIL}</small></div></div>
                        </div>
                    </div>

<div className="lp-form-wrap">
                        {!sent ? (
                            <form className="lp-form" onSubmit={submit}>
                                <div className="lp-form-head">
                                    <div>
                                        <h3>Book Your Free Demo</h3>
                                        <p className="lp-form-sub">Takes less than a minute. No spam, ever.</p>
                                    </div>
                                    <span className="lp-form-chips"><I.ShieldCheck size={14} /> 100% Safe</span>
                                </div>
                                <div className="lp-form-grid">
                                    <label>Student name *
                                        <input name="student" required placeholder="e.g. Aarav Kulkarni" />
                                    </label>
                                    <label>Parent name
                                        <input name="parent" placeholder="e.g. Rahul Kulkarni" />
                                    </label>
                                    <label>Mobile number *
                                        <input name="phone" type="tel" required maxLength="13" placeholder="+91 98XXXXXXXX" />
                                    </label>
                                    <label>Course of interest
                                        <select name="course" value={course} onChange={(e) => setCourse(e.target.value)}>
                                            <option value="">Not sure yet — recommend me</option>
                                            {COURSES.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
                                        </select>
                                    </label>
                                    <label>Preferred mode
                                        <select name="mode" defaultValue="Offline">
                                            <option>Offline</option>
                                            <option>Online</option>
                                        </select>
                                    </label>
                                    <label>Preferred slot
                                        <select name="slot" defaultValue="Morning">
                                            <option>Morning (7-9 AM)</option>
                                            <option>Afternoon (2-4 PM)</option>
                                            <option>Evening (5-8 PM)</option>
                                        </select>
                                    </label>
                                </div>
                                {error && <div className="lp-error"><I.X size={15} /> {error}</div>}
                                <button className="lp-btn lp-btn-primary lp-btn-lg lp-form-btn" type="submit">
                                    <I.Send size={17} /> Submit Inquiry
                                </button>
                                <small className="lp-form-note">By submitting, you agree to be contacted by our counsellor. Your data stays private.</small>
                            </form>
                        ) : (
                            <div className="lp-success">
                                <div className="lp-success-icon"><I.CheckCircle2 size={34} /></div>
                                <span className="lp-kicker">Inquiry Received</span>
                                <h3>Thank you, {sent.student.split(' ')[0]}!</h3>
                                <p>Your reference ID is <b>{sent.id}</b>. Our counsellor will call <b>{sent.phone}</b> within 24 hours — usually much sooner.</p>
                                <div className="lp-success-tags">
                                    <span><I.BadgeCheck size={15} /> {sent.course || 'Recommended batch'}</span>
                                    <span><I.CalendarDays size={15} /> Demo: {sent.mode} · {sent.slot}</span>
                                </div>
                                <div className="lp-success-actions">
                                    <button className="lp-btn lp-btn-outline" onClick={() => setSent(null)}>Submit another inquiry</button>
                                    <a className="lp-btn lp-btn-wa" href={`https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(`Hi BrightPath Academy! I just submitted inquiry ${sent.id} for ${sent.course || 'a suitable course'}.`)}`} target="_blank" rel="noreferrer">
                                        <I.MessageCircle size={16} /> Chat on WhatsApp
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

{/* ===== Footer ===== */}
            <footer className="lp-footer">
                <div className="lp-footer-inner">
                    <div className="lp-footer-col lp-footer-brand">
                        <a className="lp-brand" href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                            <div className="lp-mark">A</div>
                            <div className="lp-brand-text"><b>BRIGHTPATH ACADEMY</b><small>Trusted coaching since 2014</small></div>
                        </a>
                        <p>Result-driven coaching for JEE, NEET, MHT-CET and beyond — with transparent reporting for every parent.</p>
                        <div className="lp-social">
                            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><I.Camera size={16} /></a>
                            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube"><I.PlayCircle size={16} /></a>
                            <a href={`https://wa.me/${WHATSAPP_NUM}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><I.MessageCircle size={16} /></a>
                            <a href={`mailto:${EMAIL}`} aria-label="Email"><I.Mail size={16} /></a>
                        </div>
                    </div>
                    <div className="lp-footer-col">
                        <h4>Courses</h4>
                        {COURSES.map((c) => <button key={c.name} onClick={() => goEnquiry(c.name)}>{c.name}</button>)}
                    </div>
                    <div className="lp-footer-col">
                        <h4>Quick Links</h4>
                        {NAV_LINKS.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
                        <button onClick={onLaunch}><I.LogIn size={13} /> Student Portal</button>
                    </div>
                    <div className="lp-footer-col">
                        <h4>Contact</h4>
                        <p><I.MapPin size={14} /> 2nd Floor, Smart Point, Station Road, Pune 411001</p>
                        <p><I.PhoneCall size={14} /> {PHONE}</p>
                        <p><I.Mail size={14} /> {EMAIL}</p>
                        <p><I.Clock size={14} /> Mon – Sat · 7 AM – 9 PM</p>
                    </div>
                </div>
                <div className="lp-footer-bottom">
                    <span>© 2026 BrightPath Academy. All rights reserved.</span>
                    <span>Powered by <b>AfterHours</b> · <button onClick={onLaunch}>Admin Portal</button></span>
                </div>
            </footer>

            {/* ===== Floating contact buttons ===== */}
            <div className="lp-float-btns">
                <a className="lp-fab lp-fab-wa" href={`https://wa.me/${WHATSAPP_NUM}`} target="_blank" rel="noreferrer" aria-label="WhatsApp">
                    <I.MessageCircle size={22} />
                </a>
                <a className="lp-fab lp-fab-call" href={`tel:${PHONE.replace(/\s/g, '')}`} aria-label="Call now">
                    <I.PhoneCall size={22} />
                </a>
            </div>

            {/* ===== Mobile sticky bar ===== */}
            <div className="lp-sticky-bar">
                <a href={`tel:${PHONE.replace(/\s/g, '')}`}><I.PhoneCall size={17} /> Call Now</a>
                <a href={`https://wa.me/${WHATSAPP_NUM}`} target="_blank" rel="noreferrer"><I.MessageCircle size={17} /> WhatsApp</a>
                <button onClick={() => goEnquiry('')}><I.Send size={17} /> Enquire</button>
            </div>
        </div>
    );
}