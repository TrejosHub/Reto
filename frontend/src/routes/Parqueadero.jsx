import { useEffect, useState } from 'react';
import VehicleForm from '../components/VehicleForm.jsx';
import VehicleTable from '../components/VehicleTable.jsx';

export default function Parqueadero() {
  const [vehicles, setVehicles] = useState([]);
  const [filter, setFilter] = useState('inside'); // inside | outside | all

  const loadVehicles = async (f = filter) => {
    const qs = f === 'all' ? '' : `?status=${f}`;
    const res = await fetch(`/api/vehicles${qs}`);
    const data = await res.json();
    setVehicles(data);
  };

  useEffect(() => { loadVehicles(filter); }, [filter]);

  const handleCreate = async ({ plate, owner }) => {
    const res = await fetch('/api/vehicles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plate, owner })
    });
    if (!res.ok) return alert('Error al ingresar vehículo');
    await loadVehicles();
  };

  const handleCheckout = async (id) => {
    const res = await fetch(`/api/vehicles/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'checkout' })
    });
    if (!res.ok) return alert('Error al realizar salida');
    await loadVehicles();
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar este registro?')) return;
    const res = await fetch(`/api/vehicles/${id}`, { method: 'DELETE' });
    if (!res.ok) return alert('Error al eliminar');
    await loadVehicles();
  };

  const handleUpdate = async (id, { plate, owner }) => {
    const res = await fetch(`/api/vehicles/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plate, owner })
    });
    if (!res.ok) return alert('Error al actualizar');
    await loadVehicles();
  };

  return (
    <section className="grid">
      <div className="card">
        <h2>Ingreso de Vehículos</h2>
        <VehicleForm onCreate={handleCreate} />
      </div>

      <div className="card">
        <div className="flex-between">
          <h2>Listado</h2>
          <div className="btn-group">
            <button className={`btn ${filter==='inside'?'btn-primary':''}`} onClick={() => setFilter('inside')}>Dentro</button>
            <button className={`btn ${filter==='outside'?'btn-primary':''}`} onClick={() => setFilter('outside')}>Fuera</button>
            <button className={`btn ${filter==='all'?'btn-primary':''}`} onClick={() => setFilter('all')}>Todos</button>
          </div>
        </div>
        <VehicleTable
          vehicles={vehicles}
          onCheckout={handleCheckout}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      </div>
    </section>
  );
}