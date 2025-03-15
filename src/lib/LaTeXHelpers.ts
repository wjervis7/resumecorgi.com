import { Experience, Education, Skill, FormData, Section } from "../types";

/**
 * Resume LaTeX Generator
 * Converts form data into LaTeX resume format
 */

// Helper functions
const utils = {
  /**
   * Generates appropriate href based on contact type
   * @param {string} contact - Contact information (email, URL, etc.)
   * @returns {string} Formatted href
   */
  getHref: (contact: string): string => {
    if (contact.includes('@')) return `mailto:${contact}`;
    if (contact.includes('linkedin')) return `https://www.${contact.replace(/^(https?:\/\/)?(www\.)?/, '')}`;
    if (contact.includes('http')) return contact;
    return `https://${contact}`;
  },

  /**
   * Extracts bullet points from HTML content
   * @param {string} htmlContent - HTML containing bullet points
   * @returns {string} Formatted LaTeX bullet points
   */
  extractBulletPoints: (htmlContent?: string, defaultContent: string = ''): string => {
    if (!htmlContent) return defaultContent;
    
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    
    return Array.from(tempDiv.querySelectorAll('li'))
      .map(li => li.textContent?.trim() || '')
      .filter(item => item && item.length > 0)
      .map(item => `  \\item ${item}`)
      .join('\n');
  }
};

// Section formatters
const formatters = {
  /**
   * Formats summary section
   * @param {string} summary - Summary text
   * @returns {string} Formatted LaTeX summary section
   */
  formatSummary: (summary?: string): string => {
    if (!summary || !summary.length) {
      return '';
    }

    return `
\\section*{Summary}
{${summary}}
%\\vspace{-10pt}`;
  },

  /**
   * Formats experience section
   * @param {Array} experience - Array of experience objects
   * @returns {string} Formatted LaTeX experience section
   */
  formatExperience: (experience?: Experience[]): string => {
    if (!experience || !experience.length) {
      return '';
    }

    const sectionHeading = `\\section*{Experience}
`;

    return sectionHeading + experience.map(job => {
      const title = job.title || 'Position Title';
      const company = job.company || 'Company Name';
      const dateRange = `${job.start || 'Start'} -- ${job.end || 'End'}`;
      const accomplishments = utils.extractBulletPoints(
        job.accomplishments, 
        //'<ul><li>Describe your responsibilities and achievements, quantified if possible</li></ul>'
      );

      return `% experience section
\\textbf{${title},} {${company}} \\hfill ${dateRange} \\\\
${accomplishments && accomplishments.length > 0
     ? `\\begin{itemize}
\\vspace{-9pt}
${accomplishments}
\\end{itemize}
\\vspace{-4pt}`
    : ""}`;
    }).join('\n\n');
  },

  /**
   * Formats education section
   * @param {Array} education - Array of education objects
   * @returns {string} Formatted LaTeX education section
   */
  formatEducation: (education?: Education[]): string => {
    if (!education || !education.length) {
      return '';
    }
    
    const sectionHeading = `% education section
% \\vspace{-5pt}
\\section*{Education}`;

    return sectionHeading + education.map((edu, index) => {
      const degree = edu.degree || 'Degree';
      const institution = edu.institution || 'Institution';
      const year = edu.graduationDate || 'Year';
      const accomplishments = utils.extractBulletPoints(
        edu.accomplishments,
        //'<ul><li>Describe your honors or achievements, if applicable</li></ul>'
      );

      const locationText = edu.location && edu.location.length > 0 ? ` -- ${edu.location}` : "";
      const mainLine = `\\textbf{${degree},} ${institution}${locationText} \\hfill ${year} \\\\`;
      const gpaLine = edu.gpa && edu.gpa.length > 0 ? `\\textbf{GPA:} ${edu.gpa} \\\\` : "";
      const isLastItem = index === education.length - 1;

      return `${mainLine}
${gpaLine}
${accomplishments && accomplishments.length > 0
     ? `\\begin{itemize}
\\vspace{-10pt}
${accomplishments}
\\end{itemize}
\\vspace{-4pt}`
    : ""}
\\vspace{${isLastItem ? `-5` : `3`}pt}`;
    }).join('\n\n');
  },

  /**
   * Formats skills section
   * @param {Array} skills - Array of skill category objects
   * @returns {string} Formatted LaTeX skills section
   */
  formatSkills: (skills?: Skill[]): string => {
    if (!skills || !skills.length) {
      return '';
    }

    const sectionHeading = `% skills section
% \\vspace{-5pt}
\\section*{Skills}
%\\vspace{20pt}
`;
      
    return sectionHeading + skills.map((skill) => {
      const category = skill.category || "Category";
      const skillsList = skill.skillList || "";

      return `\\textbf{${category}:} ${skillsList}`;
    }).join('\n\n');
  }
};

// Main function
/**
 * Creates LaTeX document from form data
 * @param {Object} formData - Resume form data
 * @param {Array} selectedSections - Sections to include in resume
 * @returns {string} Complete LaTeX document
 */
function createLaTeXFromFormData(formData: FormData, selectedSections: Section[]): string {
  const sortedSections = [...selectedSections].sort((a, b) => a.sortOrder - b.sortOrder);

  const name = formData.personalInfo.name || 'Your Name';
  
  // Format contacts (filtering out empty ones)
  const contacts = [
    formData.personalInfo.contact0,
    formData.personalInfo.contact1,
    formData.personalInfo.contact2
  ].filter(Boolean);
  
  // Format contact line
  const contactLine = contacts.length > 0 
    ? contacts.map(c => `\\href{${utils.getHref(c)}}{${c}}`).join(' | ')
    : 'your.email@example.com';

  const sectionFunctionMapping = [
    { id: 'experience', renderFunc: () => formatters.formatExperience(formData.experience) },
    { id: 'education', renderFunc: () => formatters.formatEducation(formData.education) },
    { id: 'skills', renderFunc: () => formatters.formatSkills(formData.skills) },
  ];

  const renderedSections = sortedSections
    .map(section => {
      if (sectionFunctionMapping.some(sfm => sfm.id === section.id && section.selected)) {
        return sectionFunctionMapping.find(s => s.id === section.id)?.renderFunc() || "";
      }
      return "";
    })
    .join('\n');

  return `
\\documentclass[11pt]{article}
\\usepackage[letterpaper, top=0.5in, bottom=0.5in, left=0.5in, right=0.5in]{geometry}
\\usepackage{XCharter}
\\usepackage[T1]{fontenc}
\\usepackage[utf8]{inputenc}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{titlesec}
\\raggedright
\\pagestyle{empty}

\\input{glyphtounicode}
\\pdfgentounicode=1

\\titleformat{\\section}{\\bfseries\\large}{}{0pt}{}[\\vspace{1pt}\\titlerule\\vspace{-6.5pt}]
\\titlespacing{\\section}{0pt}{10pt}{12pt}
\\renewcommand\\labelitemi{$\\vcenter{\\hbox{\\small$\\bullet$}}$}
\\setlist[itemize]{itemsep=-2pt, leftmargin=12pt, topsep=7pt}

\\begin{document}

% name
\\centerline{\\Huge ${name}}

\\vspace{5pt}

% contact information
\\centerline{${contactLine}}

%\\vspace{-10pt}

${formatters.formatSummary(formData.personalInfo.summary)}

${renderedSections}

\\end{document}
`;
}

// Export functions
export {
  createLaTeXFromFormData,
  utils,
  formatters
};

export type { Section };
