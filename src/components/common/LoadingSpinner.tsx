interface LoadingSpinnerProps {
  height?: string;
  width?: string;
}

const LoadingSpinner = ({
  height = "12",
  width = "12",
}: LoadingSpinnerProps) => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div
        className={`animate-spin rounded-full h-${height} w-${width} border-4 border-t-transparent border-primary-500`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
