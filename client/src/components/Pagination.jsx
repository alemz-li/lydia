import { usePagination, DOTS } from "../hooks/usePagination";
const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className="flex h-8 w-full list-none justify-center dark:text-zinc-100">
      <li
        className={`mx-auto my-[4px] flex items-center py-3 ${
          currentPage === 1 ? "pointer-events-none text-zinc-400 " : ""
        }`}
        onClick={onPrevious}
      >
        <div className="mx-auto my-[4px] flex items-center py-3">&lt;</div>
      </li>
      {paginationRange.map((pageNumber, idx) => {
        if (pageNumber === DOTS) {
          return (
            <li className="mx-auto my-[4px] flex items-center py-3" key={idx}>
              &#8230;
            </li>
          );
        }

        return (
          <li
            className={`mx-auto my-[4px] flex cursor-pointer items-center p-3 ${
              pageNumber === currentPage
                ? "rounded-2xl bg-zinc-200 dark:bg-gray-600"
                : ""
            }`}
            key={idx}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={`mx-auto my-[4px] flex items-center py-3 ${
          currentPage === lastPage ? "pointer-events-none text-zinc-400 " : ""
        }`}
        onClick={onNext}
      >
        <div>&gt;</div>
      </li>
    </ul>
  );
};

export default Pagination;
