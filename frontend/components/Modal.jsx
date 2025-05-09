import React from "react";
import PropTypes from "prop-types";

const Modal = ({ isOpen, onClose, produto, onChange, onSave }) => {
  if (!isOpen || !produto) return null;

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
        <h2>Editar Produto</h2>
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
            value={produto.nome}
            onChange={(e) => onChange({ ...produto, nome: e.target.value })}
            style={{
              padding: "0.8rem",
              border: "1px solid #ccc",
              width: "90%",
              borderRadius: "8px",
            }}
          />
          <input
            value={produto.descricao}
            onChange={(e) =>
              onChange({ ...produto, descricao: e.target.value })
            }
            style={{
              padding: "0.8rem",
              border: "1px solid #ccc",
              width: "90%",
              borderRadius: "8px",
            }}
          />

          <div style={{ display: "flex", gap: "0.5rem", width: "95%" }}>
            <p
              style={{
                fontSize: "0.8rem",
                fontWeight: "bolder",
                display: "flex",
                alignItems: "center",
              }}
            >
              R$
            </p>
            <input
              type="number"
              step="0.01"
              value={produto.valor}
              onChange={(e) => onChange({ ...produto, valor: e.target.value })}
              style={{
                padding: "0.8rem",
                border: "1px solid #ccc",
                width: "90%",
                borderRadius: "8px",
              }}
            />
          </div>
          <input
            type="number"
            value={produto.quantidade}
            onChange={(e) =>
              onChange({ ...produto, quantidade: e.target.value })
            }
            style={{
              padding: "0.8rem",
              border: "1px solid #ccc",
              width: "90%",
              borderRadius: "8px",
            }}
          />
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

export default Modal;
