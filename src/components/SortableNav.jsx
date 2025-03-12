import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableNavItem = ({ id, displayName, href, sortable }) => {
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

  const containerCss = `bg-white dark:bg-zinc-800 font-bold
    shadow-sm shadow-gray-300 dark:shadow-zinc-700 hover:shadow-gray-400
    text-gray-900 dark:text-gray-100
    ps-3 pe-1 py-2 mb-1.5
    rounded-lg`;

  const anchorCss = `w-full py-1 hover:underline`

  if (!sortable) {
    return (
      <div ref={setNodeRef} className={`relative block group mb-2`}>
        <span className="
          absolute top-0 left-0 
          w-full h-full 
          mt-[0.15rem]
          bg-black dark:bg-zinc-500
          rounded-[0.5rem]
          group-hover:mt-[0.2rem]
        "></span>
        <div
          className={`
            bg-white dark:bg-zinc-900
            group-active:bg-gray-200 dark:group-active:bg-zinc-800
            relative w-full
            ps-3 pe-1.5 py-1.5
            font-bold text-black dark:text-white
            border-1 border-black dark:border-zinc-500 rounded-[0.45rem]
          `}>
          <div className="flex justify-between items-center w-full">
          <a href={href} className={`${anchorCss}`}>{displayName}</a>
          <div className="p-2 rounded-full invisible">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
              </svg>
            </span>
          </div>
        </div>
        </div>
      </div>
    )
  }

  return (
    <div ref={setNodeRef} style={style} className={`relative block group mb-2`}>
      <span className="
        absolute top-0 left-0 
        w-full h-full 
        mt-[0.15rem]
        bg-black dark:bg-zinc-500
        rounded-[0.5rem]
        group-hover:mt-[0.2rem]
      "></span>
      <div
        className={`
          bg-white dark:bg-zinc-900
          group-active:bg-gray-200 dark:group-active:bg-zinc-800
          relative w-full
          ps-3 pe-1.5 py-1.5
          font-bold text-black dark:text-white
          border-1 border-black dark:border-zinc-500 rounded-[0.45rem]
        `}>
        <div className="flex justify-between items-center w-full">
        <a href={href} className={`${anchorCss}`}>{displayName}</a>
        <div className="p-2 rounded-full hover:cursor-grab" {...listeners} hidden={!sortable}>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
            </svg>
          </span>
        </div>
      </div>
      </div>
    </div>
  )
};

const SortableNav = ({sections, handleMoveTo}) => {

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      const oldIndex = sections.findIndex(s => s.id === active.id);
      const newIndex = sections.findIndex(s => s.id == over.id);

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
        items={sections}
        strategy={verticalListSortingStrategy}
      >
        <div>
          {sections.map((section) => (
            <SortableNavItem key={section.id} id={section.id} displayName={section.displayName} href={section.href} sortable={section.sortable} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default SortableNav;