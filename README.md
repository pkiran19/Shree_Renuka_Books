# Shree Renuka Book House & Stationery Hub - Davangere, Karnataka

A modern, highly modular, and scalable bookstore & stationery web application tailored for **Davangere, Karnataka**, featuring a **top-notch glassmorphic design**, an **intuitive admin portal for managing New Arrivals**, and **direct telephone ordering and delivery booking**.

---

## 📍 Store Location & Contact Details
- **Store Name**: Shree Renuka Book House & Stationery Hub
- **Address**: Shop 5, Tennis Court Complex, AVK College Road, Prince Jayachamaraja Wodeyar (PJ Extension), Davangere, Karnataka 577004
- **Primary Phone for Orders & Deliveries**: `+91 94801 23456`
- **Secondary Phone**: `+91 81922 34567`
- **Store Timings**: Mon – Sat: 9:00 AM – 9:30 PM | Sun: 9:30 AM – 8:30 PM
- **Delivery Scope**: Home delivery across Davangere (PJ Extension, MCC A/B Block, Vidyanagar, KB Extension, etc.) & outstation parcel dispatch across Karnataka.

---

## 🌟 Key Features

### 1. Top-Notch Glassmorphism Design
- Ambient background glow meshes (emerald, sky, amber, violet).
- Frosted glass cards, blur backdrops (`backdrop-blur-xl`), and glowing status badges.
- Smooth hover animations and micro-interactions.

### 2. Streamlined Admin Portal (`/admin`)
- PIN-protected authentication (`admin123`).
- **Effortless "+ Add New Arrival" flow**: Fast modal with 1-click curated preset book/stationery covers, category selector, price, discount, and tags.
- **Live Inventory Management**: 1-click toggles for `In Stock` and `New Arrival` status, real-time persistence, edit modal, and safe deletion.

### 3. Direct Telephone Ordering & Delivery System
- Clear "📞 Call to Order & Delivery" action on every product card, quick-view modal, header, and banner.
- 3-Step visual delivery guide for students, parents, and institutions.

### 4. Comprehensive Product Catalogs
- **Books & Textbooks (`/books`)**:
  - AVK College for Women & Davangere University NEP curriculum
  - Engineering (VTU / BIET / GMIT) & Medical (JJMMC / SSIMS)
  - Timeless Kannada Sahitya (Kuvempu, Tejaswi, Bendre, Bhyrappa)
  - Competitive Exam Study Material (KPSC FDA, SDA, PSI, Banking)
  - PUC & School Textbooks
- **Stationery Hub (`/stationery`)**:
  - Classmate & college notebooks
  - Omega Engineering mini drafters & drafting tools
  - Medical dissection kits
  - Parker, Pilot & luxury writing instruments
  - Casio scientific calculators
  - Faber-Castell art & sketch supplies

### 5. Dedicated Pages
- **Home Page (`/`)**: Hero section, New Arrivals showcase, curated category grid, stationery spotlight, delivery notice, and interactive Google Map.
- **About Us (`/about`)**: Davangere story, institutional bulk supplies, legacy near AVK College.
- **Contact Us (`/contact`)**: Store address, opening hours, Google Maps directions, phone links, and callback inquiry form.

---

## 🛠️ Tech Stack & Modularity
- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 + Custom Glassmorphism design system
- **Icons**: Lucide React
- **Architecture**: Scalable repository pattern (`lib/store.ts`) with client persistence and REST API (`/api/items`).

---

## 🚀 Running Locally
```bash
# Start development server
npm run dev

# Or directly with node
node node_modules/next/dist/bin/next dev

# Build for production
node node_modules/next/dist/bin/next build
```
Admin Access PIN: `admin123`
