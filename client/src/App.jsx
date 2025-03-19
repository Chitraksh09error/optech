import { useState } from "react";
import axios from "axios";

const SERVER_URL = "https://optech-64va.vercel.app"; // Update after deploying

function App() {
  const [formData, setFormData] = useState({ name: "", email: "", dob: "" });
  const [birthdays, setBirthdays] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${SERVER_URL}/submit`, formData);
      alert("Data submitted successfully!");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchBirthdays = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/birthdays`);
      setBirthdays(response.data.students);
    } catch (error) {
      console.error("Error fetching birthdays:", error);
    }
  };

  return (
    <div>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" onChange={handleChange} placeholder="Name" required />
        <input type="email" name="email" onChange={handleChange} placeholder="Email" required />
        <input type="date" name="dob" onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>

      <h2>Today's Birthdays</h2>
      <button onClick={fetchBirthdays}>Check Birthdays</button>
      <ul>
        {birthdays.map((student, index) => (
          <li key={index}>{student}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
