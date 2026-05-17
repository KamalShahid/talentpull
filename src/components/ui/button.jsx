import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-[transform,background-color,color,border-color,box-shadow] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-red focus-visible:ring-offset-2 active:translate-y-[1px] disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:   'bg-tp-red text-white hover:bg-tp-red-700 shadow-tp-soft',
        outline:   'bg-white text-tp-dark border border-tp-dark/15 hover:border-tp-dark/40 hover:bg-tp-mist',
        ghost:     'bg-transparent text-tp-dark/80 hover:text-tp-red hover:bg-tp-red-50',
        dark:      'bg-tp-darker text-white hover:bg-tp-dark',
        link:      'text-tp-red hover:text-tp-red-700 underline-offset-4 hover:underline',
      },
      size: {
        sm:   'h-9  px-4 text-sm',
        md:   'h-11 px-5 text-sm',
        lg:   'h-12 px-6 text-base',
        icon: 'h-10 w-10 p-0',
      },
    },
    defaultVariants: { variant: 'default', size: 'md' },
  }
);

export const Button = React.forwardRef(function Button(
  { className, variant, size, asChild = false, ...props },
  ref
) {
  const Comp = asChild ? Slot : 'button';
  return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
});

export { buttonVariants };
