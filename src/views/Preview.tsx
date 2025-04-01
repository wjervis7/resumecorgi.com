import { useEffect, useState, useRef, useMemo } from "react";
import * as pdfjsLib from 'pdfjs-dist';
import EngineManager from "../lib/EngineManager";
import Skeleton from "../components/Skeleton";
import Toolbar from "../components/Toolbar";
import { FormData, Section } from "../types";
import { TemplateFactory } from "@/lib/LaTeX/TemplateFactory";
import { useResume } from '@/lib/ResumeContext';

const INITIAL_DEBOUNCE_MS = 300;
const MIN_DEBOUNCE_MS = 50;
const MAX_DEBOUNCE_MS = 600;
const TYPING_TIMEOUT_MS = 1000;
const MAX_WIDTH = 800;

interface CompilationJob {
  id: number;
  latex: string;
  timestamp: number;
  isCancelled: boolean;
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}

interface PreviewState {
  formData: FormData | null;
  selectedSections: Section[] | null;
  compiling: boolean;
}

function Preview() {
  const { formData, sections, selectedTemplate } = useResume();
  const scale = 1;

  const jobIdCounter = useRef<number>(0);
  const activeJobRef = useRef<CompilationJob | null>(null);
  const pendingJobRef = useRef<CompilationJob | null>(null);
  const compilationTimesRef = useRef<number[]>([]);
  const lastCompilationStartRef = useRef<number>(0);
  const lastEditTimeRef = useRef<number>(0);
  const adaptiveDebounceTimeRef = useRef<number>(INITIAL_DEBOUNCE_MS);
  const typingModeTimerRef = useRef<number | null>(null);
  const isTypingRef = useRef<boolean>(false);
  
  const activeCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const displayCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  
  const cleanupRef = useRef<(() => void) | null>(null);
  
  const prevTemplateRef = useRef<string | null>(null);
  const prevFormDataRef = useRef<FormData | null>(null);
  const prevSelectedSectionsRef = useRef<Section[] | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [localPreviewState, setLocalPreviewState] = useState<PreviewState>({
    formData: null,
    selectedSections: null,
    compiling: false
  });
  
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pdfBuffer, setPdfBuffer] = useState<ArrayBuffer | null>(null);
  const [pdfDoc, setPdfDoc] = useState<unknown>(null);
  const [pageRendered, setPageRendered] = useState<boolean>(false);
  const [pageRendering, setPageRendering] = useState<boolean>(false);
  const [pageNumPending, setPageNumPending] = useState<number | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [canvasWidthPx, setCanvasWidthPx] = useState<number>(MAX_WIDTH);
  const [shouldRerender, setShouldRerender] = useState<boolean>(false);


  // Use memoized LaTeX to avoid recreating it on every render
  const compiledLaTeX = useMemo(() => {
    return TemplateFactory.createTemplate(
      selectedTemplate.id, 
      formData, 
      sections
    ).generateLaTeX();
  }, [formData, sections, selectedTemplate]);

  // Adaptive debounce time calculation
  const updateAdaptiveDebounceTime = (compilationTime: number) => {
    // Keep track of the last 5 compilation times
    compilationTimesRef.current.push(compilationTime);
    if (compilationTimesRef.current.length > 5) {
      compilationTimesRef.current.shift();
    }
    
    // Calculate average compilation time
    const avgCompilationTime = compilationTimesRef.current.reduce(
      (sum, time) => sum + time, 0
    ) / compilationTimesRef.current.length;
    
    // Set debounce time based on compilation time
    // For fast machines: debounce less (more responsive)
    // For slow machines: debounce more (avoid too many compilations)
    if (isTypingRef.current) {
      // During active typing, use larger debounce to avoid overwhelming the system
      adaptiveDebounceTimeRef.current = Math.min(
        Math.max(avgCompilationTime * 0.8, MIN_DEBOUNCE_MS), 
        MAX_DEBOUNCE_MS
      );
    } else {
      // When not actively typing, we can be more responsive
      adaptiveDebounceTimeRef.current = Math.min(
        Math.max(avgCompilationTime * 0.4, MIN_DEBOUNCE_MS),
        MAX_DEBOUNCE_MS / 2
      );
    }
  };

  // rerender when viewport size changes
  useEffect(() => {
    const pdfViewerArea = document.getElementById('pdf-viewer-area');
    let resizeTimer: number | null = null;
  
    const updateCanvasWidth = () => {
      if (pdfViewerArea) {
        const viewerWidth = pdfViewerArea.clientWidth || document.body.clientWidth;
        const newWidth = Math.min(viewerWidth, MAX_WIDTH);
        
        if (newWidth !== canvasWidthPx) {
          setCanvasWidthPx(newWidth);
        }
      }
    };
  
    // Handle resize with simple debouncing
    const handleResize = () => {
      updateCanvasWidth();
      
      // Clear previous timer
      if (resizeTimer) {
        window.clearTimeout(resizeTimer);
      }
      
      // Set new timer - this will trigger a rerender after resize stops
      resizeTimer = window.setTimeout(() => {
        setShouldRerender(prev => !prev); // Toggle to force effect to run
      }, 250);
    };
  
    // Initial sizing
    updateCanvasWidth();
  
    // Set up resize handlers
    window.addEventListener('resize', handleResize);
    const resizeObserver = new ResizeObserver(handleResize);
    
    if (pdfViewerArea) {
      resizeObserver.observe(pdfViewerArea);
    }
    resizeObserver.observe(document.body);
  
    return () => {
      if (resizeTimer) window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      if (pdfViewerArea) resizeObserver.unobserve(pdfViewerArea);
      resizeObserver.unobserve(document.body);
      resizeObserver.disconnect();
    };
  }, [canvasWidthPx]);

  useEffect(() => {
    // Only rerender if we have a PDF loaded
    if (pdfDoc && currentPage > 0 && pageRendered && !pageRendering) {
      renderPage(pdfDoc, currentPage);
    }
  }, [shouldRerender, pdfDoc, canvasWidthPx]);

  // Main effect for LaTeX compilation
  useEffect(() => {
    // Use JSON.stringify for deep comparison
    const currentFormDataString = JSON.stringify(formData);
    const prevFormDataString = JSON.stringify(prevFormDataRef.current);
  
    const currentSelectedSectionsString = JSON.stringify(sections);
    const prevSelectedSectionsString = JSON.stringify(prevSelectedSectionsRef.current);
  
    // Skip if data hasn't changed
    if (
      pageRendered && 
      currentFormDataString === prevFormDataString &&
      currentSelectedSectionsString === prevSelectedSectionsString &&
      prevTemplateRef.current === selectedTemplate.id
    ) {
      return;
    }
    
    // Store current values for next comparison
    prevFormDataRef.current = JSON.parse(currentFormDataString);
    prevSelectedSectionsRef.current = JSON.parse(currentSelectedSectionsString);
    prevTemplateRef.current = selectedTemplate.id;

    // Update loading state to show compilation in progress
    setIsLoading(true);

    // Update local state
    setLocalPreviewState({
      formData,
      selectedSections: sections,
      compiling: true
    });
    
    // Update typing mode
    const now = Date.now();
    lastEditTimeRef.current = now;
    isTypingRef.current = true;
    
    // Clear existing typing mode timer
    if (typingModeTimerRef.current) {
      clearTimeout(typingModeTimerRef.current);
    }
    
    // Set a new typing mode timer
    typingModeTimerRef.current = window.setTimeout(() => {
      isTypingRef.current = false;
    }, TYPING_TIMEOUT_MS);
    
    // Enqueue compilation job with debounce
    const jobId = ++jobIdCounter.current;
    const newJob: CompilationJob = {
      id: jobId,
      latex: compiledLaTeX,
      timestamp: now,
      isCancelled: false,
      resolve: () => {},
      reject: () => {}
    };
    
    // Create a promise that will be resolved when the job completes
    const compilationPromise = new Promise((resolve, reject) => {
      newJob.resolve = resolve;
      newJob.reject = reject;
    });
    
    // Cancel any pending job (not the active one)
    if (pendingJobRef.current) {
      pendingJobRef.current.isCancelled = true;
      pendingJobRef.current.reject(new Error('Cancelled by newer job'));
    }
    
    // Set the new job as pending
    pendingJobRef.current = newJob;
    
    // Debounce the actual compilation
    const debounceTime = adaptiveDebounceTimeRef.current;
    
    setTimeout(() => {
      // Only process if this job is still the pending one (wasn't cancelled)
      if (pendingJobRef.current?.id === jobId && !pendingJobRef.current.isCancelled) {
        // If no active job, process immediately
        if (!activeJobRef.current) {
          processCompilationJob(pendingJobRef.current);
          pendingJobRef.current = null;
        }
        // Otherwise it will be processed when the active job completes
      }
    }, debounceTime);
    
    // Return promise so calling code can await if needed
    compilationPromise
      .then(() => {
        setLocalPreviewState(prev => ({ ...prev, compiling: false }));
        // Make sure isLoading is properly reset if the compilation succeeds
        // but the PDF loading fails for some reason
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.message !== 'Cancelled by newer job') {
          console.error('Compilation failed:', err);
        }
        setLocalPreviewState(prev => ({ ...prev, compiling: false }));
        // Ensure loading state is reset on errors
        setIsLoading(false);
      });
    
    // Cleanup
    return () => {
      if (typingModeTimerRef.current) {
        clearTimeout(typingModeTimerRef.current);
      }
      
      // Cancel the pending job if component unmounts
      if (pendingJobRef.current) {
        pendingJobRef.current.isCancelled = true;
        pendingJobRef.current.reject(new Error('Component unmounted'));
      }
      
      // Cancel any in-progress compilation
      cleanupRef.current?.();
    };
  }, [formData, sections, compiledLaTeX, pageRendered, selectedTemplate.id]);

  // Process a compilation job
  const processCompilationJob = async (job: CompilationJob): Promise<void> => {
    if (job.isCancelled) {
      // Don't process cancelled jobs
      return;
    }
    
    // Mark this job as active
    activeJobRef.current = job;
    
    let mounted = true;
    const compilationStartTime = Date.now();
    lastCompilationStartRef.current = compilationStartTime;
    
    // Create cleanup function
    const cleanup = () => {
      mounted = false;
      if (activeJobRef.current?.id === job.id) {
        activeJobRef.current = null;
      }
    };
    
    cleanupRef.current = cleanup;
  
    try {
      // Keep previous PDF visible during compilation
      setError(null);
  
      // Get the engine instance
      const engine = await EngineManager.getInstance();
      
      if (!mounted || job.isCancelled) {
        cleanup();
        job.reject(new Error('Job cancelled or component unmounted'));
        processNextJob();
        return;
      }
  
      // Prepare and compile the LaTeX
      engine.writeMemFSFile("main.tex", job.latex);
      engine.setEngineMainFile("main.tex");
  
      let result = await engine.compileLaTeX();
      
      if (!mounted || job.isCancelled) {
        cleanup();
        job.reject(new Error('Job cancelled or component unmounted'));
        processNextJob();
        return;
      }
      
      if (result.status !== 0) {
        console.error(result.log);
      }
      
      // Load the PDF
      const cachedBuffer = result.pdf.buffer.slice(0);
      const loadingTask = pdfjsLib.getDocument({ data: result.pdf.buffer });
      
      loadingTask.promise.then(pdf => {
        if (!mounted || job.isCancelled) {
          cleanup();
          job.reject(new Error('Job cancelled or component unmounted'));
          processNextJob();
          return;
        }
        
        setPdfBuffer(cachedBuffer);
        setPdfDoc(pdf);
        setNumPages(pdf.numPages);
        renderPage(pdf, 1);
        setIsLoading(false);

        
        // Calculate compilation time and update adaptive debounce
        const compilationTime = Date.now() - compilationStartTime;
        updateAdaptiveDebounceTime(compilationTime);
        
        // Resolve the job's promise
        job.resolve(pdf);
        
        // Clean up and process next job
        cleanup();
        processNextJob();
      }).catch(error => {
        if (!mounted || job.isCancelled) {
          cleanup();
          job.reject(new Error('Job cancelled or component unmounted'));
          processNextJob();
          return;
        }
        
        console.error('Error loading PDF:', error);
        setError(`Error loading PDF: ${error.message}`);
        setIsLoading(false);

        
        // Reject the job's promise
        job.reject(error);
        
        // Clean up and process next job
        cleanup();
        processNextJob();
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (mounted && !job.isCancelled) {
        console.error("Failed to compile LaTeX:", err);
        setError(`Failed to compile LaTeX: ${err?.message}`);
        setIsLoading(false);

        
        // Reject the job's promise
        job.reject(err);
      }
      
      // Update loading state
      setIsLoading(false);
      
      // Clean up and process next job
      cleanup();
      processNextJob();
    }
  };

  // Process the next job in the queue
  const processNextJob = (): void => {
    // If there's a pending job, process it
    if (pendingJobRef.current && !pendingJobRef.current.isCancelled) {
      const nextJob = pendingJobRef.current;
      pendingJobRef.current = null;
      processCompilationJob(nextJob);
    }
  };

  // Render a page from the PDF
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderPage = (pdf: any, pageNum: number): void => {
    // If a render is in progress and we're trying to render the same page,
    // mark it as pending but don't start a new render
    if (pageRendering && currentPage === pageNum) {
      return;
    }
    
    // If rendering a different page, set as pending
    if (pageRendering) {
      setPageNumPending(pageNum);
      return;
    }
  
    setPageRendering(true);
    
    // Using promise to fetch the page
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pdf.getPage(pageNum).then((page: any) => {
      // Use the hidden active canvas for rendering
      const canvas = activeCanvasRef.current;
  
      if (!canvas) {
        setPageRendering(false);
        return;
      }
  
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setPageRendering(false);
        return;
      }
      
      ctx.imageSmoothingQuality = 'high';
      ctx.imageSmoothingEnabled = false;
      
      const resolution = 2.5;
      const viewport = page.getViewport({ scale });
      canvas.height = resolution * viewport.height;
      canvas.width = resolution * viewport.width;
      
      // Render PDF page into canvas context
      const renderContext = {
        canvasContext: ctx,
        viewport: viewport,
        transform: [resolution, 0, 0, resolution, 0, 0]
      };
  
      const renderTask = page.render(renderContext);
      
      // Wait for rendering to finish
      renderTask.promise.then(() => {
        // When render is complete, swap the canvas contents to the display canvas
        const displayCanvas = displayCanvasRef.current;
        if (displayCanvas) {
          // Match the dimensions
          displayCanvas.width = canvas.width;
          displayCanvas.height = canvas.height;
          displayCanvas.style.width = "100%";
          displayCanvas.style.maxWidth = `${canvasWidthPx}px`;
          
          // Copy content from active canvas to display canvas
          const displayCtx = displayCanvas.getContext('2d');
          if (displayCtx) {
            displayCtx.drawImage(canvas, 0, 0);
          }
        }
        
        setPageRendered(true);
        setPageRendering(false);
        
        if (pageNumPending !== null) {
          // New page rendering is pending
          renderPage(pdfDoc, pageNumPending);
          setPageNumPending(null);
        }
      }).catch((error: Error) => {
        console.error('Error rendering page:', error);
        setPageRendering(false);
      });
    }).catch((error: Error) => {
      console.error('Error getting page:', error);
      setPageRendering(false);
    });
  
    setCurrentPage(pageNum);
  };

  const previousPage = (): void => {
    if (currentPage <= 1 || !pdfDoc) return;
    renderPage(pdfDoc, currentPage - 1);
  };

  const nextPage = (): void => {
    if (currentPage >= numPages || !pdfDoc) return;
    renderPage(pdfDoc, currentPage + 1);
  };

  const downloadPdf = (): void => {
    if (!pdfBuffer) return;
    
    // Use the cached PDF buffer that's already in sync with what's displayed...
    const blob = new Blob([pdfBuffer], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = "resume.pdf";
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadLaTeX = (): void => {
    const blob = new Blob([compiledLaTeX], { type: 'application/x-tex' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = "resume.tex";
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <h2 className="text-lg sr-only">PDF Preview</h2>
  
      <div className="sticky top-0 w-full z-48">
        <Toolbar 
          error={error} 
          isLoading={isLoading} 
          pageRendered={pageRendered} 
          currentPage={currentPage}
          totalPages={numPages}
          onPrevious={previousPage}
          onNext={nextPage}
          onDownloadPdf={downloadPdf}
          onDownloadLaTeX={downloadLaTeX}
        />
      </div>

      <div id="pdf-viewer-area" className="pdf-viewer flex justify-center items-center w-full mt-3">
        <div ref={canvasContainerRef} className="grow canvas-container relative px-4 lg:px-3 w-auto">

          {/* Display canvas - always visible */}
          {!error && (
            <>
              <canvas
                ref={displayCanvasRef}
                style={{ width: canvasWidthPx + "px" }}
                className={`mx-auto bg-white shadow-md dark:shadow-lg shadow-gray-800 dark:shadow-zinc-700 ${!pageRendered ? 'hidden' : ''}`}
              ></canvas>
            </>
          )}
          
          {/* Active canvas - hidden, used for rendering */}
          <canvas 
            ref={activeCanvasRef}
            style={{ width: canvasWidthPx + "px" }}
            className="hidden"
          ></canvas>
          
          {/* Only show skeleton when no canvas has been rendered yet */}
          {(isLoading && !pageRendered) && <Skeleton width={"100%"} />}
        </div>
      </div>
    </>
  );
}

export default Preview;