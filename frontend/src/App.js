import "./App.css";
import Employe from "./Components/Employee/Employee";
import Department from './Components/Department/Department'

function App() {
  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div>
          <Employe />
        </div>

        <div style={{ marginTop: "80px" }}>
          <Department />
        </div>
      </div>
    </div>
  );
}

export default App;
