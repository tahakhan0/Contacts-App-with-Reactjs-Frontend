import React from "react";

const Pagination = ({ numOfItems, pageSize, currentPage, onPageChange }) => {
  const pageCount = Math.ceil(numOfItems / pageSize);
  const pages = rangefunc(1, pageCount);
  if (pageCount === 1) return null;
  return (
    <nav className="mt-2">
      <ul className="pagination">
        {pages.map((pageNumber) => (
          <li
            key={pageNumber}
            className={
              currentPage === pageNumber ? "page-item active" : "page-item"
            }
            onClick={() => onPageChange(pageNumber)}
          >
            <a className="page-link">{pageNumber}</a>
          </li>
        ))}
      </ul>
    </nav>
  );

  function rangefunc(start, end) {
    var arr = [];
    for (let i = start; i <= end; i++) {
      arr.push(i);
    }
    return arr;
  }
};

export default Pagination;
