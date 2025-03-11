import Input from '../../components/Input.jsx'
import Textbox from '../../components/Textbox.jsx'

function PersonalInfo({ personalInfo, handleChange }) {
  return (
    <>
      <div class="flex items-center -mt-1 mb-2">
        <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2" id="personalInfo">About You</h2>
      </div>
      <p class="text-slate-800 mb-4 dark:text-gray-200 mb-4 w-2/3">
        Tell us about yourself. Your edits will be visible in the preview panel as you type.
      </p>

      <Input type="text" label="Name" formData={{ id: "name", name: "name", value: personalInfo.name}} handleChange={ (e) => handleChange('personalInfo', 'name', e.target.value) } />
      <Input type="text" label="Contact #1" formData={{ id: "contact0", name: "contact0", value: personalInfo.contact0 }} handleChange={ (e) => handleChange('personalInfo', 'contact0', e.target.value) } />
      <Input type="text" label="Contact #2 (optional)" formData={{ id: "contact1", name: "contact1", value: personalInfo.contact1 }} handleChange={ (e) => handleChange('personalInfo', 'contact1', e.target.value) } />
      <Input type="text" label="Contact #3 (optional)" formData={{ id: "contact2", name: "contact2", value: personalInfo.contact2 }} handleChange={ (e) => handleChange('personalInfo', 'contact2', e.target.value) } />
      <Input type="text" label="Contact #3 (optional)" formData={{ id: "contact3", name: "contact3", value: personalInfo.contact3 }} handleChange={ (e) => handleChange('personalInfo', 'contact3', e.target.value) } />
      <Textbox rows={3} label={"Summary (optional)"} formData={{ id: "summary", name: "summary", value: personalInfo.summary }} handleChange={ (e) => handleChange('personalInfo', 'summary', e.target.value) } />
    </>
  )
}

export default PersonalInfo
