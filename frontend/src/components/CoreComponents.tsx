import { JSX } from 'preact';

type ButtonProps = {
  onClick?: (e: MouseEvent) => void;
  children: preact.ComponentChildren;
  variant?: 'green' | 'yellow' | 'gray' | 'blue' | 'red' | 'white';
  classes?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};

const variantClasses = {
  green: 'bg-green-700 hover:bg-green-800 text-white',
  yellow: 'bg-yellow-600 hover:bg-yellow-700 text-white',
  gray: 'bg-gray-300 hover:bg-gray-400 dark:text-gray-900',
  blue: 'bg-blue-600 hover:bg-blue-700 text-white',
  red: 'bg-red-600 hover:bg-red-700 text-white',
  white: 'bg-white text-gray-800 dark:text-gray-300 hover:bg-gray-100'
};

export const Button = ({
  onClick,
  children,
  variant = 'gray',
  classes = '',
  type = 'button',
  disabled = false,
}: ButtonProps) => {
  const base = 'px-2 py-1 rounded text-sm';
  const variantClass = variantClasses[variant] || variantClasses.gray;
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      class={`${variantClass} ${base} ${disabledClass} ${classes}`}
    >
      {children}
    </button>
  );
};

type SelectProps = JSX.IntrinsicElements['select'] & {
  label?: string;
  classes?: string;
};

export const Select = ({
  label,
  id,
  classes = '',
  disabled = false,
  ...props
}: SelectProps) => {
  const base = 'border border-gray-300 rounded px-2 py-1 text-sm w-full dark:bg-dark-2';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';

  return (
    <div>
      {label && id && (
        <label htmlFor={id} class="text-sm font-medium text-gray-700 dark:text-gray-400 mr-2">
          {label}
        </label>
      )}
      <select
        id={id}
        class={`${base} ${disabledClass} ${classes}`}
        disabled={disabled}
        {...props}
      />
    </div>
  );
};