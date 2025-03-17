import React from 'react';
import Button from '../../components/Button.js'
import Input from '../../components/Input.js'
import RichTextbox from '../../components/RichTextbox.js';

import { FormData, Experience as ExperienceInfo } from '../../types';
import Separator from '../../components/Separator.js';

interface ExperienceProps {
  experiences?: ExperienceInfo[];
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

function Experience({ experiences = [], setFormData }: ExperienceProps) {
  
  const addExperience = () => {
    const newExperience = {
      title: '',
      company: '',
      start: '',
      end: '',
      accomplishments: ''
    };

    setFormData(prevData => ({
      ...prevData,
      experience: [...prevData.experience, newExperience]
    }));
  };

  const removeExperience = (index: number): void => {
    setFormData(prevData => {
      const updatedExperiences = [...prevData.experience];
      updatedExperiences.splice(index, 1);
      return {
        ...prevData,
        experience: updatedExperiences
      };
    });
  };

  return (
    <>
      <div className="flex items-center -mt-1 mb-2">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2" id="experience">Experience</h2>
      </div>
      <p className="hidden text-slate-800 mb-4 dark:text-gray-200 mb-6 w-2/3">
        Let's jot down where you went to work, starting with your most recent organization.
      </p>

      {experiences.map((experience, index) => (
        <div key={index} className="mb-3">
          {index !== 0 && index !== experiences.length && (
            <Separator />
          )}
          <h3 className="text-medium font-bold mb-1.5 text-gray-900 dark:text-gray-200">
            {index === 0 ? 'Most Recent Position' : `Position #${index + 1}`}
            {index > 0 && (
              <>
                <span className="ms-3"></span>
                <Button
                  text="Remove"
                  theme="danger"
                  onClick={() => removeExperience(index)}
                  parentClassName="mb-1"
                  className="text-sm"
                />
              </>
            )}
          </h3>

          <Input 
            type="text" 
            label={`Position Title at Company #${index + 1}`} 
            formData={{ 
              id: `title${index}`, 
              name: `title${index}`, 
              value: experience.title
            }} 
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const updatedExperience = { ...experience, title: e.target.value };
              const updatedExperiences = [...experiences];
              updatedExperiences[index] = updatedExperience;
              
              setFormData(prevData => ({
                ...prevData,
                experience: updatedExperiences
              }));
            }} 
          />

          <Input 
            type="text" 
            label={`Name of Company #${index + 1}`} 
            formData={{ 
              id: `company${index}`, 
              name: `company${index}`, 
              value: experience.company
            }} 
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const updatedExperience = { ...experience, company: e.target.value };
              const updatedExperiences = [...experiences];
              updatedExperiences[index] = updatedExperience;
              
              setFormData(prevData => ({
                ...prevData,
                experience: updatedExperiences
              }));
            }} 
          />
          
          <Input 
            type="text" 
            label="Start Date (Examples: February 2022, Feb. 2022, or 2022)" 
            formData={{ 
              id: `start${index}`, 
              name: `start${index}`, 
              value: experience.start 
            }} 
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const updatedExperience = { ...experience, start: e.target.value };
              const updatedExperiences = [...experiences];
              updatedExperiences[index] = updatedExperience;
              
              setFormData(prevData => ({
                ...prevData,
                experience: updatedExperiences
              }));
            }} 
          />
          
          <Input 
            type="text" 
            label="End Date (optional)" 
            formData={{ 
              id: `end${index}`, 
              name: `end${index}`, 
              value: experience.end
            }} 
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const updatedExperience = { ...experience, end: e.target.value };
              const updatedExperiences = [...experiences];
              updatedExperiences[index] = updatedExperience;
              
              setFormData(prevData => ({
                ...prevData,
                experience: updatedExperiences
              }));
            }} 
          />
          
          <span className="block text-sm text-gray-800 dark:text-gray-300 mb-1">
            Accomplishments at Company #{index + 1}
          </span>

          <RichTextbox
             content={experience.accomplishments}
             onInput={(e: React.FormEvent<HTMLElement>) => {
              const updatedExperience = { ...experience, accomplishments: e.currentTarget.innerHTML };
              const updatedExperiences = [...experiences];
              updatedExperiences[index] = updatedExperience;
              
              setFormData(prevData => ({
                ...prevData,
                experience: updatedExperiences
              }));
            }} />
        </div>
      ))}

      <Button
        text="Add Another Company"
        theme="success"
        className="text-sm"
        onClick={addExperience} />
    </>
  )
}

export default Experience