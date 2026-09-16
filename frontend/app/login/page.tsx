"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { GraduationCap, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { supabaseSignIn } from "@/lib/auth"
import { motion } from "framer-motion"
import { useSchoolName } from "@/lib/school-settings-context"
import { useLanguage } from "@/lib/i18n/context"

const loginStrings = {
  ar: {
    tagline: "نظام الإدارة الذكي",
    heroTitle1: "إدارة مدرستك",
    heroTitle2: "بكفاءة عالية",
    heroDesc: "منصة متكاملة لإدارة الطلاب، المعلمين، الجداول الدراسية، والدرجات في مكان واحد.",
    features: [
      "إدارة الطلاب وسجلاتهم الكاملة",
      "جداول دراسية أسبوعية منظمة",
      "تقارير وتحليلات إدارية دقيقة",
      "واجهة سهلة الاستخدام بالكامل",
    ],
    rights: "جميع الحقوق محفوظة.",
    title: "تسجيل الدخول",
    subtitle: "أدخل بيانات حسابك للوصول إلى لوحة التحكم",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    showPassword: "إظهار كلمة المرور",
    hidePassword: "إخفاء كلمة المرور",
    submit: "تسجيل الدخول",
    submitting: "جاري التحقق...",
    quickLoginLabel: "دخول سريع (تجريبي)",
    quickAdmin: "دخول كأدمن",
    quickTeacher: "دخول كمعلم",
    noAccount: "ليس لديك حساب إدارة؟",
    createAccount: "إنشاء حساب جديد",
    fillFields: "يرجى ملء جميع الحقول",
    welcome: (name: string) => `مرحباً ${name}`,
    invalidCreds: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
  },
  en: {
    tagline: "Smart Management System",
    heroTitle1: "Manage Your School",
    heroTitle2: "With High Efficiency",
    heroDesc: "An integrated platform to manage students, teachers, schedules, and grades in one place.",
    features: [
      "Full management of students and their records",
      "Organized weekly class schedules",
      "Accurate administrative reports and analytics",
      "A fully easy-to-use interface",
    ],
    rights: "All rights reserved.",
    title: "Sign In",
    subtitle: "Enter your account details to access the dashboard",
    email: "Email",
    password: "Password",
    showPassword: "Show password",
    hidePassword: "Hide password",
    submit: "Sign In",
    submitting: "Checking...",
    quickLoginLabel: "Quick login (demo)",
    quickAdmin: "Login as Admin",
    quickTeacher: "Login as Teacher",
    noAccount: "Don't have an admin account?",
    createAccount: "Create a new account",
    fillFields: "Please fill in all fields",
    welcome: (name: string) => `Welcome ${name}`,
    invalidCreds: "Incorrect email or password",
  },
} as const

export default function LoginPage() {
  const router = useRouter()
  const { schoolName } = useSchoolName()
  const { language, setLanguage } = useLanguage()
  const ls = loginStrings[language]
  const dir = language === "ar" ? "rtl" : "ltr"

  // Fixed brand palette for the public site (independent of the admin dashboard's theme picker,
  // so the login page and landing page always stay visually coordinated) — blue with a dark navy/black accent
  const tc = { from: "from-blue-600", via: "via-blue-800", to: "to-slate-900", btn: "bg-blue-600", btnHover: "hover:bg-blue-700", text: "text-blue-400", textHover: "hover:text-blue-300", shadow: "shadow-blue-700/25", ring: "focus:border-blue-500 focus:ring-blue-500/50", dot: "bg-blue-500", glow1: "bg-blue-700/20", glow2: "bg-slate-700/25" }
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  async function doLogin(loginEmail: string, loginPassword: string) {
    setLoading(true)

    if (!loginEmail || !loginPassword) {
      toast.error(ls.fillFields)
      setLoading(false)
      return
    }

    const user = await supabaseSignIn(loginEmail, loginPassword)
    if (user) {
      toast.success(ls.welcome(user.name))
      if (user.role === "teacher") {
        router.push("/teacher")
      } else {
        router.push("/dashboard")
      }
    } else {
      toast.error(ls.invalidCreds)
    }
    setLoading(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await doLogin(email, password)
  }

  function handleQuickLogin(quickEmail: string, quickPassword: string) {
    setEmail(quickEmail)
    setPassword(quickPassword)
    doLogin(quickEmail, quickPassword)
  }

  return (
    <main className="flex min-h-screen bg-slate-50 relative overflow-hidden" dir={dir}>
      {/* Language toggle */}
      <button
        type="button"
        onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
        className="absolute top-4 z-20 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 shadow-sm transition-colors"
        style={dir === "rtl" ? { left: "1rem" } : { right: "1rem" }}
      >
        {language === "ar" ? "English" : "العربية"}
      </button>

      {/* Left branding panel (desktop only) */}
      <div className={`hidden lg:flex flex-col justify-between w-[420px] flex-shrink-0 bg-gradient-to-br from-slate-900 ${tc.via} to-slate-950 p-10 relative z-10 overflow-hidden`}>
        {/* Background layers */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
              backgroundSize: "48px 48px",
            }}
          />
          <div className={`absolute -top-32 -right-32 h-[400px] w-[400px] rounded-full ${tc.glow1} blur-[120px]`} />
          <div className={`absolute -bottom-32 -left-32 h-[350px] w-[350px] rounded-full ${tc.glow2} blur-[100px]`} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${tc.from} ${tc.via.replace("via-", "to-")} shadow-md ${tc.shadow.replace("600/25", "500/25")}`}>
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-sm text-white leading-tight">{schoolName}</p>
              <p className={`text-[10px] ${tc.text}`}>{ls.tagline}</p>
            </div>
          </div>

          <h2 className="text-2xl font-extrabold text-white leading-snug mb-3">
            {ls.heroTitle1}<br />{ls.heroTitle2}
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
            {ls.heroDesc}
          </p>

          <div className="mt-8 space-y-3">
            {ls.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-2.5 text-sm text-slate-400">
                <div className={`h-1.5 w-1.5 rounded-full ${tc.dot} flex-shrink-0`} />
                {feature}
              </div>
            ))}
          </div>

          {/* School illustration */}
          <div className="mt-10 relative flex items-center justify-center py-6">
            <div className={`absolute h-40 w-40 rounded-full bg-gradient-to-br ${tc.from} ${tc.via.replace("via-", "to-")} opacity-10 blur-2xl`} />
            <svg viewBox="0 0 200 140" className="relative w-56 h-auto">
              <ellipse cx="100" cy="120" rx="85" ry="8" fill="white" opacity="0.04" />
              <rect x="55" y="60" width="90" height="55" rx="4" fill="white" opacity="0.06" />
              <rect x="55" y="60" width="90" height="10" rx="2" fill="white" opacity="0.1" />
              <rect x="65" y="78" width="70" height="4" rx="2" fill="white" opacity="0.12" />
              <rect x="65" y="88" width="50" height="4" rx="2" fill="white" opacity="0.12" />
              <rect x="65" y="98" width="60" height="4" rx="2" fill="white" opacity="0.12" />
              <g transform="translate(100 35)">
                <path d="M0 -18 L38 -2 L0 14 L-38 -2 Z" className={tc.text} fill="currentColor" opacity="0.9" />
                <path d="M-38 -2 L-38 14 L0 30 L38 14 L38 -2" fill="none" className={tc.text} stroke="currentColor" strokeOpacity="0.4" strokeWidth="2" />
                <line x1="30" y1="2" x2="30" y2="22" className={tc.text} stroke="currentColor" strokeWidth="2" />
                <circle cx="30" cy="24" r="2.5" className={tc.text} fill="currentColor" />
              </g>
              <g opacity="0.5">
                <circle cx="30" cy="30" r="3" className={tc.text} fill="currentColor" />
                <circle cx="172" cy="50" r="2.5" className={tc.text} fill="currentColor" />
                <circle cx="20" cy="90" r="2" className={tc.text} fill="currentColor" />
                <circle cx="180" cy="100" r="3" className={tc.text} fill="currentColor" />
              </g>
            </svg>
          </div>
        </div>

        <p className="relative z-10 text-[11px] text-slate-500">© {new Date().getFullYear()} {schoolName}. {ls.rights}</p>
      </div>

      {/* Right form panel */}
      <div className="flex flex-1 items-center justify-center px-4 py-10 relative z-10">
        <div className="w-full max-w-[400px]">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${tc.from} ${tc.via.replace("via-", "to-")} shadow-md ${tc.shadow.replace("600/25", "500/25")}`}>
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-sm text-slate-900 leading-tight">{schoolName}</p>
              <p className={`text-[10px] ${tc.text}`}>{ls.tagline}</p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, type: "spring", stiffness: 100, damping: 18 }}
            className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl shadow-slate-200/60"
          >
            <div className="mb-7 text-right">
              <h1 className="text-xl font-extrabold text-slate-900 mb-1">{ls.title}</h1>
              <p className="text-sm text-slate-500">{ls.subtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-slate-700 text-xs font-semibold">{ls.email}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@school.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`bg-slate-50 border-slate-200 text-left placeholder:text-slate-400 rounded-xl h-11 text-slate-900 transition-colors ${tc.ring}`}
                  dir="ltr"
                  autoComplete="email"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-slate-700 text-xs font-semibold">{ls.password}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`bg-slate-50 border-slate-200 text-left placeholder:text-slate-400 rounded-xl h-11 text-slate-900 pl-10 transition-colors ${tc.ring}`}
                    dir="ltr"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                    aria-label={showPassword ? ls.hidePassword : ls.showPassword}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className={`w-full ${tc.btn} ${tc.btnHover} text-white rounded-xl h-11 font-bold shadow-lg ${tc.shadow} border-0 transition-all duration-200 mt-2 disabled:opacity-60`}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    {ls.submitting}
                  </span>
                ) : ls.submit}
              </Button>
            </form>

            <div className="mt-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-[11px] text-slate-400">{ls.quickLoginLabel}</span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => handleQuickLogin("test@gmail.com", "test12345")}
                  className="rounded-xl h-10 text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors disabled:opacity-60"
                >
                  {ls.quickAdmin}
                </button>
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => handleQuickLogin("teacher1@gmail.com", "teacher12345")}
                  className="rounded-xl h-10 text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors disabled:opacity-60"
                >
                  {ls.quickTeacher}
                </button>
              </div>
            </div>

            <p className="mt-5 text-center text-xs text-slate-500">
              {ls.noAccount}{" "}
              <Link href="/register" className={`font-semibold ${tc.text} ${tc.textHover} transition-colors`}>
                {ls.createAccount}
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  )
}

