interface ErrorDivProps {
  error: string;
}

const ErrorDiv = ({ error }: ErrorDivProps) => {
  return <div className="text-red-text text-sm">{error}</div>;
};

export default ErrorDiv;
