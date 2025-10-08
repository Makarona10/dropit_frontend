const ButtonsContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-wrap gap-2 sm:pb-8 pb-4">{children}</div>;
};

export default ButtonsContainer;
