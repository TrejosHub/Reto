function fmt(dateStr) {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  return d.toLocaleString();
}

export default function VehicleTable({ vehicles, onCheckout, onDelete }) {
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Placa</th>
            <th>Propietario</th>
            <th>Ingreso</th>
            <th>Salida</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map(v => (
            <tr key={v.id}>
              <td>{v.id}</td>
              <td>{v.plate}</td>
              <td>{v.owner || '-'}</td>
              <td>{fmt(v.checkIn)}</td>
              <td>{fmt(v.checkOut)}</td>
              <td>
                <span className={`badge ${v.status === 'inside' ? 'badge--inside' : 'badge--outside'}`}>
                  {v.status}
                </span>
              </td>
              <td className="actions">
                {v.status === 'inside' && (
                  <button className="btn btn-outline" onClick={() => onCheckout(v.id)}>Salida</button>
                )}
                <button className="btn btn-danger" onClick={() => onDelete(v.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
          {vehicles.length === 0 && (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center', opacity: 0.7 }}>Sin registros</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}