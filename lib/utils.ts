import { STORE_CONTACT } from './initial-data';

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateDiscount(price: number, originalPrice?: number): number | null {
  if (!originalPrice || originalPrice <= price) return null;
  const discount = ((originalPrice - price) / originalPrice) * 100;
  return Math.round(discount);
}

export function getPhoneCallLink(customPhone?: string): string {
  const phone = customPhone || STORE_CONTACT.phoneNumbers.formattedPrimary;
  return `tel:${phone}`;
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}
