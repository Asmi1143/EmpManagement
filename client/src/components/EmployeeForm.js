
import React, { useState } from 'react';
import axios from 'axios';

const EmployeeForm = () => {
  const [step, setStep] = useState(1); 
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    department: '',
    dob: '',
    gender: '',
    designation: '',
    salary: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleNextClick = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/submit', formData);

      if (response.data) {
         alert('Form submitted successfully!');
        setFormData({
          name: '',
          employeeId: '',
          department: '',
          dob: '',
          gender: '',
          designation: '',
          salary: '',
        });
        setStep(1);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={step === 1 ? handleNextClick : handleFormSubmit}>
          {step === 1 && (
        <>

      <label htmlFor="name">Employee Name:</label>
      <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} maxLength="30" required /><br /><br />

      <label htmlFor="employeeId">Employee ID:</label>
      <input type="text" id="employeeId" name="employeeId" value={formData.employeeId} onChange={handleInputChange} required /><br /><br />

      <label htmlFor="department">Department:</label>
      <select id="department" name="department" value={formData.department} onChange={handleInputChange} required>
        <option value="HR">HR</option>
        <option value="Finance">Finance</option>
        <option value="IT">IT</option>
      </select><br /><br />
      <input type="submit" value="Next" />
      </>
      )}
      {step === 2 && (
        <>

      <label htmlFor="dob">Date of Birth:</label>
      <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleInputChange} required /><br /><br />

      <label>Gender:</label>
      <input type="radio" id="male" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleInputChange} required /> Male
      <input type="radio" id="female" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleInputChange} required /> Female<br /><br />

      <label htmlFor="designation">Designation:</label>
      <input type="text" id="designation" name="designation" value={formData.designation} onChange={handleInputChange} required /><br /><br />

      <label htmlFor="salary">Salary:</label>
      <input type="text" id="salary" name="salary" value={formData.salary} onChange={handleInputChange} maxLength="8" required /><br /><br />
      <input type="submit" value="Submit" />
      </>
      )}
    </form>
    
  );
};

export default EmployeeForm;
