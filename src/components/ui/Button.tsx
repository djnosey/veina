import { motion } from 'motion/react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'accent';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white font-bold hover:bg-primary-light focus-visible:ring-primary glow-primary',
  accent: 'bg-accent text-white font-bold hover:bg-accent-light focus-visible:ring-accent glow-accent',
  secondary: 'bg-white text-dark font-bold hover:bg-gray-100 focus-visible:ring-white',
  outline: 'bg-transparent text-white border border-white/30 hover:border-primary hover:text-primary focus-visible:ring-primary',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm min-h-[44px]',
  md: 'px-6 py-3 text-base min-h-[44px]',
  lg: 'px-8 py-4 text-lg min-h-[44px]',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  disabled,
  children,
  type = 'button',
  onClick,
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      type={type}
      className={`
        inline-flex items-center justify-center rounded-full font-bold
        transition-all duration-200 ease-in-out
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
        disabled:pointer-events-none disabled:opacity-50
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `.trim()}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
