// src/WineQualityForm.js
import React, { useState } from 'react';

const WineQualityForm = () => {
  const [formData, setFormData] = useState({
    fixed_acidity: '',
    volatile_acidity: '',
    citric_acid: '',
    residual_sugar: '',
    chlorides: '',
    free_sulfur_dioxide: '',
    density: '',
    pH: '',
    sulphates: '',
    alcohol: ''
  });

  const [prediction, setPrediction] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Ensure form data values are parsed as floats
        const floatData = {
            fixed_acidity: parseFloat(formData.fixed_acidity),
            volatile_acidity: parseFloat(formData.volatile_acidity),
            citric_acid: parseFloat(formData.citric_acid),
            residual_sugar: parseFloat(formData.residual_sugar),
            chlorides: parseFloat(formData.chlorides),
            free_sulfur_dioxide: parseFloat(formData.free_sulfur_dioxide),
            density: parseFloat(formData.density),
            pH: parseFloat(formData.pH),
            sulphates: parseFloat(formData.sulphates),
            alcohol: parseFloat(formData.alcohol),
        };

        // Send the parsed float data
        const response = await fetch('http://localhost:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(floatData),  // Send as JSON with numbers
        });

        const data = await response.json();
        setPrediction(data.prediction); // Display the result
    } catch (error) {
        console.error("Error making prediction:", error);
        setPrediction('Error');
    }
};


  return (
    <div>
      <h1>Wine Quality Prediction</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label>{key.replace(/_/g, ' ').toUpperCase()}:</label>
            <input
              type="number"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit">Predict</button>
      </form>
      {prediction && <p>Prediction: {prediction}</p>}
    </div>
  );
};

export default WineQualityForm;
