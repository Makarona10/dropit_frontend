const PagesContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full p-5 sm:p-10 flex flex-col">{children}</div>;
};

export default PagesContainer;
