import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";

function UsersList() {
  const baseURL = "http://127.0.0.1:8000";

  const user = useRef([]);
  const [getUsers, setUsersList] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseURL}/users/`)
      .then((response) => {
        setUsersList(response.data.users);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Permission Group</th>
            <th scope="col">Company</th>
          </tr>
        </thead>
        <tbody>
          {getUsers.map((user) => (
            <tr>
              <th scope="row">{user.id}</th>
              <td>
                {user.first_name} {user.last_name}
              </td>
              <td>{user.email}</td>
              <td>{user.company.name}</td>
              <td>{user.p_group.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersList;
