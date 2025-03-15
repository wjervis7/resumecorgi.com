import { JSX, useState, useEffect } from 'react';
import Preview from './Preview';
import PersonalInfo from './forms/PersonalInfo';
import Experience from './forms/Experience';
import Education from './forms/Education';
import Card from '../components/Card';
import Skills from './forms/Skills';
import Sidebar from './Sidebar';
import Button from '../components/Button';
import Footer from '../components/Footer';
import { FormData, Section } from '../types';
import { loadFromStorage, saveToStorage, clearStorage } from '../lib/StorageService';

interface SectionRenderItem {
  id: string;
  renderFunc: () => JSX.Element;
}

function Editor() {
  const [currentMobileView, setCurrentMobileView] = useState<string>('form');
  
  // Load data from localStorage or use initial data
  const { formData: savedFormData, sections: savedSections } = loadFromStorage();
  
  const [formData, setFormData] = useState<FormData>(savedFormData);
  const [sections, setSections] = useState<Section[]>(savedSections);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    saveToStorage({ formData, sections });
  }, [formData, sections]);

  // Handle beforeunload event to remind users their data is saved
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // No need to show a warning since data is saved
      // e.preventDefault();
      // e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const sectionRenderMapping: SectionRenderItem[] = [
    {
      id: 'personalInfo',
      renderFunc: () =>
        <>
          <Card>
            <PersonalInfo personalInfo={formData.personalInfo} handleChange={handleChange} />
            <div className="-mb-1.5"></div>
          </Card>
        </>
    },
    {
      id: 'experience',
      renderFunc: () =>
        <>
          <Card>
            <Experience experiences={formData.experience} setFormData={setFormData} />
          </Card>
        </>
    },
    {
      id: 'education', 
      renderFunc: () =>
        <>
          <Card>
            <Education education={formData.education} setFormData={setFormData} />
          </Card>
        </>
    },
    {
      id: 'skills', 
      renderFunc: () =>
        <>
          <Card>
            <Skills skills={formData.skills} setFormData={setFormData} />
          </Card>
        </>
    },
  ];

  const handleChange = (section: string, field: string, value: string): void => {
    setFormData(prevData => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value
      }
    }));
  };

  const handleSectionSelected = (sectionId: string, checked: boolean): void => {
    setSections(prevSections =>
      prevSections.map(section =>
        section.id === sectionId
          ? { ...section, selected: checked }
          : section
      )
    );
  };

  const moveUp = (index: number): void => {
    // Get the current sorted order for reference
    const sortedSections = [...sections].sort((a, b) => a.sortOrder - b.sortOrder);

    // Find the section in the sortedSections array by id
    const sectionId = sections[index].id;
    const sortedIndex = sortedSections.findIndex(section => section.id === sectionId);
    const item = sortedSections[sortedIndex];

    // Cannot move if it's not sortable
    if (!item.sortable) return;

    // Find the previous sortable item (if any)
    let prevSortableIndex = -1;
    for (let i = sortedIndex - 1; i >= 0; i--) {
      if (sortedSections[i].sortable) {
        prevSortableIndex = i;
        break;
      }
    }

    // If no previous sortable item, we can't move up
    if (prevSortableIndex === -1) return;

    const prevItem = sortedSections[prevSortableIndex];

    // Update sections with swapped sortOrders
    setSections(sections.map(section => {
      if (section.id === item.id) {
        return { ...section, sortOrder: prevItem.sortOrder };
      }
      if (section.id === prevItem.id) {
        return { ...section, sortOrder: item.sortOrder };
      }
      return section;
    }));
  };

  const moveDown = (index: number): void => {
    // Get the current sorted order for reference
    const sortedSections = [...sections].sort((a, b) => a.sortOrder - b.sortOrder);

    // Find the section in the sortedSections array by id
    const sectionId = sections[index].id;
    const sortedIndex = sortedSections.findIndex(section => section.id === sectionId);
    const item = sortedSections[sortedIndex];

    // Cannot move if it's not sortable
    if (!item.sortable) return;

    // Find the next sortable item (if any)
    let nextSortableIndex = -1;
    for (let i = sortedIndex + 1; i < sortedSections.length; i++) {
      if (sortedSections[i].sortable) {
        nextSortableIndex = i;
        break;
      }
    }

    // If no next sortable item, we can't move down
    if (nextSortableIndex === -1) return;

    const nextItem = sortedSections[nextSortableIndex];

    // Update sections with swapped sortOrders
    setSections(sections.map(section => {
      if (section.id === item.id) {
        return { ...section, sortOrder: nextItem.sortOrder };
      }
      if (section.id === nextItem.id) {
        return { ...section, sortOrder: item.sortOrder };
      }
      return section;
    }));
  };

  const moveTo = (oldIndex: number, newIndex: number): void => {
    // Create a copy of sorted sections
    const sortedSections = [...sections].sort((a, b) => a.sortOrder - b.sortOrder);

    // Get items by actual array indices (not sort values)
    const itemToMove = sortedSections[oldIndex];

    // Remove the item from its position
    sortedSections.splice(oldIndex, 1);

    // Insert the item at the new position
    sortedSections.splice(newIndex, 0, itemToMove);

    // Reassign all sortOrder values sequentially (0, 1, 2, 3, ...)
    const updatedSections = sortedSections.map((section, index) => ({
      ...section,
      sortOrder: index
    }));

    // Set the new state
    setSections(updatedSections);
  };

  // Create reset function to clear localStorage data and reset to defaults
  const resetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset all your data? This cannot be undone.')) {
      const { formData: initialFormData, sections: initialSections } = clearStorage();
      setFormData(initialFormData);
      setSections(initialSections);
    }
  };

  const sortedSections = [...sections].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <>
      <div className="grid md:grid-cols-12 grid-cols-12 gap-0 w-full h-screen">
        <div className={`
          ${currentMobileView !== 'sections' ? "hidden" : ""} md:block
          relative
          col-span-12 md:col-span-2
          h-screen md:h-auto
          bg-gray-50 dark:bg-zinc-950
          mt-[74px]`}>
          <div className="px-3 pt-3">
            <Sidebar sections={sortedSections} handleSectionSelected={handleSectionSelected} handleMoveUp={moveUp} handleMoveDown={moveDown} handleMoveTo={moveTo} />
            
            {/* Reset Button */}
            <div className="mt-4 mb-2">
              <Button
                theme="primary"
                text="Reset to Default"
                className="w-full"
                onClick={resetToDefaults}
              />
            </div>
          </div>

          <Footer />
        </div>
        <div className={`
            ${currentMobileView !== 'form' ? "hidden" : ""} md:block
            bg-gray-50 dark:bg-zinc-950
            col-span-12 md:col-span-4
            border-0 md:border-l-1 md:border-zinc-500 dark:border-zinc-600
            overflow-x-auto mt-[74px]
            [&::-webkit-scrollbar]:w-1.5
            [&::-webkit-scrollbar-track]:bg-zinc-300
            [&::-webkit-scrollbar-thumb]:bg-zinc-400
            dark:[&::-webkit-scrollbar-track]:bg-zinc-800
            dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600`}>
          <div className="w-full px-3 pt-3 mb-[75vh]" id="start">

            {sortedSections
              .filter(section => section.selected)
              .map(section => (
                <div key={section.id}>
                  {sectionRenderMapping.find(srm => srm.id === section.id)?.renderFunc()}
                </div>
              ))}

          </div>
        </div>

        <div className={`
            ${currentMobileView !== 'preview' ? "hidden md:block" : ""}
            md:col-span-6 col-span-12
            overflow-x-none overflow-y-scroll mt-[74px]
            ps-3 pe-2 pt-0 pb-3
            bg-zinc-600 dark:bg-zinc-800
            border-l-1 border-zinc-700 
            dark:text-white
            [&::-webkit-scrollbar]:w-1.5
            [&::-webkit-scrollbar-track]:bg-zinc-600
            [&::-webkit-scrollbar-thumb]:bg-zinc-400
            dark:[&::-webkit-scrollbar-track]:bg-zinc-800
            dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600`}>
          <Preview formData={formData} selectedSections={sections} />
        </div>
      </div>
      <div className={`
        fixed
        text-gray-900 dark:text-gray-100
        bg-white dark:bg-zinc-950
        bottom-0 left-0 right-0 
        md:hidden
        px-2 pt-3 pb-3.5
        flex justify-between space-1
        border-t-1 border-gray-900 dark:border-zinc-600`}>
        <div className="flex-1 pe-2">
          <Button
            theme={currentMobileView === 'sections' ? 'primary' : 'default'}
            text="Sections"
            className="w-full"
            parentClassName="w-full"
            onClick={() => setCurrentMobileView('sections')} />
        </div>
        <div className="flex-1 pe-2">
          <Button
            theme={currentMobileView === 'form' ? 'primary' : 'default'}
            text="Form"
            className="w-full"
            parentClassName="w-full"
            onClick={() => setCurrentMobileView('form')} />
        </div>
        <div className="flex-1">
          <Button
            theme={currentMobileView === 'preview' ? 'primary' : 'default'}
            text="Preview"
            className="w-full"
            parentClassName="w-full"
            onClick={() => setCurrentMobileView('preview')} />
        </div>
      </div>
    </>
  );
}

export default Editor;