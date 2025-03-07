import { useEffect, useState } from "react";

function Preview() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [engine, setEngine] = useState(null);

  useEffect(() => {
    let mounted = true;

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

        let r = await pdfTeXEngine.compileLaTeX();

        console.log(r);

        setIsLoading(false);
      } catch (err) {
        if (mounted) {
          console.error("Failed to initialize PdfTeXEngine:", err);
          setError(`Failed to initialize LaTeX engine: ${err.message}`);
          setIsLoading(false);
        }
      }
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
          <p className="text-white">Loading...</p>
        </>
      )}

      {!isLoading && (
        <>
          <p className="text-white">Loaded</p>
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
\\centerline{\\Huge Chad Golden}

\\vspace{5pt}

% contact information
\\centerline{\\href{mailto:chad@chadgolden.com}{chad@chadgolden.com} | \\href{https://github.com/chadgolden1}{github.com/chadgolden1} | \\href{https://www.linkedin.com/in/chad-golden-979383171}{linkedin.com/in/chad-golden-979383171}}

\\vspace{-10pt}

\\section*{Summary}
{Software Engineer with 10 years of experience driving multi-million-dollar cost savings and performance improvements. Passionate about creating optimized experiences that deliver measurable business value through technical excellence in code, cloud, and DevOps practices.}
\\vspace{-10pt}

% experience section
\\section*{Experience}
\\textbf{Senior Software Engineer,} {U.S. Office of Personnel Management (OPM)} -- Remote, USA \\hfill Feb. 2021 -- Feb. 2025 \\\\
\\vspace{-9pt}
\\begin{itemize}
  \\item Created petabyte-scale data pipelines using JavaScript, resulting in optimal networking bandwith usage
  \\item Created and enhanced features for large-scale transactional web application for 500K+ customers using JavaScript/TypeScript, resulting in 25\\% increase in customer satisfaction surveys
  \\item Executed a \\$35 million/year system migration to cloud platforms, achieving \\$2+ million annual savings through storage, network optimization, infrastructure automation, and configuration management
  \\item Integrated Akamai CDN products e.g. App \\& API Protector and Edge DNS to optimize content delivery of large enterprise web application, reducing outbound network bandwidth consumption by 98\\%
  \\item Scaled mission-critical web application, resulting in 100X increases in concurrent users by optimizing reporting and data analysis SQL queries through use of ETL data pipeline buildout
  \\item Architected 5+ million daily transaction asynchronous processing pipeline using concurrent, multi-threaded programming patterns (e.g. JavaScript/Java), resulting in 95\\% end-to-end latency reductions
  \\item Modernized .NET/C\\#/JavaScript applications to run cross-platform (Linux/UNIX), resulting in immediate savings of 50\\% in cloud computing costs using Linux hosts
  \\item Onboarded 40+ web applications to enterprise observability solution using OpenTelemetry/KQL, resulting in 25\\% reductions in time-to-repair metrics and increased ability to performance tune, troubleshoot applications
\\end{itemize}

\\end{document}
`

export default Preview