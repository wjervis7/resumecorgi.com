import React from 'react';

interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  text?: string;
  className?: string;
  theme?: 'default' | 'primary' | 'interaction';
  parentClassName?: string;
}

function Button({
  onClick,
  text = "",
  className = "",
  theme = "primary",
  parentClassName = "" 
}: ButtonProps) {
  const themeClasses = {
    default:
      `
        bg-gray-200 dark:bg-zinc-600
        group-hover:bg-gray-300 dark:group-hover:bg-zinc-600
        group-active:bg-purple-200 dark:group-active:bg-zinc-500
      `,
    primary:
      `
        bg-purple-200 dark:bg-purple-800
        group-hover:bg-purple-300 dark:group-hover:bg-purple-700
        group-active:bg-purple-200 dark:group-active:bg-purple-600
      `,
    interaction:
      `
        bg-sky-200 dark:bg-blue-800
        group-hover:bg-sky-300 dark:group-hover:bg-blue-700
        group-active:bg-sky-200 dark:group-active:bg-blue-600
      `,
  }

  return (
    <div className={`${parentClassName} relative inline-block group`}>
      <span className="
        absolute top-0 left-0 
        w-full h-full 
        mt-[0.2rem]
        bg-black dark:bg-zinc-700
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
          border-1 border-black dark:border-zinc-600 rounded-[0.45rem]
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