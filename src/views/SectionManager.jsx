import { useState } from "react";
import Card from "../components/Card";
import CheckboxButton from "../components/CheckboxButton";

function SectionManager({ sections, handleSectionSelected }) {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div className="text-right group">
        <div className="relative inline-block">
          <span className="
            absolute top-0 left-0 
            w-full h-full 
            ms-[0.1rem] mt-[0.1rem]
            bg-black dark:bg-zinc-500
            rounded-full
            group-hover:ms-[0.2rem] group-hover:mt-[0.2rem]
          "></span>
          <button
            type="button"
            aria-expanded={isOpen}
            onClick={() => setOpen(!isOpen)}
            className="
              relative flex items-center justify-center
              text-gray-900 dark:text-gray-200
              rounded-full
              border-1 border-black dark:border-zinc-500
              w-10 h-10
              bg-white hover:bg-gray-200 dark:bg-zinc-900 dark:hover:bg-zinc-800
              hover:cursor-pointer">
            <svg class="w-4 h-4 transition-transform" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
            </svg>
            <span class="sr-only">Open actions menu to manage resume sections</span>
          </button>
        </div>
      </div>
      <div className={isOpen ? "hidden" : "block"}>
        <div className="mt-3"></div>
        <Card>
          <div class="flex items-center -mt-1 mb-2">
            <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100" id="personalInfo">Edit Sections</h2>
          </div>
          <p class="text-slate-800 mb-4 dark:text-gray-200 mb-4">
            Choose the sections you'd like to include. These are optional.
          </p>
          {sections.map(section => (
            !section.required && (
              <>
                <div className="mb-[0.5rem]">
                  <CheckboxButton
                    text={section.displayName}
                    value={section.id}
                    isChecked={section.selected}
                    onChange={(checked) => handleSectionSelected(section.id, checked)} />
                </div>
              </>)
          ))}
        </Card>
      </div>
    </>
  )
}

export default SectionManager;