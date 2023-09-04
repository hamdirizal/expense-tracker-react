interface ErrorDivProps {
  error: string;
}

const ErrorDiv = ({ error }: ErrorDivProps) => {
  return <div className="ErrorDiv">{error}</div>;
};

export default ErrorDiv;
