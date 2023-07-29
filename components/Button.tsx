import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

//forwarding all our refs and forwarding all ou html attrbutes (the normal one button has and )
//its extending the html button atributes
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, disabled, type = 'button', ...props }, ref) => {
    return (
      <button
        type={type}
        className={twMerge(
          `w-full rounded-full bg-green-300 border border-transparent py-3 px-3 disabled:cursor-not-allowed disabled:opacity-50 text-black font-bold hover:opacity-75 transition`,
          className
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
