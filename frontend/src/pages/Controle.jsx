import React, { useEffect, useState } from "react";
import api from "../services/api";

import "../styles/Home.css";
import ModalUser from "../components/modalUser";

const Controle = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [perfil, setPerfil] = useState(null);

  const [editandoUsuario, setEditandoUsuario] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      window.location.href = "/";
      return;
    }

    const fetchPerfil = async () => {
      try {
        const res = await api.get("/perfil", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPerfil(res.data);

        if (res.data.role !== "admin") {
          window.location.href = "/";
        } else {
          carregarUsuarios(res.data.id);
        }
      } catch (err) {
        console.error("Erro ao buscar perfil", err);
        window.location.href = "/";
      }
    };

    fetchPerfil();
  }, []);

  const carregarUsuarios = async (idAtual) => {
    try {
      const res = await api.get("/listar_usuarios", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });
      const usuariosFiltrados = res.data.filter(
        (usuario) => usuario.id !== idAtual
      );
      setUsuarios(usuariosFiltrados);
    } catch (err) {
      console.error("Erro ao carregar usuários", err);
    }
  };

  const atualizarUsuario = async () => {
    try {
      await api.patch(
        `/admin/atualizar_usuario_role/${editandoUsuario.id}`,
        {
          nome: editandoUsuario.nome,
          email: editandoUsuario.email,
          usuario: editandoUsuario.usuario,
          role: editandoUsuario.role,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );
      setEditandoUsuario(null);
      carregarUsuarios(perfil.id);
    } catch (err) {
      console.error("Erro ao atualizar usuário", err);
    }
  };

  const deletarUsuario = async (id) => {
    try {
      await api.delete(`/admin/deletar_usuario/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });
      carregarUsuarios(perfil.id);
    } catch (err) {
      console.error("Erro ao deletar usuário", err);
    }
  };

  const cellStyle = {
    padding: "0.75rem",
    border: "1px solid #ddd",
    verticalAlign: "middle",
    textAlign: "center",
  };

  const buttonStyle = {
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#007bff",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Painel de Controle - Administrador</h1>
        <div style={{ display: "flex", gap: ".5rem" }}>
          <button
            style={{
              padding: "8px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
            onClick={() => (window.location.href = "/home")}
          >
            Home
          </button>
        </div>
      </header>

      <hr />

      <div style={{ overflowX: "auto", marginTop: "2rem" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            border: "1px solid #ddd",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f5f5f5", textAlign: "left" }}>
              <th style={{ ...cellStyle, width: "10%" }}>ID</th>
              <th style={{ ...cellStyle, width: "30%" }}>Nome</th>
              <th style={{ ...cellStyle, width: "20%" }}>Usuario</th>
              <th style={{ ...cellStyle, width: "30%" }}>Email</th>
              <th style={{ ...cellStyle, width: "10%" }}>Role</th>
              <th style={{ ...cellStyle, width: "20%" }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario, index) => (
              <tr
                key={usuario.id}
                style={{
                  backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9",
                }}
              >
                <td style={cellStyle}>{usuario.id}</td>
                <td style={cellStyle}>{usuario.nome}</td>
                <td style={cellStyle}>{usuario.usuario}</td>
                <td style={cellStyle}>{usuario.email}</td>
                <td style={cellStyle}>{usuario.role}</td>
                <td style={{ ...cellStyle, display: "flex", gap: "0.5rem" }}>
                  <button
                    onClick={() => setEditandoUsuario(usuario)} // <- estava errado aqui
                    style={buttonStyle}
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => deletarUsuario(usuario.id)}
                    style={{ ...buttonStyle, backgroundColor: "#dc3545" }}
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalUser
        isOpen={!!editandoUsuario}
        onClose={() => setEditandoUsuario(null)}
        user={editandoUsuario}
        onChange={(updated) => setEditandoUsuario(updated)}
        onSave={atualizarUsuario}
      />
    </div>
  );
};

export default Controle;
