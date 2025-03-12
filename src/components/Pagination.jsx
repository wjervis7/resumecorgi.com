import Button from './Button.jsx'

function Pagination({ 
  currentPage, 
  totalPages, 
  onPrevious,
  onNext
}) {
  return (
    <div class="flex flex-col items-center">
      <div class="inline-flex">
          <div className={ currentPage > 1 ? "visible" : "invisible" }>
            <Button text="Prev" theme="interaction" onClick={onPrevious} />
          </div>
          <span class="text-sm text-white dark:text-gray-200 mt-2 mx-2.5">
              Page <span class="font-semibold text-white dark:text-white">{ currentPage }</span> of <span class="font-semibold text-white dark:text-white">{ totalPages }</span>
          </span>
          <div className={ currentPage < totalPages ? "visible" : "invisible" }>
            <Button text="Next" theme="interaction" onClick={onNext} />
          </div>
      </div>
    </div>
  );
}

export default Pagination;