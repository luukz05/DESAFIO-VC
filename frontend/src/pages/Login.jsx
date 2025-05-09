import { useState } from "react";
import api from "../services/api";

function Login() {
  const [form, setForm] = useState({ usuario: "", senha: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", form);
      alert(res.data.mensagem);
      window.location.href = "/home"; // Redireciona para a página inicial após o login
    } catch (err) {
      alert("Login inválido");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Nome de usuário"
        value={form.usuario}
        onChange={(e) => setForm({ ...form, usuario: e.target.value })}
      />
      <input
        placeholder="Senha"
        type="password"
        value={form.senha}
        onChange={(e) => setForm({ ...form, senha: e.target.value })}
      />
      <button type="submit">Entrar</button>
    </form>
  );
}

export default Login;
