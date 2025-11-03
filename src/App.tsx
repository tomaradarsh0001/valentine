import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LovePage from './pages/LovePage';
import ImagePage from './pages/Image';
import VideoPage from './pages/Video';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/love" element={<LovePage />} />
        <Route path="/img" element={<ImagePage />} />
        <Route path="/vid" element={<VideoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
