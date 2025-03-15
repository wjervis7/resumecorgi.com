import Button from '../components/Button';
import Corgi from '../components/Corgi';
import Footer from '../components/Footer';

interface LandingProps {
  onStart: () => void;
}

function Landing({ onStart }: LandingProps) {
  return (
    <>
      <div className="w-full text-center">
        <div className="relative flex flex-col justify-center items-center w-full md:flex-row md:place-items-center px-5 z-100">
          <div className="relative h-full ml-0 mr-0 text-xl">
            <div className="px-3 py-2.5 mb-23">
              <div className="sr-only flex items-center -mt-1 mb-2">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Welcome to Resume Corgi!</h1>
              </div>
              <h2 className="text-gray-950 mb-5 dark:text-gray-50 font-bold text-3xl w-full md:w-3/4 mx-auto">
                Let's build a beautiful resume that showcases your talent.
              </h2>
              <p className="text-gray-950 mb-5 dark:text-gray-50 text-sm w-full md:w-2/5 mx-auto">
                It's free, optimized for scanning software,
                and secure. Your data never leaves your device.
              </p>
              <Button onClick={onStart} text="Start Building" />
            </div>
          </div>
          <div className="hidden /md:block mt-4 md:mt-0 md:me-auto">
            <Corgi size={172} />
          </div>
        </div>

        <Footer className="absolute bottom-[1rem] md:bottom-[1rem] left-0 right-0" />
      </div>
    </>
  );
}

export default Landing;