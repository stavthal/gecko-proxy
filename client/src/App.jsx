import './App.css';
import AllCoinsPage from './components/table.jsx'
import { useState, useEffect } from 'react';

function App() {

  const [coins, setCoins] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/coins/markets')
      .then((res) => res.json())
      .then((data) => setCoins(data))
      .catch((error) => console.error(error));
  }, []);


  return (
    <div className="App">
      <AllCoinsPage coins={coins}/>
    </div>
  );
}
export default App;
