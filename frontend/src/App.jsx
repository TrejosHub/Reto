import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './routes/Home.jsx';
import Parqueadero from './routes/Parqueadero.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/parqueadero" element={<Parqueadero />} />
        </Routes>
      </main>
    </>
  );
}