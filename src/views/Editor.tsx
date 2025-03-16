import { JSX, useState, useEffect, useRef } from 'react';
import Preview from './Preview';
import PersonalInfo from './forms/PersonalInfo';
import Experience from './forms/Experience';
import Education from './forms/Education';
import Card from '../components/Card';
import Skills from './forms/Skills';
import Sidebar from './Sidebar';
import Button from '../components/Button';
import Footer from '../components/Footer';
import ScrollSpy from '../components/ScrollSpy';
import { FormData, Section } from '../types';
import { loadFromStorage, saveToStorage, clearStorage } from '../lib/StorageService';
import { moveUp, moveDown, moveTo, toggleSectionSelected } from '../lib/SortService';

interface SectionRenderItem {
  id: string;
  title: string;
  renderFunc: () => JSX.Element;
}

function Editor() {
  const [currentMobileView, setCurrentMobileView] = useState<string>('form');
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const formContainerRef = useRef<HTMLDivElement | null>(null);
  
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
      title: 'About You',
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
      title: 'Experience',
      renderFunc: () =>
        <>
          <Card>
            <Experience experiences={formData.experience} setFormData={setFormData} />
          </Card>
        </>
    },
    {
      id: 'education', 
      title: 'Education',
      renderFunc: () =>
        <>
          <Card>
            <Education education={formData.education} setFormData={setFormData} />
          </Card>
        </>
    },
    {
      id: 'skills', 
      title: 'Skills',
      renderFunc: () =>
        <>
          <Card>
            <Skills skills={formData.skills} setFormData={setFormData} />
          </Card>
        </>
    },
  ];

  // Create a mapping of section IDs to their titles
  const sectionTitles: Record<string, string> = sectionRenderMapping.reduce((acc, item) => {
    acc[item.id] = item.title;
    return acc;
  }, {} as Record<string, string>);

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
    setSections(prevSections => toggleSectionSelected(prevSections, sectionId, checked) as Section[]);
  };

  const handleMoveUp = (index: number): void => {
    setSections(prevSections => moveUp(prevSections, index) as Section[]);
  };

  const handleMoveDown = (index: number): void => {
    setSections(prevSections => moveDown(prevSections, index) as Section[]);
  };

  const handleMoveTo = (oldIndex: number, newIndex: number): void => {
    setSections(prevSections => moveTo(prevSections, oldIndex, newIndex) as Section[]);
  };

  // clear localStorage data and reset to defaults
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
          mt-[72px] md:mt-[76px]`}>
          <div className="px-3 pt-3">
            <Sidebar 
              sections={sortedSections} 
              handleSectionSelected={handleSectionSelected} 
              handleMoveUp={handleMoveUp} 
              handleMoveDown={handleMoveDown} 
              handleMoveTo={handleMoveTo} 
            />
            
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
        <div 
          ref={formContainerRef}
          className={`
            ${currentMobileView !== 'form' ? "hidden" : ""} md:block
            bg-gray-50 dark:bg-zinc-950
            col-span-12 md:col-span-4
            border-0 md:border-l-1 md:border-zinc-500 dark:border-zinc-600
            overflow-y-auto mt-[72px] md:mt-[76px]
            [&::-webkit-scrollbar]:w-1.5
            [&::-webkit-scrollbar-track]:bg-zinc-300
            [&::-webkit-scrollbar-thumb]:bg-zinc-400
            dark:[&::-webkit-scrollbar-track]:bg-zinc-800
            dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600`}>
          <div className="w-full mb-[75vh]" id="start">
            <ScrollSpy
              sections={sortedSections}
              sectionTitles={sectionTitles}
              containerRef={formContainerRef}
              sectionRefs={sectionRefs}
            />

            <div className="mt-[0.285rem] px-3">
              {sortedSections
                .filter(section => section.selected)
                .map(section => (
                  <div 
                    key={section.id}
                    ref={(el: HTMLDivElement | null) => { sectionRefs.current[section.id] = el; }}
                    id={`section-${section.id}`}
                  >
                    {sectionRenderMapping.find(srm => srm.id === section.id)?.renderFunc()}
                  </div>
                ))}
            </div>

          </div>
        </div>

        <div className={`
            ${currentMobileView !== 'preview' ? "hidden md:block" : ""}
            md:col-span-6 col-span-12
            overflow-x-none overflow-y-scroll mt-[72px] md:mt-[76px]
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