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
    const res = fetch(`${baseURL}/add-user/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const message = `An error has occured: ${res.status} - ${res.statusText}`;
      throw new Error(message);
    }
    const res_data = res.json();
    console.log(data);
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
    <div className="row">
      <div className="col-md-6">
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
                placeholder="Email"
                {...register("password", {
                  required: true,
                })}
              />
            </Form.Field>
            {errors.email && <p>Please check the Email</p>}
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
              <p>Please check the Permsision Group</p>
            )}
            <Button type="submit">Submit</Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AddUsersForm;
