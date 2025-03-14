import Button from '../../components/Button.jsx'
import Input from '../../components/Input.jsx'
import RichTextbox from '../../components/RichTextbox.jsx';

function Education({ education = [], handleChange, setFormData }) {
  
  const addEducation = () => {
    const newEducation = {
      degree: '',
      institution: '',
      location: '',
      graduationDate: '',
      gpa: '',
      accomplishments: ''
    };
    
    setFormData(prevData => ({
      ...prevData,
      education: [...prevData.education, newEducation]
    }));
  };

  const removeEducation = (index) => {
    setFormData(prevData => {
      const updatedEducation = [...prevData.education];
      updatedEducation.splice(index, 1);
      return {
        ...prevData,
        education: updatedEducation
      };
    });
  };

  return (
    <>
      <div className="flex items-center -mt-1 mb-2">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2" id="education">Education</h2>
      </div>
      <p className="hidden text-slate-800 mb-4 dark:text-gray-200 mb-6 w-2/3">
        Let's add your educational background, starting with your most recent degree.
      </p>

      {education.map((edu, index) => (
        <div key={index} className="mb-3">
          {index !== 0 && index !== education.length && (
            <div className="border-t-1 border-gray-400 dark:border-zinc-700 -mx-3 mb-5"></div>
          )}
          <h3 className="text-medium font-bold mb-1.5 text-gray-900 dark:text-gray-200">
            {index === 0 ? 'Most Recent Education' : `Education #${index + 1}`}
            {index > 0 && (
              <>
                <span className="ms-3"></span>
                <Button
                  text="Remove"
                  onClick={() => removeEducation(index)}
                  parentClassName="mb-1"
                  className="text-sm"
                />
              </>
            )}
          </h3>

          <Input 
            type="text" 
            label={`Degree/Certificate #${index + 1}`} 
            formData={{ 
              id: `degree${index}`, 
              name: `degree${index}`, 
              value: edu.degree
            }} 
            handleChange={(e) => {
              const updatedEducation = { ...edu, degree: e.target.value };
              const updatedEducations = [...education];
              updatedEducations[index] = updatedEducation;
              
              setFormData(prevData => ({
                ...prevData,
                education: updatedEducations
              }));
            }} 
          />

          <Input 
            type="text" 
            label={`Institution #${index + 1}`} 
            formData={{ 
              id: `institution${index}`, 
              name: `institution${index}`, 
              value: edu.institution
            }} 
            handleChange={(e) => {
              const updatedEducation = { ...edu, institution: e.target.value };
              const updatedEducations = [...education];
              updatedEducations[index] = updatedEducation;
              
              setFormData(prevData => ({
                ...prevData,
                education: updatedEducations
              }));
            }} 
          />

          <Input 
            type="text" 
            label={`Location #${index + 1} (optional)`} 
            formData={{ 
              id: `institutionLocation${index}`, 
              name: `institutionLocation${index}`, 
              value: edu.location
            }} 
            handleChange={(e) => {
              const updatedEducation = { ...edu, location: e.target.value };
              const updatedEducations = [...education];
              updatedEducations[index] = updatedEducation;
              
              setFormData(prevData => ({
                ...prevData,
                education: updatedEducations
              }));
            }} 
          />
          
          <Input 
            type="text" 
            label="Graduation Year/Month (optional)" 
            formData={{ 
              id: `graduationDate${index}`, 
              name: `graduationDate${index}`, 
              value: edu.graduationDate 
            }} 
            handleChange={(e) => {
              const updatedEducation = { ...edu, graduationDate: e.target.value };
              const updatedEducations = [...education];
              updatedEducations[index] = updatedEducation;
              
              setFormData(prevData => ({
                ...prevData,
                education: updatedEducations
              }));
            }} 
          />
          
          <Input 
            type="text" 
            label="GPA (optional)" 
            formData={{ 
              id: `gpa${index}`, 
              name: `gpa${index}`, 
              value: edu.gpa
            }} 
            handleChange={(e) => {
              const updatedEducation = { ...edu, gpa: e.target.value };
              const updatedEducations = [...education];
              updatedEducations[index] = updatedEducation;
              
              setFormData(prevData => ({
                ...prevData,
                education: updatedEducations
              }));
            }} 
          />
          
          <span className="block text-sm text-gray-800 dark:text-gray-300 mb-1">
            Accomplishments at Institution #{index + 1} (optional)
          </span>

          <RichTextbox
             content={edu.accomplishments || ''}
             onInput={(e) => {
              const updatedEducation = { ...edu, accomplishments: e.currentTarget.innerHTML };
              const updatedEducations = [...education];
              updatedEducations[index] = updatedEducation;
              
              setFormData(prevData => ({
                ...prevData,
                education: updatedEducations
              }));
            }} />
        </div>
      ))}

      <Button
        text="Add Another Education"
        theme="interaction"
        className="text-sm"
        onClick={addEducation} />
    </>
  )
}

export default Education