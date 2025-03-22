import Corgi from "./Corgi"

function Footer({
  className = "absolute bottom-[150px] lg:bottom-0 left-0 right-0",
  corgiSize = 108
}) {
  return (
    <div className={`${className} w-full text-center pb-2.5`}>
      <div className="px-5">
        <div className="hidden lg:block"><Corgi size={corgiSize} /></div>
        <div className="block lg:hidden"><Corgi size={Math.round(corgiSize * 0.777)} /></div>
      </div>

      <div className="px-5 mt-1 lg:mt-2 mb-2.5 lg:mb-5">
        <span className="text-sm text-gray-900 dark:text-gray-200">You've got this!</span>
      </div>

      <div className="text-xs text-gray-700 dark:text-zinc-300">
        Copyright &copy; 2025 Chad Golden
      </div>
    </div>
  )
}

export default Footer;