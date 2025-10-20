# Toko Klontong Paint Pro

A modern e-commerce web application for Toko Klontong, built with Nuxt.js, TypeScript, and Tailwind CSS.
Access here: https://toko-mas-yanto.nomadean.com/

## Features

- Modern and responsive design
- Product search functionality
- Product catalog with categories
- Shopping cart functionality
- Admin product management
- Login system

## Pages

### Home Page (`/`)
- Hero section with store introduction
- Featured products carousel (Snacks & Beverages)
- Promotional section
- Complete product listing
- Quick access to product details

### Product Pages
1. **Product List** (`/product`)
   - Complete product catalog
   - Search functionality
   - Grid view of all products
   - Quick access to product details

2. **Product Detail** (`/product/[id]`)
   - Detailed product information
   - Product images
   - Price and stock information
   - Product dimensions and specifications
   - Back to catalog navigation

3. **Add Product** (`/product/add`)
   - Product creation form
   - Image upload functionality
   - Product details input
   - Category selection

### Authentication
- **Login Page** (`/login`)
  - User authentication
  - Secure login form
  - Form validation

## Development Setup

### Prerequisites
- Node.js (v18 or later recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/alysialfi/toko-klontong-paintpro.git
cd toko-klontong-paintpro
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

## Technology Stack

- **Framework**: Nuxt.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn-vue
- **State Management**: Pinia
- **Form Handling**: vee-validate + zod

## Project Structure

```
app/
├── components/          # Reusable components
├── pages/              # Application pages
├── stores/             # Pinia store modules
├── models/             # TypeScript interfaces
├── lib/               # Utility functions
├── constants/         # Application constants
└── assets/           # Static assets
```
