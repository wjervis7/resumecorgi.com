function Input({ type = "text", label, placeholder = "", formData, handleChange }) {
  return(
    <>
      <div>
        <label htmlFor={formData.id} className="block text-sm text-gray-800 dark:text-gray-300 mb-1">{ label }</label>
        <div className="relative inline-block w-full group mb-3">
          <span className="absolute top-0 left-0 w-full h-full mt-0.75 ml-0.75 bg-black dark:bg-gray-200 rounded-lg"></span>
          <input
            type={type}
            id={formData.id}
            name={formData.name}
            value={formData.value}
            onChange={handleChange}
            className="relative w-full px-3 py-1.5 font-medium text-black dark:text-white bg-slate-50 dark:bg-slate-800 border border-black dark:border-gray-200 rounded-lg transition-all group-hover:bg-lime-100 dark:group-hover:bg-lime-500 dark:group-hover:text-black group-focus-within:mt-1 group-focus-within:ml-1"
            placeholder={placeholder}
          />
        </div>
      </div>
    </>
  )
}

export default Input