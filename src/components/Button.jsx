function Button({ onClick, text = "", className = "" }) {
  return (
    <div className="relative inline-block group">
      <span className="
        absolute top-0 left-0 
        w-full h-full 
        mt-[0.2rem]
        bg-black dark:bg-gray-200
        rounded-[0.5rem]
        group-hover:mt-[0.3rem]
      "></span>
      <button
        className={`
          ${className}
          relative w-full
          px-3 py-1.5
          font-bold text-black dark:text-white
          bg-lime-100 dark:bg-purple-700
          border-1 border-black dark:border-transparent rounded-[0.45rem]
          group-hover:bg-lime-200 dark:group-hover:bg-lime-500 dark:group-hover:text-black group-hover:cursor-pointer
          group-active:bg-lime-300 group-active:shadow-[inset_3px_3px_5px_rgba(0,0,0,0.4)]
        `}
        onClick={onClick}>
        {text}
      </button>
    </div>
  );
}

export default Button