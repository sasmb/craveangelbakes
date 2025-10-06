// Business Configuration Constants
export const BUSINESS_CONFIG = {
  // WhatsApp Business Link (can be wa.me/NUMBER or wa.link/SHORT_CODE)
  // Format options:
  // 1. Full number: "905488417908" (will use wa.me/NUMBER)
  // 2. Short link: "wa.link/i9n1mn" (direct short link)
  whatsappLink: "905488417908", // ✅ Using direct number to allow custom messages
  
  // Social Media Links
  instagram: "https://www.instagram.com/craveangelbakes",
  facebook: "https://www.facebook.com/craveangelbakes", // Add your Facebook page
  tiktok: "https://www.tiktok.com/@craveangelbakes", // Add your TikTok
  
  // Business Information
  businessName: "CRAVE ANGEL BAKES",
  businessEmail: "info@craveangelbakes.com",
  businessPhone: "+1 (555) 123-4567", // Display phone number
  
  // Location (if applicable)
  businessAddress: "North Cyprus", // Update with full address if needed
  
  // Support Messages
  defaultWhatsAppMessage: "Hi! I'm interested in your baked goods. Can you help me with more information?",
  
  // Currency
  currency: "TRY",
  currencySymbol: "TL"
};

// WhatsApp URL Generator
export function generateWhatsAppUrl(message: string): string {
  // Check if WhatsApp link is properly configured
  if (!BUSINESS_CONFIG.whatsappLink) {
    console.error("⚠️ WhatsApp link not configured! Please update BUSINESS_CONFIG.whatsappLink in constants.ts");
    alert("WhatsApp link not configured. Please contact the site administrator.");
    return "#";
  }
  
  const encodedMessage = encodeURIComponent(message);
  
  // Handle both wa.link and wa.me formats
  const baseUrl = BUSINESS_CONFIG.whatsappLink.startsWith('wa.link/') 
    ? `https://${BUSINESS_CONFIG.whatsappLink}`
    : `https://wa.me/${BUSINESS_CONFIG.whatsappLink}`;
  
  return `${baseUrl}?text=${encodedMessage}`;
}

// Product inquiry WhatsApp message generator
export function generateProductInquiryMessage(productName: string, price: number): string {
  return `Hi! I'm interested in ordering "${productName}" (${BUSINESS_CONFIG.currencySymbol}${price}). Can you help me with the purchase process?`;
} 