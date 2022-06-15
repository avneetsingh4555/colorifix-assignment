import React from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from 'semantic-ui-react';
import axios from "axios";
import validator from "validator";
import { useState, useEffect } from "react";

function AddUsersForm(){
    const baseURL = "http://127.0.0.1:8000";
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        console.log(data);
    }

    useEffect(() => {
    axios
    .get(`${baseURL}/add-user/`)
    .then(response => {
          
            // this.setState({data: response.data});
        console.log(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    });
//   }, []);

    return(
   <div className="row">
    <div className="col-md-6">

  
<div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Field>
                    <label>First Name</label>
                    <input
                        placeholder='First Name'
                        type="text"
                        {...register("firstName", { required: true, maxLength: 10 })}
                    />
                </Form.Field>
                {errors.firstName && <p>Please check the First Name</p>}
                <Form.Field>
                    <label>Last Name</label>
                    <input
                        placeholder='Last Name'
                        type="text"
                        {...register("lastName", { required: true, maxLength: 10 })}
                    />
                </Form.Field>
                {errors.lastName && <p>Please check the Last Name</p>}
                <Form.Field>
                    <label>Email</label>
                    <input
                        placeholder='Email'
                        
                        {...register("email",
                            {
                                required: true,
                                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                            })}
                    />
                </Form.Field>
                {errors.email && <p>Please check the Email</p>}
        
                <Button type='submit'>Submit</Button>
            </Form>
        </div>
  </div>
   </div> 
    );
}

export default AddUsersForm