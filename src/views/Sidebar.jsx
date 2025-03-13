import SortableNav from "../components/SortableNav";
import SectionEditor from "./SectionEditor";

function Sidebar({ sections, handleMoveUp, handleMoveDown, handleSectionSelected, handleMoveTo }) {
  const sortedSections = [...sections].sort((a, b) => a.sortOrder - b.sortOrder);
  
  const canMoveUp = (section) => {
    if (!section.sortable) return false;
    
    // Find previous sortable section
    const sortedIndex = sortedSections.findIndex(s => s.id === section.id);
    let hasPrevSortable = false;
    
    for (let i = sortedIndex - 1; i >= 0; i--) {
      if (sortedSections[i].sortable && sortedSections[i].selected) {
        hasPrevSortable = true;
        break;
      }
    }
    
    return hasPrevSortable;
  }

  const canMoveDown = (section) => {
    if (!section.sortable) return false;
    
    // Find next sortable section
    const sortedIndex = sortedSections.findIndex(s => s.id === section.id);
    let hasNextSortable = false;
    
    for (let i = sortedIndex + 1; i < sortedSections.length; i++) {
      if (sortedSections[i].sortable && sortedSections[i].selected) {
        hasNextSortable = true;
        break;
      }
    }
    
    return hasNextSortable;
  }

  return (
    <>
      <div className="">
        <SortableNav sections={sections} handleMoveTo={handleMoveTo}  />
      </div>
    </>
  );
}

export default Sidebar;