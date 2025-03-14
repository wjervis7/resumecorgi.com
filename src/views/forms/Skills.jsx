import Button from '../../components/Button.jsx'
import Input from '../../components/Input.jsx'

function Skills({ skills = [], handleChange, setFormData }) {
  
  const addSkillCategory = () => {
    const newSkillCategory = {
      category: '',
      skillList: []
    };
    
    setFormData(prevData => ({
      ...prevData,
      skills: [...prevData.skills, newSkillCategory]
    }));
  };

  const removeSkillCategory = (index) => {
    setFormData(prevData => {
      const updatedSkills = [...prevData.skills];
      updatedSkills.splice(index, 1);
      return {
        ...prevData,
        skills: updatedSkills
      };
    });
  };

  const updateSkillCategory = (index, value) => {
    setFormData(prevData => {
      const updatedSkills = [...prevData.skills];
      updatedSkills[index].category = value;
      return {
        ...prevData,
        skills: updatedSkills
      };
    });
  };

  const updateSkills = (categoryIndex, value) => {
    setFormData(prevData => {
      const updatedSkills = [...prevData.skills];
      updatedSkills[categoryIndex].skillList = value;
      return {
        ...prevData,
        skills: updatedSkills
      };
    });
  };

  return (
    <>
      <div className="flex items-center -mt-1 mb-2">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2" id="skills">Skills</h2>
      </div>
      <p className="hidden text-slate-800 mb-4 dark:text-gray-200 mb-6 w-2/3">
        Add skills organized by category to highlight your expertise.
      </p>

      {skills.map((skillCategory, categoryIndex) => (
        <div key={categoryIndex} className="mb-4">
          {categoryIndex !== 0 && categoryIndex !== skills.length && (
            <div className="border-t-1 border-gray-400 dark:border-zinc-700 -mx-3 mb-5"></div>
          )}
          
          <div className="flex items-center mb-2">
            <h3 className="text-medium font-bold mb-1.5 text-gray-900 dark:text-gray-200">
              {`Skill Category #${categoryIndex + 1}`}
            </h3>
            {categoryIndex > 0 && (
              <>
                <span className="ms-3"></span>
                <Button
                  text="Remove Category"
                  onClick={() => removeSkillCategory(categoryIndex)}
                  parentClassName="mb-1 ml-2"
                  className="text-sm"
                />
              </>
            )}
          </div>

          <Input 
            type="text" 
            label={`Category Name`} 
            formData={{ 
              id: `category${categoryIndex}`, 
              name: `category${categoryIndex}`, 
              value: skillCategory.category
            }} 
            handleChange={(e) => updateSkillCategory(categoryIndex, e.target.value)} 
          />
          
          <Input 
            type="text" 
            label={`Skills (comma-separated)`} 
            formData={{ 
              id: `skills${categoryIndex}`, 
              name: `skills${categoryIndex}`, 
              value: skillCategory.skillList
            }} 
            handleChange={(e) => updateSkills(categoryIndex, e.target.value)}
            placeholder="Example: JavaScript, React, Node.js" 
          />
        </div>
      ))}

      <Button
        text="Add Another Skill Category"
        theme="interaction"
        className="text-sm"
        onClick={addSkillCategory} 
      />
    </>
  )
}

export default Skills