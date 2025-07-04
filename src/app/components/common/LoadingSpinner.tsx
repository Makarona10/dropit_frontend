const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-transparent border-primary-500"></div>
    </div>
  );
};

export default LoadingSpinner;
