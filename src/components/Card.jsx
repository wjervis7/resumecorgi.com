function Card({ children, rightElement }) {
  return (
    <div className="flex flex-co w-full mb-6 xs:flex-row">
      <div className="w-full sm:mb-0">
        <div className="relative h-full ml-0 mr-0">
          <span className="absolute top-0 left-0 w-full h-full mt-1 bg-black dark:bg-zinc-500 rounded-xl"></span>
          <div className="relative h-full p-5 bg-white dark:bg-zinc-900 border-1 border-black dark:border-zinc-600 rounded-xl px-5 py-6">
            {children}
          </div>
          {rightElement && (
            <div className="absolute right-8 top-6">
              {rightElement}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;