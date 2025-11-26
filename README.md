# TinyLink - Modern URL Shortener

TinyLink is a fast, simple, and secure URL shortener built with modern web technologies. It allows users to transform long URLs into manageable short links, track performance metrics, and manage their links through a clean, responsive dashboard.

**[🚀 Live Demo](https://tinylink-kohl.vercel.app/)**

![TinyLink Dashboard](public/dashboard.png)

## 🎥 Demo Video

[![Watch the Demo](https://drive.google.com/uc?export=view&id=10VuEedw-uEihVyjucSGUMYccDPRYQFyw)](https://drive.google.com/file/d/10VuEedw-uEihVyjucSGUMYccDPRYQFyw/view?usp=sharing)

> **Note:** Click the image above to watch the demo video on Google Drive.

## ✨ Features

- **🔗 URL Shortening:** Instantly shorten any long URL.
- **🏷️ Custom Aliases:** Create custom, memorable short codes (e.g., `tinylink.app/my-custom-code`).
- **📊 Analytics:** Track total clicks and last active timestamps for every link.
- **📱 Responsive Design:** A beautiful, mobile-first interface built with Tailwind CSS.
- **🔍 Search:** Easily filter and find links in your dashboard.
- **📋 Quick Actions:** One-click copy to clipboard and delete functionality.
- **🚀 High Performance:** Built on Next.js 16 with Turbopack for lightning-fast performance.

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Database:** [PostgreSQL](https://www.postgresql.org/) (via [Neon](https://neon.tech/))
- **ORM:** [Prisma](https://www.prisma.io/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Deployment:** [Vercel](https://vercel.com/)

## 🚀 Getting Started

Follow these steps to get a local copy up and running.

### Prerequisites

- Node.js 18+ installed
- A PostgreSQL database (local or cloud like Neon/Supabase)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/tinylink.git
   cd tinylink
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env` file in the root directory and add the following:

   ```env
   # Database connection string (PostgreSQL)
   DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"

   # Base URL for the application (used for generating short links)
   NEXT_PUBLIC_BASE_URL="http://localhost:3000"
   ```

4. **Initialize the Database**
   Run the Prisma migration to create the necessary tables:

   ```bash
   npx prisma migrate dev --name init
   ```

5. **Run the Development Server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Deployment

This project is optimized for deployment on **Vercel**.

1. Push your code to a Git repository (GitHub/GitLab).
2. Import the project into Vercel.
3. Add the `DATABASE_URL` and `NEXT_PUBLIC_BASE_URL` (set to your production domain) in the Vercel Project Settings > Environment Variables.
4. Deploy!

> **Note:** The `postinstall` script in `package.json` ensures `prisma generate` runs automatically during deployment.

## 📂 Project Structure

```
tinylink/
├── prisma/
│   └── schema.prisma      # Database schema
├── src/
│   ├── app/
│   │   ├── api/           # API Routes
│   │   ├── code/[code]/   # Stats page
│   │   ├── [code]/        # Redirection logic
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Homepage & Dashboard
│   ├── components/        # React components
│   └── lib/               # Utilities (Prisma client)
├── public/                # Static assets
└── ...config files
```

## 📝 License

This project is licensed under the MIT License.
