import React, { useRef, useEffect } from 'react';

interface RichTextboxProps {
  content?: string;
  onInput?: (event: React.FormEvent<HTMLElement>) => void;
}

function RichTextbox({ content, onInput }: RichTextboxProps) {
  const mounted = useRef<boolean>(false);
  const editableRef = useRef<HTMLElement | null>(null);

  const getInitialContent = (): string => content || '<ul><li></li></ul>';

  // Set initial content on first render
  useEffect(() => {
    if (!mounted.current && editableRef.current) {
      editableRef.current.innerHTML = getInitialContent();
    }

    // ensure if field is empty we start with bullets
    if (editableRef.current && (!content || !content.includes('<li>'))) {
      editableRef.current.innerHTML = '<ul><li></li></ul>';
    }

    mounted.current = true;
  });

  return (
    <>
      <section
        ref={editableRef}
        className="
          relative w-full px-3 py-3 text-sm text-black dark:text-white 
          bg-slate-50 dark:bg-zinc-900 
          border-1 border-black dark:border-zinc-500 rounded-lg
          hover:border-lime-500 dark:hover:border-lime-400
          hover:bg-lime-50 dark:hover:bg-lime-950
          focus:outline-lime-500 focus:outline-3 focus:border-lime-500 focus:ring-lime-500 dark:focus:border-lime-300 dark:focus:border-transparent
          focus:bg-lime-50 dark:focus:bg-lime-950 list-disc list-inside"
        contentEditable
        suppressContentEditableWarning={true}
        onInput={onInput}
      >
      </section>
    </>
  );
}

export default RichTextbox;