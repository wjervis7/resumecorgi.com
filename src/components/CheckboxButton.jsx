function CheckboxButton({ onChange, isChecked = false, text = "" }) {
  const handleToggle = (e) => {
    if (onChange) {
      onChange(!isChecked, text, e);
    }
  };

  return (
    <div className="relative inline-block group">
      <span className="
        absolute top-0 left-0 
        w-full h-full 
        mt-[0.5rem]
        bg-black dark:bg-gray-200
        rounded-[0.5rem] 
        //transition-all 
        group-hover:mt-[0.6rem]
      "></span>
      <input 
        type="checkbox"
        id={text + "_select"}
        className="peer hidden" 
        checked={isChecked}
        onChange={handleToggle}/>
      <label
        htmlFor={text + "_select"}
        tabIndex="0"
        role="checkbox"
        aria-checked={isChecked}
        className="
          ${className}
          relative w-full
          px-3 py-1.5
          font-bold text-black dark:text-white
          bg-gray-100 dark:bg-slate-800
          border-1 border-black dark:border-transparent rounded-[0.45rem]
          group-hover:bg-gray-200 dark:group-hover:bg-slate-700 group-hover:cursor-pointer
          group-active:bg-gray-200 group-active:shadow-[inset_3px_3px_5px_rgba(0,0,0,0.4)]
          peer-checked:bg-blue-200 dark:peer-checked:bg-blue-700 peer-checked:text-gray-900 dark:peer-checked:text-gray-100"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleToggle(e);
            }
          }}
        >{text}</label>
    </div>
  );
}

export default CheckboxButton