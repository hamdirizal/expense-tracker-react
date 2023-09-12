interface ErrorDivProps {
  error: string | JSX.Element;
}

const ErrorDiv = ({ error }: ErrorDivProps) => {
  return <div className="ErrorDiv">{error}</div>;
};

export default ErrorDiv;
