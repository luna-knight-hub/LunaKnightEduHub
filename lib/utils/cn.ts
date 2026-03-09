import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Kết hợp clsx + tailwind-merge để xử lý className một cách thông minh.
 * Tự động resolve class conflicts (e.g., "px-2 px-4" → "px-4")
 *
 * @example
 * cn('px-2 py-1', isActive && 'bg-blue-500', 'px-4')
 * // → "py-1 px-4 bg-blue-500" (nếu isActive = true)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
