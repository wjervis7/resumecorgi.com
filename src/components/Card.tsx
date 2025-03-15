import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  rightElement?: ReactNode;
}

function Card({
  children,
  rightElement
}: CardProps) {
  return (
    <div className="flex flex-co w-full mb-3 xs:flex-row">
      <div className="w-full sm:mb-0">
        <div className="relative h-full ml-0 mr-0">
          <span className="hidden absolute top-0 left-0 w-full h-full mt-1 bg-black dark:bg-zinc-100 rounded-xl"></span>
          <div className="relative h-full p-5 bg-white dark:bg-zinc-900 border-1 border-gray-400 dark:border-zinc-700 rounded-xl px-3 py-3.5">
            {children}
          </div>
          {rightElement && (
            <div className="absolute right-8 top-6">
              {rightElement}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;