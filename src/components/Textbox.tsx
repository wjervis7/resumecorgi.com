import React from 'react';

interface FormData {
  id: string;
  name: string;
  value: string;
}

interface TextboxProps {
  rows?: number;
  label: string;
  placeholder?: string;
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function Textbox({
  rows = 3,
  label,
  placeholder = "",
  formData,
  handleChange
}: TextboxProps) {
  return(
    <>
      <div>
        <label htmlFor={formData.id} className="block text-sm text-gray-800 dark:text-zinc-200 mb-1">{ label }</label>
        <div className="relative inline-block w-full group">
          <textarea
            id={formData.id}
            name={formData.name}
            value={formData.value}
            onChange={handleChange}
            className="transition-colors duration-50 relative w-full p-2 text-sm text-black dark:text-white 
                       bg-gray-50 dark:bg-zinc-800
                       border-1 border-gray-200 dark:border-zinc-700 rounded-lg
                       hover:border-purple-200 dark:hover:border-purple-700
                       hover:bg-purple-100 dark:hover:bg-purple-900/50
                       focus:outline-purple-600/75 focus:outline-3 focus:border-purple-600/75 focus:ring-purple-600/75 dark:focus:border-purple-600/75 dark:focus:border-transparent
                       focus:bg-purple-100 dark:focus:bg-purple-950/75
                       [&::-webkit-scrollbar]:w-3
                       [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full
                       [&::-webkit-scrollbar-thumb]:border-[3px] [&::-webkit-scrollbar-thumb]:border-transparent [&::-webkit-scrollbar-track]:border-transparent
                       [&::-webkit-scrollbar-thumb]:bg-zinc-400
                       [&::-webkit-scrollbar-thumb]:bg-clip-padding
                       dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600"
            placeholder={placeholder}
            rows={rows}
          />
        </div>
      </div>
    </>
  );
}

export default Textbox;