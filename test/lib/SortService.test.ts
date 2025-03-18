import { moveUp, moveDown, moveTo, toggleSectionSelected } from '../../src/lib/SortService';
import { NavSection, Sortable } from '../../src/types';

describe('SortService', () => {
  const testSortables: Sortable[] = [
    { id: 'section1', sortable: true, sortOrder: 0 },
    { id: 'section2', sortable: true, sortOrder: 1 },
    { id: 'section3', sortable: true, sortOrder: 2 },
    { id: 'section4', sortable: false, sortOrder: 3 },
    { id: 'section5', sortable: true, sortOrder: 4 }
  ];

  const testNavSections: NavSection[] = [
    { id: 'section1', displayName: 'Section 1', href: '#section1', selected: true, sortable: true, sortOrder: 0, required: false },
    { id: 'section2', displayName: 'Section 2', href: '#section2', selected: true, sortable: true, sortOrder: 1, required: false },
    { id: 'section3', displayName: 'Section 3', href: '#section3', selected: true, sortable: true, sortOrder: 2, required: false },
    { id: 'section4', displayName: 'Section 4', href: '#section4', selected: true, sortable: false, sortOrder: 3, required: false },
    { id: 'section5', displayName: 'Section 5', href: '#section5', selected: true, sortable: true, sortOrder: 4, required: false }
  ];

  describe('moveUp', () => {
    it('should move a section up in sort order', () => {
      const index = 2; // section3
      const result = moveUp(testSortables, index);
      
      // section3 should now have sortOrder 1, section2 should have sortOrder 2
      const section3 = result.find(s => s.id === 'section3');
      const section2 = result.find(s => s.id === 'section2');
      
      expect(section3?.sortOrder).toBe(1);
      expect(section2?.sortOrder).toBe(2);
    });

    it('should not move up the first sortable section', () => {
      const index = 0; // section1 (first item)
      const result = moveUp(testSortables, index);
      
      // Order should remain unchanged
      expect(result).toEqual(testSortables);
    });

    it('should not move up a non-sortable section', () => {
      const index = 3; // section4 (non-sortable)
      const result = moveUp(testSortables, index);
      
      // Order should remain unchanged
      expect(result).toEqual(testSortables);
    });

    it('should skip non-sortable sections when moving up', () => {
      // Create test case with non-sortable section in the middle
      const sectionsWithMiddleFixed = [
        { id: 'section1', sortable: true, sortOrder: 0 },
        { id: 'section2', sortable: false, sortOrder: 1 }, // non-sortable
        { id: 'section3', sortable: true, sortOrder: 2 }
      ];
      
      const index = 2; // section3
      const result = moveUp(sectionsWithMiddleFixed, index);
      
      // section3 should now have sortOrder 0, section1 should have sortOrder 2
      const section3 = result.find(s => s.id === 'section3');
      const section1 = result.find(s => s.id === 'section1');
      
      expect(section3?.sortOrder).toBe(0);
      expect(section1?.sortOrder).toBe(2);
    });
  });

  describe('moveDown', () => {
    it('should move a section down in sort order', () => {
      const index = 1; // section2
      const result = moveDown(testSortables, index);
      
      // section2 should now have sortOrder 2, section3 should have sortOrder 1
      const section2 = result.find(s => s.id === 'section2');
      const section3 = result.find(s => s.id === 'section3');
      
      expect(section2?.sortOrder).toBe(2);
      expect(section3?.sortOrder).toBe(1);
    });

    it('should not move down the last sortable section', () => {
      const index = 4; // section5 (last sortable item)
      const result = moveDown(testSortables, index);
      
      // Order should remain unchanged
      expect(result).toEqual(testSortables);
    });

    it('should not move down a non-sortable section', () => {
      const index = 3; // section4 (non-sortable)
      const result = moveDown(testSortables, index);
      
      // Order should remain unchanged
      expect(result).toEqual(testSortables);
    });

    it('should skip non-sortable sections when moving down', () => {
      // Create test case with non-sortable section in the middle
      const sectionsWithMiddleFixed = [
        { id: 'section1', sortable: true, sortOrder: 0 },
        { id: 'section2', sortable: false, sortOrder: 1 }, // non-sortable
        { id: 'section3', sortable: true, sortOrder: 2 }
      ];
      
      const index = 0; // section1
      const result = moveDown(sectionsWithMiddleFixed, index);
      
      // section1 should now have sortOrder 2, section3 should have sortOrder 0
      const section1 = result.find(s => s.id === 'section1');
      const section3 = result.find(s => s.id === 'section3');
      
      expect(section1?.sortOrder).toBe(2);
      expect(section3?.sortOrder).toBe(0);
    });
  });

  describe('moveTo', () => {
    it('should move a section to a specific position', () => {
      const oldIndex = 0; // section1
      const newIndex = 2; // Move to position 2
      const result = moveTo(testSortables, oldIndex, newIndex);
      
      // Check if all items have sequential sortOrder values
      expect(result[0].sortOrder).toBe(0);
      expect(result[1].sortOrder).toBe(1);
      expect(result[2].sortOrder).toBe(2);
      
      // Verify section1 is now at position 2
      const section1 = result.find(s => s.id === 'section1');
      expect(section1?.sortOrder).toBe(2);
    });

    it('should handle moving a section to the start', () => {
      const oldIndex = 4; // section5
      const newIndex = 0; // Move to position 0
      const result = moveTo(testSortables, oldIndex, newIndex);
      
      // Verify section5 is now at position 0
      const section5 = result.find(s => s.id === 'section5');
      expect(section5?.sortOrder).toBe(0);
      
      // Check if all sortOrders are sequential
      expect(result.map(s => s.sortOrder).sort()).toEqual([0, 1, 2, 3, 4]);
    });

    it('should maintain sequential sort order for all sections', () => {
      const oldIndex = 2; // section3
      const newIndex = 4; // Move to position 4
      const result = moveTo(testSortables, oldIndex, newIndex);
      
      // Check that all sortOrders are unique and sequential
      const sortOrders = result.map(s => s.sortOrder);
      const uniqueSortOrders = [...new Set(sortOrders)];
      
      expect(sortOrders.length).toBe(uniqueSortOrders.length);
      expect(Math.min(...sortOrders)).toBe(0);
      expect(Math.max(...sortOrders)).toBe(sortOrders.length - 1);
    });
  });

  describe('toggleSectionSelected', () => {
    it('should toggle a section from selected to unselected', () => {
      const result = toggleSectionSelected(testNavSections, 'section1', false);
      const section1 = result.find(s => s.id === 'section1');
      
      expect(section1?.selected).toBe(false);
    });

    it('should toggle a section from unselected to selected', () => {
      // Create a test section that's unselected
      const unselectedSections = [
        ...testNavSections,
        { 
          id: 'section6', 
          displayName: 'Section 6', 
          href: '#section6', 
          selected: false, 
          sortable: true, 
          sortOrder: 5,
          required: false
        }
      ];
      
      const result = toggleSectionSelected(unselectedSections, 'section6', true);
      const section6 = result.find(s => s.id === 'section6');
      
      expect(section6?.selected).toBe(true);
    });

    it('should not modify other sections', () => {
      const result = toggleSectionSelected(testNavSections, 'section1', false);
      
      // Check that other sections remain unchanged
      for (let i = 1; i < testNavSections.length; i++) {
        expect(result[i]).toEqual(testNavSections[i]);
      }
    });

    it('should handle non-existent section IDs gracefully', () => {
      const result = toggleSectionSelected(testNavSections, 'nonexistentID', true);
      
      // All sections should remain unchanged
      expect(result).toEqual(testNavSections);
    });
  });
});