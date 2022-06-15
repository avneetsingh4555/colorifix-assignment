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
    console.log(data);
    const res = fetch(`${baseURL}/add-permission-group/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(async response => {
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
 
  const [loading, setLoading] = useState(false);


  return (
  <div className="row">
      <div className="col-md-6">
        <div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Field>
              <label>Enter Permission Group</label>
              <input
                placeholder="Permission Name"
                type="text"
                {...register("name", { required: true})}
              />
            </Form.Field>
            {errors.name && <p>Permission name must be filled</p>}
            
            <Button type="submit">Submit</Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AddPermissionGroup;