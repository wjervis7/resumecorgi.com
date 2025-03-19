# resumecorgi.com 🐶
Create professional, modern resumes without compromising your privacy. Resume Corgi is a browser-based tool that handles everything locally. Your data never leaves your device (unless you want it too!).

## Why Resume Corgi?
- **Secure & Private** - No cloud storage or tracking, all processing happens on your machine
- **ATS-optimized** - Templates designed to navigate applicant tracking systems effectively
- **Intuitive design** - Clean drag-and-drop interface with real-time preview
- **Device agnostic** - Works smoothly across desktop, tablet, and mobile

## Tech Stack

Built with Vite, React 19, TypeScript, and Tailwind CSS, alongside several other great libraries:
- SwiftLaTeX for in-browser, WASM-based LaTeX compilation
- PDF.js for seamless document generation
- DND Kit for responsive drag-and-drop functionality
- shadn/ui for accessible component architecture

## Quick Start
Prerequisites: Node.js (LTS version) and npm

```bash
# Get the code
git clone https://github.com/chadgolden1/resumecorgi.com.git
cd resumecorgi.com

# Set things up
npm install

# Run the development server
npm run dev

# Browse to http://localhost:5173
```

## Other Useful Commands

```bash
npm run build    # Ship it
npm run preview  # Check the production build
npm run lint     # Catch mistakes
npm test         # Make sure nothing's broken
```

## Contributing
Contributions are welcome! Feel free to open a PR and we'll collaborate from there.

## License
Apache License 2.0 — see the LICENSE file for details.

## Acknowledgments
- MANY thanks to the SwiftLaTeX team for their excellent in-browser LaTeX engine
- The r/EngineeringResumes community for their inspiration and resources on resume creation
- The r/EngineeringResumes template, see https://www.overleaf.com/project/662939053eb1dc8f0f3c617f