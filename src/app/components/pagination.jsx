import React from "react";
import PropTypes from "prop-types";

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;
  const pages = [];
  for (let index = 1; index <= pageCount; index++) {
    pages.push(index);
  }

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => {
          return (
            <li
              className={"page-item " + (page === currentPage ? "active" : "")}
              key={"page " + page}
            >
              <button className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
