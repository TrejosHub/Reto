import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__brand">Parqueatrejos</div>
      <nav className="navbar__nav">
        <NavLink to="/" className="navlink">Inicio</NavLink>
        <NavLink to="/parqueadero" className="navlink">Parqueadero</NavLink>
      </nav>
    </header>
  );
}