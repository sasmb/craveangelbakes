# Instagram Integration Guide

This guide explains how to integrate Instagram content with your e-commerce website, including both simple displays and interactive product showcases.

## 🆕 New: Instagram Product Showcase

The `InstagramProductShowcase` component combines Instagram embeds with e-commerce functionality, allowing customers to order directly from your Instagram posts.

### Features
- **Instagram Embeds**: Official Instagram post embeds that show real content
- **Product Information**: Price, description, stock status
- **Order Buttons**: Direct "Order Now" and WhatsApp ordering
- **Customer Reviews**: Display testimonials alongside posts
- **Hashtag Display**: Show relevant hashtags from posts

### Setup Instructions

#### 1. Configure Business Settings

Edit `src/config/constants.ts` with your business information:

```typescript
export const BUSINESS_CONFIG = {
  // IMPORTANT: Replace with your actual WhatsApp number
  whatsappNumber: "1234567890", // Format: country code + number (no + sign)
  
  // Social Media
  instagram: "https://www.instagram.com/craveangelbakes",
  
  // Business Info
  businessName: "CRAVE ANGEL BAKES",
  businessEmail: "info@craveangelbakes.com",
  businessPhone: "+1 (555) 123-4567",
};
```

#### 2. Add Instagram Product Posts

In your page component (e.g., `src/app/page.tsx`), add product posts:

```typescript
const instagramProductPosts = [
  {
    instagramUrl: 'https://www.instagram.com/reel/DLEwCJKo7-5/?utm_source=ig_embed&utm_campaign=loading',
    product: {
      id: 'luxury-straight-bundles',
      name: 'Luxury Chocolate Cake',
      price: 299,
      description: 'Premium quality handcrafted chocolate cake',
      category: 'Cakes',
      inStock: true
    },
    caption: 'Indulge in our premium handcrafted baked goods! ✨',
    hashtags: ['bakery', 'handcrafted', 'chocolatecake'],
    customerReview: 'The quality is amazing! Best purchase ever! 💕'
  }
];
```

#### 3. Use the Component

```tsx
import { InstagramProductShowcase } from '@/components/InstagramProductShowcase';

export default function HomePage() {
  return (
    <div>
      {/* Other content */}
      <InstagramProductShowcase posts={instagramProductPosts} />
    </div>
  );
}
```

## Getting Instagram Embed URLs

### Method 1: From Instagram Post

1. Go to any Instagram post or reel
2. Click the "..." menu (three dots)
3. Select "Embed"
4. Copy the URL from `data-instgrm-permalink="URL_HERE"`

**Example from your reel:**
```
Original URL: https://www.instagram.com/reel/DLEwCJKo7-5/
Embed URL: https://www.instagram.com/reel/DLEwCJKo7-5/?utm_source=ig_embed&utm_campaign=loading
```

### Method 2: Instagram Basic Display API (Advanced)

For automatic fetching of posts, you can use Instagram's API:

1. Create a Facebook Developer App
2. Add Instagram Basic Display product
3. Get access tokens
4. Fetch posts programmatically

```javascript
// Example API call
const response = await fetch(`https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink,caption&access_token=${accessToken}`);
```

## Component Features

### Order Now Button
- Adds product to cart (customize the `handleOrderNow` function)
- Shows stock status
- Disabled when out of stock

### WhatsApp Integration
- Automatically generates WhatsApp messages
- Includes product name and price
- Opens WhatsApp Web/App

### Instagram Embed
- Official Instagram embed with full functionality
- Shows original post content
- Links back to Instagram

### Customization Options

#### Product Information
```typescript
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  inStock: boolean;
}
```

#### Post Data
```typescript
interface InstagramProductPost {
  instagramUrl: string;        // Instagram embed URL
  product: Product;            // Product details
  caption: string;             // Post caption
  hashtags: string[];          // Relevant hashtags
  customerReview?: string;     // Optional customer testimonial
}
```

## Integration with E-commerce

### Cart Integration
Modify the `handleOrderNow` function in `InstagramProductShowcase.tsx`:

```typescript
const handleOrderNow = (product: Product) => {
  // Your cart logic here
  addToCart(product);
  
  // Show success message
  showToast(`${product.name} added to cart!`);
  
  // Redirect to cart or checkout
  router.push('/cart');
};
```

### Payment Integration
You can integrate with payment providers like:
- Stripe
- PayPal
- Square
- Or redirect to external checkout

### Inventory Management
Connect to your inventory system to show real-time stock status:

```typescript
const checkInventory = async (productId: string) => {
  const stock = await fetch(`/api/inventory/${productId}`);
  return stock.json();
};
```

## Best Practices

1. **Content Quality**: Use high-quality Instagram posts that showcase your products clearly
2. **Product Matching**: Ensure the product information matches what's shown in the Instagram post
3. **Regular Updates**: Keep your Instagram posts and product information current
4. **Mobile Optimization**: Test on mobile devices since most Instagram traffic is mobile
5. **Loading Performance**: Instagram embeds can be slow, consider lazy loading

## Troubleshooting

### Instagram Embeds Not Loading
- Check that Instagram URLs are correct
- Ensure the Instagram embed script is loading
- Test on different browsers

### WhatsApp Not Working
- Verify the phone number format in `constants.ts`
- Test the WhatsApp URL manually
- Ensure WhatsApp is installed on mobile devices

### Styling Issues
- Instagram embeds have fixed styling that can't be modified
- Use container styling to control layout
- Test responsive behavior on different screen sizes

## Technical Notes

### Instagram Embed Script
The embed script is loaded automatically by the `InstagramEmbed` component. It processes all Instagram embeds on the page.

### Performance
- Instagram embeds can slow page load
- Consider implementing lazy loading for better performance
- Use loading placeholders for better user experience

### SEO Considerations
- Instagram embeds don't contribute to SEO content
- Add meaningful alt text and descriptions
- Include product information in regular HTML for search engines

---

This integration provides a seamless connection between your Instagram presence and e-commerce functionality, allowing customers to discover and purchase products directly from your social content! 