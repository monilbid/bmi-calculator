import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [heightUnit, setHeightUnit] = useState("cm");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();

  return (
    <div className="App">
      <h1>BMI Calculator</h1>
      <hr></hr>
      <div>
        <p>
          Your height: &nbsp;
          <input type="number" onChange={(e) => setHeight(e.target.value)} /> &nbsp;
          <label><input type="radio" id="cm" name="height" value="cm" checked={true} onChange={() => setHeightUnit("cm")} />cm</label>
          <label><input type="radio" id="in" name="height" value="in" onChange={() => setHeightUnit("in")} />in</label>
        </p>
      </div>
      <div>
        <p>
          Your weight: &nbsp;
          <input type="number" onChange={(e) => setWeight(e.target.value)} /> &nbsp;
          <label><input type="radio" id="kg" name="weight" value="kg" checked={true} onChange={() => setWeightUnit("kg")} />kg</label>
          <label><input type="radio" id="lbs" name="weight" value="lbs" onChange={() => setWeightUnit("lbs")} />lbs</label>
        </p>
      </div>
      <div>
        {
          displayText()
        }
      </div>
      <hr></hr>
      <div>
        <h3>BMI Categories</h3>
        <p id="underweight">Underweight: under 18.5</p>
        <p id="normalweight">Normal weight: 18.5 - 24.9</p>
        <p id="overweight">Overweight: 25 - 29.9</p>
        <p id="obese">Obese: 30 and over</p>
      </div>
    </div>
  );

  function displayText() {
    const heightInCm = heightUnit === "cm" ? height / 100 : (height * 2.54) / 100;
    const weightInKg = weightUnit === "kg" ? weight : weight / 2.204623;
    const bmi = Math.round((weightInKg / (heightInCm * heightInCm)) * 100) / 100;

    return (
      <div>
        {bmi ? `Your BMI is ${bmi}.` : ``}
        {bmi ? <br /> : ``}
        {bmi < 18.5 ? `You are underweight.` : bmi <= 24.9 ? `You are of normal weight.` : bmi >= 25 && bmi < 30 ? `You are overweight.` : bmi >= 30 ? `You are obese.` : ``}
      </div>
    );
  }
}

export default App;
