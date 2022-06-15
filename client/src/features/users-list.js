import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";

function UsersList(){
    const baseURL = "http://127.0.0.1:8000";
    // const { register, handleSubmit, formState: { errors } } = useForm();

    const user = useRef([]);
    const [getUsers, setUsersList] = useState([]);
    useEffect(() => {
    axios
    .get(`${baseURL}/add-user/`)
    .then(response => {
          
            // this.setState({data: response.data});
        console.log(response)
        setUsersList(response.data.users)
        })
        .catch(error => {
            console.log(error)
        })
    }, []);
    return (
      <div>
     
      {getUsers.map(user => (
        <div key={user.id}>
          <h2>
            Name: {user.id}</h2>
          {Object.keys(user).map((  key, index) => {
        return (
          <div key={index}>
            <h2>
              {key}: {user[key]}
            </h2>

            <hr />
          </div>
        );
      })}
 
        </div>
      ))}
      </div>
      
    );

}
 
export default UsersList;