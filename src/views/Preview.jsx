import { useEffect, useState, useRef } from "react";
import * as pdfjsLib from 'pdfjs-dist';

function Preview() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [engine, setEngine] = useState(null);
  const canvasRef = useRef(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [pageRendering, setPageRendering] = useState(false);
  const [pageNumPending, setPageNumPending] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const scale = 1;

  useEffect(() => {
    let mounted = true;

    console.log(pdfjsLib.GlobalWorkerOptions);

    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.type = "text/javascript";
        
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        
        document.body.appendChild(script);
      });
    };

    const initEngine = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Load the main PdfTeXEngine script
        await loadScript("./PdfTeXEngine.js");
        
        if (!mounted) return;
        
        // Initialize the engine
        const pdfTeXEngine = new window.PdfTeXEngine();
        await pdfTeXEngine.loadEngine();
        
        if (!mounted) return;
        
        setEngine(pdfTeXEngine);

        pdfTeXEngine.writeMemFSFile("main.tex", ExampleLaTeX);
        pdfTeXEngine.setEngineMainFile("main.tex");

        let result = await pdfTeXEngine.compileLaTeX();
        console.log(result.pdf);

        // load the PDF
        const loadingTask = pdfjsLib.getDocument({ data: result.pdf.buffer });
        loadingTask.promise.then(pdf => {
          setPdfDoc(pdf);
          setNumPages(pdf.numPages);
          renderPage(pdf, 1);
        }).catch(error => {
          console.error('Error loading PDF:', error);
        });

        setIsLoading(false);
      } catch (err) {
        if (mounted) {
          console.error("Failed to initialize PdfTeXEngine:", err);
          setError(`Failed to initialize LaTeX engine: ${err.message}`);
          setIsLoading(false);
        }
      }
    };

    const renderPage = (pdf, pageNum) => {
      if (pageRendering) {
        setPageNumPending(pageNum);
        return;
      }
  
      setPageRendering(true);
      
      // Using promise to fetch the page
      console.log(pdf);
      pdf.getPage(pageNum).then(page => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingQuality = 'high';
        
        const resolution = 2;
        const viewport = page.getViewport({ scale });
        canvas.height = resolution * viewport.height;
        canvas.width = resolution * viewport.width;
        canvas.style.height = viewport.height + "px";
        canvas.style.width = viewport.width + "px";
        
        // Render PDF page into canvas context
        const renderContext = {
          canvasContext: ctx,
          viewport: viewport,
          transform: [resolution, 0, 0, resolution, 0, 0]
        };
  
        const renderTask = page.render(renderContext);
        
        // Wait for rendering to finish
        renderTask.promise.then(() => {
          setPageRendering(false);
          if (pageNumPending !== null) {
            // New page rendering is pending
            renderPage(pageNumPending);
            setPageNumPending(null);
          }
        }).catch(error => {
          console.error('Error rendering page:', error);
          setPageRendering(false);
        });
      });
  
      setCurrentPage(pageNum);
    };

    const previousPage = () => {
      if (currentPage <= 1) return;
      renderPage(currentPage - 1);
    };
  
    const nextPage = () => {
      if (currentPage >= numPages) return;
      renderPage(currentPage + 1);
    };

    initEngine();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <h2 className="text-lg sr-only">Preview</h2>
      {isLoading && (
        <>
          <p className="text-white text-gray-900 dark:text-gray-200">Loading...</p>
        </>
      )}

      {!isLoading && (
        <>
          <div className="pdf-viewer flex justify-center items-center w-full">
            <div className="canvas-container overflow-x-auto">
              <canvas ref={canvasRef} className="shadow-lg shadow-gray-300 dark:shadow-slate-700"></canvas>
            </div>
          </div>
        </>
      )}
    </>
  )
}

const ExampleLaTeX = `
\\documentclass[11pt]{article}       % set main text size
\\usepackage[letterpaper,                % set paper size to letterpaper. change to a4paper for resumes outside of North America
top=0.5in,                          % specify top page margin
bottom=0.5in,                       % specify bottom page margin
left=0.5in,                         % specify left page margin
right=0.5in]{geometry}              % specify right page margin
                       
\\usepackage{XCharter}               % set font. comment this line out if you want to use the default LaTeX font Computer Modern
\\usepackage[T1]{fontenc}            % output encoding
\\usepackage[utf8]{inputenc}         % input encoding
\\usepackage{enumitem}               % enable lists for bullet points: itemize and \item
\\usepackage[hidelinks]{hyperref}    % format hyperlinks
\\usepackage{titlesec}               % enable section title customization
\\raggedright                        % disable text justification
\\pagestyle{empty}                   % disable page numbering

% ensure PDF output will be all-Unicode and machine-readable
\\input{glyphtounicode}
\\pdfgentounicode=1

% format section headings: bolding, size, white space above and below
\\titleformat{\\section}{\\bfseries\\large}{}{0pt}{}[\\vspace{1pt}\\titlerule\\vspace{-6.5pt}]

% format bullet points: size, white space above and below, white space between bullets
\\renewcommand\\labelitemi{$\\vcenter{\\hbox{\\small$\\bullet$}}$}
\\setlist[itemize]{itemsep=-2pt, leftmargin=12pt, topsep=7pt} %%% Test various topsep values to fix vertical spacing errors

% resume starts here
\\begin{document}

% name
\\centerline{\\Huge James P. Sullivan}

\\vspace{5pt}

% contact information
\\centerline{\\href{mailto:james.sullivan@monstersinc.com}{james.sullivan@monstersinc.com} | \\href{https://www.linkedin.com/in/sully-0834673}{linkedin.com/in/sully-0834673}}

\\vspace{-10pt}

\\section*{Summary}
{Expert scarer with more than 25 years of experience in terrifying children. Led scare metrics for 15 years.}
\\vspace{-10pt}

% experience section
\\section*{Experience}
\\textbf{Distinguished Scarer,} {Monsters, Inc.} -- Pixar Studios, USA \\hfill Feb. 1990 -- Present \\\\
\\vspace{-9pt}
\\begin{itemize}
  \\item Mentor developed synergies
  \\item Qualified balanced skill tactics
\\end{itemize}

\\end{document}
`

export default Preview