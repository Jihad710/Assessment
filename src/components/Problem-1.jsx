import React, { useState } from "react";

const Problem1 = () => {
  const [show, setShow] = useState("all");
  const [formData, setFormData] = useState([]);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  const handleClick = (val) => {
    setShow(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFormData = [...formData, { name, status }];
    setFormData(newFormData);
    setName("");
    setStatus("");
  };

  const order = { Active: 1, Completed: 2 };

  const sortedData = formData.sort((a, b) => {
    if (a.status === "Active" && b.status === "Completed") {
      return -1;
    } else if (a.status === "Completed" && b.status === "Active") {
      return 1;
    } else {
      return order[a.status] - order[b.status];
    }
  });

  const filteredData =
    show === "all"
      ? sortedData
      : sortedData.filter((item) => item.status === show);

  const CompleteData = sortedData.filter((item) => item.status === "Completed");

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6">
          <form
            className="row gy-2 gx-3 align-items-center mb-4"
            onSubmit={handleSubmit}
          >
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "Completed" && "active"}`}
                type="button"
                onClick={() => handleClick("Completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {show === "Completed"
                ? CompleteData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.status}</td>
                    </tr>
                  ))
                : filteredData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.status}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
