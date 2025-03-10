import LinkButton from "../components/LinkButton";
import SectionManager from "./SectionManager";

function Sidebar({ sections, handleSectionSelected }) {
  return (
    <>
      <div className="h-full px-3 py-5 overflow-y-auto">
        <SectionManager sections={sections} handleSectionSelected={handleSectionSelected} />
        <ul className="space-y-1 font-medium mt-3">
          {sections.map(section => (
            section.selected && (
              <li key={section.id} className="mb-1">
                <LinkButton
                  className={"block w-full"}
                  href={`#${section.href}`}
                  text={section.displayName}
                  theme="nav" />
              </li>
            )
          ))}
        </ul>
      </div>
    </>
  );
}

export default Sidebar;