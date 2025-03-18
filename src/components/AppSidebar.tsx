import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger } from "@/components/ui/sidebar"
import { NavSection } from "@/types";
import SortableNav from "./SortableNav";
import Footer from "./Footer";
import { EraserIcon, FlaskConical } from "lucide-react";

interface SidebarProps {
  sections: NavSection[];
  handleMoveTo: (oldIndex: number, newIndex: number) => void;
  handleSectionSelected: (sectionId: string, checked: boolean) => void;
  resetData?: () => void;
  sampleData?: () => void;
}

const clearForm = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, resetData?: () => void) => {
  e.preventDefault();
  resetData?.();
}

const loadSample = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, sampleData?: () => void) => {
  e.preventDefault();
  sampleData?.();
}

function AppSidebar({ sections, handleMoveTo, handleSectionSelected, resetData, sampleData }: SidebarProps) {
  return (
    <Sidebar className="border-r-0 border-t-0 border-gray-400 dark:border-zinc-700">
      <SidebarContent className="mt-0 lg:mt-[75px] bg-gray-100 dark:bg-zinc-800/95 overflow-hidden">
        <SidebarGroup className="block lg:hidden">
          <SidebarGroupContent>
            <SidebarTrigger className="
              hover:cursor-pointer dark:text-zinc-200 rounded-full
              dark:hover:bg-zinc-800 dark:hover:text-zinc-200" />
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-700 dark:text-zinc-300">Sections</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-2">
              <SortableNav sections={sections} handleMoveTo={handleMoveTo} handleSelected={handleSectionSelected} />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Data</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem key={"menu-clear-data"}>
                <SidebarMenuButton asChild className="hover:bg-gray-200 dark:hover:bg-zinc-700">
                  <a href={"#"} onClick={(e) => clearForm(e, resetData)}>
                    <EraserIcon />
                    <span>Clear Form</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem key={"menu-load-sample-data"}>
                <SidebarMenuButton asChild className="hover:bg-gray-200 dark:hover:bg-zinc-700">
                  <a href={"#"} onClick={(e) => loadSample(e, sampleData)}>
                    <FlaskConical />
                    <span>Load Sample</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-gray-100/95 dark:bg-zinc-800/95">
        <Footer className="relative" />
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar;
