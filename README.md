# Mini Employee Mood Tracker

A lightweight, full-stack mood tracking app where employees can submit how they feel, and admins can see it in real-time. Built using modern tools with a clean UI.

> [Mood Tracker](https://employee-mood-tracker-alpha.vercel.app/)

---

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: Shadcn/UI
- **API Handling**: Next.js API Routes
- **Data**: In-memory storage (`moods.ts`)

---

## Features

- **Home Page**: Welcome message + CTA button
- **Mood Submission Page (`/mood`)**: 
  - Choose between Happy 😄, Neutral 😐, Sad 😞
  - Add an optional comment
  - On submit, saves via POST API route
- **Admin Dashboard (`/admin`)**:
  - View mood entries with emoji, comment, and time
  - Clean table layout using Shadcn Table
- **In-memory backend** using `moods.ts`
- **Fully responsive design**
- **Dark and Light mode toggle**
- **API Endpoints**:
  - `GET /api/mood` for fetching all moods
  - `POST /api/mood` for submitting a new mood entry

---

## Folder Structure

```bash
/ujjwaltomar0808-employee-mood-tracker
/app
├── page.tsx                   # Home Page
├── mood/page.tsx              # Mood Submission Page
├── admin/page.tsx             # Admin Dashboard Page
/api
├── mood/route.ts              # API routes for GET and POST requests
/utils
└── moods.ts                   # In-memory data storage

```

---

## Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/Itz-Sidra/Mini-Employee-Mood-Tracker.git
cd Mini-Employee-Mood-Tracker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

### 4. Open in browser

* Home Page → `http://localhost:3000`
* Mood Submission → `http://localhost:3000/mood`
* Admin Dashboard → `http://localhost:3000/admin`

---

## Limitations

* Data is stored in-memory — it resets on server restart
* Admin panel is public (intended for demo only)
* No error validation or toast messages (yet)

---

## Future Improvements

* Add database (e.g., MongoDB or Prisma)
* User authentication for Admin
* Toast notifications for submissions

---

## Contact

Made with ❤️ by [Ujjwal Tomar](https://github.com/UjjwalTomar0808)
For queries, suggestions, or collaboration — feel free to reach out via GitHub!

---