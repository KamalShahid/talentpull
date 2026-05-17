import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-tp-red focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:     'border-transparent bg-tp-red text-white hover:bg-tp-red-700',
        secondary:   'border-transparent bg-tp-mist text-tp-dark hover:bg-tp-fog',
        outline:     'text-tp-dark border-tp-fog',
        success:     'border-transparent bg-tp-teal-50 text-tp-teal-700',
        muted:       'border-transparent bg-white/10 text-white/70',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

export function Badge({ className, variant, ...props }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { badgeVariants };
