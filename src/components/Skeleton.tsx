interface SkeletonProps {
  width?: string | number;
  height?: string | number;
}

function Skeleton({ width }: SkeletonProps) {
  const displayWidth = width || "100%";
  
  return (  
    <div className="animate-[pulse_5s_ease-in-out_infinite] brightness-85 w-full">
      <h2 className="sr-only">Your resume is rendering now. Please sit tight.</h2>
      <div
        style={{
          width: displayWidth,
          maxWidth: "800px",
          aspectRatio: "8.5/11" // Ensures ratio is maintained
        }} 
        className="mx-auto shadow-md shadow-slate-800 dark:shadow-slate-600 bg-white">
        <div className="flex animate-pulse space-x-4">
          <div className="flex-1 space-y-6 p-10">
            <div className="rounded bg-black w-50 h-5 justify-self-center mb-3"></div>
            <div className="grid grid-cols-12 gap-4 mb-10">
              <div className="col-span-2 h-2"></div>
              <div className="col-span-3 h-1 rounded bg-black"></div>
              <div className="col-span-2 h-1 rounded bg-black"></div>
              <div className="col-span-3 h-1 rounded bg-black"></div>
              <div className="col-span-1 h-1"></div>
            </div>
            <div className="grid grid-cols-5 gap-4 mb-5">
              <div className="col-span-1 h-2 rounded bg-black"></div>
            </div>
            <div className="space-y-3 mb-10">
              <div className="grid grid-cols-5 gap-4">
                <div className="col-span-5 h-1 rounded bg-black"></div>
                <div className="col-span-4 h-1 rounded bg-black"></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-10 gap-4 mb-5">
                <div className="col-span-3 h-2 rounded bg-black"></div>
                <div className="col-span-2 h-1 rounded bg-black"></div>
                <div className="col-span-3 h-2"></div>
                <div className="col-span-2 h-2 rounded bg-black"></div>
              </div>
            </div>
            <div className="space-y-3 mb-10">
              <div className="ms-3 grid grid-cols-5 gap-4 mb-5">
                <div className="col-span-5 h-1 rounded bg-black"></div>
                <div className="col-span-4 h-1 rounded bg-black"></div>
              </div>
              <div className="ms-3 grid grid-cols-5 gap-4 mb-5">
                <div className="col-span-5 h-1 rounded bg-black"></div>
                <div className="col-span-3 h-1 rounded bg-black"></div>
              </div>
              <div className="ms-3 grid grid-cols-7 gap-4 mb-5">
                <div className="col-span-6 h-1 rounded bg-black"></div>
              </div>
              <div className="ms-3 grid grid-cols-5 gap-4 mb-5">
                <div className="col-span-5 h-1 rounded bg-black"></div>
                <div className="col-span-2 h-1 rounded bg-black"></div>
              </div>
              <div className="ms-3 grid grid-cols-8 gap-4 mb-5">
                <div className="col-span-8 h-1 rounded bg-black"></div>
                <div className="col-span-6 h-1 rounded bg-black"></div>
              </div>
              <div className="ms-3 grid grid-cols-10 gap-4 mb-5">
                <div className="col-span-10 h-1 rounded bg-black"></div>
                <div className="col-span-9 h-1 rounded bg-black"></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-10 gap-4 mb-5">
                <div className="col-span-2 h-2 rounded bg-black"></div>
                <div className="col-span-3 h-1 rounded bg-black"></div>
                <div className="col-span-3 h-2"></div>
                <div className="col-span-2 h-2 rounded bg-black"></div>
              </div>
            </div>
            <div className="space-y-3 mb-10">
              <div className="ms-3 grid grid-cols-5 gap-4 mb-5">
                <div className="col-span-5 h-1 rounded bg-black"></div>
                <div className="col-span-4 h-1 rounded bg-black"></div>
              </div>
              <div className="ms-3 grid grid-cols-5 gap-4 mb-5">
                <div className="col-span-5 h-1 rounded bg-black"></div>
                <div className="col-span-3 h-1 rounded bg-black"></div>
              </div>
              <div className="ms-3 grid grid-cols-7 gap-4 mb-5">
                <div className="col-span-6 h-1 rounded bg-black"></div>
              </div>
              <div className="ms-3 grid grid-cols-5 gap-4 mb-5">
                <div className="col-span-5 h-1 rounded bg-black"></div>
                <div className="col-span-2 h-1 rounded bg-black"></div>
              </div>
              <div className="ms-3 grid grid-cols-8 gap-4 mb-5">
                <div className="col-span-8 h-1 rounded bg-black"></div>
                <div className="col-span-6 h-1 rounded bg-black"></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-10 gap-4 mb-5">
                <div className="col-span-3 h-2 rounded bg-black"></div>
                <div className="col-span-2 h-1 rounded bg-black"></div>
                <div className="col-span-3 h-2"></div>
                <div className="col-span-2 h-2 rounded bg-black"></div>
              </div>
            </div>
            <div className="ms-3 grid grid-cols-7 gap-4 mb-5">
              <div className="col-span-6 h-1 rounded bg-black"></div>
            </div>
            <div className="ms-3 grid grid-cols-5 gap-4 mb-5">
              <div className="col-span-5 h-1 rounded bg-black"></div>
              <div className="col-span-2 h-1 rounded bg-black"></div>
            </div>
            <div className="ms-3 grid grid-cols-8 gap-4 mb-5">
              <div className="col-span-8 h-1 rounded bg-black"></div>
              <div className="col-span-6 h-1 rounded bg-black"></div>
            </div>
            <div className="ms-3 grid grid-cols-5 gap-4">
              <div className="col-span-5 h-1 rounded bg-black"></div>
              <div className="col-span-3 h-1 rounded bg-black"></div>
            </div>
            <div className="space-y-3 mb-10">
              <div className="ms-3 grid grid-cols-5 gap-4 mb-5">
                <div className="col-span-5 h-1 rounded bg-black"></div>
                <div className="col-span-4 h-1 rounded bg-black"></div>
              </div>
              <div className="ms-3 grid grid-cols-5 gap-4 mb-5">
                <div className="col-span-5 h-1 rounded bg-black"></div>
                <div className="col-span-3 h-1 rounded bg-black"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Skeleton;