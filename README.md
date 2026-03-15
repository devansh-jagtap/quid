# Quid Invoice Generator 🧾

A modern, full-stack invoice management application built with Next.js 14, Prisma, and NextAuth. Create, manage, and track professional invoices with ease.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)
![NextAuth](https://img.shields.io/badge/NextAuth-Authentication-purple)

## ✨ Features

- 🔐 **Google OAuth Authentication** - Secure sign-in with NextAuth.js
- 📊 **Dashboard** - Overview of all invoices with statistics
- ✏️ **Create Invoices** - Intuitive form to generate professional invoices
- 👁️ **Invoice Details** - Dynamic routes for viewing individual invoices
- 📥 **PDF Export** - Download invoices as PDF documents
- 🎨 **Modern UI** - Built with shadcn/ui and Tailwind CSS
- 🗄️ **Database** - PostgreSQL with Prisma ORM
- 📱 **Responsive Design** - Works on all devices

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

## 🔌 API Routes

### Authentication
```
GET/POST /api/auth/[...nextauth]
```
Handles NextAuth.js authentication flow

### Invoices
```
GET /api/invoices
```
Returns all invoices for the authenticated user

```
POST /api/invoices
```
Creates a new invoice

**Request Body:**
```json
{
  "clientName": "John Doe",
  "items": [
    {
      "name": "Web Development",
      "quantity": 10,
      "price": 100
    }
  ],
  "subtotal": 1000,
  "total": 1000
}
```

## 🗄️ Database Schema

```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  invoices      Invoice[]
  accounts      Account[]
  sessions      Session[]
}

model Invoice {
  id         String        @id @default(cuid())
  clientName String
  subtotal   Float
  total      Float
  userId     String
  user       User          @relation(fields: [userId], references: [id])
  items      InvoiceItem[]
  createdAt  DateTime      @default(now())
  updatedAt  DateTime      @updatedAt
}

model InvoiceItem {
  id        String  @id @default(cuid())
  name      String
  quantity  Int
  price     Float
  invoiceId String
  invoice   Invoice @relation(fields: [invoiceId], references: [id])
}
```

## 🎨 UI Components (shadcn/ui)

The project uses shadcn/ui for consistent, accessible components:

- **Button** - Primary actions, links
- **Card** - Content containers, invoice cards
- **Input** - Form fields
- **Label** - Form labels

Add more components as needed:
```bash
npx shadcn@latest add [component-name]
```

## 🔐 Authentication Flow

1. User clicks "Sign In"
2. Redirected to `/login`
3. Google OAuth popup appears
4. User authorizes the application
5. NextAuth creates/updates user in database
6. Session is established
7. User is redirected to `/dashboard`

### Protected Routes
The following routes require authentication:
- `/dashboard`
- `/create-invoice`
- `/invoice/[id]`

Unauthenticated users are redirected to `/login`

## 🧪 Development Notes

### Adding a New Feature Component
1. Create component in `features/[feature]/components/`
2. Export types from `features/[feature]/types.ts`
3. Add actions in `features/[feature]/actions/`

### Adding a Global Component
1. Create component in `components/`
2. Import in pages as needed
3. Use shadcn/ui primitives for consistency

### Styling Guidelines
- Use Tailwind utility classes
- Follow shadcn/ui design patterns
- Maintain responsive design (mobile-first)
- Use semantic HTML

## 📝 Scripts

```bash
# Development
npm run dev          # Start dev server

# Build
npm run build        # Build for production
npm start            # Start production server

# Database
npx prisma studio    # Open Prisma Studio
npx prisma migrate dev   # Run migrations
npx prisma generate  # Generate Prisma Client

# Linting
npm run lint         # Run ESLint
```

## 🚧 Roadmap

- [ ] Email invoice to clients
- [ ] Invoice templates
- [ ] Payment status tracking
- [ ] Multi-currency support
- [ ] Dark mode
- [ ] Invoice analytics
- [ ] Recurring invoices
- [ ] Tax calculations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 👨‍💻 Author

Built with ❤️ using Next.js and modern web technologies.

---

**Note:** This is a learning project demonstrating Next.js App Router, Prisma, NextAuth, and modern React patterns.