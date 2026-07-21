import { useState, useEffect, useRef } from "react";
import {
  Mail, Lock, User, Eye, EyeOff, LogOut, Menu, X, Check, Sun, Moon, Upload,
  LayoutDashboard, Crown, BarChart3, Users, Video, Image as ImageIcon,
  Type, FileText, Search, TrendingUp, Brain, Sparkles, Settings, Wand2,
  Clapperboard, Zap, MessageCircle, CalendarClock, CreditCard, Youtube, Plus,
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";

const THEMES = {
  dark: { base: "#0B1210", panel: "#123832", panelLight: "#1D4B43", ink: "#F3EFE8", muted: "#8FA39C", amber: "#F5A524", coral: "#FF5A46" },
  light: { base: "#F7F4EE", panel: "#FFFFFF", panelLight: "#E7E2D6", ink: "#16211D", muted: "#6F7A73", amber: "#C9821A", coral: "#E34A38" },
};

const retentionData = [
  { t: "0%", value: 100 }, { t: "20%", value: 79 }, { t: "40%", value: 76 },
  { t: "60%", value: 63 }, { t: "80%", value: 58 }, { t: "100%", value: 49 },
];

const NAV_ITEMS = [
  { key: "overview", label: "نظرة عامة", icon: LayoutDashboard },
  { key: "intelligence", label: "Hero1 Intelligence", icon: Crown, desc: "مركز القرار الذكي.", features: [
    { title: "مدرّب النمو الذكي", desc: "\"انشر الساعة 8:30 بدل 7\" — نصايح يومية مباشرة." },
    { title: "درجة الفيروسية", desc: "احتمالية انتشار كل فيديو." },
    { title: "كاشف الإرهاق", desc: "بيلاحظ لو بتنشر كتير أوي أو قليل أوي." },
    { title: "تقرير الأسبوع التنفيذي", desc: "ملخص أسبوعي بصوت شخصي." },
  ]},
  { key: "content-engine", label: "محرك المحتوى الذكي", icon: Wand2, isPipeline: true, pipelineTitle: "⚡ إنشاء فيديو يوتيوب كامل",
    steps: ["📥 استيراد", "🧹 تنظيف", "🧠 صياغة", "🎬 سكريبت", "📰 عناوين", "🖼 صورة", "🏷 وسوم", "📋 تصدير"],
    features: [
      { title: "📥 استيراد المحتوى", desc: "مقال، فيديو يوتيوب، PDF، صوت، أو RSS." },
      { title: "🧠 إعادة الصياغة", desc: "12 أسلوب: حكائي، فخم، CNBC، وأكتر." },
      { title: "🎯 مولّد الـ Hooks", desc: "حتى 50 نسخة، كل واحد مقيّم من 100." },
      { title: "🖼 مولّد الصور المصغرة", desc: "فكرة + Prompt + درجة CTR متوقعة." },
      { title: "🤖 باقة بضغطة واحدة", desc: "كل الأدوات تشتغل مرة واحدة." },
    ]},
  { key: "video-studio", label: "استوديو الفيديو الذكي", icon: Clapperboard, isPipeline: true, pipelineTitle: "🤖 AI Production Agent",
    steps: ["📹 تحليل", "✂️ مونتاج", "✨ تحسين", "🖼 صورة", "📰 عنوان", "🚀 نشر"],
    features: [
      { title: "🤖 المونتاج التلقائي", desc: "حذف الصمت والتأتأة تلقائيًا." },
      { title: "🧠 المخرج الذكي", desc: "اكتشاف اللحظات المملة واقتراح القص." },
      { title: "📱 استوديو الـ Shorts", desc: "استخراج أفضل المقاطع تلقائيًا." },
      { title: "🚀 التصدير والنشر", desc: "رفع مباشر لكل المنصات مع جدولة." },
    ]},
  { key: "channel-analysis", label: "تحليل القناة", icon: BarChart3, features: [
    { title: "مخطط المحتوى الذكي", desc: "خطة نشر كاملة لـ 30 يوم." },
    { title: "تقرير الصحة العامة", desc: "اتساق النشر وجودة العناوين." },
  ]},
  { key: "competitors", label: "تحليل المنافسين", icon: Users, features: [
    { title: "وضع المواجهة", desc: "مقارنة مباشرة مع نسبة فوز واضحة." },
    { title: "المراقبة الصامتة", desc: "تنبيه فوري لو منافس غيّر استراتيجيته." },
  ]},
  { key: "videos", label: "تحليل الفيديوهات", icon: Video, features: [
    { title: "محلل الـ Hook", desc: "ترفع أول 30 ثانية، ويقيّمها من 100." },
    { title: "غرفة الطوارئ", desc: "إنقاذ فوري لفيديو ضعيف الأداء." },
  ]},
  { key: "thumbnails", label: "استوديو الصور المصغرة", icon: ImageIcon, features: [
    { title: "الخريطة الحرارية", desc: "فين العين بتروح الأول." },
    { title: "محاكي \"ماذا لو\"", desc: "قارن نسختين قبل النشر." },
  ]},
  { key: "titles", label: "مولّد العناوين", icon: Type, features: [{ title: "تقييم كل عنوان", desc: "قوة الفضول والوضوح." }]},
  { key: "script", label: "مساعد السكريبت", icon: FileText, features: [{ title: "مولّد أول 15 ثانية", desc: "لحظة الـ Hook الحاسمة." }]},
  { key: "keywords", label: "الكلمات المفتاحية", icon: Search, features: [{ title: "فجوة الكلمات المفتاحية", desc: "مطلوبة ومحدش مغطيها." }]},
  { key: "trends", label: "الترندات", icon: TrendingUp, features: [{ title: "اكتشاف مبكر", desc: "قبل ما الترند يبقى مشبع." }]},
  { key: "audience", label: "الجمهور", icon: Brain, features: [{ title: "شخصية الجمهور الكاملة", desc: "العمر والأجهزة وأوقات النشاط." }]},
  { key: "prediction", label: "محرك التوقع", icon: Sparkles, features: [{ title: "محاكي النمو", desc: "غيّر عنصر وشوف التوقع فورًا." }]},
  { key: "settings", label: "الإعدادات", icon: Settings, isSettings: true },
];

function Logo({ c, size = 36, showWordmark = true }) {
  return (
    <div className="flex items-center gap-2.5 shrink-0" dir="ltr">
      <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="96" height="96" rx="26" fill={c.panel} />
        <defs>
          <linearGradient id="curveGrad" x1="18" y1="76" x2="82" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor={c.coral} /><stop offset="1" stopColor={c.amber} />
          </linearGradient>
        </defs>
        <path d="M20 70 C 34 72, 46 66, 54 54 C 64 40, 70 32, 80 24" fill="none" stroke="url(#curveGrad)" strokeWidth="11" strokeLinecap="round" />
        <circle cx="80" cy="24" r="8" fill={c.amber} />
      </svg>
      {showWordmark && <span className="text-xl font-semibold tracking-tight" style={{ color: c.ink }}>Hero<span style={{ color: c.amber }}>1</span> Reach</span>}
    </div>
  );
}

function ThemeToggle({ c, theme, setTheme }) {
  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition" style={{ backgroundColor: c.panelLight }}>
      {theme === "dark" ? <Sun size={17} color={c.amber} /> : <Moon size={17} color={c.panel} />}
    </button>
  );
}

function MomentumRing({ c, score = 78, size = 170 }) {
  const strokeWidth = size * 0.08, radius = (size - strokeWidth) / 2, circumference = 2 * Math.PI * radius, dashOffset = circumference * (1 - score / 100);
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs><linearGradient id="momentumGrad" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor={c.coral} /><stop offset="1" stopColor={c.amber} /></linearGradient></defs>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={c.panelLight} strokeWidth={strokeWidth} />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="url(#momentumGrad)" strokeWidth={strokeWidth} strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={dashOffset} transform={`rotate(-90 ${size / 2} ${size / 2})`} style={{ transition: "stroke-dashoffset 0.8s ease-out" }} />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-bold leading-none" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: size * 0.26, color: c.ink }}>{score}</span>
        <span className="mt-1 text-xs" style={{ color: c.muted }}>مؤشر الزخم</span>
      </div>
    </div>
  );
}

function ToolBox({ c, title, desc, kind = "action" }) {
  const [status, setStatus] = useState("idle");
  const [progress, setProgress] = useState(0);
  const fileRef = useRef(null);
  const [fileName, setFileName] = useState(null);

  useEffect(() => {
    if (status !== "loading") return;
    setProgress(10);
    const iv = setInterval(() => setProgress((p) => (p < 90 ? p + 15 : p)), 150);
    const done = setTimeout(() => { clearInterval(iv); setProgress(100); setTimeout(() => setStatus("done"), 150); }, 900);
    return () => { clearInterval(iv); clearTimeout(done); };
  }, [status]);

  return (
    <div className="tool-card rounded-2xl p-4 transition" style={{ backgroundColor: c.panel }}>
      <p className="mb-1 text-sm font-semibold" style={{ color: c.ink }}>{title}</p>
      <p className="mb-3 text-xs leading-relaxed" style={{ color: c.muted }}>{desc}</p>
      {kind === "upload" && (
        <div onClick={() => fileRef.current?.click()} className="mb-2 flex cursor-pointer flex-col items-center gap-1 rounded-xl border border-dashed py-4 text-xs" style={{ borderColor: c.panelLight, color: c.muted }}>
          <Upload size={16} />
          {fileName || "ارفع ملف"}
          <input ref={fileRef} type="file" className="hidden" onChange={(e) => e.target.files?.[0] && setFileName(e.target.files[0].name)} />
        </div>
      )}
      <button onClick={() => setStatus("loading")} disabled={status === "loading"} className="w-full rounded-full py-1.5 text-xs font-semibold transition hover:opacity-90 active:scale-[0.98] disabled:opacity-50" style={{ backgroundColor: c.amber, color: c.panel }}>
        {status === "loading" ? "جاري..." : status === "done" ? "جرّب تاني" : "شغّل"}
      </button>
      {status === "loading" && <div className="mt-2 h-1 w-full overflow-hidden rounded-full" style={{ backgroundColor: c.panelLight }}><div className="h-full rounded-full" style={{ width: `${progress}%`, backgroundColor: c.amber, transition: "width .15s" }} /></div>}
      {status === "done" && <p className="fade-in mt-2 rounded-lg p-2 text-xs" style={{ backgroundColor: c.base, color: c.ink }}>✓ نتيجة تجريبية جاهزة (هتترابط بذكاء اصطناعي حقيقي بعدين)</p>}
    </div>
  );
}

function PipelineRunner({ c, title, steps }) {
  const [count, setCount] = useState(0);
  const [running, setRunning] = useState(false);
  function start() {
    setRunning(true); setCount(0);
    steps.forEach((_, i) => setTimeout(() => setCount((n) => Math.max(n, i + 1)), (i + 1) * 350));
    setTimeout(() => setRunning(false), steps.length * 350 + 200);
  }
  return (
    <div className="mb-5 rounded-2xl p-4" style={{ backgroundColor: c.panel, border: `1px solid ${c.panelLight}` }}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-sm font-bold" style={{ color: c.ink }}>{title}</p>
        <button onClick={start} disabled={running} className="flex shrink-0 items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold disabled:opacity-60" style={{ backgroundColor: c.amber, color: c.panel }}>
          <Zap size={13} /> {running ? "جاري..." : "ابدأ"}
        </button>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {steps.map((s, i) => (
          <span key={s} className="rounded-full px-2.5 py-1 text-[11px] transition" style={{ backgroundColor: i < count ? c.amber : c.panelLight, color: i < count ? c.panel : c.muted }}>{s}</span>
        ))}
      </div>
    </div>
  );
}

function AddChannelMini({ c }) {
  const [channels, setChannels] = useState([{ id: 1, name: "قناة \"تك عربي\"" }]);
  const [val, setVal] = useState("");
  return (
    <div className="rounded-2xl p-4" style={{ backgroundColor: c.panel }}>
      <p className="mb-2 text-sm font-semibold" style={{ color: c.ink }}>📡 القنوات المربوطة</p>
      {channels.map((ch) => (
        <div key={ch.id} className="mb-1.5 flex items-center gap-2 rounded-lg px-3 py-2 text-xs" style={{ backgroundColor: c.base, color: c.ink }}>
          <Youtube size={14} color={c.coral} /> {ch.name}
        </div>
      ))}
      <div className="mt-2 flex gap-2">
        <input value={val} onChange={(e) => setVal(e.target.value)} placeholder="@اسم القناة" className="flex-1 rounded-lg px-2 py-1.5 text-xs outline-none" style={{ backgroundColor: c.base, color: c.ink, border: `1px solid ${c.panelLight}` }} />
        <button onClick={() => { if (val.trim()) { setChannels((cs) => [...cs, { id: Date.now(), name: val }]); setVal(""); } }} className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold" style={{ backgroundColor: c.panelLight, color: c.ink }}>
          <Plus size={13} /> أضف
        </button>
      </div>
    </div>
  );
}

function OverviewPage({ c }) {
  const quick = [
    { title: "📰 ولّد عنوان الآن", desc: "5 عناوين فورًا من موضوعك.", kind: "action" },
    { title: "🖼 افحص صورة مصغرة", desc: "تقييم فوري قبل النشر.", kind: "upload" },
    { title: "🤖 اسأل مدرّب النمو", desc: "رد فوري مبني على بياناتك.", kind: "action" },
  ];
  return (
    <div className="mx-auto max-w-4xl px-6 py-6">
      <div className="mb-4 flex items-center gap-3 rounded-2xl p-3.5" style={{ backgroundColor: c.panel, border: `1px solid ${c.amber}` }}>
        <Zap size={16} color={c.amber} />
        <p className="text-xs" style={{ color: c.ink }}><strong>لحظة ذهبية:</strong> فيديوك الأخير بينتشر أسرع من المعتاد — ثبّت تعليق دلوقتي.</p>
      </div>
      <div className="mb-6 grid gap-6 md:grid-cols-[auto,1fr]">
        <div className="flex justify-center rounded-2xl p-6" style={{ backgroundColor: c.panel }}><MomentumRing c={c} score={78} /></div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl p-4" style={{ backgroundColor: c.panel }}>
            <p className="text-xs" style={{ color: c.muted }}>المشتركين</p>
            <p className="text-xl font-semibold" style={{ color: c.ink, fontFamily: "'IBM Plex Mono', monospace" }}>142,300</p>
            <p className="mt-0.5 flex items-center gap-1 text-[11px]" style={{ color: c.amber }}><TrendingUp size={11} /> +1,240 الأسبوع ده</p>
          </div>
          <div className="rounded-2xl p-4" style={{ backgroundColor: c.panel }}>
            <p className="text-xs" style={{ color: c.muted }}>إجمالي المشاهدات</p>
            <p className="text-xl font-semibold" style={{ color: c.ink, fontFamily: "'IBM Plex Mono', monospace" }}>8,940,112</p>
          </div>
          <div className="rounded-2xl p-4" style={{ backgroundColor: c.panel }}>
            <p className="flex items-center gap-1 text-xs" style={{ color: c.muted }}><CalendarClock size={11} /> الفيديو الجاي</p>
            <p className="text-sm font-semibold" style={{ color: c.ink }}>الخميس 8:30م</p>
          </div>
          <div className="rounded-2xl p-4" style={{ backgroundColor: c.panel }}>
            <p className="flex items-center gap-1 text-xs" style={{ color: c.muted }}><CreditCard size={11} /> باقتك</p>
            <p className="text-sm font-semibold" style={{ color: c.ink }}>مجانية</p>
          </div>
        </div>
      </div>
      <div className="mb-4 rounded-2xl p-3.5" style={{ backgroundColor: c.panel }}>
        <p className="mb-1 flex items-center gap-1.5 text-xs font-medium" style={{ color: c.ink }}><MessageCircle size={13} color={c.amber} /> أفضل تعليق هذا الأسبوع</p>
        <p className="text-xs" style={{ color: c.muted }}>"أفضل شرح شفته للموضوع ده، ياريت جزء تاني 🙏"</p>
      </div>
      <p className="mb-3 text-sm font-medium" style={{ color: c.ink }}>إجراءات سريعة</p>
      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        {quick.map((q) => <ToolBox key={q.title} c={c} {...q} />)}
      </div>
      <div style={{ height: 180 }} className="mb-6 rounded-2xl p-4" >
        <div className="rounded-2xl p-4 h-full" style={{ backgroundColor: c.panel }}>
        <p className="mb-2 text-xs font-medium" style={{ color: c.ink }}>منحنى الاحتفاظ بالمشاهدين</p>
        <ResponsiveContainer width="100%" height="80%">
          <AreaChart data={retentionData}>
            <defs><linearGradient id="rf" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={c.amber} stopOpacity={0.4} /><stop offset="100%" stopColor={c.amber} stopOpacity={0} /></linearGradient></defs>
            <CartesianGrid stroke={c.panelLight} strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="t" stroke={c.muted} fontSize={10} /><YAxis stroke={c.muted} fontSize={10} width={28} />
            <Tooltip contentStyle={{ backgroundColor: c.base, border: `1px solid ${c.panelLight}` }} />
            <Area type="monotone" dataKey="value" stroke={c.amber} strokeWidth={2} fill="url(#rf)" />
          </AreaChart>
        </ResponsiveContainer>
        </div>
      </div>
      <AddChannelMini c={c} />
    </div>
  );
}

function SettingsPage({ c }) {
  const [tab, setTab] = useState("profile");
  const tabs = [
    { key: "profile", label: "الملف الشخصي" }, { key: "channels", label: "القنوات" },
    { key: "billing", label: "الاشتراك" }, { key: "notifications", label: "الإشعارات" },
    { key: "team", label: "الفريق" }, { key: "help", label: "المساعدة" },
  ];
  return (
    <div className="mx-auto max-w-3xl px-6 py-6">
      <div className="mb-5 flex gap-1 overflow-x-auto border-b pb-px" style={{ borderColor: c.panelLight }}>
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)} className="shrink-0 whitespace-nowrap px-3 py-2 text-xs font-medium transition" style={{ color: tab === t.key ? c.amber : c.muted, borderBottom: tab === t.key ? `2px solid ${c.amber}` : "2px solid transparent" }}>{t.label}</button>
        ))}
      </div>
      <div className="fade-in" key={tab}>
        {tab === "channels" ? <AddChannelMini c={c} /> : tab === "billing" ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {["مجانية", "أساسية", "احترافية", "الوكالات"].map((p, i) => (
              <div key={p} className="rounded-xl p-3 text-center" style={{ backgroundColor: c.panel, border: i === 0 ? `1px solid ${c.amber}` : "1px solid transparent" }}>
                <p className="text-xs font-semibold" style={{ color: c.ink }}>{p}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl p-6 text-center text-xs" style={{ backgroundColor: c.panel, color: c.muted }}>محتوى تبويب "{tabs.find(t=>t.key===tab)?.label}" هيظهر هنا</div>
        )}
      </div>
    </div>
  );
}

function SectionBlock({ c, item }) {
  const Icon = item.icon;
  if (item.isSettings) return <SettingsPage c={c} />;
  return (
    <div className="mx-auto max-w-3xl px-6 py-6">
      {item.isPipeline && <PipelineRunner c={c} title={item.pipelineTitle} steps={item.steps} />}
      {!item.isPipeline && (
        <div className="mb-4 flex items-center gap-2">
          <Icon size={20} color={c.amber} />
          <p className="text-sm" style={{ color: c.muted }}>{item.desc}</p>
        </div>
      )}
      <div className="grid gap-3 sm:grid-cols-2">
        {item.features?.map((f) => <ToolBox key={f.title} c={c} title={f.title} desc={f.desc} kind={f.title.includes("رفع") || f.title.includes("الـ Hook") || f.title.includes("صورة") ? "upload" : "action"} />)}
      </div>
    </div>
  );
}

function TextField({ c, icon: Icon, placeholder, value, onChange, showToggle, visible, onToggle }) {
  return (
    <div className="relative mb-4">
      <Icon size={18} className="absolute right-3 top-1/2 -translate-y-1/2" color={c.muted} />
      <input type={showToggle ? (visible ? "text" : "password") : "text"} required value={value} onChange={onChange} placeholder={placeholder}
        className="w-full rounded-lg py-2.5 pr-10 pl-10 text-sm outline-none" style={{ backgroundColor: c.base, color: c.ink, border: `1px solid ${c.panelLight}` }} />
      {showToggle && <button type="button" onClick={onToggle} className="absolute left-3 top-1/2 -translate-y-1/2">{visible ? <EyeOff size={18} color={c.muted} /> : <Eye size={18} color={c.muted} />}</button>}
    </div>
  );
}

export default function Hero1ReachPreview() {
  const [theme, setTheme] = useState("dark");
  const c = THEMES[theme];
  const [loggedIn, setLoggedIn] = useState(true);
  const [authView, setAuthView] = useState("login");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [activePage, setActivePage] = useState("overview");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => { setMobileNavOpen(false); }, [activePage]);
  function handleLogin(e) { e.preventDefault(); setLoading(true); setTimeout(() => { setLoading(false); setLoggedIn(true); }, 700); }
  function handleRegister(e) { e.preventDefault(); setLoading(true); setTimeout(() => { setLoading(false); setAuthView("login"); }, 700); }

  const activeItem = NAV_ITEMS.find((i) => i.key === activePage);

  const navContent = (
    <>
      <div className="mb-6 flex items-center justify-between px-2">
        <Logo c={c} size={28} />
        <div className="flex items-center gap-2">
          <ThemeToggle c={c} theme={theme} setTheme={setTheme} />
          <button onClick={() => setMobileNavOpen(false)} className="md:hidden"><X size={20} color={c.muted} /></button>
        </div>
      </div>
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const active = activePage === item.key; const Icon = item.icon;
          return (
            <button key={item.key} onClick={() => setActivePage(item.key)} className="flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition"
              style={{ backgroundColor: active ? c.panel : "transparent", color: active ? c.amber : c.muted }}>
              <Icon size={18} />{item.label}
            </button>
          );
        })}
      </nav>
      <button onClick={() => setLoggedIn(false)} className="mt-4 flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm" style={{ color: c.muted }}>
        <LogOut size={18} /> تسجيل الخروج
      </button>
    </>
  );

  return (
    <div dir="rtl" className="min-h-screen" style={{ backgroundColor: c.base, fontFamily: "'IBM Plex Sans Arabic', sans-serif", transition: "background-color .2s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=El+Messiri:wght@600;700&family=IBM+Plex+Sans+Arabic:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&display=swap');
        .tool-card:hover { transform: translateY(-2px); }
        .fade-in { animation: fadeIn .3s ease-out; }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
      `}</style>

      {!loggedIn && (
        <>
          <header className="flex items-center justify-between px-6 py-4">
            <Logo c={c} size={30} /><ThemeToggle c={c} theme={theme} setTheme={setTheme} />
          </header>
          <main className="flex flex-col items-center justify-center px-6 py-14">
            <form onSubmit={authView === "login" ? handleLogin : handleRegister} className="w-full max-w-sm rounded-2xl p-8" style={{ backgroundColor: c.panel }}>
              <h1 className="mb-1 text-2xl font-bold" style={{ color: c.ink, fontFamily: "'El Messiri', sans-serif" }}>{authView === "login" ? "تسجيل الدخول" : "إنشاء حساب جديد"}</h1>
              <p className="mb-6 text-sm" style={{ color: c.muted }}>{authView === "login" ? "أهلًا بيك تاني في Hero1 Reach" : "خطوتك الأولى نحو نمو حقيقي"}</p>
              {authView === "register" && <TextField c={c} icon={User} placeholder="الاسم" value={name} onChange={(e) => setName(e.target.value)} />}
              <TextField c={c} icon={Mail} placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              <TextField c={c} icon={Lock} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} showToggle visible={showPassword} onToggle={() => setShowPassword((v) => !v)} />
              <button type="submit" disabled={loading} className="mt-2 w-full rounded-full py-2.5 font-semibold transition disabled:opacity-60" style={{ backgroundColor: c.amber, color: c.panel }}>
                {loading ? "جاري التحميل..." : authView === "login" ? "دخول" : "إنشاء الحساب"}
              </button>
              <p className="mt-5 text-center text-sm" style={{ color: c.muted }}>
                {authView === "login" ? <>مفيش حساب لسه؟{" "}<button type="button" onClick={() => setAuthView("register")} className="font-medium" style={{ color: c.amber }}>إنشاء حساب جديد</button></>
                  : <>عندك حساب بالفعل؟{" "}<button type="button" onClick={() => setAuthView("login")} className="font-medium" style={{ color: c.amber }}>سجّل دخولك</button></>}
              </p>
            </form>
          </main>
        </>
      )}

      {loggedIn && (
        <div className="flex min-h-screen">
          <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col overflow-y-auto border-l p-4 md:flex" style={{ borderColor: c.panelLight }}>{navContent}</aside>
          {mobileNavOpen && (
            <div className="fixed inset-0 z-50 flex md:hidden">
              <aside className="flex h-full w-72 flex-col overflow-y-auto p-4" style={{ backgroundColor: c.base, borderLeft: `1px solid ${c.panelLight}` }}>{navContent}</aside>
              <div className="flex-1 bg-black/60" onClick={() => setMobileNavOpen(false)} />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between border-b px-4 py-3 md:hidden" style={{ borderColor: c.panelLight }}>
              <div className="flex items-center gap-3"><button onClick={() => setMobileNavOpen(true)}><Menu size={22} color={c.ink} /></button><Logo c={c} size={26} /></div>
              <ThemeToggle c={c} theme={theme} setTheme={setTheme} />
            </div>
            <div className="hidden items-center border-b px-6 py-4 md:flex" style={{ borderColor: c.panelLight }}>
              <h1 className="text-lg font-semibold" style={{ color: c.ink }}>{activeItem.label}</h1>
            </div>
            {activePage === "overview" ? <OverviewPage c={c} /> : <SectionBlock c={c} item={activeItem} />}
          </div>
        </div>
      )}
    </div>
  );
}
