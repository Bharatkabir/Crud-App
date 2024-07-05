import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

function Read() {
  const [data, setData] = useState([]);
  const [update, setupdate] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [load, setLoad] = useState(false);
  const navi = useNavigate();
  useEffect(() => {
    handleread();
  }, []);
  const handleread = async () => {
    setLoad(true);
    const response = await fetch(
      `https://6685020056e7503d1ae1f89e.mockapi.io/crud-react`
    );
    const data = await response.json();
    setData(data);
    setLoad(false);
  };
  const handleDelete = async (id) => {
    fetch(`https://6685020056e7503d1ae1f89e.mockapi.io/crud-react/${id}`, {
      method: "DELETE",
    }).then((res) => {
      setData(data.filter((item) => item.id !== id));
    });
    alert(`Item delete scussefully ${id}`);
  };
  const handleEdit = (item) => {
    setupdate(item);
    setName(item.name), setEmail(item.email), setPhone(item.phone);
    console.log(item);
  };
  const handleUpdate = () => {
    const API_URL = `https://6685020056e7503d1ae1f89e.mockapi.io/crud-react/${update.id}`;
    fetch(API_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        phone: phone,
      }),
    });
    alert(`Item update scussefully ${update.id}`);
    window.location.reload();
  };
  if (load) {
    return (
      <div className="loading">
        <Loading />
      </div>
    );
  }
  return (
    <>
      <h2>Crud-Operation</h2>
      <div className="table">
        <button
          onClick={() => {
            navi("/post");
          }}
          className="btn btn-outline-success "
          id="btn"
        >
          ADD <i className="bi bi-person-fill-add"></i>
        </button>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td id="btnn">
                  <button
                    onClick={() => handleDelete(item.id)}
                    class="bin-button"
                  >
                    <svg
                      class="bin-top"
                      viewBox="0 0 39 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line
                        y1="5"
                        x2="39"
                        y2="5"
                        stroke="white"
                        stroke-width="4"
                      ></line>
                      <line
                        x1="12"
                        y1="1.5"
                        x2="26.0357"
                        y2="1.5"
                        stroke="white"
                        stroke-width="3"
                      ></line>
                    </svg>
                    <svg
                      class="bin-bottom"
                      viewBox="0 0 33 39"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <mask id="path-1-inside-1_8_19" fill="white">
                        <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path>
                      </mask>
                      <path
                        d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                        fill="white"
                        mask="url(#path-1-inside-1_8_19)"
                      ></path>
                      <path
                        d="M12 6L12 29"
                        stroke="white"
                        stroke-width="4"
                      ></path>
                      <path d="M21 6V29" stroke="white" stroke-width="4"></path>
                    </svg>
                  </button>

                  <button
                    onClick={() => handleEdit(item)}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    class="editBtn"
                  >
                    <svg height="1em" viewBox="0 0 512 512">
                      <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <!-- Modal --> */}
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  Modal title
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <form className="form-container">
                  <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      value={name}
                      id="name"
                      onChange={(e) => setName(e.target.value)}
                      name="name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email:</label>

                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      id="email"
                      name="email"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number:</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      id="phone"
                      name="phone"
                    />
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  onClick={handleUpdate}
                  type="button"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Read;
