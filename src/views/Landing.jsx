import './Landing.css'
import logo from '../assets/bread-loaf-corgi-2-001.png'
import Button from '../components/Button.jsx'
import Corgi from '../components/Corgi.jsx'

function Landing({ onStart }) {
  return (
    <>
      <div class="w-full">
        <div class="flex flex-co w-full mb-10 xs:flex-row">
          <div class="me-10 ms-auto sm:mb-0">
            <div class="relative h-full ml-0 mr-0">
              <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-black dark:bg-gray-200 rounded-lg"></span>
              <div class="relative h-full p-5 bg-white dark:bg-slate-900 border-1 border-black dark:border-gray-200 rounded-lg px-5 py-7">
                <div class="flex items-center -mt-1 mb-2">
                  <h1 class="text-xl font-bold text-gray-900 dark:text-gray-100">Welcome to Resume Buddy!</h1>
                </div>
                <p class="text-slate-800 mb-4 dark:text-gray-200">
                  Let's make a beautiful resume that showcases your awesomeness.
                </p>
                <Button onClick={onStart} text="Let's get started! ✒️🐶" />
              </div>
            </div>
          </div>
          <div class="me-auto sm:mb-0">
            <Corgi />
          </div>
        </div>
      </div>
    </>
  )
}

export default Landing
