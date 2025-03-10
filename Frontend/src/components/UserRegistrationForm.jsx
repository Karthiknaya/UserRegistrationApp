import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserRegistrationForm.css";

const UserRegistrationForm = () => {
  // State for storing user input data
  const [user, setUser] = useState({
    name: "",
    age: "",
    dob: "",
    password: "",
    gender: "",
    about: "",
  });

  // State for storing the list of users fetched from the backend
  const [users, setUsers] = useState([]);

  // State to track whether data is being loaded (for showing a loader or disabling buttons)
  const [loading, setLoading] = useState(false);

  // State to track the user being edited
  const [editingUserId, setEditingUserId] = useState(null);

  // Gender options for the select dropdown
  const genders = ["Male", "Female", "Other"];

  // Handle input changes and update the user state dynamically
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Function to handle form submission (Create or Update user)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingUserId) {
        // Update an existing user
        const response = await axios.put(`https://userregistrationbackend-2mzn.onrender.com/api/users/${editingUserId}`, user);
        alert(response.data.message);
      } else {
        // Register a new user
        const response = await axios.post("https://userregistrationbackend-2mzn.onrender.com/api/users/register", user);
        alert(response.data.message);
      }

      // Refresh the user list
      fetchUsers();

      // Reset form fields after submission
      setUser({ name: "", age: "", dob: "", password: "", gender: "", about: "" });

      // Exit edit mode
      setEditingUserId(null);
    } catch (error) {
      alert(error.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  // Fetch all registered users from the backend
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://userregistrationbackend-2mzn.onrender.com/api/users");
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch users when the component is mounted
  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete a user from the database
  const deleteUser = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(`https://userregistrationbackend-2mzn.onrender.com/api/users/${id}`);
      alert(response.data.message);

      // Remove the deleted user from the state
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Set the selected user's details in the form for editing
  const editUser = (user) => {
    setUser(user);
    setEditingUserId(user._id);
  };

  return (
    <div className="container">
      {/* User Registration Form */}
      <form className="register-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={user.name} onChange={handleChange} required />
        <input type="number" name="age" placeholder="Age" value={user.age} onChange={handleChange} required />
        <input type="date" name="dob" value={user.dob} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} required />

        {/* Dropdown for Gender selection */}
        <select name="gender" value={user.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          {genders.map((gender) => (
            <option key={gender} value={gender}>
              {gender}
            </option>
          ))}
        </select>

        <textarea name="about" placeholder="About" maxLength="5000" value={user.about} onChange={handleChange}></textarea>

        {/* Submit button (Register or Update based on edit mode) */}
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : editingUserId ? "Update" : "Register"}
        </button>
      </form>

      {/* User List Table */}
      <h2 style={{ color: "black" }}>Registered Users</h2>
      {loading ? <p>Loading users...</p> : null}

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table border="1" className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>About</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.dob}</td>
                <td>{user.gender}</td>
                <td>{user.about}</td>
                <td>
                  {/* Edit and Delete Buttons */}
                  <button onClick={() => editUser(user)} disabled={loading}>Edit</button>
                  <button onClick={() => deleteUser(user._id)} disabled={loading}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserRegistrationForm;
