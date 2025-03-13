import Button from '../components/Button.jsx'
import Corgi from '../components/Corgi.jsx'
import Footer from '../components/Footer.jsx'

function Landing({ onStart }) {
  return (
    <>
      <div className="w-full text-center /md:text-left">
        <div className="flex flex-col justify-center items-center w-full md:flex-row md:place-items-center px-5">
          <div className="relative h-full ml-0 mr-0 text-xl">
            <div className="px-3 py-2.5">
              <div className="sr-only flex items-center -mt-1 mb-2">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Welcome to Resume Corgi!</h1>
              </div>
              <p className="text-gray-950 py-1 mb-4 dark:text-gray-50">
                Let's make a beautiful resume that showcases your awesomeness.
              </p>
              <Button onClick={onStart} text="Let's get started! ✒️🐶" />
            </div>
          </div>
          <div className="hidden /md:block mt-4 md:mt-0 md:me-auto">
            <Corgi size={172} />
          </div>
        </div>

        <Footer className="absolute bottom-[1rem] md:bottom-[1rem] left-0 right-0" />
      </div>
    </>
  )
}

export default Landing
