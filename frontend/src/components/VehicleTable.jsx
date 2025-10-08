import { useState } from 'react';

function fmt(dateStr) {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  return d.toLocaleString();
}

export default function VehicleTable({ vehicles, onCheckout, onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [editPlate, setEditPlate] = useState('');
  const [editOwner, setEditOwner] = useState('');

  const startEdit = (v) => {
    setEditingId(v.id);
    setEditPlate(v.plate || '');
    setEditOwner(v.owner || '');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditPlate('');
    setEditOwner('');
  };

  const saveEdit = async (id) => {
    if (!editPlate.trim()) {
      alert('La placa es obligatoria');
      return;
    }
    await onUpdate(id, { plate: editPlate.trim().toUpperCase(), owner: editOwner.trim() });
    cancelEdit();
  };

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
          {vehicles.map(v => {
            const isEditing = editingId === v.id;
            return (
              <tr key={v.id}>
                <td>{v.id}</td>
                <td>
                  {isEditing ? (
                    <input
                      value={editPlate}
                      onChange={(e) => setEditPlate(e.target.value.toUpperCase())}
                      placeholder="ABC123"
                    />
                  ) : (
                    v.plate
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      value={editOwner}
                      onChange={(e) => setEditOwner(e.target.value)}
                      placeholder="Nombre"
                    />
                  ) : (
                    v.owner || '-'
                  )}
                </td>
                <td>{fmt(v.checkIn)}</td>
                <td>{fmt(v.checkOut)}</td>
                <td>
                  <span className={`badge ${v.status === 'inside' ? 'badge--inside' : 'badge--outside'}`}>
                    {v.status}
                  </span>
                </td>
                <td className="actions">
                  {isEditing ? (
                    <>
                      <button className="btn btn-primary" onClick={() => saveEdit(v.id)}>Guardar</button>
                      <button className="btn btn-outline" onClick={cancelEdit}>Cancelar</button>
                    </>
                  ) : (
                    <>
                      {v.status === 'inside' && (
                        <button className="btn btn-outline" onClick={() => onCheckout(v.id)}>Salida</button>
                      )}
                      <button className="btn" onClick={() => startEdit(v)}>Editar</button>
                      <button className="btn btn-danger" onClick={() => onDelete(v.id)}>Eliminar</button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
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