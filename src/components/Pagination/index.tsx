interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 8;

    for (let i = 1; i <= Math.min(maxVisiblePages, totalPages); i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm
            ${
              currentPage === i
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex items-center gap-2 mt-8 w-full justify-center">
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg disabled:opacity-50"
      >
        <span className="sr-only">Anterior</span>←
      </button>

      {renderPageNumbers()}

      <button
        onClick={() =>
          currentPage < totalPages && onPageChange(Number(currentPage) + 1)
        }
        className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg disabled:opacity-50"
      >
        <span className="sr-only">Próximo</span>→
      </button>
    </div>
  );
}
