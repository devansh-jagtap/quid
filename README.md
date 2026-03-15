# Quid Invoice Generator 🧾

A modern, full-stack invoice management application built with Next.js 14, Prisma, and NextAuth. Create, manage, and track professional invoices with ease.

## 🚀 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful UI components

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma** - Modern ORM for database operations
- **PostgreSQL** - Relational database
- **NextAuth.js** - Authentication solution

### Libraries
- **jsPDF** - PDF generation
- **html-to-image** - Invoice preview to image conversion
- **Lucide React** - Icon library

## 📁 Project Structure

```
quid/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── auth/
│   │   │   └── [...nextauth]/    # NextAuth configuration
│   │   └── invoices/             # Invoice CRUD operations
│   ├── dashboard/                # Dashboard page
│   ├── create-invoice/           # Invoice creation page
│   ├── invoice/
│   │   └── [id]/                 # Dynamic invoice detail page
│   ├── login/                    # Login page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   └── globals.css               # Global styles
│
├── components/                   # Global components
│   ├── ui/                       # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── label.tsx
│   ├── AuthButton.tsx            # Login/Logout button
│   ├── InvoiceCard.tsx           # Reusable invoice card
│   ├── Navbar.tsx                # Navigation bar
│   └── Providers.tsx             # Session provider wrapper
│
├── features/                     # Feature-based modules
│   └── invoices/
│       ├── components/           # Invoice-specific components
│       │   ├── InvoiceForm.tsx   # Invoice creation form
│       │   └── InvoicePreview.tsx # Invoice preview component
│       ├── actions/              # Server/client actions
│       │   └── saveInvoice.ts    # Save invoice logic
│       └── types.ts              # TypeScript types
│
├── lib/                          # Utility libraries
│   ├── auth.ts                   # NextAuth configuration
│   └── prisma.ts                 # Prisma client
│
├── prisma/                       # Database schema
│   └── schema.prisma             # Prisma schema definition
│
└── utils/                        # Helper functions
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database
- Google OAuth credentials

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd quid
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/quid_db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 4. Setup Database
```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Open Prisma Studio
npx prisma studio
```

### 5. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📖 Usage Guide

### 1. Authentication
- Navigate to the homepage
- Click "Get Started Free" or "Sign In"
- Authenticate with your Google account
- You'll be redirected to the dashboard

### 2. Create an Invoice
1. Click "Create Invoice" in the navbar
2. Fill in client information
3. Add invoice items (name, quantity, price)
4. Click "Save Invoice" to persist to database
5. Click "Download PDF" to export

### 3. View Invoices
- Visit the **Dashboard** to see all your invoices
- Click on any invoice card to view details
- Use the detail page to view full invoice information

### 4. Dynamic Routes
Each invoice has its own unique URL:
- `/invoice/[id]` - View specific invoice
- Example: `/invoice/abc123def456`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

**Note:** This is a learning project demonstrating Next.js App Router, Prisma, NextAuth, and modern React patterns.
