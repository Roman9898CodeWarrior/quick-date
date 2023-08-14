import React, { useState } from "react";
import API from "../API";

const Users = () => {
  const [users, setUsers] = useState(API.users.fetchAll());

  function handleDelete(id) {
    setUsers(users.filter((user) => user._id !== id));
  }

  function renderPhrase(num) {
    const lastOne = Number(num.toString().slice(-1));
    if (num > 4 && num < 20) return `${num} человек тусанет с тобой сегодня`;
    if ([2, 3, 4].indexOf(lastOne) >= 0)
      return `${num} человека тусанут с тобой сегодня`;
    if (lastOne === 1) return `${num} человек тусанет с тобой сегодня`;
  }

  return (
    <>
      <h2>
        <span
          className={"badge " + (users.length > 0 ? "bg-primary" : "bg-danger")}
        >
          {users.length > 0
            ? renderPhrase(users.length)
            : "Никто с тобой не тусанет"}
        </span>
      </h2>
      {users.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                  {user.qualities.map((item) => (
                    <span
                      className={"badge m-1 bg-" + item.color}
                      key={item._id}
                    >
                      {item.name}
                    </span>
                  ))}
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate}/5</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(user._id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Users;

// import React from "react";
// import User from "./user";

// const Users = ({ users, ...rest }) => {
//   return <></>;
// };

// export default Users;
