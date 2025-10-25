interface LoadingSpinnerProps {
  size?: number;
}

const LoadingSpinner = ({ size = 50 }: LoadingSpinnerProps) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`animate-spin rounded-full border-4 border-t-transparent border-primary-500`}
        style={{ width: size, height: size }}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
