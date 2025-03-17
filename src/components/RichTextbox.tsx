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
          bg-gray-50 dark:bg-zinc-800
          border-1 border-gray-200 dark:border-zinc-700 rounded-lg
          hover:border-purple-200 dark:hover:border-purple-600
          hover:bg-purple-50 dark:hover:bg-purple-900
          focus:outline-purple-600/75 focus:outline-3 focus:border-purple-600/75 focus:ring-purple-600/75 dark:focus:border-purple-600/75 dark:focus:border-transparent
          focus:bg-purple-50 dark:focus:bg-purple-950 list-disc list-inside"
        contentEditable
        suppressContentEditableWarning={true}
        onInput={onInput}
      >
      </section>
    </>
  );
}

export default RichTextbox;