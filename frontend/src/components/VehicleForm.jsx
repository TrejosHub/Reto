import { useState } from 'react';

export default function VehicleForm({ onCreate }) {
  const [plate, setPlate] = useState('');
  const [owner, setOwner] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!plate.trim()) return;
    await onCreate({ plate, owner });
    setPlate('');
    setOwner('');
  };

  return (
    <form onSubmit={submit} className="form">
      <div className="form-row">
        <label>Placa</label>
        <input
          value={plate}
          onChange={e => setPlate(e.target.value.toUpperCase())}
          placeholder="ABC123"
          required
        />
      </div>
      <div className="form-row">
        <label>Propietario</label>
        <input
          value={owner}
          onChange={e => setOwner(e.target.value)}
          placeholder="Nombre"
        />
      </div>
      <button className="btn btn-primary" type="submit">Ingresar</button>
    </form>
  );
}