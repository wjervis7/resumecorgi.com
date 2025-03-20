import React from 'react';
import Input from '../../components/Input';
import Textbox from '../../components/Textbox';
import { PersonalInfo as PersonalInfoData } from '../../types';

interface PersonalInfoProps {
  personalInfo: PersonalInfoData;
  handleChange: (section: string, field: string, value: string) => void;
}

function PersonalInfo({ personalInfo, handleChange }: PersonalInfoProps) {
  return (
    <>
      <div className="flex items-center -mt-1">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2" id="personalInfo">About You</h2>
      </div>
      <p className="hidden text-slate-800 mb-4 dark:text-gray-200 mb-3 w-2/3">
        Tell us about yourself. Your edits will be visible in the preview panel as you type.
      </p>

      <Input 
        type="text" 
        label="Name" 
        formData={{ id: "name", name: "name", value: personalInfo.name}} 
        handleChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('personalInfo', 'name', e.target.value)} 
      />
      <Input 
        type="text" 
        label="Contact #1" 
        formData={{ id: "contact0", name: "contact0", value: personalInfo.contact0 }} 
        handleChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('personalInfo', 'contact0', e.target.value)} 
      />
      <Input 
        type="text" 
        label="Contact #2 (optional)" 
        formData={{ id: "contact1", name: "contact1", value: personalInfo.contact1 }} 
        handleChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('personalInfo', 'contact1', e.target.value)} 
      />
      <Input 
        type="text" 
        label="Contact #3 (optional)" 
        formData={{ id: "contact2", name: "contact2", value: personalInfo.contact2 }} 
        handleChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('personalInfo', 'contact2', e.target.value)} 
      />
      <Input 
        type="text" 
        label="Contact #4 (optional)" 
        formData={{ id: "contact3", name: "contact3", value: personalInfo.contact3 }} 
        handleChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('personalInfo', 'contact3', e.target.value)} 
      />
      <Input 
        type="text" 
        label="Contact #5 (optional)" 
        formData={{ id: "contact4", name: "contact4", value: personalInfo.contact4 }} 
        handleChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('personalInfo', 'contact4', e.target.value)} 
      />
      <Textbox 
        rows={3} 
        label={"Summary (optional)"} 
        formData={{ id: "summary", name: "summary", value: personalInfo.summary }} 
        handleChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange('personalInfo', 'summary', e.target.value)} 
      />
    </>
  );
}

export default PersonalInfo;