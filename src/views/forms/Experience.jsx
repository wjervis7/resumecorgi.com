// import Button from '../../components/Button.jsx'
// import Input from '../../components/Input.jsx'

// function Experience({ experience }) {
//   return (
//     <>
//       <div class="flex items-center -mt-1 mb-2">
//         <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2" id="experience">Experience</h2>
//       </div>
//       <p class="text-slate-800 mb-4 dark:text-gray-200 mb-6 w-2/3">
//         Let's jot down where you went to work, starting with your most recent organization.
//       </p>

//       <Input type="text" label="Name of Company #1" formData={{ id: "companyName0", name: "companyName0", value: experience.companyName}} handleChange={ (e) => handleChange('experience[0]', 'companyName', e.target.value) } />
//       <Input type="text" label="Position Title at Company #1" formData={{ id: "title0", name: "title0", value: experience.title}} handleChange={ (e) => handleChange('experience[0]', 'title', e.target.value) } />
//       <Input type="text" label="Start Date (Examples: February 2022, Feb. 2022, or 2022" formData={{ id: "startDate0", name: "startDate0", value: experience.startDate }} handleChange={ (e) => handleChange('experience[0]', 'startDate', e.target.value) } />
//       <Input type="text" label="End Date (optional)" formData={{ id: "endDate0", name: "endDate0", value: experience.endDate}} handleChange={ (e) => handleChange('experience[0]', 'endDate', e.target.value) } />
//       <span className="block text-sm text-gray-800 dark:text-gray-300 mb-1">Accomplishments at Company #1</span>
//       <section
//         className="relative w-full px-3 py-3 text-sm text-black dark:text-white 
//           bg-slate-50 dark:bg-slate-800 
//           border-1 border-black dark:border-gray-200 rounded-lg
//           hover:border-lime-500 dark:hover:border-lime-400
//           hover:bg-lime-50 dark:hover:bg-lime-950
//           focus:outline-lime-500 focus:outline-3 focus:border-lime-500 focus:ring-lime-500 dark:focus:border-lime-300 dark:focus:border-transparent
//           focus:bg-lime-50 dark:focus:bg-lime-950"
//         contentEditable>
//         <ul class="list-disc list-inside">
//           <li>Describe your accomplishments and achievements, quantified if possible</li>
//         </ul>
//       </section>

//       <div className="mb-5"></div>

//       <Button
//         text="Add Another Company"
//         theme="interaction"
//         className="text-sm"
//         onClick={() => {} } />
      
//       <div className="mb-12"></div>
//     </>
//   )
// }

// export default Experience












// import { useState } from 'react'
// import Button from '../../components/Button.jsx'
// import Input from '../../components/Input.jsx'

// function Experience({ initialExperience = [{ companyName: '', title: '', startDate: '', endDate: '' }], handleChange }) {
//   const [experiences, setExperiences] = useState(initialExperience);

//   // const handleChange = (index, field, value) => {
//   //   const updatedExperiences = [...experiences];
//   //   updatedExperiences[index] = {
//   //     ...updatedExperiences[index],
//   //     [field]: value
//   //   };
//   //   setExperiences(updatedExperiences);
//   // };

//   const addExperience = () => {
//     // Need to notify parent about adding a new experience
//     handleChange('experience', [...experiences, { companyName: '', title: '', startDate: '', endDate: '' }]);
//   };

//   // const addExperience = () => {
//   //   setExperiences([
//   //     ...experiences,
//   //     { companyName: '', title: '', startDate: '', endDate: '' }
//   //   ]);
//   // };

//   const removeExperience = (index) => {
//     const updatedExperiences = [...experiences];
//     updatedExperiences.splice(index, 1);
//     setExperiences(updatedExperiences);
//   };

//   return (
//     <>
//       <div className="flex items-center -mt-1 mb-2">
//         <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2" id="experience">Experience</h2>
//       </div>
//       <p className="text-slate-800 mb-4 dark:text-gray-200 mb-6 w-2/3">
//         Let's jot down where you went to work, starting with your most recent organization.
//       </p>

//       {experiences.map((experience, index) => (
//         <div key={index} className="mb-6">
//           {index !== experiences.length && (
//             <div class="border-t-1 border-gray-500 dark:border-zinc-600 -mx-5 mb-5"></div>
//           )}
//           <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-200">
//             {index === 0 ? 'Most Recent Position' : `Position #${index + 1}`}
//             {index > 0 && (
//               <>
//                 <span className="ms-3"></span>
//                 <Button text="Remove" className="text-sm" onClick={() => removeExperience(index)} />
//               </>
//             )}
//           </h3>

//           <Input 
//             type="text" 
//             label={`Name of Company #${index + 1}`} 
//             formData={{ 
//               id: `companyName${index}`, 
//               name: `companyName${index}`, 
//               value: experience.companyName
//             }} 
//             handleChange={(e) => {
//               const updatedExperiences = [...experiences];
//               updatedExperiences[index] = {
//                 ...updatedExperiences[index],
//                 companyName: e.target.value
//               };
//               handleChange('experience', updatedExperiences);
//             }} 
//           />
          
//           <Input 
//             type="text" 
//             label={`Position Title at Company #${index + 1}`} 
//             formData={{ 
//               id: `title${index}`, 
//               name: `title${index}`, 
//               value: experience.title
//             }} 
//             handleChange={(e) => handleChange(index, 'title', e.target.value)} 
//           />
          
//           <Input 
//             type="text" 
//             label="Start Date (Examples: February 2022, Feb. 2022, or 2022)" 
//             formData={{ 
//               id: `startDate${index}`, 
//               name: `startDate${index}`, 
//               value: experience.startDate 
//             }} 
//             handleChange={(e) => handleChange(index, 'startDate', e.target.value)} 
//           />
          
//           <Input 
//             type="text" 
//             label="End Date (optional)" 
//             formData={{ 
//               id: `endDate${index}`, 
//               name: `endDate${index}`, 
//               value: experience.endDate
//             }} 
//             handleChange={(e) => handleChange(index, 'endDate', e.target.value)} 
//           />
          
//           <span className="block text-sm text-gray-800 dark:text-gray-300 mb-1">
//             Accomplishments at Company #{index + 1}
//           </span>
          
//           <section
//             className="relative w-full px-3 py-3 text-sm text-black dark:text-white 
//               bg-slate-50 dark:bg-zinc-900 
//               border-1 border-black dark:border-zinc-500 rounded-lg
//               hover:border-lime-500 dark:hover:border-lime-400
//               hover:bg-lime-50 dark:hover:bg-lime-950
//               focus:outline-lime-500 focus:outline-3 focus:border-lime-500 focus:ring-lime-500 dark:focus:border-lime-300 dark:focus:border-transparent
//               focus:bg-lime-50 dark:focus:bg-lime-950"
//             contentEditable>
//             <ul className="list-disc list-inside">
//               <li>Describe your accomplishments and achievements, quantified if possible</li>
//             </ul>
//           </section>
//         </div>
//       ))}

//       <Button
//         text="Add Another Company"
//         theme="interaction"
//         className="text-sm"
//         onClick={addExperience} />
      
//       {/* <div className="mb-12"></div> */}
      
//       <div>
//         <code>
//           { JSON.stringify(experiences) }
//         </code>
//       </div>
//     </>
//   )
// }

// export default Experience











import Button from '../../components/Button.jsx'
import EditableList from '../../components/EditableList.jsx';
import Input from '../../components/Input.jsx'

function Experience({ experiences = [], handleChange, setFormData }) {
  
  const addExperience = () => {
    const newExperience = {
      title: '',
      company: '',
      start: '',
      end: '',
      accomplishments: ''
    };
    
    // Add new experience to the array
    setFormData(prevData => ({
      ...prevData,
      experience: [...prevData.experience, newExperience]
    }));
  };

  const removeExperience = (index) => {
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
      <p className="text-slate-800 mb-4 dark:text-gray-200 mb-6 w-2/3">
        Let's jot down where you went to work, starting with your most recent organization.
      </p>

      {experiences.map((experience, index) => (
        <div key={index} className="mb-6">
          {index !== experiences.length && (
            <div class="border-t-1 border-gray-500 dark:border-zinc-600 -mx-5 mb-5"></div>
          )}
          <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-200">
            {index === 0 ? 'Most Recent Position' : `Position #${index + 1}`}
            {index > 0 && (
              <>
                <span className="ms-3"></span>
                <Button
                  text="Remove"
                  onClick={() => removeExperience(index)}
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
            handleChange={(e) => {
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
            handleChange={(e) => {
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
            handleChange={(e) => {
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
            handleChange={(e) => {
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
          
          <section
            className="relative w-full px-3 py-3 text-sm text-black dark:text-white 
              bg-slate-50 dark:bg-zinc-900 
              border-1 border-black dark:border-zinc-500 rounded-lg
              hover:border-lime-500 dark:hover:border-lime-400
              hover:bg-lime-50 dark:hover:bg-lime-950
              focus:outline-lime-500 focus:outline-3 focus:border-lime-500 focus:ring-lime-500 dark:focus:border-lime-300 dark:focus:border-transparent
              focus:bg-lime-50 dark:focus:bg-lime-950"
            contentEditable
            suppressContentEditableWarning={true}
            onInput={(e) => {
              const updatedExperience = { ...experience, accomplishments: e.currentTarget.innerHTML };
              const updatedExperiences = [...experiences];
              updatedExperiences[index] = updatedExperience;
              
              setFormData(prevData => ({
                ...prevData,
                experience: updatedExperiences
              }));
            }}
            >
            <ul className="list-disc list-inside">
              <li>Describe your accomplishments and achievements, quantified if possible</li>
            </ul>
          </section>
        </div>
      ))}

      <Button
        text="Add Another Company"
        theme="interaction"
        className="text-sm"
        onClick={addExperience} />
    </>
  )
}

export default Experience