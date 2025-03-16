import { NavSection, Sortable } from '../types';

/**
 * Moves a section up in the sorted order
 * @param sections Current sections array
 * @param index Index of the section to move
 * @returns New array with updated section order
 */
export const moveUp = (sections: Sortable[], index: number): Sortable[] => {
  // Get the current sorted order for reference
  const sortedSections = [...sections].sort((a, b) => a.sortOrder - b.sortOrder);

  // Find the section in the sortedSections array by id
  const sectionId = sections[index].id;
  const sortedIndex = sortedSections.findIndex(section => section.id === sectionId);
  const item = sortedSections[sortedIndex];

  // Cannot move if it's not sortable
  if (!item.sortable) return sections;

  // Find the previous sortable item (if any)
  let prevSortableIndex = -1;
  for (let i = sortedIndex - 1; i >= 0; i--) {
    if (sortedSections[i].sortable) {
      prevSortableIndex = i;
      break;
    }
  }

  // If no previous sortable item, we can't move up
  if (prevSortableIndex === -1) return sections;

  const prevItem = sortedSections[prevSortableIndex];

  // Update sections with swapped sortOrders
  return sections.map(section => {
    if (section.id === item.id) {
      return { ...section, sortOrder: prevItem.sortOrder };
    }
    if (section.id === prevItem.id) {
      return { ...section, sortOrder: item.sortOrder };
    }
    return section;
  });
};

/**
 * Moves a section down in the sorted order
 * @param sections Current sections array
 * @param index Index of the section to move
 * @returns New array with updated section order
 */
export const moveDown = (sections: Sortable[], index: number): Sortable[] => {
  // Get the current sorted order for reference
  const sortedSections = [...sections].sort((a, b) => a.sortOrder - b.sortOrder);

  // Find the section in the sortedSections array by id
  const sectionId = sections[index].id;
  const sortedIndex = sortedSections.findIndex(section => section.id === sectionId);
  const item = sortedSections[sortedIndex];

  // Cannot move if it's not sortable
  if (!item.sortable) return sections;

  // Find the next sortable item (if any)
  let nextSortableIndex = -1;
  for (let i = sortedIndex + 1; i < sortedSections.length; i++) {
    if (sortedSections[i].sortable) {
      nextSortableIndex = i;
      break;
    }
  }

  // If no next sortable item, we can't move down
  if (nextSortableIndex === -1) return sections;

  const nextItem = sortedSections[nextSortableIndex];

  // Update sections with swapped sortOrders
  return sections.map(section => {
    if (section.id === item.id) {
      return { ...section, sortOrder: nextItem.sortOrder };
    }
    if (section.id === nextItem.id) {
      return { ...section, sortOrder: item.sortOrder };
    }
    return section;
  });
};

/**
 * Moves a section from one position to another
 * @param sections Current sections array
 * @param oldIndex Current position index
 * @param newIndex Desired position index
 * @returns New array with updated section order
 */
export const moveTo = (sections: Sortable[], oldIndex: number, newIndex: number): Sortable[] => {
  // Create a copy of sorted sections
  const sortedSections = [...sections].sort((a, b) => a.sortOrder - b.sortOrder);

  // Get items by actual array indices (not sort values)
  const itemToMove = sortedSections[oldIndex];

  // Remove the item from its position
  sortedSections.splice(oldIndex, 1);

  // Insert the item at the new position
  sortedSections.splice(newIndex, 0, itemToMove);

  // Reassign all sortOrder values sequentially (0, 1, 2, 3, ...)
  return sortedSections.map((section, index) => ({
    ...section,
    sortOrder: index
  }));
};

/**
 * Toggles the selected state of a section
 * @param sections Current sections array
 * @param sectionId ID of the section to toggle
 * @param checked New selected state
 * @returns New array with updated selection
 */
export const toggleSectionSelected = (
  sections: NavSection[], 
  sectionId: string, 
  checked: boolean
): NavSection[] => {
  return sections.map(section =>
    section.id === sectionId
      ? { ...section, selected: checked }
      : section
  );
};