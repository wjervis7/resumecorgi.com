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

interface Section {
  id: string;
  displayName: string;
  href: string;
  sortable: boolean;
}

interface SortableNavItemProps {
  id: string;
  displayName: string;
  href: string;
  sortable: boolean;
}

interface SortableNavProps {
  sections: Section[];
  handleMoveTo: (oldIndex: number, newIndex: number) => void;
}

const SortableNavItem: React.FC<SortableNavItemProps> = ({ id, displayName, href, sortable }) => {
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
      <div ref={setNodeRef} className={`relative block group mb-[0.725rem]`}>
        <span className="
          absolute top-0 left-0 
          w-full h-full 
          mt-[0.2rem]
          bg-black dark:bg-zinc-700
          rounded-[0.5rem]
          group-hover:translate-x-[3px] group-hover:translate-y-[1px]
          transition
          duration-150
        "></span>
        <div
          className={`
            bg-white dark:bg-zinc-800
            group-active:bg-gray-100 dark:group-active:bg-zinc-700
            relative w-full
            ps-3 pe-1.5 py-1.5
            font-bold text-black dark:text-white
            border-1 border-black dark:border-zinc-600 rounded-[0.45rem]
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
      className={`relative block group mb-[0.725rem]`}
    >
      <span className="
        absolute top-0 left-0 
        w-full h-full 
        mt-[0.2rem]
        bg-black dark:bg-zinc-700
        rounded-[0.5rem]
        group-hover:translate-x-[3px] group-hover:translate-y-[1px]
        transition
        duration-150
      "></span>
      <div
        className={`
          bg-white dark:bg-zinc-800
          group-active:bg-gray-100 dark:group-active:bg-zinc-700
          relative w-full
          ps-3 pe-1.5 py-1.5
          font-bold text-black dark:text-white
          border-1 border-black dark:border-zinc-600 rounded-[0.45rem]
        `}
      >
        <div className="flex justify-between items-center w-full">
          <a href={href} className={`${anchorCss}`}>{displayName}</a>
          
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

const SortableNav: React.FC<SortableNavProps> = ({ sections, handleMoveTo }) => {
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
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default SortableNav;