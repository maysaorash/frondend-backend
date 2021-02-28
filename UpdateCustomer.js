import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';


function UpdateCustomer(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    handleOneData();
  }, []);

  const handleOneData = async () => {
    const response = await fetch(`http://localhost:8080/api/customers/${props.match.params.id}`);
    const data = await response.json();
    setName(data.name);
    setEmail(data.email);
    setCity(data.city);
  }

  const formSubmit = async(e) => {
    e.preventDefault();
      const url = "http://localhost:8080/api/customers/" + props.match.params.id;
      const postDetails = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },  
      body: JSON.stringify(
        { name,
          email,
          city,
        }),  
    };  
    try {
      const response = await fetch(url, postDetails);
      if (response.ok) {
        let jsonResponse = await response.json();
        console.log(jsonResponse);
      
      } else {
        throw new Error ('Request failed!');
      }  
    } catch (error) {
      console.log(error);
    }

    setRedirect(true);

  }

  if (redirect) {
    return <Redirect to={'/'}/>
  }


  return (
    <div>
      <form onSubmit={formSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" className="form-control" name="name"
              defaultValue={name}
              onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="text" className="form-control" name="email"
              defaultValue={email}
              onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>City</label>
          <input type="text" className="form-control" name="city"
              defaultValue={city}
              onChange={e => setCity(e.target.value)}
          />
        </div>
        <button className="btn btn-secondary">Save</button>
    </form>
    </div>
  )
}


export default UpdateCustomer;