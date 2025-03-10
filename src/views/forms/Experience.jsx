import Button from '../../components/Button.jsx'
import Input from '../../components/Input.jsx'
import Textbox from '../../components/Textbox.jsx'

function Experience({ experience }) {
  return (
    <>
      <div class="flex items-center -mt-1 mb-2">
        <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2" id="experience">Experience</h2>
      </div>
      <p class="text-slate-800 mb-4 dark:text-gray-200 mb-6 w-2/3">
        Let's jot down where you went to work, starting with your most recent organization.
      </p>

      <Input type="text" label="Name of Company #1" formData={{ id: "companyName0", name: "companyName0", value: experience.companyName}} handleChange={ (e) => handleChange('experience[0]', 'companyName', e.target.value) } />
      <Input type="text" label="Position Title at Company #1" formData={{ id: "title0", name: "title0", value: experience.title}} handleChange={ (e) => handleChange('experience[0]', 'title', e.target.value) } />
      <Input type="text" label="Start Date (Examples: February 2022, Feb. 2022, or 2022" formData={{ id: "startDate0", name: "startDate0", value: experience.startDate }} handleChange={ (e) => handleChange('experience[0]', 'startDate', e.target.value) } />
      <Input type="text" label="End Date (optional)" formData={{ id: "endDate0", name: "endDate0", value: experience.endDate}} handleChange={ (e) => handleChange('experience[0]', 'endDate', e.target.value) } />
      <span className="block text-sm text-gray-800 dark:text-gray-300 mb-1">Accomplishments at Company #1</span>
      <section
        className="relative w-full px-3 py-3 text-sm text-black dark:text-white 
          bg-slate-50 dark:bg-slate-800 
          border-1 border-black dark:border-gray-200 rounded-lg
          hover:border-lime-500 dark:hover:border-lime-400
          hover:bg-lime-50 dark:hover:bg-lime-950
          focus:outline-lime-500 focus:outline-3 focus:border-lime-500 focus:ring-lime-500 dark:focus:border-lime-300 dark:focus:border-transparent
          focus:bg-lime-50 dark:focus:bg-lime-950"
        contentEditable>
        <ul class="list-disc list-inside">
          <li>Describe your accomplishments and achievements, quantified if possible</li>
        </ul>
      </section>

      <div className="mb-5"></div>

      <Button
        text="Add Another Company"
        theme="interaction"
        onClick={() => onNextChosen('education') } />
      
      <div className="mb-12"></div>
    </>
  )
}

export default Experience
