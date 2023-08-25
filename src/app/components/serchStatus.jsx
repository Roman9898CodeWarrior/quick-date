import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
  function renderPhrase(num) {
    const lastOne = Number(num.toString().slice(-1));
    if (num > 4 && num < 20) return `${num} человек тусанет с тобой сегодня`;
    if ([2, 3, 4].indexOf(lastOne) >= 0)
      return `${num} человека тусанут с тобой сегодня`;
    if (lastOne === 1) return `${num} человек тусанет с тобой сегодня`;
  }

  return (
    <h2>
      <span className={"badge " + (length > 0 ? "bg-primary" : "bg-danger")}>
        {length > 0 ? renderPhrase(length) : "Никто с тобой не тусанет"}
      </span>
    </h2>
  );
};

SearchStatus.propTypes = {
  length: PropTypes.number.isRequired,
};

export default SearchStatus;
