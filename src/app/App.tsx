import { useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import img1 from "@/imports/image-1779172040121.jpg";
import img2 from "@/imports/20260428_013533.jpg";
import img3 from "@/imports/20260428_152533.jpg";
import img4 from "@/imports/20260429_212530.jpg";
import img5 from "@/imports/20260524_135809.jpg";
import img6 from "@/imports/20260530_210611.jpg";
import logoTL from "@/imports/logo_TLI__2_-Photoroom.png";
import advisor1 from "@/imports/WhatsApp_Image_2026-07-13_at_4.02.23_PM.jpeg";
import advisor2 from "@/imports/WhatsApp_Image_2026-07-13_at_4.03.06_PM.jpeg";
import {
  Menu, X, ExternalLink, ChevronDown, Cpu, Zap, Settings,
  Activity, FolderOpen, Code2, FileText, Database,
  ChevronLeft, ChevronRight, BarChart2, TrendingUp,
  Wifi, Radio, Server, ArrowRight, Gift, Heart, Layers, Sun, Moon,
} from "lucide-react";

// ─── SCROLL REVEAL ────────────────────────────────────────────────────────────

function Reveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setVisible(true); return; }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); io.disconnect(); }
      },
      { threshold: 0.06, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal${visible ? " is-visible" : ""}`}>
      {children}
    </div>
  );
}

// ─── THEME TOGGLE ─────────────────────────────────────────────────────────────

type Theme = "dark" | "light";

function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>("dark");
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    if (theme === "light") root.classList.add("light");
    else root.classList.remove("light");
  }, [theme]);
  return [theme, () => setTheme((t) => (t === "dark" ? "light" : "dark"))];
}

// Disable browser scroll restoration so it never resets position on its own
if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

function ThemeToggle({ theme, onToggle, className }: { theme: Theme; onToggle: () => void; className?: string }) {
  return (
    <button
      onClick={onToggle}
      aria-label={theme === "dark" ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
      className={`inline-flex items-center justify-center w-9 h-9 rounded-lg border border-border text-muted-foreground hover:text-[#f5c518] hover:border-[#f5c518]/40 transition-colors ${className ?? ""}`}>
      {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}

// ─── STATIC DATA (no JSX at module level) ───────────────────────────────────

const NAV_LINKS = [
  { label: "Overview",  href: "#overview" },
  { label: "Komponen",  href: "#components" },
  { label: "MQTT",      href: "#mqtt" },
  { label: "Gift Tier", href: "#gifttier" },
  { label: "Pengujian", href: "#testing" },
  { label: "Dokumentasi", href: "#gallery" },
  { label: "Pembimbing", href: "#pembimbing" },
  { label: "Resources", href: "#resources" },
];

const ADVISORS = [
  {
    photo: advisor1,
    role: "Dosen Pembimbing 1",
    name: "A Labib Fardany Faisal, M.T.I.",
    nip: "199304132022031015",
    color: "#f5c518",
  },
  {
    photo: advisor2,
    role: "Dosen Pembimbing 2",
    name: "Mohammad Nur, S.Si., M.T.",
    nip: "198605082019031007",
    color: "#e8605a",
  },
];

const PHOTOS = [
  {
    src: img1,
    alt: "Rangkaian awal – ESP32 dengan motor driver dan relay terhubung ke power supply",
    date: "April 2026",
    caption: "Prototyping awal sistem elektronik Autopong — wiring Arduino, motor driver L298N, relay module, dan switching power supply.",
  },
  {
    src: img2,
    alt: "Sesi pengujian malam hari — setup lengkap dengan laptop dan mekanisme launcher",
    date: "28 April 2026 — 01:35",
    caption: "Pengujian pertama keseluruhan sistem di malam hari. Laptop menjalankan monitoring real-time sementara launcher diuji secara langsung.",
  },
  {
    src: img3,
    alt: "Detail rangkaian mikrokontroler di atas meja kerja — motor driver dan relay modul",
    date: "28 April 2026 — 15:25",
    caption: "Close-up wiring mikrokontroler. Terlihat ESP32, relay 2-channel, motor driver, dan power supply untuk pengujian bench.",
  },
  {
    src: img4,
    alt: "ESP32 menyala dengan LED biru — mikrokontroler utama Autopong",
    date: "29 April 2026 — 21:25",
    caption: "ESP32 development board — otak utama sistem Autopong. LED biru menandakan firmware berhasil di-flash dan berjalan normal.",
  },
  {
    src: img5,
    alt: "Sistem lengkap — corong dengan bola ping-pong dan seluruh rangkaian elektronik",
    date: "24 Mei 2026 — 13:58",
    caption: "Assembly mendekati final. Corong penampung bola ping-pong terpasang, mekanisme launcher aktif, dan semua wiring tersambung ke control box.",
  },
  {
    src: img6,
    alt: "Sistem final Autopong — housing transparan dengan mekanisme launcher",
    date: "30 Mei 2026 — 21:06",
    caption: "Unit final Autopong. Control box menggunakan housing akrilik transparan, corong launcher terpasang rapi pada mekanisme motor DC.",
  },
];

const COMPONENT_DATA = [
  { iconName: "cpu",      name: "ESP32",             role: "Mikrokontroler Utama", spec: "240 MHz dual-core, WiFi & Bluetooth onboard",             color: "#f5c518" },
  { iconName: "zap",      name: "L298N Motor Driver", role: "Driver Motor DC",      spec: "Dual H-Bridge, 2A per channel, 5–35V",                   color: "#e8605a" },
  { iconName: "settings", name: "DC Motor",           role: "Mekanisme Launcher",   spec: "High-RPM motor untuk lontaran bola ping-pong",            color: "#a3b8d8" },
  { iconName: "activity", name: "Relay Module",       role: "Switching Kontrol",    spec: "2-channel relay, 10A 250VAC, opto-isolated",              color: "#f5c518" },
  { iconName: "zap",      name: "Switching PSU",      role: "Catu Daya Sistem",     spec: "5V/12V regulated, arus stabil untuk semua komponen",      color: "#e8605a" },
  { iconName: "cpu",      name: "Corong & Dispenser", role: "Mekanisme Ball Feed",  spec: "Sistem peluncur bola ping-pong otomatis berbasis gravitasi", color: "#a3b8d8" },
];

const TIMELINE = [
  { date: "April 2026",    label: "Fase 1", title: "Desain & Perancangan",   desc: "Perancangan skema elektronik, pemilihan komponen, dan desain mekanisme launcher. Studi literatur sistem peluncur bola otomatis." },
  { date: "28 Apr 2026",   label: "Fase 2", title: "Prototyping & Wiring",   desc: "Perakitan prototype pertama — wiring ESP32, motor driver L298N, relay module, dan power supply. Pengujian bench awal setiap subsistem." },
  { date: "29 Apr 2026",   label: "Fase 3", title: "Firmware & Programming", desc: "Flash firmware ke ESP32. Konfigurasi PWM untuk kontrol kecepatan motor, logika relay, dan pengujian komunikasi serial." },
  { date: "Mei 2026",      label: "Fase 4", title: "Assembly & Integrasi",   desc: "Perakitan mekanikal — pemasangan corong penampung bola, motor launcher, dan housing control box akrilik transparan." },
  { date: "24 Mei 2026",   label: "Fase 5", title: "Pengujian Sistem",       desc: "Pengujian sistem terintegrasi — lontaran bola ping-pong, konsistensi kecepatan, keandalan relay, dan rekap data performa." },
  { date: "30 Mei 2026",   label: "Fase 6", title: "Finalisasi & Dokumentasi", desc: "Finalisasi hardware dan software. Penyusunan laporan Tugas Akhir, dokumentasi foto, dan persiapan presentasi sidang." },
];

const RESOURCE_DATA = [
  { iconName: "file",     title: "Dokumentasi Pengerjaan TA", desc: "Dokumentasi lengkap selama proses pengerjaan Tugas Akhir — foto, catatan, dan progress laporan dari awal hingga akhir.", link: "https://drive.google.com/drive/folders/1S7NoR088X5DaCdLxzM2XtHSusuFoiayk", color: "#f5c518" },
  { iconName: "database", title: "Rekap Data",                desc: "Kumpulan data hasil pengujian Autopong — performa launcher, kecepatan bola, konsistensi lontaran, dan analisis statistik.",     link: "https://drive.google.com/drive/folders/1yPCkfyzhHui20bvpzhG-B7z8Vre1P7Na", color: "#e8605a" },
  { iconName: "code",     title: "Code Autopong",             desc: "Source code firmware ESP32 Autopong — kontrol motor DC, logika relay, konfigurasi PWM, dan sistem peluncur bola ping-pong otomatis.", link: "https://drive.google.com/drive/folders/1gcDdH9tvrbBjdR87syKsXYxbO97XCsRt", color: "#f5c518" },
  { iconName: "folder",   title: "File Tugas Akhir",          desc: "Berkas lengkap Tugas Akhir — laporan, proposal, presentasi, dan semua dokumen resmi yang dibutuhkan untuk sidang.",             link: "https://drive.google.com/drive/folders/1RIH6ZjHhlWI4cnVoScGKPoEC3lEn7qqX", color: "#a3b8d8" },
  { iconName: "file",     title: "Laporan Bimbingan",         desc: "Catatan lengkap proses bimbingan Tugas Akhir bersama dosen pembimbing — progres, revisi, dan arahan di setiap sesi.",           link: "https://bit.ly/4prJZmP", color: "#4ade80" },
  { iconName: "activity", title: "Uji Similarity",            desc: "Hasil pengecekan tingkat kemiripan (plagiarisme) laporan Tugas Akhir untuk memastikan orisinalitas karya tulis.",              link: "https://bit.ly/4wrRqN6", color: "#e8605a" },
];

// ─── CHART DATA ──────────────────────────────────────────────────────────────

const responseTimeData = [
  { name: "Like",         "Lap 1": 6.17, "Lap 2": 6.74, "Lap 3": 5.74, "Lap 4": 4.88 },
  { name: "Gift 1 Koin",  "Lap 1": 7.7,  "Lap 2": 9.82, "Lap 3": 6.21, "Lap 4": 8.29 },
  { name: "Gift 10 Koin", "Lap 1": 6.05, "Lap 2": 8.3,  "Lap 3": 7.05, "Lap 4": 5.96 },
  { name: "Gift 20 Koin", "Lap 1": 8.27, "Lap 2": 4.18, "Lap 3": 5.78, "Lap 4": 7.64 },
];

const giftData = [
  { name: "Gift 1 Koin",  "Data Masuk": 10, Dieksekusi: 10, "Data Loss": 0 },
  { name: "Gift 10 Koin", "Data Masuk": 10, Dieksekusi: 7,  "Data Loss": 3 },
  { name: "Gift 20 Koin", "Data Masuk": 10, Dieksekusi: 10, "Data Loss": 0 },
];

const likeData = [
  { name: "Percobaan 1", "Jumlah Like": 42, Dieksekusi: 39, "Data Loss": 3 },
  { name: "Percobaan 2", "Jumlah Like": 45, Dieksekusi: 41, "Data Loss": 4 },
  { name: "Percobaan 3", "Jumlah Like": 40, Dieksekusi: 37, "Data Loss": 3 },
  { name: "Percobaan 4", "Jumlah Like": 43, Dieksekusi: 39, "Data Loss": 4 },
  { name: "Percobaan 5", "Jumlah Like": 38, Dieksekusi: 34, "Data Loss": 4 },
];

const LINE_COLORS = ["#f5c518", "#e8605a", "#a3b8d8", "#4ade80"];
type TabId = "response" | "gift" | "like";

// ─── SMALL HELPERS ───────────────────────────────────────────────────────────

function Icon({ name, className }: { name: string; className?: string }) {
  const cls = className ?? "w-6 h-6";
  if (name === "cpu")      return <Cpu      className={cls} />;
  if (name === "zap")      return <Zap      className={cls} />;
  if (name === "settings") return <Settings className={cls} />;
  if (name === "activity") return <Activity className={cls} />;
  if (name === "file")     return <FileText className={cls} />;
  if (name === "database") return <Database className={cls} />;
  if (name === "code")     return <Code2    className={cls} />;
  if (name === "folder")   return <FolderOpen className={cls} />;
  return null;
}



// ─── NAVBAR ──────────────────────────────────────────────────────────────────

function Navbar({ theme, onToggleTheme }: { theme: Theme; onToggleTheme: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 flex items-center justify-between h-16">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 group min-w-0 flex-1 mr-2 text-left">
          <ImageWithFallback src={logoTL} alt="Logo Teknik Listrik Poltera" className="w-8 h-8 sm:w-9 sm:h-9 object-contain shrink-0" />
          <div className="flex flex-col leading-none min-w-0">
            <span className="font-['Exo_2'] font-black text-xs sm:text-sm tracking-tight text-[#f5c518] group-hover:text-foreground transition-colors truncate">
              TA Raflie Nurivansyah
            </span>
            <span className="font-['JetBrains_Mono'] text-[9px] sm:text-[10px] text-muted-foreground tracking-wider hidden sm:block truncate">
              D3 TLI · Poltera · 2026
            </span>
          </div>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href}
              className="px-3 py-2 rounded text-sm font-['DM_Sans'] font-medium text-muted-foreground hover:text-[#f5c518] transition-colors">
              {l.label}
            </a>
          ))}
          <ThemeToggle theme={theme} onToggle={onToggleTheme} className="ml-1" />
          <a href="https://raflie-nurivansyah-portfolio-websit.vercel.app/" target="_blank" rel="noopener noreferrer"
            className="ml-2 inline-flex items-center gap-1.5 bg-[#f5c518] text-[#060d1a] font-['DM_Sans'] font-semibold text-sm px-4 py-1.5 rounded hover:bg-[#d9ab0a] transition-colors">
            <ExternalLink className="w-3.5 h-3.5" />
            CV / Portfolio
          </a>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <a href="https://raflie-nurivansyah-portfolio-websit.vercel.app/" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 bg-[#f5c518] text-[#060d1a] font-['DM_Sans'] font-semibold text-xs px-3 py-1.5 rounded hover:bg-[#d9ab0a] transition-colors">
            <ExternalLink className="w-3 h-3" />
            CV
          </a>
          <button className="text-muted-foreground hover:text-foreground p-2"
            onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-card/98 backdrop-blur-sm px-4 py-3 flex flex-col gap-1">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="px-3 py-2 rounded text-sm font-['DM_Sans'] font-medium text-muted-foreground hover:text-[#f5c518] transition-colors">
              {l.label}
            </a>
          ))}
          <div className="pt-2 mt-1 border-t border-border">
            <a href="https://raflie-nurivansyah-portfolio-websit.vercel.app/" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 w-full bg-[#f5c518] text-[#060d1a] font-['DM_Sans'] font-semibold text-sm px-4 py-2.5 rounded hover:bg-[#d9ab0a] transition-colors">
              <ExternalLink className="w-4 h-4" />
              Lihat CV / Portfolio Saya
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden">
      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(245,197,24,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(245,197,24,0.04) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }} />
      {/* Gold glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(245,197,24,0.07) 0%, transparent 70%)" }} />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-8 py-10 sm:py-20 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div>
          {/* Campus identity block — compact on mobile */}
          <div className="flex items-center gap-3 border border-[#f5c518]/25 rounded-xl bg-[#f5c518]/5 px-3 py-2.5 mb-6 w-fit max-w-full">
            <ImageWithFallback src={logoTL} alt="Logo Teknik Listrik Poltera" className="w-9 h-9 sm:w-12 sm:h-12 object-contain shrink-0" />
            <div className="min-w-0">
              <div className="font-['Exo_2'] font-bold text-xs sm:text-sm text-[#f5c518] leading-snug">Politeknik Negeri Madura</div>
              <div className="font-['DM_Sans'] text-[10px] sm:text-xs text-muted-foreground truncate">D3 Teknik Listrik Industri · Poltera</div>
              <div className="font-['JetBrains_Mono'] text-[9px] text-muted-foreground/60 mt-0.5">Tugas Akhir · 2026</div>
            </div>
          </div>

          <h1 className="font-['Exo_2'] font-black text-4xl sm:text-5xl lg:text-6xl leading-none tracking-tight text-foreground mb-3">
            <span className="text-[#f5c518]">AUTO</span>PONG
          </h1>

          <div className="font-['DM_Sans'] text-sm sm:text-base text-muted-foreground mb-1">
            <span className="text-foreground font-semibold">Raflie Nurivansyah</span>
          </div>

          <p className="font-['DM_Sans'] text-sm sm:text-base text-muted-foreground mb-2 leading-relaxed">
            Sistem Peluncur Bola Ping-Pong Otomatis Berbasis{" "}
            <span className="text-[#f5c518] font-medium">ESP32</span>
          </p>
          <p className="font-['DM_Sans'] text-xs sm:text-sm text-muted-foreground/70 mb-7 leading-relaxed max-w-md">
            Perancangan dan implementasi mesin peluncur bola tenis meja otomatis dengan kontrol kecepatan, frekuensi, dan arah menggunakan mikrokontroler ESP32, motor DC, dan sistem relay.
          </p>

          {/* Buttons — 2-col grid on mobile so they fit without wrapping to 3 rows */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3">
            <a href="#overview"
              className="col-span-2 sm:col-span-1 inline-flex items-center justify-center gap-2 bg-[#f5c518] text-[#060d1a] font-['DM_Sans'] font-semibold text-sm px-5 py-2.5 rounded hover:bg-[#d9ab0a] transition-colors">
              Lihat Project <ChevronDown className="w-4 h-4" />
            </a>
            <a href="#resources"
              className="inline-flex items-center justify-center gap-1.5 border border-border text-foreground font-['DM_Sans'] font-medium text-sm px-4 py-2.5 rounded hover:border-[#f5c518]/50 hover:text-[#f5c518] transition-colors">
              Resources <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a href="https://raflie-nurivansyah-portfolio-websit.vercel.app/" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 border border-[#f5c518]/40 text-[#f5c518] font-['DM_Sans'] font-medium text-sm px-4 py-2.5 rounded hover:bg-[#f5c518]/10 transition-colors">
              CV / Portfolio <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Stat cards — tighter on mobile */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { val: "ESP32", label: "Mikrokontroler", sub: "240 MHz Dual-Core" },
            { val: "PWM",   label: "Speed Control",  sub: "Variable freq." },
            { val: "2-CH",  label: "Relay Module",   sub: "Opto-isolated" },
            { val: "DC",    label: "Motor Driver",   sub: "L298N H-Bridge" },
          ].map((s) => (
            <div key={s.label}
              className="border border-border rounded-lg p-3 sm:p-5 bg-card hover:border-[#f5c518]/30 transition-colors group">
              <div className="font-['Exo_2'] font-black text-xl sm:text-2xl text-[#f5c518] group-hover:text-foreground transition-colors mb-1">{s.val}</div>
              <div className="font-['DM_Sans'] font-semibold text-xs sm:text-sm text-foreground mb-0.5">{s.label}</div>
              <div className="font-['JetBrains_Mono'] text-[10px] sm:text-xs text-muted-foreground leading-tight">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground/50">
        <span className="font-['JetBrains_Mono'] text-xs tracking-widest">SCROLL</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
}

// ─── OVERVIEW ────────────────────────────────────────────────────────────────

function Overview() {
  return (
    <section id="overview" className="py-16 sm:py-24 bg-card/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div>
            <div className="font-['JetBrains_Mono'] text-xs text-[#f5c518] tracking-widest mb-4 uppercase">— Overview</div>
            <h2 className="font-['Exo_2'] font-bold text-3xl sm:text-4xl text-foreground mb-6 leading-tight">
              Apa itu <span className="text-[#f5c518]">Autopong?</span>
            </h2>
            <div className="space-y-4 font-['DM_Sans'] text-base text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Autopong</strong> adalah mesin peluncur bola tenis meja (ping-pong) otomatis yang dirancang untuk latihan mandiri. Sistem ini mampu melontarkan bola secara konsisten dengan kecepatan dan frekuensi yang dapat dikontrol secara digital.
              </p>
              <p>
                Dikembangkan sebagai proyek Tugas Akhir, Autopong mengintegrasikan mikrokontroler <span className="text-[#f5c518]">ESP32</span> sebagai unit pemrosesan utama, dua motor DC berkecepatan tinggi untuk mekanisme peluncuran, dan sistem relay untuk kontrol daya.
              </p>
              <p>
                Kontrol kecepatan motor menggunakan teknik <span className="text-[#f5c518]">PWM (Pulse Width Modulation)</span> yang memungkinkan pengguna menyesuaikan kecepatan lontaran bola secara halus dan presisi.
              </p>
            </div>
          </div>

          <div>
            <div className="font-['JetBrains_Mono'] text-xs text-[#f5c518] tracking-widest mb-4 uppercase">— Spesifikasi Singkat</div>
            {[
              { k: "Mikrokontroler",    v: "ESP32 (240 MHz, dual-core, Wi-Fi)" },
              { k: "Motor Peluncur",    v: "DC Motor high-RPM × 2 (sistem roda gesekan)" },
              { k: "Driver Motor",      v: "L298N H-Bridge Dual Motor Driver" },
              { k: "Relay",             v: "2-Channel Relay Module 10A" },
              { k: "Power Supply",      v: "Switching PSU 5V + 12V" },
              { k: "Kontrol Kecepatan", v: "PWM variable (0–100%)" },
              { k: "Mekanisme Feed",    v: "Corong gravitasi + dispenser servo" },
              { k: "Platform Kode",     v: "Arduino IDE / ESP-IDF" },
            ].map(({ k, v }) => (
              <div key={k} className="flex items-start justify-between gap-4 py-3 border-b border-border">
                <span className="font-['JetBrains_Mono'] text-xs text-muted-foreground w-28 sm:w-36 shrink-0">{k}</span>
                <span className="font-['DM_Sans'] text-sm text-foreground text-right">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Components() {
  return (
    <section id="components" className="py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="mb-14">
          <div className="font-['JetBrains_Mono'] text-xs text-[#f5c518] tracking-widest mb-4 uppercase">— Komponen Sistem</div>
          <h2 className="font-['Exo_2'] font-bold text-3xl sm:text-4xl text-foreground mb-3">Hardware yang Digunakan</h2>
          <p className="font-['DM_Sans'] text-muted-foreground max-w-xl">
            Autopong dibangun dari komponen-komponen elektronik yang terpilih secara cermat untuk keandalan dan kontrol presisi.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {COMPONENT_DATA.map((c) => (
            <div key={c.name}
              className="border border-border rounded-xl p-4 sm:p-6 bg-card hover:border-[#f5c518]/30 transition-all hover:-translate-y-0.5 group min-w-0 overflow-hidden">
              <div className="mb-4 group-hover:scale-110 transition-transform inline-block" style={{ color: c.color }}>
                <Icon name={c.iconName} className="w-6 h-6" />
              </div>
              <h3 className="font-['Exo_2'] font-bold text-lg text-foreground mb-1">{c.name}</h3>
              <div className="font-['DM_Sans'] text-xs text-[#f5c518] font-medium mb-3">{c.role}</div>
              <p className="font-['JetBrains_Mono'] text-xs text-muted-foreground leading-relaxed">{c.spec}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TIMELINE ────────────────────────────────────────────────────────────────

function Timeline() {
  return (
    <section id="timeline" className="py-16 sm:py-24 bg-card/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="mb-14">
          <div className="font-['JetBrains_Mono'] text-xs text-[#f5c518] tracking-widest mb-4 uppercase">— Development Journey</div>
          <h2 className="font-['Exo_2'] font-bold text-3xl sm:text-4xl text-foreground mb-3">Perjalanan Pengerjaan</h2>
          <p className="font-['DM_Sans'] text-muted-foreground max-w-xl">Dari desain awal hingga sistem final yang siap dipresentasikan.</p>
        </div>

        <div className="relative">
          <div className="absolute left-[11px] sm:left-1/2 top-0 bottom-0 w-px bg-border sm:-translate-x-px" />
          <div className="space-y-10">
            {TIMELINE.map((t, i) => (
              <div key={t.date}
                className={`relative flex flex-col sm:flex-row ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"} gap-6 sm:gap-10`}>
                <div className="absolute left-0 sm:left-1/2 top-2 sm:-translate-x-1/2 w-6 h-6 rounded-full border-2 border-[#f5c518] bg-background flex items-center justify-center shrink-0 z-10">
                  <div className="w-2 h-2 rounded-full bg-[#f5c518]" />
                </div>
                <div className={`ml-10 sm:ml-0 sm:w-1/2 ${i % 2 === 0 ? "sm:pr-10 sm:text-right" : "sm:pl-10"}`}>
                  <div className="border border-border rounded-xl p-4 sm:p-5 bg-card hover:border-[#f5c518]/30 transition-colors min-w-0 overflow-hidden">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="font-['JetBrains_Mono'] text-xs text-[#f5c518] border border-[#f5c518]/30 px-2 py-0.5 rounded">{t.label}</span>
                      <span className="font-['JetBrains_Mono'] text-xs text-muted-foreground">{t.date}</span>
                    </div>
                    <h3 className="font-['Exo_2'] font-bold text-base text-foreground mb-2">{t.title}</h3>
                    <p className="font-['DM_Sans'] text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
                  </div>
                </div>
                <div className="hidden sm:block sm:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── TESTING ─────────────────────────────────────────────────────────────────

function StatCard({ label, value, color, iconName }: { label: string; value: string | number; color: string; iconName: string }) {
  return (
    <div className="border border-border rounded-lg p-3 sm:p-4 bg-card text-center">
      <div className="flex justify-center mb-1" style={{ color }}>
        <Icon name={iconName} className="w-4 h-4" />
      </div>
      <div className="font-['Exo_2'] font-bold text-lg sm:text-2xl text-foreground">{value}</div>
      <div className="font-['JetBrains_Mono'] text-[10px] sm:text-xs text-muted-foreground mt-0.5">{label}</div>
    </div>
  );
}

function SummaryStats({ tab }: { tab: TabId }) {
  if (tab === "response") {
    const allVals = responseTimeData.flatMap((r) => [r["Lap 1"], r["Lap 2"], r["Lap 3"], r["Lap 4"]]);
    const avg = (allVals.reduce((a, b) => a + b, 0) / allVals.length).toFixed(2);
    const min = Math.min(...allVals).toFixed(2);
    const max = Math.max(...allVals).toFixed(2);
    return (
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
        <StatCard label="Avg Response" value={`${avg}s`} color="#f5c518" iconName="activity" />
        <StatCard label="Min Response" value={`${min}s`} color="#4ade80" iconName="activity" />
        <StatCard label="Max Response" value={`${max}s`} color="#e8605a" iconName="activity" />
      </div>
    );
  }
  if (tab === "gift") {
    const total = giftData.reduce((a, r) => a + r["Data Masuk"], 0);
    const exec  = giftData.reduce((a, r) => a + r.Dieksekusi, 0);
    const acc   = ((exec / total) * 100).toFixed(1);
    return (
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
        <StatCard label="Total Gift Masuk" value={total}     color="#f5c518" iconName="database" />
        <StatCard label="Dieksekusi"        value={exec}      color="#4ade80" iconName="activity" />
        <StatCard label="Akurasi"           value={`${acc}%`} color="#e8605a" iconName="activity" />
      </div>
    );
  }
  const total = likeData.reduce((a, r) => a + r["Jumlah Like"], 0);
  const exec  = likeData.reduce((a, r) => a + r.Dieksekusi, 0);
  const acc   = ((exec / total) * 100).toFixed(1);
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
      <StatCard label="Total Like"  value={total}     color="#f5c518" iconName="activity" />
      <StatCard label="Dieksekusi"  value={exec}      color="#4ade80" iconName="activity" />
      <StatCard label="Akurasi"     value={`${acc}%`} color="#e8605a" iconName="activity" />
    </div>
  );
}

function RawTable({ tab }: { tab: TabId }) {
  if (tab === "response") {
    const laps = ["Lap 1", "Lap 2", "Lap 3", "Lap 4"] as const;
    return (
      <div className="overflow-x-auto rounded-lg border border-border mt-6">
        <table className="w-full text-xs font-['JetBrains_Mono'] min-w-[420px]">
          <thead>
            <tr className="border-b border-border bg-card/60">
              <th className="text-left px-4 py-2.5 text-muted-foreground font-medium">Lap</th>
              {responseTimeData.map((r) => <th key={r.name} className="text-right px-4 py-2.5 text-muted-foreground font-medium">{r.name}</th>)}
            </tr>
          </thead>
          <tbody>
            {laps.map((lap, i) => (
              <tr key={lap} className={`border-b border-border/50 hover:bg-card/40 transition-colors ${i % 2 === 0 ? "" : "bg-card/20"}`}>
                <td className="px-4 py-2.5">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full inline-block shrink-0" style={{ background: LINE_COLORS[i] }} />
                    <span className="text-foreground">{lap}</span>
                  </span>
                </td>
                {responseTimeData.map((row) => (
                  <td key={row.name} className="text-right px-4 py-2.5 text-foreground">{row[lap]}s</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  if (tab === "gift") {
    return (
      <div className="overflow-x-auto rounded-lg border border-border mt-6">
        <table className="w-full text-xs font-['JetBrains_Mono'] min-w-[380px]">
          <thead>
            <tr className="border-b border-border bg-card/60">
              <th className="text-left px-4 py-2.5 text-muted-foreground font-medium">Tipe Gift</th>
              <th className="text-right px-4 py-2.5 text-muted-foreground font-medium">Data Masuk</th>
              <th className="text-right px-4 py-2.5 text-muted-foreground font-medium">Dieksekusi</th>
              <th className="text-right px-4 py-2.5 text-muted-foreground font-medium">Data Loss</th>
              <th className="text-right px-4 py-2.5 text-muted-foreground font-medium">Akurasi</th>
            </tr>
          </thead>
          <tbody>
            {giftData.map((row, i) => (
              <tr key={row.name} className={`border-b border-border/50 hover:bg-card/40 transition-colors ${i % 2 === 0 ? "" : "bg-card/20"}`}>
                <td className="px-4 py-2.5 text-foreground">{row.name}</td>
                <td className="text-right px-4 py-2.5 text-foreground">{row["Data Masuk"]}</td>
                <td className="text-right px-4 py-2.5 text-[#4ade80]">{row.Dieksekusi}</td>
                <td className="text-right px-4 py-2.5" style={{ color: row["Data Loss"] > 0 ? "#e8605a" : "#4ade80" }}>{row["Data Loss"]}</td>
                <td className="text-right px-4 py-2.5 text-[#f5c518]">{((row.Dieksekusi / row["Data Masuk"]) * 100).toFixed(0)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <div className="overflow-x-auto rounded-lg border border-border mt-6">
      <table className="w-full text-xs font-['JetBrains_Mono'] min-w-[380px]">
        <thead>
          <tr className="border-b border-border bg-card/60">
            <th className="text-left px-4 py-2.5 text-muted-foreground font-medium">Percobaan</th>
            <th className="text-right px-4 py-2.5 text-muted-foreground font-medium">Jumlah Like</th>
            <th className="text-right px-4 py-2.5 text-muted-foreground font-medium">Dieksekusi</th>
            <th className="text-right px-4 py-2.5 text-muted-foreground font-medium">Data Loss</th>
            <th className="text-right px-4 py-2.5 text-muted-foreground font-medium">Akurasi</th>
          </tr>
        </thead>
        <tbody>
          {likeData.map((row, i) => (
            <tr key={row.name} className={`border-b border-border/50 hover:bg-card/40 transition-colors ${i % 2 === 0 ? "" : "bg-card/20"}`}>
              <td className="px-4 py-2.5 text-foreground">{row.name}</td>
              <td className="text-right px-4 py-2.5 text-foreground">{row["Jumlah Like"]}</td>
              <td className="text-right px-4 py-2.5 text-[#4ade80]">{row.Dieksekusi}</td>
              <td className="text-right px-4 py-2.5" style={{ color: "#e8605a" }}>{row["Data Loss"]}</td>
              <td className="text-right px-4 py-2.5 text-[#f5c518]">{((row.Dieksekusi / row["Jumlah Like"]) * 100).toFixed(1)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── CSS BAR CHART — hover labels via Tailwind group ─────────────────────────

function CssBarChart({ data, keys, colors }: {
  data: { name: string; [k: string]: number | string }[];
  keys: string[];
  colors: string[];
}) {
  const allVals = data.flatMap((r) => keys.map((k) => Number(r[k])));
  const maxVal = Math.max(...allVals, 1);
  return (
    <div className="w-full">
      <div className="flex items-end justify-around gap-3 px-2 border-b border-[rgba(245,197,24,0.1)]" style={{ height: "200px" }}>
        {data.map((row) => (
          <div key={row.name as string} className="flex flex-col items-center gap-1 flex-1 min-w-0">
            <div className="flex items-end gap-1 w-full justify-center" style={{ height: "164px" }}>
              {keys.map((k, ki) => {
                const val = Number(row[k]);
                const pct = (val / maxVal) * 100;
                return (
                  <div key={k} className="group relative flex-1 max-w-[32px] flex flex-col justify-end" style={{ height: "100%" }}>
                    {/* hover label */}
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-10">
                      <div className="rounded px-1.5 py-0.5 text-[9px] font-['JetBrains_Mono'] font-semibold whitespace-nowrap"
                        style={{ background: colors[ki], color: "#060d1a" }}>
                        {val}
                      </div>
                    </div>
                    {/* bar */}
                    <div className="w-full rounded-t-sm transition-all duration-200 group-hover:brightness-125"
                      style={{ height: `${pct}%`, background: colors[ki], opacity: 0.88 }} />
                  </div>
                );
              })}
            </div>
            <span className="font-['JetBrains_Mono'] text-[9px] text-muted-foreground text-center leading-tight w-full truncate">{row.name as string}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MQTT SECTION ─────────────────────────────────────────────────────────────

const MQTT_FLOW = [
  { id: "tiktok",  label: "TikTok Live",         sub: "@username",                          iconName: "wifi",   color: "#ff2d55" },
  { id: "server",  label: "Backend Server",       sub: "siabel.poltera.ac.id/iot",           iconName: "server", color: "#e8605a" },
  { id: "broker",  label: "MQTT Broker",          sub: "mqtt.icminovasi.my.id:8883",         iconName: "radio",  color: "#f5c518" },
  { id: "esp32",   label: "ESP32",                sub: "Client ID: pong-45c4",               iconName: "cpu",    color: "#a3b8d8" },
  { id: "motor",   label: "Launcher Motor",       sub: "L298N + PWM 5kHz 12-bit",           iconName: "zap",    color: "#4ade80" },
];

const MQTT_SPECS = [
  { k: "Broker",    v: "mqtt.icminovasi.my.id" },
  { k: "Port",      v: "8883 (TLS/SSL)" },
  { k: "Topic",     v: "smartfarming/pong-45c4/tiktok" },
  { k: "Client ID", v: "pong-45c4" },
  { k: "QoS",       v: "0 (at most once)" },
  { k: "Payload",   v: "JSON — type, uniqueId, giftId, likeCount …" },
  { k: "Retry",     v: "Auto-reconnect setiap 5000 ms" },
  { k: "Buffer",    v: "1024 bytes" },
];

const EVENT_TYPES = [
  { type: "like",   color: "#ff2d55", desc: "like → 1 bola per like, speed normal" },
  { type: "gift",   color: "#e8605a", desc: "gift → tier system (1–6 bola, bounce mode)" },
  { type: "chat",   color: "#f5c518", desc: "chat → log only, tidak trigger motor" },
  { type: "follow", color: "#a3b8d8", desc: "follow → log only" },
  { type: "share",  color: "#4ade80", desc: "share → log only" },
];

function FlowIcon({ name, color }: { name: string; color: string }) {
  const cls = "w-6 h-6";
  if (name === "wifi")   return <Wifi   className={cls} style={{ color }} />;
  if (name === "server") return <Server className={cls} style={{ color }} />;
  if (name === "radio")  return <Radio  className={cls} style={{ color }} />;
  if (name === "cpu")    return <Cpu    className={cls} style={{ color }} />;
  if (name === "zap")    return <Zap    className={cls} style={{ color }} />;
  return null;
}

const JSON_SNIPPETS: Record<string, { key: string; val: string; type: "str" | "num" | "bool" }[]> = {
  like: [
    { key: "type",           val: '"like"',  type: "str" },
    { key: "uniqueId",       val: '"user123"', type: "str" },
    { key: "likeCount",      val: "5",       type: "num" },
    { key: "totalLikeCount", val: "320",     type: "num" },
  ],
  gift: [
    { key: "type",         val: '"gift"',   type: "str" },
    { key: "giftId",       val: "5655",     type: "num" },
    { key: "giftName",     val: '"Rose"',   type: "str" },
    { key: "diamondCount", val: "1",        type: "num" },
    { key: "repeatCount",  val: "10",       type: "num" },
    { key: "repeatEnd",    val: "true",     type: "bool" },
  ],
  chat: [
    { key: "type",     val: '"chat"',       type: "str" },
    { key: "uniqueId", val: '"user123"',    type: "str" },
    { key: "nickname", val: '"User Name"',  type: "str" },
    { key: "comment",  val: '"wow keren!"', type: "str" },
  ],
  follow: [
    { key: "type",     val: '"follow"',    type: "str" },
    { key: "uniqueId", val: '"user123"',   type: "str" },
    { key: "nickname", val: '"User Name"', type: "str" },
  ],
  share: [
    { key: "type",     val: '"share"',     type: "str" },
    { key: "uniqueId", val: '"user123"',   type: "str" },
    { key: "nickname", val: '"User Name"', type: "str" },
  ],
};

function MqttSection() {
  const [activeEvent, setActiveEvent] = useState("like");
  const ev = EVENT_TYPES.find((e) => e.type === activeEvent) ?? EVENT_TYPES[0];
  const snippet = JSON_SNIPPETS[activeEvent] ?? [];

  return (
    <section id="mqtt" className="py-16 sm:py-24 bg-card/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">

        {/* Header */}
        <div className="mb-12">
          <div className="font-['JetBrains_Mono'] text-xs text-[#f5c518] tracking-widest mb-4 uppercase">— Arsitektur Sistem</div>
          <h2 className="font-['Exo_2'] font-bold text-3xl sm:text-4xl text-foreground mb-3">Alur Data MQTT</h2>
          <p className="font-['DM_Sans'] text-muted-foreground max-w-xl">
            Autopong menggunakan protokol <span className="text-[#f5c518] font-medium">MQTT over TLS (port 8883)</span> untuk
            menerima event TikTok Live secara real-time dan mengeksekusinya langsung ke aktuator fisik.
          </p>
        </div>

        {/* ── Flow Diagram ─────────────────────────────────────────────────────── */}
        {/* Mobile: vertical stack  |  md+: horizontal pipeline */}
        <div className="mb-12">
          {/* Desktop / Tablet horizontal */}
          <div className="hidden md:flex items-stretch justify-between gap-0">
            {MQTT_FLOW.map((node, i) => (
              <div key={node.id} className="flex items-center flex-1 min-w-0">
                {/* Node card */}
                <div className="flex-1 min-w-0 border border-border rounded-xl bg-card hover:border-[#f5c518]/40 transition-colors p-4 flex flex-col items-center gap-2 text-center">
                  {/* Step badge */}
                  <div className="font-['JetBrains_Mono'] text-[9px] text-muted-foreground mb-1">STEP {i + 1}</div>
                  {/* Icon circle */}
                  <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: `${node.color}1a`, border: `1px solid ${node.color}30` }}>
                    <FlowIcon name={node.iconName} color={node.color} />
                  </div>
                  <div className="font-['Exo_2'] font-bold text-sm text-foreground leading-tight">{node.label}</div>
                  <div className="font-['JetBrains_Mono'] text-[8px] text-muted-foreground leading-tight break-all px-1">{node.sub}</div>
                  {/* Protocol badge */}
                  <div className="font-['JetBrains_Mono'] text-[8px] px-2 py-0.5 rounded-full mt-1 shrink-0"
                    style={{ background: `${node.color}1a`, color: node.color }}>
                    {i === 0 ? "TikTok API" : i === 1 ? "HTTPS" : i === 2 ? "MQTT/TLS" : i === 3 ? "Subscribe" : "PWM"}
                  </div>
                </div>
                {/* Arrow connector */}
                {i < MQTT_FLOW.length - 1 && (
                  <div className="flex flex-col items-center px-1 shrink-0">
                    <div className="h-px w-6 bg-gradient-to-r from-border to-[#f5c518]/30" />
                    <ArrowRight className="w-4 h-4 text-[#f5c518]/50 -ml-1" />
                    <div className="h-px w-6 bg-gradient-to-r from-[#f5c518]/30 to-border" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile vertical */}
          <div className="flex md:hidden flex-col gap-0">
            {MQTT_FLOW.map((node, i) => (
              <div key={node.id} className="flex flex-col items-stretch">
                {/* Node row: icon + content side-by-side */}
                <div className="flex items-center gap-4 border border-border rounded-xl bg-card p-4">
                  {/* Left: step + icon */}
                  <div className="flex flex-col items-center gap-1 shrink-0">
                    <div className="font-['JetBrains_Mono'] text-[8px] text-muted-foreground">{i + 1}</div>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: `${node.color}1a`, border: `1px solid ${node.color}30` }}>
                      <FlowIcon name={node.iconName} color={node.color} />
                    </div>
                  </div>
                  {/* Right: text */}
                  <div className="flex-1 min-w-0">
                    <div className="font-['Exo_2'] font-bold text-sm text-foreground">{node.label}</div>
                    <div className="font-['JetBrains_Mono'] text-[9px] text-muted-foreground break-all leading-relaxed mt-0.5">{node.sub}</div>
                    <div className="font-['JetBrains_Mono'] text-[8px] px-2 py-0.5 rounded-full mt-2 inline-block"
                      style={{ background: `${node.color}1a`, color: node.color }}>
                      {i === 0 ? "TikTok API" : i === 1 ? "HTTPS POST" : i === 2 ? "MQTT/TLS 8883" : i === 3 ? "Subscribe" : "PWM 5kHz"}
                    </div>
                  </div>
                </div>
                {/* Down arrow connector */}
                {i < MQTT_FLOW.length - 1 && (
                  <div className="flex justify-center py-1">
                    <div className="flex flex-col items-center gap-0">
                      <div className="w-px h-3 bg-border" />
                      <div className="w-0 h-0"
                        style={{ borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "6px solid rgba(245,197,24,0.35)" }} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── MQTT Config + Event Explorer ─────────────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">

          {/* MQTT Specs table */}
          <div>
            <h3 className="font-['Exo_2'] font-bold text-lg text-foreground mb-4">Konfigurasi MQTT</h3>
            <div className="border border-border rounded-xl overflow-hidden bg-card divide-y divide-border/50">
              {MQTT_SPECS.map(({ k, v }) => (
                <div key={k} className="flex items-start justify-between gap-3 px-4 py-3 hover:bg-[#d9ab0a]/[0.02] transition-colors">
                  <span className="font-['JetBrains_Mono'] text-xs text-muted-foreground shrink-0 w-20">{k}</span>
                  <span className="font-['JetBrains_Mono'] text-xs text-[#f5c518] text-right break-all leading-relaxed">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Event JSON Explorer */}
          <div>
            <h3 className="font-['Exo_2'] font-bold text-lg text-foreground mb-4">Payload JSON — Tipe Event</h3>
            {/* Tab pills */}
            <div className="flex flex-wrap gap-2 mb-4">
              {EVENT_TYPES.map((e) => (
                <button key={e.type} onClick={() => setActiveEvent(e.type)}
                  className={`font-['JetBrains_Mono'] text-xs px-3 py-1.5 rounded-full border transition-all duration-150 ${
                    activeEvent === e.type
                      ? "border-transparent text-[#060d1a]"
                      : "border-border text-muted-foreground hover:border-[#f5c518]/40 hover:text-foreground"
                  }`}
                  style={activeEvent === e.type ? { background: e.color } : {}}>
                  {e.type}
                </button>
              ))}
            </div>

            {/* Panel */}
            <div className="border border-border rounded-xl bg-card overflow-hidden">
              {/* Panel header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50"
                style={{ background: `${ev.color}0d` }}>
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: ev.color }} />
                <span className="font-['Exo_2'] font-bold text-sm text-foreground">type: "{ev.type}"</span>
                <span className="ml-auto font-['DM_Sans'] text-xs text-muted-foreground">{ev.desc}</span>
              </div>
              {/* Syntax-highlighted JSON */}
              <div className="p-4 font-['JetBrains_Mono'] text-xs leading-6"
                style={{ background: "#0a1628" }}>
                <span style={{ color: "#5a7a9a" }}>{"{"}</span><br />
                {snippet.map(({ key, val, type }) => (
                  <div key={key} className="pl-4">
                    <span style={{ color: "#f5c518" }}>"{key}"</span>
                    <span style={{ color: "#5a7a9a" }}>: </span>
                    <span style={{ color: type === "str" ? "#4ade80" : type === "num" ? "#e8605a" : "#a78bfa" }}>{val}</span>
                    <span style={{ color: "#5a7a9a" }}>,</span>
                  </div>
                ))}
                <span style={{ color: "#5a7a9a" }}>{"}"}</span>
              </div>
              {/* Motor response badge */}
              <div className="px-4 py-3 border-t border-border/50 flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 shrink-0" style={{ color: ev.color }} />
                <span className="font-['DM_Sans'] text-xs text-muted-foreground">
                  {ev.type === "like" && "→ pushEvent(LIKE) · 1 bola / like · Motor normal speed"}
                  {ev.type === "gift" && "→ pushEvent(GIFT) · Tier 1–4 · 3–6 bola · Bounce mode"}
                  {(ev.type === "chat" || ev.type === "follow" || ev.type === "share") && "→ Log serial only · tidak menggerakkan motor"}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── GIFT TIER SECTION ────────────────────────────────────────────────────────

const GIFT_TIERS = [
  {
    tier: "TIER 1",
    coins: "< 5 koin",
    balls: 3,
    mode: "Flat",
    color: "#a3b8d8",
    glow: "rgba(163,184,216,0.15)",
    motorA: "Normal (180/255)",
    motorB: "Normal (180/255)",
    bounce: false,
    desc: "Kedua motor kecepatan sama → bola meluncur lurus ke depan.",
    pwmA: 2890,
    pwmB: 2890,
  },
  {
    tier: "TIER 2",
    coins: "≥ 5 koin",
    balls: 3,
    mode: "Bounce",
    color: "#f5c518",
    glow: "rgba(245,197,24,0.15)",
    motorA: "Normal (180/255)",
    motorB: "Max (255/255)",
    bounce: true,
    desc: "Motor B lebih cepat dari Motor A → bola melambung ke atas.",
    pwmA: 2890,
    pwmB: 4095,
  },
  {
    tier: "TIER 3",
    coins: "≥ 10 koin",
    balls: 6,
    mode: "Bounce",
    color: "#e8605a",
    glow: "rgba(255,107,53,0.15)",
    motorA: "Normal (180/255)",
    motorB: "Max (255/255)",
    bounce: true,
    desc: "6 bola dengan efek melambung, durasi tembakan lebih panjang.",
    pwmA: 2890,
    pwmB: 4095,
  },
  {
    tier: "TIER 4",
    coins: "≥ 20 koin",
    balls: 6,
    mode: "Max Bounce",
    color: "#4ade80",
    glow: "rgba(74,222,128,0.15)",
    motorA: "Bounce (130/255)",
    motorB: "Max (255/255)",
    bounce: true,
    desc: "Motor A diperlambat, Motor B full speed → efek melambung tinggi dan kencang!",
    pwmA: 2090,
    pwmB: 4095,
  },
];

function GiftTierSection() {
  const [active, setActive] = useState(0);
  const t = GIFT_TIERS[active];

  return (
    <section id="gifttier" className="py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="mb-14">
          <div className="font-['JetBrains_Mono'] text-xs text-[#f5c518] tracking-widest mb-4 uppercase">— Sistem Gift</div>
          <h2 className="font-['Exo_2'] font-bold text-3xl sm:text-4xl text-foreground mb-3">Gift Tier System</h2>
          <p className="font-['DM_Sans'] text-muted-foreground max-w-xl">
            Autopong membedakan respons fisik berdasarkan nilai gift TikTok. Semakin banyak koin, semakin spektakuler reaksi mesin peluncur.
          </p>
        </div>

        {/* Tier selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {GIFT_TIERS.map((tier, i) => (
            <button key={tier.tier} onClick={() => setActive(i)}
              className={`border rounded-xl p-4 text-left transition-all ${
                active === i ? "border-transparent" : "border-border hover:border-[#f5c518]/30 bg-card"
              }`}
              style={active === i ? { background: tier.glow, borderColor: tier.color } : {}}>
              <div className="font-['JetBrains_Mono'] text-xs mb-1" style={{ color: tier.color }}>{tier.tier}</div>
              <div className="font-['Exo_2'] font-bold text-foreground text-sm mb-0.5">{tier.coins}</div>
              <div className="flex items-center gap-1">
                {Array.from({ length: tier.balls }).map((_, bi) => (
                  <span key={bi} className="inline-block w-1.5 h-1.5 rounded-full"
                    style={{ background: tier.color, opacity: active === i ? 1 : 0.4 }} />
                ))}
              </div>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <div className="border rounded-2xl p-4 sm:p-8 transition-all"
          style={{ borderColor: t.color + "40", background: t.glow }}>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-['JetBrains_Mono'] text-xs border px-3 py-1 rounded-full"
                  style={{ color: t.color, borderColor: t.color + "50" }}>{t.tier}</span>
                <span className="font-['Exo_2'] font-bold text-xl sm:text-2xl text-foreground">{t.coins}</span>
              </div>
              <p className="font-['DM_Sans'] text-muted-foreground mb-6">{t.desc}</p>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Jumlah Bola", val: `${t.balls}×` },
                  { label: "Mode", val: t.mode },
                  { label: "Bounce", val: t.bounce ? "Ya" : "Tidak" },
                ].map((s) => (
                  <div key={s.label} className="border border-border/50 rounded-lg p-3 bg-card/50 text-center">
                    <div className="font-['Exo_2'] font-bold text-lg" style={{ color: t.color }}>{s.val}</div>
                    <div className="font-['JetBrains_Mono'] text-[10px] text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* PWM bars */}
            <div>
              <h4 className="font-['Exo_2'] font-bold text-sm text-foreground mb-4">Kecepatan Motor (PWM 12-bit)</h4>
              {[
                { label: "Motor A (Atas) — GPIO 25", val: t.pwmA, max: 4095, sub: t.motorA },
                { label: "Motor B (Bawah) — GPIO 14", val: t.pwmB, max: 4095, sub: t.motorB },
              ].map((m) => (
                <div key={m.label} className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-['JetBrains_Mono'] text-xs text-muted-foreground">{m.label}</span>
                    <span className="font-['JetBrains_Mono'] text-xs" style={{ color: t.color }}>{m.val} / {m.max}</span>
                  </div>
                  <div className="h-2 rounded-full bg-card overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${(m.val / m.max) * 100}%`, background: t.color }} />
                  </div>
                  <div className="font-['JetBrains_Mono'] text-[10px] text-muted-foreground mt-1">{m.sub}</div>
                </div>
              ))}
              <div className="border border-border/50 rounded-lg p-3 bg-card/50 mt-4">
                <div className="font-['JetBrains_Mono'] text-[10px] text-muted-foreground mb-1">Durasi Feeder (Relay)</div>
                <div className="font-['Exo_2'] font-bold text-foreground">{t.balls} × 800ms = <span style={{ color: t.color }}>{t.balls * 800}ms</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── STATIC SVG LINE CHART — CSS hover tooltips, zero React state/hooks ───────

const LC_VW = 580;
const LC_VH = 240;
const LC_PL = 42; const LC_PR = 14; const LC_PT = 16; const LC_PB = 34;
const LC_IW = LC_VW - LC_PL - LC_PR;
const LC_IH = LC_VH - LC_PT - LC_PB;
const LC_LAPS = ["Lap 1", "Lap 2", "Lap 3", "Lap 4"] as const;
const LC_MAX = 12;
const LC_YTICKS = [0, 3, 6, 9, 12];
const LC_TIP_W = 62;
const LC_TIP_H = 22;

function lcY(v: number) { return LC_PT + LC_IH - (v / LC_MAX) * LC_IH; }
function lcX(i: number) { return LC_PL + (i / (responseTimeData.length - 1)) * LC_IW; }

const LC_POLYLINES = LC_LAPS.map((lap, li) => ({
  color: LINE_COLORS[li],
  lap,
  points: responseTimeData.map((r, i) => `${lcX(i)},${lcY(r[lap])}`).join(" "),
  dots: responseTimeData.map((r, i) => {
    const cx = lcX(i);
    const cy = lcY(r[lap]);
    const tipAbove = cy > LC_PT + LC_TIP_H + 12;
    const tipX = Math.min(Math.max(cx - LC_TIP_W / 2, LC_PL), LC_VW - LC_PR - LC_TIP_W);
    const tipY = tipAbove ? cy - LC_TIP_H - 10 : cy + 12;
    return { cx, cy, val: r[lap], tipX, tipY, tipAbove };
  }),
}));

const LC_CSS = `
  .lc-pt { cursor: pointer; }
  .lc-ring { opacity: 0; transform-origin: center; transition: opacity .15s; }
  .lc-tip  { opacity: 0; pointer-events: none; transition: opacity .15s; }
  .lc-pt:hover .lc-ring { opacity: 1; }
  .lc-pt:hover .lc-tip  { opacity: 1; }
`;

function SvgLineChart() {
  return (
    <svg viewBox={`0 0 ${LC_VW} ${LC_VH}`} width="100%" style={{ display: "block" }}>
      <style>{LC_CSS}</style>

      {/* horizontal grid */}
      {LC_YTICKS.map((t) => (
        <g key={t}>
          <line x1={LC_PL} x2={LC_VW - LC_PR} y1={lcY(t)} y2={lcY(t)}
            stroke="rgba(245,197,24,0.07)" strokeDasharray="4 3" />
          <text x={LC_PL - 5} y={lcY(t) + 4} textAnchor="end" fontSize={9} fill="#5a7a9a">{t}s</text>
        </g>
      ))}

      {/* x-axis labels */}
      {responseTimeData.map((d, i) => (
        <text key={i} x={lcX(i)} y={LC_VH - 8}
          textAnchor="middle" fontSize={8} fill="#5a7a9a">{d.name}</text>
      ))}

      {/* vertical crosshair lines (faint) */}
      {responseTimeData.map((_, i) => (
        <line key={i} x1={lcX(i)} x2={lcX(i)} y1={LC_PT} y2={LC_PT + LC_IH}
          stroke="rgba(245,197,24,0.04)" />
      ))}

      {/* lines */}
      {LC_POLYLINES.map(({ color, lap, points }) => (
        <polyline key={lap} points={points} fill="none"
          stroke={color} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
      ))}

      {/* dots + CSS hover tooltips */}
      {LC_POLYLINES.map(({ color, lap, dots }) =>
        dots.map((d, i) => (
          <g key={`${lap}-${i}`} className="lc-pt">
            {/* invisible hit area */}
            <circle cx={d.cx} cy={d.cy} r={14} fill="transparent" />
            {/* pulse ring on hover */}
            <circle className="lc-ring" cx={d.cx} cy={d.cy} r={9}
              fill="none" stroke={color} strokeWidth={1.5} opacity={0.5} />
            {/* dot */}
            <circle cx={d.cx} cy={d.cy} r={5} fill={color} stroke="#0d1829" strokeWidth={1.5} />
            {/* tooltip — pure CSS show/hide */}
            <g className="lc-tip">
              <rect x={d.tipX} y={d.tipY} width={LC_TIP_W} height={LC_TIP_H} rx={5}
                fill="#0d1829" stroke={color} strokeWidth={1} />
              <text x={d.tipX + LC_TIP_W / 2} y={d.tipY + 14}
                textAnchor="middle" fontSize={10} fontWeight="600" fill={color}>{d.val}s</text>
            </g>
          </g>
        ))
      )}
    </svg>
  );
}

function Testing() {
  const [activeTab, setActiveTab] = useState<TabId>("response");
  const [showTable, setShowTable] = useState(false);

  const tabs: { id: TabId; label: string }[] = [
    { id: "response", label: "Response Time" },
    { id: "gift",     label: "Pengujian Gift" },
    { id: "like",     label: "Pengujian Like" },
  ];

  const tabDesc: Record<TabId, string> = {
    response: "Waktu respons sistem (detik) terhadap 4 jenis input di setiap lap pengujian.",
    gift:     "Akurasi eksekusi gift 1, 10, dan 20 koin — data masuk vs. dieksekusi vs. data loss.",
    like:     "Akurasi eksekusi like selama 5 percobaan — jumlah like masuk vs. dieksekusi vs. data loss.",
  };

  const legend = activeTab === "response"
    ? LINE_COLORS.map((c, i) => ({ label: `Lap ${i + 1}`, color: c }))
    : activeTab === "gift"
      ? [{ label: "Data Masuk", color: "#f5c518" }, { label: "Dieksekusi", color: "#4ade80" }, { label: "Data Loss", color: "#e8605a" }]
      : [{ label: "Jumlah Like", color: "#f5c518" }, { label: "Dieksekusi", color: "#4ade80" }, { label: "Data Loss", color: "#e8605a" }];

  return (
    <section id="testing" className="py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="mb-10">
          <div className="font-['JetBrains_Mono'] text-xs text-[#f5c518] tracking-widest mb-4 uppercase">— Hasil Pengujian</div>
          <h2 className="font-['Exo_2'] font-bold text-3xl sm:text-4xl text-foreground mb-3">Data Pengujian Sistem</h2>
          <p className="font-['DM_Sans'] text-muted-foreground max-w-xl">
            Analisis performa Autopong — response time, akurasi eksekusi gift, dan keandalan deteksi like dari TikTok Live.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map(({ id, label }) => (
            <button key={id}
              onClick={() => { setActiveTab(id); setShowTable(false); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-['DM_Sans'] font-medium transition-all border ${
                activeTab === id
                  ? "bg-[#f5c518] text-[#060d1a] border-[#f5c518]"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-[#f5c518]/30"
              }`}>
              {id === "response" ? <TrendingUp className="w-4 h-4" /> : <BarChart2 className="w-4 h-4" />}
              {label}
            </button>
          ))}
        </div>

        <div className="border border-border rounded-2xl bg-card p-5 sm:p-8">
          <p className="font-['DM_Sans'] text-sm text-muted-foreground mb-5">{tabDesc[activeTab]}</p>
          <SummaryStats tab={activeTab} />

          <div className="w-full mt-2">
            {activeTab === "response" && <SvgLineChart />}
            {activeTab === "gift" && (
              <CssBarChart
                data={giftData}
                keys={["Data Masuk", "Dieksekusi", "Data Loss"]}
                colors={["#f5c518", "#4ade80", "#e8605a"]}
              />
            )}
            {activeTab === "like" && (
              <CssBarChart
                data={likeData}
                keys={["Jumlah Like", "Dieksekusi", "Data Loss"]}
                colors={["#f5c518", "#4ade80", "#e8605a"]}
              />
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {legend.map((item) => (
              <span key={item.label} className="flex items-center gap-1.5 font-['JetBrains_Mono'] text-xs text-muted-foreground">
                <span className="w-2.5 h-2.5 rounded-sm inline-block shrink-0" style={{ background: item.color }} />
                {item.label}
              </span>
            ))}
          </div>

          <div className="mt-6 pt-5 border-t border-border flex items-center justify-between">
            <span className="font-['JetBrains_Mono'] text-xs text-muted-foreground">
              {showTable ? "Sembunyikan" : "Tampilkan"} data tabel
            </span>
            <button onClick={() => setShowTable(!showTable)}
              className="font-['DM_Sans'] text-xs text-[#f5c518] border border-[#f5c518]/30 px-3 py-1.5 rounded hover:bg-[#f5c518]/10 transition-colors">
              {showTable ? "↑ Sembunyikan" : "↓ Lihat Tabel"}
            </button>
          </div>

          {showTable && <RawTable tab={activeTab} />}
        </div>
      </div>
    </section>
  );
}

// ─── GALLERY ─────────────────────────────────────────────────────────────────

function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);

  const prev = () => setSelected((s) => (s === null ? 0 : (s - 1 + PHOTOS.length) % PHOTOS.length));
  const next = () => setSelected((s) => (s === null ? 0 : (s + 1) % PHOTOS.length));

  useEffect(() => {
    if (selected === null || typeof window === "undefined") return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selected]);

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-card/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="mb-14">
          <div className="font-['JetBrains_Mono'] text-xs text-[#f5c518] tracking-widest mb-4 uppercase">— Dokumentasi</div>
          <h2 className="font-['Exo_2'] font-bold text-3xl sm:text-4xl text-foreground mb-3">Foto Proses Pengerjaan</h2>
          <p className="font-['DM_Sans'] text-muted-foreground max-w-xl">
            Dokumentasi real dari setiap tahap pembangunan sistem Autopong — dari wiring awal hingga unit final yang siap diuji.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PHOTOS.map((p, i) => (
            <button key={i} onClick={() => setSelected(i)}
              className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-card border border-border hover:border-[#f5c518]/50 transition-all text-left">
              <ImageWithFallback src={p.src} alt={p.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <div className="font-['JetBrains_Mono'] text-xs text-[#f5c518] mb-1">{p.date}</div>
                <p className="font-['DM_Sans'] text-xs text-white/90 line-clamp-2">{p.caption}</p>
              </div>
              <div className="absolute top-3 right-3 font-['JetBrains_Mono'] text-xs text-white/70 bg-black/50 px-2 py-0.5 rounded">
                {String(i + 1).padStart(2, "0")}
              </div>
            </button>
          ))}
        </div>

        {selected !== null && (
          <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}>
            <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setSelected(null)}
                className="absolute -top-10 right-0 text-white/60 hover:text-white">
                <X className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-4">
                <button onClick={prev} className="text-foreground/60 hover:text-[#f5c518] transition-colors p-2 shrink-0">
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <div className="flex-1 rounded-xl overflow-hidden bg-card">
                  <ImageWithFallback src={PHOTOS[selected].src} alt={PHOTOS[selected].alt}
                    className="w-full max-h-[70vh] object-contain" />
                  <div className="p-5">
                    <div className="font-['JetBrains_Mono'] text-xs text-[#f5c518] mb-2">
                      {PHOTOS[selected].date} — Foto {selected + 1}/{PHOTOS.length}
                    </div>
                    <p className="font-['DM_Sans'] text-sm text-muted-foreground leading-relaxed">
                      {PHOTOS[selected].caption}
                    </p>
                  </div>
                </div>
                <button onClick={next} className="text-foreground/60 hover:text-[#f5c518] transition-colors p-2 shrink-0">
                  <ChevronRight className="w-8 h-8" />
                </button>
              </div>
              <div className="flex justify-center gap-2 mt-4">
                {PHOTOS.map((_, i) => (
                  <button key={i} onClick={() => setSelected(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${i === selected ? "bg-[#f5c518]" : "bg-white/20 hover:bg-[#d9ab0a]/40"}`} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── PEMBIMBING ──────────────────────────────────────────────────────────────

function Pembimbing() {
  return (
    <section id="pembimbing" className="py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="mb-10 sm:mb-14">
          <div className="font-['JetBrains_Mono'] text-xs text-[#f5c518] tracking-widest mb-4 uppercase">— Dosen Pembimbing</div>
          <h2 className="font-['Exo_2'] font-bold text-3xl sm:text-4xl text-foreground mb-3">Pembimbing Tugas Akhir</h2>
          <p className="font-['DM_Sans'] text-muted-foreground max-w-xl">
            Tugas Akhir Autopong disusun di bawah bimbingan dosen Program Studi D3 Teknik Listrik Industri, Politeknik Negeri Madura.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 max-w-3xl">
          {ADVISORS.map((a) => (
            <div key={a.nip}
              className="group border border-border rounded-2xl bg-card overflow-hidden hover:border-[#f5c518]/40 transition-all hover:-translate-y-0.5 flex flex-row items-stretch">
              {/* Photo — fixed width so text always visible on mobile */}
              <div className="w-28 sm:w-44 shrink-0 overflow-hidden bg-muted">
                <ImageWithFallback src={a.photo} alt={`Foto ${a.role} — ${a.name}`}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-3 sm:p-5 flex flex-col justify-center text-left gap-1.5 sm:gap-2 flex-1 min-w-0">
                <span className="font-['JetBrains_Mono'] text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full self-start"
                  style={{ background: `${a.color}1a`, color: a.color }}>
                  {a.role}
                </span>
                <h3 className="font-['Exo_2'] font-bold text-sm sm:text-lg text-foreground leading-snug">{a.name}</h3>
                <div className="font-['JetBrains_Mono'] text-[10px] sm:text-xs text-muted-foreground">
                  NIP. {a.nip}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── RESOURCES ───────────────────────────────────────────────────────────────

function Resources() {
  return (
    <section id="resources" className="py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="mb-14">
          <div className="font-['JetBrains_Mono'] text-xs text-[#f5c518] tracking-widest mb-4 uppercase">— Resources</div>
          <h2 className="font-['Exo_2'] font-bold text-3xl sm:text-4xl text-foreground mb-3">File & Dokumentasi</h2>
          <p className="font-['DM_Sans'] text-muted-foreground max-w-xl">
            Akses semua file terkait project Autopong — dokumentasi, data, source code, dan laporan Tugas Akhir.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {RESOURCE_DATA.map((r) => (
            <a key={r.title} href={r.link} target="_blank" rel="noopener noreferrer"
              className="group border border-border rounded-xl p-4 sm:p-6 bg-card hover:border-[#f5c518]/40 transition-all hover:-translate-y-0.5 flex flex-col gap-3 sm:gap-4 min-w-0 overflow-hidden">
              <div className="flex items-start justify-between gap-4">
                <div style={{ color: r.color }} className="group-hover:scale-110 transition-transform">
                  <Icon name={r.iconName} className="w-7 h-7" />
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground group-hover:text-[#f5c518] transition-colors">
                  <span className="font-['JetBrains_Mono'] text-xs">{r.link.includes("drive.google") ? "Google Drive" : "Link Eksternal"}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>
              <div>
                <h3 className="font-['Exo_2'] font-bold text-lg text-foreground mb-2 group-hover:text-[#f5c518] transition-colors">{r.title}</h3>
                <p className="font-['DM_Sans'] text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
              </div>
              <div className="mt-auto pt-3 border-t border-border">
                <div className="font-['JetBrains_Mono'] text-xs text-muted-foreground/60 truncate">
                  {r.link.replace("https://", "")}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <ImageWithFallback src={logoTL} alt="Logo Teknik Listrik Poltera" className="w-10 h-10 object-contain shrink-0" />
            <div>
              <div className="font-['Exo_2'] font-black text-base text-[#f5c518] leading-snug">TA Raflie Nurivansyah</div>
              <div className="font-['JetBrains_Mono'] text-[10px] text-[#f5c518]/60">AUTOPONG</div>
            </div>
          </div>
          <p className="font-['DM_Sans'] text-xs text-muted-foreground">Politeknik Negeri Madura — D3 Teknik Listrik Industri</p>
          <p className="font-['DM_Sans'] text-xs text-muted-foreground/60">Tugas Akhir 2026</p>
        </div>
        <div className="text-right">
          <div className="font-['JetBrains_Mono'] text-xs text-muted-foreground mb-1">© 2026 — All rights reserved</div>
          <div className="font-['JetBrains_Mono'] text-xs text-[#f5c518]/60">ESP32 · Arduino · Motor Control</div>
        </div>
      </div>
    </footer>
  );
}

// ─── ROOT ────────────────────────────────────────────────────────────────────

export default function App() {
  const [theme, toggleTheme] = useTheme();
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Sitewide logo watermark — fixed background, isolated compositor layer */}
      <div className="watermark-layer fixed inset-0 pointer-events-none select-none overflow-hidden z-0" aria-hidden="true">
        {/* Single centered logo — colored watermark, responsive */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ opacity: 0.22 }}>
          <ImageWithFallback src={logoTL} alt="" className="w-[min(80vw,300px)] sm:w-[min(80vw,480px)] lg:w-[680px] h-auto object-contain" />
        </div>
      </div>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <Hero />
      <Reveal><Overview /></Reveal>
      <Reveal><Components /></Reveal>
      <Reveal><Timeline /></Reveal>
      <Reveal><MqttSection /></Reveal>
      <Reveal><GiftTierSection /></Reveal>
      <Reveal><Testing /></Reveal>
      <Reveal><Gallery /></Reveal>
      <Reveal><Pembimbing /></Reveal>
      <Reveal><Resources /></Reveal>
      <Footer />
    </div>
  );
}
