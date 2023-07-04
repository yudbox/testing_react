import { useState } from "react";

export default function UserForm({ onUserAdd }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onUserAdd({ name, email });

    setName("");
    setEmail("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userName">Name: </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="Name"
            id="userName"
          />
        </div>
        <div>
          <label htmlFor="userEmail">Email </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="userEmail"
          />
        </div>
        <div>
          <button type="submit">Add user</button>
        </div>
      </form>
    </div>
  );
}
