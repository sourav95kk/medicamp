/**
 * Utility helpers for Aadhaar validation, formatting and masking
 */

// Format raw 12 digits to 'XXXX XXXX XXXX'
export function formatAadhaar(value) {
  if (!value) return '';
  const cleaned = value.replace(/\D/g, '').slice(0, 12);
  const parts = [];
  for (let i = 0; i < cleaned.length; i += 4) {
    parts.push(cleaned.slice(i, i + 4));
  }
  return parts.join(' ');
}

// Clean formatted string to pure 12 digits
export function cleanAadhaar(value) {
  if (!value) return '';
  return value.replace(/\D/g, '').slice(0, 12);
}

// Mask Aadhaar e.g. '•••• •••• 9012'
export function maskAadhaar(value) {
  const cleaned = cleanAadhaar(value);
  if (cleaned.length < 12) return value || '';
  return `•••• •••• ${cleaned.slice(8)}`;
}

// Basic 12-digit validity check
export function isValidAadhaar(value) {
  const cleaned = cleanAadhaar(value);
  return cleaned.length === 12 && /^[2-9]{1}[0-9]{11}$/.test(cleaned);
}
