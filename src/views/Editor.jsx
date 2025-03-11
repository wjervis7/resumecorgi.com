import Preview from './Preview.jsx'
import { useState } from 'react'
import Corgi from '../components/Corgi.jsx'
import PersonalInfo from './forms/PersonalInfo.jsx'
import Experience from './forms/Experience.jsx'
import Education from './forms/Education.jsx'
import Card from '../components/Card.jsx'
import Skills from './forms/Skills.jsx'
import Sidebar from './Sidebar.jsx'

function Editor() {
  const initialSections = [
    { id: 'personalInfo', displayName: 'About You', href: '#start', selected: true, originalOrder: 0, sortOrder: 0, required: true, sortable: false },
    { id: 'experience', displayName: 'Experience', href: '#experience', selected: true, originalOrder: 1, sortOrder: 1, required: false, sortable: true },
    { id: 'education', displayName: 'Education', href: '#education', selected: true, originalOrder: 2, sortOrder: 2, required: false, sortable: true },
    { id: 'skills', displayName: 'Skills', href: '#skills', selected: false, originalOrder: 3, sortOrder: 3, required: false, sortable: true },
  ]

  const initialFormData = {
    personalInfo: {
      name: 'James P. Sullivan',
      contact0: 'james.sullivan@monstersinc.com',
      contact1: 'linkedin.com/in/sully-0834673',
      contact2: '',
      contact3: '',
      summary: 'Expert scarer with more than 25 years of experience in terrifying children. Led scare metrics for 15 years.',
    },
    experience: [
      {
        title: '',
        company: '',
        start: '1990',
        end: 'Current',
        accomplishments: '<ul class=\"list-disc list-inside\"><li>Describe your accomplishments and achievements, quantified if possible</li><li><br></li></ul>'
      }
    ],
    education: [
      {
        degree: 'Master of Scaring',
        institution: 'Monsters University',
        year: '1990'
      }
    ],
  };

  const sectionRenderMapping = [
    {
      id: 'personalInfo',
      renderFunc: () =>
        <>
          <Card rightElement={<Corgi size={110} />}>
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
            <Experience experiences={formData.experience} handleChange={handleChange} setFormData={setFormData} />
          </Card>
        </>
    },
    {
      id: 'education', renderFunc: () =>
        <>
          <Card>
            <Education education={formData.education} handleChange={handleChange} />
          </Card>
        </>
    },
    {
      id: 'skills', renderFunc: () =>
        <>
          <Card>
            <Skills />
          </Card>
        </>
    },
  ];

  const [formData, setFormData] = useState(initialFormData);
  const [sections, setSections] = useState(initialSections);
    
  // Handle form changes and trigger debounced update
  const handleChange = (section, field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value
      }
    }));
  };

  const handleSectionSelected = (sectionId, checked) => {
    setSections(prevSections => 
      prevSections.map(section => 
        section.id === sectionId 
          ? { ...section, selected: checked } 
          : section
      )
    );
  };

  const moveUp = (index) => {
    // Get the current sorted order for reference
    const sortedSections = [...sections].sort((a, b) => a.sortOrder - b.sortOrder);
    
    // Get the item to move from the sorted array
    const sortedIndex = sortedSections.findIndex(section => section.id === sections[index].id);
    const item = sortedSections[sortedIndex];
    
    // Cannot move up if it's the first sortable item or not sortable
    if (sortedIndex <= 1 || !item.sortable) return;
    
    // Get the item above it in the sorted array
    const prevItem = sortedSections[sortedIndex - 1];
    
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

  const moveDown = (index) => {
    // Get the current sorted order for reference
    const sortedSections = [...sections].sort((a, b) => a.sortOrder - b.sortOrder);
    
    // Get the item to move from the sorted array
    const sortedIndex = sortedSections.findIndex(section => section.id === sections[index].id);
    const item = sortedSections[sortedIndex];
    
    // Cannot move down if it's the last item or not sortable
    if (sortedIndex >= sortedSections.length - 1 || !item.sortable) return;
    
    // Get the item below it in the sorted array
    const nextItem = sortedSections[sortedIndex + 1];
    
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

  const sortedSections = [...sections].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <>
      <div className="grid grid-cols-12 gap-0 w-full h-screen">
        <div className="
          col-span-2 
          bg-zinc-100 dark:bg-zinc-900
          mt-[62px]">
          <Sidebar sections={sections} handleSectionSelected={handleSectionSelected} handleMoveUp={moveUp} handleMoveDown={moveDown} />
        </div>
        <div className="
            col-span-4
            border-l-1 border-zinc-500 dark:border-zinc-600
            overflow-x-auto mt-[62px]
            [&::-webkit-scrollbar]:w-1.5
            [&::-webkit-scrollbar-track]:bg-zinc-200
            [&::-webkit-scrollbar-thumb]:bg-zinc-400
            dark:[&::-webkit-scrollbar-track]:bg-zinc-800
            dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600">
          <div className="w-full px-5 pt-5 mb-[75vh]" id="start">

            {sortedSections
              .filter(section => section.selected)
              .map(section => (
                <div key={section.id}>
                  { sectionRenderMapping.find(srm => srm.id === section.id).renderFunc() }
                </div>
              ))}

          </div>
        </div>

        <div className="
            col-span-6
            overflow-x-auto mt-[62px]
            p-5
            bg-zinc-600 dark:bg-zinc-800
            border-l-1 border-zinc-700 
            dark:text-white
            [&::-webkit-scrollbar]:w-1.5
            [&::-webkit-scrollbar-track]:bg-zinc-200
            [&::-webkit-scrollbar-thumb]:bg-zinc-400
            dark:[&::-webkit-scrollbar-track]:bg-zinc-800
            dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600">
            <Preview formData={formData} selectedSections={sections} />
            <div 
              className="pt-12 text-center text-sm text-gray-100 dark:text-gray-200">
              Copyright &copy; 2025 Resume Corgi
            </div>
        </div>
      </div>
    </>
  )
}

export default Editor
