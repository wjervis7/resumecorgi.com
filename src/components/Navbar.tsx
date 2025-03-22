import { ReactNode } from 'react';
import logo from '../assets/resume-corgi-xs.png'
import LightSwitch from './LightSwitch'

interface NavProps {
  menuButton?: ReactNode;
}

function Navbar({
  menuButton
}: NavProps) {
  return (
    <>
      <nav className="
          transition-colors
          fixed left-0 top-0 w-full 
          bg-white dark:bg-zinc-950/75
          border-b-1 border-gray-300/75 dark:border-zinc-900
          py-1.5 /py-[1.25rem] px-3
          z-49">
        <div className="grid grid-cols-2">
          <div className="col-span-1 text-left">
            <div>
              <img src={logo} width={62} className="inline-block static /absolute /top-[0.425rem] /left-[0.825rem]" alt="Resume Corgi logo, sophisticated resume helper" />
              <span className="hidden lg:inline-block relative /absolute top-[3px] left-2 font-[700] text-2xl text-gray-900 dark:text-gray-100">Resume Corgi</span>
              <span className="px-4 relative top-[3px] z-1000">
                { menuButton }
              </span>
            </div>
          </div>
          <div className="col-span-1 text-right pt-4.5">
              <LightSwitch />
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar;