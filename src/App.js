import './App.css';
import { useState } from 'react';

function App() {
  const [heightUnit, setHeightUnit] = useState("cm");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [isBmiValid, setIsBmiValid] = useState(false);
  const [bmi, setBmi] = useState();
  const [bmiCategory, setBmiCategory] = useState();

  const handleSubmit = event => {
    event.preventDefault();
    
    const heightValue = document.getElementById("height").value;
    const weightValue = document.getElementById("weight").value;

    if (isNaN(heightValue) || isNaN(weightValue) || !heightUnit || !weightUnit) {
      console.log("Error");
      setIsBmiValid(false);
      setBmiCategory();
      return;
    }

    if (heightValue < 0 || weightValue < 0) {
      setIsBmiValid(false);
      setBmiCategory();
      return;
    }

    const heightMultiplier = heightUnit === "cm" ? 1 : 2.54;
    const weightDivisor = weightUnit === "kg" ? 1 : 2.04623;

    const height = (heightValue * heightMultiplier) / 100;
    const weight = weightValue / weightDivisor;

    const calculatedBmi = weight / (height * height);

    setBmi(Math.floor(calculatedBmi * 100) / 100);

    if (calculatedBmi < 18.5) {
      setBmiCategory("underweight");
    } else if (calculatedBmi >= 18.5 && calculatedBmi < 25) {
      setBmiCategory("normal weight");
    } else if (calculatedBmi >= 25 && calculatedBmi < 30) {
      setBmiCategory("overweight");
    } else {
      setBmiCategory("obese");
    }

    setIsBmiValid(true);
  }

  const bmiTextGenerator = () => {
    let color = "black";

    if (bmiCategory === "underweight") {
      color = "#ea4c46";
    } else if (bmiCategory === "normal weight") {
      color = "green";
    } else if (bmiCategory === "overweight") {
      color = "#ea4c46";
    } else {
      color = "#dc1c13";
    }

    return (
      <>
        <h3>Your BMI is {bmi}</h3>
        <h4 style={{color: color}}>You are {bmiCategory}.</h4>
      </>
    );
  }

  return (
    <div className="App">
      <h1>BMI Calculator</h1>
      <div>
        <form>
          <label htmlFor="height">Height: </label>
          <input min="1" type="number" id="height" /> &nbsp;
          <label><input type="radio" id="cm" name="height" value="cm" onChange={() => setHeightUnit("cm")} checked={heightUnit === "cm"} />cm</label>
          <label><input type="radio" id="in" name="height" value="in" onChange={() => setHeightUnit("in")} checked={heightUnit === "in"} />in</label>
          <br></br>
          <br></br>
          <label htmlFor="weight" style={{marginTop: "40px"}}>Weight: </label>
          <input min="1" type="number" id="weight" /> &nbsp;
          <label><input type="radio" id="kg" name="weight" value="kg"  onChange={() => setWeightUnit("kg")} checked={weightUnit === "kg"} />kg</label>
          <label><input type="radio" id="lbs" name="weight" value="lbs" onChange={() => setWeightUnit("lbs")} checked={weightUnit === "lbs"} />lbs</label>
          <br></br>
          <br></br>
          <button onClick={handleSubmit}>Submit</button>
        </form>
      </div>
      <div>
        <br></br>
        {
          isBmiValid ? bmiTextGenerator() : `Please enter your valid data.`
        }
      </div>
      <hr></hr>
      <div>
        <h3>BMI Categories</h3>
        <p>Underweight: under 18.5</p>
        <p>Normal weight: 18.5 - 24.9</p>
        <p>Overweight: 25 - 29.9</p>
        <p>Obese: 30 and over</p>
      </div>
    </div>
  );
}

export default App;
