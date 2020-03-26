import React from 'react';

const Pagination = ({
  total,
  pageSize,
  onPageChange,
  currentPage
}) => {
  const pagesCount = Math.ceil(total / pageSize);

  if (pagesCount === 1) return null;

  const pages = [...Array(pagesCount)].map(
    (item, index) => index + 1
  );

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={`page-item ${currentPage === page &&
              'active'}`}
          >
            <button
              className="btn btn-primary"
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
