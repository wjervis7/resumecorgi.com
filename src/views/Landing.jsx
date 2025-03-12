import Button from '../components/Button.jsx'
import Corgi from '../components/Corgi.jsx'
import Card from '../components/Card.jsx'

function Landing({ onStart }) {
  return (
    <>
      <div className="w-full">
        <div className="flex flex-col items-center w-full md:flex-row md:place-items-center px-5">
          <div className="w-full max-w-md md:me-10 md:ms-auto">
            <div className="relative h-full ml-0 mr-0 text-lg">
              <Card>
                <div className="flex items-center -mt-1 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Welcome to Resume Corgi!</h1>
                </div>
                <p className="text-slate-800 py-1 mb-3 dark:text-gray-200">
                  Let's make a beautiful resume that showcases your awesomeness.
                </p>
                <Button onClick={onStart} text="Let's get started! ✒️🐶" className="text-lg" />
              </Card>
            </div>
          </div>
          <div className="mt-4 md:mt-0 md:me-auto">
            <Corgi size={172} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Landing
