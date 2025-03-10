import Button from '../components/Button.jsx'
import Preview from './Preview.jsx'
import { useState, useEffect, useCallback } from 'react'
import Corgi from '../components/Corgi.jsx'
import PersonalInfo from './forms/PersonalInfo.jsx'
import ChooseNext from './forms/ChooseNext.jsx'
import Experience from './forms/Experience.jsx'
import Education from './forms/Education.jsx'
import Card from '../components/Card.jsx'
import Skills from './forms/Skills.jsx'
import CheckboxButton from '../components/CheckboxButton.jsx'
import Sidebar from './Sidebar.jsx'

function Editor({onStartOver}) {
  const initialSections = [
    { id: 'personalInfo', displayName: 'About You', href: 'start', selected: true, originalOrder: 0, sortOrder: 0, required: true },
    { id: 'experience', displayName: 'Experience', href: 'experience', selected: true, originalOrder: 1, sortOrder: 1, required: false },
    { id: 'education', displayName: 'Education', href: 'education', selected: true, originalOrder: 2, sortOrder: 2, required: false },
    { id: 'skills', displayName: 'Skills', href: 'skills', selected: false, originalOrder: 3, sortOrder: 3, required: false },
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

  const [currentForm, setCurrentForm] = useState('personalInfo');
  const [formData, setFormData] = useState(initialFormData);
  const [updateKey, setUpdateKey] = useState(0);
  const [sections, setSections] = useState(initialSections);
  const [selectedSections, setSelectedSections] = useState([]);

  const handleFormUpdate = useCallback(() => {
    // Increment update key to trigger Preview re-render
    setUpdateKey(prev => prev + 1);
  }, []);
    
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

  const handleArrayChange = (section, value) => {
    setFormData(prevData => ({
      ...prevData,
      [section]: value
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

  const handleSectionChecked = (checked, value) => {
    console.log('click', checked, value, selectedSections)
    setSelectedSections(prev => 
      checked ? [...prev, value] : prev.filter(item => item !== value)
    );
  };

  const onChooseNext = () => {
    setCurrentForm('chooseNext');
  }

  const onNextChosen = (newSection) => {
    setSections(prevData => ({
      ...prevData,
      newSection
    }));
    setCurrentForm(newSection);
  }

  // Debounce the update - only triggers after 500ms of no changes
  useEffect(() => {
    const timer = setTimeout(() => {
      handleFormUpdate();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [formData, handleFormUpdate]);

  return (
    <>
      <div className="grid grid-cols-12 gap-0 w-full h-screen">
        <div className="
          col-span-2 
          bg-zinc-100 dark:bg-zinc-900
          mt-[62px]">
          <Sidebar sections={sections} handleSectionSelected={handleSectionSelected} />
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
          <div class="w-full px-5 pt-5 mb-[75vh]">
            {/* <Card rightElement={<Corgi size={110} />}>
            <div class="flex items-center -mt-1 mb-2">
              <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2" id="start">Let's Get Started!</h2>
            </div>
            <p class="text-zinc-800 mb-4.5 dark:text-gray-200 w-3/4">
              Which sections do you want to include in your resume? These are optional, and you can change your selections at any time.
            </p>

            {sections.map(section => (
              !section.required && (
                <>
                  <CheckboxButton text={section.displayName} value={section.id} isChecked={section.selected} onChange={(checked) => handleSectionSelected(section.id, checked)} /><span className="ms-1.5"></span>
                </>)
            ))}
              
            </Card> */}

            <Card rightElement={<Corgi size={110} />}>
              <PersonalInfo personalInfo={formData.personalInfo} handleChange={handleChange} />
              <div className="-mb-1.5"></div>
            </Card>

            {sections.find(s => s.id === 'experience').selected &&
              <Card>
                <Experience experiences={formData.experience} handleChange={handleChange} setFormData={setFormData} />
              </Card>
            }

            {/* {sections.find(s => s.id === 'education').selected &&
              <Card>
                <Education education={formData.education} handleChange={handleChange} />
              </Card>
            }

            {sections.find(s => s.id === 'skills').selected &&
              <Card>
                <Skills />
              </Card>
            } */}

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
