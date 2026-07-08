import { createFileRoute } from "@tanstack/react-router";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Star,
  Share2,
  ChevronRight,
  Download,
  Apple,
  Play,
  Shield,
  Award,
  Globe,
  Briefcase,
  Calendar,
  Users,
  ArrowUpRight,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useEffect } from "react";
import { toast } from "sonner";

import oruphones from "@/assets/project-oruphones.jpg";
import healthcheck from "@/assets/project-healthcheck.jpg";
import deviceinfo from "@/assets/project-deviceinfo.jpg";
import pib from "@/assets/project-pib.jpg";

export const Route = createFileRoute("/")({
  component: Portfolio,
});

type Store = "ios" | "android";

const PROJECTS = [
  {
    name: "ORUphones",
    tag: "Recommerce · Flagship",
    category: "Shopping",
    rating: 4.7,
    reviews: "12K",
    description:
      "Smartphone diagnostics and recommerce marketplace. 30+ hardware tests via native Swift & Java Platform Channels.",
    image: oruphones,
    stack: ["Flutter", "BLoC", "Swift", "Java", "Firebase"],
    link: "https://apps.apple.com/in/app/oruphones-sell-used-phones/id1629378420",
  },
  {
    name: "Phone Health Check",
    tag: "Diagnostics",
    category: "Utilities",
    rating: 4.8,
    reviews: "3.2K",
    description:
      "Automated device diagnostics — battery, storage, sensors, network & performance in one tap.",
    image: healthcheck,
    stack: ["Flutter", "Dart", "Platform Channels"],
    link: "https://apps.apple.com/in/app/phone-health-check/id6670603516",
  },
  {
    name: "Device Info",
    tag: "250+ Specs",
    category: "Tools",
    rating: 4.6,
    reviews: "1.8K",
    description:
      "Reference app surfacing 250+ hardware specs. Fast, offline-capable UI, modular architecture.",
    image: deviceinfo,
    stack: ["Flutter", "Provider", "Repository"],
    link: "https://apps.apple.com/in/app/device-info-mobile-phone-info/id6504903446",
  },
  {
    name: "PIB News",
    tag: "SIH 2022 Winner",
    category: "News",
    rating: 4.9,
    reviews: "SIH Winner",
    description:
      "Inshorts-style news for the Press Information Bureau with multilingual and ministry-wise categorization.",
    image: pib,
    stack: ["Flutter", "Multilingual", "REST"],
    link: null,
  },
];

const EXPERIENCE = [
  {
    version: "v4.0",
    role: "Software Development Engineer - I (Flutter)",
    company: "Zime.ai",
    period: "Dec 2025 — May 2026",
    bullets: [
      "Developed cross-platform Android and iOS features using Flutter following Clean Architecture, Repository Pattern, and BLoC/Provider.",
      "Integrated REST APIs, WebSockets, Firebase (FCM), push notifications, and background services.",
      "Built offline-first audio recording with automatic upload and background synchronization, eliminating data loss on connectivity drops.",
      "Improved app performance using caching, lazy loading, and memory optimization.",
      "Built backend APIs and data pipelines using Spring Boot to power CRM and internal dashboard features, working across the mobile-to-backend stack.",
      "Partnered with backend, QA, and product teams across Agile sprints to plan, estimate, and ship features on schedule.",
    ],
  },
  {
    version: "v3.0",
    role: "Software Developer (Flutter & iOS)",
    company: "Mobilicis India Pvt. Ltd.",
    period: "Apr 2022 — Aug 2025",
    bullets: [
      "Led development of ORUphones, a Flutter-based smartphone diagnostics and recommerce platform with 30+ hardware tests using native Swift and Java integrations.",
      "Built and published Phone Health Check and Device Info, providing automated diagnostics and 250+ device specifications.",
      "Designed scalable applications using Clean Architecture, BLoC, Provider, and reusable modular components, cutting new-feature development time across teams.",
      "Integrated Firebase (Crashlytics, Analytics, FCM), REST APIs, deep linking, and third-party SDKs.",
      "Improved app launch time by 20% through caching, isolates, lazy loading, and memory optimization.",
      "Owned App Store Connect and Google Play releases end-to-end, including CI/CD pipelines, TestFlight distribution, and production rollouts.",
      "Built reusable Flutter components and integrated native Android/iOS features via Platform Channels; contributed across the Agile SDLC, including code reviews and production support.",
    ],
  },
];

const SKILL_CATEGORIES = [
  {
    title: "Mobile Development",
    items: ["Flutter", "Dart", "UIKit", "SwiftUI", "Swift", "Java", "Android SDK", "XML", "Platform Channels", "Method Channels"]
  },
  {
    title: "Architecture",
    items: ["Clean Architecture", "MVVM", "BLoC", "Provider", "Repository Pattern", "Dependency Injection"]
  },
  {
    title: "Backend & APIs",
    items: ["REST APIs", "JSON", "Firebase", "FCM", "Crashlytics", "Analytics", "Dio", "WebSockets"]
  },
  {
    title: "Cloud & Database",
    items: ["AWS EC2", "AWS S3", "MySQL", "MongoDB"]
  },
  {
    title: "DevOps & Tools",
    items: ["Git", "GitHub Actions", "Jenkins", "CI/CD", "Xcode", "Android Studio", "VS Code", "Postman"]
  },
  {
    title: "Other Skills",
    items: ["JavaScript", "Python", "React", "Next.js", "Node.js", "HTML5", "CSS3", "Tailwind CSS", "Spring Boot"]
  }
];

const REVIEWS = [
  { name: "Product Lead, Zime.ai", rating: 5, title: "Ships fast, thinks in systems", body: "Sourabh owns his features end-to-end — from BLoC design to release. Offline-first audio recording landed with zero regressions." },
  { name: "Engineering Manager", rating: 5, title: "Deep Flutter + native chops", body: "Wrote Platform Channels for 30+ hardware diagnostics on iOS and Android. Rare combination of Dart and native platform depth." },
  { name: "SIH 2022 Judges", rating: 5, title: "National-level winner", body: "Built the winning multilingual PIB news app at Smart India Hackathon 2022." },
];

const handleShare = async () => {
  const url = "https://sourabhyadav.netlify.app/";
  const shareData = {
    title: "Sourabh Yadav — Flutter & Mobile App Developer",
    text: "Check out Sourabh Yadav's portfolio — Flutter & Mobile App Developer",
    url,
  };
  
  if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
    try {
      await navigator.share(shareData);
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        console.error(err);
        copyLink(url);
      }
    }
  } else {
    copyLink(url);
  }
};

const copyLink = async (url: string) => {
  try {
    await navigator.clipboard.writeText(url);
    toast.success("Portfolio link copied to clipboard!");
  } catch (err) {
    console.error(err);
    toast.error("Failed to copy link to clipboard");
  }
};

function Portfolio() {
  const [store, setStore] = useState<Store>("ios");

  return (
    <div data-store={store} className="min-h-screen">
      <StoreShell store={store} setStore={setStore} />
    </div>
  );
}

function StoreShell({ store, setStore }: { store: Store; setStore: (s: Store) => void }) {
  return (
    <>
      <TopBar store={store} setStore={setStore} />
      <main className="mx-auto max-w-4xl px-4 pb-24 pt-24 md:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={store}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {store === "ios" ? <IOSListing /> : <AndroidListing />}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}

/* ------------------------------- Top Bar ---------------------------------- */

function TopBar({ store, setStore }: { store: Store; setStore: (s: Store) => void }) {
  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl"
      style={{ background: "var(--store-nav)", borderColor: "var(--store-border)" }}
    >
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center gap-2 font-semibold" style={{ color: "var(--store-fg)" }}>
          {store === "ios" ? <Apple className="h-5 w-5" /> : <Play className="h-5 w-5" style={{ color: "var(--store-accent)" }} />}
          <span className="hidden sm:inline">{store === "ios" ? "App Store" : "Google Play"}</span>
        </div>
        <StoreToggle store={store} setStore={setStore} />
      </div>
    </header>
  );
}

function StoreToggle({ store, setStore }: { store: Store; setStore: (s: Store) => void }) {
  const reduce = useReducedMotion();
  return (
    <div
      className="relative inline-flex items-center rounded-full p-1"
      style={{ background: "var(--store-chip)", border: "1px solid var(--store-border)" }}
    >
      {(["ios", "android"] as const).map((s) => {
        const active = store === s;
        return (
          <button
            key={s}
            onClick={() => setStore(s)}
            className="relative z-10 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors md:text-sm cursor-pointer"
            style={{ color: active ? (s === "ios" ? "#ffffff" : "#ffffff") : "var(--store-muted)" }}
          >
            {active && (
              <motion.span
                layoutId="store-pill"
                transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
                className="absolute inset-0 -z-10 rounded-full"
                style={{ background: s === "ios" ? "#007aff" : "#01875f" }}
              />
            )}
            {s === "ios" ? <Apple className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            {s === "ios" ? "App Store" : "Play Store"}
          </button>
        );
      })}
    </div>
  );
}

/* ----------------------------- Shared bits -------------------------------- */

function Stars({ n = 5, size = 12 }: { n?: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" style={{ color: "var(--store-star)" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} style={{ width: size, height: size }} fill="currentColor" strokeWidth={0} opacity={i < n ? 1 : 0.25} />
      ))}
    </span>
  );
}

function AppIcon({ store, size = 128 }: { store: Store; size?: number }) {
  const radius = store === "ios" ? size * 0.22 : size * 0.5;
  return (
    <div
      className="relative grid shrink-0 place-items-center overflow-hidden"
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: "linear-gradient(135deg, #0a84ff 0%, #5ac8fa 60%, #34d3ee 100%)",
        boxShadow: "var(--store-shadow)",
      }}
    >
      <span
        className="font-bold tracking-tight text-white"
        style={{ fontSize: size * 0.42, textShadow: "0 2px 12px rgba(0,0,0,0.25)" }}
      >
        SY
      </span>
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.25), transparent 45%)" }}
      />
    </div>
  );
}

function StoreCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`${className}`}
      style={{
        background: "var(--store-card)",
        border: "1px solid var(--store-border)",
        borderRadius: "var(--store-radius)",
        boxShadow: "var(--store-shadow)",
      }}
    >
      {children}
    </div>
  );
}

/* --------------------------------- iOS ------------------------------------ */

function IOSListing() {
  return (
    <div className="space-y-6">
      <IOSHero />
      <IOSMetricStrip />
      <IOSPreviews />
      <IOSSection title="What's New" trailing={<span className="text-xs" style={{ color: "var(--store-muted)" }}>Version 4.0</span>}>
        <IOSWhatsNew />
      </IOSSection>
      <IOSSection title="Preview" subtitle="Featured Projects">
        <ProjectsGrid store="ios" />
      </IOSSection>
      <IOSSection title="Description">
        <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "var(--store-muted)" }}>
          Mobile Application Developer with 4+ years of experience building scalable Android and iOS applications using Flutter, Dart, Swift, UIKit, and Java, with backend experience building APIs and data pipelines using Spring Boot.
          
          Shipped and scaled production apps including ORUphones and Phone Health Check, designed with Clean Architecture, BLoC, Provider, Repository Pattern, and Dependency Injection. Experienced integrating REST APIs, Firebase, WebSockets, native platform features, and CI/CD pipelines.
          
          Delivered 5+ production applications, improved app performance and launch time by 20%, and owned end-to-end mobile delivery from development through App Store / Play Store release.
        </p>
      </IOSSection>
      <IOSSection title="Ratings & Reviews" trailing={<a href="#reviews" className="text-sm font-medium" style={{ color: "var(--store-accent)" }}>See All</a>}>
        <IOSRatings />
      </IOSSection>
      <IOSSection title="Version History">
        <VersionHistory store="ios" />
      </IOSSection>
      <IOSSection title="Information">
        <IOSInfo />
      </IOSSection>
      <IOSSection title="Supports">
        <SkillTiles store="ios" />
      </IOSSection>
      <ContactCTA store="ios" />
    </div>
  );
}

function IOSHero() {
  return (
    <section className="flex flex-col gap-5 pt-2 md:flex-row md:items-start md:gap-6">
      <AppIcon store="ios" size={132} />
      <div className="flex-1">
        <h1 className="text-[26px] font-bold leading-tight tracking-tight md:text-[30px]">
          Sourabh Yadav
        </h1>
        <p className="text-sm" style={{ color: "var(--store-muted)" }}>
          Flutter · iOS · Android — Mobile Developer
        </p>
        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.a
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="inline-flex items-center rounded-full px-5 py-1.5 text-sm font-semibold uppercase"
              style={{ background: "var(--store-chip)", color: "var(--store-accent)" }}
            >
              Hire
            </motion.a>
            <button
              onClick={handleShare}
              aria-label="Share"
              className="grid h-8 w-8 place-items-center rounded-full transition-transform active:scale-95 cursor-pointer"
              style={{ color: "var(--store-accent)" }}
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function IOSMetricStrip() {
  const cells = [
    { top: "4.9", mid: <Stars n={5} size={10} />, bot: "1.2K Ratings" },
    { top: "#12", mid: <span className="text-[10px] font-semibold uppercase" style={{ color: "var(--store-muted)" }}>Chart</span>, bot: "in Developer Tools" },
    { top: "4+", mid: <Award className="h-4 w-4" style={{ color: "var(--store-muted)" }} />, bot: "Years" },
    { top: "EN", mid: <Globe className="h-4 w-4" style={{ color: "var(--store-muted)" }} />, bot: "Hindi · English" },
  ];
  return (
    <div className="overflow-x-auto">
      <div className="flex divide-x" style={{ borderTop: "1px solid var(--store-divider)", borderBottom: "1px solid var(--store-divider)" }}>
        {cells.map((c, i) => (
          <div key={i} className="flex min-w-[110px] flex-1 flex-col items-center justify-center gap-1 px-4 py-3" style={{ borderColor: "var(--store-divider)" }}>
            <div className="text-lg font-bold">{c.top}</div>
            {c.mid}
            <div className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--store-muted)" }}>{c.bot}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function IOSSection({
  title,
  subtitle,
  trailing,
  children,
}: {
  title: string;
  subtitle?: string;
  trailing?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight md:text-2xl">{title}</h2>
          {subtitle && <p className="text-xs" style={{ color: "var(--store-muted)" }}>{subtitle}</p>}
        </div>
        {trailing}
      </div>
      {children}
    </section>
  );
}

function IOSPreviews() {
  return (
    <div className="-mx-4 overflow-x-auto px-4 md:-mx-6 md:px-6">
      <div className="flex gap-3 pb-2">
        {PROJECTS.map((p) => (
          <motion.a
            key={p.name}
            href={p.link ?? "#"}
            target={p.link ? "_blank" : undefined}
            rel="noreferrer"
            whileHover={{ y: -4 }}
            className="relative aspect-[9/16] w-[180px] shrink-0 overflow-hidden md:w-[220px]"
            style={{ borderRadius: 22, background: "var(--store-card-2)", border: "1px solid var(--store-border)" }}
          >
            <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 p-3" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }}>
              <div className="text-xs font-semibold text-white">{p.name}</div>
              <div className="text-[10px] text-white/80">{p.tag}</div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}

function IOSWhatsNew() {
  const job = EXPERIENCE[0];
  return (
    <StoreCard className="p-5">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-sm font-semibold">{job.role}</div>
        <div className="text-xs" style={{ color: "var(--store-muted)" }}>{job.period}</div>
      </div>
      <div className="text-xs font-medium" style={{ color: "var(--store-accent)" }}>{job.company}</div>
      <ul className="mt-3 space-y-2 text-sm" style={{ color: "var(--store-fg)" }}>
        {job.bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full" style={{ background: "var(--store-accent)" }} />
            <span style={{ color: "var(--store-muted)" }}>{b}</span>
          </li>
        ))}
      </ul>
    </StoreCard>
  );
}

function IOSRatings() {
  return (
    <StoreCard className="p-6">
      <div id="reviews" className="flex items-end justify-between border-b pb-4" style={{ borderColor: "var(--store-divider)" }}>
        <div>
          <div className="text-5xl font-bold leading-none">4.9</div>
          <div className="mt-1 text-xs" style={{ color: "var(--store-muted)" }}>out of 5</div>
        </div>
        <div className="text-right">
          <Stars n={5} size={14} />
          <div className="mt-1 text-xs" style={{ color: "var(--store-muted)" }}>1.2K Ratings</div>
        </div>
      </div>
      <div className="mt-4 divide-y" style={{ borderColor: "var(--store-divider)" }}>
        {REVIEWS.map((r) => (
          <div key={r.title} className="py-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">{r.title}</div>
              <Stars n={r.rating} />
            </div>
            <div className="text-[11px]" style={{ color: "var(--store-muted)" }}>{r.name}</div>
            <p className="mt-2 text-sm" style={{ color: "var(--store-muted)" }}>{r.body}</p>
          </div>
        ))}
      </div>
    </StoreCard>
  );
}

function IOSInfo() {
  const rows = [
    { k: "Developer", v: "Sourabh Yadav" },
    { k: "Location", v: "Gurugram, India" },
    { k: "Category", v: "Mobile Development" },
    { k: "Education", v: "B.Tech CSE · MITRC · CGPA 7.79" },
    { k: "Achievements", v: "SIH 2022 Winner (PIB)" },
    { k: "Languages", v: "English, Hindi" },
    { k: "Age Rating", v: "4+ Years Experience" },
  ];
  return (
    <StoreCard className="divide-y overflow-hidden" >
      {rows.map((r) => (
        <div key={r.k} className="flex items-center justify-between px-5 py-3.5" style={{ borderColor: "var(--store-divider)" }}>
          <span className="text-sm" style={{ color: "var(--store-muted)" }}>{r.k}</span>
          <span className="text-sm font-medium text-right">{r.v}</span>
        </div>
      ))}
    </StoreCard>
  );
}

/* -------------------------------- Android --------------------------------- */

function AndroidListing() {
  return (
    <div className="space-y-8">
      <AndroidHero />
      <AndroidMetricStrip />
      <AndroidTabs />
      <AndroidSection id="about" title="About this developer" trailing={<ChevronRight className="h-5 w-5" style={{ color: "var(--store-muted)" }} />}>
        <p className="text-sm leading-relaxed" style={{ color: "var(--store-muted)" }}>
          Mobile Application Developer with 4+ years of experience building scalable Android and iOS applications using Flutter, Dart, Swift, UIKit, and Java, with backend experience building APIs and data pipelines using Spring Boot. Shipped and scaled production apps including ORUphones and Phone Health Check, designed with Clean Architecture, BLoC, Provider, Repository Pattern, and Dependency Injection. Experienced integrating REST APIs, Firebase, WebSockets, native platform features, and CI/CD pipelines. Delivered 5+ production applications, improved app performance and launch time by 20%, and owned end-to-end mobile delivery from development through App Store / Play Store release.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {["Flutter Dev", "iOS", "Android", "Clean Arch", "BLoC", "Platform Channels"].map((c) => (
            <span key={c} className="rounded-full px-3 py-1 text-xs font-medium" style={{ background: "var(--store-chip)", color: "var(--store-accent)" }}>#{c}</span>
          ))}
        </div>
      </AndroidSection>

      <AndroidSection id="projects" title="Featured apps" trailing={<a href="#projects" className="text-sm font-semibold" style={{ color: "var(--store-accent)" }}>See all</a>}>
        <ProjectsGrid store="android" />
      </AndroidSection>

      <AndroidSection id="reviews" title="Ratings and reviews">
        <AndroidRatings />
      </AndroidSection>

      <AndroidSection title="What's new" trailing={<span className="text-xs" style={{ color: "var(--store-muted)" }}>Updated recently</span>}>
        <VersionHistory store="android" />
      </AndroidSection>

      <AndroidSection id="skills" title="Categories & tech">
        <SkillTiles store="android" />
      </AndroidSection>

      <AndroidSection title="Developer info">
        <AndroidInfo />
      </AndroidSection>

      <ContactCTA store="android" />
    </div>
  );
}

function AndroidHero() {
  return (
    <section className="pt-2">
      <div className="flex items-start gap-5">
        <AppIcon store="android" size={112} />
        <div className="flex-1">
          <h1 className="text-2xl font-medium leading-tight md:text-3xl">Sourabh Yadav</h1>
          <div className="mt-1 text-sm font-medium" style={{ color: "var(--store-accent)" }}>Flutter Developer · Mobile Apps</div>
          <div className="mt-1 text-xs" style={{ color: "var(--store-muted)" }}>
            Contains projects · In-app collaboration
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <motion.a
          whileTap={{ scale: 0.97 }}
          href="#contact"
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold"
          style={{ background: "var(--store-accent)", color: "var(--store-accent-fg)" }}
        >
          HIRE <Download className="h-4 w-4" />
        </motion.a>
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium transition-transform active:scale-95 cursor-pointer"
          style={{ background: "var(--store-chip)", color: "var(--store-accent)" }}
        >
          <Share2 className="h-4 w-4" /> Share
        </button>
      </div>
    </section>
  );
}

function AndroidMetricStrip() {
  const cells = [
    { top: "4.9★", bot: "1.2K reviews", icon: null },
    { top: "5+", bot: "Downloads", icon: <Download className="h-3 w-3" /> },
    { top: "4+ yrs", bot: "Experience", icon: <Briefcase className="h-3 w-3" /> },
    { top: "Editor's", bot: "Choice", icon: <Award className="h-3 w-3" /> },
  ];
  return (
    <div className="grid grid-cols-4 gap-2 text-center">
      {cells.map((c, i) => (
        <div key={i} className="flex flex-col items-center gap-1 py-2">
          <div className="text-sm font-semibold">{c.top}</div>
          <div className="inline-flex items-center gap-1 text-[10px] font-medium" style={{ color: "var(--store-muted)" }}>
            {c.icon}{c.bot}
          </div>
        </div>
      ))}
    </div>
  );
}

function AndroidTabs() {
  const tabs = [
    { label: "About", id: "about" },
    { label: "Projects", id: "projects" },
    { label: "Reviews", id: "reviews" },
    { label: "Skills", id: "skills" },
  ];
  const [activeTab, setActiveTab] = useState("about");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) {
          setActiveTab(visible.target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    tabs.forEach((t) => {
      const el = document.getElementById(t.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="flex gap-6 border-b overflow-x-auto" style={{ borderColor: "var(--store-divider)" }}>
      {tabs.map((t) => {
        const active = activeTab === t.id;
        return (
          <button
            key={t.id}
            onClick={() => handleTabClick(t.id)}
            className="relative py-3 text-sm font-medium transition-colors whitespace-nowrap cursor-pointer"
            style={{ color: active ? "var(--store-accent)" : "var(--store-muted)" }}
          >
            {t.label}
            {active && (
              <motion.span
                layoutId="android-tab-pill"
                className="absolute inset-x-0 -bottom-px h-0.5 rounded-full"
                style={{ background: "var(--store-accent)" }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

function AndroidSection({
  title,
  id,
  trailing,
  children,
}: {
  title: string;
  id?: string;
  trailing?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold md:text-lg">{title}</h2>
        {trailing}
      </div>
      {children}
    </section>
  );
}

function AndroidRatings() {
  const dist = [5, 4, 3, 2, 1].map((n) => ({ n, pct: [92, 6, 1, 0.5, 0.5][5 - n] }));
  return (
    <div>
      <div className="flex items-center gap-6">
        <div>
          <div className="text-5xl font-normal">4.9</div>
          <Stars n={5} size={12} />
          <div className="mt-1 text-xs" style={{ color: "var(--store-muted)" }}>1,204</div>
        </div>
        <div className="flex-1 space-y-1.5">
          {dist.map((d) => (
            <div key={d.n} className="flex items-center gap-2">
              <span className="w-2 text-[10px]" style={{ color: "var(--store-muted)" }}>{d.n}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full" style={{ background: "var(--store-divider)" }}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${d.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full"
                  style={{ background: "var(--store-accent)" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 space-y-4">
        {REVIEWS.map((r) => (
          <div key={r.title} className="rounded-2xl p-4" style={{ background: "var(--store-card-2)", border: "1px solid var(--store-border)" }}>
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-full text-sm font-semibold" style={{ background: "var(--store-chip)", color: "var(--store-accent)" }}>
                {r.name[0]}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">{r.name}</div>
                <Stars n={r.rating} size={11} />
              </div>
            </div>
            <p className="mt-3 text-sm" style={{ color: "var(--store-muted)" }}>{r.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AndroidInfo() {
  const rows = [
    { k: "Version", v: "4.0 (Zime.ai)", icon: Download },
    { k: "Updated on", v: "Dec 2025", icon: Calendar },
    { k: "Requires", v: "Flutter 3.x · Dart 3.x", icon: Shield },
    { k: "Education", v: "B.Tech CSE · MITRC · CGPA 7.79", icon: Award },
    { k: "Downloads", v: "5+ production apps", icon: Users },
    { k: "Achievements", v: "SIH 2022 Winner (PIB)", icon: Star },
  ];
  return (
    <div className="grid grid-cols-2 gap-4">
      {rows.map((r) => (
        <div key={r.k} className="flex items-start gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full" style={{ background: "var(--store-chip)", color: "var(--store-accent)" }}>
            <r.icon className="h-4 w-4" />
          </div>
          <div>
            <div className="text-xs" style={{ color: "var(--store-muted)" }}>{r.k}</div>
            <div className="text-sm font-medium">{r.v}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* --------------------------- Shared components ---------------------------- */

function ProjectsGrid({ store }: { store: Store }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {PROJECTS.map((p) => (
        <motion.a
          key={p.name}
          whileHover={{ y: -2 }}
          href={p.link ?? undefined}
          onClick={(e) => {
            if (!p.link) {
              e.preventDefault();
              toast.info("This SIH 2022 winning application was built internally for the Press Information Bureau and is not publicly listed on App Store / Play Store.");
            }
          }}
          target={p.link ? "_blank" : undefined}
          rel="noreferrer"
          className="flex items-start gap-3 p-3"
          style={{
            background: "var(--store-card)",
            border: "1px solid var(--store-border)",
            borderRadius: "var(--store-radius-sm)",
          }}
        >
          <div
            className="h-16 w-16 shrink-0 overflow-hidden"
            style={{ borderRadius: store === "ios" ? 14 : 12 }}
          >
            <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold">{p.name}</div>
            <div className="truncate text-xs" style={{ color: "var(--store-muted)" }}>{p.category}</div>
            <div className="mt-1 flex items-center gap-1.5 text-[11px]" style={{ color: "var(--store-muted)" }}>
              <Star className="h-3 w-3" fill="currentColor" strokeWidth={0} style={{ color: "var(--store-star)" }} />
              <span className="font-medium" style={{ color: "var(--store-fg)" }}>{p.rating}</span>
              <span>· {p.reviews}</span>
            </div>
          </div>
          {p.link && <ArrowUpRight className="h-4 w-4 shrink-0" style={{ color: "var(--store-muted)" }} />}
        </motion.a>
      ))}
    </div>
  );
}

function VersionHistory({ store }: { store: Store }) {
  return (
    <div className="space-y-3">
      {EXPERIENCE.map((job) => (
        <div
          key={job.role}
          className="p-5"
          style={{
            background: store === "ios" ? "var(--store-card)" : "var(--store-card-2)",
            border: "1px solid var(--store-border)",
            borderRadius: "var(--store-radius-sm)",
          }}
        >
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">{job.role}</div>
            <span className="rounded-full px-2 py-0.5 text-[10px] font-mono font-semibold" style={{ background: "var(--store-chip)", color: "var(--store-accent)" }}>
              {job.version}
            </span>
          </div>
          <div className="mt-0.5 flex items-center justify-between text-xs" style={{ color: "var(--store-muted)" }}>
            <span>{job.company}</span>
            <span>{job.period}</span>
          </div>
          <ul className="mt-3 space-y-1.5 text-sm" style={{ color: "var(--store-muted)" }}>
            {job.bullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full" style={{ background: "var(--store-accent)" }} />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function SkillTiles({ store }: { store: Store }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {SKILL_CATEGORIES.map((s) => (
        <div
          key={s.title}
          className="p-4"
          style={{
            background: store === "ios" ? "var(--store-card)" : "var(--store-card-2)",
            border: "1px solid var(--store-border)",
            borderRadius: "var(--store-radius-sm)",
          }}
        >
          <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--store-accent)" }}>{s.title}</div>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {s.items.map((i) => (
              <span key={i} className="rounded-full px-2.5 py-1 text-xs" style={{ background: "var(--store-chip)", color: "var(--store-fg)" }}>
                {i}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ContactCTA({ store }: { store: Store }) {
  return (
    <section id="contact">
      <div
        className="overflow-hidden p-8 md:p-10"
        style={{
          borderRadius: "var(--store-radius)",
          background: store === "ios"
            ? "linear-gradient(135deg, #007aff 0%, #34aadc 100%)"
            : "linear-gradient(135deg, #01875f 0%, #34a853 100%)",
          color: "#ffffff",
        }}
      >
        <div className="text-xs font-semibold uppercase tracking-widest opacity-80">Developer contact</div>
        <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Ship your next app with me.</h2>
        <p className="mt-3 max-w-lg text-sm opacity-90 md:text-base">
          New Flutter build, stalled iOS release, or a legacy migration — I'd love to hear about it.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="mailto:sourabhyadav564@gmail.com"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold"
            style={{ color: store === "ios" ? "#007aff" : "#01875f" }}
          >
            <Mail className="h-4 w-4" /> sourabhyadav564@gmail.com
          </a>
          <a
            href="tel:+916375197371"
            className="inline-flex items-center gap-2 rounded-full border border-white/60 px-5 py-2.5 text-sm font-semibold text-white"
          >
            <Phone className="h-4 w-4" /> +91 63751 97371
          </a>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-white/90">
          <a href="https://github.com/sourabhyadav564" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5">
            <Github className="h-4 w-4" /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/sourabhyadav100/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5">
            <Linkedin className="h-4 w-4" /> LinkedIn
          </a>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4" /> Gurugram, India
          </span>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: "var(--store-divider)" }}>
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs md:flex-row md:px-6" style={{ color: "var(--store-muted)" }}>
        <div>© {new Date().getFullYear()} Sourabh Yadav · Flutter Mobile Developer</div>
        <div>Gurugram, India · Available worldwide</div>
      </div>
    </footer>
  );
}
