import { useEffect, useState } from "react";
import api from "../services/api";

function Perfil() {
  const [perfil, setPerfil] = useState(null);

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const res = await api.get("/perfil", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setPerfil(res.data);
      } catch (err) {
        console.error("Erro ao buscar perfil", err);
      }
    };

    fetchPerfil();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <button
          onClick={() => (window.location.href = "/home")}
          style={styles.voltarButton}
        >
          X
        </button>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <div style={styles.profileImageContainer}>
            <div style={styles.profileImage}>A</div>{" "}
            {/* Placeholder para imagem de perfil */}
          </div>
          {/* onSubmit={handleSubmit} */}
          <form style={styles.form}>
            <p style={styles.info}>ID: {perfil?.id}</p>
            <div style={styles.inputGroup}>
              <label htmlFor="nome" style={styles.label}>
                Nome
              </label>
              <input
                id="nome"
                type="text"
                value={perfil?.nome || ""}
                onChange={(e) => setPerfil({ ...perfil, nome: e.target.value })}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label htmlFor="email" style={styles.label}>
                E-mail
              </label>
              <input
                id="email"
                type="email"
                value={perfil?.email || ""}
                onChange={(e) =>
                  setPerfil({ ...perfil, email: e.target.value })
                }
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label htmlFor="usuario" style={styles.label}>
                Usuário
              </label>
              <input
                id="usuario"
                type="text"
                value={perfil?.usuario || ""}
                onChange={(e) =>
                  setPerfil({ ...perfil, usuario: e.target.value })
                }
                style={styles.input}
              />
            </div>
            <p style={styles.info}>Role: {perfil?.role}</p>
            <button type="submit" style={styles.button}>
              Atualizar Perfil
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
  },
  card: {
    backgroundColor: "white",
    padding: "24px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "320px",
    textAlign: "center",
    position: "relative", // Para o botão de voltar aparecer no topo
  },
  voltarButton: {
    position: "absolute",
    top: "16px",
    right: "16px",
    backgroundColor: "transparent",
    border: "none",
    color: "#4b5563",
    fontSize: "24px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  profileImageContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "16px",
  },
  profileImage: {
    width: "96px",
    height: "96px",
    borderRadius: "50%",
    backgroundColor: "#d1d5db",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "32px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  info: {
    fontSize: "14px",
    color: "#4b5563",
    margin: "8px 0",
  },
  inputGroup: {
    marginBottom: "16px",
    width: "100%",
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "8px",
    color: "#4b5563",
  },
  input: {
    width: "90%",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    color: "#4b5563",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#3b82f6",
    color: "white",
    fontWeight: "600",

    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
    borderRadius: "8px",
  },
};

export default Perfil;
