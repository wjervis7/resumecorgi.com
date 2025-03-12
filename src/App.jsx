import { useState, useEffect } from 'react'
import './App.css'
import Landing from './views/Landing.jsx'
import Editor from './views/Editor.jsx'
import Button from './components/Button.jsx'
import logo from './assets/resume-corgi-sm.png'

function App() {
  const [viewState, setViewState] = useState('landing')

  const handleStart = () => {
    setViewState('editor')
  };

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true' || 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )

  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.setAttribute('data-theme', 'light')
    }
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  return (
    <>
      <div className={"bg-gray-200 dark:bg-zinc-950 overflow-hidden"}>
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
              border-b-1 dark:border-zinc-600
              py-3.5 ps-1 pe-3.5">
            <div className="grid grid-cols-2">
              <div className="col-span-1 text-left">
                <div>
                  <img src={logo} width={81} className="inline-block absolute top-[0.3rem] left-[0.625rem]" />
                  <span className="inline-block absolute top-3.5 left-[6.125rem] font-[700] text-2xl text-gray-900 dark:text-gray-100">Resume Corgi</span>
                </div>
              </div>
              <div className="col-span-1 text-right">
                <Button
                  className="text-sm"
                  text={(darkMode) ? "Enable Light Mode 🌞" : "Enable Dark Mode 🌚"}
                  onClick={() => setDarkMode(!darkMode)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
