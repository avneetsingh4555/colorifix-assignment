import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import { Form, Button } from "semantic-ui-react";

function AddPermissionGroup() {
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
              <label>Enter Permission Group</label>
              <input
                placeholder="First Name"
                type="text"
                {...register("first_name", { required: true, maxLength: 10 })}
              />
            </Form.Field>
            {errors.first_name && <p>Please check the First Name</p>}
            
            <Button type="submit">Submit</Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AddPermissionGroup;