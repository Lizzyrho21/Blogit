
import './App.css';
import axios from "axios";

function App() {
  const baseURL = process.env.REACT_APP_BASE_URL;

  const login = () => {
    axios.get(`http://localhost:3001/login`);
  }
  return (
    <div className="App">
    <h1>Let's work on the login call!!</h1>
    <button onClick={login}>Click me!</button>

    </div>
  );
}

export default App;
