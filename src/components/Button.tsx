interface ButtonProps {
  label: string;
  onClick: () => void;
  type: "button" | "submit" | "reset";
  variant: "primary" | "secondary";
  size: "small" | "regular" | "big";
  isFullWidth: boolean;
}

const Button = ({
  label,
  onClick,
  type,
  variant,
  size,
  isFullWidth,
}: ButtonProps) => {
  const variantClasses = {
    primary: "bg-green-button text-black-text",
    secondary: "bg-color-btn-secondary text-black-text",
  };
  const sizeClasses = {
    small: "px-2 h-6 text-minus-1",
    regular: "px-4 h-11 text-base",
    big: "",
  };
  return (
    <button
      className={`rounded text-center active:scale-98 font-bold text-sm leading-none ${
        variantClasses[variant] as string
      } ${sizeClasses[size] as string} ${isFullWidth ? "w-full" : ""} `}
      type={type}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
