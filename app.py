from flask import Flask, render_template, request
import pickle
import numpy as np

app = Flask(__name__)

# Load the pickled models
logistic_regression_model = pickle.load(open('models/LogisticRegression_model.pkl', 'rb'))
xgb_model = pickle.load(open('models/XGBClassifier_model.pkl', 'rb'))
svc_model = pickle.load(open('models/SVC_model.pkl', 'rb'))

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get form data
        features = [float(request.form['fixed_acidity']),
                    float(request.form['volatile_acidity']),
                    float(request.form['citric_acid']),
                    float(request.form['residual_sugar']),
                    float(request.form['chlorides']),
                    float(request.form['free_sulfur_dioxide']),
                    float(request.form['total_sulfur_dioxide']),
                    float(request.form['density']),
                    float(request.form['pH']),
                    float(request.form['sulphates']),
                    float(request.form['alcohol'])]

        # Reshape the features array into a 2D array
        features = np.array(features).reshape(1, -1)

        # Example of model prediction (you can switch between models)
        prediction = logistic_regression_model.predict(features)
        if prediction == 1:
            result = "Best Quality"
        else:
            result = "Not Best Quality"

        return render_template('predict.html', prediction=result)
    
    except Exception as e:
        return f"Error: {e}"

if __name__ == '__main__':
    app.run(debug=True)
