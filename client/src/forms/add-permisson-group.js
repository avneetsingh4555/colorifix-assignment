import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import { Form, Button } from "semantic-ui-react";

function AddPermissionGroup() {
  const baseURL = "http://127.0.0.1:8000";
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const [status, setStatus] = useState(undefined);

  const onSubmit = (data) => {
    const res = fetch(`${baseURL}/add-permission-group/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(async response => {
      const isJson = response.headers.get('content-type')?.includes('application/json');
      const data = isJson && await response.json();

      if (!response.ok) {
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
      }
      if(response.status == 200){
        setStatus({ type: 'show' });
        setTimeout(function(){
             setStatus({ type: 'hide' });
        }.bind(this),5000);
        
      }
        
    })
      .catch(error => {
        this.setState({ errorMessage: error.toString() });
        console.error('There was an error!', error);
      });
  };
 
  return (
    
   
    <div className="row justify-content-center">
      <div>
        {status?.type === 'show' && <div class="alert alert-success" role="alert">"Data saved successfully."</div>}
      </div>
      <div className="col-md-6">
        <div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Field>
              <label>Enter Permission Group</label>
              <input className="mt-2"
                placeholder="Permission Name"
                type="text"
                {...register("name", { required: true })}
              />
            </Form.Field>
            {errors.name && <p>Permission name must be filled</p>}

            <Button className="btn btn-primary mt-3" type="submit">Submit</Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AddPermissionGroup;