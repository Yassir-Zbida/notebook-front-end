import * as React from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

const FieldGroup = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-col gap-6', className)} {...props} />
));
FieldGroup.displayName = 'FieldGroup';

const Field = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-col gap-2', className)} {...props} />
));
Field.displayName = 'Field';

const FieldLabel = React.forwardRef(({ className, htmlFor, ...props }, ref) => (
  <Label ref={ref} htmlFor={htmlFor} className={cn('text-sm font-medium', className)} {...props} />
));
FieldLabel.displayName = 'FieldLabel';

const FieldDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
));
FieldDescription.displayName = 'FieldDescription';

const FieldSeparator = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('relative flex items-center gap-4 text-xs text-muted-foreground', className)}
    {...props}
  >
    <div className="border-muted flex-1 border-t" />
    {children && (
      <span className="bg-card text-muted-foreground px-2" data-slot="field-separator-content">
        {children}
      </span>
    )}
    <div className="border-muted flex-1 border-t" />
  </div>
));
FieldSeparator.displayName = 'FieldSeparator';

export { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator };

