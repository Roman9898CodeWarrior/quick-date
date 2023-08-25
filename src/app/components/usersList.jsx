import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import API from "../API";
import Pagination from "./pagination";
import paginate from "../utils/paginate";
import GroupsList from "./groupsList";
import UsersTable from "./usersTable";
import SearchStatus from "./serchStatus";

const UsersList = () => {
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const [users, setUsers] = useState();

  useEffect(() => {
    API.users.fetchAll().then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    API.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  function handleDelete(userId) {
    setUsers(users.filter((user) => user._id !== userId));
  }

  function handleToggleBookmark(id) {
    setUsers(
      users.map((user) => {
        if (user._id === id) {
          return { ...user, bookmark: !user.bookmark };
        }
        return user;
      })
    );
  }

  function handleProfessionSelect(item) {
    setSelectedProf(item);
  }

  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
  }

  function clearFilter() {
    setSelectedProf();
  }

  function handleSort(item) {
    setSortBy(item);
  }

  if (users) {
    const filtredUsers = selectedProf
      ? users.filter(
          (user) =>
            JSON.stringify(user.profession) === JSON.stringify(selectedProf)
        )
      : users;
    const count = filtredUsers.length;
    const sortedUsers = _.orderBy(filtredUsers, [sortBy.path], [sortBy.order]);
    const usersOnPage = paginate(sortedUsers, currentPage, pageSize);

    return (
      <div className="d-flex justify-content-center">
        {professions && (
          <div className="d-flex flex-column flex-shrink-0 pt-3 me-4">
            <GroupsList
              items={professions}
              selectedItem={selectedProf}
              onItemSelect={handleProfessionSelect}
            />
            <button className="btn btn-warning mt-2" onClick={clearFilter}>
              Очистить фильтр
            </button>
          </div>
        )}
        <div className="d-flex flex-column align-items-center">
          <SearchStatus length={count} />
          {count > 0 && (
            <UsersTable
              users={usersOnPage}
              onSort={handleSort}
              selectedSort={sortBy}
              onDelete={handleDelete}
              onToggleBookMark={handleToggleBookmark}
            />
          )}
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }

  return "loading...";
};

UsersList.propTypes = {
  users: PropTypes.array,
};

export default UsersList;
