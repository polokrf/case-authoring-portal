A production-quality clinical case management platform built for medical education content writers. Create, manage, and publish detailed clinical cases through a clean, modern multi-step interface.

---

## 📋 Project Overview

The **Case Authoring Portal** is a fully client-side web application that allows medical educators and content writers to author structured clinical cases. Each case walks through seven guided steps — from patient demographics to treatment plans — with real-time validation and a final preview before publishing.

All data is persisted locally in the browser via `localStorage`, requiring no backend or database setup.

---

## ✨ Features

- **Multi-Step Case Form** — 7-step guided wizard covering patient info, history, physical exam, investigations, diagnosis, treatment plan, and preview
- **Per-Step Validation** — Cannot advance to the next step until all required fields pass Zod validation
- **Case Management** — View, edit, and delete cases from the dashboard
- **Save as Draft** — Save progress at any step without publishing
- **Publish Cases** — Mark completed cases as published
- **Dashboard Stats** — Overview of total, published, and draft cases
- **Confirmation Modal** — Prevents accidental deletion
- **Toast Notifications** — Success and error feedback on all actions
- **Empty State** — Friendly prompt when no cases exist yet
- **Responsive Design** — Works on desktop, tablet, and mobile
- **Collapsible Sidebar** — Drawer navigation on mobile, static on desktop
- **Local Storage Persistence** — All data survives page refreshes

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 15](https://nextjs.org/) | React framework with App Router |
| [TypeScript](https://www.typescriptlang.org/) | Static typing |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [DaisyUI](https://daisyui.com/) | Component library on top of Tailwind |
| [React Hook Form](https://react-hook-form.com/) | Performant form state management |
| [Zod](https://zod.dev/) | Schema validation |
| [Lucide React](https://lucide.dev/) | Icon library |
| [React Hot Toast](https://react-hot-toast.com/) | Toast notifications |
| [UUID](https://github.com/uuidjs/uuid) | Unique case ID generation |
| Local Storage | Client-side data persistence |

---

## 📁 Folder Structure

```
case-authoring-portal/
├── app/
│   ├── cases/
│   │   ├── new/                  # Create new case page
│   │   └── [id]/
│   │       ├── page.tsx          # View case page
│   │       └── edit/             # Edit case page
│   ├── components/
│   │   ├── forms/                # Multi-step form components (Steps 1-7)
│   │   │   ├── CaseForm.tsx      # Form orchestrator & navigation
│   │   │   ├── Step1PatientInfo.tsx
│   │   │   ├── Step2History.tsx
│   │   │   ├── Step3PhysicalExam.tsx
│   │   │   ├── Step4Investigations.tsx
│   │   │   ├── Step5Diagnosis.tsx
│   │   │   ├── Step6TreatmentPlan.tsx
│   │   │   └── Step7Preview.tsx
│   │   ├── layout/               # App shell, sidebar, header
│   │   │   ├── AppShell.tsx
│   │   │   ├── Header.tsx
│   │   │   └── Sidebar.tsx
│   │   └── ui/                   # Reusable UI primitives
│   │       ├── CaseCard.tsx
│   │       ├── ConfirmModal.tsx
│   │       ├── EmptyState.tsx
│   │       ├── FormField.tsx
│   │       └── StepIndicator.tsx
│   ├── hooks/
│   │   ├── useCases.ts           # CRUD operations with localStorage
│   │   └── useLocalStorage.ts    # Generic localStorage hook
│   ├── lib/
│   │   └── schemas.ts            # Zod validation schemas
│   ├── services/
│   │   └── caseService.ts        # localStorage read/write logic
│   ├── types/
│   │   ├── case.ts               # TypeScript interfaces
│   │   └── index.ts
│   ├── utils/
│   │   └── formatters.ts         # Date formatting, badge colors, truncation
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                  # Dashboard
├── public/
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## 🚀 Installation

**Prerequisites:** Node.js 18+ and npm

```bash
# Clone the repository
git clone https://github.com/your-username/case-authoring-portal.git

# Navigate into the project
cd case-authoring-portal

# Install dependencies
npm install
```

---

## 💻 Running Locally

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

**Other commands:**

```bash
# Production build
npm run build

# Start production server
npm start

# Type check
npx tsc --noEmit

# Lint
npm run lint
```

---

## 📖 Usage

### Creating a Case

1. Click **New Case** from the dashboard or sidebar
2. Fill in each step — validation prevents moving forward with empty required fields
3. Use **Save Draft** at any step to save progress without publishing
4. On the **Preview** step, review all entered data
5. Click **Publish Case** to finalize

### Managing Cases

- **View** — Click the eye icon or case card to see full details
- **Edit** — Click the pencil icon to re-open the form with existing data
- **Delete** — Click the trash icon; confirm in the modal to permanently remove

### Case Steps

| Step | Section |
|---|---|
| 1 | Patient Information (Name, Age, Gender) |
| 2 | History (Chief Complaint, HPI, PMH, Allergies) |
| 3 | Physical Examination (Vitals + Notes) |
| 4 | Investigations (Labs, Imaging, Other) |
| 5 | Diagnosis (Primary + Differential) |
| 6 | Treatment Plan (Medications, Advice, Follow-up) |
| 7 | Preview & Submit |

---

## 🔮 Future Improvements

- **Backend Integration** — Replace localStorage with a REST API or GraphQL backend
- **Authentication** — User accounts with role-based access (author, reviewer, admin)
- **Case Search & Filtering** — Search by diagnosis, patient name, or status
- **Rich Text Editor** — Replace textareas with a Markdown or WYSIWYG editor
- **Image Attachments** — Upload and attach imaging files to cases
- **Case Templates** — Pre-fill common case types as starting templates
- **Export to PDF** — Generate printable case documents
- **Version History** — Track changes and allow rollback
- **Collaborative Editing** — Real-time multi-author editing
- **Tags & Categories** — Organize cases by specialty or difficulty

---

## 🌐 Live Demo

https://case-authoring-portal.vercel.app/



---

## 📦 GitHub Repository

https://github.com/your-username/case-authoring-portal

---

## 📄 License

This project is licensed under the MIT License.

MIT License — Copyright (c) 2026

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.

---

