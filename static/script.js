// Function to handle form submission
document.getElementById('predictForm').addEventListener('submit', function (e) {
    e.preventDefault();  // Prevent the default form submission

    // Get input values from the form
    const fixed_acidity = document.getElementById('fixed_acidity').value;
    const volatile_acidity = document.getElementById('volatile_acidity').value;
    const citric_acid = document.getElementById('citric_acid').value;
    const residual_sugar = document.getElementById('residual_sugar').value;
    const chlorides = document.getElementById('chlorides').value;
    const free_sulfur_dioxide = document.getElementById('free_sulfur_dioxide').value;
    const total_sulfur_dioxide = document.getElementById('total_sulfur_dioxide').value;
    const density = document.getElementById('density').value;
    const pH = document.getElementById('pH').value;
    const sulphates = document.getElementById('sulphates').value;
    const alcohol = document.getElementById('alcohol').value;

    // Create the data object to send to the Flask backend
    const data = {
        fixed_acidity,
        volatile_acidity,
        citric_acid,
        residual_sugar,
        chlorides,
        free_sulfur_dioxide,
        total_sulfur_dioxide,
        density,
        pH,
        sulphates,
        alcohol
    };

    // Send the data to the Flask server using fetch
    fetch('/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())  // Parse the JSON response
    .then(data => {
        // Display the prediction result
        const resultDiv = document.getElementById('predictionResult');
        resultDiv.innerHTML = `Prediction: <strong>${data.prediction ? 'Best Quality' : 'Not Best Quality'}</strong>`;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
