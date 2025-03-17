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
    <div className="flex flex-co w-full mb-4 xs:flex-row">
      <div className="w-full sm:mb-0">
        <div className="relative h-full ml-0 mr-0">
          <span className="absolute top-0 left-0 w-full h-full mt-[0.225rem] ms-[0.225rem] bg-black rounded-xl"></span>
          <div className="relative h-full p-5 bg-white dark:bg-zinc-900 border-1 border-black rounded-xl px-4 py-4.5">
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