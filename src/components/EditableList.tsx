// import React from 'react';
// import { Experience, FormData } from '../types';

// interface EditableListProps {
//   experience: Experience;
//   experiences: Experience[];
//   index: number;
//   setFormData: React.Dispatch<React.SetStateAction<FormData>>;
// }

// const EditableList: React.FC<EditableListProps> = ({ 
//   experience, 
//   experiences, 
//   index, 
//   setFormData 
// }) => {
//   const handleInput = (e: React.FormEvent<HTMLElement>) => {
//     const updatedExperience = { 
//       ...experience, 
//       accomplishments: e.currentTarget.innerHTML 
//     };
//     const updatedExperiences = [...experiences];
//     updatedExperiences[index] = updatedExperience;
    
//     setFormData(prevData => ({
//       ...prevData,
//       experience: updatedExperiences
//     }));
//   };

//   return (
//     <section
//       className="relative w-full px-3 py-3 text-sm text-black dark:text-white 
//         bg-slate-50 dark:bg-zinc-900 
//         border-1 border-black dark:border-zinc-500 rounded-lg
//         hover:border-lime-500 dark:hover:border-lime-400
//         hover:bg-lime-50 dark:hover:bg-lime-950
//         focus:outline-lime-500 focus:outline-3 focus:border-lime-500 focus:ring-lime-500 dark:focus:border-lime-300 dark:focus:border-transparent
//         focus:bg-lime-50 dark:focus:bg-lime-950"
//       contentEditable
//       onInput={handleInput}>
//       <ul className="list-disc list-inside">
//         <li>Describe your accomplishments and achievements, quantified if possible</li>
//       </ul>
//     </section>
//   );
// };

// export default EditableList;