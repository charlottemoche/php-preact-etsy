type ButtonProps = {
  onClick?: (e: MouseEvent) => void;
  children: preact.ComponentChildren;
  variant?: 'green' | 'yellow' | 'gray';
  classes?: string;
  type?: 'button' | 'submit' | 'reset';
};

const variantClasses = {
  green: 'bg-green-500 hover:bg-green-600 text-white',
  yellow: 'bg-yellow-500 hover:bg-yellow-600 text-white',
  gray: 'bg-gray-300 hover:bg-gray-400',
};

const Button = ({ onClick, children, variant = 'gray', classes = '', type = 'button' }: ButtonProps) => {
  const base = 'px-2 py-1 rounded text-sm';
  const variantClass = variantClasses[variant] || variantClasses.gray;

  return (
    <button
      type={type}
      onClick={onClick}
      class={`${variantClass} ${base} ${classes}`}
    >
      {children}
    </button>
  );
};

export default Button;