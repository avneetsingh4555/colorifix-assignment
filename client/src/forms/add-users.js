import React from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "semantic-ui-react";
import axios from "axios";
import validator from "validator";
import { useState, useEffect } from "react";

function AddUsersForm() {
  const baseURL = "http://127.0.0.1:8000";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log("hello");
    const res = fetch(`${baseURL}/users/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }

            this.setState({ postId: data.id })
        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });
  
  };
  const [getpermissions, setPermissionList] = useState([]);
  const [getcompanies, setCompaniesList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);

    fetch(`${baseURL}/get-form-data/`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPermissionList(data.data.cmp)
        setCompaniesList(data.data.pms)
        // setUsersList(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h3>Add User Info</h3>
        <div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Field>
              <label>First Name</label>
              <input
                placeholder="First Name"
                type="text"
                {...register("first_name", { required: true, maxLength: 10 })}
              />
            </Form.Field>
            {errors.first_name && <p>Please check the First Name</p>}
            <Form.Field>
              <label>Last Name</label>
              <input
                placeholder="Last Name"
                type="text"
                {...register("last_name", { required: true, maxLength: 10 })}
              />
            </Form.Field>
            {errors.last_name && <p>Please check the Last Name</p>}
            <Form.Field>
              <label>Email</label>
              <input
                placeholder="Email"
                {...register("email", {
                  required: true,
                  pattern:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
              />
            </Form.Field>
            {errors.email && <p>Please check the Email</p>}
            <Form.Field>
              <label>Password</label>
              <input
                placeholder="Password"
                {...register("password", {
                  required: true,
                })}
              />
            </Form.Field>
            {errors.email && <p>Please check the Password</p>}
            <Form.Field>
              <label>Company Name</label>
              <select {...register("company_id", { required: true })}>
                <option value="">Please select the company</option>
                {getcompanies.map((user) => (
                  <option value={user.id}>{user.name}</option>
                ))}
              </select>
            </Form.Field>
            {errors.company_id && <p>Please check the company</p>}

            <Form.Field>
              <label>Permisson group</label>
              <select {...register("permission_group", { required: true })}>
                <option value="">Please select the permisson Group</option>
                {getpermissions.map((user) => (
                  <option value={user.id}>{user.name}</option>
                ))}
              </select>
            </Form.Field>
            {errors.permission_group && (
              <p>Please check the Permission Group</p>
            )}
            <Button className="btn btn-primary mt-4" type="submit">Submit</Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AddUsersForm;
