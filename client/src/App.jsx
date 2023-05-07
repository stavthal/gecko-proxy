import './App.css';
import AllCoinsPage from './components/table.jsx'
import { useState, useEffect } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [coins, setCoins] = useState([]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  }

  const getPage = async (page) => {
    await fetch(`http://localhost:5000/api/coins/markets/${page}`)
    .then((res) => res.json())
    .then((data) => setCoins(data))
    .catch((error) => console.error(error));
  }

  useEffect(() => {
    getPage(currentPage);
  }, [currentPage]);


  return (
    <div className="App">
      <AllCoinsPage coins={coins} currentPage={currentPage} onPageChange={handlePageChange}/>
    </div>
  );
}
export default App;
