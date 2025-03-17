import { useState } from 'react'
import './App.css'
import Landing from './views/Landing.jsx'
import Editor from './views/Editor.jsx'
import Button from './components/Button.jsx'
import logo from './assets/resume-corgi-xs.png'
import LightSwitch from './components/LightSwitch.jsx'

function App() {
  const [viewState, setViewState] = useState('landing')

  const handleStart = () => {
    setViewState('editor')
  };

  return (
    <>
      <div className={"bg-gray-50 dark:bg-zinc-900 /dark:bg-[oklch(0.176_0.0055_285.85)] overflow-hidden"}>
        <div className={"relative flex flex-col justify-center items-center min-h-screen mx-auto xl:px-0"}>

          {viewState === 'landing' && (
            <Landing onStart={handleStart} />
          )}

          {viewState === 'editor' && (
            <Editor />
          )}

          {viewState === 'not-found' && (
            <>
              <p className={"text-xl dark:text-gray-100 mb-3"}>🤷 Not found</p>
              <Button onClick={() => { setViewState('landing') }} text="Start over 🔁" />
            </>
          )}

          <div className="
              fixed left-0 top-0 w-full 
              bg-white dark:bg-zinc-950
              border-b-1 border-gray-400 dark:border-zinc-700
              py-[1.25rem] ps-1 pe-4
              z-1000">
            <div className="grid grid-cols-2">
              <div className="col-span-1 text-left">
                <div>
                  <img src={logo} width={62} className="inline-block absolute top-[0.425rem] left-[0.825rem]" />
                  <span className="inline-block absolute top-[1.2rem] left-[5.25rem] font-[700] text-2xl text-gray-900 dark:text-gray-100">Resume Corgi</span>
                </div>
              </div>
              <div className="col-span-1 text-right">
                  <LightSwitch />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
