import "./LoadingSpinner.css";

interface LoadingSpinnerProps {
  isOverlayed?: boolean;
}

const LoadingSpinner = ({ isOverlayed = false }: LoadingSpinnerProps) => {
  return (
    <div className="lds-ring-wrapper">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
