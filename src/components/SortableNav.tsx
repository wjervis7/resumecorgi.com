import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { NavSection } from '../types';

interface SortableNavItemProps {
  id: string;
  displayName: string;
  href: string;
  sortable: boolean;
  required: boolean;
  selected: boolean;
  onSelected: (sectionId: string) => void;
}

interface SortableNavProps {
  sections: NavSection[];
  handleMoveTo: (oldIndex: number, newIndex: number) => void;
  handleSelected: (sectionId: string, checked: boolean) => void;
}

const SortableNavItem: React.FC<SortableNavItemProps> = ({ id, displayName, href, sortable, required, selected, onSelected }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const anchorCss = `w-full py-1 hover:underline`;

  if (!sortable) {
    return (
      <div ref={setNodeRef} className={`relative block group/sections mb-[0.725rem]`}>
        <span className="
          absolute top-0 left-0 
          w-full h-full 
          mt-[0.2rem] ms-[0.2rem]
          bg-black
          rounded-lg
          group-hover/sections:translate-x-[3px] group-hover/sections:translate-y-[1px]
          transition
          duration-150
        "></span>
        <div
          className={`
            bg-white dark:bg-zinc-700
            group-active/sections:bg-gray-100 dark:group-active/sections:bg-zinc-600
            relative w-full
            ps-3 pe-1.5 py-1.5
            font-bold text-black dark:text-white
            border-1 border-black rounded-[0.45rem]
          `}>
          <div className="flex justify-between items-center w-full">
            <a href={href} className={`${anchorCss}`}>{displayName}</a>
            <div className="p-2 rounded-full invisible">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className={`relative block group/sections mb-[0.725rem]`}
    >
      <span className="
        absolute top-0 left-0 
        w-full h-full 
        mt-[0.2rem] ms-[0.2rem]
        bg-black
        rounded-lg
        group-hover/sections:translate-x-[3px] group-hover/sections:translate-y-[1px]
        transition
        duration-150
      "></span>
      <div
        className={`
          bg-white dark:bg-zinc-700
          group-active/sections:bg-gray-100 dark:group-active/sections:bg-zinc-600
          relative w-full
          ps-3 pe-1.5 py-1.5
          font-bold text-black dark:text-white
          border-1 border-black rounded-[0.45rem]
        `}
      >
        <div className="flex justify-between items-center w-full">
          <a href={href} className={`${anchorCss}`}>{displayName}</a>
          
          {!required && (
            <div 
              className="p-2 rounded-full hover:cursor-pointer"
              onClick={() => onSelected(id)}
            >

              {selected && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-eye size-4"
                  >
                    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                    <circle cx="12" cy="12" r="3" />
                </svg>
              )}

              {!selected && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-eye-off size-4"
                  >
                  <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/>
                  <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/>
                  <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/>
                  <path d="m2 2 20 20"/>
                </svg>
              )}
            </div>
          )}

          {sortable && (
            <div 
              className="p-2 rounded-full hover:cursor-grab" 
              {...listeners}
              {...attributes}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth="1.5" 
                stroke="currentColor" 
                className="size-4"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" 
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SortableNav: React.FC<SortableNavProps> = ({ sections, handleMoveTo, handleSelected }) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (active.id !== over?.id && over) {
      const oldIndex = sections.findIndex(s => s.id === active.id);
      const newIndex = sections.findIndex(s => s.id === over.id);

      if (!sections[newIndex].sortable) return;

      handleMoveTo(oldIndex, newIndex);
    }
  };

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext 
        items={sections.map(section => section.id)}
        strategy={verticalListSortingStrategy}
      >
        <div>
          {sections.map((section) => (
            <SortableNavItem 
              key={section.id} 
              id={section.id} 
              displayName={section.displayName} 
              href={section.href} 
              sortable={section.sortable}
              required={section.required}
              selected={section.selected}
              onSelected={() => handleSelected(section.id, !section.selected)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default SortableNav;