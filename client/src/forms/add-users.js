import React from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "semantic-ui-react";
import { useState, useEffect } from "react";

function AddUsersForm() {
  const baseURL = "http://127.0.0.1:8000";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [getpermissions, setPermissionList] = useState([]);
  const [getcompanies, setCompaniesList] = useState([]);
  const [status, setStatus] = useState(undefined);
  const onSubmit = (data) => {
    fetch(`${baseURL}/users/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const data = isJson && (await response.json());

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
        if (response.status == 200) {
          setStatus({ type: "show" });
          setTimeout(
            function () {
              setStatus({ type: "hide" });
            }.bind(this),
            5000
          );
        }
      })
      .catch((error) => {
        this.setState({ errorMessage: error.toString() });
        console.error("There was an error!", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(`${baseURL}/get-form-data/`)
      .then((response) => response.json())
      .then((data) => {
        setPermissionList(data.data.pms);
        setCompaniesList(data.data.cmp);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="row justify-content-center">
      <div>
        {status?.type === "show" && (
          <div class="alert alert-success" role="alert">
            "Data saved successfully."
          </div>
        )}
      </div>
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
            <span className="errors">
              {errors.first_name && <p>Please check the First Name</p>}
            </span>
            <Form.Field>
              <label>Last Name</label>
              <input
                placeholder="Last Name"
                type="text"
                {...register("last_name", { required: true, maxLength: 10 })}
              />
            </Form.Field>
            <span className="errors">
              {errors.last_name && <p>Please check the Last Name</p>}
            </span>
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
            </Form.Field>{" "}
            <span className="errors">
              {errors.email && <p>Please check the Email</p>}
            </span>
            <Form.Field>
              <label>Company Name</label>
              <select {...register("company_id", { required: true })}>
                <option value="">Please select the company</option>
                {getcompanies.map((user) => (
                  <option value={user.id}>{user.name}</option>
                ))}
              </select>
            </Form.Field>{" "}
            <span className="errors">
              {errors.company_id && <p>Please check the company</p>}
            </span>
            <Form.Field>
              <label>Permisson group</label>
              <select {...register("permission_group", { required: true })}>
                <option value="">Please select the permisson Group</option>
                {getpermissions.map((user) => (
                  <option value={user.id}>{user.name}</option>
                ))}
              </select>
            </Form.Field>{" "}
            <span className="errors">
              {errors.permission_group && (
                <p>Please check the Permission Group</p>
              )}
            </span>
            <Button className="btn btn-primary mt-4" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AddUsersForm;
