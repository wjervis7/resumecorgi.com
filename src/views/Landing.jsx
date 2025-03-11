import './Landing.css'
import Button from '../components/Button.jsx'
import Corgi from '../components/Corgi.jsx'
import Card from '../components/Card.jsx'

function Landing({ onStart }) {
  return (
    <>
      <div class="w-full">
        <div class="flex flex-co w-full mb-10 xs:flex-row">
          <div class="me-10 ms-auto sm:mb-0">
            <div class="relative h-full ml-0 mr-0 text-lg">
              <Card>
              <div class="flex items-center -mt-1 mb-2">
                  <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Welcome to Resume Corgi!</h1>
                </div>
                <p class="text-slate-800 py-1 mb-3 dark:text-gray-200">
                  Let's make a beautiful resume that showcases your awesomeness.
                </p>
                <Button onClick={onStart} text="Let's get started! ✒️🐶" className="text-lg" />
              </Card>
            </div>
          </div>
          <div class="me-auto sm:mb-0">
            <Corgi size={172} />
          </div>
        </div>
        
      </div>
    </>
  )
}

export default Landing
