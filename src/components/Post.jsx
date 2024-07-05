import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Post() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navi = useNavigate();
  const handleSubmit = async (e) => {
    if (email === "" || name === "" || phone === "") {
      alert("Please fill all the fields");
    } else {
      e.preventDefault();
      console.log(name, email, phone);

      const response = await fetch(
        `https://6685020056e7503d1ae1f89e.mockapi.io/crud-react`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            phone: phone,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      setEmail("");
      setName("");
      setPhone("");
      navi("/");
    }
  };
  return (
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
      <button onClick={handleSubmit} type="submit">
        Submit
      </button>
    </form>
  );
}

export default Post;
