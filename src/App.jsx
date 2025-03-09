import { useState, useEffect } from 'react'
import './App.css'
import Landing from './views/Landing.jsx'
import Editor from './views/Editor.jsx'
import Button from './components/Button.jsx'
import Corgi from './components/Corgi.jsx'

function App() {
  const [viewState, setViewState] = useState('landing')

  const handleStart = () => {
    setViewState('editor')
  };

  const handleStartOver = () => {
    setViewState('landing')
  }

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
      <div className={"bg-gray-200 dark:bg-slate-950"}>
        <div className={"relative flex flex-col justify-center items-center min-h-screen mx-auto xl:px-0"}>

          {viewState === 'landing' && (
            <Landing onStart={handleStart} />
          )}

          {viewState === 'editor' && (
            <Editor onStartOver={handleStartOver}/>
          )}

          {viewState === 'not-found' && (
            <>
              <p className={"text-xl dark:text-gray-100 mb-3"}>🤷 Not found</p>
              <Button onClick={() => { setViewState('landing') }} text="Start over 🔁" />
            </>
          )}

          <div className="
              fixed left-0 top-0 w-full 
              bg-white dark:bg-slate-800
              border-b-1 dark:border-slate-600
              p-2.5">
            <div className="grid grid-cols-2">
              <div className="col-span-1 text-left">
                <div>
                  <Corgi size={33} className="inline-block brightness-0 dark:brightness-10000 me-2.5" /> <span className="inline-block absolute top-3 font-[700] text-lg text-gray-900 dark:text-gray-100">Resume Buddy</span>
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

          <div 
            className="
              fixed left-0 bottom-0 w-full 
              bg-white dark:bg-slate-800
              border-t-1 dark:border-slate-600
              p-0.75
              text-center text-sm text-gray-900 dark:text-gray-200">
            Copyright &copy; 2025 Chad Golden
          </div>
        </div>
      </div>
    </>
  )
}

export default App
