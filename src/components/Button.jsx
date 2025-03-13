function Button({ onClick, text = "", className = "", theme = "primary", parentClassName = "" }) {
  const themeClasses = {
    default:
      `
        bg-gray-100 dark:bg-zinc-800
        group-hover:bg-gray-200 dark:group-hover:bg-zinc-700
        group-active:bg-purple-200 dark:group-active:bg-zinc-700
      `,
    primary:
      `
        bg-purple-100 dark:bg-purple-900
        group-hover:bg-purple-200 dark:group-hover:bg-purple-800
        group-active:bg-purple-200 dark:group-active:bg-purple-800
      `,
    interaction:
      `
        bg-sky-100 dark:bg-blue-900
        group-hover:bg-sky-200 dark:group-hover:bg-blue-800
        group-active:bg-sky-200 dark:group-active:bg-blue-800
      `,
  }

  return (
    <div className={`${parentClassName} relative inline-block group`}>
      <span className="
        absolute top-0 left-0 
        w-full h-full 
        mt-[0.2rem]
        bg-black dark:bg-zinc-500
        rounded-[0.5rem]
        group-hover:mt-[0.3rem]
      "></span>
      <button
        className={`
          ${className}
          ${themeClasses[theme]}
          relative w-full
          px-3 py-1.5
          font-bold text-black dark:text-white
          border-1 border-black dark:border-zinc-500 rounded-[0.45rem]
          group-hover:cursor-pointer
          group-active:shadow-[inset_3px_3px_5px_rgba(0,0,0,0.4)]
        `}
        onClick={onClick}>
        {text}
      </button>
    </div>
  );
}

export default Button