import Corgi from "./Corgi"

function Footer({ className = "absolute bottom-[150px] md:bottom-0 left-0 right-0" }) {
  return (
    <div className={`${className} w-full text-center pb-3`}>
      <div className="px-5">
        <div className="hidden md:block"><Corgi size={132} /></div>
        <div className="block md:hidden"><Corgi size={96} /></div>
      </div>

      <div className="px-5 mt-1 md:mt-2 mb-5 md:mb-7.5">
        <span className="text-lg:md text-gray-900 dark:text-gray-200">You've got this!</span>
      </div>

      <div className="text-xs text-gray-700 dark:text-zinc-300">
        Copyright &copy; 2025 Chad Golden
      </div>
    </div>
  )
}

export default Footer;