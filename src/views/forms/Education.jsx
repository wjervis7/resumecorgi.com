import Input from '../../components/Input.jsx'
import Textbox from '../../components/Textbox.jsx'

function Education({ education }) {
  return (
    <>
      <div className="flex items-center -mt-1">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2" id="education">Education</h2>
      </div>
      <p className="text-slate-800 mb-4 dark:text-gray-200">
        Let's talk about where you went to school, starting with your highest education. 🎓
      </p>
    </>
  )
}

export default Education
