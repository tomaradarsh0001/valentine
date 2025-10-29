import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LovePage from './pages/LovePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/love" element={<LovePage />} />
      </Routes>
    </Router>
  );
}

export default App;
