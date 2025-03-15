import SortableNav from "../components/SortableNav";
import { NavSection } from "../types";

interface SidebarProps {
  sections: NavSection[];
  handleMoveTo: (oldIndex: number, newIndex: number) => void;
  handleMoveUp?: (index: number) => void;
  handleMoveDown?: (index: number) => void;
  handleSectionSelected?: (sectionId: string, checked: boolean) => void;
}

function Sidebar({ sections, handleMoveTo }: SidebarProps) {
  // TODO: refactor into its own thing
  const canMoveUp = (section: NavSection, sortedSections: NavSection[]): boolean => {
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

  // TODO: refactor into its own thing
  const canMoveDown = (section: NavSection, sortedSections: NavSection[]): boolean => {
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
        <SortableNav sections={sections} handleMoveTo={handleMoveTo} />
      </div>
    </>
  );
}

export default Sidebar;