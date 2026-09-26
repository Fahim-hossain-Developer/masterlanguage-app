# 📘 MasterEnglish — Project Build Status & Complete Feature Documentation

> **Project Name:** MasterEnglish (English Learning & IELTS Preparation Platform)  
> **Workspace Path:** `d:\IELTS-APP`  
> **GitHub Repository:** `https://github.com/Fahim-hossain-Developer/masterlanguage-app` (`main` branch)  
> **Database:** Supabase PostgreSQL (`aws-0-ap-northeast-1.pooler.supabase.com:5432`)  
> **Frontend Dev Server:** `http://localhost:3000` (Next.js 15 + React + TypeScript + Tailwind CSS)

---

## 📊 ১. প্রজেক্টের বর্তমান অবস্থা (Overall Build Progress: 100% Ready)

| ফেজ / মডিউল (Module) | স্ট্যাটাস | কী কী তৈরি করা হয়েছে (Summary) |
| :--- | :---: | :--- |
| **Phase 0–1: Design & Navigation** | ✅ ১০০% সম্পন্ন | ক্লিন Academic-Blue ও White থিম, রেসপনসিভ Navbar (IELTS ও English ড্রপডাউন সহ) এবং Footer |
| **Phase 2: Question Bank Foundation** | ✅ ১০০% সম্পন্ন | রিডিং, লিসেনিং, গ্রামার, ভোকাবুলারি এবং **Cambridge 9–19**-এর জন্য স্ট্রাকচার্ড Question Bank |
| **Phase 3: Reusable Test Engine** | ✅ ১০০% সম্পন্ন | স্প্লিট-স্ক্রিন প্যাসেজ + প্রশ্ন, মোবাইল ট্যাব ভিউ, অটো-সেভ (Auto-save), টাইমার (`expiresAt`), এবং Resume সিস্টেম |
| **Phase 4: Cambridge IELTS 9–19 Series** | ✅ ১০০% সম্পন্ন | **Cambridge IELTS 9 থেকে 19 (মোট ১১টি বই × ৪টি টেস্ট = ৪৪টি পূর্ণাঙ্গ টেস্ট)** — Reading, Listening, Writing, Speaking ও Full Mock |
| **Phase 5: Wrong Answer & Result Review** | ✅ ১০০% সম্পন্ন | টেস্ট শেষে Band Score, Accuracy %, এবং প্রতিটি ভুল ও ফাঁকা উত্তরের ইংরেজি + বাংলা ব্যাখ্যা |
| **Phase 6: English Learning (5 Levels)** | ✅ ১০০% সম্পন্ন | `Basic`, `Elementary`, `Intermediate`, `Upper Intermediate`, `Advanced` লেভেল + গ্রামার ও ভোকাবুলারি |
| **Phase 7: Digital English Books & PDF Reader** | ✅ ১০০% সম্পন্ন | ব্রাউজারের ভেতরেই সরাসরি **PDF Viewer (`<iframe>`/`<object>`)**, জুম, ফুলস্ক্রিন ও চ্যাপ্টার রিডার |
| **Phase 8: IELTS Tips & Tricks** | ✅ ১০০% সম্পন্ন | ক্যাটাগরি ফিল্টারসহ স্ট্র্যাটেজি গাইড এবং সরাসরি প্র্যাকটিস লিংক |
| **Phase 9: Modular Daily Practice** | ✅ ১০০% সম্পন্ন | ৫–১২ মিনিটের ডেইলি প্র্যাকটিস সেট যা সরাসরি Test Engine-এ চলে |
| **Phase 10: Student Dashboard & Bookmarks** | ✅ ১০০% সম্পন্ন | Continue Learning, Unfinished Test Resume, Saved Bookmarks ও Profile পেজ |
| **Phase 11: Admin Content Manager (`/admin`)** | ✅ ১০০% সম্পন্ন | নিজস্ব `.pdf` বই আপলোড, নতুন টিপস, ডেইলি প্র্যাকটিস, ইংলিশ লেসন এবং প্রশ্ন যোগ/ডিলিট করার প্যানেল |
| **Phase 12: Supabase DB & GitHub Auto-Push** | ✅ ১০০% সম্পন্ন | Prisma স্কিমা Supabase-এ পুশ ও সিড করা হয়েছে এবং সব কোড GitHub `main` ব্রাঞ্চে পুশ করা হয়েছে |

---

## 🌐 ২. সবগুলো পেজ ও লাইভ লিংক (All Live Routes)

### 🏠 পাবলিক ও কোর পেজসমূহ
- **হোমপেজ (Landing Page):** `http://localhost:3000/`
- **গ্লোবাল সার্চ (Global Search):** `http://localhost:3000/search`
- **অ্যাডমিন প্যানেল (Admin CMS & File Upload):** `http://localhost:3000/admin`

### 🎓 IELTS & Cambridge 9–19 মডিউলসমূহ
- **Cambridge IELTS 9–19 মূল হাব:** `http://localhost:3000/ielts` (Book 9 থেকে 19 সিলেক্টর + Test 1, 2, 3, 4)
- **Full Mock Tests (Cam 9–19):** `http://localhost:3000/ielts/full-mock`
- **IELTS Reading (Cam 9–19 · Passages 1–3):** `http://localhost:3000/ielts/reading`
- **IELTS Listening (Cam 9–19 · Parts 1–4):** `http://localhost:3000/ielts/listening`
- **IELTS Writing (Cam 9–19 · Task 1 & Task 2):** `http://localhost:3000/ielts/writing`
- **IELTS Speaking (Cam 9–19 · Part 1, Cue Card & Part 3):** `http://localhost:3000/ielts/speaking`
- **Question Type Practice (Filter by Type & Difficulty):** `http://localhost:3000/ielts/question-types`
- **Unified Test Engine Runner:** `http://localhost:3000/test-engine/[attemptId]`

### 📘 English Learning, Books, Tips & Daily Practice
- **English Learning Hub (5 Levels):** `http://localhost:3000/english`
  - **Level 1 — Basic:** `http://localhost:3000/english/basic`
  - **Level 2 — Elementary:** `http://localhost:3000/english/elementary`
  - **Level 3 — Intermediate:** `http://localhost:3000/english/intermediate`
  - **Level 4 — Upper Intermediate:** `http://localhost:3000/english/upper-intermediate`
  - **Level 5 — Advanced:** `http://localhost:3000/english/advanced`
- **English & IELTS Study Books Library:** `http://localhost:3000/books`
- **Built-in PDF & Book Reader:** `http://localhost:3000/books/[slug]`
- **IELTS Tips & Tricks:** `http://localhost:3000/tips` এবং `http://localhost:3000/tips/[slug]`
- **Daily Practice Sets:** `http://localhost:3000/daily-practice`

### 👨‍🎓 স্টুডেন্ট ড্যাশবোর্ড ও রেজাল্ট রিভিউ
- **Student Dashboard:** `http://localhost:3000/dashboard`
- **My Results & Mistake History:** `http://localhost:3000/dashboard/results`
- **Detailed Wrong Answer Review:** `http://localhost:3000/dashboard/results/[attemptId]`
- **Saved Bookmarks (Questions, Books, Lessons, Tips):** `http://localhost:3000/dashboard/saved`
- **Student Profile & Target Band:** `http://localhost:3000/dashboard/profile`
- **Authentication Pages:** `http://localhost:3000/login`, `http://localhost:3000/register`

---

## 🛠️ ৩. কোন ফিচার কীভাবে কাজ করে (Feature Breakdown)

### ১) Cambridge IELTS 9 থেকে 19 সম্পূর্ণ সিরিজ (`src/lib/cambridge-data.ts`)
- **Cambridge IELTS 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19** — মোট ১১টি বইয়ের প্রতিটিতে **Test 1, Test 2, Test 3, Test 4** (মোট ৪৪টি টেস্ট) যুক্ত করা হয়েছে।
- প্রতিটি টেস্টের ভেতরে আসল Cambridge বইয়ের টপিক ও ফরম্যাট অনুযায়ী রয়েছে:
  - **Listening:** Part 1 (Conversation), Part 2 (Monologue), Part 3 (Academic Discussion), Part 4 (University Lecture)।
  - **Reading:** Passage 1 (Q1–13), Passage 2 (Q14–26), Passage 3 (Q27–40)।
  - **Writing:** Task 1 (Bar Chart, Line Graph, Pie Chart, Table, Map, Process Diagram — ২০ মিনিট, ১৫০+ শব্দ) এবং Task 2 Essay (৪০ মিনিট, ২৫০+ শব্দ)।
  - **Speaking:** Part 1 (Interview), Part 2 (Cue Card — ১ মিনিট প্রস্তুতি + ২ মিনিট স্পিকিং টাইমার), Part 3 (Two-Way Discussion) এবং ব্রাউজার ভয়েস রেকর্ডার।

### ২) Reusable Test Engine (`src/lib/test-engine.ts` & `src/app/test-engine/[attemptId]/page.tsx`)
- একই ইঞ্জিন দিয়ে **Full Mock Test**, **Cambridge 9–19 Reading/Listening**, **Question Type Practice**, **English Lesson Practice**, এবং **Daily Practice** চলে।
- **Auto-Save & Resume:** উত্তর পরিবর্তন বা পেজ রিলোড করলেও উত্তর এবং অবশিষ্ট সময় (`expiresAt`) নষ্ট হয় না। ড্যাশবোর্ড থেকে অসমাপ্ত টেস্ট **Resume** করা যায়।
- **Desktop & Mobile View:** ডেস্কটপে বাম পাশে প্যাসেজ ও ডান পাশে প্রশ্ন; মোবাইলে সহজে `Passage` এবং `Questions` ট্যাব সুইচ করা যায়।

### ৩) Wrong Answer Review (`src/app/dashboard/results/[attemptId]/page.tsx`)
- টেস্ট সাবমিট করার সাথে সাথে মোট স্কোর, সঠিক/ভুল/ফাঁকা উত্তরের সংখ্যা, Accuracy %, এবং IELTS Band Score দেখায়।
- শুধুমাত্র ভুল উত্তর (`Wrong Only`) বা ফাঁকা উত্তর (`Unanswered`) ফিল্টার করে প্রতিটির সঠিক উত্তর এবং **ইংরেজি ও বাংলা ব্যাখ্যা** দেখা যায়।

### ৪) Admin Content Management Panel (`src/app/admin/page.tsx`)
- `/admin` পেজ থেকে কোনো কোড ছাড়াই সরাসরি ওয়েবসাইটের কনটেন্ট নিয়ন্ত্রণ করা যায়:
  1. **Books Upload:** কম্পিউটার থেকে আসল `.pdf` বই আপলোড করলে তা `public/uploads/`-এ সেভ হয় এবং `/api/files/[filename]` স্ট্রিমিং এন্ডপয়েন্টের মাধ্যমে সরাসরি ব্রাউজারের PDF Viewer-এ ওপেন হয়।
  2. **IELTS Tips & Tricks:** নতুন টিপস আর্টিকেল যোগ ও পুরাতন ডেমো টিপস ডিলিট করা যায়।
  3. **Daily Practice Sets:** প্রশ্ন ব্যাংক থেকে প্রশ্ন বাছাই করে নতুন ডেইলি প্র্যাকটিস সেট তৈরি করা যায়।
  4. **English Learning Lessons:** ৫টি লেভেলের যেকোনো স্কিলে ইংরেজি ও বাংলা ব্যাখ্যাসহ নতুন লেসন যোগ করা যায়।
  5. **Question Bank:** নতুন প্রশ্ন, অপশন, সঠিক উত্তর ও বাংলা ব্যাখ্যা যোগ করা যায়।

---

## 📂 ৪. প্রজেক্টের ফাইল স্ট্রাকচার (Key Codebase Files)

```text
d:\IELTS-APP\
├── PROJECT_BUILD_STATUS.md                          # এই সম্পূর্ণ প্রজেক্ট ডকুমেন্টেশন ফাইল
├── backend\                                         # NestJS + Prisma + Supabase PostgreSQL Backend
│   ├── prisma\
│   │   ├── schema.prisma                            # ডাটাবেস স্কিমা (Users, Tests, QuestionBankItem, Book, TipArticle, DailyPracticeSet, Bookmark, ইত্যাদি)
│   │   └── seed.ts                                  # Supabase ডাটাবেস সিডার
│   └── src\                                         # NestJS মডিউলসমূহ (Auth, Users, Prisma, Upload)
│
└── frontend\                                        # Next.js 15 App Router Frontend
    ├── data\
    │   └── cms-content.json                         # Admin Panel-এর পারসিস্টেন্ট সার্ভার ডাটা স্টোর
    ├── public\
    │   └── uploads\                                 # Admin Panel থেকে আপলোড করা সকল .pdf ও মিডিয়া ফাইল
    └── src\
        ├── lib\
        │   ├── cambridge-data.ts                    # Cambridge IELTS 9 থেকে 19 (৪৪টি টেস্ট)-এর সম্পূর্ণ ডাটা ও ইঞ্জিন বিল্ডার
        │   ├── question-bank.ts                     # কোর Question Bank, Passages, Books, Tips, Lessons ও Vocabulary ডাটা
        │   ├── test-engine.ts                       # অটো-সেভ, টাইমার, ব্যান্ড স্কোরিং, মিসটেক রিভিউ এবং বুকমার্ক ইঞ্জিন
        │   └── cms-store.ts                         # Admin Panel ও পাবলিক পেজগুলোর রিয়েল-টাইম সিঙ্ক হুক (useCMSContent)
        ├── components\layout\
        │   ├── main-navbar.tsx                      # মেইন ন্যাভবার (Cambridge 9–19 কুইক মেনু ও Admin বাটন সহ)
        │   └── main-footer.tsx                      # মেইন ফুটার
        └── app\
            ├── page.tsx                             # হোমপেজ
            ├── admin\page.tsx                       # Admin Content Management System (/admin)
            ├── api\
            │   ├── upload\route.ts                  # .pdf ও ফাইল আপলোড API
            │   ├── files\[filename]\route.ts        # ইনলাইন PDF স্ট্রিমিং API (SAMEORIGIN সাপোর্ট সহ)
            │   └── cms\route.ts                     # CMS JSON রিড/রাইট API
            ├── ielts\
            │   ├── page.tsx                         # Cambridge IELTS 9–19 Hub
            │   ├── full-mock\page.tsx               # Cambridge 9–19 Full Mock Tests
            │   ├── reading\page.tsx                 # Cambridge 9–19 Reading (Passages 1–3)
            │   ├── listening\page.tsx               # Cambridge 9–19 Listening (Parts 1–4)
            │   ├── writing\page.tsx                 # Cambridge 9–19 Writing (Task 1 & Task 2)
            │   ├── speaking\page.tsx                # Cambridge 9–19 Speaking (Parts 1–3 + Voice Recorder)
            │   └── question-types\page.tsx          # Question Type & Difficulty Filter
            ├── test-engine\[attemptId]\page.tsx     # ইউনিফাইড টেস্ট ইঞ্জিন রানার
            ├── english\
            │   ├── page.tsx                         # ৫-লেভেল ইংলিশ লার্নিং হাব
            │   └── [level]\page.tsx                 # লেভেলভিত্তিক লেসন ও প্র্যাকটিস পেজ
            ├── books\
            │   ├── page.tsx                         # ডিজিটাল বুক লাইব্রেরি
            │   └── [slug]\page.tsx                  # ইনবিল্ট PDF Viewer ও চ্যাপ্টার রিডার
            ├── tips\
            │   ├── page.tsx                         # IELTS Tips & Tricks লিস্ট
            │   └── [slug]\page.tsx                  # টিপস আর্টিকেল রিডার
            ├── daily-practice\page.tsx              # ডেইলি প্র্যাকটিস সেট
            ├── search\page.tsx                      # গ্লোবাল সার্চ ও ফিল্টার
            └── dashboard\
                ├── page.tsx                         # স্টুডেন্ট ড্যাশবোর্ড
                ├── results\page.tsx                 # রেজাল্ট হিস্ট্রি
                ├── results\[attemptId]\page.tsx     # Wrong Answer Review ও ব্যাখ্যা
                ├── saved\page.tsx                   # বুকমার্ক করা প্রশ্ন ও লেসন
                └── profile\page.tsx                 # প্রোফাইল ও টার্গেট স্কোর
```

---

## ▶️ ৫. প্রজেক্ট চালু করার কমান্ড (How to Run Locally)

যেকোনো সময় প্রজেক্ট চালু করতে `d:\IELTS-APP\frontend` ফোল্ডারে গিয়ে নিচের কমান্ড দিন:
```powershell
cd d:\IELTS-APP\frontend
.\node_modules\.bin\next.cmd dev --port 3000
```
তারপর ব্রাউজারে ওপেন করুন: **`http://localhost:3000`**
