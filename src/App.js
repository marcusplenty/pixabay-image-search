import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import ImageSearch from './components/ImageSearch/imageSearch';
import ImageDetail from './components/ImageDetail/imageDetail';

function App() {
  return (
    <Router>
      <div className="App">
          <Routes>
            <Route path="/" element={<ImageSearch />} />
            <Route path="/image/:imageId" element={<ImageDetail />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
