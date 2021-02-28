import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Main() {
  const [data, setData] = useState([]);

  useEffect(() => {
    handleData();
  }, []);

  const handleData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/customers");
      if (response.ok) {
        let jsonResponse = await response.json();
        // console.log(jsonResponse);
        setData(jsonResponse);
      } else {
        throw new Error("Request failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const url = "http://localhost:8080/api/customers/" + id;
      const postDetails = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        const response = await fetch(url, postDetails);
        if (response.ok) {
          let jsonResponse = await response.json();
          console.log(jsonResponse);
          // setData(data.filter((item) => item.id !== id));//not need!
        } else {
          throw new Error("Request failed!");
        }
      } catch (error) {
        console.log(error);
      }
      handleData();
    }
  };

  return (
    <div>
      <div className="pt-3 pb-2 mb-3 border-bottom">
        <div className="btn-toolbar mb-2 mb-md-0">
            <Link to='/create' className="btn btn-sm btn-primary mx-3">Add</Link>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>name</th>
              <th>email</th>
              <th>city</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.city}</td>
                  <td>
                    <div className="btn-group mr-2">
                      <Link to={`/${item.id}/update`}
                      className="btn btn-sm btn-outline-danger" >
                      Edit</Link>
                      <a href="#" className="btn btn-sm btn-outline-success"                  
                        onClick={() => deleteItem(item.id)}
                      >
                        Delete
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Main;
