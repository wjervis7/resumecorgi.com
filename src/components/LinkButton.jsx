function LinkButton({ href, text = "", className = "", theme = "primary", target = "_self" }) {
  const shadowThemeClasses = {
    nav:
      `
        ms-[0.15rem]
        group-hover:ms-[0.25rem]
      `,
    primary:
      `
        mt-[0.2rem]
        group-hover:mt-[0.3rem]
      `,
    interaction:
      `
        mt-[0.2rem]
        group-hover:mt-[0.3rem]
      `,
  }
  
  const linkThemeClasses = {
    nav:
      `
        bg-white dark:bg-zinc-800
        group-hover:bg-gray-200 dark:group-hover:bg-zinc-700
        group-active:bg-sky-200 dark:group-active:bg-purple-800
      `,
    primary:
      `
        bg-purple-100 dark:bg-purple-900
        group-hover:bg-purple-200 dark:group-hover:bg-purple-800
        group-active:bg-purple-200
      `,
    interaction:
      `
        bg-sky-100 dark:bg-blue-900
        group-hover:bg-sky-200 dark:group-hover:bg-blue-800
        group-active:bg-sky-200
      `,
  }

  return (
    <div className="relative group">
      <span className={`
        ${shadowThemeClasses[theme]}
        absolute top-0 left-0 
        w-full h-full
        bg-black dark:bg-zinc-500
        rounded-[0.5rem]
      `}></span>
      <a
        href={href}
        target={target}
        className={`
          ${className}
          ${linkThemeClasses[theme]}
          relative block w-full
          px-3 py-1.5
          font-bold text-black dark:text-white
          border-1 border-black dark:border-zinc-500 rounded-[0.45rem]
          group-hover:cursor-pointer
          group-active:shadow-[inset_3px_3px_5px_rgba(0,0,0,0.4)]
        `}>
        {text}
      </a>
    </div>
  );
}

export default LinkButton