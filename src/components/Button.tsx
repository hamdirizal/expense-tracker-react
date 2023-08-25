interface ButtonProps {
  label: string;
  onClick: () => void;
  type: "button" | "submit" | "reset";
  variant: "primary" | "secondary";
}

const Button = ({ label, onClick, type, variant }: ButtonProps) => {
  const buttonClasses = {
    primary: "rounded bg-green-300 h-full text-center px-4 active:translate-y-[3px]",
    secondary: "rounded bg-green-300",
  };
  return (
    <button
      className={buttonClasses[variant] as string}
      type={type}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
