import React from 'react';

interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  text?: string;
  className?: string;
  theme?: 'default' | 'primary' | 'interaction' | 'danger' | 'success' | 'warning';
  parentClassName?: string;
}

function Button({
  onClick,
  text = "",
  className = "",
  theme = "primary",
  parentClassName = "" 
}: ButtonProps) {
  const themeShadowClasses = {
    default:
      `
        bg-black
      `,
    primary:
      `
        bg-black
      `,
    interaction:
      `
        bg-black dark:bg-zinc-700
      `,
    danger:
      `
        bg-black
      `,
    "danger-outline":
      `
        bg-black dark:bg-zinc-700
      `,
    success:
      `
        bg-black /dark:bg-zinc-700
      `,
    warning:
      `
        bg-black dark:bg-zinc-700
      `
  }


  const themeClasses = {
    default:
      `
        bg-gray-200 dark:bg-zinc-700
        group-hover:bg-gray-300 dark:group-hover:bg-zinc-600
        group-active:bg-purple-200 dark:group-active:bg-zinc-600
        border-black
        text-black dark:text-white
      `,
    primary:
      `
        bg-purple-200 dark:bg-purple-800
        group-hover:bg-purple-300 dark:group-hover:bg-purple-700
        group-active:bg-purple-200 dark:group-active:bg-purple-600
        border-black
        text-black dark:text-white
      `,
    interaction:
      `
        bg-sky-200 dark:bg-blue-700
        group-hover:bg-sky-300 dark:group-hover:bg-blue-600
        group-active:bg-sky-200 dark:group-active:bg-blue-600
        border-black
        text-black dark:text-white
      `,
    danger:
      `
        bg-rose-200 dark:bg-rose-700
        group-hover:bg-rose-300 dark:group-hover:bg-rose-600
        group-active:bg-rose-200 dark:group-active:bg-rose-600
        border-black
        text-black dark:text-white
      `,
    success:
      `
        bg-lime-200 dark:bg-lime-700
        group-hover:bg-lime-300 dark:group-hover:bg-lime-600
        group-active:bg-lime-200 dark:group-active:bg-emerald-600
        border-black 
        text-black dark:text-white
      `,
    warning:
      `
        bg-yellow-200 dark:bg-yellow-700
        group-hover:bg-yellow-300 dark:group-hover:bg-yellow-600
        group-active:bg-yellow-200 dark:group-active:bg-yellow-600
        border-black
        text-black dark:text-white
      `
  }

  return (
    <div className={`${parentClassName} relative inline-block group`}>
      <span className={`
        absolute top-0 left-0 
        w-full h-full 
        mt-[0.2rem] ms-[0.2rem]
        ${themeShadowClasses[theme]}
        rounded-lg
        group-hover:mt-[0.3rem] group-hover:ms-[0.3rem]
      `}></span>
      <button
        className={`
          ${className}
          ${themeClasses[theme]}
          relative w-full
          px-3 py-1.5
          font-bold
          border-1 border-black /dark:border-zinc-600
          rounded-lg
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