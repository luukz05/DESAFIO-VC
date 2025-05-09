import { useState } from "react";
import axios from "axios";
import api from "../services/api";

function Registro() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    usuario: "",
    senha: "",
  });

  const [mensagem, setMensagem] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/register", form);
      setMensagem("Usuário registrado com sucesso!");
      setForm({ nome: "", email: "", usuario: "", senha: "" });
      window.location.href = "/";
    } catch (err) {
      setMensagem("Erro ao registrar usuário.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "2rem",
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Registro</h2>
        {mensagem && <p>{mensagem}</p>}
        <input
          type="text"
          name="nome"
          placeholder="Nome completo"
          value={form.nome}
          onChange={handleChange}
          required
          style={{
            padding: "0.8rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            width: "100%",
          }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{
            padding: "0.8rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            width: "100%",
          }}
        />
        <input
          type="text"
          name="usuario"
          placeholder="Nome de usuário"
          value={form.usuario}
          onChange={handleChange}
          required
          style={{
            padding: "0.8rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            width: "100%",
          }}
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={form.senha}
          onChange={handleChange}
          required
          style={{
            padding: "0.8rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            width: "100%",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "0.8rem",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#007bff",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
            width: "100%",
          }}
        >
          Registrar
        </button>
        <strong>
          <a href="/">Login</a>
        </strong>
      </form>
    </div>
  );
}

export default Registro;
