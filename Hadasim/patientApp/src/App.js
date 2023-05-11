import React, { useState } from "react";
import './App.css';
import PatientForm from "./components/PatientForm";
import PatientsDetails from "./components/PatientsDetails/PatientsDetails";
function App() {
  const [displayPatientsDetails, setDisplayPatientsDetails] = useState(false)
  return (
    <div className="App">
      <PatientForm></PatientForm>
      <button style={{width: '200px'}}onClick={() => {setDisplayPatientsDetails(!displayPatientsDetails)}}>display patients details</button>
      {displayPatientsDetails && <PatientsDetails></PatientsDetails>}
    </div>
  );

  
}

export default App;
