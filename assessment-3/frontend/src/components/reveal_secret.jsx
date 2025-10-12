import React, { useState } from "react";

export default function RevealSecret() {
  const [key, setKey] = useState("");
  const [secret, setSecret] = useState("");
  const [error, setError] = useState("");

  const handleReveal = async (e) => {
    e.preventDefault();
    setError("");
    setSecret("");

    if (!key.trim()) {
      setError("La key no puede estar vacía");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8000/api/revelar/${key}/`);
      if (!res.ok) throw new Error("Secreto no encontrado o ya revelado");

      const data = await res.json();
      setSecret(data.secreto);
      setKey("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h1>Revelar Secreto</h1>
      <form onSubmit={handleReveal}>
        <input
          type="text"
          placeholder="Ingresa la key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <button type="submit">Revelar</button>
      </form>
      {secret && <div className="result">Secreto: {secret}</div>}
      {error && <div className="error">{error}</div>}
    </div>
  );
}
