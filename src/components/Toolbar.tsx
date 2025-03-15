import StatusIndicator from "./StatusIndicator";

interface ToolbarProps {
  error: string | null;
  isLoading?: boolean;
  pageRendered?: boolean;
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  onDownloadPdf: () => void;
  onDownloadLaTeX: () => void;
}

function Toolbar({
  error,
  isLoading,
  pageRendered,
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  onDownloadPdf,
  onDownloadLaTeX
}: ToolbarProps) {
  const buttonCss =
    `px-2.5 py-2
    text-sm font-semibold text-gray-900 dark:text-white
    bg-gray-100
    border-gray-300
    hover:bg-gray-300 dark:hover:bg-zinc-700
    hover:cursor-pointer
    dark:bg-zinc-600 dark:border-zinc-500`;

  return (
    <>
      <div className="
          bg-zinc-600/93 dark:bg-zinc-800/93
          px-0 pt-[0.875rem] pb-3 mb-0 
          border-0 border-gray-400 dark:border-zinc-600
          rounded-m">
        
        {/* Desktop layout - all in one row */}
        <div className="hidden md:flex md:flex-row md:justify-between rounded-lg" role="group">
          <div className="flex-1 inline-flex items-center">
            <StatusIndicator error={error} isLoading={isLoading} pageRendered={pageRendered} />
          </div>

          <div className="flex-1 inline-flex justify-center items-center">
            <span className="text-sm text-white dark:text-gray-200">
              Page <span className="font-semibold text-white dark:text-white">{currentPage}</span> of <span className="font-semibold text-white dark:text-white">{totalPages > 0 ? totalPages : 1}</span>
            </span>
          </div>

          <div className="flex-1 flex justify-end">
            <div className="inline-flex">
              <button type="button" 
                className={`${buttonCss} border border-e-0 rounded-s-lg flex items-center justify-center`}
                title="Previous page"
                onClick={onPrevious}>
                <span className="flex items-center">
                  <span className="sr-only">Previous page</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.125" stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </span>
              </button>
              <button type="button"
                className={`${buttonCss} border rounded-e-lg flex items-center justify-center`}
                title="Next page"
                onClick={onNext}>
                <span className="flex items-center">
                  <span className="sr-only">Next page</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.125" stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </span>
              </button>
              <button type="button"
                className={`${buttonCss} border border-e-0 rounded-s-lg flex items-center justify-center ms-1.5`}
                title="Download LaTeX"
                onClick={onDownloadLaTeX}>
                <span className="flex items-center">
                  <span className="sr-only">Download</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.125" stroke="currentColor" className="size-5 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
                  </svg>
                  LaTeX
                </span>
              </button>
              <button type="button"
                className={`${buttonCss} border rounded-e-lg flex items-center justify-center`}
                title="Download PDF"
                onClick={onDownloadPdf}>
                <span className="flex items-center">
                  <span className="sr-only">Download</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.125" stroke="currentColor" className="size-5 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                  </svg>
                  PDF
                </span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile layout - two rows */}
        <div className="flex flex-col md:hidden rounded-lg" role="group">
          {/* First row - status indicator only */}
          <div className="inline-flex items-center justify-center mb-3">
            <StatusIndicator error={error} isLoading={isLoading} pageRendered={pageRendered} />
          </div>
          
          {/* Second row - page info left, buttons right */}
          <div className="flex flex-row justify-between items-center">
            <div className="inline-flex items-center">
              <span className="text-sm text-white dark:text-gray-200">
                Page <span className="font-semibold text-white dark:text-white">{currentPage}</span> of <span className="font-semibold text-white dark:text-white">{totalPages > 0 ? totalPages : 1}</span>
              </span>
            </div>
            
            <div className="inline-flex">
            <button type="button" 
                className={`${buttonCss} border border-e-0 rounded-s-lg flex items-center justify-center`}
                title="Previous page"
                onClick={onPrevious}>
                <span className="flex items-center">
                  <span className="sr-only">Previous page</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.125" stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </span>
              </button>
              <button type="button"
                className={`${buttonCss} border rounded-e-lg flex items-center justify-center`}
                title="Next page"
                onClick={onNext}>
                <span className="flex items-center">
                  <span className="sr-only">Next page</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.125" stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </span>
              </button>
              <button type="button"
                className={`${buttonCss} border border-e-0 rounded-s-lg flex items-center justify-center ms-1.5`}
                title="Download LaTeX"
                onClick={onDownloadLaTeX}>
                <span className="flex items-center">
                  <span className="sr-only">Download</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.125" stroke="currentColor" className="size-5 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
                  </svg>
                  LaTeX
                </span>
              </button>
              <button type="button"
                className={`${buttonCss} border rounded-e-lg flex items-center justify-center`}
                title="Download PDF"
                onClick={onDownloadPdf}>
                <span className="flex items-center">
                  <span className="sr-only">Download</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.125" stroke="currentColor" className="size-5 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                  </svg>
                  PDF
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Toolbar;