import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import API from "../API";
import { useNavigate } from "react-router-dom";
import QualitiesList from "./qualitiesList";

const UserPage = ({ userPage }) => {
  const [user, setUsers] = useState();

  useEffect(() => {
    API.users.getById(userPage).then((data) => setUsers(data));
  });

  let navigate = useNavigate();

  const goBack = () => {
    navigate("/users");
  };

  if (user) {
    return (
      <div>
        <h1>{user.name}</h1>
        <h2>Профессия: {user.profession.name}</h2>
        <QualitiesList qualities={user.qualities} />
        <p>CompletedMeetings: {user.completedMeetings}</p>
        <h2>Rate: {user.rate}</h2>
        <button className="btn btn-small m-3" onClick={goBack}>
          Вернуться к списку
        </button>
      </div>
    );
  } else {
    return <h1>Loading...</h1>;
  }
};

UserPage.propTypes = {
  userId: PropTypes.string,
};

export default UserPage;
