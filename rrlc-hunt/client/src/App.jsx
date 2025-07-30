import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registration from './pages/Registration';
import Scanner from './pages/Scanner';
import Complete from './pages/Complete';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/scan" element={<Scanner />} />
        <Route path="/complete" element={<Complete />} />
      </Routes>
    </BrowserRouter>
  );
}
