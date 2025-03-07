import Button from '../components/Button.jsx'
import Input from '../components/Input.jsx'
import logo from '../assets/bread-loaf-corgi-2-001.png'
import Preview from '../views/Preview.jsx'

function Editor({onStartOver}) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 w-full h-screen">
        <div className="ps-3 mt-3">
          <div class="w-full">
            <div class="flex flex-co w-full mb-10 xs:flex-row">
              <div class="w-full sm:mb-0">
                <div class="relative h-full ml-0 mr-0">
                  <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-black dark:bg-gray-200 rounded-lg"></span>
                  <div class="relative h-full p-5 bg-white dark:bg-slate-900 border-1 border-black dark:border-gray-200 rounded-lg px-5 py-7">
                    <div class="flex items-center -mt-1 mb-2">
                      <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100">Let's Talk About You!</h2>
                    </div>
                    <p class="text-slate-800 mb-4 dark:text-gray-200 mb-6">
                      Start by telling us about yourself.
                    </p>

                    <Input type="text" label="Name" formData={{ id: "name", name: "name", value: ""}} />

                    <Input type="email" label="Email" formData={{ id: "email", name: "email", value: ""}} />

                    <div className="mb-5"></div>

                    <Button text="Continue" />
                    <span className="ms-3"></span>
                    <Button text="Start over" className="dark:bg-slate-900" onClick={onStartOver} />
                  </div>
                  <div className="absolute right-4 top-4">
                    <img
                      src={logo}
                      alt="Your corgi bread-loaf resume writing buddy"
                      height="100"
                      width="100"
                      class="max-w-md mx-auto animate-corgi-bounce"
                    />
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-950 border-l-1 border-slate-700 dark:text-white p-4">
          <Preview />
        </div>
      </div>
    </>
  )
}

export default Editor
