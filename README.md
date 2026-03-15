# 🏛️ Grievance Portal

A modern, full-stack workplace grievance submission portal built with Next.js App Router.

## 🔗 Live Demo
[View Live Site](https://grievance-portal-fe.vercel.app)

## ✨ Features
- 4-step multi-step form with progress indicator
- Per-step validation using Zod
- Auto-save draft to localStorage
- Restore draft on page reload
- Server Actions for secure form submission
- Beautiful dark UI with teal accent design
- Fully responsive on all devices

## 🛠️ Tech Stack
- **Next.js 16** (App Router)
- **React 18**
- **TypeScript**
- **Zod** (validation)
- **Material UI** (form components)
- **Tailwind CSS** (styling)

## 📁 Project Structure
```
grievance-app/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── actions/
│   │   └── submit.ts        # Server Action
│   └── grievance/
│       ├── step1/page.tsx   # Personal Info
│       ├── step2/page.tsx   # Grievance Details
│       ├── step3/page.tsx   # Supporting Info
│       └── step4/page.tsx   # Review & Submit
├── components/
│   └── ui.tsx               # Shared UI components
└── lib/
    ├── schemas.ts            # Zod validation schemas
    └── draft.ts              # Draft save/load utility
```

## 🚀 Setup & Installation

### Prerequisites
- Node.js 18+
- npm or yarn

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd grievance-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Install Zod**
```bash
npm install zod
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open in browser**
```
http://localhost:3000
```

## 📋 Form Steps

| Step | Page | Description |
|------|------|-------------|
| 1 | `/grievance/step1` | Personal Info — Name, Employee ID, Email, Department |
| 2 | `/grievance/step2` | Grievance Details — Category, Subject, Description, Priority |
| 3 | `/grievance/step3` | Supporting Info — Documents, Witnesses, Desired Outcome |
| 4 | `/grievance/step4` | Review & Submit — Full review before final submission |

## 🎨 UI Preview
> Dark themed portal with teal accents, animated stepper, and glass-morphism cards.

## 📝 License
MIT
```

---

**Step 4 — Add README and push:**
```
git add README.md
git commit -m "Add README"
git push