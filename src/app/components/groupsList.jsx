import React from "react";
import PropTypes from "prop-types";

const GroupsList = ({
  items,
  valueProperty,
  contentProperty,
  selectedItem,
  onItemSelect,
}) => {
  function handleObject(items) {
    return Object.keys(items).map((item) => (
      <li
        className={
          "list-group-item" + (items[item] === selectedItem ? " active" : "")
        }
        key={items[item][valueProperty]}
        onClick={() => onItemSelect(items[item])}
        role="button"
      >
        {items[item][contentProperty]}
      </li>
    ));
  }

  function handleArray(items) {
    return items.map((item) => (
      <li
        className={"list-group-item" + (item === selectedItem ? " active" : "")}
        key={item[valueProperty]}
        onClick={() => onItemSelect(item)}
        role="button"
      >
        {item[contentProperty]}
      </li>
    ));
  }

  return (
    <ul className="list-group">
      {typeof items === "object" ? handleObject(items) : handleArray(items)}
    </ul>
  );
};

GroupsList.defaultProps = {
  valueProperty: "_id",
  contentProperty: "name",
};

GroupsList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  valueProperty: PropTypes.string.isRequired,
  contentProperty: PropTypes.string.isRequired,
  selectedItem: PropTypes.object,
  onItemSelect: PropTypes.func.isRequired,
};

export default GroupsList;
