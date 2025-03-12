import Button from "../../components/Button"

function ChooseNext({onNextChosen}) {
  return (
    <>
      <div className="flex items-center -mt-1 mb-2">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Choose The Next Section</h2>
      </div>
      <p className="text-slate-800 mb-4 dark:text-gray-200 w-3/4">
        Let's add the next section. What would you like that to be? You'll be able to change the order later if you'd like!
      </p>
      <Button text="Experience" className="dark:bg-blue-700! dark:hover:bg-lime-500! hover:bg-lime-200! dark:text-white bg-blue-200! text-gray-900" onClick={() => onNextChosen('experience') } />
      <span className="ms-3"></span>
      <Button text="Education" className="dark:bg-blue-700! dark:hover:bg-lime-500! hover:bg-lime-200! dark:text-white bg-blue-200! text-gray-900" onClick={() => onNextChosen('education') } />
      
      <div className="mb-8"></div>
    </>
  )
}

export default ChooseNext
