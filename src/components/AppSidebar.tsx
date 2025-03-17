import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from "@/components/ui/sidebar"
import { NavSection } from "@/types";
import SortableNav from "./SortableNav";
import Footer from "./Footer";

interface SidebarProps {
  sections: NavSection[];
  handleMoveTo: (oldIndex: number, newIndex: number) => void;
  handleMoveUp?: (index: number) => void;
  handleMoveDown?: (index: number) => void;
  handleSectionSelected?: (sectionId: string, checked: boolean) => void;
}

function AppSidebar({ sections, handleMoveTo }: SidebarProps) {
  return (
    <Sidebar className="border-none dark:border-zinc-700">
      <SidebarContent className="mt-[75px] bg-gray-50 dark:bg-zinc-800 overflow-hidden">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-700 dark:text-zinc-300 font-normal">Manage Sections</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-2 max-w-100%">
              <SortableNav sections={sections} handleMoveTo={handleMoveTo} />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-gray-50 dark:bg-zinc-800">
        <Footer className="relative" />
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar;
