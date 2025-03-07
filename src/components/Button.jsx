function Button({ onClick, text = "", className = "" }) {
  return (
    <div class="relative inline-block group">
      <span class="absolute top-0 left-0 w-full h-full mt-0.75 ml-0.75 bg-black dark:bg-gray-200 rounded-lg transition-all group-hover:mt-1 group-hover:ml-1"></span>
      <button 
        className={`relative w-full px-3 py-1.5 font-bold text-black dark:text-white bg-lime-100 dark:bg-purple-700 border-1 border-black dark:border-gray-200 rounded-lg transition-all group-hover:bg-lime-200 dark:group-hover:bg-lime-500 dark:group-hover:text-black group-active:mt-1 group-active:ml-1 group-hover:cursor-pointer ${className}`}
        onClick={onClick}>
        {text}
      </button>
  </div>
  );
}

export default Button