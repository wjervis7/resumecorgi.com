import { useState } from "react";
import Card from "../components/Card";
import CheckboxButton from "../components/CheckboxButton";

function SectionEditor({ sections, handleSectionSelected }) {
  const [isOpen, setOpen] = useState(false);

  return (
    sections.some(s => !s.selected) &&
    <>
      <div className="text-right px-1">
        <button
          onClick={() => setOpen(!isOpen)}
          className="p-2 rounded-full text-gray-900 hover:text-lime-800 hover:bg-lime-200 dark:text-zinc-200 dark:hover:text-lime-200 dark:hover:bg-lime-900/30 hover:cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-[1rem] h-[1rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
      <div hidden={!isOpen}>
        <div className="mt-3">
          <Card>
            <div className="flex items-center -mt-1 mb-2">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100" id="personalInfo">Add Section(s)</h2>
            </div>
            <p className="text-slate-800 mb-4 dark:text-gray-200 mb-4">
              Choose section(s) to add.
            </p>
            {sections.map(section => (
              !section.selected &&
              !section.required && (
                <div key={section.id} className="mb-[0.5rem]">
                  <CheckboxButton
                    text={section.displayName}
                    value={section.id}
                    isChecked={section.selected}
                    onChange={(checked) => handleSectionSelected(section.id, checked)} />
                </div>)
            ))}
          </Card>
        </div>

      </div>
    </>
  )
}

export default SectionEditor;