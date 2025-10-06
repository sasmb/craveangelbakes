# CRAVE ANGEL BAKES - Next.js Website

A premium bakery e-commerce website built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS v4** for styling
- **Responsive Design** - Mobile-first approach
- **SEO Optimized** with proper meta tags
- **Component-Based Architecture**
- **Product Catalog** with dynamic data
- **Contact Forms** with validation
- **Instagram Feed Integration** (placeholder)
- **ESLint & Prettier** configured

## 📁 Project Structure

```
craveangelbakes/
├── src/
│   ├── app/                    # App Router pages
│   │   ├── page.tsx           # Home page
│   │   ├── layout.tsx         # Root layout
│   │   ├── globals.css        # Global styles
│   │   ├── products/          # Products page
│   │   │   └── page.tsx
│   │   ├── about/             # About page
│   │   │   └── page.tsx
│   │   └── contact/           # Contact page
│   │       └── page.tsx
│   ├── components/            # Reusable components
│   │   ├── Layout.tsx         # Main layout with header/footer
│   │   ├── ProductCard.tsx    # Product display component
│   │   └── InstagramFeed.tsx  # Instagram feed component
│   └── data/                  # Static data files
│       └── products.json      # Product catalog data
├── public/
│   └── images/               # Static images directory
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

## 🎨 Components

### Layout Component (`src/components/Layout.tsx`)
- Responsive navigation header
- Footer with links and social media
- Mobile-friendly design
- Consistent branding

### ProductCard Component (`src/components/ProductCard.tsx`)
- Product image display
- Price and description
- Add to cart button
- Category tags
- Hover effects

### InstagramFeed Component (`src/components/InstagramFeed.tsx`)
- Grid layout for social posts
- Hover effects with engagement metrics
- Social media integration ready

## 📱 Pages

### Home Page (`src/app/page.tsx`)
- Hero section with call-to-actions
- Featured products showcase
- Company values/features
- Instagram feed integration
- Final call-to-action section

### Products Page (`src/app/products/page.tsx`)
- Full product catalog
- Grid layout with ProductCard components
- Expert consultation call-to-action

### About Page (`src/app/about/page.tsx`)
- Company story and mission
- Core values with icons
- Team member profiles
- Professional layout

### Contact Page (`src/app/contact/page.tsx`)
- Contact form with validation
- Business information
- Social media links
- Operating hours

## 🛍️ Product Data Structure

Products are stored in `src/data/products.json` with the following structure:

```json
{
  "id": 1,
  "name": "Product Name",
  "price": 299.99,
  "image": "/images/product-image.jpg",
  "description": "Product description",
  "category": "Category Name"
}
```

## 🎨 Styling

- **Tailwind CSS v4** with the new simplified configuration
- Custom theme colors and fonts
- Responsive breakpoints
- Dark mode support built-in
- Consistent spacing and typography

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Start production server:**
   ```bash
   npm run start
   ```

## 📝 Development Notes

- Uses Next.js App Router (not Pages Router)
- All components are Server Components by default
- Client components marked with `'use client'` directive
- TypeScript strict mode enabled
- ESLint configured for Next.js best practices

## 🖼️ Image Requirements

Add product images to `public/images/` directory:
- Product images: `/images/product-name.jpg`
- Instagram feed: `/images/insta-1.jpg` to `/images/insta-4.jpg`
- Team photos: `/images/team-*.jpg`
- About page: `/images/about-founder.jpg`

## 🔧 Customization

### Adding New Products
1. Add product data to `src/data/products.json`
2. Add corresponding image to `public/images/`
3. Products will automatically appear on the products page

### Styling Changes
- Modify Tailwind classes in components
- Update global styles in `src/app/globals.css`
- Configure theme in `@theme inline` CSS block

### Adding New Pages
1. Create directory in `src/app/`
2. Add `page.tsx` file
3. Use the Layout component for consistency

## 📦 Dependencies

### Core
- Next.js 15.3.4
- React 18
- TypeScript 5

### Styling
- Tailwind CSS v4
- PostCSS

### Development
- ESLint
- TypeScript compiler

## 🌟 Features to Add

- [ ] Shopping cart functionality
- [ ] User authentication
- [ ] Payment integration
- [ ] Product search and filtering
- [ ] Customer reviews
- [ ] Wishlist functionality
- [ ] Email newsletter signup
- [ ] Live chat integration

## 📧 Contact

For questions about this project, please visit the contact page or reach out via the provided contact information.

---

Built with ❤️ using Next.js and Tailwind CSS
