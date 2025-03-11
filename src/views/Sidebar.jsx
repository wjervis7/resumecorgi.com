import { values } from "lodash";
import SectionManager from "./SectionManager";

function Sidebar({ sections, handleMoveUp, handleMoveDown, handleSectionSelected }) {
  const sortedSections = [...sections].sort((a, b) => a.sortOrder - b.sortOrder);
  const moveIndexOffset = 2;

  const canMoveUp = (section) => {
    return section.sortable && section.sortOrder >= moveIndexOffset;
  }

  const canMoveDown = (section) => {
    return section.sortable && section.sortOrder <= sortedSections.filter(s => s.selected).length - moveIndexOffset;
  }

  return (
    <>
      <div className="h-full px-3 py-5 mt-0.5">
        <ul className="space-y-1 mb-">
          {sortedSections.map((section, index) => (
            section.selected && (
              <li key={section.id} className="mb-1">
                <div className="flex items-center justify-between w-full">
                  <a
                    href={section.href}
                    className="
                      flex items-center
                      flex-grow
                      text-[1.125rem]
                      text-medium
                      font-bold
                      px-3 py-[0.425rem]
                      text-gray-900 text-md
                      rounded-lg
                      dark:text-white
                      hover:bg-sky-100 outline-gray-900 dark:outline-zinc-600 hover:outline-1 dark:hover:bg-blue-900
                      group">
                    {section.displayName}
                  </a>
                  <div className="flex items-center space-x-1 me-1">
                    <button
                      onClick={() => handleMoveUp(sections.findIndex(s => s.id === section.id))}
                      className={`
                        ${ !canMoveUp(section) ? 'invisible' : 'visible' }
                        p-2 rounded-full text-gray-600 hover:text-sky-800 hover:bg-sky-100 dark:text-zinc-300 dark:hover:text-blue-200 dark:hover:bg-blue-900/30 hover:cursor-pointer`
                        }>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-[1rem] h-[1rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    </button>
                    <button
                      onClick={() => handleMoveDown(sections.findIndex(s => s.id === section.id))}
                      className={`
                        ${ !canMoveDown(section) ? 'invisible' : 'visible' }
                        p-2 rounded-full text-gray-600 hover:text-sky-800 hover:bg-sky-100 dark:text-zinc-300 dark:hover:text-blue-200 dark:hover:bg-blue-900/30 hover:cursor-pointer`
                        }>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-[1rem] h-[1rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                    </button>
                    <button
                      onClick={() => handleSectionSelected(section.id, false)}
                      title={`Remove ${section.displayName}`}
                      className={`
                        ${ section.required ? 'invisible' : 'visible' }
                        p-2 rounded-full text-gray-600 hover:text-red-800 hover:bg-red-100 dark:text-zinc-300 dark:hover:text-red-200 dark:hover:bg-red-900/30 hover:cursor-pointer`
                        }>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-[1rem] h-[1rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span className="sr-only">Remove {section.displayName}</span>
                    </button>
                  </div>
                </div>
              </li>
            )
          ))}
        </ul>
        <SectionManager sections={sections} handleSectionSelected={handleSectionSelected} />
      </div>
    </>
  );
}

export default Sidebar;