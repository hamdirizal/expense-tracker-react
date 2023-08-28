interface ButtonProps {
  label: string;
  onClick: () => void;
  type: "button" | "submit" | "reset";
  variant: "primary" | "secondary";
}

const Button = ({ label, onClick, type, variant }: ButtonProps) => {
  const buttonClasses = {
    primary: "bg-green-button text-black-text",
    secondary: "bg-green-300",
  };
  return (
    <button
      className={`w-full rounded h-full text-center px-4 py-2 active:translate-y-[3px] font-bold text-sm ${
        buttonClasses[variant] as string
      }`}
      type={type}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
