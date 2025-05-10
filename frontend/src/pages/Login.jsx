import { useEffect, useState } from "react";
import api from "../services/api";

function Login() {
  const [form, setForm] = useState({ usuario: "", senha: "" });

  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      window.location.href = "/home"; // Redireciona para a página inicial se o token já estiver presente
    }
    localStorage.removeItem("jwtToken");
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", form);

      // Armazenar o token no localStorage
      localStorage.setItem("jwtToken", res.data.token);
      const token = localStorage.getItem("jwtToken");
      console.log("Token:", token); // Verifica se o token está sendo recuperado corretamente
      alert(res.data.mensagem);
      window.location.href = "/home"; // Redireciona para a página inicial após o login
    } catch (err) {
      alert("Login inválido");
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
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Login</h2>

        <input
          placeholder="Nome de usuário"
          value={form.usuario}
          onChange={(e) => setForm({ ...form, usuario: e.target.value })}
          style={{
            padding: "0.8rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            width: "100%",
          }}
        />

        <input
          placeholder="Senha"
          type="password"
          value={form.senha}
          onChange={(e) => setForm({ ...form, senha: e.target.value })}
          style={{
            padding: "0.8rem",
            width: "100%",
            borderRadius: "8px",
            border: "1px solid #ccc",
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
          Entrar
        </button>
        <strong>
          <a href="/register">Cadastro</a>
        </strong>
      </form>
    </div>
  );
}

export default Login;
