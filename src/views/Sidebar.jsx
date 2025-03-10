import LinkButton from "../components/LinkButton";

function Sidebar({ sections }) {
  // Convert section names to display format (capitalize first letter)
  const formatSectionName = (sectionId) => {
    return sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
  };

  return (
    <>
      <div className="h-full px-3 py-7.5 overflow-y-auto">
        <ul className="space-y-1 font-medium">
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