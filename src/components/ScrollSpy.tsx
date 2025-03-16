import { useEffect, useState } from 'react';
import { Section } from '../types';

interface ScrollSpyProps {
  sections: Section[];
  sectionTitles: Record<string, string>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  sectionRefs: React.RefObject<{ [key: string]: HTMLDivElement | null }>;
}

const ScrollSpy = ({ 
  sections, 
  sectionTitles, 
  containerRef, 
  sectionRefs 
}: ScrollSpyProps) => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const { scrollTop } = containerRef.current;
      const scrollPosition = scrollTop + 155; // Adding offset to improve detection

      // Find the section that is currently in view
      const activeSectionId = sections
        .filter(section => section.selected)
        .find(section => {
          const ref = sectionRefs.current[section.id];
          if (!ref) return false;
          
          const offsetTop = ref.offsetTop;
          const offsetHeight = ref.offsetHeight;
          
          return scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight;
        })?.id || '';
      
      if (activeSectionId !== activeSection) {
        setActiveSection(activeSectionId);
      }
    };

    const formContainer = containerRef.current;
    if (formContainer) {
      formContainer.addEventListener('scroll', handleScroll);
      // Initialize active section on mount
      handleScroll();
    }

    return () => {
      if (formContainer) {
        formContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [sections, activeSection, containerRef, sectionRefs]);

  const scrollToSection = (e: React.UIEvent<HTMLElement>, sectionId: string) => {
    e.preventDefault();

    const ref = sectionRefs.current[sectionId];
    if (ref && containerRef.current) {
      containerRef.current.scrollTo({
        top: ref.offsetTop - 10, // Small offset for better visual appearance
        behavior: 'instant'
      });
    }
  };

  return (
    <div className="
      sticky top-0 z-10 
      bg-white dark:bg-zinc-950 border-b border-gray-300 dark:border-zinc-800
      flex justify-center
      px-3 w-full">
      <ul className="flex flex-wrap w-full justify-between text-sm text-center">
        {sections
          .filter(section => section.selected)
          .map(section => (
            <li className="flex-grow" key={section.id}>
                <a href={section.href}
                   onClick={e => scrollToSection(e, section.id)}
                   className={`
                    w-full
                    inline-block p-5
                    text-gray-900 dark:text-gray-100
                    border-b-3 border-transparent
                    ${ activeSection === section.id
                      ? "active text-purple-800 dark:text-purple-100 border-purple-800! bg-purple-800/0 dark:bg-purple-800/0"
                      : "hover:bg-gray-50 dark:hover:bg-zinc-800 dark:hover:text-gray-200"}`}
                  >{sectionTitles[section.id] || section.id}</a>
            </li>
          ))}
    </ul>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default ScrollSpy;