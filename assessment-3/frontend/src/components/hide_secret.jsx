import React, { useState } from "react";

export default function HideSecret() {
  const [value, setValue] = useState("");
  const [key, setKey] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setKey("");

    if (!value.trim()) {
      setError("El secreto no puede estar vacío");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/ocultar/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secreto: value }),
      });

      if (!res.ok) throw new Error("Error al ocultar el secreto");

      const data = await res.json();
      setKey(data.key);
      setValue("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h1>Ocultar Secreto</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribe tu secreto aquí"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">Ocultar</button>
      </form>
      {key && <div className="result">Key generada: {key}</div>}
      {error && <div className="error">{error}</div>}
    </div>
  );
}
