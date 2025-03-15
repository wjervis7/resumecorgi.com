import { PdfTeXEngine } from '../types'

const EngineManager = (() => {
  let instance: PdfTeXEngine | null = null;
  let isLoading = false;
  let engineReady = false;
  let loadPromise: Promise<PdfTeXEngine> | null = null;

  // Set up PDF.js worker once for the entire application
  window.pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${window.pdfjsLib.version}/pdf.worker.min.mjs`;

  const loadScript = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Check if script already exists
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.type = "text/javascript";
      
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      
      document.body.appendChild(script);
    });
  };

  const initialize = async (): Promise<PdfTeXEngine> => {
    if (engineReady) return Promise.resolve(instance!);
    if (loadPromise) return loadPromise;

    isLoading = true;
    loadPromise = (async () => {
      try {
        await loadScript("PdfTeXEngine.js");
        
        const pdfTeXEngine = new window.PdfTeXEngine();
        await pdfTeXEngine.loadEngine();
        
        instance = pdfTeXEngine;
        engineReady = true;
        isLoading = false;
        
        return instance;
      } catch (err) {
        isLoading = false;
        engineReady = false;
        loadPromise = null;
        console.error("Failed to initialize PdfTeXEngine:", err);
        throw err;
      }
    })();

    return loadPromise;
  };

  return {
    getInstance: initialize,
    isReady: () => engineReady,
    isLoading: () => isLoading
  };
})();

export default EngineManager;