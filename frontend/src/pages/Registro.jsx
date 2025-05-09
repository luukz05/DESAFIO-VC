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
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
      <h2>Registro de Usuário</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          placeholder="Nome completo"
          value={form.nome}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="usuario"
          placeholder="Nome de usuário"
          value={form.usuario}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={form.senha}
          onChange={handleChange}
          required
        />
        <button type="submit">Registrar</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default Registro;
