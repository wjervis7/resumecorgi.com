import Input from '../../components/Input.jsx'
import Textbox from '../../components/Textbox.jsx'

function Skills({ skills }) {
  return (
    <>
      <div class="flex items-center -mt-1">
        <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Skills</h2>
      </div>
      <p class="text-slate-800 mb-4 dark:text-gray-200">
        What skills have you learned? Input set(s) of categories and their associated skills.
      </p>
    </>
  )
}

export default Skills
