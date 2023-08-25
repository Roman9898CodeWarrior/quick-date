import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
  function handleSort(char) {
    if (selectedSort.path === char) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === "asc" ? "desc" : "asc",
      });
    } else {
      onSort({ path: char, order: "asc" });
    }
  }

  function renderIcon() {
    return selectedSort.order === "asc" ? (
      <i className="bi bi-caret-up-fill ms-2"></i>
    ) : (
      <i className="bi bi-caret-down-fill ms-2"></i>
    );
  }

  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            key={column}
            onClick={() =>
              columns[column].path && handleSort(columns[column].path)
            }
            role={columns[column].path && "button"}
            scope="col"
          >
            {columns[column].name}
            {columns[column].path &&
              columns[column].path === selectedSort.path &&
              renderIcon()}
          </th>
        ))}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired,
};

export default TableHeader;
