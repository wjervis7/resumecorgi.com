function Textbox({ rows = 3, label, placeholder = "", formData, handleChange }) {
  return(
    <>
      <div>
        <label htmlFor={formData.id} className="block text-sm text-gray-800 dark:text-gray-300 mb-1">{ label }</label>
        <div className="relative inline-block w-full group">
          <textarea
            id={formData.id}
            name={formData.name}
            value={formData.value}
            onChange={handleChange}
            className="relative w-full px-2.25 py-1.5 text-sm text-black dark:text-white 
                       bg-slate-50 dark:bg-slate-800 
                       border-1 border-black dark:border-gray-200 rounded-lg
                       hover:border-lime-500 dark:hover:border-lime-400
                       hover:bg-lime-50 dark:hover:bg-lime-950
                       focus:outline-lime-500 focus:outline-3 focus:border-lime-500 focus:ring-lime-500 dark:focus:border-lime-300 dark:focus:border-transparent
                       focus:bg-lime-50 dark:focus:bg-lime-950"
            placeholder={placeholder}
            rows={rows}
          />
        </div>
      </div>
    </>
  )
}

export default Textbox