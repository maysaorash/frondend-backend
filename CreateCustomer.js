import React, { useState } from "react";
import { Redirect } from "react-router-dom";

export default function CreateCustomer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [redirect, setRedirect] = useState(false);

  const submit = async(e) => {
    e.preventDefault();
    const url = "http://localhost:8080/api/customers";
    const postDetails = {
      method: "POST",
      body: JSON.stringify({ 
        name, 
        email,
        city    
      }),
      headers: {"Content-Type": "application/json",},
    };
    try {
        const response = await fetch(url, postDetails);
        if (response.ok) {
          let jsonResponse = await response.json();
          console.log(jsonResponse);
        } else {
          throw new Error("Request failed!");
        }
      } catch (error) {
        console.log(error);
      }
      setRedirect(true);
  };

  if (redirect) {
    return <Redirect to={'/'}/>
  }


  return (
    <form onSubmit={submit}>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="text"
          className="form-control"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>City</label>
        <input
          type="text"
          className="form-control"
          name="city"
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <button className="btn btn-outline-info">Save</button>
    </form>
  );
}
