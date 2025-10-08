export default function Home() {
  // URL del video de YouTube
  const YT_URL = 'https://www.youtube.com/watch?v=Cs3LdmC0nLI&t=24s';

  return (
    <section className="card">
      <h1>Bienvenido a Parqueatrejos</h1>
      <p>Gestión de Ingreso y Salida de Vehículos.</p>
      <ul>
        <li>Ingresa vehículos con placa y propietario.</li>
        <li>Realiza salida (check-out) y visualiza el historial.</li>
        <li>Gestiona (editar/eliminar) registros fácilmente.</li>
      </ul>

      <div style={{ marginTop: 12 }}>
        <a
          href={YT_URL}
          className="btn btn-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Aqui no lavamos, vease este vídeo si quiere el vehiculo limpio
        </a>
      </div>
    </section>
  );
}