import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from "@/components/ui/sidebar"
import { NavSection } from "@/types";
import SortableNav from "./SortableNav";
import Footer from "./Footer";
import Button from "./Button";

interface SidebarProps {
  sections: NavSection[];
  handleMoveTo: (oldIndex: number, newIndex: number) => void;
  handleSectionSelected?: (sectionId: string, checked: boolean) => void;
  resetData?: () => void;
  sampleData?: () => void;
}

function AppSidebar({ sections, handleMoveTo, resetData, sampleData }: SidebarProps) {
  return (
    <Sidebar className="border-none dark:border-zinc-700">
      <SidebarContent className="mt-[75px] bg-gray-50 dark:bg-zinc-800 overflow-hidden">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-700 dark:text-zinc-300 font-normal">Sections</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-2">
              <SortableNav sections={sections} handleMoveTo={handleMoveTo} />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-700 dark:text-zinc-300 font-normal">Data</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-2">
              <Button
                  theme="default"
                  text="Reset"
                  onClick={resetData}
                  />
              <span className="me-2"></span>
              <Button
                  theme="default"
                  text="Sample"
                  onClick={resetData}
                  />
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
