from flask import Flask, render_template, request, jsonify
from flask_cors import CORS  # Import CORS
import pickle
import numpy as np

app = Flask(__name__)

# Allow CORS requests from React app running on localhost:3000
CORS(app, origins=["http://localhost:3000"])  # Enable CORS only from the specified origin

# Load the pickled models
logistic_regression_model = pickle.load(open('Best_Model.pkl', 'rb'))

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get form data from React frontend
        features = [float(request.json['fixed_acidity']),
                    float(request.json['volatile_acidity']),
                    float(request.json['citric_acid']),
                    float(request.json['residual_sugar']),
                    float(request.json['chlorides']),
                    float(request.json['free_sulfur_dioxide']),
                    float(request.json['density']),
                    float(request.json['pH']),
                    float(request.json['sulphates']),
                    float(request.json['alcohol'])]

        # Reshape the features array into a 2D array
        features = np.array(features).reshape(1, -1)

        # Model prediction (you can switch between models)
        prediction = logistic_regression_model.predict(features)
        print(prediction)
        result = "Best Quality" if prediction == 1 else "Not Best Quality"

        # Return the prediction result as JSON
        return jsonify({'prediction': result})
    
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
