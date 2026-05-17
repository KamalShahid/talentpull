import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Standard shadcn cn helper — combines clsx (conditional classes)
// with tailwind-merge (resolves conflicting Tailwind classes).
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
