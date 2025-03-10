function CheckboxButton({ text = "", value = "", isChecked = false, onChange }) {
  const handleToggle = (e) => {
    if (onChange) {
      onChange(!isChecked, text, e);
    }
  };

  return (
    <div className="relative group">
      <span className="
        absolute top-0 left-0 
        w-full h-full 
        mt-[0.2rem]
        bg-black dark:bg-zinc-500
        rounded-[0.5rem]
        group-hover:mt-[0.3rem]
      "></span>
      <input 
        type="checkbox"
        id={text + "_select"}
        className="peer hidden" 
        checked={isChecked}
        value={value}
        onChange={handleToggle}/>
      <label
        htmlFor={text + "_select"}
        tabIndex="0"
        role="checkbox"
        aria-checked={isChecked}
        className="
          ${className}
          relative block w-full
          px-3 py-1.5
          font-bold text-black dark:text-white
          bg-gray-100 dark:bg-zinc-800
          border-1 border-black dark:border-zinc-500 rounded-[0.45rem]
          group-hover:bg-gray-200 dark:group-hover:bg-zinc-700 group-hover:cursor-pointer
          group-active:bg-gray-200 group-active:shadow-[inset_3px_3px_5px_rgba(0,0,0,0.4)]
          peer-checked:bg-sky-100 dark:peer-checked:bg-blue-900 dark:peer-checked:hover:bg-blue-800 peer-checked:hover:bg-sky-200 peer-checked:text-gray-900 dark:peer-checked:text-gray-100"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleToggle(e);
            }
          }}
        >{text}{isChecked ? ' ✅' : ''}</label>
    </div>
  );
}

export default CheckboxButton