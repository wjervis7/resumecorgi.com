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

function Editor({onStartOver}) {
  const initialSections = [
    'personalInfo'
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
        accomplishments: ''
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
      <div className="grid grid-cols-5 gap-0 w-full h-screen">
        <div className="
            col-span-2
            overflow-x-auto mt-[55px]
            [&::-webkit-scrollbar]:w-1.5
            [&::-webkit-scrollbar-track]:bg-zinc-200
            [&::-webkit-scrollbar-thumb]:bg-zinc-400
            dark:[&::-webkit-scrollbar-track]:bg-zinc-800
            dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600">
          <div class="w-full px-5 pt-5 mb-25">
            <Card rightElement={<Corgi size={100} />}>
            <div class="flex items-center -mt-1 mb-2">
              <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Let's Get Started!</h2>
            </div>
            <p class="text-slate-800 mb-4.5 dark:text-gray-200 w-3/4">
              Which sections do you want to include in your resume? These are optional, and you can change your selections at any time.
            </p>
              <Button text="Experience" /><span className="ms-1"></span>
              <Button text="Education" /><span className="ms-1"></span>
              <Button text="Skills" />
            </Card>

            <Card>
              <PersonalInfo personalInfo={formData.personalInfo} handleChange={handleChange} />
              <div className="-mb-1.5"></div>
            </Card>

            <Card>
              <Experience experience={formData.experience} handleChange={handleChange} />
            </Card>

            <Card>
              <Education education={formData.education} handleChange={handleChange} />
            </Card>

            <Card>
              <Skills />
            </Card>

          </div>
        </div>

        <div className="
            col-span-3
            overflow-x-auto mt-[55px]
            p-5
            bg-zinc-500 dark:bg-gray-900
            border-l-1 border-slate-700 
            dark:text-white
            [&::-webkit-scrollbar]:w-1.5
            [&::-webkit-scrollbar-track]:bg-zinc-200
            [&::-webkit-scrollbar-thumb]:bg-zinc-400
            dark:[&::-webkit-scrollbar-track]:bg-zinc-800
            dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600">
            <Preview formData={formData} updateKey={updateKey} />
        </div>
      </div>


      <div className="grid grid-cols-5 gap-7 w-full h-screen" style={{display: 'none'}}>
        <div className="ps-6 mt-6 col-span-2">
          <div class="w-full">
            <div class="flex flex-co w-full mb-6 xs:flex-row">
              <div class="w-full sm:mb-0">
                <div class="relative h-full ml-0 mr-0">
                  <span class="absolute top-0 left-0 w-full h-full mt-1 bg-black dark:bg-gray-200 rounded-xl"></span>
                  <div class="relative h-full p-5 bg-white dark:bg-slate-900 border-1 border-black dark:border-gray-200 rounded-xl px-5 py-7">

                    {currentForm === 'personalInfo' && 
                      <PersonalInfo personalInfo={formData.personalInfo} handleChange={handleChange} />
                    }

                    {currentForm === 'chooseNext' && 
                      <ChooseNext onNextChosen={onNextChosen} />
                    }

                    {currentForm === 'experience' &&
                      <Experience experience={formData.experience} handleChange={handleChange} />
                    }

                    {currentForm === 'education' &&
                      <Education education={formData.education} handleChange={handleChange} />
                    }

                    {/* <div className="mb-5"></div>

                    {currentForm !== 'chooseNext' &&
                      <>
                        <Button text="Continue" onClick={onChooseNext} />
                        <span className="ms-3"></span>
                      </>
                    }
                    <Button text="I'm done!" className="dark:bg-slate-900 bg-slate-100" onClick={onStartOver} />
                    <span className="ms-3"></span>
                    <Button text="Start over" className="dark:bg-slate-900 bg-slate-100" onClick={onStartOver} /> */}
                  </div>
                  <div className="absolute right-8 top-6">
                    <Corgi size={100} />
                  </div>
                </div>
              </div>
              {/* <Button text="Add Experience" onClick={onStartOver} /> */}
            </div>

            <div class="flex flex-co w-full mb-6 xs:flex-row">
              <Button text="Add Experience" onClick={onStartOver} />
              <span className="ms-1"></span>
              <Button text="Add Education" onClick={onStartOver} />
              <span className="ms-1"></span>
              <Button text="Add Skills" onClick={onStartOver} />
            </div>

            <div class="flex flex-co w-full mb-10 xs:flex-row">
              <div class="w-full sm:mb-0">
                <div class="relative h-full ml-0 mr-0">
                  <span class="absolute top-0 left-0 w-full h-full mt-1 bg-black dark:bg-gray-200 rounded-xl"></span>
                  <div class="relative h-full p-5 bg-white dark:bg-slate-900 border-1 border-black dark:border-gray-200 rounded-xl px-5 py-7">

                    {currentForm === 'personalInfo' && 
                      <PersonalInfo personalInfo={formData.personalInfo} handleChange={handleChange} />
                    }

                    {currentForm === 'chooseNext' && 
                      <ChooseNext onNextChosen={onNextChosen} />
                    }

                    {currentForm === 'experience' &&
                      <Experience experience={formData.experience} handleChange={handleChange} />
                    }

                    {currentForm === 'education' &&
                      <Education education={formData.education} handleChange={handleChange} />
                    }

                    {/* <div className="mb-5"></div>

                    {currentForm !== 'chooseNext' &&
                      <>
                        <Button text="Continue" onClick={onChooseNext} />
                        <span className="ms-3"></span>
                      </>
                    }
                    <Button text="I'm done!" className="dark:bg-slate-900 bg-slate-100" onClick={onStartOver} />
                    <span className="ms-3"></span>
                    <Button text="Start over" className="dark:bg-slate-900 bg-slate-100" onClick={onStartOver} /> */}
                  </div>
                  <div className="absolute right-8 top-6">
                    <Corgi size={100} />
                  </div>
                </div>
              </div>
              {/* <Button text="Add Experience" onClick={onStartOver} /> */}
            </div>
          </div>
        </div>
        <div className="col-span-3 bg-zinc-500 dark:bg-gray-950 border-l-1 border-slate-700 dark:text-white p-4">
          <Preview formData={formData} updateKey={updateKey} />
        </div>
      </div>
    </>
  )
}

export default Editor
