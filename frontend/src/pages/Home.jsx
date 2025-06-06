import { useEffect, useState } from "react";
import Modal from "../components/Modal.jsx";

import api from "../services/api.js";
import "../styles/Home.css"; // Ajuste o caminho conforme a estrutura do seu projeto

function App() {
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
  const [perfil, setPerfil] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [novoProduto, setNovoProduto] = useState({
    nome: "",
    descricao: "",
    valor: "",
    quantidade: "",
    userId: "",
  });
  const [editandoProduto, setEditandoProduto] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) {
      window.location.href = "/"; // Redireciona para a página inicial se o token não estiver presente
      return;
    }
    fetchPerfil();
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      const res = await api.get("/listar_produtos", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });
      setProdutos(res.data);
    } catch (err) {
      console.error("Erro ao carregar produtos", err);
    }
  };

  const criarProduto = async () => {
    try {
      // Pega o userId do perfil ou do localStorage
      const userId = perfil.usuario; // Acessando o id do perfil, já que você tem esse dado na sua aplicação

      // Atualizando o produto com o userId correto
      const produtoComUserName = {
        ...novoProduto,
        userId, // ou use 'criador' se o backend espera isso
      };

      // Enviando o produto para a API
      await api.post("/adicionar_produtos", produtoComUserName, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });

      // Limpar o formulário após o envio
      setNovoProduto({ nome: "", descricao: "", valor: "", quantidade: "" });

      // Recarregar a lista de produtos
      carregarProdutos();
    } catch (err) {
      console.error("Erro ao criar produto", err);
    }
  };

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

  const atualizarProduto = async () => {
    try {
      await api.patch(
        `/editar_produto/${editandoProduto.id}`,
        {
          nome: editandoProduto.nome,
          descricao: editandoProduto.descricao,
          valor: parseFloat(editandoProduto.valor),
          quantidade: parseInt(editandoProduto.quantidade),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );

      setEditandoProduto(null);

      carregarProdutos();
    } catch (err) {
      console.error("Erro ao atualizar produto", err);
    }
  };

  const deletarProduto = async (id) => {
    try {
      await api.delete(`/deletar_produto/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });
      carregarProdutos();
      window.location.reload(); // Atualiza a página após a exclusão
    } catch (err) {
      console.error("Erro ao deletar produto", err);
    }
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
        <h1>Gerenciamento de Produtos</h1>
        <div style={{ display: "flex", gap: ".5rem" }}>
          {perfil?.role === "admin" ? (
            <button
              style={{
                padding: "8px",
                backgroundColor: "#16b816",
                color: "white",
                border: "none",
                borderRadius: "5px",
              }}
              onClick={() => {
                // Remove o token do localStorage
                window.location.href = "/controle"; // Redireciona para a página inicial
              }}
            >
              Painel de Controle
            </button>
          ) : null}
          <button
            style={{
              padding: "8px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
            onClick={() => (window.location.href = "/perfil")}
          >
            Perfil
          </button>

          <button
            style={{
              padding: "8px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
            onClick={() => {
              localStorage.removeItem("jwtToken"); // Remove o token do localStorage
              window.location.href = "/"; // Redireciona para a página inicial
            }}
          >
            Sair
          </button>
        </div>
      </header>

      <hr />
      <h2
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Adicionar Produto
      </h2>
      {/* Formulário de criação */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <input
          placeholder="Nome"
          value={novoProduto.nome}
          onChange={(e) =>
            setNovoProduto({ ...novoProduto, nome: e.target.value })
          }
          style={{
            padding: "0.8rem",
            borderBottomLeftRadius: "8px",
            borderTopLeftRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
        <input
          placeholder="Descrição"
          value={novoProduto.descricao}
          onChange={(e) =>
            setNovoProduto({ ...novoProduto, descricao: e.target.value })
          }
          maxLength={50}
          style={{
            padding: "0.8rem",
            border: "1px solid #ccc",
          }}
        />
        <input
          placeholder="Valor"
          type="number"
          step="0.01"
          value={novoProduto.valor}
          onChange={(e) =>
            setNovoProduto({ ...novoProduto, valor: e.target.value })
          }
          style={{
            padding: "0.8rem",

            border: "1px solid #ccc",
          }}
        />
        <input
          placeholder="Quantidade"
          type="number"
          value={novoProduto.quantidade}
          onChange={(e) =>
            setNovoProduto({ ...novoProduto, quantidade: e.target.value })
          }
          style={{
            padding: "0.8rem",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={criarProduto}
          style={{
            padding: "0.8rem",
            borderBottomRightRadius: "8px",
            borderTopRightRadius: "8px",
            border: "none",
            backgroundColor: "#007bff",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Criar
        </button>
      </div>
      {/* Modal de edição */}
      <Modal
        isOpen={!!editandoProduto}
        onClose={() => setEditandoProduto(null)}
        produto={editandoProduto}
        onChange={(updated) => setEditandoProduto(updated)}
        onSave={atualizarProduto}
      />
      {/* Lista de produtos */}
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
              <th style={{ ...cellStyle, width: "2%" }}>Código</th>
              <th style={{ ...cellStyle, width: "10%" }}>Produto</th>
              <th style={{ ...cellStyle, width: "5%" }}>Valor</th>
              <th style={{ ...cellStyle, width: "5%" }}>Quantidade</th>
              <th
                style={{
                  ...cellStyle,
                  width: "60%",
                }}
              >
                Descrição
              </th>
              <th style={{ ...cellStyle, width: "5%" }}>Criador</th>
              <th
                style={{
                  ...cellStyle,
                  borderTopRightRadius: "8px",
                  width: "10%",
                }}
              >
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {produtos
              .filter(
                (p) => perfil.role === `admin` || p.userId === perfil.usuario
              )
              .map((p, index) => (
                <tr
                  key={p.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9",
                  }}
                >
                  <td style={cellStyle}>{p.id}</td>
                  <td style={cellStyle}>{p.nome}</td>
                  <td style={cellStyle}>
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(p.valor)}
                  </td>
                  <td style={cellStyle}>{p.quantidade} un.</td>
                  <td style={{ ...cellStyle, textAlign: "left" }}>
                    {p.descricao}
                  </td>
                  <td style={{ ...cellStyle, textAlign: "center" }}>
                    {p.userId}
                  </td>
                  <td
                    style={{
                      ...cellStyle,
                      display: "flex",
                      gap: "0.5rem",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {perfil.role === "admin" ||
                    (perfil.role === "user" && p.userId === perfil?.usuario) ? (
                      <>
                        <button
                          onClick={() => setEditandoProduto(p)}
                          style={buttonStyle}
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => deletarProduto(p.id)}
                          style={{ ...buttonStyle, backgroundColor: "#dc3545" }}
                        >
                          Deletar
                        </button>
                      </>
                    ) : (
                      <span style={{ color: "#888", fontStyle: "italic" }}>
                        Ação exclusiva do administrador.
                      </span>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
