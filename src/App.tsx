import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LovePage from './pages/LovePage';
import ImagePage from './pages/Image';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/love" element={<LovePage />} />
        <Route path="/img" element={<ImagePage />} />
      </Routes>
    </Router>
  );
}

export default App;
