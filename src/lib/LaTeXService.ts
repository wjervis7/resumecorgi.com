import { Experience, Education, Skill, FormData, Section } from "../types";

/**
 * Resume LaTeX Generator
 * Converts form data into LaTeX resume format
 */

export interface TemplateConfig {
  preamble: string;
  documentHeader: (name: string, contacts: string) => string;
  sectionFormatters: Record<string, SectionFormatter>;
  documentFooter: string;
}

export type SectionFormatter = (data: any, options?: any) => string;

class LaTeXUtils {
  /**
   * Generates appropriate href based on contact type
   */
  getHref(contact: string): string {
    if (contact.includes('@')) return `mailto:${contact}`;
    if (contact.includes('linkedin')) return `https://www.${contact.replace(/^(https?:\/\/)?(www\.)?/, '')}`;
    if (contact.includes('http')) return contact;
    return `https://${contact}`;
  }

  /**
   * Extracts bullet points from HTML content
   */
  extractBulletPoints(htmlContent?: string, defaultContent: string = ''): string {
    if (!htmlContent) return defaultContent;
    
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    
    return Array.from(tempDiv.querySelectorAll('li'))
      .map(li => li.textContent?.trim() || '')
      .filter(item => item && item.length > 0)
      .map(item => `  \\item ${item}`)
      .join('\n');
  }
  
  /**
   * Format LaTeX itemize environment
   */
  formatItemize(items: string, options: {vspaceBefore?: string, vspaceAfter?: string} = {}): string {
    const vspaceBefore = options.vspaceBefore || '-9pt';
    const vspaceAfter = options.vspaceAfter || '-4pt';
    
    return items && items.length > 0
      ? `\\begin{itemize}
\\vspace{${vspaceBefore}}
${items}
\\end{itemize}
\\vspace{${vspaceAfter}}`
      : "";
  }
  
  /**
   * Escape LaTeX special characters
   */
  escapeLaTeX(text: string): string {
    return text
      .replace(/\\/g, '\\textbackslash{}')
      .replace(/[&%$#_{}]/g, '\\$&')
      .replace(/\^/g, '\\textasciicircum{}')
      .replace(/~/g, '\\textasciitilde{}');
  }
}

// Section formatters as a class
class SectionFormatters {
  private utils: LaTeXUtils;
  
  constructor(utils: LaTeXUtils) {
    this.utils = utils;
  }

  /**
   * Formats summary section
   */
  formatSummary(summary?: string): string {
    if (!summary || !summary.length) {
      return '';
    }

    return `
\\section*{Summary}
{${summary}}
%\\vspace{-10pt}
`;
  }

  /**
   * Formats experience section
   */
  formatExperience(experience?: Experience[]): string {
    if (!experience || !experience.length) {
      return '';
    }

    const sectionHeading = `\\section*{Experience}
`;

    return sectionHeading + experience.map(job => {
      const title = job.title || 'Position Title';
      const company = job.company || 'Company Name';
      const dateRange = `${job.start || 'Start'} -- ${job.end || 'End'}`;
      const accomplishments = this.utils.extractBulletPoints(job.accomplishments);

      return `% experience section
\\textbf{${title},} {${company}} \\hfill ${dateRange} \\\\
${this.utils.formatItemize(accomplishments)}`;
    }).join('\n\n');
  }

  /**
   * Formats education section
   */
  formatEducation(education?: Education[]): string {
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
      const accomplishments = this.utils.extractBulletPoints(edu.accomplishments);

      const locationText = edu.location && edu.location.length > 0 ? ` -- ${edu.location}` : "";
      const mainLine = `\\textbf{${degree},} ${institution}${locationText} \\hfill ${year} \\\\`;
      const gpaLine = edu.gpa && edu.gpa.length > 0 ? `\\textbf{GPA:} ${edu.gpa} \\\\` : "";
      const isLastItem = index === education.length - 1;

      return `${mainLine}
${gpaLine}
${this.utils.formatItemize(accomplishments, {vspaceBefore: '-10pt'})}
\\vspace{${isLastItem ? `-5` : `3`}pt}`;
    }).join('\n\n');
  }

  /**
   * Formats skills section
   */
  formatSkills(skills?: Skill[]): string {
    if (!skills || !skills.length) {
      return '';
    }

    const sectionHeading = `% skills section
\\section*{Skills}
`;
      
    return sectionHeading + skills.map((skill) => {
      const category = skill.category || "Category";
      const skillsList = skill.skillList || "";

      return `\\textbf{${category}:} ${skillsList}`;
    }).join('\n\n');
  }
  
  /**
   * Formats projects section (example of adding a new section)
   */
  formatProjects(projects?: any[]): string {
    if (!projects || !projects.length) {
      return '';
    }

    const sectionHeading = `\\section*{Projects}
`;

    return sectionHeading + projects.map(project => {
      const title = project.title || 'Project Title';
      //const description = project.description || '';
      const technologies = project.technologies || '';
      const url = project.url || '';
      
      const urlLine = url ? `\\href{${this.utils.getHref(url)}}{${url}} \\\\` : '';
      const techLine = technologies ? `\\textbf{Technologies:} ${technologies} \\\\` : '';
      const details = this.utils.extractBulletPoints(project.details);

      return `\\textbf{${title}} \\hfill ${project.date || ''} \\\\
${urlLine}
${techLine}
${this.utils.formatItemize(details)}`;
    }).join('\n\n');
  }
}

// Template registry
class TemplateRegistry {
  private templates: Record<string, TemplateConfig> = {};
  
  register(name: string, template: TemplateConfig): void {
    this.templates[name] = template;
  }
  
  get(name: string): TemplateConfig {
    if (!this.templates[name]) {
      throw new Error(`Template "${name}" not found`);
    }
    return this.templates[name];
  }
  
  getAvailableTemplates(): string[] {
    return Object.keys(this.templates);
  }
}

// Define standard template
const standardTemplate: TemplateConfig = {
  preamble: `\\documentclass[11pt]{article}
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
\\setlist[itemize]{itemsep=-2pt, leftmargin=12pt, topsep=7pt}`,
  
  documentHeader: (name: string, contacts: string) => `
\\begin{document}

% name
\\centerline{\\Huge ${name}}

\\vspace{5pt}

% contact information
\\centerline{${contacts}}
`,
  
  sectionFormatters: {},  // Will be populated with formatters
  
  documentFooter: `
\\end{document}`
};

// Main Generator class
class LaTeXResumeGenerator {
  private utils: LaTeXUtils;
  private formatters: SectionFormatters;
  private templateRegistry: TemplateRegistry;
  
  constructor() {
    this.utils = new LaTeXUtils();
    this.formatters = new SectionFormatters(this.utils);
    this.templateRegistry = new TemplateRegistry();
    
    // Register default template
    const defaultTemplate = {...standardTemplate};
    defaultTemplate.sectionFormatters = {
      summary: this.formatters.formatSummary.bind(this.formatters),
      experience: this.formatters.formatExperience.bind(this.formatters),
      education: this.formatters.formatEducation.bind(this.formatters),
      skills: this.formatters.formatSkills.bind(this.formatters),
      projects: this.formatters.formatProjects.bind(this.formatters)
    };
    
    this.templateRegistry.register('standard', defaultTemplate);
  }
  
  /**
   * Generates LaTeX from form data
   */
  generateLaTeX(formData: FormData, selectedSections: Section[], templateName = 'standard'): string {
    const template = this.templateRegistry.get(templateName);
    const sortedSections = [...selectedSections].sort((a, b) => a.sortOrder - b.sortOrder);
    
    const name = formData.personalInfo.name || 'Your Name';
    
    // Format contacts
    const contacts = [
      formData.personalInfo.contact0,
      formData.personalInfo.contact1,
      formData.personalInfo.contact2
    ].filter(Boolean);
    
    // Format contact line
    const contactLine = contacts.length > 0 
      ? contacts.map(c => `\\href{${this.utils.getHref(c)}}{${c}}`).join(' | ')
      : 'your.email@example.com';
    
    // Start building document
    let output = template.preamble;
    output += template.documentHeader(name, contactLine);
    
    // Add summary if included
    if (formData.personalInfo.summary) {
      output += this.formatters.formatSummary(formData.personalInfo.summary);
    }
    
    // Add selected sections
    output += sortedSections
      .filter(section => section.selected && template.sectionFormatters[section.id])
      .map((section, index) => {
        const formatter = template.sectionFormatters[section.id];
        const sectionContent = formatter(formData[section.id as keyof FormData]);
        
        // If not the first section and not empty, ensure consistent spacing
        if (index > 0 && sectionContent.trim().length > 0) {
          // Ensure section starts with proper spacing
          if (!sectionContent.startsWith('\n\n')) {
            return `\n\n${sectionContent}`;
          }
        }
        return sectionContent;
      })
      .join('\n');
    
    output += template.documentFooter;
    
    return output;
  }
  
  /**
   * Register a new template
   */
  registerTemplate(name: string, template: TemplateConfig): void {
    this.templateRegistry.register(name, template);
  }
  
  /**
   * Get available template names
   */
  getAvailableTemplates(): string[] {
    return this.templateRegistry.getAvailableTemplates();
  }
  
  /**
   * Get utils for external use
   */
  getUtils(): LaTeXUtils {
    return this.utils;
  }
  
  /**
   * Add a new section formatter to a template
   */
  addSectionFormatter(templateName: string, sectionId: string, formatter: SectionFormatter): void {
    const template = this.templateRegistry.get(templateName);
    template.sectionFormatters[sectionId] = formatter;
  }
}

// Export the generator
export const latexGenerator = new LaTeXResumeGenerator();

// Backward compatibility for legacy code
export function createLaTeXFromFormData(formData: FormData, selectedSections: Section[]): string {
  return latexGenerator.generateLaTeX(formData, selectedSections);
}

export { LaTeXUtils, SectionFormatters };