function Input({ type = "text", label, placeholder = "", formData, handleChange }) {
  return(
    <>
      <div>
        <label htmlFor={formData.id} className="block text-sm text-gray-800 dark:text-zinc-200 mb-1">{ label }</label>
        <div className="relative inline-block w-full group mb-3">
          <input
            type={type}
            id={formData.id}
            name={formData.name}
            value={formData.value}
            onChange={handleChange}
            className="relative w-full px-2.25 py-1.5 text-sm text-black dark:text-white 
                       bg-gray-50 dark:bg-zinc-900
                       border-1 border-black dark:border-zinc-500 rounded-lg
                       hover:border-lime-500 dark:hover:border-lime-500
                       hover:bg-lime-50 dark:hover:bg-lime-900
                       focus:outline-lime-500 focus:outline-3 focus:border-lime-500 focus:ring-lime-500 dark:focus:border-lime-500 dark:focus:border-transparent
                       focus:bg-lime-50 dark:focus:bg-lime-900"
            placeholder={placeholder}
          />
        </div>
      </div>
    </>
  )
}

export default Input