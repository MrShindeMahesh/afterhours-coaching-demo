import { useState } from 'react';
import * as I from 'lucide-react';

const COURSES = ['JEE 2027', 'NEET 2027', 'MHT-CET', 'Foundation', 'Mathematics', 'Spoken English'];

const COURSE_META = {
    'JEE 2027':       { icon: I.Rocket,       tag: 'Engineering Entrances', color: '#7c6cff', dur: '2-Year Classroom', desc: 'Full-syllabus IIT-JEE prep with problem-solving marathons, PYQ banks and rank-booster weekends.' },
    'NEET 2027':      { icon: I.FlaskConical, tag: 'Medical & Pre-Med',     color: '#19a974', dur: '2-Year Classroom', desc: 'NCERT-first biology, physics & chemistry with weekly mocks designed to mirror the real NEET pattern.' },
    'MHT-CET':        { icon: I.Calculator,   tag: 'Maharashtra State CET', color: '#f59e0b', dur: '1-Year Intensive', desc: 'Rapid revision modules and chapter-wise drills tuned to the MHT-CET blueprint for both PCM & PCB.' },
    'Foundation':     { icon: I.Layers,       tag: 'Classes 8 - 10',        color: '#38bdf8', dur: 'Academic Year',    desc: 'Build rock-solid fundamentals in Maths & Science with concept-first teaching and Olympiad support.' },
    'Mathematics':    { icon: I.BookOpen,     tag: 'XI · XII · Repeaters',  color: '#ef5b63', dur: 'Semester-wise',    desc: 'Structured coaching that turns maths from fear into scoring strength — step-by-step practice included.' },
    'Spoken English': { icon: I.Globe,        tag: 'Confidence & Careers',  color: '#ec4899', dur: '3-Month Batches',  desc: 'Fluency-first sessions with daily speaking practice, pronunciations, group drills and personality building.' },
};

const RESULTS = [
    { name: 'Aditi More',    course: 'JEE',     mark: 'AIR 47 · 99.94 %ile', note: 'IIT Bombay · CSE' },
    { name: 'Omkar Patil',   course: 'NEET',    mark: '720 / 720',            note: 'Govt Medical College' },
    { name: 'Saanvi Patil',  course: 'JEE',     mark: '99.71 %ile',           note: 'IIT Delhi · ECE' },
    { name: 'Rohan Jadhav',  course: 'MHT-CET', mark: '99.8 %ile',            note: 'COEP · Computer Engg.' },
    { name: 'Ishita Pawar',  course: 'NEET',    mark: '668 / 720',            note: 'B.J. Medical College' },
    { name: 'Vedant Shinde', course: 'MHT-CET', mark: '99.4 %ile',            note: 'VJTI · Mechanical' },
];

const FEATURES = [
    { icon: I.Award,          title: 'Elite Faculty',          desc: 'IIT / NIT alumni and 15+ year veterans who teach concepts, not just questions.' },
    { icon: I.Users,          title: 'Small Batches',          desc: 'Maximum 25 students per batch, so every doubt gets personal attention.' },
    { icon: I.ClipboardCheck, title: 'Daily Tests',            desc: 'Topic tests every day and a full mock every week — with instant analytics.' },
    { icon: I.TrendingUp,     title: 'Data-Driven Reports',    desc: 'Monthly scorecards shared with parents through the parent app dashboard.' },
    { icon: I.HeartHandshake, title: '1:1 Mentorship',         desc: 'A dedicated mentor tracks attendance, focus and performance for each student.' },
    { icon: I.Trophy,         title: 'Scholarship up to 100%', desc: 'Merit-cum-means scholarships evaluated through our entrance scholarship test.' },
    { icon: I.Building2,      title: 'Modern Classrooms',      desc: 'Air-conditioned smart classrooms with CCTV and a distraction-free study lounge.' },
    { icon: I.MessageCircle,  title: 'Doubt WhatsApp Groups',  desc: 'Weekday doubt-solving on WhatsApp so no question waits till the next class.' },
];

const STEPS = [
    { icon: I.Search,         title: 'Enquire Online',     desc: 'Fill the form or WhatsApp us. A counsellor calls you back within 24 hours.' },
    { icon: I.CalendarDays,   title: 'Attend a Free Demo', desc: 'Experience a real class with our faculty — online or at our centre.' },
    { icon: I.BadgeCheck,     title: 'Counselling & Join', desc: 'Get a learning roadmap, batch placement and scholarship assessment.' },
    { icon: I.TrendingUp,     title: 'Track Progress',     desc: 'Follow attendance, tests and reports on the parent portal throughout the year.' },
];

const TESTIMONIALS = [
    { name: 'Rahul Kulkarni',    role: 'Parent · JEE 2027 batch',  text: 'The daily test routine and monthly reports changed how we could help our son at home. The faculty genuinely cares about every child.' },
    { name: 'Aarav Kulkarni',    role: 'JEE 2026 · AIR 47',        text: 'Small batch size meant my doubts were never skipped. Weekly mocks under real exam conditions took the pressure off on the actual day.' },
    { name: 'Sneha Patil',       role: 'Parent · NEET 2027 batch', text: 'I get a WhatsApp summary after every test. It feels like the academy runs like a professional organisation — very dependable.' },
    { name: 'Ananya Deshmukh',   role: 'NEET 2026 · 668/720',      text: 'NCERT-first approach worked wonders for biology. The faculty breaks every chapter into daily, achievable goals.' },
    { name: 'Vivek Pawar',       role: 'Parent · MHT-CET batch',   text: 'Admissions were hassle-free. They explained the entire scholarship process and my daughter got a 40% fee waiver.' },
    { name: 'Aditya Joshi',      role: 'Spoken English · 2026',    text: 'I used to freeze when speaking English in interviews. Six months here and I cracked a sales job at a reputed firm.' },
];

const FAQS = [
    { q: 'How do I book a free demo class?', a: 'Fill the inquiry form below or WhatsApp us. Our counsellor confirms a slot — online or at the nearest centre — and the demo is completely free with no obligation to join.' },
    { q: 'What is the batch size?', a: 'We cap every batch at 25 students. This keeps the teacher-student ratio healthy and guarantees personal attention, question-level doubt solving and better attendance tracking.' },
    { q: 'Do you offer scholarships?', a: 'Yes. We run a scholarship test every term and offer fee waivers from 10% up to 100% based on merit and family income. Our counsellors will guide you through eligibility.' },
    { q: 'Are classes available online too?', a: 'Yes, most programs can be joined in offline classroom or live online mode. Both include the same daily tests, doubt groups and monthly parent reports.' },
    { q: 'How will parents track performance?', a: 'Parents get a monthly performance report and can view attendance, test scores and fee records in real time on the parent portal — the same dashboard our admin team uses.' },
    { q: 'Do you provide study material?', a: 'Yes, every program includes curated notes, daily practice sheets, previous-year question banks and weekly mock tests — all part of the course fee.' },
];

const NAV_LINKS = [
    ['Programs', '#programs'],
    ['Why Us', '#why'],
    ['Results', '#results'],
    ['Testimonials', '#testimonials'],
    ['FAQ', '#faq'],
];

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
            course: f.get('course'), mode: f.get('mode'),
            message: f.get('message') || '', source: 'Website Landing', status: 'New',
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
            {/* ============ NAVIGATION ============ */}
            <header className="lp-nav">
                <div className="lp-nav-inner">
                    <a className="lp-brand" href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                        <div className="lp-mark">A</div>
                        <div className="lp-brand-text"><b>BRIGHTPATH ACADEMY</b><small>JEE · NEET · MHT-CET Coaching</small></div>
                    </a>
                    <nav className="lp-links">
                        {NAV_LINKS.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
                    </nav>
                    <div className="lp-nav-cta">
                        <button className="lp-ghost" onClick={onLaunch}><I.LogIn size={16} /> Admin Portal</button>
                        <button className="lp-btn lp-btn-primary" onClick={() => goEnquiry('')}><I.Send size={16} /> Enquire Now</button>
                        <button className="lp-burger" onClick={() => setMenu(!menu)} aria-label="Menu">
                            {menu ? <I.X size={22} /> : <I.Menu size={22} />}
                        </button>
                    </div>
                </div>
                {menu && (
                    <div className="lp-mobile-menu">
                        {NAV_LINKS.map(([label, href]) => <a key={label} href={href} onClick={() => setMenu(false)}>{label}</a>)}
                        <button className="lp-btn lp-btn-primary" onClick={onLaunch}><I.LogIn size={16} /> Admin Portal</button>
                        <button className="lp-btn lp-btn-outline" onClick={() => { setMenu(false); goEnquiry(''); }}><I.Send size={16} /> Enquire Now</button>
                    </div>
                )}
            </header>

{/* ============ HERO ============ */}
            <section className="lp-hero" id="top">
                <div className="lp-hero-bg">
                    <div className="lp-orb lp-orb1" />
                    <div className="lp-orb lp-orb2" />
                    <div className="lp-grid-fade" />
                </div>
                <div className="lp-hero-inner">
                    <div className="lp-hero-copy">
                        <span className="lp-pill"><span className="lp-pill-dot" /> Admissions Open for 2027 Batch · Limited Seats</span>
                        <h1>Shape a future your family will be <em>proud of.</em></h1>
                        <p className="lp-hero-sub">
                            BrightPath Academy is a result-driven coaching institute for <b>JEE, NEET, MHT-CET,
                            Foundation, Mathematics &amp; Spoken English</b> — expert faculty, small batches and
                            transparent performance reports, all in one place.
                        </p>
                        <div className="lp-hero-cta">
                            <button className="lp-btn lp-btn-primary lp-btn-lg" onClick={() => goEnquiry('')}>
                                <I.CalendarDays size={18} /> Book a Free Demo Class
                            </button>
                            <button className="lp-btn lp-btn-glass lp-btn-lg" onClick={() => scrollToId('#programs')}>
                                Explore Programs <I.ArrowRight size={17} />
                            </button>
                        </div>
                        <div className="lp-trust">
                            <div className="lp-avatars"><span>AK</span><span>SP</span><span>RP</span><span>+</span></div>
                            <div>
                                <div className="lp-stars">{[...Array(5)].map((_, i) => <I.Star key={i} size={13} fill="currentColor" />)} <b>4.9 / 5</b></div>
                                <small>Trusted by 1,200+ students &amp; parents</small>
                            </div>
                        </div>
                    </div>

                    <div className="lp-hero-visual">
                        <div className="lp-dash-card">
                            <div className="lp-dash-head">
                                <div className="lp-dots"><i /><i /><i /></div>
                                <span>BrightPath · Parent Portal</span>
                            </div>
                            <div className="lp-dash-body">
                                <div className="lp-dash-line"><span>Attendance</span><b>94%</b><div className="lp-bar"><i style={{ width: '94%' }} /></div></div>
                                <div className="lp-dash-line"><span>Test score</span><b>87%</b><div className="lp-bar"><i style={{ width: '87%' }} /></div></div>
                                <div className="lp-dash-line"><span>Batch rank</span><b>#12</b><div className="lp-bar lp-bar2"><i style={{ width: '68%' }} /></div></div>
                            </div>
                            <div className="lp-dash-foot">
                                <span className="lp-chip-green"><I.Check size={12} /> On track</span>
                                <span>Next: Weekly Mock · Sat 10 AM</span>
                            </div>
                        </div>
                        <div className="lp-float lp-float1"><I.Trophy size={16} /><b>AIR 47</b><span>JEE 2026</span></div>
                        <div className="lp-float lp-float2"><I.Zap size={16} /><b>720/720</b><span>NEET 2026 topper</span></div>
                        <div className="lp-float lp-float3"><I.Star size={15} fill="currentColor" /><b>4.9★</b><span>Parent rating</span></div>
                    </div>
                </div>

                <div className="lp-stats">
                    <div><b>12+</b><span>Years of excellence</span></div>
                    <div><b>1,200+</b><span>Students mentored</span></div>
                    <div><b>530+</b><span>Selections in 2026</span></div>
                    <div><b>6</b><span>Result-driven programs</span></div>
                    <div><b>98.6%</b><span>Parent satisfaction</span></div>
                </div>
            </section>

{/* ============ MARQUEE ============ */}
            <div className="lp-marquee">
                <div className="lp-marquee-track">
                    {[...COURSES, 'Daily Tests', 'Small Batches', 'Parent Reports', 'Scholarship up to 100%', 'Doubt WhatsApp Groups']
                        .concat([...COURSES, 'Daily Tests', 'Small Batches', 'Parent Reports', 'Scholarship up to 100%', 'Doubt WhatsApp Groups'])
                        .map((x, i) => <span key={i}><I.Sparkles size={13} /> {x}</span>)}
                </div>
            </div>

            {/* ============ PROGRAMS ============ */}
            <section className="lp-section" id="programs">
                <div className="lp-section-head">
                    <span className="lp-kicker">Our Programs</span>
                    <h2>Find the right path for <em>your goals</em></h2>
                    <p>Every program is built around daily practice, honest feedback and a clear roadmap to exam day.</p>
                </div>
                <div className="lp-cards">
                    {COURSES.map((c) => {
                        const m = COURSE_META[c];
                        const Icon = m.icon;
                        return (
                            <article className="lp-course" key={c} style={{ '--cc': m.color }}>
                                <div className="lp-course-icon" style={{ background: m.color + '1f', color: m.color }}><Icon size={22} /></div>
                                <span className="lp-course-tag">{m.tag}</span>
                                <h3>{c}</h3>
                                <p>{m.desc}</p>
                                <div className="lp-course-meta"><span><I.Clock size={13} /> {m.dur}</span></div>
                                <button className="lp-course-link" onClick={() => goEnquiry(c)}>
                                    Enquire now <I.ArrowUpRight size={16} />
                                </button>
                            </article>
                        );
                    })}
                </div>
            </section>

{/* ============ WHY US ============ */}
            <section className="lp-section lp-section-alt" id="why">
                <div className="lp-section-head">
                    <span className="lp-kicker">Why BrightPath</span>
                    <h2>Coaching that runs like a <em>professional institution</em></h2>
                    <p>Admissions are easy and the journey is transparent. Here is what makes the difference in the classroom.</p>
                </div>
                <div className="lp-feat-grid">
                    {FEATURES.map((ft) => {
                        const Icon = ft.icon;
                        return (
                            <div className="lp-feat" key={ft.title}>
                                <div className="lp-feat-icon"><Icon size={20} /></div>
                                <h3>{ft.title}</h3>
                                <p>{ft.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ============ RESULTS ============ */}
            <section className="lp-section" id="results">
                <div className="lp-section-head">
                    <span className="lp-kicker">Results 2026</span>
                    <h2>Stars from the board at <em>BrightPath</em></h2>
                    <p>From state ranks to perfect scores — our board keeps rewriting the toppers’ list every year.</p>
                </div>
                <div className="lp-result-banner">
                    <div><b>530+</b><span>Selections</span></div>
                    <div><b>41</b><span>Rankers in top 100</span></div>
                    <div><b>99.8%</b><span>Highest MHT-CET %ile</span></div>
                    <div><b>720/720</b><span>Highest NEET score</span></div>
                </div>
                <div className="lp-toppers">
                    {RESULTS.map((r, i) => (
                        <div className="lp-topper" key={r.name}>
                            <div className="lp-topper-rank">{String(i + 1).padStart(2, '0')}</div>
                            <div className="lp-topper-avatar">{r.name.split(' ').map(x => x[0]).join('')}</div>
                            <h3>{r.name}</h3>
                            <span className="lp-topper-course">{r.course}</span>
                            <b className="lp-topper-mark">{r.mark}</b>
                            <small>{r.note}</small>
                            <div className="lp-topper-stars">{[...Array(5)].map((_, k) => <I.Star key={k} size={11} fill="currentColor" />)}</div>
                        </div>
                    ))}
                </div>
            </section>

{/* ============ STEPS ============ */}
            <section className="lp-section lp-steps-wrap">
                <div className="lp-section-head">
                    <span className="lp-kicker">How to Join</span>
                    <h2>From enquiry to enrollment in <em>4 easy steps</em></h2>
                </div>
                <div className="lp-steps">
                    {STEPS.map((s, i) => {
                        const Icon = s.icon;
                        return (
                            <div className="lp-step" key={s.title}>
                                <div className="lp-step-no">{i + 1}</div>
                                <div className="lp-step-icon"><Icon size={20} /></div>
                                <h3>{s.title}</h3>
                                <p>{s.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ============ TESTIMONIALS ============ */}
            <section className="lp-section lp-section-alt" id="testimonials">
                <div className="lp-section-head">
                    <span className="lp-kicker">Testimonials</span>
                    <h2>Loved by students, <em>trusted by parents</em></h2>
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

{/* ============ FAQ ============ */}
            <section className="lp-section" id="faq">
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

            {/* ============ INQUIRY FORM ============ */}
            <section className="lp-section lp-enquiry" id="enquiry">
                <div className="lp-enquiry-inner">
                    <div className="lp-enquiry-left">
                        <span className="lp-kicker">Enquire Now</span>
                        <h2>Get a free demo class &amp; <em>learning roadmap</em></h2>
                        <p>Fill the form and our academic counsellor will call you within 24 hours to understand your goals, suggest the right batch and schedule a demo.</p>
                        <ul className="lp-check-list">
                            <li><I.CheckCircle2 size={18} /> Free demo class — online or at centre</li>
                            <li><I.CheckCircle2 size={18} /> Scholarship assessment up to 100%</li>
                            <li><I.CheckCircle2 size={18} /> Career counselling for JEE / NEET / CET</li>
                            <li><I.CheckCircle2 size={18} /> No hidden fees · Easy instalments</li>
                        </ul>
                        <div className="lp-contact-card">
                            <div className="lp-contact-row"><span><I.MapPin size={16} /></span><div><b>Visit the centre</b><small>2nd Floor, Smart Point, Station Road, Pune 411001</small></div></div>
                            <div className="lp-contact-row"><span><I.Phone size={16} /></span><div><b>Call / WhatsApp</b><small>+91 98XXX XXXXX</small></div></div>
                            <div className="lp-contact-row"><span><I.Clock size={16} /></span><div><b>Timings</b><small>Mon – Sat · 7:00 AM to 9:00 PM</small></div></div>
                        </div>
                    </div>

<div className="lp-form-wrap">
                        {!sent ? (
                            <form className="lp-form" onSubmit={submit}>
                                <h3>Book Your Free Demo</h3>
                                <p className="lp-form-sub">Takes less than a minute. No spam, ever.</p>
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
                                            {COURSES.map((c) => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </label>
                                    <label>Preferred mode
                                        <select name="mode" defaultValue="Offline">
                                            <option>Offline</option>
                                            <option>Online</option>
                                        </select>
                                    </label>
                                    <label>Message <small>(optional)</small>
                                        <input name="message" placeholder="Anything we should know?" />
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
                                    <span><I.CalendarDays size={15} /> Demo: {sent.mode}</span>
                                </div>
                                <div className="lp-success-actions">
                                    <button className="lp-btn lp-btn-glass" onClick={() => setSent(null)}>Submit another inquiry</button>
                                    <button className="lp-btn lp-btn-wa" onClick={() => window.open('https://wa.me/9198XXXXXXXX?text=' + encodeURIComponent(`Hi BrightPath Academy! I just submitted inquiry ${sent.id} for ${sent.course || 'a suitable course'}.`), '_blank')}>
                                        <I.MessageCircle size={16} /> Chat on WhatsApp
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

{/* ============ CTA STRIP ============ */}
            <section className="lp-cta">
                <div className="lp-cta-inner">
                    <h2>Ready to take the first step?</h2>
                    <p>Seats for the 2027 batch are filling fast. Reserve a demo slot today.</p>
                    <div>
                        <button className="lp-btn lp-btn-light" onClick={() => goEnquiry('')}><I.ArrowRight size={17} /> Enquire Now</button>
                        <button className="lp-btn lp-btn-glass" onClick={onLaunch}><I.LogIn size={17} /> Visit the Portal</button>
                    </div>
                </div>
            </section>

            {/* ============ FOOTER ============ */}
            <footer className="lp-footer">
                <div className="lp-footer-inner">
                    <div className="lp-footer-col lp-footer-brand">
                        <a className="lp-brand" href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                            <div className="lp-mark">A</div>
                            <div className="lp-brand-text"><b>BRIGHTPATH ACADEMY</b><small>Trusted coaching since 2014</small></div>
                        </a>
                        <p>Result-driven coaching for JEE, NEET, MHT-CET and beyond — with transparent reporting for every parent.</p>
                        <div className="lp-social">
                            <button onClick={() => window.open('https://instagram.com', '_blank')} aria-label="Instagram"><I.Camera size={16} /></button>
                            <button onClick={() => window.open('https://youtube.com', '_blank')} aria-label="YouTube"><I.PlayCircle size={16} /></button>
                            <button onClick={() => window.open('https://wa.me/9198XXXXXXXX', '_blank')} aria-label="WhatsApp"><I.MessageCircle size={16} /></button>
                            <button onClick={() => window.open('mailto:hello@brightpath.academy', '_blank')} aria-label="Email"><I.Mail size={16} /></button>
                        </div>
                    </div>
                    <div className="lp-footer-col">
                        <h4>Programs</h4>
                        {COURSES.map((c) => <button key={c} onClick={() => goEnquiry(c)}>{c}</button>)}
                    </div>
                    <div className="lp-footer-col">
                        <h4>Quick Links</h4>
                        {NAV_LINKS.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
                        <button onClick={onLaunch}><I.LogIn size={13} /> Admin Portal</button>
                    </div>
                    <div className="lp-footer-col">
                        <h4>Get in Touch</h4>
                        <p><I.MapPin size={14} /> 2nd Floor, Smart Point, Station Road, Pune 411001</p>
                        <p><I.Phone size={14} /> +91 98XXXXXXXX</p>
                        <p><I.Mail size={14} /> hello@brightpath.academy</p>
                        <p><I.Clock size={14} /> Mon – Sat · 7 AM – 9 PM</p>
                    </div>
                </div>
                <div className="lp-footer-bottom">
                    <span>© 2026 BrightPath Academy. All rights reserved.</span>
                    <span>Website powered by <b>AfterHours</b></span>
                </div>
            </footer>
        </div>
    );
}