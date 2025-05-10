import React, { useState } from "react";
import PropTypes from "prop-types";

const ModalUser = ({ isOpen, onClose, user, onChange, onSave }) => {
  if (!isOpen || !user) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...user, [name]: value });
  };

  const handleSave = () => {
    onSave(); // Salvar as alterações
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        flexDirection: "column",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          maxWidth: "500px",
          width: "100%",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          flexDirection: "column",
        }}
      >
        <button onClick={onClose} style={styles.closeButton}>
          &times;
        </button>
        <h2>Editar Usuario</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: "1rem",

            alignItems: "center",
          }}
        >
          <input
            value={user.nome}
            onChange={(e) => onChange({ ...user, nome: e.target.value })}
            style={{
              padding: "0.8rem",
              border: "1px solid #ccc",
              width: "90%",
              borderRadius: "8px",
            }}
          />
          <input
            value={user.email}
            type="email"
            onChange={(e) => onChange({ ...user, email: e.target.value })}
            style={{
              padding: "0.8rem",
              border: "1px solid #ccc",
              width: "90%",
              borderRadius: "8px",
            }}
          />
          <input
            value={user.usuario}
            onChange={(e) => onChange({ ...user, usuario: e.target.value })}
            style={{
              padding: "0.8rem",
              border: "1px solid #ccc",
              width: "90%",
              borderRadius: "8px",
            }}
          />
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <label>
              <input
                type="radio"
                name="role"
                value="admin"
                checked={user.role === "admin"}
                onChange={(e) => onChange({ ...user, role: e.target.value })}
              />
              Admin
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="user"
                checked={user.role === "user"}
                onChange={(e) => onChange({ ...user, role: e.target.value })}
              />
              Usuário
            </label>
          </div>
        </div>
        <div style={{ marginTop: "1rem" }}>
          <button
            onClick={onSave}
            style={{
              padding: "0.8rem",

              borderBottomLeftRadius: "8px",
              borderTopLeftRadius: "8px",
              border: "none",
              backgroundColor: "#007bff",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Salvar
          </button>
          <button
            onClick={onClose}
            style={{
              padding: "0.8rem",
              borderBottomRightRadius: "8px",
              borderTopRightRadius: "8px",
              border: "none",
              backgroundColor: "#d10000",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "none",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
  },
};

export default ModalUser;
